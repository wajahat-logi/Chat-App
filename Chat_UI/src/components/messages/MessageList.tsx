import List, { ListTypes } from 'devextreme-react/list';
import 'devextreme/dist/css/dx.light.css';
import { memo, useEffect, useState } from 'react';
import Message from "../../models/message";
import "./MessageItem.css";
import "./MessageList.css";

interface MessageListProps {
  messages: Message[];
}

function ItemTemplate(data: any) {
  return <>
    <div key={data.joinedAt} style={{ display: 'flex', justifyContent: 'space-between' }}>
      <div>{data.sender}</div>
      <div className='.autoOverflow'>{data.message}</div>
      <div>{data.joinedAt}</div>
    </div>
  </>;
}

const MessageList = ({ gs }: any) => {
  // const [searchMode, _] = useState<ListTypes.Properties['searchMode']>('contains');

  
  return (
    <div className="list-container">
      {/* <List
        dataSource={gs?.userMessages[gs?.receiver] || []}
        height={400}
        itemRender={(data: any) => ItemTemplate(data)}
      /> */}
      {gs?.userMessages[gs?.receiver] && gs?.userMessages[gs?.receiver].map((e:any) => ItemTemplate(e))}
    </div>
  );
};

export default memo(MessageList);
