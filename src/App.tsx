import React from "react";
import { GlobalStyles } from "src/style/GlobalStyles";
import { Router } from "src/shared/Router";
import { Provider, useSelector } from "react-redux";
import { store } from "./redux/store";
import { ThemeProvider } from "styled-components";
import { darkTheme, theme } from "./style/theme";

function App() {
  return (
    <>
      <Provider store={store}>
        <Router />
      </Provider>
    </>
  );
}

export default App;
