import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef } from "react";
import Message from "../models/message";
import User from "../models/user";
import "./ChatRoom.css";
import MessageList from "./messages/MessageList";
import SendMessage from "./messages/SendMessage";
import UserList from "./users/UserList";

interface ChatRoomProps {
  users: User[];
  messages: Message[];
  sendMessage: (message: string) => void;
  closeConnection: () => void;
}

const ChatRoom = ({
  messages,
  sendMessage,
  closeConnection,
  users,
}: ChatRoomProps) => {
  const messageRef = useRef<any>();

  useEffect(() => {
    if (messageRef && messageRef.current) {
      const { scrollHeight, clientHeight } = messageRef.current;
      messageRef.current.scrollTo({
        left: 0,
        top: scrollHeight - clientHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  return (
    <div className="chat">
      <div className="chat__right">
        <div className="chat__right-header">
          <span className="chat__heading">List of users</span>
          <div className="toolbar">
            <span className="search-icon" onClick={closeConnection}>
              <FontAwesomeIcon icon={icon({ name: "circle-stop" })} />
            </span>
          </div>
        </div>
        <div className="chat__right-main">
          <UserList users={users} />
        </div>
      </div>
      <div className="chat__left">
        <div className="chat__left-header">
          <span className="chat__heading" >List of Messages</span>
        </div>
        <div className="chat__left-main" ref={messageRef}>
          <MessageList messages={messages} />
        </div>
        <div className="chat__left-footer">
          <SendMessage sendMessage={sendMessage} />
        </div>
      </div>
    </div>
  );
};

export default ChatRoom;
