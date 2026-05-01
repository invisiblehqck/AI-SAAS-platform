<<<<<<< HEAD
import React, { useState } from "react";
import axios from "axios";

const WriteArticle = () => {
  const [prompt, setPrompt] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const generateArticle = async () => {
    if (!prompt.trim()) {
      setError("Please enter a prompt.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setContent("");

      const { data } = await axios.post(
        "http://localhost:5000/api/ai/generate-article",
        {
          prompt,
          length: 200,
        },
        {
          withCredentials: true,
        },
=======
import { Edit, Sparkles } from "lucide-react";
import { useState } from "react";
import axios from "axios";
import { useAuth } from "@clerk/clerk-react";
import toast from "react-hot-toast";
import Markdown from "react-markdown";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const WriteArticle = () => {
  const articlelength = [
    {
      length: 800,
      text: "Short (500-800 words)",
    },
    { length: 1200, text: "Medium (800-1200 words)" },
    { length: 2000, text: "Long (1200+ words)" },
  ];

  const [selectedLength, setSelectedLength] = useState(articlelength[0]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");

  const { getToken } = useAuth();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const prompt = `Write an article about "${input}"in ${selectedLength.text}`;
      const { data } = await axios.post(
        "/api/ai/generate-article",
        {
          prompt,
          length: selectedLength.length,
        },
        {
          headers: { Authorization: `Bearer ${await getToken()}` },
        }
>>>>>>> 6316eab6093acb8b4ff44c1ebf38d1c0c4f0b1de
      );

      if (data.success) {
        setContent(data.content);
      } else {
<<<<<<< HEAD
        setError(data.message || "Failed to generate article");
      }
    } catch (err) {
      console.error("Frontend Generate Article Error:", err);
      setError(
        err.response?.data?.message ||
          "Something went wrong while generating article",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 min-h-screen bg-[#F4F7FB] p-6 md:p-10">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6">
          Write Article
        </h1>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Article Prompt
          </label>

          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Enter your article topic, for example: Write an article on artificial intelligence"
            className="w-full h-40 rounded-lg border border-gray-300 p-4 outline-none focus:ring-2 focus:ring-purple-500 resize-none"
          />

          <button
            onClick={generateArticle}
            disabled={loading}
            className="mt-4 px-6 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium hover:opacity-90 disabled:opacity-60"
          >
            {loading ? "Generating..." : "Generate"}
          </button>

          {error && <p className="mt-4 text-sm text-red-500">{error}</p>}

          {content && (
            <div className="mt-6 border-t pt-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-3">
                Generated Article
              </h2>
              <div className="whitespace-pre-wrap text-gray-700 leading-7">
                {content}
              </div>
            </div>
          )}
        </div>
=======
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
    setLoading(false);
  };

  return (
    <div className="h-full overflow-y-scroll p-6 flex  items-start flex-wrap gap-4 text-slate-700">
      {/* Left column */}
      <form
        onSubmit={onSubmitHandler}
        className="flex-1 max-w-lg p-4 bg-white rounded-lg border border-gray-200"
      >
        <div className="flex items-center gap-3 ">
          <Sparkles className="w-6 text-[#4A7AFF]" />
          <h1 className="text-xl font-semibold">Article Configuration</h1>
        </div>

        <p className=" mt-6 text-sm font-medium">Article Topic</p>

        <input
          onChange={(e) => setInput(e.target.value)}
          value={input}
          type="text"
          className="w-full p-2 px-3 mt-2 outline-none text-sm border border-gray-300 rounded-md"
          placeholder="The future of artificial intelligence is ..."
          required
        />

        <p className="mt-4 text-sm font-medium">Article Length</p>

        <div className="mt-3 flex gap-3 flex-wrap sm:max-w-9/11">
          {articlelength.map((item, index) => (
            <span
              key={index}
              className={`cursor-pointer px-4 py-1 border rounded-full text-xs ${
                selectedLength.text === item.text
                  ? "bg-blue-50 text-blue-700"
                  : "border-gray-300 text-gray-500"
              }`}
              onClick={() => setSelectedLength(item)}
            >
              {item.text}
            </span>
          ))}
        </div>
        <br />
        <button
          disabled={loading}
          className="w-full mt-6 flex items-center justify-center gap-2 px-4 py-2 text-sm bg-gradient-to-r from-[#226BFF] to-[#65ADFF] text-white rounded-lg cursor-pointer"
        >
          {loading ? (
            <span className="w-4 h-4 my-1 rounded-full border-2 border-t-transparent animate-spin"></span>
          ) : (
            <Edit className="w-5" />
          )}
          Generate Article
        </button>
      </form>

      {/* right column */}
      <div className="w-full max-w-lg p-4 bg-white rounded-lg flex flex-col  border border-gray-200 min-h-96 max-h-[600px]">
        <div className="flex items-center gap-3">
          <Edit className="w-5 h-5 text-[#4A7AFF]" />
          <h1 className="text-xl font-semibold">Generate Article</h1>
        </div>

        {!content ? (
          <div className="flex-1 flex justify-center items-center">
            <div className="text-sm flex flex-col items-center gap-5 text-gray-400">
              <Edit className="w-9 h-9" />
              <p>enter a topic and click "Generate Article" to get started</p>
            </div>
          </div>
        ) : (
          <div className="mt-3 h-full overflow-y-scroll text-sm text-slate-600">
            <div className="reset-tw">
              <Markdown>{content}</Markdown>
            </div>
          </div>
        )}
>>>>>>> 6316eab6093acb8b4ff44c1ebf38d1c0c4f0b1de
      </div>
    </div>
  );
};

export default WriteArticle;
