import React from "react";
import { GlobalStyles } from "src/style/GlobalStyles";
import { Router } from "src/shared/Router";
import { ToDoContextProvider } from "./context/ToDoContext";
import { ThemeContextProvider } from "./context/ThemeContext";
import { Provider } from "react-redux";
import { store } from "./redux/store";

function App() {
  return (
    <>
      <Provider store={store}>
        <ThemeContextProvider>
          <ToDoContextProvider>
            <GlobalStyles />
            <Router />
          </ToDoContextProvider>
        </ThemeContextProvider>
      </Provider>
    </>
  );
}

export default App;
