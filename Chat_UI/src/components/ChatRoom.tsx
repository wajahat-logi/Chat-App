import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef } from "react";
import "./ChatRoom.css";
import MessageListGroup from "./groups/MessageListGroup";
import SendMessageGroup from "./groups/SendMessageGroup";
import MessageList from "./messages/MessageList";
import SendMessage from "./messages/SendMessage";
import UserList from "./users/UserList";


const ChatRoom = ({
  sendMessageGroup,
  sendMessage,
  closeConnection,
  users,
  gs,
  groups,
  setuserSelectionHandler,
  selectedUser,
  closeModal,
  connection,
  setGroups,
  setgroupSelectionHandler
}: any) => {

  const messageRef = useRef<any>();
  useEffect(() => {
    fetch('http://localhost:5058/Users/GetGroupList/' + connection?.connectionId || '')
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setGroups(data);
      });
  }, [])

  return (
    <div className="chat">
      <div className="chat__right">
        <div className="chat__right-header">
          <span className="chat__heading">Current User: {gs.sender}</span>
          <div className="toolbar">
            <span style={{ color: '#337ab7' }} className="search-icon" onClick={closeConnection}>
              <FontAwesomeIcon icon={icon({ name: "circle-stop" })} />
            </span>
          </div>
        </div>
        <div className="chat__right-main">
          <UserList setgroupSelectionHandler={setgroupSelectionHandler} closeModal={closeModal} groups={groups} users={users} setuserSelectionHandler={setuserSelectionHandler} />
        </div>

      </div>

      {
        gs.selectionType == 'U' ? <div className="chat__left">
          <div className="chat__left-header">
            <span className="chat__heading" >{selectedUser && `Chat with: ${selectedUser}`}</span>
          </div>
          <div className="chat__left-main" ref={messageRef}>
            <MessageList gs={gs} />
          </div>
          <div className="chat__left-footer">
            <SendMessage messageRef={messageRef} selectedUser={selectedUser} sendMessage={sendMessage} />
          </div>
        </div> : gs.selectionType == 'G' ? <div className="chat__left">
          <div className="chat__left-header">
            <span className="chat__heading" > {`Group: ${gs.currentGroupName}`}</span>
          </div>
          <div className="chat__left-main" ref={messageRef}>
            <MessageListGroup gs={gs} />
          </div>
          <div className="chat__left-footer">
            <SendMessageGroup messageRef={messageRef} sendMessageGroup={sendMessageGroup} />
          </div>
        </div> : null
      }
    </div>
  );
};

export default ChatRoom;
