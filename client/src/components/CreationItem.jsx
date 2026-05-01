import React, { useState } from "react";
import Markdown from "react-markdown";

const CreationItem = ({ item }) => {
  const [expanded, setExpanded] = useState(false);
<<<<<<< HEAD

  if (!item) return null;

=======
>>>>>>> 6316eab6093acb8b4ff44c1ebf38d1c0c4f0b1de
  return (
    <div
      onClick={() => setExpanded(!expanded)}
      className="p-4 max-w-5xl text-sm bg-white border border-gray-200 rounded-lg cursor-pointer"
    >
      <div className="flex justify-between items-center gap-4">
        <div>
<<<<<<< HEAD
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

=======
          <h2>{item.prompt}</h2>
          <p>
            {item.type} - {new Date(item.created_at).toLocaleDateString()}
          </p>
        </div>
        <button className="bg-[#EFF6FF] border border-[#BFDBFE] text-[#1E40AF] px-4 py-1 rounded-full">
          {item.type}
        </button>
      </div>
>>>>>>> 6316eab6093acb8b4ff44c1ebf38d1c0c4f0b1de
      {expanded && (
        <div>
          {item.type === "image" ? (
            <div>
              <img
<<<<<<< HEAD
                src={item.content || ""}
=======
                src={item.content}
>>>>>>> 6316eab6093acb8b4ff44c1ebf38d1c0c4f0b1de
                alt="image"
                className="mt-3 w-full max-w-md"
              />
            </div>
          ) : (
            <div className="mt-3 h-full overflow-y-scroll text-sm text-slate-700">
              <div className="react-tw">
<<<<<<< HEAD
                <Markdown>{item.content || "No content available"}</Markdown>
=======
                <Markdown>{item.content}</Markdown>
>>>>>>> 6316eab6093acb8b4ff44c1ebf38d1c0c4f0b1de
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CreationItem;
