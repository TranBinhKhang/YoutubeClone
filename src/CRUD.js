import logo from './logo.svg';
import React, {forwardRef, useState, useEffect} from 'react';
// import './App.css';
import { useDispatch, useSelector } from "react-redux";
import Sidebar from './Sidebar';
import Login from './Login';
import { Link, useHistory } from 'react-router-dom';
import MaterialTable from 'material-table';
import { getData, getCRUD } from './Store/actions';
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import { ArrowUpward, Refresh } from '@material-ui/icons';
import axios from 'axios';
import axiosConfig from './axiosConfig';
// import { save } from '@material-ui/icons';

import { api } from "./config.json";



function CRUD() {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(getCRUD());
  }, []);

  const history = useHistory();

  const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowUpward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
    };
  
  const state = useSelector((state) => state);
  const list = useSelector((state) => (state.list.list));

  const fetchUpdate = async (_id) => {
    await axios.post(api + '/fetchupdate', {_id: _id}, axiosConfig)
    .then(res => dispatch({type:'FetchUpdate', payload: res.data}))
  }

  const deleteItem = async (_id) => {
    await axios.post(api + '/deleteitem', {_id: _id}, axiosConfig);
    dispatch(getCRUD());
  }

  return (
    <div>

    <div style={{  display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'}}>
    <h3>CRUD List</h3>
    <div style={{position: 'fixed', right: 10}}>
    <Link to={'/add'}><button style={{backgroundColor: 'white'}}>Add new item</button></Link>
    {/* <button onClick={() => console.log(state)}>list test</button> */}
    </div>
    </div>
    <MaterialTable
      icons={tableIcons}
      page={page}
      onNextPageClick={() => setPage(page + 1)}
      onPreviousPageClick={() => page != 1 ? setPage(page - 1) : console.log()} 
      title="List of CRUD items"
      columns={[
        { title: 'Code', field: 'code' },
        { title: 'Name', field: 'name' },
        { title: 'Category', field: 'category' },
        { title: 'Budget', field: 'budget' },
        { title: 'Status', field: 'status' },

      ]}
      data={list}
      actions={[
        {
          icon: Edit,
          tooltip: 'Edit item',
          onClick: (event, rowData) => {history.push("/edit"); fetchUpdate(rowData._id)}
        },
        rowData => ({
          icon: DeleteOutline, 
          tooltip: 'Delete item',
          onClick: (event, rowData) => deleteItem(rowData._id),
        })
      ]}
      options={{
        actionsColumnIndex: -1
      }}
    />
    </div>
  );
}

export default CRUD;
