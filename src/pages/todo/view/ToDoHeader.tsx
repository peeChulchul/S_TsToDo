import React from "react";
import styled from "styled-components";
import { MdOutlineLightMode, MdOutlineDarkMode } from "react-icons/md";
import { Container } from "src/components/Container";
import ToDoForm from "../ToDoForm";
const Header = styled.header`
  position: sticky;
  top: 0;
  background-color: ${({ theme }) => theme.color.primary};
  .header__top {
    padding: ${({ theme }) => theme.spacing.xl} 0;
    font-size: ${({ theme }) => theme.fontSize["3xl"]};
    font-weight: bold;
    align-items: center;
    display: flex;
    justify-content: space-between;
  }
  .header__bottom {
    display: flex;
    button {
      width: 33%;
      cursor: pointer;
      color: ${({ theme }) => theme.color.accent};
      padding: ${({ theme }) => theme.spacing.lg} 0;
      font-weight: 600;
      font-size: ${({ theme }) => theme.fontSize.xl};
    }
    button:hover {
      color: ${({ theme }) => theme.color.hover};
      background-color: ${({ theme }) => theme.color.primary};
      filter: brightness(0.9);
    }
  }
`;

export default function ToDoHeader() {
  return (
    <Header>
      <Container>
        <div className="header__top">
          <h1>My ToDo</h1>
          {/* <MdOutlineLightMode /> */}
          <MdOutlineDarkMode />
        </div>
        <ToDoForm />
        <nav className="header__bottom">
          <button>All</button>
          <button>Active</button>
          <button>Completed</button>
        </nav>
      </Container>
    </Header>
  );
}
