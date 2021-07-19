import logo from './logo.svg';
import React, {useEffect} from 'react';
import './App.css';
import { useDispatch, useSelector } from "react-redux";
import Home from './Home';
import Login from './Login';



function App() {
  useSelector((state) => state.account);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.account.user);
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
    { !user ? <Login /> : <Home />}
    </React.Fragment>
  );
}

export default App;
