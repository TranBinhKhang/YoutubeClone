import logo from './logo.svg';
import React, {useEffect, useState} from 'react';
// import './App.css';
import { useDispatch, useSelector } from "react-redux";
import Sidebar from './Sidebar';
import Login from './Login';
import axiosConfig from './axiosConfig';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { getCRUD, getData } from './Store/actions';
import { api } from "./config.json";
import { Dropdown, Selection } from 'react-dropdown-now';
import 'react-dropdown-now/style.css';
import { useHistory } from 'react-router';

function FolderEdit() {
  const history = useHistory();
  const state = useSelector((state) => state);
  const folders = useSelector((state) => (state.folder && state.folder.data) || []);

  const update = useSelector(state => state.list.folder);
  const [error, setError] = useState(null);

  const dispatch = useDispatch();
  const updateItem = async (e) => {
    e.preventDefault();
    const stuff = {
      _id: update._id,
      id: update.id,
      name: update.name,
      parent: update.parent
    }
    console.log(stuff);
    await axios.post(api + '/updatefolder', stuff, axiosConfig).then(res => res.statusText === 'OK' ? history.push("/foldercrud") : console.log('notokay')).catch(error => setError(error.response.data))
    dispatch(getData());
  }

  return (
//     <div>
//     <button onClick={updateItem}>test</button>
//     <div style={{  display: 'flex',
//       alignItems: 'center',
//       justifyContent: 'center'}}><h3>Update item</h3></div>
//     <div style={{  display: 'flex',
//       alignItems: 'center',
//       justifyContent: 'center'}}>
//     {update && <form>
//     <p style={{color: 'red'}}>{error && error}</p>
//     <label>ID</label><br/>
//     <input value={update.id} onChange={event => dispatch({type:'UpdateId', payload: event.target.value})} /><br/>
//     <label>Name</label><br/>
//     <input value={update.name} onChange={event => dispatch({type:'UpdateName', payload: event.target.value})} /><br/>
//     <label>Parent</label><br/>
//     {/* <input value={update.parent} onChange={event => dispatch({type:'EditCategory', payload: event.target.value})} /><br/> */}
//     <Dropdown
//     placeholder="Select an option"
//     value={update.parent}
//     options={[{ value: 0, label: 'None'},...folders.map(folder => ({ value: folder.id, label: folder.name }))]}
//     onChange={(value) => dispatch({type:'UpdateParent', payload: value.value})}
//     onSelect={(value) => console.log('selected!', value.value)}
//     />
//     <label> </label><br/>
//     {/* <input type="submit" onClick={() => {updateItem(e); dispatch(getData());
// }}  */}
//     <button onClick={updateItem}>Submit</button>

    
//     </form>}

//     </div>

//     </div>
  

<div style={{height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>




<div style={{  display: 'flex',
backgroundColor: 'white',
flexDirection: 'column',
alignItems: 'center',
width: '55vh',
height: '75vh',
marginTop: '-10vh',
borderRadius: '2vh',
paddingBottom: '25vh',
justifyContent: 'center',
border: '1px solid rgb(14, 77, 146)'
}}>
<div style={{  display: 'flex',
alignItems: 'center',
justifyContent: 'center', color: 'rgb(14, 77, 146)'}}><h3>New Folder Form</h3></div>
<form>

<label>ID</label><br/>
<input 
 style={{ borderColor: `rgb(14, 77, 146)`, borderTop: 'none', borderLeft: 'none', borderRight: 'none', borderBottomStyle: 'solid', borderBottomWidth: 1, cursor: 'auto', padding: 5, marginBottom: 20, outline: 'none' }}
 value={update.id} onChange={event => dispatch({type:'UpdateId', payload: event.target.value})}/><br/>
<label>Name</label><br/>
<input 
style={{ borderColor: `rgb(14, 77, 146)`, borderTop: 'none', borderLeft: 'none', borderRight: 'none', borderBottomStyle: 'solid', borderBottomWidth: 1  , padding: 5, marginBottom: 20, outline: 'none' }}
value={update.name} onChange={event => dispatch({type:'UpdateName', payload: event.target.value})} /><br/>
<label>Parent</label><br/>
<Dropdown
placeholder="Select an option"
value={update.parent}
options={[{ value: 0, label: 'None'},...folders.map(folder => ({ value: folder.id, label: folder.name }))]}
onChange={(value) => dispatch({type:'UpdateParent', payload: value.value})}
onSelect={(value) => console.log('selected!', value.value)}
/>
<label> </label><br/>
{/* <input type="submit" onClick={() => {submit(); dispatch(getData());
}} /> */}
<button className="btn btn-danger btn-block" style={{backgroundColor: 'rgb(14, 77, 146)', border: 'rgb(14, 77, 146)', outline: 'none'}} onClick={updateItem}>Submit</button> <span style={{color: 'red', fontWeight: 'bold'}}>{error && error}</span>

</form> 

</div>

</div>

);
}

export default FolderEdit;
