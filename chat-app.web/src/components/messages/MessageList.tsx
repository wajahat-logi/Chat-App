import List from 'devextreme-react/list';
import 'devextreme/dist/css/dx.light.css';
import Message from "../../models/message";
import MessageItem from "./MessageItem";
import "./MessageItem.css";
import "./MessageList.css";

interface MessageListProps {
  messages: Message[];
}

const MessageList = ({ messages }: MessageListProps) => {
  return (
    <List
      className="messages-list"
      items={messages}
      keyExpr="id"
    >
      {messages.map((message, idx) => (
        <MessageItem key={idx} message={message} />
      ))}
    </List>
  );
};

export default MessageList;
