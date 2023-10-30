import React from "react";
import styles from "./TodoItem.module.css";
import { Button } from "../Button/Button";
import { useTodo } from "../../context";

interface TodoItemProps {
  todo: Todo;
}

export const TodoItem: React.FC<TodoItemProps> = ({
  todo
}) => {
  const {checkTodo, deleteTodo, selectTodoIdForEdit} = useTodo();

  return (
    <div>
      <div className={styles.item}>
        <div>
          <div
            className={styles.title}
            onClick={() => checkTodo(todo.id)}
            style={{
              opacity: todo.checked ? 0.5 : 1,
              textDecoration: todo.checked ? "line-through" : "none",
            }}
          >
            {todo.name}
          </div>
          <p
            className={styles.description}
            style={{
              opacity: todo.checked ? 0.5 : 1,
            }}
          >
            {todo.description}
          </p>
        </div>
        <div className={styles.button_container}>
          <Button color="orange" onClick={() => selectTodoIdForEdit(todo.id)}>
            Edit
          </Button>
          <Button color="red" onClick={() => deleteTodo(todo.id)}>
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
};
