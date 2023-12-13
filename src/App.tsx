import React from "react";
import { GlobalStyles } from "src/style/GlobalStyles";
import { ThemeProvider } from "styled-components";
import { theme } from "src/style/theme";
import { Router } from "src/shared/Router";

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <Router />
      </ThemeProvider>
    </>
  );
}

export default App;
