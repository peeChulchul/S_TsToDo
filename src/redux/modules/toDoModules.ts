import { createSlice } from "@reduxjs/toolkit";
import { Tcategory } from "src/types/todo";

const initialState: { category: Tcategory } = {
  category: "All"
};

const toDoModules = createSlice({
  name: "toDoModules",
  initialState,
  reducers: {
    chageCategory: (state, actions) => {
      state.category = actions.payload;
    }
  }
});

export const { chageCategory } = toDoModules.actions;
export default toDoModules.reducer;
