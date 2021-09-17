import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getData } from '../Store/actions';
import "bootstrap/dist/css/bootstrap.min.css"
import NavigationItem from './NavigationItem';




function Sidebar() {
const state = useSelector((state) => state);
const items = useSelector(state => state.item.item);
const username = useSelector(state => state.account.username)
// const undoStack = useSelector((state) => (state.doState.undoStack));
// const redoStack = useSelector((state) => (state.doState.redoStack));
const folders = useSelector((state) => (state.folder && state.folder.data) || []);
const dispatch = useDispatch();
useEffect(() => {
  dispatch(getData());
}, []);

const placeholder = 'https://www.pngfind.com/pngs/m/610-6104451_image-placeholder-png-user-profile-placeholder-image-png.png';
const pictureStyle = {
  width: 30,
  height: 30,
  borderRadius: 30/2,
  overflow: "hidden",
  borderWidth: 3,
  borderColor: "red"}
const [search, setSearch] = useState();

// const [username, setUsername] = useState();
// const [password, setPassword] = useState();
// const [showInfo, setShowInfo] = useState(false);

const [anchorEl, setAnchorEl] = useState(null);


  return (
    <div className='Sidebar' style={{ flex: 1, width: 128, display: 'flex', flexDirection: 'column'
}}>
    
{/* 
    <div style={{
    backgroundColor: 'black',
    height: '7vh',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center'
    }}>
    <div style={{fontWeight: 'bold', flex: 1, color: 'white', fontSize: '20px', textAlign: 'center'}}><AiFillFolderOpen style={{verticalAlign: 'middle'}}/>   Folder App</div>
    </div>   */}
    <div>
    <div style={{marginBottom: 10}}>
    {/* <input style={{marginInline: 5, borderRadius: 5, borderColor: 'teal'}} placeholder={'Search...'} onChange={event => setSearch(event.target.value)} /> */}
    </div>
    {!search && items && items.filter(item => !item.parent).map((item, key) => (
          <React.Fragment key={key}>
          <NavigationItem id={item.id} />
          </React.Fragment>
      )
    )}

    {search && items && items.filter(item => item.name === search).map((item, key) => (
            <React.Fragment key={key}>
            <NavigationItem id={item.id} />
            </React.Fragment>
        )
    )}    
    </div>

    {/* <div style={{marginTop: 'auto'}}>
    <div className='Footer' style={{
    backgroundColor: 'black',
    height: '7vh',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap', 
    justifyContent: 'space-between',
    }} >
      <img src={placeholder} style={pictureStyle}/>
      <div style={{marginLeft: '-10vh'}}>{username}</div>
      <button style={{background: 'none', border: 'none', color: 'white'}} onClick={() => setAnchorEl(true)}><BsThreeDotsVertical/></button>
      <Menu
        id="simple-menu"
        style={{marginTop: '30vh', marginLeft: '10vh'}}
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
      >
        <MenuItem onClick={() => setAnchorEl(null)}>Profile</MenuItem>
        <MenuItem onClick={() => setAnchorEl(null)}>My account</MenuItem>
        <MenuItem onClick={() => {localStorage.removeItem('token'); dispatch({type:'LogOut'})}}>Logout</MenuItem>
      </Menu>
    </div>

    </div> */}
    </div>
  );
}

export default Sidebar;