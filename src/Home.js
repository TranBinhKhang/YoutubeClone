import React, { useState } from 'react';
import Folder from './Component/Folder';
import FolderNew from './Component/FolderNew';

function Home() {
  // Declare a new state variable, which we'll call "count"
  const [upperTopInput, setUpperTopOutput] = useState(false);
  const [folders, setFolders] = useState([
    {
        "name": "DuLieu",
        "isOpened": true,
        "showInput": false,
        "showEdit": false,
        "childFolders": [
            {
                "name": "NHAN SU",
                "isOpened": true,
                "showInput": false,
                "showEdit": false,
                "childFolders": [
                    {
                        "name": "BIEN CHE",
                        "showInput": false,
                        "isOpened": false,
                        "showEdit": false,
                    },
                    {
                        "name": "HOP DONG",
                        "showInput": false,
                        "isOpened": false,
                        "showEdit": false,
                    },
                ]
            },
            {
                "name": "TAI LIEU",
                "isOpened": false,
                "showInput": false,
                "showEdit": false,
                "childFolders": [
                    {
                        "name": "DTKH",
                        "showInput": false,
                        "showEdit": false,
                        "isOpened": false,
                    },
                    {
                        "name": "LUU TRU",
                        "showInput": false,
                        "isOpened": false,
                        "showEdit": false,
                    },
                ]
            },
            {
                "name": "VAN BANG",
                "isOpened": false,
                "showInput": false,
                "showEdit": false,
                "childFolders": [
                    {
                        "name": "BAN LUONG",
                        "showInput": false,
                        "showEdit": false,
                        "isOpened": false,
                    },
                    {
                        "name": "BAO CAO",
                        "showInput": false,
                        "isOpened": false,
                        "showEdit": false,
                    },
                    {
                        "name": "HT",
                        "showInput": false,
                        "isOpened": false,
                        "showEdit": false,
                    },
                ]
            },
        ]
    },
]);

const [undoState, setUndoState] = useState([]);
const [redoState, setRedoState] = useState([]);

const upperAdd = () => {
undoState.push(folders);
console.log(undoState);
 let middle = JSON.parse(JSON.stringify(folders));
 middle.push({  
     "name": upperName,
     "isOpened": true,
     "showInput": false,
     "showEdit": false,
     "childFolders": []
 })
 setFolders(middle);
}

const deleteTop = (name) => {
    undoState.push(folders)
    let index = folders.findIndex(folder => folder.name === name);
    let middle = JSON.parse(JSON.stringify(folders));
    middle.splice(index, 1);
    setFolders(middle);
}


const showTopInput = (name) => {
    
    let Index = folders.findIndex(folder => folder.name === name);
    let middle = JSON.parse(JSON.stringify(folders));
    middle[Index].showInput = !middle[Index].showInput;
    setFolders(middle);
}


const showTopEdit = (name) => {
    let Index = folders.findIndex(folder => folder.name === name);
    let middle = JSON.parse(JSON.stringify(folders));
    middle[Index].showEdit = !middle[Index].showEdit;
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
const [upperName, setUpperName] = useState();
const [editName, setEditName] = useState();
const [newName, setNewName] = useState();
const [search, setSearch] = useState();

const open = (name) => {
    if (folders.find(folder => folder.name == name))
    {
        let Index = folders.findIndex(folder => folder.name === name);
        let middle = JSON.parse(JSON.stringify(folders));
        middle[Index].isOpened = !middle[Index].isOpened
        setFolders(middle);
    }
    if (folders.map(result => result.childFolders.map(child => child.name).includes(name)))
    {
        console.log(folders.map(result => result.childFolders.map(child => child.name).includes(name)))
        for (let i=0; i < folders.length; i++) {
            for (let j = 0; j < folders[i].childFolder; j++)
            {
                if (folders[i].childFolders[j].name == name) {

                    let middle = JSON.parse(JSON.stringify(folders));
                    middle[i].childFolders[j].isOpened = !middle[i].childFolders[j].isOpened;
                    setFolders(middle);
                }
            }
        }
    }
}

const handleEditChange = (e) => {
    setEditName(e.target.value);
    console.log(editName);
  }

const handleFolderName = (e) => {
    setNewName(e.target.value);
    console.log(newName);
  }
  
  

  return (
    <div >
    <button onClick={() => setUpperTopOutput(!upperTopInput)}>New Folder</button><span>   {upperTopInput && <div style={{float: 'inline-start'}}><input onChange={event => setUpperName(event.target.value)} /> <button onClick={upperAdd}>Add new folder</button></div>}</span>
    <button onClick={undo}>Undo</button>
    <button onClick={redo}>Redo</button>
    <span>      Search bar: </span><input onChange={event => setSearch(event.target.value)} />

    {!search && folders.map((folder, key) => (
          <React.Fragment key={key}>
          <FolderNew folders={folders} undoState={undoState} setUndoState={setUndoState} newName={newName} setNewName={setNewName} name={folder.name} editName={editName} setEditName={setEditName} setFolders={setFolders} handleFolderName={handleFolderName} handleEditChange={handleEditChange} showInput={folder.showInput} showEdit={folder.showEdit} childFolder={folder.childFolders} isOpened={folder.isOpened} open={() => open(folder.name)} remove={() => deleteTop(folder.name)} add={() => showTopInput(folder.name)} edit={() => {setEditName(folder.name); showTopEdit(folder.name)}}/>
          </React.Fragment>
      )
    )}

    {search && folders.filter(result => (result.name == search || result.childFolders.map(child => child.name).includes(search) || folders[0].childFolders.map(child => child.childFolders).concat.apply([], folders[0].childFolders.map(child => child.childFolders)).map( grandchild => grandchild.name).includes(search))).map((folder, key) => (
          <React.Fragment key={key}>
          <FolderNew folders={folders} undoState={undoState} setUndoState={setUndoState} newName={newName} setNewName={setNewName} name={folder.name} editName={editName} setEditName={setEditName} setFolders={setFolders} handleFolderName={handleFolderName} handleEditChange={handleEditChange} showInput={folder.showInput} showEdit={folder.showEdit} childFolder={folder.childFolders} isOpened={folder.isOpened} open={() => open(folder.name)} remove={() => deleteTop(folder.name)} add={() => showTopInput(folder.name)} edit={() => {setEditName(folder.name); showTopEdit(folder.name)}}/>
          </React.Fragment>
      )
    )}


    </div>
  );
}

export default Home;