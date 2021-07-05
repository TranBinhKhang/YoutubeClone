import React, { useState } from 'react';

function FolderNew({folders, name, undoState, setUndoState, editName, handleEditChange, handleFolderName, setEditName, isOpened, open, add, edit, remove, childFolder, setFolders, showInput, showEdit, newName, setNewName, folderState, editNameState}) {
  // Declare a new state variable, which we'll call "count"


const openChild = (name) => {
  for (let i=0; i < folders.length; i++) {
    // console.log(folders[i].childFolders)
    for (let j = 0; j < folders[i].childFolders.length; j++)
    {
        if (folders[i].childFolders[j].name == name) {
            let middle = JSON.parse(JSON.stringify(folders));
            middle[i].childFolders[j].isOpened = !middle[i].childFolders[j].isOpened;
            setFolders(middle);
        }
    }
}
}

const showChildInput = (name) => {
  for (let i=0; i < folders.length; i++) {
    // console.log(folders[i].childFolders)
    for (let j = 0; j < folders[i].childFolders.length; j++)
    {
        if (folders[i].childFolders[j].name == name) {
            let middle = JSON.parse(JSON.stringify(folders));
            middle[i].childFolders[j].showInput = !middle[i].childFolders[j].showInput;
            setFolders(middle);
        }
    }
}
}


const showChildEdit = (name) => {
  console.log('pressed');
  for (let i=0; i < folders.length; i++) {
    // console.log(folders[i].childFolders)
    for (let j = 0; j < folders[i].childFolders.length; j++)
    {
      if (folders[i].childFolders[j].name == name) {
        let middle = JSON.parse(JSON.stringify(folders));
        middle[i].childFolders[j].showEdit = !middle[i].childFolders[j].showEdit;
        setFolders(middle);
        break;
      }
      for (let k = 0; k < folders[i].childFolders[j].childFolders.length; k++) {
          if (folders[i].childFolders[j].childFolders[k].name == name){
          let middle = JSON.parse(JSON.stringify(folders));
          middle[i].childFolders[j].childFolders[k].showEdit = !middle[i].childFolders[j].childFolders[k].showEdit;
          console.log(middle);
          setFolders(middle);
          }
        }
      }
    }
  }

  const deleteChild = (name) => {
    console.log('pressed');
    for (let i=0; i < folders.length; i++) {
      // console.log(folders[i].childFolders)
      for (let j = 0; j < folders[i].childFolders.length; j++)
      {
        if (folders[i].childFolders[j].name == name) {
          undoState.push(folders);
          let middle = JSON.parse(JSON.stringify(folders));
          middle[i].childFolders.splice(j, 1);
          setFolders(middle);
          break;
        }
        for (let k = 0; k < folders[i].childFolders[j].childFolders.length; k++) {
          undoState.push(folders);
            if (folders[i].childFolders[j].childFolders[k].name == name){
            let middle = JSON.parse(JSON.stringify(folders));
            middle[i].childFolders[j].childFolders.splice(k, 1);
            setFolders(middle);
            }
          }
        }
      }
    }

    const editFolderName = (name) => {
      // console.log('working');
      // console.log(editName);
      for (let i=0; i < folders.length; i++) {
        if (folders[i].name == name) {
          undoState.push(folders);
          let middle = JSON.parse(JSON.stringify(folders));
          middle[i].name = editName;
          setFolders(middle);
          break;
        }
        for (let j = 0; j < folders[i].childFolders.length; j++)
        {
          if (folders[i].childFolders[j].name == name) {
            undoState.push(folders);
            let middle = JSON.parse(JSON.stringify(folders));
            middle[i].childFolders[j].name = editName;
            setFolders(middle);
            break;
          }
          for (let k = 0; k < folders[i].childFolders[j].childFolders.length; k++) {
              if (folders[i].childFolders[j].childFolders[k].name == name){
              undoState.push(folders);
              let middle = JSON.parse(JSON.stringify(folders));
              middle[i].childFolders[j].childFolders[k].name = editName;
              setFolders(middle);
              }
            }
          }
        }
      }

      const addFolder = (name) => {
        for (let i=0; i < folders.length; i++) {
          if (folders[i].name == name) {
            undoState.push(folders);
            let middle = JSON.parse(JSON.stringify(folders));
            middle[i].childFolders.push({
              "name": newName,
              "isOpened": false,
              "childFolders": []
          })
            setFolders(middle);
            break;
          }
          for (let j = 0; j < folders[i].childFolders.length; j++)
          {
            if (folders[i].childFolders[j].name == name) {
              undoState.push(folders);
              let middle = JSON.parse(JSON.stringify(folders));
              middle[i].childFolders[j].childFolders.push({
                "name": newName,
                "isOpened": false,
                "childFolders": []
            })
              setFolders(middle);
            }

            }
          }
        }



  return (
    <React.Fragment>
    <div style={{flex: 1}}>
    <p style={{left: 40}}><span><button onClick={open}>{isOpened ? '▲' : '▼' }</button></span>📁{name}  <span><button onClick={add}>+</button> <button onClick={edit}>✏</button> <button onClick={remove}>🗑</button></span></p>
    {showInput && <div style={{float: 'inline-start', marginLeft: 30}}><input onChange={handleFolderName} /> <button onClick={() => addFolder(name)}>Add new folder</button></div>}
    {showEdit && <div style={{float: 'inline-start', marginLeft: 30}}><input onChange={handleEditChange} /> <button onClick={() => editFolderName(name)}>Edit name</button></div>}
    </div>
    
    
    {isOpened && childFolder? childFolder.map( (child, key) => <ul key={key}><li><FolderNew undoState={undoState} setUndoState={setUndoState} handleFolderName={handleFolderName} folders={folders} newName={newName} setNewName={setNewName} setEditName={setEditName} editName={editName} setFolders={setFolders} handleEditChange={handleEditChange} open={() => openChild(child.name)} add={() => {showChildInput(child.name); setNewName(child.name);}} name={child.name} isOpened={child.isOpened} showInput={child.showInput} showEdit={child.showEdit} remove={() => deleteChild(child.name)} edit={() => {showChildEdit(child.name); setEditName(child.name);}} childFolder={child.childFolders}/></li></ul> ) : console.log()}
    </React.Fragment>
  );
}

export default FolderNew;