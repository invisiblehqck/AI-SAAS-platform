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
      );

      if (data.success) {
        setContent(data.content);
      } else {
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
      </div>
    </div>
  );
};

export default WriteArticle;
