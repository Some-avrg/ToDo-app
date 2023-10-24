import box from "./MainBox.module.css";
import TextBar from "../TextInput/TextInput";
import {Button} from "../Button/Button";
import List from "../List/List";

export default function MainBox() {
  return (
    <div className={box.display}>
      <div className={box.title}>ToDo List</div>

      <div>
        <TextBar />
        <Button color="green">
          Submit
        </Button>
      </div>
      <div>
        <List/>
      </div>
    </div>
  );
}
