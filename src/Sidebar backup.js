import React, { useEffect, useState } from 'react';
import FolderNew from './Component/FolderNew';
import { useDispatch, useSelector } from "react-redux";
import { getData, getCRUD } from './Store/actions';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css"

import FolderNavigate from './Component/FolderNavigate';
import axiosConfig from './axiosConfig';
import { api } from "./config.json";


function Sidebar() {
const state = useSelector((state) => state);
// const undoStack = useSelector((state) => (state.doState.undoStack));
// const redoStack = useSelector((state) => (state.doState.redoStack));
const folders = useSelector((state) => (state.folder && state.folder.data) || []);
const dispatch = useDispatch();
useEffect(() => {
  dispatch(getData());
  dispatch(getCRUD());
}, []);

const [search, setSearch] = useState();

const [username, setUsername] = useState();
const [password, setPassword] = useState();
const [showInfo, setShowInfo] = useState(false);


  return (
    <div className='Sidebar' style={{ flex: 1
}}>
    
    <div style={{backgroundColor: '#002D62'}}>
    {/* <button onClick={() => axios.post(api + '/info', {"nothing": "nothing"}, axiosConfig).then(response => {setShowInfo(!showInfo); setUsername(response.data.username); setPassword(response.data.password)})}>Show user info</button><span>    <button onClick={() => {localStorage.removeItem('token'); dispatch({type:'LogOut'})}}>Logout</button></span> */}
    {/* {showInfo && username && password && <div>
      <p>The username is {username}</p>
      <p>The password is {password}</p>
    </div>} */}
    <p style={{fontWeight: 'bold', color: 'white', fontSize: '20px', textAlign: 'center'}}>Folder list app</p>
    <hr style={{ height: 5,
    backgroundColor: 'white'}} />
    </div>
    <div>
    <div style={{marginBottom: 15}}>
    <input style={{marginInline: 5, borderRadius: 5, borderColor: 'teal'}} onChange={event => setSearch(event.target.value)} />
    </div>
    {!search && folders && folders.filter(folder => !folder.parent).map((folder, key) => (
          <React.Fragment key={key}>
          <FolderNavigate id={folder.id} />
          </React.Fragment>
      )
    )}

    {search && folders && folders.filter(folder => folder.name === search).map((folder, key) => (
            <React.Fragment key={key}>
            <FolderNavigate id={folder.id} />
            </React.Fragment>
        )
    )}</div>
    <div className='Footer'>
    <hr style={{ height: 5,
    backgroundColor: 'white'}} />
      <p style={{textAlign: 'center'}}>SUPER NIGGER</p>
    </div>
    </div>
  );
}

export default Sidebar;