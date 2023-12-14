import React, { useState } from "react";
import styled, { css } from "styled-components";
import { MdDelete, MdAutoFixNormal } from "react-icons/md";
import { Itodo } from "src/types/todo";
import ToDoModify from "./ToDoModify";
import { useToDoContext } from "src/context/ToDoContext";

const ToDoBox = styled.li`
  display: flex;
  align-items: center;
`;

const ToDoTop = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 1;
  cursor: pointer;
  overflow: hidden;
  .wrapper {
    display: flex;
    align-items: center;
  }
  .todo__title {
    flex: 1;
  }
  .todo__createAt {
    font-size: ${({ theme }) => theme.fontSize.sm};
    margin-left: auto;
  }
`;

const ToDoBottom = styled.div<{ $isOpen: boolean }>`
  max-height: 0px;
  transition: all 0.2s ease-in;
  overflow: hidden;
  ${({ $isOpen }) =>
    $isOpen &&
    css`
      max-height: 300px;
      height: fit-content;
      display: flex;
      flex-direction: column;
    `}
  hr {
    margin: 4px 0px;
    border-color: ${({ theme }) => theme.color.primary};
  }
`;

const ToDoBtns = styled.div``;

interface ItoDoItemProps {
  todo: Itodo;
}

export default function ToDoItem({ todo }: ItoDoItemProps) {
  const { content, createAt: timeStamp, isDone, title, key } = todo;
  const { setLocalToDo } = useToDoContext();
  const [isOpen, setIsOpen] = useState(false);
  const [checked, setChecked] = useState(isDone);
  const [isModify, setIsModify] = useState(false);
  const currentDate = new Date(timeStamp);
  const createAt = currentDate.toISOString().slice(0, 16).replace("T", " ");

  function onChangeChecked() {
    setChecked((prev) => !prev);
  }

  function onClickDelete() {
    setLocalToDo((prev) => {
      const newTodo = prev.filter((todo) => todo.key !== key);
      return newTodo;
    });
  }

  return (
    <>
      {isModify ? (
        <ToDoModify todo={todo} setIsModify={setIsModify} />
      ) : (
        <ToDoBox>
          <input checked={checked} onChange={onChangeChecked} type="checkbox"></input>
          <ToDoTop onClick={() => setIsOpen((prev) => !prev)}>
            <div className="wrapper">
              <h1 className="todo__title">{title}</h1>
            </div>
            <ToDoBottom $isOpen={isOpen}>
              <hr />
              <p>{content}</p>
            </ToDoBottom>
          </ToDoTop>
          <p className="todo__createAt">{createAt}</p>
          <ToDoBtns>
            <MdAutoFixNormal
              onClick={() => {
                setIsModify(true);
              }}
            />
            <MdDelete onClick={onClickDelete} />
          </ToDoBtns>
        </ToDoBox>
      )}
    </>
  );
}
