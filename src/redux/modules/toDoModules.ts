import { createSlice } from "@reduxjs/toolkit";
import { Tcategory, Itodo } from "src/types/todo";

const storedToDos = localStorage.getItem("ToDos");
const parsedToDos = storedToDos ? (JSON.parse(storedToDos) as Itodo[]) : [];

const initialState: { localToDo: Itodo[]; category: Tcategory } = {
  localToDo: parsedToDos,
  category: "All"
};

const toDoModules = createSlice({
  name: "toDoModules",
  initialState,
  reducers: {
    setToDo: (state, actions) => {
      state.localToDo = actions.payload;
    },
    chageCategory: (state, actions) => {
      state.category = actions.payload;
    }
  }
});

export const { setToDo, chageCategory } = toDoModules.actions;
export default toDoModules.reducer;
