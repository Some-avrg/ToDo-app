import React from "react";
import textBar from "./TextInput.module.css";
import { Button } from "../Button/Button";


const DEFAULT_TODO = {
  name: "",
  description: "",
};

interface AddTextInputProps {
  mode: "add";
  addTodo: ({ name, description }: Omit<Todo, "checked" | "id">) => void;
}

interface EditTextInputProps {
  mode: "edit";
  editTodo: Omit<Todo, "id" | "checked">;
  changeTodo: ({ name, description }: Omit<Todo, "checked" | "id">) => void;
}

type TextInputProps = AddTextInputProps | EditTextInputProps;

export const TextInput: React.FC<TextInputProps> = (props) => {
  //режим редактирования или нет
  const isEdit = props.mode === "edit";
//подставляем в input текст по дефолту
  const [todo, setTodo] = React.useState(isEdit ? props.editTodo : DEFAULT_TODO);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setTodo({ ...todo, [name]: value });
  };

  const onClick = () => {
    const todoItem = { name: todo.name, description: todo.description };
    if (isEdit) {
      return props.changeTodo(todoItem);
    }
    props.addTodo(todoItem);
    setTodo(DEFAULT_TODO);
  };

  return (
    <div>
      <div className={textBar.layout}>
        <label htmlFor="name" className={textBar.label}>
          <div className={textBar.title}>Name</div>
          <input
            type="text"
            className={textBar.input}
            value={todo.name}
            id="name"
            name="name"
            onChange={onChange}
            placeholder="Name of task"
          />
        </label>
      </div>
      <div className={textBar.layout}>
        <label htmlFor="description" className={textBar.label}>
          <div className={textBar.title}>Description</div>
          <input
            type="text"
            className={textBar.input}
            value={todo.description}
            id="description"
            name="description"
            onChange={onChange}
            placeholder="Description of task"
          />
        </label>
      </div>
      {/* если режим редактировани, то другая кнопка */}
      {!isEdit && (
        <Button color="green" onClick={onClick}>
          Submit
        </Button>
      )}
      {isEdit && (
        <Button color="orange" onClick={onClick}>
          Edit
        </Button>
      )}
    </div>
  );
};
