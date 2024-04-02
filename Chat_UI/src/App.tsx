import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import 'devextreme/dist/css/dx.light.css';
import { useEffect, useState } from "react";
import "./App.css";
import ChatRoom from "./components/ChatRoom";
import Lobby from "./components/Lobby";
import Message from "./models/message";
import User from "./models/user";
import { GlobalState, userMessages } from "./util/interfaces";

const App = () => {
  const [connection, setConnection] = useState<any>();
  const [messages, setMessages] = useState<Message[]>([]);
  const [messagesOld, setMessagesOld] = useState<Message[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [groups, setGroups] = useState<any>([]);
  // const [gs, setGlobal] = useState<GlobalState>({
    const [gs, setGlobal] = useState<any>({
    userMessages: {},
    sender: '',
    receiver: '',
    selectionType: '',
    currentGroupName: '',
    groupMessages: {}
  })

  const refreshPage = async (message: string, _connection: any) => {
    await _connection.invoke("RefreshPage", message);
  }


  // useEffect(()=>{
  //   debugger;
  //   setGlobal(p => ( {...p, source: gs.userMessages[gs.receiver] || [] } ))
  // },[gs.userMessages,gs.receiver])

  // const updateMessage = (_userMessages: any,_receiver: any)=>{
  //   setGlobal(p => ( {...p, source: userMessages[_receiver] || [] } ))
  // }

  

  const joinRoom = async (userName: string) => {
    try {
      const config = {
        timeout: 5 * 60 * 1000, // 5 minutes (in milliseconds)
        serverTimeoutInMilliseconds: 5 * 60 * 1000, // 5 minutes (in milliseconds)
      };

      const connection = new HubConnectionBuilder()
        .withUrl("http://localhost:5058/chat", config)
        .configureLogging(LogLevel.Information)
        .build();

      connection.on("ReceiveMessage", (joinUser: userMessages) => {
        const user = gs.userMessages;
        if(user[joinUser.sender]){
          user[joinUser.sender].push(joinUser);
        }else{
          user[joinUser.sender] = [joinUser];
        }
        setGlobal((p: GlobalState) => ({ ...p, userMessages: user }));
      });

      connection.on("ReceiveMessageGroup", (joinUser: userMessages) => {
        const user = gs.groupMessages;
        if(user[joinUser.receiver]){
          user[joinUser.receiver].push(joinUser);
        }else{
          user[joinUser.receiver] = [joinUser];
        }
        setGlobal((p: GlobalState) => ({ ...p, groupMessages: user }));
      });

      connection.on("ReceiveConnectedUsers", (users: User[]) => {
        setUsers(users);
      });

      connection.on("GroupAdded", (group) => {
        setGroups((p:any) => ([...p, group]));
      });

      connection.onclose((e) => {
        setConnection(undefined);
        setMessages([]);
        setUsers([]);
      });

      await connection.start();
      await connection.invoke("JoinRoom", userName);
      setGlobal((p: any) => ({ ...p, sender: userName }));
      setConnection(connection);
    } catch (e) {
      console.error(e);
    }
  };

  const sendMessage = async (message: string) => {
    try {
      let user = gs.userMessages;
      if (!user[gs.receiver]) {
        user[gs.receiver] = [];
      };
      const payload:userMessages = { receiver: gs.receiver, sender: gs.sender, message: message, joinedAt: new Date().toISOString()};
      user[gs.receiver].push(payload)
      setGlobal((p: GlobalState) => ({ ...p, userMessages: user }));
      const jsonpayload = JSON.stringify(payload);
      await connection.invoke("SendMessage", jsonpayload);
    } catch (e) {
      console.error(e);
    }
  };

  const closeConnection = async () => {
    try {
      await connection.stop();
    } catch (e) {
      console.error(e);
    }
  };

  const setuserSelectionHandler = async (user: any) => {
    setGlobal((p: any) => ({ ...p, receiver: user, selectionType: 'U' }));
  }

  const closeModal = async (group: any)=>{
    await connection.invoke("AddToGroup", group,gs.sender);
  }

  const setgroupSelectionHandler = (group: any)=>{
    setGlobal((p: any) => ({ ...p, currentGroupName:group, selectionType: 'G' }));
  }

  const sendMessageGroup = async (message: string) => {
    try {
      let group = gs.groupMessages;
      if (!group[gs.currentGroupName]) {
        group[gs.currentGroupName] = [];
      };
      const payload:userMessages = { receiver: gs.currentGroupName, sender: gs.sender, message: message, joinedAt: new Date().toISOString()};
     // group[gs.currentGroupName].push(payload)
      //setGlobal((p: GlobalState) => ({ ...p, groupMessages: group }));
      const jsonpayload = JSON.stringify(payload);
      await connection.invoke("SendMessageGroup", jsonpayload);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <div className="app">
        {!connection ? (
          <Lobby joinRoom={joinRoom} />
        ) : (
          <ChatRoom
            setuserSelectionHandler={setuserSelectionHandler}
            users={users}
            sendMessageGroup={sendMessageGroup}
            gs={gs}
            sendMessage={sendMessage}
            groups={groups}
            selectedUser={gs.receiver}
            closeConnection={closeConnection}
            closeModal={closeModal}
            setGroups={setGroups}
            connection={connection}
            setgroupSelectionHandler={setgroupSelectionHandler}
          />
        )}
      </div>
    </>
  );
};

export default App;
