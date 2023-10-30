import React from "react";
import { TodoItem } from "../TodoItem/TodoItem";
import { TextInput } from "../TextInput/TextInput";
import { useTodo } from "../../context";

export const List: React.FC = () => {
  const {todos, todoIdForEdit} = useTodo();

  return (
    <div>
      {todos.map((todo) => {
        //если элемент выбран для редактирования, то вместо него рендерим инпут
        if (todo.id === todoIdForEdit)
          return (
            <TextInput
              mode="edit"
              key={todo.id}
              editTodo={{ name: todo.name, description: todo.description }}
            />
          );
        return (
          <TodoItem
            key={todo.id}
            todo={todo}
          />
        );
      })}
    </div>
  );
};
