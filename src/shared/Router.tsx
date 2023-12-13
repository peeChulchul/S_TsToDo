import { BrowserRouter, Routes, Route } from "react-router-dom";
import PageToDo from "src/pages/todo/view/PageToDo";

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index={true} element={<PageToDo />}></Route>
      </Routes>
    </BrowserRouter>
  );
}
