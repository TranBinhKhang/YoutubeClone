import { useState } from 'react';
import { Link, NavLink, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";

import { BsSearch } from "react-icons/bs";
import "bootstrap/dist/css/bootstrap.min.css"
import { AiFillYoutube } from "react-icons/ai";


function NavBar(props) {
    const dispatch = useDispatch();

    const user = useSelector((state) => state.account.user);
    const [searchparam, setSearch] = useState();
    const history = useHistory();

    const loggedin = (
    <div className='nav-item dropdown'>
    <button className="btn btn-outline-light my-2 my-sm-0" onClick={() => {localStorage.removeItem('token'); dispatch({type:'LogOut'})}}>Logout</button>
    </div>
    );

    const guess = (
        <div className='nav-item dropdown'>
        <button className="btn btn-outline-light my-2 my-sm-0" onClick={() => history.push('/login')}>Login</button>
        </div>
    )
    return (
        <nav className="navbar navbar-expand-lg navbar-light" style={{backgroundColor: '#181818', color: 'white', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', position: 'sticky', top: 0,   overflowX: 'hidden', zIndex: 1000}}>
            <Link className="navbar-brand" to="/" style={{color: 'white'}}>
                <div style={{    
                    display: 'flex',
                    alignItems: 'center',
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    justifyContent: 'center', textAlign: 'center'}}>
                        <AiFillYoutube size='25'/>
                         MyTube
                </div>
            </Link>
            <div style={{    
                    display: 'flex',
                    alignItems: 'center',
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    justifyContent: 'center', textAlign: 'center'}}>
            <input style={{marginInline: 5, padding: 5, width: '50vh', borderRadius: 5, borderColor: 'teal'}} onChange={(event) => setSearch(event.target.value)} placeholder={'Search'}/>
            <button style={{verticalAlign: 'bottom', textAlign: 'center', verticalAlign: 'middle'}} className="btn btn-outline-light my-2 my-sm-0" onClick={() => history.push(`/search/${searchparam}`)}><BsSearch style={{verticalAlign: 'middle'}}/></button></div>

            {user ? loggedin : guess}
        </nav >
    );
}

export default NavBar;