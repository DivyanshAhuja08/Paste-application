import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromPastes } from "../Redux/pasteSlice";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

export const Paste = () => {
  const pastes = useSelector((state) => state.paste.pastes || []);
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();

  const filteredData = pastes.filter((paste) =>
    paste.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  function handleDelete(pasteId) {
    dispatch(removeFromPastes(pasteId));
  }

  return (
    <div className="p-6">
      {/* Search Field */}
      <input
        className="p-3 rounded-xl min-w-[300px] w-[60%] mt-5 border border-gray-300 shadow-md focus:outline-none focus:ring-4 focus:ring-blue-500 transition-all"
        type="search"
        placeholder="Search for pastes..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="flex flex-col gap-6 mt-6">
        {filteredData.length > 0 ? (
          filteredData.map((paste) => (
            <div
              className="p-5 rounded-2xl shadow-lg border border-gray-200 bg-white hover:shadow-2xl transition-all transform hover:-translate-y-1"
              key={paste._id}
            >
              <div className="text-lg font-semibold text-blue-600 mb-2">
                {paste.title}
              </div>
              <div className="text-gray-700 mb-4">{paste.content}</div>
              <div className="flex flex-wrap gap-4 justify-between">
                {/* Edit Button */}
                <Link
                  to={`/?pasteId=${paste._id}`}
                  className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition duration-300"
                >
                  Edit
                </Link>

                {/* View Button */}
                <Link
                  to={`/pastes/${paste._id}`}
                  className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition duration-300"
                >
                  View
                </Link>

                {/* Delete Button */}
                <button
                  className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition duration-300"
                  onClick={() => handleDelete(paste._id)}
                >
                  Delete
                </button>

                {/* Copy Button */}
                <button
                  className="px-4 py-2 rounded-lg bg-green-500 text-white hover:bg-green-600 transition duration-300"
                  onClick={() => {
                    navigator.clipboard.writeText(paste.content);
                    toast.success("Copied to Clipboard!");
                  }}
                >
                  Copy
                </button>

                {/* Share Button */}
                <button
                  className="px-4 py-2 rounded-lg bg-purple-500 text-white hover:bg-purple-600 transition duration-300"
                  onClick={() => {
                    if (navigator.share) {
                      navigator
                        .share({
                          title: paste.title,
                          text: paste.content,
                          url: window.location.href,
                        })
                        .then(() => toast.success("Shared successfully!"))
                        .catch((error) => {
                          toast.error("Failed to share!");
                          console.error("Share error:", error);
                        });
                    } else {
                      navigator.clipboard.writeText(
                        `${paste.title}\n${paste.content}`
                      );
                      toast.info(
                        "Sharing not supported. Content copied to clipboard."
                      );
                    }
                  }}
                >
                  Share
                </button>
              </div>
              <div className="mt-4 text-sm text-gray-500">
                {new Date(paste.createAt).toLocaleString()}
              </div>
            </div>
          ))
        ) : (
          <div className="text-gray-600 text-center mt-10 animate-pulse">
            No pastes found. Try creating one!
          </div>
        )}
      </div>
    </div>
  );
};
