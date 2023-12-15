import { Container } from "src/components/Container";
import styled from "styled-components";
import ToDoItem from "../ToDoItem";
import { RootState, useAppSelector } from "src/redux/store";
import { useTodos } from "src/hooks/useToDos";

const ToDoItemBox = styled.ul`
  background-color: ${({ theme }) => theme.color.bg};
  color: ${({ theme }) => theme.color.text};
  padding: ${({ theme }) => theme.spacing.xl} 0;
  flex: 1;
`;

export default function ToDoList() {
  const { category } = useAppSelector((modules: RootState) => modules.toDoModules);
  const { toDos = [], isLoading } = useTodos();

  return (
    <ToDoItemBox>
      <Container>
        {!isLoading &&
          toDos
            .filter((todo) => {
              if (category === "Active") {
                return todo.isDone === false;
              }
              if (category === "Completed") {
                return todo.isDone === true;
              }
              return true;
            })
            .map((todo) => <ToDoItem key={todo.id} todo={todo} />)}
      </Container>
    </ToDoItemBox>
  );
}
