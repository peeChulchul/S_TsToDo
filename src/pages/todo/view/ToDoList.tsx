import { Container } from "src/components/Container";
import styled from "styled-components";
import ToDoItem from "../ToDoItem";
import { RootState, useAppSelector } from "src/redux/store";
import useToDoDispatch from "src/hooks/useToDoDispatch";

const ToDoItemBox = styled.ul`
  background-color: ${({ theme }) => theme.color.bg};
  color: ${({ theme }) => theme.color.text};
  padding: ${({ theme }) => theme.spacing.xl} 0;
  flex: 1;
`;

export default function ToDoList() {
  const { localToDo, category } = useAppSelector((modules: RootState) => modules.toDoModules);
  const { deleteToDo, modifyToDo } = useToDoDispatch();
  const SelectToDos = localToDo.filter((todo) => {
    if (category === "Active") {
      return todo.isDone === false;
    }
    if (category === "Completed") {
      return todo.isDone === true;
    }
    return true;
  });

  return (
    <ToDoItemBox>
      <Container>
        {SelectToDos.map((todo) => (
          <ToDoItem deleteToDo={deleteToDo} modifyToDo={modifyToDo} key={todo.key} todo={todo} />
        ))}
      </Container>
    </ToDoItemBox>
  );
}
