import { blue } from '@material-ui/core/colors';
import { Button } from 'bootstrap';
import React from 'react';
import div, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import '../List.css';
import axiosConfig from '../Utils/axiosConfig';
import axios from 'axios';
import { api } from "../config.json";
import { BsThreeDotsVertical } from "react-icons/bs";



function VideoComment({_id, parentId, videoId, restart}) {
  const comments = useSelector((state) => (state.comment && state.comment.comment) || []);
  const user = useSelector((state) => (state.account && state.account.username) || []);
const dispatch = useDispatch();
const [reply, setReply] = useState();


// const [editName, setEditName] = useState();
// const [newName, setNewName] = useState();
const index = comments.findIndex(comment => comment._id === _id);

const open = () => {
  dispatch({type:'ShowChild', payload: index});
}

const showCommentReply = () => {
    dispatch({type:'ShowCommentReply', payload: index});
}

const postReply = async () => {
  const newVideo = {
    "_id": videoId,
    "username": user,
    "comment": reply,
    "parent": _id,
  }
  console.log(newVideo)
  
  await axios
  .post(api + "/postcomment", newVideo, axiosConfig)
  .then(restart)
}

const postReplyParent = async () => {
  const newVideoParent = {
    "_id": videoId,
    "username": user,
    "comment": reply,
    "parent": parentId,
  }
  console.log(newVideoParent)
  
  await axios
  .post(api + "/postcomment", newVideoParent, axiosConfig)
  .then(restart)
}
// const showEditBar = () => {
//   dispatch({type:'ShowEdit', payload: index});  
// }

// const deleteFolder = () => {
//     const middle = JSON.parse(JSON.stringify(folders));
//     dispatch({type:'UndoPush', payload: middle});
//     dispatch({type:'DeleteFolder', payload: index});
//   }

//   const editFolderName = () => {
//     const middle = JSON.parse(JSON.stringify(folders));  
//     dispatch({type:'UndoPush', payload: middle});
//     dispatch({type:'EditName', payload: {
//       editName: editName,
//       index: index
//     }});
//   }

// const addFolder = () => {
//   const middle = JSON.parse(JSON.stringify(folders));  
//   dispatch({type:'UndoPush', payload: middle});
//   dispatch({type:'NewFolder', payload:{
//     newName: newName,
//     parent: id
//   }});
//   }
// const handleEditChange = (e) => {
//   setEditName(e.target.value);
// }

// const handleFolderName = (e) => {
//   setNewName(e.target.value);
//   console.log(newName);
// }


  return (
    <div style={{marginBottom: 15}}>
    <div style={{flex: 1}}>
    <div><span style={{fontWeight: 'bold'}}>{comments[index].username}</span> <span>   </span> <span style={{fontSize: 12, color: 'gray'}}>{comments[index].postedAt}</span></div>
    <button style={{background: 'none', border: 'none', color: 'white', float: 'right'}} onClick={() => console.log()}><BsThreeDotsVertical/></button>
    <div>{comments[index].comment}</div>
    <a style={{fontWeight: 'bold', fontSize: 14, color: 'gray'}} onClick={() => showCommentReply()}>Reply</a><br/>

    {comments[index].showReply && <React.Fragment><textarea 
      style={{ borderColor: 'white',   height: '20px', color: 'white', backgroundColor: 'black', borderTop: 'none', borderLeft: 'none', borderRight: 'none', borderBottomStyle: 'solid', borderBottomWidth: 1, cursor: 'auto', padding: 5 }}
      type="text"
      placeholder='Comment'
      onChange={event => setReply(event.target.value)}
      className="form-control" />
       <div style={{float: 'right'}}>
      <button className="btn btn-outline-light my-2 my-sm-0" onClick={() => {!comments[index].parent ? postReply() : postReplyParent()}}>Post Reply</button></div></React.Fragment>}
    {!comments[index].parent && <a style={{fontWeight: 'bold', fontSize: 14}} onClick={() => open()}>View reply {comments[index].showChild ? '▲' : '▼' } </a>}

    {/* <a style={{color: blue}}>View reply</a> */}


    {/* <p style={{left: 40}}><span><button onClick={open}>{folders[index].isOpened ? '▲' : '▼' }</button></span>📁<a href='#' onClick={open} >{folders[index].name}</a>  <span><button onClick={() => {showFolder(); setNewName('New Folder')}}>+</button> <button onClick={() => {showEditBar(); setEditName(folders[index].name)}}>✏</button> <button onClick={deleteFolder}>🗑</button></span></p>

    {folders[index].showInput && <div style={{float: 'inline-start', marginLeft: 30}}><input onChange={handleFolderName} /> <button onClick={addFolder}>Add new folder</button></div>}
    {folders[index].showEdit && <div style={{float: 'inline-start', marginLeft: 30}}><input onChange={handleEditChange} /> <button onClick={editFolderName}>Edit name</button></div>} */}
    </div>
    {/* {comments[index].isOpened && comments.filter(child => child.parent == _id).map( (child, key) => <ul key={key}><li><Comment id={child.id} /></li></ul>) } */}
    <div style={{marginTop: 5}}>
    {comments[index].showChild && comments.filter(child => child.parent == _id).map( (child, key) => <ul key={key}><li><VideoComment _id={child._id} parentId={_id} videoId={videoId} /></li></ul>) }
    </div>
    </div>
  );
}

export default VideoComment;