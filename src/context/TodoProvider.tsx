import React from "react";
import { TodoContext } from "./TodoContext";

interface TodoProviderProps {
  children: React.ReactNode;
}

let DEFAULT_TODO_LIST: Todo[] = [];

export const TodoProvider: React.FC<TodoProviderProps> = ({ children }) => {
   //загружаем начальный список todo
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

  const value = React.useMemo(
    () => ({
      todos,
      todoIdForEdit,
      changeTodo,
      checkTodo,
      deleteTodo,
      selectTodoIdForEdit,
      addTodo,
      saveTodo
    }),
    [
      todos,
      todoIdForEdit,
      changeTodo,
      checkTodo,
      deleteTodo,
      selectTodoIdForEdit,
      addTodo,
      saveTodo
    ]
  );

  return <TodoContext.Provider value={value}> {children} </TodoContext.Provider>
};
