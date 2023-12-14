import { configureStore } from "@reduxjs/toolkit";
import { themeModules, toDoModules } from "./modules";
export const store = configureStore({
  reducer: { themeModules, toDoModules }
});
