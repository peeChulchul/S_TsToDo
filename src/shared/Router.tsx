import { BrowserRouter, Routes, Route } from "react-router-dom";
import PageToDo from "src/pages/todo/view/PageToDo";
import { RootState, useAppSelector } from "src/redux/store";
import { GlobalStyles } from "src/style/GlobalStyles";
import { darkTheme, theme } from "src/style/theme";
import { ThemeProvider } from "styled-components";

export function Router() {
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
