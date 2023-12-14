import React, { useState } from "react";
import { Container } from "src/components/Container";
import styled from "styled-components";
import ToDoItem from "../ToDoItem";
import { useToDoContext } from "src/context/ToDoContext";

const ToDoItemBox = styled.ul`
  background-color: ${({ theme }) => theme.color.bg};
  color: ${({ theme }) => theme.color.text};
  padding: ${({ theme }) => theme.spacing.xl} 0;
  flex: 1;
`;

export default function ToDoList() {
  const { localToDo, category } = useToDoContext();

  const SelectToDos = localToDo.filter((todo) => {
    if (category === "Active") {
      return todo.isDone === false;
    }
    if (category === "Completed") {
      return todo.isDone === true;
    }
    return true;
  });

  return (
    <ToDoItemBox>
      <Container>
        {SelectToDos.map((todo) => (
          <ToDoItem key={todo.key} todo={todo} />
        ))}
      </Container>
    </ToDoItemBox>
  );
}
