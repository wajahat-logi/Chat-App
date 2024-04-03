import List, { ListTypes } from 'devextreme-react/list';
import React, { useState } from "react";
import AddGroupPopup from '../AddGroupPopup';
import "./UserList.css";

function ItemTemplate(data: any, setuserSelectionHandler: any) {
  return <>
    <div onClick={() => setuserSelectionHandler(data.name)} style={{ display: 'flex', justifyContent: 'space-between' }}>
      <div>{data.name}</div>
      <div>{data.joinedAt}</div>
    </div>
  </>;
}

function ItemTemplate1(data: any, setgroupSelectionHandler: any,) {
  return <>
    <div onClick={() => setgroupSelectionHandler(data.group)} style={{ display: 'flex', justifyContent: 'space-between' }}>
      <div>{data.group}</div>
    </div>
  </>;
}


const UserList = ({ groups, users, setuserSelectionHandler, setgroupSelectionHandler, closeModal }: any) => {
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
      <div>
        <AddGroupPopup closeModal={closeModal} />
      </div>
      <div className="list-container">
        <List
          dataSource={groups}
          itemRender={(data) => (ItemTemplate1(data, setgroupSelectionHandler))}
          searchExpr="group"
          searchEnabled={true}
          searchMode={searchMode} />
      </div>
    </React.Fragment>
  );
}

export default UserList;
