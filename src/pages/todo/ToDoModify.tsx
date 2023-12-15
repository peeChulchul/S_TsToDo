import React, { ChangeEvent, Dispatch, FormEvent, SetStateAction, useState } from "react";
import { MdCheck, MdCancel } from "react-icons/md";
// import useToDoDispatch from "src/hooks/useToDoDispatch";
import { modifyToDo } from "src/redux/modules/toDoModules";
import { useAppDispatch } from "src/redux/store";
import { Itodo } from "src/types/todo";
import styled from "styled-components";
import Swal from "sweetalert2";
const ToDoModifyForm = styled.form`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.lg};
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.xl};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  border-radius: 8px;
  box-shadow: ${({ theme }) => theme.color.accent} 2px 2px 6px;
  border: 1px solid black;
  .input__wrapper {
    gap: ${({ theme }) => theme.spacing.sm};
    display: flex;
    flex-direction: column;
    flex: 1;
  }
  .input__title {
    max-width: 40ch;
    width: 100%;
    font-size: ${({ theme }) => theme.fontSize.xl};
  }
  .input__content {
    width: 100%;
    font-size: ${({ theme }) => theme.fontSize.base};
    resize: none;
  }
`;

const ToDoBtns = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
  button {
    font-size: ${({ theme }) => theme.fontSize["2xl"]};
    color: ${({ theme }) => theme.color.accent};
    cursor: pointer;
  }
`;

interface ItoDoModifyProps {
  todo: Itodo;
  setIsModify: Dispatch<SetStateAction<boolean>>;
}

export default function ToDoModify({ todo, setIsModify }: ItoDoModifyProps) {
  const { content, title, key } = todo;
  // const { modifyToDo } = useToDoDispatch();
  const dispatch = useAppDispatch();

  const [inputValue, setInputValue] = useState<{ title: string; content: string }>({ title: title, content: content });

  function onChangeTitle(e: ChangeEvent<HTMLInputElement>) {
    setInputValue((prev) => ({ ...prev, title: e.target.value }));
  }
  function onChangeContent(e: ChangeEvent<HTMLTextAreaElement>) {
    setInputValue((prev) => ({ ...prev, content: e.target.value }));
  }

  async function onSubmitModify(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const agreed = await Swal.fire({
      icon: "question",
      title: "수정완료",
      text: `ToDo수정을 완료 하시겠습니까??`,
      showCancelButton: true,
      confirmButtonText: "확인",
      cancelButtonText: "취소"
    });
    if (agreed) {
      dispatch(modifyToDo({ key, content: inputValue.content, title: inputValue.title }));
      // modifyToDo({ key, content, title });
      setIsModify(false);
      await Swal.fire({
        icon: "success",
        title: "수정완료",
        text: `ToDo수정이 완료 되었습니다.`
      });
    }
  }
  async function onClickCancel() {
    const agreed = await Swal.fire({
      icon: "warning",
      title: "취소",
      text: `ToDo수정을 취소 하시겠습니까??`,
      showCancelButton: true,
      confirmButtonText: "확인",
      cancelButtonText: "취소"
    });
    if (agreed) {
      setIsModify(false);
    }
  }

  return (
    <ToDoModifyForm onSubmit={onSubmitModify}>
      <div className="input__wrapper">
        <input
          className="input__title"
          value={inputValue.title}
          onChange={onChangeTitle}
          placeholder="제목을 입력해주세요"
        ></input>
        <textarea
          className="input__content"
          value={inputValue.content}
          onChange={onChangeContent}
          placeholder="내용을 입력해주세요"
        ></textarea>
      </div>
      <ToDoBtns>
        <button>
          <MdCheck />
        </button>
        <button type="button" onClick={onClickCancel}>
          <MdCancel />
        </button>
      </ToDoBtns>
    </ToDoModifyForm>
  );
}
