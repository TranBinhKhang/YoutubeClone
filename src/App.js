import logo from './logo.svg';
import React, {useEffect} from 'react';
import { useDispatch, useSelector } from "react-redux";
import Sidebar from './Components/Sidebar';
import { Route, Switch, Redirect, BrowserRouter, useLocation } from 'react-router-dom';
import Default from './Pages/Default/Default';
import Login from './Pages/Login/Login';
import NavBar from './Components/Navbar';
import axios from 'axios';
import axiosConfig from './Utils/axiosConfig';
import { api } from "./config.json";
import VideoScreen from './Pages/VideoScreen/VideoScreen';
import { getVideo } from './Store/actions';
import SearchScreen from './Pages/Search/SearchScreen';
import WatchLater from './Pages/WatchLater/WatchLater';
import './App.css';

function App() {
  useSelector((state) => state.account);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.account.user);

  const RoutersGuest = () => (
    <React.Fragment>
    <Switch>
      {/* <Route exact path="/edit" component={Edit} />
      <Route exact path="/folder" component={FolderPage} />
      <Route exact path="/foldercrud" component={FolderCRUD} />
      <Route exact path="/folderadd" component={FolderAdd} />
      <Route exact path="/folderedit" component={FolderEdit} />
      <Route exact path="/add" component={AddNew} />
      <Route exact path="/crud" component={CRUD} /> */}
      <Route exact path="/search/:searchparam" component={SearchScreen} />
      <Route exact path="/video/:id" component={VideoScreen} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/" component={Default} />
      <Route path="*" component={NoMatch} />
    </Switch>
  </React.Fragment>
  )

  const RoutersUser = () => (
    <React.Fragment>
    <Switch>
      {/* <Route exact path="/edit" component={Edit} />
      <Route exact path="/folder" component={FolderPage} />
      <Route exact path="/foldercrud" component={FolderCRUD} />
      <Route exact path="/folderadd" component={FolderAdd} />
      <Route exact path="/folderedit" component={FolderEdit} />
      <Route exact path="/crud" component={CRUD} /> */}
      <Route exact path="/watchlater" component={WatchLater} />
      <Route exact path="/search/:searchparam" component={SearchScreen} />
      <Route exact path="/video/:id" component={VideoScreen} />
      {/* <Route exact path="/add" component={AddNew} /> */}
      <Route exact path="/" component={Default} />
      <Route path="*" component={NoMatch} />
    </Switch>
  </React.Fragment>
  )


  const fetchUser = async () => await axios.post(api + '/info', {"nothing": "nothing"}, axiosConfig).then( res => dispatch({type:'SetUsername', payload: res.data.username}))

  const automaticLogin = () => {
    const token = localStorage.getItem('token');
    if (!token) return;
    dispatch({type:'SetUser', payload: token});
  };

  useEffect(() => {
    automaticLogin();
    fetchUser();
    dispatch(getVideo());
  }, [])
  
  return (
    <React.Fragment>
      <BrowserRouter>
        {/* {!user ? <Login /> : <React.Fragment><span className='Sidebar'><Sidebar/></span><span className='App'><Routers/></span></React.Fragment>} */}
        {/* {!user ? <Login /> :  <div className='All-Container'><NavBar/><div className='Flex-Container'><div><Sidebar /></div><div className='Flex-Child'><Routers /></div></div></div>} */}
        {!user ? <div className='All-Container'><NavBar/><div className='Flex-Container'><div><Sidebar /></div><div className='Flex-Child'><RoutersGuest /></div></div></div> :  <div className='All-Container'><NavBar/><div className='Flex-Container'><div><Sidebar /></div><div className='Flex-Child'><RoutersUser /></div></div></div>}

      </BrowserRouter>
    </React.Fragment>
  );
}

function NoMatch() {
  let location = useLocation();

  return (
    <span  className='App'>
      <h3>
        Welcome to <code>{location.pathname}</code>
      </h3>
    </span>
  );
}



export default App;
