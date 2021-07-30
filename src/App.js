import logo from './logo.svg';
import React, {useEffect} from 'react';
// import './App.css';
import { useDispatch, useSelector } from "react-redux";
import Sidebar from './Sidebar';
import { Route, Switch, Redirect, BrowserRouter, useLocation } from 'react-router-dom';
import FolderPage from './FolderManager';
import CRUD from './CRUD';
import Login from './Login';
import AddNew from './AddNew';
import Edit from './Edit';
import FolderCRUD from './FolderCRUD';
import FolderEdit from './FolderEdit';
import FolderAdd from './FolderAdd';

function App() {
  useSelector((state) => state.account);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.account.user);

  const Routers = () => (
    <React.Fragment>
    <Switch>
      <Route exact path="/edit" component={Edit} />
      <Route exact path="/folder" component={FolderPage} />
      <Route exact path="/foldercrud" component={FolderCRUD} />
      <Route exact path="/folderadd" component={FolderAdd} />
      <Route exact path="/folderedit" component={FolderEdit} />
      <Route exact path="/crud" component={CRUD} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/add" component={AddNew} />
      <Route exact path="/" component={Default} />
      <Route path="*" component={NoMatch} />
    </Switch>
  </React.Fragment>
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
        {/* {!user ? <Login /> : <React.Fragment><span className='Sidebar'><Sidebar/></span><span className='App'><Routers/></span></React.Fragment>} */}
      <div style={{display: 'flex', flexDirection: 'row'}}><Sidebar /><Default /></div>
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

function Default() {
  return (
    <span  className='App' style={{display: 'inline-block'}}>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras tincidunt mollis libero, at condimentum ligula molestie ut. Nullam semper imperdiet urna, vitae viverra odio porttitor nec. Proin cursus, purus ut vehicula varius, felis dui ultricies libero, ut vulputate urna neque hendrerit metus. Pellentesque efficitur, tortor vitae tincidunt tincidunt, eros nisi rhoncus enim, vel ultricies nibh nisl a magna. Proin elementum ac ligula eget maximus. In tincidunt elementum nisl id sagittis. Nunc id vestibulum neque, quis ornare magna. Vestibulum ultricies lorem sed cursus tristique. Sed pellentesque congue turpis, quis congue eros. Proin congue lectus est, sed bibendum erat accumsan eu. Pellentesque fringilla vel arcu sed semper. Duis in tortor enim. Vestibulum bibendum nulla ex, non blandit lorem placerat in. Quisque vitae luctus diam. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Quisque facilisis eget tellus eu pellentesque. Praesent placerat leo sed tortor fringilla, eu bibendum mi mollis. Suspendisse vel feugiat tortor. Ut suscipit scelerisque lacus, in luctus nunc aliquam eget. Integer at posuere velit.</p>
    </span>
  );
}

export default App;
