import React, { useEffect, useState } from 'react';
import FolderNew from './Component/FolderNew';
import { useDispatch, useSelector } from "react-redux";
import { getData, getCRUD } from './Store/actions';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css"
import { Link } from 'react-router-dom';
import NavigationItem from './Component/NavigationItem';


import FolderNavigate from './Component/FolderNavigate';
import axiosConfig from './axiosConfig';
import { api } from "./config.json";


function HeaderBar() {
const state = useSelector((state) => state);
const user = useSelector((state) => state.account.username);
// const undoStack = useSelector((state) => (state.doState.undoStack));
// const redoStack = useSelector((state) => (state.doState.redoStack));
const folders = useSelector((state) => (state.folder && state.folder.data) || []);
const dispatch = useDispatch();
useEffect(() => {
  dispatch(getData());
  dispatch(getCRUD());
}, []);

const [search, setSearch] = useState();

const [username, setUsername] = useState();
const [password, setPassword] = useState();
const [showInfo, setShowInfo] = useState(false);



  return (
<div className='Header' style={{ height: '6%', backgroundColor: 'red', borderColor: '3px solid red'
}}>
<span>Hello, {user}</span>
</div>
  );
}

export default HeaderBar;