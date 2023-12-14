import React from "react";
import ToDoHeader from "./ToDoHeader";
import ToDoList from "./ToDoList";

export default function PageToDo() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <ToDoHeader />
      <ToDoList />
    </div>
  );
}
