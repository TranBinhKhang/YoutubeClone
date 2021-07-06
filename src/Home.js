import React, { useState } from 'react';
import Folder from './Component/Folder';
import FolderNew from './Component/FolderNew';

function Home() {
  // Declare a new state variable, which we'll call "count"
  const [upperTopInput, setUpperTopOutput] = useState(false);
  const [undoState, setUndoState] = useState([]);
const [redoState, setRedoState] = useState([]);
const [upperName, setUpperName] = useState();
const [search, setSearch] = useState();
  const [folders, setFolders] = useState([
    {   
        "id": 1,
        "name": "DuLieu",
        "isOpened": true,
        "showInput": false,
        "showEdit": false,
        "parent": null,
    },
    {
        "id": 2,
        "name": "NHAN SU",
        "isOpened": true,
        "showInput": false,
        "showEdit": false,
        "parent": 1,
    },
    {   "id": 3,
        "name": "BIEN CHE",
        "showInput": false,
        "isOpened": false,
        "showEdit": false,
        "parent": 2,
    },
    {   "id": 4,
        "name": "HOP DONG",
        "showInput": false,
        "isOpened": false,
        "showEdit": false,
        "parent": 2,
    },      
    {   "id": 5,
        "name": "TAI LIEU",
        "isOpened": false,
        "showInput": false,
        "showEdit": false,
        "parent": 1,
    },
    {   "id": 6,
        "name": "DTKH",
        "showInput": false,
        "showEdit": false,
        "isOpened": false,
        "parent": 5,
    },
    {   "id": 7,
        "name": "LUU TRU",
        "showInput": false,
        "isOpened": false,
        "showEdit": false,
        "parent": 5,
    },
    {   "id": 8,
        "name": "VAN BANG",
        "isOpened": false,
        "showInput": false,
        "showEdit": false,
        "parent": 1,
    },   
    {   "id": 9,
        "name": "BAN LUONG",
        "showInput": false,
        "showEdit": false,
        "isOpened": false,
        "parent": 8,
    },
    {   "id": 10,
        "name": "BAO CAO",
        "showInput": false,
        "isOpened": false,
        "showEdit": false,
        "parent": 8,
    },
    {   "id": 11,
        "name": "HT",
        "showInput": false,
        "isOpened": false,
        "showEdit": false,
        "parent": 8,
    },
]);
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
 setFolders(middle);
}

const undo = () => {
    if (undoState.length !== 0) {
    redoState.push(folders);
    setFolders(undoState.pop());
    console.log(undoState);
    }
    else return;
}

const redo = () => {
    if (redoState.length !== 0) {
    undoState.push(folders);
    setFolders(redoState.pop());
    console.log(redoState);
    }
    else return;
}

  return (
    <div >
    <button onClick={() => setUpperTopOutput(!upperTopInput)}>New Folder</button><span>   {upperTopInput && <div style={{float: 'inline-start'}}><input onChange={event => setUpperName(event.target.value)} /> <button onClick={upperAdd}>Add new folder</button></div>}</span>
    <button onClick={undo}>Undo</button>
    <button onClick={redo}>Redo</button>
    <span>      Search bar: </span><input onChange={event => setSearch(event.target.value)} />

    {!search && folders.filter(folder => folder.parent === null).map((folder, key) => (
          <React.Fragment key={key}>
          <FolderNew folders={folders} name={folder.name} id={folder.id} undoState={undoState} setUndoState={setUndoState} setFolders={setFolders} showInput={folder.showInput} showEdit={folder.showEdit} isOpened={folder.isOpened} />
          </React.Fragment>
      )
    )}

    {search && folders.filter(folder => folder.name === search).map((folder, key) => (
          <React.Fragment key={key}>
          <FolderNew folders={folders} id={folder.id} undoState={undoState} setUndoState={setUndoState} setFolders={setFolders} showInput={folder.showInput} showEdit={folder.showEdit} isOpened={folder.isOpened} />
          </React.Fragment>
      )
    )}



    </div>
  );
}

export default Home;