import logo from './logo.svg';
import React, {useEffect, useState} from 'react';
// import './App.css';
import { useDispatch, useSelector } from "react-redux";
import Sidebar from './Sidebar';
import Login from './Login';
import axiosConfig from './axiosConfig';
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';
import { getCRUD, getData } from './Store/actions';
import { Dropdown, Selection } from 'react-dropdown-now';
import { api } from "./config.json";
import 'react-dropdown-now/style.css';



function FolderAdd() {
  const state = useSelector((state) => state);
  const folders = useSelector((state) => (state.folder && state.folder.data) || []);
  const dispatch = useDispatch();
  const [id, setId] = useState();
  const [name, setName] = useState();
  const [parent, setParent] = useState();
  const [error, setError] = useState(null);
  // const [parent, setParent] = useState();
  const history = useHistory();
  useEffect(() => {
    dispatch(getData());
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    const stuff = {
      id: id,
      name: name,
      parent: parent,
    }
    await axios.post(api + '/addfolder', stuff, axiosConfig).then(res => res.statusText === 'OK' ? history.push("/foldercrud") : console.log('notokay')).catch(error => setError(error.response.data))
    dispatch(getData());
  }

  return (
    <div style={{marginLeft: '18%'}}>
      <button onClick={submit}>test</button>
    <div style={{  display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'}}><h3>Add new item</h3></div>
    <div style={{  display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'}}>
    <form>
    <p style={{color: 'red'}}>{error && error}</p>
    <label>ID</label><br/>
    <input onChange={event => setId(event.target.value)} /><br/>
    <label>Name</label><br/>
    <input onChange={event => setName(event.target.value)} /><br/>
    <label>Parent</label><br/>
    <Dropdown
    placeholder="Select an option"
    options={[{ value: 0, label: 'None'},...folders.map(folder => ({ value: folder.id, label: folder.name }))]}
    onChange={(value) => setParent(value.value)}
    onSelect={(value) => console.log('selected!', value.value)}
    />
    <label> </label><br/>
    {/* <input type="submit" onClick={() => {submit(); dispatch(getData());
    }} /> */}
    <button onClick={submit}>Submit</button>
    </form> 
 
    </div>

    </div>
  );
}

export default FolderAdd;
