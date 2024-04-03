import List, { ListTypes } from 'devextreme-react/list';
import 'devextreme/dist/css/dx.light.css';
import { memo, useEffect, useState } from 'react';
import Message from "../../models/message";
import "./MessageListGroup.css";

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

const MessageListGroup = ({ gs }: any) => {
  // const [searchMode, _] = useState<ListTypes.Properties['searchMode']>('contains'); // use in future

  return (
    <div className="list-container">
      {/* <List
        dataSource={gs?.userMessages[gs?.receiver] || []}
        height={400}
        itemRender={(data: any) => ItemTemplate(data)}
      /> */}
      {gs?.groupMessages[gs?.currentGroupName] && gs?.groupMessages[gs?.currentGroupName].map((e: any) => ItemTemplate(e))}
    </div>
  );
};

export default memo(MessageListGroup);
