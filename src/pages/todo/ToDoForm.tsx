import React, { ChangeEvent, FormEvent, useState } from "react";
import { Container } from "src/components/Container";
import useToDoDispatch from "src/hooks/useToDoDispatch";
import styled from "styled-components";
const ToDoForm = styled.form`
  background-color: ${({ theme }) => theme.color.primary};
  padding: ${({ theme }) => theme.spacing.lg} 0;
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
  const { addToDo } = useToDoDispatch();

  function onChangeTitle(e: ChangeEvent<HTMLInputElement>) {
    setInputValue((prev) => ({ ...prev, title: e.target.value }));
  }
  function onChangeContent(e: ChangeEvent<HTMLInputElement>) {
    setInputValue((prev) => ({ ...prev, content: e.target.value }));
  }

  function onSubmitToDoForm(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    addToDo({ title: inputValue.title, content: inputValue.content });
    setInputValue({ title: "", content: "" });
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
