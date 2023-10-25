import React from "react";
import { TodoItem } from "../TodoItem/TodoItem";
import { TextInput } from "../TextInput/TextInput";

interface ListProps {
  todos: Todo[];
  todoIdForEdit: Todo["id"] | null;
  changeTodo: ({ name, description }: Omit<Todo, "checked" | "id">) => void;
  checkTodo: (id: Todo["id"]) => void;
  deleteTodo: (id: Todo["id"]) => void;
  selectTodoIdForEdit: (id: Todo["id"]) => void;
}

export const List: React.FC<ListProps> = ({
  todos,
  todoIdForEdit,
  changeTodo,
  checkTodo,
  deleteTodo,
  selectTodoIdForEdit,
}) => {
  return (
    <div>
      {todos.map((todo) => {
        //если элемент выбран для редактирования, то вместо него рендерим инпут
        if (todo.id === todoIdForEdit)
          return (
            <TextInput
              mode="edit"
              key={todo.id}
              changeTodo={changeTodo}
              editTodo={{ name: todo.name, description: todo.description }}
            />
          );
        return (
          <TodoItem
            key={todo.id}
            todo={todo}
            checkTodo={checkTodo}
            deleteTodo={deleteTodo}
            selectTodoIdForEdit={selectTodoIdForEdit}
          />
        );
      })}
    </div>
  );
};
