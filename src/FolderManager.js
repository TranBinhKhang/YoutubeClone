import React, { useEffect, useState } from 'react';
import FolderNew from './Component/FolderNew';
import { useDispatch, useSelector } from "react-redux";
import { getData } from './Store/actions';
import axios from 'axios';

function Home() {
const state = useSelector((state) => state);
const undoStack = useSelector((state) => (state.doState.undoStack));
const redoStack = useSelector((state) => (state.doState.redoStack));
const folders = useSelector((state) => (state.folder && state.folder.data) || []);
const dispatch = useDispatch();
useEffect(() => {
  // dispatch(getData());
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
    <div style={{marginLeft: '18%'}}>
    <div style={{marginTop: 10}}>

    {showInfo && username && password && <div>
      <p>The username is {username}</p>
      <p>The password is {password}</p>
    </div>}


    <button onClick={() => setUpperTopOutput(!upperTopInput)}>New Folder</button><span>   {upperTopInput && <div style={{float: 'inline-start'}}><input onChange={event => setUpperName(event.target.value)} /> <button onClick={upperAdd}>Add new folder</button></div>}</span>
    <button onClick={undo}>Undo</button>
    <button onClick={redo}>Redo</button>
    <span>      Search bar: </span><input onChange={event => setSearch(event.target.value)} /></div>
    <div style={{marginTop: 10}}>
    {!search && folders && folders.filter(folder => !folder.parent).map((folder, key) => (
          <React.Fragment key={key}>
          <FolderNew id={folder.id} />
          </React.Fragment>
      )
    )}

    {search && folders && folders.filter(folder => folder.name === search).map((folder, key) => (
            <React.Fragment key={key}>
            <FolderNew id={folder.id} />
            </React.Fragment>
        )
    )}
    </div>
    </div>
  );
}

export default Home;