import React from "react";
import textBar from "./TextInput.module.css";

const DEFAULT_TODO = {
  name: "",
  description: "",
};

export default function TextInput() {
  const [todo, setTodo] = React.useState(DEFAULT_TODO);
  console.log("@todo", todo);
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setTodo({ ...todo, [name]: value });
  };

  return (
    <div >
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
    </div>
  );
}
