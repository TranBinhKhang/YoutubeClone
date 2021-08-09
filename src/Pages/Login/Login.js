import React, { Component } from 'react';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css"
import { useDispatch, useSelector } from "react-redux";

import { api } from "../../config.json";



function Login() {

    useSelector((state) => state.account);
    const username = useSelector((state) => state.account.username);
    const password = useSelector((state) => state.account.password);
    const user = useSelector((state) => state.account.user);
    const dispatch = useDispatch();

    const login = (event) => {
        event.preventDefault();
        const credential = {
            username: username,
            password: password
        }
        axios.post(api + '/login', credential).then(response => {dispatch({type:'SetUser', payload: response.data}); localStorage.setItem('token', response.data)})
        console.log(credential);
    }

    // console.log(state);
    return (
        <div style={{ display: 'flex', flex: 1, justifyContent: 'center', width: '100%', height: '80vh'}}>
        <div style={{ alignSelf: 'center', justifyContent: 'center', alignItems: 'center', width: '30%' }}>
            <h2 style={{fontWeight: 'bold' }}>Sign In</h2>
            <div className="form-div">
                        <form onSubmit={login}>
                            <input
                                style={{ borderColor: `blue`, borderTop: 'none', borderLeft: 'none', borderRight: 'none', borderBottomStyle: 'solid', borderBottomWidth: 1, cursor: 'auto', padding: 5, marginBottom: 20 }}
                                type="text"
                                placeholder='Username'
                                onChange={ e => dispatch({type:'SetUsername', payload: e.target.value})}
                                className="form-control form-group" />
                            <input type="password"
                                style={{ borderColor: `blue`, borderTop: 'none', borderLeft: 'none', borderRight: 'none', borderBottomStyle: 'solid', borderBottomWidth: 1, cursor: 'auto', padding: 5, marginBottom: 20 }}
                                placeholder='Password'
                                onChange={e => dispatch({type:'SetPassword', payload: e.target.value})}
                                className="form-control form-group" />
                            <div style={{ width: '100%', padding: 5, textAlign: 'right' }}>
                                <input style={{ backgroundColor: '#0066CC', width: 100 }} type="submit" className="btn btn-danger btn-block" value='Sign In' />
                            </div>
                        </form>
                    </div>
        </div>
        </div>
        )
}

export default Login;