import React from "react";
import textBar from "./TextInput.module.css";
import { Button } from "../Button/Button";
import { useTodo } from "../../context";

const DEFAULT_TODO = {
  name: "",
  description: "",
};

interface AddTextInputProps {
  mode: "add";
}

interface EditTextInputProps {
  mode: "edit";
  editTodo: Omit<Todo, "id" | "checked">;
}

type TextInputProps = AddTextInputProps | EditTextInputProps;

export const TextInput: React.FC<TextInputProps> = (props) => {
  const {addTodo, saveTodo, changeTodo} = useTodo();

  //режим редактирования или нет
  const isEdit = props.mode === "edit";
  //подставляем в input текст по дефолту
  const [todo, setTodo] = React.useState(
    isEdit ? props.editTodo : DEFAULT_TODO
  );

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setTodo({ ...todo, [name]: value });
  };

  const onClick = () => {
    const todoItem = { name: todo.name, description: todo.description };
    if (isEdit) {
      return changeTodo(todoItem);
    }
    addTodo(todoItem);
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
        <div>
          <Button color="blue" onClick={saveTodo}>
            Save Todos
          </Button>
          <Button color="green" onClick={onClick}>
            Submit
          </Button>
        </div>
      )}
      {isEdit && (
        <Button color="orange" onClick={onClick}>
          Edit
        </Button>
      )}
    </div>
  );
};
