import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import '../List.css';
import { AiFillClockCircle, AiFillPlaySquare, AiFillHome, AiFillSetting } from "react-icons/ai";




function NavigationItem({id, font}) {
useSelector((state) => state.folder);
// const items = useSelector((state) => (state.folder && state.folder.data) || []);
const items = useSelector((state) => state.item.item);
const dispatch = useDispatch();


const index = items.findIndex(folder => folder.id === id);

const open = () => {
  dispatch({type:'OpenItem', payload: index});
}


const selectedFont = {fontWeight: 'bold', color: 'white', background: 'none', border: 'none' }
const normalFont = {fontWeight: 'normal', color: 'white', background: 'none', border: 'none' }

const returnIcon = (item) => {
  switch (item) {
    case "Subscribe":  
        return <AiFillPlaySquare/>
    case "Home":
        return <AiFillHome/>
    case "Later":
        return <AiFillClockCircle/>
    case "Settings":
        return <AiFillSetting/>
    default:
        return null
}
}


  return (
    <React.Fragment>
    <div style={{flex: 1}}>
    <p style={{left: 40}}><Link to={items[index].link}><button className='nav-' style={ items[index].isSelected ? selectedFont : normalFont} onClick={() => {open(); dispatch({type:'SelectItem', payload: index})}} >{returnIcon(items[index].icon)}  {items[index].name}</button></Link></p>
    </div>
    {items[index].isOpened && items.filter(child => child.parent == id).map((child, key) => <ul key={key}><li><NavigationItem id={child.id} /></li></ul>) }
    </React.Fragment>
  );
}

export default NavigationItem;