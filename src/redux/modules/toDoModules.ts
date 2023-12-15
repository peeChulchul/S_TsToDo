import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Tcategory, Itodo } from "src/types/todo";

const initialState: { localToDo: Itodo[]; category: Tcategory } = {
  localToDo: [],
  category: "All"
};

const toDoModules = createSlice({
  name: "toDoModules",
  initialState,
  reducers: {
    getToDo: (state, actions) => {
      state.localToDo = actions.payload;
    },
    addToDo: (state, actions: PayloadAction<Omit<Itodo, "isDone">>) => {
      const newTodo = [{ ...actions.payload, isDone: false }, ...state.localToDo];
      state.localToDo = newTodo;
    },
    deleteToDo: (state, actions: PayloadAction<Pick<Itodo, "id">>) => {
      const newTodo = state.localToDo.filter((todo) => todo.id !== actions.payload.id);
      state.localToDo = newTodo;
    },
    switchToDo: (state, actions: PayloadAction<Pick<Itodo, "id" | "isDone">>) => {
      const newToDo = state.localToDo.map((todo) => {
        if (todo.id === actions.payload.id) {
          return { ...todo, ...actions.payload };
        }
        return todo;
      });
      state.localToDo = newToDo;
    },
    modifyToDo: (state, actions: PayloadAction<Omit<Itodo, "isDone">>) => {
      const newTodo = state.localToDo.map((todo) => {
        if (todo.id === actions.payload.id) {
          return {
            ...todo,
            ...actions.payload
          };
        }
        return todo;
      });
      state.localToDo = newTodo;
    },
    chageCategory: (state, actions) => {
      state.category = actions.payload;
    }
  }
});

export const { getToDo, addToDo, deleteToDo, modifyToDo, switchToDo, chageCategory } = toDoModules.actions;
export default toDoModules.reducer;
