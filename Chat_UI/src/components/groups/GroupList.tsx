import List, { ListTypes } from 'devextreme-react/list';
import React, { useState } from "react";
import "./UserList.css";



function ItemTemplate(data: any, setuserSelectionHandler: any) {
  return <>
    <div onClick={setuserSelectionHandler} style={{ display: 'flex', justifyContent: 'space-between' }}>
      <div>{data.name}</div>
      <div>{data.joinedAt}</div>
    </div>
  </>;
}

const UserList = ({ users, setuserSelectionHandler }: any) => {
  const [searchMode, _] = useState<ListTypes.Properties['searchMode']>('contains');
  return (
    <React.Fragment>
      <div className="list-container">
        <List
          dataSource={users}
          itemRender={(data) => (ItemTemplate(data, setuserSelectionHandler))}
          searchExpr="name"
          searchEnabled={true}
          searchMode={searchMode} />

      </div>
      <div className="list-container">
        <List
          dataSource={users}
          itemRender={(data) => (ItemTemplate(data, setuserSelectionHandler))}
          searchExpr="name"
          searchEnabled={true}
          searchMode={searchMode} />

      </div>
    </React.Fragment>
  );
}

export default UserList;
