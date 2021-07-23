import logo from './logo.svg';
import React, {useEffect, useState} from 'react';
import './App.css';
import { useDispatch, useSelector } from "react-redux";
import Home from './Home';
import Login from './Login';
import axiosConfig from './axiosConfig';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { getCRUD } from './Store/actions';


function Edit() {
  const state = useSelector((state) => state);
  const update = useSelector(state => state.list.update)

  const dispatch = useDispatch();
  const updateItem = async () => {
    const stuff = {
      _id: update._id,
      code: update.code,
      name: update.name,
      category: update.category,
      budget: update.budget,
      status: update.status
    }
    console.log(stuff);
    await axios.post('http://192.168.1.142:4000/api/update', stuff, axiosConfig);
    dispatch(getCRUD());
  }

  return (
    <div style={{marginLeft: '18%'}}>
    <div style={{  display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'}}><h3>Update item</h3></div>
    <div style={{  display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'}}>
    {update && <form>
    <label>Code</label><br/>
    <input value={update.code} onChange={event => dispatch({type:'EditCode', payload: event.target.value})} /><br/>
    <label>Name</label><br/>
    <input value={update.name} onChange={event => dispatch({type:'EditListName', payload: event.target.value})} /><br/>
    <label>Category</label><br/>
    <input value={update.category} onChange={event => dispatch({type:'EditCategory', payload: event.target.value})} /><br/>
    <label>Budget</label><br/>
    <input value={update.budget} onChange={event => dispatch({type:'EditBudget', payload: event.target.value})} /><br/>
    <label>Status</label><br/>
    <input value={update.status} onChange={event => dispatch({type:'EditStatus', payload: event.target.value})} /><br/>
    <label> </label><br/>
    <Link to={'/crud'}><input type="submit" onClick={() => {updateItem(); dispatch(getCRUD());
}} /></Link>
    
    </form>}
    </div>

    </div>
  );
}

export default Edit;
