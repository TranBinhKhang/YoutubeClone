import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getData } from '../Store/actions';
import "bootstrap/dist/css/bootstrap.min.css"
import NavigationItem from './NavigationItem';




function Sidebar() {
const state = useSelector((state) => state);
const items = useSelector(state => state.item.item);
const username = useSelector(state => state.account.username)

const folders = useSelector((state) => (state.folder && state.folder.data) || []);
const dispatch = useDispatch();
useEffect(() => {
  dispatch(getData());
}, []);






  return (
    <div className='Sidebar' style={{ flex: 1, width: 128, display: 'flex', flexDirection: 'column'
}}>
    
    <div>
    <div style={{marginBottom: 10}}>
    </div>
    {items && items.filter(item => !item.parent).map((item, key) => (
          <React.Fragment key={key}>
          <NavigationItem id={item.id} />
          </React.Fragment>
      )
    )}
  
    </div>
    </div>
  );
}

export default Sidebar;