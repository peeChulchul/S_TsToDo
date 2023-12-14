import { createContext, useContext, Dispatch, SetStateAction } from "react";
import useLocalStorage from "src/hooks/useLocalStorage";
import { Itodo } from "src/types/todo";

interface IToDoContextValue {
  localToDo: Itodo[];
  setLocalToDo: Dispatch<SetStateAction<Itodo[]>>;
}

const ToDoContext = createContext<IToDoContextValue>({ localToDo: [], setLocalToDo: () => {} });

export const useToDoContext = () => useContext(ToDoContext);

export const ToDoContextProvider = ({ children }: React.PropsWithChildren) => {
  const { value: localToDo, setValue: setLocalToDo } = useLocalStorage<Itodo[]>({ key: "ToDos", initialValue: [] });

  return <ToDoContext.Provider value={{ localToDo, setLocalToDo }}>{children}</ToDoContext.Provider>;
};
