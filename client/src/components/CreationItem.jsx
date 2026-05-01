import React, { useState } from "react";
import Markdown from "react-markdown";

const CreationItem = ({ item }) => {
  const [expanded, setExpanded] = useState(false);

  if (!item) return null;

  return (
    <div
      onClick={() => setExpanded(!expanded)}
      className="p-4 max-w-5xl text-sm bg-white border border-gray-200 rounded-lg cursor-pointer"
    >
      <div className="flex justify-between items-center gap-4">
        <div>
          <h2>{item.prompt || "No prompt available"}</h2>
          <p>
            {item.type || "Unknown"} -{" "}
            {item.created_at
              ? new Date(item.created_at).toLocaleDateString()
              : "No date"}
          </p>
        </div>

        <button className="bg-[#EFF6FF] border border-[#BFDBFE] text-[#1E40AF] px-4 py-1 rounded-full">
          {item.type || "Unknown"}
        </button>
      </div>

      {expanded && (
        <div>
          {item.type === "image" ? (
            <div>
              <img
                src={item.content || ""}
                alt="image"
                className="mt-3 w-full max-w-md"
              />
            </div>
          ) : (
            <div className="mt-3 h-full overflow-y-scroll text-sm text-slate-700">
              <div className="react-tw">
                <Markdown>{item.content || "No content available"}</Markdown>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CreationItem;
