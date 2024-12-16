import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import {
  addToPastes,
  updateToPastes,
  resetAllPastes,
} from "../Redux/pasteSlice";

export const Home = () => {
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const pasteId = searchParams.get("pasteId");
  const dispatch = useDispatch();
  const allPastes = useSelector((state) => state.paste.pastes);

  useEffect(() => {
    if (pasteId) {
      const paste = allPastes.find((a) => a._id === pasteId);
      setTitle(paste?.title || "");
      setValue(paste?.content || "");
    }
  }, [pasteId]);

  function createPaste() {
    const paste = {
      title: title.trim(),
      content: value.trim(),
      _id: pasteId || Date.now().toString(36),
      createAt: new Date().toISOString(),
    };

    if (pasteId) {
      dispatch(updateToPastes(paste));
    } else {
      dispatch(addToPastes(paste));
    }

    resetFields();
  }

  function handleResetAll() {
    dispatch(resetAllPastes());
    resetFields();
  }

  function resetFields() {
    setTitle("");
    setValue("");
    setSearchParams({});
  }

  return (
    <div
      className="max-w-3xl mx-auto p-4 bg-gradient-to-br from-blue-100 to-indigo-200 shadow-lg rounded-2xl animate-fade-in "
      style={{ animation: "fadeIn 0.5s ease-in-out" }}
    >
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-7 items-center">
        <input
          className="p-3 rounded-xl w-full sm:w-[66%] border border-gray-300 focus:outline-none focus:ring-4 focus:ring-blue-400 focus:border-transparent shadow-md transition duration-300"
          type="text"
          placeholder="Enter Title Here"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button
          className="p-3 rounded-xl bg-blue-500 text-white w-full sm:w-auto hover:bg-blue-600 transform hover:scale-105 transition duration-300 shadow-lg"
          onClick={createPaste}
        >
          {pasteId ? "Update My Paste" : "Create My Paste"}
        </button>
        <button
          className="p-3 rounded-xl bg-red-500 text-white w-full sm:w-auto hover:bg-red-600 transform hover:scale-105 transition duration-300 shadow-lg"
          onClick={handleResetAll}
        >
          Reset All Pastes
        </button>
      </div>

      <div className="mt-6 flex-grow">
        <textarea
          className="w-full p-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-4 focus:ring-blue-400 focus:border-transparent shadow-md transition duration-300 flex-grow"
          placeholder="Enter Content Here"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          rows={12}
        ></textarea>
      </div>

      {/* Animation Keyframes */}
      <style>
        {`
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(-20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>
    </div>
  );
};
