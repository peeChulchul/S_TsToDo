import { useCallback, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { getJsonToDos } from "src/api/json_server";
import PageToDo from "src/pages/todo/view/PageToDo";
import { getToDo } from "src/redux/modules/toDoModules";
import { RootState, useAppDispatch, useAppSelector } from "src/redux/store";
import { GlobalStyles } from "src/style/GlobalStyles";
import { darkTheme, theme } from "src/style/theme";
import { ThemeProvider } from "styled-components";

export function Router() {
  const dispatch = useAppDispatch();

  const fetchToDos = useCallback(async () => {
    const result = await getJsonToDos();
    dispatch(getToDo(result));
  }, [dispatch]);

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
