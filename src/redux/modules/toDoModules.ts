import { createAsyncThunk, createSlice, AsyncThunk } from "@reduxjs/toolkit";
import { addJsonToDos, deleteJsonToDo, getJsonToDos, modifyJsonToDo, switchJsonToDos } from "src/api/json_server";
import { Tcategory, Itodo } from "src/types/todo";

const initialState: { localToDo: Itodo[]; category: Tcategory; isLoading: boolean } = {
  localToDo: [],
  category: "All",
  isLoading: true
};

export const __getToDos: AsyncThunk<Itodo[], undefined, {}> = createAsyncThunk(
  "GET_ToDos",
  async (payload, thunkAPI) => {
    try {
      const response = await getJsonToDos();
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const __addToDos: AsyncThunk<Itodo, Omit<Itodo, "isDone">, {}> = createAsyncThunk(
  "ADD_ToDos",
  async (payload, thunkAPI) => {
    try {
      const response = await addJsonToDos({ ...payload });
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __switchToDos: AsyncThunk<Itodo, Pick<Itodo, "isDone" | "id">, {}> = createAsyncThunk(
  "SWITCH_ToDos",
  async (payload, thunkAPI) => {
    try {
      const response = await switchJsonToDos({ ...payload });
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const __modifyToDos: AsyncThunk<any, Omit<Itodo, "isDone">, {}> = createAsyncThunk(
  "MODIFY_ToDos",
  async (payload, thunkAPI) => {
    try {
      const response = await modifyJsonToDo({ ...payload });
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __deleteToDos: AsyncThunk<any, Pick<Itodo, "id">, {}> = createAsyncThunk(
  "DELETE_ToDos",
  async (payload, thunkAPI) => {
    try {
      await deleteJsonToDo({ ...payload });
      return thunkAPI.fulfillWithValue(payload);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const toDoModules = createSlice({
  name: "toDoModules",
  initialState,
  reducers: {
    chageCategory: (state, actions) => {
      state.category = actions.payload;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(__getToDos.pending, (state, actions) => {
        state.isLoading = true;
      })
      .addCase(__getToDos.fulfilled, (state, actions) => {
        state.isLoading = false;
        state.localToDo = actions.payload;
      })
      .addCase(__getToDos.rejected, (state, actions) => {
        state.isLoading = false;
        console.log(actions.payload);
      })
      .addCase(__addToDos.pending, (state, actions) => {
        state.isLoading = true;
      })
      .addCase(__addToDos.fulfilled, (state, actions) => {
        state.isLoading = false;
        state.localToDo = [actions.payload, ...state.localToDo];
      })
      .addCase(__addToDos.rejected, (state, actions) => {
        state.isLoading = false;
        console.log(actions.payload);
      })

      .addCase(__switchToDos.pending, (state, actions) => {
        state.isLoading = true;
      })
      .addCase(__switchToDos.fulfilled, (state, actions) => {
        state.isLoading = false;
        const id = actions.payload.id;
        const newTodo = state.localToDo.map((todo) => {
          if (todo.id === id) {
            return { ...actions.payload };
          }
          return todo;
        });
        state.localToDo = newTodo;
      })
      .addCase(__switchToDos.rejected, (state, actions) => {
        state.isLoading = false;
        console.log(actions.payload);
      })

      .addCase(__modifyToDos.pending, (state, actions) => {
        state.isLoading = true;
      })
      .addCase(__modifyToDos.fulfilled, (state, actions) => {
        state.isLoading = false;
        const id = actions.payload.id;
        const newTodo = state.localToDo.map((todo) => {
          if (todo.id === id) {
            return { ...actions.payload };
          }
          return todo;
        });
        state.localToDo = newTodo;
      })
      .addCase(__modifyToDos.rejected, (state, actions) => {
        state.isLoading = false;
      })

      .addCase(__deleteToDos.pending, (state, actions) => {
        state.isLoading = true;
      })
      .addCase(__deleteToDos.fulfilled, (state, actions) => {
        const newToDo = state.localToDo.filter((todo) => todo.id !== actions.payload.id);
        state.localToDo = newToDo;
      })
      .addCase(__deleteToDos.rejected, (state, actions) => {})
      .addDefaultCase((state, action) => {});
  }
});

export const { chageCategory } = toDoModules.actions;
export default toDoModules.reducer;
