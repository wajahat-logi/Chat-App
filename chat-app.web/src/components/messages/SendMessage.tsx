import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from 'devextreme-react/button';
import TextBox from 'devextreme-react/text-box';
import 'devextreme/dist/css/dx.light.css';
import { useState } from "react";
import "./SendMessage.css";
interface SendMessageProps {
  sendMessage: (message: string) => void;
}

function SendMessage({ sendMessage }: SendMessageProps) {
  const [message, setMessage] = useState("");

  const onChangeHandler = (e: any) => {
    setMessage(e.event.target.value);
  };

  const onSubmitHandler = () => {
    sendMessage(message);
    setMessage("");
  };

  return (
    <form className="send-message dx-widget" onSubmit={e => e.preventDefault()} >
    <TextBox
      className="send-message__input dx-textbox"
      value={message}
      onChange={onChangeHandler}
      placeholder="Message Text"
    />
    <Button
      className="send-message__icon dx-button"
      disabled={!message}
      onClick={onSubmitHandler}
    >
      <FontAwesomeIcon icon={icon({ name: "arrow-left" })} />
    </Button>
  </form>
  );
}

export default SendMessage;
