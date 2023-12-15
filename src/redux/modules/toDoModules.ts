import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Tcategory, Itodo } from "src/types/todo";
import { v4 as uuidv4 } from "uuid";

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
    addToDo: (state, actions: PayloadAction<Omit<Itodo, "createAt" | "isDone" | "key">>) => {
      const key = uuidv4();
      const createAt = Date.now();
      state.localToDo = [{ key, ...actions.payload, isDone: false, createAt }, ...state.localToDo];
    },
    deleteToDo: (state, actions: PayloadAction<Pick<Itodo, "key">>) => {
      state.localToDo = state.localToDo.filter((todo) => todo.key !== actions.payload.key);
    },
    modifyToDo: (state, actions: PayloadAction<Omit<Itodo, "createAt" | "isDone"> & { isDone?: boolean }>) => {
      const createAt = Date.now();
      state.localToDo = state.localToDo.map((todo) => {
        if (todo.key === actions.payload.key) {
          return {
            ...todo,
            createAt,
            ...actions.payload,
            isDone: actions.payload.isDone !== undefined ? actions.payload.isDone : todo.isDone
          };
        }
        return todo;
      });
    },
    chageCategory: (state, actions) => {
      state.category = actions.payload;
    }
  }
});

export const { setToDo, chageCategory } = toDoModules.actions;
export default toDoModules.reducer;
