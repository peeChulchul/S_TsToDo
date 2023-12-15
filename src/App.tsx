import React from "react";
import { Router } from "src/shared/Router";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function App() {
  const client = new QueryClient();
  return (
    <>
      <QueryClientProvider client={client}>
        <Provider store={store}>
          <Router />
        </Provider>
      </QueryClientProvider>
    </>
  );
}

export default App;
