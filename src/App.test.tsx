import React from "react";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";
import "jest-styled-components";

describe("<App />", () => {
  it("renders component correctly", () => {
    const history = createMemoryHistory();
    history.push("/");

    const { container } = render(
      <Router history={history}>
        <App />
      </Router>
    );

    const header = screen.getByText("할 일 목록");
    expect(header).toBeInTheDocument();

    const toDoList = screen.getByTestId("toDoList");
    expect(toDoList).toBeInTheDocument();
    expect(toDoList.firstChild).toBeNull();

    const label = screen.getByText("+");
    expect(label).toBeInTheDocument();

    expect(container).toMatchSnapshot();
  });

  it("goes add page and goback to list page", () => {
    const history = createMemoryHistory();
    history.push("/");

    const { container } = render(
      <Router history={history}>
        <App />
      </Router>
    );

    const addButton = screen.getByText("+");
    fireEvent.click(addButton);

    const header = screen.getByText("할 일 추가");
    expect(header).toBeInTheDocument();

    const goBack = screen.getByText("돌아가기");
    expect(goBack).toBeInTheDocument();
    const input = screen.getByPlaceholderText("할 일을 입력해 주세요");
    expect(input).toBeInTheDocument();
    const button = screen.getByText("추가");
    expect(button).toBeInTheDocument();

    expect(container).toMatchSnapshot();

    fireEvent.click(goBack);
    expect(header.textContent).toBe("할 일 목록");
    const toDoList = screen.getByTestId("toDoList");
    expect(toDoList).toBeInTheDocument();
  });

  it("does not add emtpy ToDo", () => {
    render(<App />);

    const toDoList = screen.getByTestId("toDoList");
    const length = toDoList.childElementCount;

    const button = screen.getByText("추가");
    fireEvent.click(button);

    expect(toDoList.childElementCount).toBe(length);
  });

  it("loads localStorage data", () => {
    localStorage.setItem("ToDoList", '["ToDo 1", "ToDo 2", "ToDo 3"]');
    render(<App />);

    expect(screen.getByText("ToDo 1")).toBeInTheDocument();
    expect(screen.getByText("ToDo 2")).toBeInTheDocument();
    expect(screen.getByText("ToDo 3")).toBeInTheDocument();
    expect(screen.getAllByText("삭제").length).toBe(3);
  });
});
