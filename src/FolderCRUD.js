import logo from './logo.svg';
import React, {forwardRef, useState, useEffect} from 'react';
import './App.css';
import { useDispatch, useSelector } from "react-redux";
import Home from './Home';
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



function FolderCRUD() {
  const folders = useSelector((state) => (state.folder && state.folder.data) || []);

  const dispatch = useDispatch();
  const [page, setPage] = useState(1);

  // useEffect(() => {
  //   dispatch(getData());
  // }, []);

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
    await axios.post(api + '/folderupdate', {_id: _id}, axiosConfig)
    .then(res => dispatch({type:'FolderUpdate', payload: res.data}))
  }

  const deleteItem = async (_id) => {
    await axios.post(api + '/deletefolder', {_id: _id}, axiosConfig).then(dispatch(getData()));
    dispatch(getData());
  }

  return (
    <div style={{marginLeft: '18%'}}>

    <div style={{  display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'}}>
    <h3>CRUD List</h3>
    <div style={{position: 'fixed', right: 10}}>
    <Link to={'/folderadd'}><button style={{backgroundColor: 'white'}}>Add new folder</button></Link>
    {/* <button onClick={() => console.log(state)}>list test</button> */}
    </div>
    </div>
    <MaterialTable
      icons={tableIcons}
      title="Folder CRUD"
      data={folders}
      columns={[
        { title: 'ID', field: 'id' },
        { title: 'Name', field: 'name' },
      ]}
      parentChildData={(row, rows) => rows.find(a => a.id === row.parent)}
      actions={[
        {
          icon: Edit,
          tooltip: 'Edit item',
          onClick: (event, rowData) => {history.push("/folderedit"); fetchUpdate(rowData._id)}
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

export default FolderCRUD;
