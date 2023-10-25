import box from "./MainBox.module.css";
import { TextInput } from "../TextInput/TextInput";
import { List } from "../List/List";
import React from "react";

let DEFAULT_TODO_LIST: Todo[] = [];

export default function MainBox() {
  //список todo
  if (localStorage.todoList !== undefined)
    DEFAULT_TODO_LIST = JSON.parse(localStorage.todoList);
  else
    DEFAULT_TODO_LIST = [
      {
        id: 1,
        name: "Test task",
        description: "Test task description",
        checked: false,
      },
    ];

  const [todos, setTodos] = React.useState(DEFAULT_TODO_LIST);

  //id элемента для редактирования
  const [todoIdForEdit, setTodoIdForEdit] = React.useState<Todo["id"] | null>(
    null
  );
  const selectTodoIdForEdit = (id: Todo["id"]) => {
    setTodoIdForEdit(id);
  };

  const saveTodo = () => {
    localStorage.clear();
    localStorage.todoList = JSON.stringify(todos);
  };

  const addTodo = ({ name, description }: Omit<Todo, "checked" | "id">) => {
    //проверем есть ли элементы в списке
    let ID;
    if (todos[todos.length - 1] == null) ID = 1;
    else ID = todos[todos.length - 1].id + 1;
    //добавляем todo в список
    setTodos([...todos, { id: ID, description, name, checked: false }]);
  };

  //пробегаем по списку, меняем check у элемента с данным id
  const checkTodo = (id: Todo["id"]) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, checked: !todo.checked };
        }
        return todo;
      })
    );
  };

  //фильтруем список, оставля всё кроме элемента с данным id
  const deleteTodo = (id: Todo["id"]) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  //пробегаем по списку, меняем имя и описание у элемента с todoIdForEdit
  const changeTodo = ({ name, description }: Omit<Todo, "checked" | "id">) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === todoIdForEdit) {
          return { ...todo, name, description };
        }
        return todo;
      })
    );
    setTodoIdForEdit(null);
  };

  return (
    <div className={box.display}>
      <div className={box.title}>ToDo List</div>

      <div>
        <TextInput mode="add" addTodo={addTodo} saveTodo={saveTodo} />
        <List
          todos={todos}
          todoIdForEdit={todoIdForEdit}
          changeTodo={changeTodo}
          checkTodo={checkTodo}
          deleteTodo={deleteTodo}
          selectTodoIdForEdit={selectTodoIdForEdit}
        />
      </div>
    </div>
  );
}
