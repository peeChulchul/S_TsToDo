import React from "react";
import styled, { css } from "styled-components";
import { MdOutlineLightMode, MdOutlineDarkMode } from "react-icons/md";
import { Container } from "src/components/Container";
import ToDoForm from "../ToDoForm";
import { useThemeContext, useThemeUpdateContext } from "src/context/ThemeContext";
import { useToDoContext } from "src/context/ToDoContext";

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
  const { toggleTheme } = useThemeUpdateContext();
  const { currentTheme } = useThemeContext();
  const { setCategory, category } = useToDoContext();

  function onClicCategory(category: string) {
    setCategory(category);
  }

  return (
    <Header>
      <Container>
        <div className="header__top">
          <h1>My ToDo</h1>
          {currentTheme === "light" ? (
            <MdOutlineDarkMode onClick={toggleTheme} />
          ) : (
            <MdOutlineLightMode onClick={toggleTheme} />
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
