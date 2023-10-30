import box from "./MainBox.module.css";
import { TextInput } from "../TextInput/TextInput";
import { List } from "../List/List";
import React from "react";
import { TodoProvider } from "../../context";


export default function MainBox() {

  return (
    <TodoProvider>
      <div className={box.display}>
        <div className={box.title}>ToDo List</div>

        <div>
          <TextInput mode="add"/>
          <List/>
        </div>
      </div>
    </TodoProvider>
  );
}
