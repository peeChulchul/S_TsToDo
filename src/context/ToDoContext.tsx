import { createContext, useContext, Dispatch, SetStateAction, useState } from "react";
import useLocalStorage from "src/hooks/useLocalStorage";
import { Itodo } from "src/types/todo";

interface IToDoContextValue {
  localToDo: Itodo[];
  category: string;
  setLocalToDo: Dispatch<SetStateAction<Itodo[]>>;
  setCategory: Dispatch<SetStateAction<string>>;
}

const ToDoContext = createContext<IToDoContextValue>({
  localToDo: [],
  setLocalToDo: () => {},
  category: "all",
  setCategory: () => {}
});

export const useToDoContext = () => useContext(ToDoContext);

export const ToDoContextProvider = ({ children }: React.PropsWithChildren) => {
  const { value: localToDo, setValue: setLocalToDo } = useLocalStorage<Itodo[]>({ key: "ToDos", initialValue: [] });
  const [category, setCategory] = useState("All");

  return (
    <ToDoContext.Provider value={{ localToDo, setLocalToDo, category, setCategory }}>{children}</ToDoContext.Provider>
  );
};
