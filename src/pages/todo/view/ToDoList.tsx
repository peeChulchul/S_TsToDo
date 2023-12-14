import React, { useState } from "react";
import { Container } from "src/components/Container";
import styled from "styled-components";
import ToDoItem from "../ToDoItem";
import { useToDoContext } from "src/context/ToDoContext";

export default function ToDoList() {
  const { localToDo } = useToDoContext();

  return (
    <ul>
      <Container>
        {localToDo.map((todo) => (
          <ToDoItem key={todo.key} todo={todo} />
        ))}
      </Container>
    </ul>
  );
}
