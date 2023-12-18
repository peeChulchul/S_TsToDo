import React from "react";
import styled, { css } from "styled-components";
import { MdOutlineLightMode, MdOutlineDarkMode } from "react-icons/md";
import { Container } from "src/components/Container";
import ToDoForm from "src/pages/todo/view/ToDoForm";
import { toggleTheme } from "src/redux/modules/themeModules";
import { RootState, useAppDispatch, useAppSelector } from "src/redux/store";
import { chageCategory } from "src/redux/modules/toDoModules";
import { Tcategory } from "src/types/todo";

const Header = styled.header`
  position: sticky;
  top: 0;
  color: ${({ theme }) => theme.color.text};
  background-color: ${({ theme }) => theme.color.primary};
  .header__top {
    padding: ${({ theme }) => theme.spacing.xl} 0;
    font-size: ${({ theme }) => theme.fontSize["3xl"]};
    font-weight: bold;
    align-items: center;
    display: flex;
    justify-content: space-between;
    svg {
      cursor: pointer;
    }
  }
  .header__bottom {
    display: flex;
  }
`;

const CategoryBtn = styled.button<{ $category: boolean }>`
  width: 33.333%;
  cursor: pointer;
  color: ${({ theme }) => theme.color.accent};
  padding: ${({ theme }) => theme.spacing.lg} 0;
  font-weight: 600;
  font-size: ${({ theme }) => theme.fontSize.xl};
  ${({ $category }) =>
    $category &&
    css`
      color: ${({ theme }) => theme.color.bg};
      background-color: ${({ theme }) => theme.color.accent_alt};
    `}
  &:hover {
    color: ${({ theme }) => theme.color.bg};
    background-color: ${({ theme }) => theme.color.accent_alt};
  }
`;

export default function ToDoHeader() {
  const { currentTheme } = useAppSelector((modules: RootState) => modules.themeModules);
  const category = useAppSelector((modules: RootState) => modules.toDoModules.category);
  const dispatch = useAppDispatch();

  function onClicCategory(category: Tcategory) {
    dispatch(chageCategory(category));
  }

  return (
    <Header>
      <Container>
        <div className="header__top">
          <h1>My ToDo</h1>
          {currentTheme === "light" ? (
            <MdOutlineDarkMode onClick={() => dispatch(toggleTheme())} />
          ) : (
            <MdOutlineLightMode onClick={() => dispatch(toggleTheme())} />
          )}
        </div>

        <ToDoForm />

        <nav className="header__bottom">
          <CategoryBtn $category={category === "All"} onClick={() => onClicCategory("All")}>
            All
          </CategoryBtn>
          <CategoryBtn $category={category === "Active"} onClick={() => onClicCategory("Active")}>
            Active
          </CategoryBtn>
          <CategoryBtn $category={category === "Completed"} onClick={() => onClicCategory("Completed")}>
            Completed
          </CategoryBtn>
        </nav>
      </Container>
    </Header>
  );
}
