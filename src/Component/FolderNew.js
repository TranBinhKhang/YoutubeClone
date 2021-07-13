import React, { useState, useContext } from 'react';
import {Folders, Undo} from '../Context/ContextProvider';
import { useDispatch, useSelector } from "react-redux";
import { openFolder } from '../Store/actions';

function FolderNew({id}) {
  useSelector((state) => state.folder);
  const undoStack = useSelector((state) => (state.doState.undoStack));
  const redoStack = useSelector((state) => (state.doState.redoStack));
  const folders = useSelector((state) => (state.folder && state.folder.data) || []);


  const dispatch = useDispatch();

// const {folders, setFolders } = useContext(Folders);
const [editName, setEditName] = useState();
const [newName, setNewName] = useState();
const index = folders.findIndex(folder => folder.id === id);

const open = () => {
  dispatch({type:'OpenFolder', payload: index});
}

const showFolder = () => {
    dispatch({type:'ShowInput', payload: index});
}


const showEditBar = () => {
  dispatch({type:'ShowEdit', payload: index});
  }

const deleteFolder = () => {
   
    const middle = JSON.parse(JSON.stringify(folders));
    dispatch({type:'UndoPush', payload: middle});
    
    dispatch({type:'DeleteFolder', payload: index});
    // let middle = JSON.parse(JSON.stringify(folders));
    // middle.splice(index, 1);
    // //setFolders(middle);
  }

  const editFolderName = () => {
    const middle = JSON.parse(JSON.stringify(folders));  
    dispatch({type:'UndoPush', payload: middle});
    dispatch({type:'EditName', payload: {
      editName: editName,
      index: index
    }});
    // let middle = JSON.parse(JSON.stringify(folders));
    // middle[index].name = editName;
    //setFolders(middle);
  }

  const addFolder = () => {
    const middle = JSON.parse(JSON.stringify(folders));  
    dispatch({type:'UndoPush', payload: middle});
    dispatch({type:'NewFolder', payload:{
      newName: newName,
      parent: id
    }});
    // undoState.push(folders);
    // console.log(undoState);
    //  let middle = JSON.parse(JSON.stringify(folders));
    //  middle.push({  
    //     "id": Math.floor(Math.random() * (99999999999999999 - 1000 + 1)) + 1000,
    //      "name": newName,
    //      "isOpened": true,
    //      "showInput": false,
    //      "showEdit": false,
    //      "parent": id,
    //  })
     //setFolders(middle);
    }
    const handleEditChange = (e) => {
      setEditName(e.target.value);
    }
  
  const handleFolderName = (e) => {
      setNewName(e.target.value);
      console.log(newName);
    }


  return (
    <React.Fragment>
    <div style={{flex: 1}}>
    <p style={{left: 40}}><span><button onClick={open}>{folders[index].isOpened ? '▲' : '▼' }</button></span>📁{folders[index].name}  <span><button onClick={() => {showFolder(); setNewName('New Folder')}}>+</button> <button onClick={() => {showEditBar(); setEditName(folders[index].name)}}>✏</button> <button onClick={deleteFolder}>🗑</button></span></p>
    {folders[index].showInput && <div style={{float: 'inline-start', marginLeft: 30}}><input onChange={handleFolderName} /> <button onClick={addFolder}>Add new folder</button></div>}
    {folders[index].showEdit && <div style={{float: 'inline-start', marginLeft: 30}}><input onChange={handleEditChange} /> <button onClick={editFolderName}>Edit name</button></div>}
    </div>
    {folders[index].isOpened && folders.filter(child => child.parent == id).map( (child, key) => <ul key={key}><li><FolderNew id={child.id} /></li></ul>) }
    </React.Fragment>
  );
}

export default FolderNew;