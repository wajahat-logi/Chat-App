import Button from 'devextreme-react/button';
import Form, { Item, Label, SimpleItem } from 'devextreme-react/form';
import TextBox from 'devextreme-react/text-box';
import 'devextreme/dist/css/dx.light.css';
import { useState } from "react";
import "./Lobby.css";


interface LobbyProps {
  joinRoom: (userName: string) => void;
}

const Lobby = ({ joinRoom }: LobbyProps) => {
  const [userName, setUserName] = useState("");

  const onChangeHandler = (e: any) => {
    setUserName(e.event.target.value);
  };

  const onSubmitHandler = () => {
    joinRoom(userName);
    setUserName("");
  };

  return (
    <Form
      id="conversationForm"
      colCount={2}
      labelLocation="top"
      className="form-container"

    >
      <Item colSpan={2} >
        <h2>Enter the Conversation</h2>
      </Item>
      <SimpleItem colSpan={2} dataField="title" editorType="dxTextBox">
        <Label text="Name" />
        <TextBox value={userName} placeholder="Type your message here..." onChange={onChangeHandler} />

      </SimpleItem>

      <Item colSpan={2}>
        <Button
          id="confirmationBtn"
          text="Confirmation"
          type="success"
          useSubmitBehavior={true}
          className="center-align full-width-btn"
          onClick={onSubmitHandler}
        />
      </Item>
    </Form>
  );
};

export default Lobby;
