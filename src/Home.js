import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import FolderNew from './Component/FolderNew';
import {Folders, Undo} from './Context/ContextProvider';
import { useDispatch, useSelector } from "react-redux";
import { getData, test } from './Store/actions';

function Home() {
  // Declare a new state variable, which we'll call "count"
  // const [folders, setFolders] = useState();

//  const getFolders = async () => {
//     await axios.get("https://api.jsonbin.io/b/60e69ab7fe016b59dd5f2435").then(response => {setFolders(response.data)})
//  }

  useSelector((state) => state);

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
    // undoState.push(folders);
    // console.log(undoState);
    const middle = JSON.parse(JSON.stringify(folders));  
    dispatch({type:'UndoPush', payload: middle});
    dispatch({type:'NewFolderTop', payload: upperName});
    // let middle = JSON.parse(JSON.stringify(folders));
    // middle.push({  
    //     "id": Math.floor(Math.random() * (999999999 - 1000 + 1)) + 1000,
    //     "name": upperName,
    //     "isOpened": true,
    //     "showInput": false,
    //     "showEdit": false,
    //     "parent": null,
    // })
//  setFolders(middle);
}

const undo = () => {
    if (undoStack.length !== 0) {
    // redoState.push(folders);
    // console.log(undoState);
    // setFolders(undoState.pop());
    // dispatch({type:'UndoState', payload: 'STuff'});
    // console.log(undoState);
    const middle = JSON.parse(JSON.stringify(folders));
    dispatch({type:'RedoPush', payload: middle})
    dispatch({type:'Undo', payload: undoStack.pop()})
    }
    else return;
}

const redo = () => {
    if (redoStack.length !== 0) {
    // undoState.push(folders);
    // dispatch({type:'Redo', payload: redoState.pop()});
    // console.log(redoState);
    const middle = JSON.parse(JSON.stringify(folders));
    dispatch({type:'UndoPush', payload: middle})
    dispatch({type:'Redo', payload: redoStack.pop()})
    }
    else return;
}

  return (
    // <Folders.Provider value={{folders}}>
    <div >
    <button onClick={() => setUpperTopOutput(!upperTopInput)}>New Folder</button><span>   {upperTopInput && <div style={{float: 'inline-start'}}><input onChange={event => setUpperName(event.target.value)} /> <button onClick={upperAdd}>Add new folder</button></div>}</span>
    <button onClick={undo}>Undo</button>
    <button onClick={redo}>Redo</button>
    {/* <button onClick={() => console.log(folders)}>Test folder state</button>
    <button onClick={() => dispatch({type:'DoTest', payload: 'the reducer'})}>Add Undo state</button>
    <button onClick={() => console.log(total)}>Test all state</button>
    <button onClick={() => console.log(undoStack)}>Test current undo stack</button> */}
    <span>      Search bar: </span><input onChange={event => setSearch(event.target.value)} />

    {!search && folders && folders.filter(folder => folder.parent === null).map((folder, key) => (
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
    // </Folders.Provider>
  );
}

export default Home;