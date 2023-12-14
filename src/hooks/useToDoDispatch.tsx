import React from "react";
import useLocalStorage from "./useLocalStorage";
import { Itodo } from "src/types/todo";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { setToDo } from "src/redux/modules/toDoModules";

export default function useToDoDispatch() {
  const { setValue: setLocalToDo } = useLocalStorage<Itodo[]>({ key: "ToDos", initialValue: [] });
  const dispatch = useDispatch();

  function addToDo({ title, content }: { title: string; content: string }) {
    setLocalToDo((prev) => {
      const key = uuidv4();
      const createAt = Date.now();
      const newToDo = [...prev, { key, title, content, isDone: false, createAt }];
      dispatch(setToDo(newToDo));
      return newToDo;
    });
  }
  function deleteToDo({ key }: { key: string }) {
    setLocalToDo((prev) => {
      const newTodo = prev.filter((todo) => todo.key !== key);
      dispatch(setToDo(newTodo));

      return newTodo;
    });
  }
  function modifyToDo({ title, content, key }: { title: string; content: string; key: string }) {
    setLocalToDo((prev) => {
      const newToDo = prev.map((todo) => {
        if (todo.key === key) {
          return { ...todo, createAt: Date.now(), title, content };
        }
        return todo;
      });
      dispatch(setToDo(newToDo));
      return newToDo;
    });
  }

  return { addToDo, deleteToDo, modifyToDo };
}
