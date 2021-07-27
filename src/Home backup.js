import React, { useEffect, useState } from 'react';
import FolderNew from './Component/FolderNew';
import { useDispatch, useSelector } from "react-redux";
import { getData } from './Store/actions';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css"

import FolderNavigate from './Component/FolderNavigate';
import { api } from "./config.json";

function FolderPage() {
const state = useSelector((state) => state);
const undoStack = useSelector((state) => (state.doState.undoStack));
const redoStack = useSelector((state) => (state.doState.redoStack));
const folders = useSelector((state) => (state.folder && state.folder.data) || []);
const dispatch = useDispatch();
useEffect(() => {
  dispatch(getData());
}, []);

const [upperTopInput, setUpperTopOutput] = useState(false);   
const [upperName, setUpperName] = useState();
const [search, setSearch] = useState();


const upperAdd = () => {
    const middle = JSON.parse(JSON.stringify(folders));  
    dispatch({type:'UndoPush', payload: middle});
    dispatch({type:'NewFolderTop', payload: upperName});
}
const undo = () => {
    if (undoStack.length !== 0) {
    const middle = JSON.parse(JSON.stringify(folders));
    dispatch({type:'RedoPush', payload: middle})
    dispatch({type:'Undo', payload: undoStack.pop()})
    }
    else return;
}
const redo = () => {
    if (redoStack.length !== 0) {
    const middle = JSON.parse(JSON.stringify(folders));
    dispatch({type:'UndoPush', payload: middle})
    dispatch({type:'Redo', payload: redoStack.pop()})
    }
    else return;
}

const [username, setUsername] = useState();
const [password, setPassword] = useState();
const [showInfo, setShowInfo] = useState(false);

  return (
    <div>
          <button onClick={() => axios.post(api + 'info', {'token': localStorage.getItem('token')}).then(response => {setShowInfo(!showInfo); setUsername(response.data.username); setPassword(response.data.password)})}>Show user info</button><span>    <button onClick={() => {localStorage.removeItem('token'); dispatch({type:'LogOut'})}}>Logout</button></span>
    <div style={{marginTop: 10}}>

    {showInfo && username && password && <div>
      <p>The username is {username}</p>
      <p>The password is {password}</p>
    </div>}

    <div>
    <button onClick={() => setUpperTopOutput(!upperTopInput)}>New Folder</button><span>   {upperTopInput && <div style={{float: 'inline-start'}}><input onChange={event => setUpperName(event.target.value)} /> <button onClick={upperAdd}>Add new folder</button></div>}</span>
    <button onClick={undo}>Undo</button>
    <button onClick={redo}>Redo</button>
    <br />
    <span>Search: </span><input style={{marginTop: 10}} onChange={event => setSearch(event.target.value)} /></div>
    </div>

    <div style={{marginTop: 10, overflowY: 'scroll', padding: 5, width: 340, height: 300, color: 'black', backgroundColor: 'lightgray', border: '2px solid rgba(0, 255, 255, 1)'}}>
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
    )}
    </div>
    </div>
  );
}

export default FolderPage;