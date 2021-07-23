import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';

function FolderNavigate({id, font}) {
useSelector((state) => state.folder);
const folders = useSelector((state) => (state.folder && state.folder.data) || []);
const dispatch = useDispatch();

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
  }

  const editFolderName = () => {
    const middle = JSON.parse(JSON.stringify(folders));  
    dispatch({type:'UndoPush', payload: middle});
    dispatch({type:'EditName', payload: {
      editName: editName,
      index: index
    }});
  }

const addFolder = () => {
  const middle = JSON.parse(JSON.stringify(folders));  
  dispatch({type:'UndoPush', payload: middle});
  dispatch({type:'NewFolder', payload:{
    newName: newName,
    parent: id
  }});
  }
const handleEditChange = (e) => {
  setEditName(e.target.value);
}

const handleFolderName = (e) => {
  setNewName(e.target.value);
  console.log(newName);
}

const selectedFont = {fontWeight: 'bold', color: 'white', background: 'none', border: 'none' }
const normalFont = {fontWeight: 'normal', color: 'white', background: 'none', border: 'none' }


  return (
    <React.Fragment>
    <div style={{flex: 1}}>
    <p style={{left: 40}}><Link to={folders[index].link === 'management' ? '#' : folders[index].link}><button style={ folders[index].isSelected ? selectedFont : normalFont} onClick={() => {open(); dispatch({type:'SetSelected', payload: index})}} >{folders[index].name} {folders[index].isOpened ? '▲' : '▼' }</button></Link></p>
    </div>
    {folders[index].isOpened && folders.filter(child => child.parent == id).map( (child, key) => <ul key={key}><li><FolderNavigate id={child.id} /></li></ul>) }
    </React.Fragment>
  );
}

export default FolderNavigate;