import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

export const Viewpastes = () => {
  const { id } = useParams();
  const allPastes = useSelector((state) => state.paste.pastes);
  const paste = allPastes.find((a) => a._id === id);

  return (
    <div className="p-6 min-h-screen bg-gray-50 flex items-center justify-center">
      {paste ? (
        <div className="flex flex-col gap-6 bg-white p-6 rounded-2xl shadow-lg max-w-[800px] w-full">
          {/* Title Section */}
          <input
            className="p-3 rounded-lg border border-gray-300 shadow-md w-full text-lg font-semibold text-gray-800 focus:outline-none focus:ring-4 focus:ring-blue-500 disabled:bg-gray-100"
            type="text"
            placeholder="Enter Title Here"
            value={paste.title}
            disabled
          />

          {/* Content Section */}
          <div className="flex flex-col gap-4">
            {/* Copy Button */}
            <button
              className="px-4 py-2 rounded-lg bg-green-500 text-white font-medium hover:bg-green-600 transition duration-300 self-end shadow-md"
              onClick={() => {
                navigator.clipboard.writeText(paste.content);
                toast.success("Copied to Clipboard!");
              }}
            >
              Copy
            </button>
            <textarea
              className="p-4 rounded-lg border border-gray-300 shadow-md w-full text-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-500 disabled:bg-gray-100"
              placeholder="Enter Content Here"
              value={paste.content}
              rows={12}
              disabled
            ></textarea>
          </div>
        </div>
      ) : (
        <div className="text-center text-gray-600 font-medium">
          Paste not found. Please check the URL or try again.
        </div>
      )}
    </div>
  );
};
