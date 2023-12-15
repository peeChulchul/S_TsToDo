import { useCallback, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PageToDo from "src/pages/todo/view/PageToDo";
import { __getToDos } from "src/redux/modules/toDoModules";
import { RootState, useAppDispatch, useAppSelector } from "src/redux/store";
import { GlobalStyles } from "src/style/GlobalStyles";
import { darkTheme, theme } from "src/style/theme";
import { ThemeProvider } from "styled-components";

export function Router() {
  const dispatch = useAppDispatch();

  const fetchToDos = useCallback(async () => {
    await dispatch(__getToDos());
  }, []);

  useEffect(() => {
    fetchToDos();
  }, [fetchToDos]);

  const { currentTheme } = useAppSelector((modules: RootState) => modules.themeModules);
  return (
    <ThemeProvider theme={currentTheme === "light" ? theme : darkTheme}>
      <GlobalStyles />
      <BrowserRouter>
        <Routes>
          <Route index={true} element={<PageToDo />}></Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}
