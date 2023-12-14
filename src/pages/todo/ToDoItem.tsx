import React, { useState } from "react";
import styled, { css } from "styled-components";
import { MdDelete, MdAutoFixNormal } from "react-icons/md";
import { Itodo } from "src/types/todo";
import ToDoModify from "./ToDoModify";
import { useToDoContext } from "src/context/ToDoContext";
import Swal from "sweetalert2";

const ToDoBox = styled.li<{ $checked: boolean }>`
  display: flex;
  align-items: center;
  text-decoration: ${({ $checked }) => $checked && "line-through"};
  gap: ${({ theme }) => theme.spacing.lg};
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.xl};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  border-radius: 8px;
  box-shadow: ${({ theme }) => theme.color.accent_alt} 2px 2px 6px;
  border: 1px solid black;
  .todo__checkbox {
    margin: 0px;
    width: 16px;
    height: 16px;
  }
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
    font-size: ${({ theme }) => theme.fontSize["2xl"]};
    font-weight: 600;
  }
  .todo__createAt {
    font-size: ${({ theme }) => theme.fontSize.sm};
    margin-left: auto;
  }
`;

const ToDoBottom = styled.div<{ $isOpen: boolean }>`
  max-height: 0px;
  transition: max-height 0.2s ease-in;
  overflow: hidden;
  font-size: ${({ theme }) => theme.fontSize.xl};

  ${({ $isOpen }) =>
    $isOpen &&
    css`
      max-height: 300px;
      height: fit-content;
      display: flex;
      flex-direction: column;
    `}
  hr {
    margin: 2px 0px;
    border: 1px solid ${({ theme }) => theme.color.accent_alt};
  }
`;

const ToDoBtns = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
  button {
    font-size: ${({ theme }) => theme.fontSize["2xl"]};
    cursor: pointer;
    color: ${({ theme }) => theme.color.accent};
  }
`;

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
    setLocalToDo((prev) => {
      const newTodo = prev.map((todo) => {
        if (todo.key === key) {
          return { ...todo, isDone: !todo.isDone };
        }
        return todo;
      });
      return newTodo;
    });
  }

  async function onClickDelete() {
    const agreed = await Swal.fire({
      icon: "warning",
      title: "삭제",
      text: `[${title}을] 삭제 하시겠습니까??`,
      showCancelButton: true,
      confirmButtonText: "삭제",
      cancelButtonText: "취소"
    });
    if (agreed.isConfirmed) {
      setLocalToDo((prev) => {
        const newTodo = prev.filter((todo) => todo.key !== key);
        return newTodo;
      });
      Swal.fire({
        icon: "success",
        title: "완료",
        text: `[${title}을] 삭제 하였습니다.`
      });
    }
  }

  return (
    <>
      {isModify ? (
        <ToDoModify todo={todo} setIsModify={setIsModify} />
      ) : (
        <ToDoBox $checked={checked}>
          <input className="todo__checkbox" checked={checked} onChange={onChangeChecked} type="checkbox"></input>
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
            <button
              onClick={() => {
                setIsModify(true);
              }}
            >
              <MdAutoFixNormal />
            </button>
            <button onClick={onClickDelete}>
              <MdDelete />
            </button>
          </ToDoBtns>
        </ToDoBox>
      )}
    </>
  );
}
