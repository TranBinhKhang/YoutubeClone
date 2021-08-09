import React, {useEffect, useState} from 'react';
// import './App.css';
import { useDispatch, useSelector } from "react-redux";
import Sidebar from '../../Components/Sidebar';
import axiosConfig from '../../Utils/axiosConfig';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { getCRUD, getData } from '../../Store/actions';
import { api } from "../../config.json";
import { useHistory } from 'react-router';
import { useForm } from "react-hook-form";


function FolderEdit() {
  const history = useHistory();
  const state = useSelector((state) => state);
  const folders = useSelector((state) => (state.folder && state.folder.data) || []);

  const update = useSelector(state => state.list.folder);
  const [error, setError] = useState(null);

  const dispatch = useDispatch();
  const { register, formState: { errors }, handleSubmit } = useForm();
  const onSubmit = async (data) => {
    const stuff = {
      _id: update._id,
      id: data.id,
      name: data.name,
      parent: data.parent,
    }
    console.log(stuff)
    await axios.post(api + '/updatefolder', stuff, axiosConfig)
    .then(res => res.statusText === 'OK' ? history.push("/foldercrud") : console.log('notokay'))
    .catch(error => setError(error.response.data))
    dispatch(getData());
  }

  return (


// <div style={{height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>




// <div style={{  display: 'flex',
// backgroundColor: 'white',
// flexDirection: 'column',
// alignItems: 'center',
// width: '55vh',
// height: '75vh',
// marginTop: '-10vh',
// borderRadius: '2vh',
// paddingBottom: '25vh',
// justifyContent: 'center',
// border: '1px solid rgb(14, 77, 146)'
// }}>
// <div style={{  display: 'flex',
// alignItems: 'center',
// justifyContent: 'center', color: 'rgb(14, 77, 146)'}}><h3>New Folder Form</h3></div>
// <form>

// <label>ID</label><br/>
// <input 
//  style={{ borderColor: `rgb(14, 77, 146)`, borderTop: 'none', borderLeft: 'none', borderRight: 'none', borderBottomStyle: 'solid', borderBottomWidth: 1, cursor: 'auto', padding: 5, marginBottom: 20, outline: 'none' }}
//  value={update.id} onChange={event => dispatch({type:'UpdateId', payload: event.target.value})}/><br/>
// <label>Name</label><br/>
// <input 
// style={{ borderColor: `rgb(14, 77, 146)`, borderTop: 'none', borderLeft: 'none', borderRight: 'none', borderBottomStyle: 'solid', borderBottomWidth: 1  , padding: 5, marginBottom: 20, outline: 'none' }}
// value={update.name} onChange={event => dispatch({type:'UpdateName', payload: event.target.value})} /><br/>
// <label>Parent</label><br/>
// <Dropdown
// placeholder="Select an option"
// value={update.parent}
// options={[{ value: 0, label: 'None'},...folders.map(folder => ({ value: folder.id, label: folder.name }))]}
// onChange={(value) => dispatch({type:'UpdateParent', payload: value.value})}
// onSelect={(value) => console.log('selected!', value.value)}
// />
// <label> </label><br/>
// {/* <input type="submit" onClick={() => {submit(); dispatch(getData());
// }} /> */}
// <button className="btn btn-danger btn-block" style={{backgroundColor: 'rgb(14, 77, 146)', border: 'rgb(14, 77, 146)', outline: 'none'}} onClick={updateItem}>Submit</button> <span style={{color: 'red', fontWeight: 'bold'}}>{error && error}</span>

// </form> 

// </div>

// </div>

<div style={{height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>

<div style={formstyle}>
<div style={{  display: 'flex',
alignItems: 'center',
justifyContent: 'center', color: 'rgb(14, 77, 146)'}}><h3>New Folder Form</h3></div>
<form>

<label>ID</label><br/>
<input 
 style={errors.id?.type ? inputfielderror : inputfield}
 defaultValue={update.id}
 
 {...register("id", { value: update.id, required: true, pattern: /^[0-9]+$/})}
 /><br/>

<label>Name</label><br/>
<input 
defaultValue={update.name}
style={errors.name?.type ? inputfielderror : inputfield}
{...register("name", { value: update.name, required: true})}
/><br/>

<label>Parent</label><br/>
<select defaultValue={update.parent} {...register("parent", { required: true, pattern: /^[0-9]+$/})} style={{borderColor: `rgb(14, 77, 146)`}}>
    <option selected value={0}>None</option>
    {folders.map((folder, key) => <option key={key} value={folder.id}>{folder.name}</option> )}
</select>
<label> </label><br/><br/>
<button className="btn btn-danger btn-block" style={{backgroundColor: 'rgb(14, 77, 146)', border: 'rgb(14, 77, 146)', outline: 'none'}} onClick={handleSubmit(onSubmit)}>Submit</button> 
<span style={{color: 'red', fontWeight: 'bold'}}>{error && error}</span>
{errors.id?.type === 'required' && <p style={{color: 'red'}}>ID is required</p>}
    {errors.id?.type === 'pattern' && <p style={{color: 'red'}}>ID has to be a number</p>}
    {errors.name?.type === 'required' && <p style={{color: 'red'}}>Name is required</p>}

</form> 

</div>

</div>


);
}

const formstyle = {display: 'flex',
position: 'relative',
backgroundColor: 'white',
flexDirection: 'column',
alignItems: 'center',
width: '55vh',
height: '75vh',
marginTop: '-10vh',
borderRadius: '2vh',
paddingBottom: '25vh',
paddingTop: '5vh',
border: '1px solid rgb(14, 77, 146)'};

const inputfield = { borderColor: `rgb(14, 77, 146)`, borderTop: 'none', borderLeft: 'none', borderRight: 'none', borderBottomStyle: 'solid', borderBottomWidth: 1, cursor: 'auto', padding: 5, marginBottom: 20, outline: 'none' }
const inputfielderror = { borderColor: `red`, borderTop: 'none', borderLeft: 'none', borderRight: 'none', borderBottomStyle: 'solid', borderBottomWidth: 1, cursor: 'auto', padding: 5, marginBottom: 20, outline: 'none' }


export default FolderEdit;
