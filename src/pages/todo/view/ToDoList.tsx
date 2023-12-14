import React, { useState } from "react";
import { MdDelete } from "react-icons/md";
import { Container } from "src/components/Container";
import styled from "styled-components";

export default function ToDoList() {
  return (
    <ul>
      <Container>
        <ToDoItem></ToDoItem>
      </Container>
    </ul>
  );
}

const ToDoBox = styled.li`
  .todo__top {
    display: flex;
    align-items: center;
    .todo__title {
      flex: 1;
    }
  }
  .todo__bottom {
  }
`;

function ToDoItem() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <ToDoBox>
      <div className="todo__top">
        <input type="checkbox"></input>
        <h1 className="todo__title">제목</h1>
        <MdDelete />
      </div>
      <div className="todo__bottom">
        <p>내용</p>
      </div>
    </ToDoBox>
  );
}
