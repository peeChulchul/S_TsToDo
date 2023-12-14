import React from "react";
import { GlobalStyles } from "src/style/GlobalStyles";
import { ThemeProvider } from "styled-components";
import { theme } from "src/style/theme";
import { Router } from "src/shared/Router";
import { ToDoContextProvider } from "./context/ToDoContext";

function App() {
  return (
    <>
      <ToDoContextProvider>
        <ThemeProvider theme={theme}>
          <GlobalStyles />
          <Router />
        </ThemeProvider>
      </ToDoContextProvider>
    </>
  );
}

export default App;
