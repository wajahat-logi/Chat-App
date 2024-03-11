import ListItem from 'devextreme-react/list';
import 'devextreme/dist/css/dx.light.css';
import Message from "../../models/message";

interface MessageItemProps {
  message: Message;
}

function MessageItem({ message }: MessageItemProps) {
  return (
    <ListItem
    >
      <div className="messages-list__item-content dx-list-item-content">
        <span className="messages-list__from dx-list-item-content-text">{message.from}</span>
        <span className="messages-list__text dx-list-item-content-text">{message.text}</span>
        <div className="messages-list__datetime dx-list-item-content-text">{message.sentAt}</div>
      </div>
    </ListItem>
  );
}

export default MessageItem;
