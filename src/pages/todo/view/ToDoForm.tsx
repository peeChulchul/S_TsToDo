import React, { ChangeEvent, FormEvent, useState } from "react";
import { addJsonToDos } from "src/api/json_server";
import { Container } from "src/components/Container";
import { addToDo } from "src/redux/modules/toDoModules";
import { useAppDispatch } from "src/redux/store";
import styled from "styled-components";
import { v4 } from "uuid";
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
  const dispatch = useAppDispatch();

  function onChangeTitle(e: ChangeEvent<HTMLInputElement>) {
    setInputValue((prev) => ({ ...prev, title: e.target.value }));
  }
  function onChangeContent(e: ChangeEvent<HTMLInputElement>) {
    setInputValue((prev) => ({ ...prev, content: e.target.value }));
  }

  async function onSubmitToDoForm(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const id = v4();
    const createAt = Date.now();
    addJsonToDos({ title: inputValue.title, content: inputValue.content, id, createAt });
    dispatch(addToDo({ title: inputValue.title, content: inputValue.content, id, createAt }));
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
