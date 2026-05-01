import React, { useEffect, useState, useCallback } from "react";
import { useUser, useAuth } from "@clerk/clerk-react";
import { Heart } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const Community = () => {
  const [creations, setCreations] = useState([]);
  const [loading, setLoading] = useState(true);

  const { user } = useUser();
  const { getToken } = useAuth();

  const fetchCreations = useCallback(async () => {
    try {
      setLoading(true);

      const token = await getToken();

      const { data } = await axios.post(
        "/api/user/get-published-creations",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (data.success) {
        setCreations(data.creations || []);
      } else {
        toast.error(data?.message || "Failed to load creations");
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "Something went wrong",
      );
    } finally {
      setLoading(false);
    }
  }, [getToken]);

  const imageLikeToggle = async (id) => {
    try {
      const token = await getToken();

      const { data } = await axios.post(
        "/api/user/toggle-creation-like",
        { creationId: id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (data.success) {
        toast.success(data?.message || "Updated successfully");
        await fetchCreations();
      } else {
        toast.error(data?.message || "Failed to update like");
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "Something went wrong",
      );
    }
  };

  useEffect(() => {
    if (user) {
      fetchCreations();
    }
  }, [user, fetchCreations]);

  return !loading ? (
    <div className="flex-1 h-full flex flex-col gap-4 p-6">
      <h2 className="text-xl font-semibold">Creations</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 overflow-y-auto">
        {creations.map((creation, index) => (
          <div key={creation.id || index} className="relative group w-full">
            <img
              src={creation.content}
              alt={creation.prompt || "Generated Image"}
              className="w-full h-60 object-cover rounded-lg"
            />

            <div className="absolute inset-0 p-4 rounded-lg flex flex-col justify-end bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white">
              <p className="text-sm truncate">{creation.prompt}</p>

              <div className="flex gap-1 items-center">
                <p>{creation.likes?.length || 0}</p>
                <Heart
                  onClick={() => imageLikeToggle(creation.id)}
                  className={`w-5 h-5 hover:scale-110 cursor-pointer ${
                    creation.likes?.includes(user?.id)
                      ? "fill-red-500 text-red-600"
                      : "text-white"
                  }`}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  ) : (
    <div className="flex items-center justify-center h-full">
      <span className="w-10 h-10 my-1 rounded-full border-2 border-green-500 border-t-transparent animate-spin"></span>
    </div>
  );
};

export default Community;
