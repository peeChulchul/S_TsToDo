import React, { ChangeEvent, FormEvent, useState } from "react";
import { Container } from "src/components/Container";
import { useToDoContext } from "src/context/ToDoContext";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";
const ToDoForm = styled.form`
  background-color: ${({ theme }) => theme.color.primary};
  padding: ${({ theme }) => theme.spacing.lg};
  .input__wrapper {
    display: flex;
    gap: ${({ theme }) => theme.spacing.sm};
  }
  button {
    border-radius: 4px;
    background-color: ${({ theme }) => theme.color.accent};
    padding: ${({ theme }) => theme.spacing.md};
    color: ${({ theme }) => theme.color.white};
  }
  input {
    border-radius: 4px;
    padding: ${({ theme }) => theme.spacing.sm};
    flex: 1;
    line-height: ${({ theme }) => theme.spacing.xl};
  }
`;

interface IinputVaule {
  title: string;
  content: string;
}

export default function ToDoInput() {
  const [inputValue, setInputValue] = useState<IinputVaule>({ title: "", content: "" });
  const { setLocalToDo } = useToDoContext();

  function onChangeTitle(e: ChangeEvent<HTMLInputElement>) {
    setInputValue((prev) => ({ ...prev, title: e.target.value }));
  }
  function onChangeContent(e: ChangeEvent<HTMLInputElement>) {
    setInputValue((prev) => ({ ...prev, content: e.target.value }));
  }

  function onSubmitToDoForm(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLocalToDo((prev) => [
      ...prev,
      { key: uuidv4(), title: inputValue.title, content: inputValue.content, isDone: false, createAt: Date.now() }
    ]);
  }

  return (
    <ToDoForm onSubmit={onSubmitToDoForm}>
      <Container>
        <div className="input__wrapper">
          <input value={inputValue.title} onChange={onChangeTitle} required placeholder="제목을 입력해주세요" />
          <input value={inputValue.content} onChange={onChangeContent} required placeholder="내용을 입력해주세요" />
          <button>Add</button>
        </div>
      </Container>
    </ToDoForm>
  );
}
