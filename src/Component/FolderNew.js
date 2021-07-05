import React, { useState } from 'react';

function FolderNew({folders, id, name, undoState, setUndoState, editName, handleEditChange, handleFolderName, setEditName, isOpened, setFolders, showInput, showEdit, newName, setNewName}) {


const open = (id) => {
    let index = folders.findIndex(folder => folder.id === id);
    let middle = JSON.parse(JSON.stringify(folders));
    middle[index].isOpened = !middle[index].isOpened
    setFolders(middle);
}

const showFolder = (id) => {
    let index = folders.findIndex(folder => folder.id === id);
    let middle = JSON.parse(JSON.stringify(folders));
    middle[index].showInput = !middle[index].showInput;
    setFolders(middle);
}


const showEditBar = (id) => {
    let index = folders.findIndex(folder => folder.id === id);
    let middle = JSON.parse(JSON.stringify(folders));
    middle[index].showEdit = !middle[index].showEdit;
    setFolders(middle);
  }

  const deleteFolder = (id) => {
    undoState.push(folders)
    let index = folders.findIndex(folder => folder.id === id);
    let middle = JSON.parse(JSON.stringify(folders));
    middle.splice(index, 1);
    setFolders(middle);
  }

  const editFolderName = (id) => {
    undoState.push(folders);
    let index = folders.findIndex(folder => folder.id === id);
    undoState.push(folders);
    let middle = JSON.parse(JSON.stringify(folders));
    middle[index].name = editName;
    setFolders(middle);
  }

  const addFolder = (id) => {
    undoState.push(folders);
    console.log(undoState);
     let middle = JSON.parse(JSON.stringify(folders));
     middle.push({  
        "id": Math.floor(Math.random() * (99999999999999999 - 1000 + 1)) + 1000,
         "name": newName,
         "isOpened": true,
         "showInput": false,
         "showEdit": false,
         "parent": id,
     })
     setFolders(middle);
    }



  return (
    <React.Fragment>
    <div style={{flex: 1}}>
    <p style={{left: 40}}><span><button onClick={() => open(id)}>{isOpened ? '▲' : '▼' }</button></span>📁{name}  <span><button onClick={() => {showFolder(id); setNewName('New Folder')}}>+</button> <button onClick={() => {showEditBar(id); setEditName(name)}}>✏</button> <button onClick={() => deleteFolder(id)}>🗑</button></span></p>
    {showInput && <div style={{float: 'inline-start', marginLeft: 30}}><input onChange={handleFolderName} /> <button onClick={() => {addFolder(id)}}>Add new folder</button></div>}
    {showEdit && <div style={{float: 'inline-start', marginLeft: 30}}><input onChange={handleEditChange} /> <button onClick={() => {editFolderName(id)}}>Edit name</button></div>}
    </div>
    
    
    {isOpened && folders.filter(child => child.parent == id).map( (child, key) => <ul key={key}><li><FolderNew folders={folders} id={child.id} undoState={undoState} setUndoState={setUndoState} newName={newName} setNewName={setNewName} name={child.name} editName={editName} setEditName={setEditName} setFolders={setFolders} handleFolderName={handleFolderName} handleEditChange={handleEditChange} showInput={child.showInput} showEdit={child.showEdit} isOpened={child.isOpened} /></li></ul>) }
    </React.Fragment>
  );
}

export default FolderNew;