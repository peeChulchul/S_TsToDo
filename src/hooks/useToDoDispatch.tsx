import React from "react";
import useLocalStorage from "./useLocalStorage";
import { Itodo } from "src/types/todo";
import { v4 as uuidv4 } from "uuid";
import { setToDo } from "src/redux/modules/toDoModules";
import { useAppDispatch } from "src/redux/store";

export default function useToDoDispatch() {
  const { value: localToDo, setValue: setLocalToDo } = useLocalStorage<Itodo[]>({ key: "ToDos", initialValue: [] });
  const dispatch = useAppDispatch();

  function addToDo({ title, content }: Omit<Itodo, "createAt" | "isDone" | "key">) {
    const key = uuidv4();
    const createAt = Date.now();
    const newToDo = [...localToDo, { key, title, content, isDone: false, createAt }];
    setLocalToDo(newToDo);
    dispatch(setToDo(newToDo));
  }

  function deleteToDo({ key }: Pick<Itodo, "key">) {
    const newToDo = localToDo.filter((todo) => todo.key !== key);
    setLocalToDo(newToDo);
    dispatch(setToDo(newToDo));
  }

  function modifyToDo({ title, content, key, isDone }: Omit<Itodo, "createAt" | "isDone"> & { isDone?: boolean }) {
    const createAt = Date.now();
    const newToDo = localToDo.map((todo) => {
      if (todo.key === key) {
        return { ...todo, createAt, title, content, isDone: isDone !== undefined ? isDone : todo.isDone };
      }
      return todo;
    });
    setLocalToDo(newToDo);
    dispatch(setToDo(newToDo));
  }

  return { addToDo, deleteToDo, modifyToDo };
}
