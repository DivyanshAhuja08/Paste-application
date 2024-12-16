import { createSlice } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';

const initialState = {
  pastes: localStorage.getItem("pastes")
    ? JSON.parse(localStorage.getItem("pastes"))
    : [],
};

export const pasteSlice = createSlice({
  name: 'paste',
  initialState,
  reducers: {
    addToPastes: (state, action) => {
      const paste = action.payload;
      if (!paste.title.trim()) {
        toast.error("Title cannot be empty");
        return;
      }
      if (!paste.content.trim()) {
        toast.error("Content cannot be empty");
        return;
      }
      // Check if paste already exists (by title, for example)
      const exists = state.pastes.some(p => p.title === paste.title);
      if (exists) {
        toast.error("Paste with this title already exists!");
      } else {
        state.pastes.push(paste);
        localStorage.setItem("pastes", JSON.stringify(state.pastes));
        toast.success("Paste Created Successfully");
      }
    },
    updateToPastes: (state, action) => {
      const paste = action.payload;
      if (!paste.title.trim()) {
        toast.error("Title cannot be empty");
        return;
      }
      if (!paste.content.trim()) {
        toast.error("Content cannot be empty");
        return;
      }
      const index = state.pastes.findIndex((item) => item._id === paste._id);
      if (index >= 0) {
        state.pastes[index] = paste;
        localStorage.setItem("pastes", JSON.stringify(state.pastes));
        toast.success("Paste Updated Successfully");
      } else {
        toast.error("Paste not found");
      }
    },
    resetAllPastes: (state) => {
      
      state.pastes = [];
      localStorage.removeItem("pastes");
      toast.success("All pastes reset");
    },
    removeFromPastes: (state, action) => {
      const pasteId = action.payload;
      const index = state.pastes.findIndex((item) => item._id === pasteId);
      if (index >= 0) {
        state.pastes.splice(index, 1);
        localStorage.setItem("pastes", JSON.stringify(state.pastes));
        toast.success("Paste Deleted");
      } else {
        toast.error("Paste not found");
      }
    },
  },
});

export const { addToPastes, updateToPastes, resetAllPastes, removeFromPastes } = pasteSlice.actions;
export default pasteSlice.reducer;
