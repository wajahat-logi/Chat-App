import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from 'devextreme-react/button';
import TextBox, { TextBoxTypes } from 'devextreme-react/text-box';
import 'devextreme/dist/css/dx.light.css';
import { useCallback, useState } from "react";
import "./SendMessage.css";



interface SendMessageProps {
  sendMessage: (message: string) => void;
}

function SendMessage({ messageRef, sendMessage, selectedUser }: any) {
  const [message, setMessage] = useState("");


  const onSubmitHandler = (e: any) => {
    sendMessage(message);
    setMessage("");

    if (messageRef && messageRef.current) {
      const { scrollHeight, clientHeight } = messageRef.current;
      messageRef.current.scrollTo({
        left: 0,
        top: scrollHeight - clientHeight - 10,
        behavior: "smooth",
      });
    }

  };

  const onChangeHandler = useCallback((e: any) => {
    setMessage(e.value);
  }, []);

  const onKeyDownHander = (e: any)=>{
    if(e.event.keyCode == 13){
      onSubmitHandler(null);
    }
  }

  return (
    <form className="send-message dx-widget" onSubmit={e => e.preventDefault()} >
    <TextBox
      className="send-message__input dx-textbox"
      value={message}
      placeholder="Enter Your Message..."
      disabled={ selectedUser === ''}
      valueChangeEvent="keyup"
      onValueChanged={onChangeHandler}
      onKeyDown={onKeyDownHander}
    />
    <Button
      className="send-message__icon dx-button"
      disabled={!message || selectedUser === ''}
      onClick={onSubmitHandler}
      style={{color: 'blue'}}
    

    >
      <FontAwesomeIcon icon={icon({ name: "arrow-left" })} />
    </Button>
  </form>
  );
}

export default SendMessage;
