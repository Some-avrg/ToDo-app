import React from "react";

export interface TodoContextProps{
  todos: Todo[];
  todoIdForEdit: Todo["id"] | null;
  changeTodo: ({ name, description }: Omit<Todo, "checked" | "id">) => void;
  checkTodo: (id: Todo["id"]) => void;
  deleteTodo: (id: Todo["id"]) => void;
  selectTodoIdForEdit: (id: Todo["id"]) => void;
  addTodo: ({ name, description }: Omit<Todo, "checked" | "id">) => void;
  saveTodo: () => void;
}

export const TodoContext = React.createContext<TodoContextProps>({
  todos: [],
  todoIdForEdit: null,
  changeTodo: () => {},
  checkTodo: () => {},
  deleteTodo: () => {},
  selectTodoIdForEdit: () => {},
  addTodo: () => {},
  saveTodo: () => {}
})