<<<<<<< HEAD
import React, { useEffect, useState, useCallback } from "react";
import { useUser, useAuth } from "@clerk/clerk-react";
import { Heart } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
=======
import { useUser } from "@clerk/clerk-react";
import React, { useEffect, useState } from "react";
import { Heart } from "lucide-react";
import Markdown from "react-markdown";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "@clerk/clerk-react";
>>>>>>> 6316eab6093acb8b4ff44c1ebf38d1c0c4f0b1de

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const Community = () => {
  const [creations, setCreations] = useState([]);
<<<<<<< HEAD
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

=======
  const { user } = useUser();

  const [loading, setLoading] = useState(true);

  const { getToken } = useAuth();

  const fetchCreations = async () => {
    try {
      const { data } = await axios.post("/api/user/get-published-creations", {
        headers: {
          Authorization: `Bearer ${await getToken()}`,
        },
      });
      if (data.success) {
        setCreations(data.creations);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
    setLoading(false);
  };

  const imageLikeToggle = async (id) => {
    try {
>>>>>>> 6316eab6093acb8b4ff44c1ebf38d1c0c4f0b1de
      const { data } = await axios.post(
        "/api/user/toggle-creation-like",
        { creationId: id },
        {
          headers: {
<<<<<<< HEAD
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
=======
            Authorization: `Bearer ${await getToken()}`,
          },
        }
      );

      if (data.success) {
        toast.success(data.message);
        await fetchCreations();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
>>>>>>> 6316eab6093acb8b4ff44c1ebf38d1c0c4f0b1de
    }
  };

  useEffect(() => {
    if (user) {
<<<<<<< HEAD
      fetchCreations();
    }
  }, [user, fetchCreations]);
=======
      fetchCreations(); // ✅ Use the correct dataset
    }
  }, [fetchCreations]);
>>>>>>> 6316eab6093acb8b4ff44c1ebf38d1c0c4f0b1de

  return !loading ? (
    <div className="flex-1 h-full flex flex-col gap-4 p-6">
      <h2 className="text-xl font-semibold">Creations</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 overflow-y-auto">
        {creations.map((creation, index) => (
<<<<<<< HEAD
          <div key={creation.id || index} className="relative group w-full">
=======
          <div key={index} className="relative group w-full">
>>>>>>> 6316eab6093acb8b4ff44c1ebf38d1c0c4f0b1de
            <img
              src={creation.content}
              alt={creation.prompt || "Generated Image"}
              className="w-full h-60 object-cover rounded-lg"
            />

            <div className="absolute inset-0 p-4 rounded-lg flex flex-col justify-end bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white">
              <p className="text-sm truncate">{creation.prompt}</p>
<<<<<<< HEAD

              <div className="flex gap-1 items-center">
                <p>{creation.likes?.length || 0}</p>
                <Heart
                  onClick={() => imageLikeToggle(creation.id)}
                  className={`w-5 h-5 hover:scale-110 cursor-pointer ${
                    creation.likes?.includes(user?.id)
=======
              <div className="flex gap-1 items-center">
                <p>{creation.likes.length}</p>
                <Heart
                  onClick={() => imageLikeToggle(creation.id)}
                  className={`w-5 h-5 hover:scale-110 cursor-pointer ${
                    creation.likes.includes(user?.id)
>>>>>>> 6316eab6093acb8b4ff44c1ebf38d1c0c4f0b1de
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
<<<<<<< HEAD
      <span className="w-10 h-10 my-1 rounded-full border-2 border-green-500 border-t-transparent animate-spin"></span>
=======
      <span className="w-10 h-10 my-1 rounded-full border-3 border-primary border-t-3 border-t-transparent animate-spin"></span>
>>>>>>> 6316eab6093acb8b4ff44c1ebf38d1c0c4f0b1de
    </div>
  );
};

export default Community;
