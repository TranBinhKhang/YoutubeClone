import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import FolderNew from './Component/FolderNew';
import {Folders, Undo} from './Context/ContextProvider';
import { useDispatch, useSelector } from "react-redux";
import { getData } from './Store/actions';

function Home() {
  // Declare a new state variable, which we'll call "count"
  // const [folders, setFolders] = useState();

//  const getFolders = async () => {
//     await axios.get("https://api.jsonbin.io/b/60e69ab7fe016b59dd5f2435").then(response => {setFolders(response.data)})
//  }


 
//  useEffect(() => {
//     getFolders();
//   }, []);
const folders = useSelector((state) => state.folder.data);
const dispatch = useDispatch(); //this hook gives us dispatch method
useEffect(() => {
  dispatch(getData());
  // getFolders();
}, []);
  
  const [undoState, setUndoState] = useState([]);
  const [upperTopInput, setUpperTopOutput] = useState(false);   
  const [redoState, setRedoState] = useState([]);
  const [upperName, setUpperName] = useState();
  const [search, setSearch] = useState();


const upperAdd = () => {
    undoState.push(folders);
    console.log(undoState);
    let middle = JSON.parse(JSON.stringify(folders));
    middle.push({  
        "id": Math.floor(Math.random() * (999999999 - 1000 + 1)) + 1000,
        "name": upperName,
        "isOpened": true,
        "showInput": false,
        "showEdit": false,
        "parent": null,
    })
//  setFolders(middle);
}

const undo = () => {
    if (undoState.length !== 0) {
    redoState.push(folders);
    // setFolders(undoState.pop());
    console.log(undoState);
    }
    else return;
}

const redo = () => {
    if (redoState.length !== 0) {
    undoState.push(folders);
    // setFolders(redoState.pop());
    console.log(redoState);
    }
    else return;
}

  return (
    // <Folders.Provider value={{folders}}>
    <Undo.Provider value={{undoState, setUndoState}}>
    <div >
    <button onClick={() => setUpperTopOutput(!upperTopInput)}>New Folder</button><span>   {upperTopInput && <div style={{float: 'inline-start'}}><input onChange={event => setUpperName(event.target.value)} /> <button onClick={upperAdd}>Add new folder</button></div>}</span>
    <button onClick={() => console.log(folders)}>Undo</button>
    <button onClick={redo}>Redo</button>
    <span>      Search bar: </span><input onChange={event => setSearch(event.target.value)} />

    {!search && folders && folders.filter(folder => folder.parent === null).map((folder, key) => (
          <React.Fragment key={key}>
          <FolderNew id={folder.id} />
          </React.Fragment>
      )
    )}

  {/* {search && folders && folders.filter(folder => folder.name === search).map((folder, key) => (
          <React.Fragment key={key}>
          <FolderNew id={folder.id} />
          </React.Fragment>
      )
    )} */}
    </div>
    </Undo.Provider>
    // </Folders.Provider>
  );
}

export default Home;