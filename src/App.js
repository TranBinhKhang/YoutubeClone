import logo from './logo.svg';
import React, {useEffect} from 'react';
import './App.css';
import { useDispatch, useSelector } from "react-redux";
import Home from './Home';
import { Route, Switch, Redirect, BrowserRouter, useLocation } from 'react-router-dom';
import FolderPage from './FolderManager';
import CRUD from './CRUD';
import Login from './Login';
import AddNew from './AddNew';
import Edit from './Edit';


function App() {
  useSelector((state) => state.account);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.account.user);

  const Routers = () => (
    <div>
    <Switch>
      <Route exact path="/edit" component={Edit} />
      <Route exact path="/folder" component={FolderPage} />
      <Route exact path="/crud" component={CRUD} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/add" component={AddNew} />
      <Route exact path="/" component={Default} />
      <Route path="*" component={NoMatch} />
    </Switch>
  </div>
  )


  const automaticLogin = () => {
    const token = localStorage.getItem('token');
    if (!token) return;
    dispatch({type:'SetUser', payload: token});
  };

  useEffect(() => {
    automaticLogin();
  }, [])
  
  return (
    <React.Fragment>
      <BrowserRouter>
        {!user ? <Login /> : <div><Home/><Routers/></div>}
      </BrowserRouter>
    </React.Fragment>
  );
}

function NoMatch() {
  let location = useLocation();

  return (
    <div style={{marginLeft: '18%'}}>
      <h3>
        Welcome to <code>{location.pathname}</code>
      </h3>
    </div>
  );
}

function Default() {
  return (
    <div style={{marginLeft: '18%'}}>
      <h3>
        Welcome to Management app
      </h3>
    </div>
  );
}

export default App;
