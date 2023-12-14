import React from "react";
import { GlobalStyles } from "src/style/GlobalStyles";
import { ThemeProvider } from "styled-components";
import { darkTheme } from "src/style/theme";
import { Router } from "src/shared/Router";
import { ToDoContextProvider } from "./context/ToDoContext";
import { ThemeContextProvider } from "./context/ThemeContext";

function App() {
  return (
    <>
      <ThemeContextProvider>
        <ToDoContextProvider>
          <GlobalStyles />
          <Router />
        </ToDoContextProvider>
      </ThemeContextProvider>
    </>
  );
}

export default App;
