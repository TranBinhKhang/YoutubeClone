
import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from "react-redux";
import axiosConfig from '../../Utils/axiosConfig';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { getCRUD } from '../../Store/actions';

import { api } from "../../config.json";



function AddNew() {


  const dispatch = useDispatch();
  const [code, setCode] = useState();
  const [name, setName] = useState();
  const [category, setCategory] = useState();
  const [budget, setBudget] = useState();
  const [status, setStatus] = useState();
  // const [parent, setParent] = useState();

  const submit = () => {
    const stuff = {
      code: code,
      name: name,
      category: category,
      budget: budget,
      status: status
    }
    console.log(stuff);
    axios.post(api + '/additem', stuff, axiosConfig);
  }

  return (
    <div style={{marginLeft: '18%'}}>
    <div style={{  display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'}}><h3>Add new item</h3></div>
    <div style={{  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'}}>
    <form>
    <label>Code</label><br/>
    <input onChange={event => setCode(event.target.value)} /><br/>
    <label>Name</label><br/>
    <input onChange={event => setName(event.target.value)} /><br/>
    <label>Category</label><br/>
    <input onChange={event => setCategory(event.target.value)} /><br/>
    <label>Budget</label><br/>
    <input onChange={event => setBudget(event.target.value)} /><br/>
    <label>Status</label><br/>
    <input onChange={event => setStatus(event.target.value)} /><br/>
    <label> </label><br/>
    <Link to={'/crud'}><input type="submit" onClick={() => {submit(); dispatch(getCRUD());
    }} /></Link>
    </form> 
    </div>

    </div>
  );
}

export default AddNew;
