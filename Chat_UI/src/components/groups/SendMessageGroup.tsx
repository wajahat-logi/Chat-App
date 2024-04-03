import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from 'devextreme-react/button';
import TextBox from 'devextreme-react/text-box';
import 'devextreme/dist/css/dx.light.css';
import { useCallback, useState } from "react";
import "./SendMessageGroup.css";


function SendMessageGroup({ messageRef, sendMessageGroup }: any) {
    const [message, setMessage] = useState("");


    const onSubmitHandler = (e: any) => {
        sendMessageGroup(message);
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

    const onKeyDownHander = (e: any) => {
        if (e.event.keyCode == 13) {
            onSubmitHandler(null);
        }
    }

    return (
        <form className="send-message dx-widget" onSubmit={e => e.preventDefault()} >
            <TextBox
                className="send-message__input dx-textbox"
                value={message}
                placeholder="Enter Your Message..."
                valueChangeEvent="keyup"
                onValueChanged={onChangeHandler}
                onKeyDown={onKeyDownHander}
            />
            <Button
                className="send-message__icon dx-button"
                disabled={!message}
                onClick={onSubmitHandler}
                style={{ color: 'blue' }}
            >
                <FontAwesomeIcon icon={icon({ name: "arrow-left" })} />
            </Button>
        </form>
    );
}

export default SendMessageGroup;
