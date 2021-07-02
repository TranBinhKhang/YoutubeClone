import React, { useState } from 'react';

function Folder({name, isOpened, open, add, edit, remove}) {
  // Declare a new state variable, which we'll call "count"
  return (
    <div style={{flex: 1}}>
    <p style={{left: 40}}><span><button onClick={open}>{isOpened ? '▲' : '▼' }</button></span>📁{name}  <span><button onClick={add}>+</button> <button onClick={edit}>✏</button> <button onClick={remove}>🗑</button></span></p>
    </div>
  );
}

export default Folder;