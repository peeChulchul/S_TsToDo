import React, { ChangeEvent, Dispatch, FormEvent, SetStateAction, useState } from "react";
import { MdCheck, MdCancel } from "react-icons/md";
import { useToDoContext } from "src/context/ToDoContext";
import { Itodo } from "src/types/todo";
import styled from "styled-components";

const ToDoModifyForm = styled.form`
  display: flex;
`;

interface ItoDoModifyProps {
  todo: Itodo;
  setIsModify: Dispatch<SetStateAction<boolean>>;
}

export default function ToDoModify({ todo, setIsModify }: ItoDoModifyProps) {
  const { content, title, key } = todo;

  const { setLocalToDo } = useToDoContext();
  const [inputValue, setInputValue] = useState<{ title: string; content: string }>({ title: title, content: content });

  function onChangeTitle(e: ChangeEvent<HTMLInputElement>) {
    setInputValue((prev) => ({ ...prev, title: e.target.value }));
  }
  function onChangeContent(e: ChangeEvent<HTMLInputElement>) {
    setInputValue((prev) => ({ ...prev, content: e.target.value }));
  }

  function onSubmitModify(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLocalToDo((prev) => {
      const newToDo = prev.map((todo) => {
        if (todo.key === key) {
          return { ...todo, createAt: Date.now(), title: inputValue.title, content: inputValue.content };
        }
        return todo;
      });
      return newToDo;
    });
    setIsModify(false);
  }
  function onClickCancel() {
    setIsModify(false);
  }

  return (
    <ToDoModifyForm onSubmit={onSubmitModify}>
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <input value={inputValue.title} onChange={onChangeTitle} placeholder="제목을 입력해주세요"></input>
        <input value={inputValue.content} onChange={onChangeContent} placeholder="내용을 입력해주세요"></input>
      </div>
      <button>
        <MdCheck />
      </button>
      <button onClick={onClickCancel}>
        <MdCancel />
      </button>
    </ToDoModifyForm>
  );
}
