import { createSlice } from "@reduxjs/toolkit";

const storedTheme = localStorage.getItem("Theme");
const parsedToDos = storedTheme ? JSON.parse(storedTheme) : "light";

const initialState: { currentTheme: string } = {
  currentTheme: parsedToDos
};

const themeModules = createSlice({
  name: "themeModules",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      const newTheme = state.currentTheme === "light" ? "dark" : "light";
      state.currentTheme = newTheme;
      localStorage.setItem("Theme", JSON.stringify(state.currentTheme));
    }
  }
});

export const { toggleTheme } = themeModules.actions;
export default themeModules.reducer;
