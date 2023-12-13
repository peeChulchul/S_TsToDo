import React from "react";
import ToDoHeader from "../ToDoHeader";
import ToDoList from "../ToDoList";
import ToDoInput from "../ToDoInput";

export default function PageToDo() {
  return (
    <div>
      <ToDoHeader />
      <ToDoList />
      <ToDoInput />
    </div>
  );
}
