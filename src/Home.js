import React, { useState } from 'react';
import Folder from './Component/Folder';

function Home() {
  // Declare a new state variable, which we'll call "count"
  const [upperTopInput, setUpperTopOutput] = useState(false);
  const [folders, setFolders] = useState([
    {
        "name": "DuLieu",
        "isOpened": true,
        "showInput": false,
        "showEdit": false,
        "childFolders": [
            {
                "name": "NHAN SU",
                "isOpened": false,
                "showInput": false,
                "showEdit": false,
                "childFolders": [
                    {
                        "name": "BIEN CHE",
                        "showInput": false,
                        "isOpened": false,
                        "showEdit": false,
                    },
                    {
                        "name": "HOP DONG",
                        "showInput": false,
                        "isOpened": false,
                        "showEdit": false,
                    },
                ]
            },
            {
                "name": "TAI LIEU",
                "isOpened": false,
                "showInput": false,
                "showEdit": false,
                "childFolders": [
                    {
                        "name": "DTKH",
                        "showInput": false,
                        "showEdit": false,
                        "isOpened": false,
                    },
                    {
                        "name": "LUU TRU",
                        "showInput": false,
                        "isOpened": false,
                        "showEdit": false,
                    },
                ]
            },
            {
                "name": "VAN BANG",
                "isOpened": false,
                "showInput": false,
                "showEdit": false,
                "childFolders": [
                    {
                        "name": "BAN LUONG",
                        "showInput": false,
                        "showEdit": false,
                        "isOpened": false,
                    },
                    {
                        "name": "BAO CAO",
                        "showInput": false,
                        "isOpened": false,
                        "showEdit": false,
                    },
                    {
                        "name": "HT",
                        "showInput": false,
                        "isOpened": false,
                        "showEdit": false,
                    },
                ]
            },
        ]
    },
]);

const [undoState, setUndoState] = useState([]);
const [redoState, setRedoState] = useState([]);

const topOpen = (name) => {
        let Index = folders.findIndex(folder => folder.name === name);
        let middle = JSON.parse(JSON.stringify(folders));
        middle[Index].isOpened = !middle[Index].isOpened
        setFolders(middle);
}

const middleOpen = (level1name, level2name) => {
    let upperIndex = folders.findIndex(folder => folder.name === level1name);
    let index = folders[upperIndex].childFolders.findIndex(folder => folder.name === level2name);
    let middle = JSON.parse(JSON.stringify(folders));
    console.log(middle);
    middle[upperIndex].childFolders[index].isOpened = !middle[upperIndex].childFolders[index].isOpened
    setFolders(middle);
}

const upperAdd = () => {
undoState.push(folders);
console.log(undoState);
 let middle = JSON.parse(JSON.stringify(folders));
 middle.push({  
     "name": upperName,
     "isOpened": true,
     "showInput": false,
     "showEdit": false,
     "childFolders": []
 })
 setFolders(middle);
}




const topAdd = async (folderName) => {
    undoState.push(folders);
    let Index = folders.findIndex(folder => folder.name === folderName);
    let middle = JSON.parse(JSON.stringify(folders));
    middle[Index].childFolders.push({
        "name": topName,
        "isOpened": false,
        "childFolders": []
    })
    setFolders(middle);
}


const middleAdd = (level1name, level2name) => {
    undoState.push(folders)
    let upperIndex = folders.findIndex(folder => folder.name === level1name);
    let index = folders[upperIndex].childFolders.findIndex(folder => folder.name === level2name);
    let middle = JSON.parse(JSON.stringify(folders));
    middle[upperIndex].childFolders[index].childFolders.push({
        "name": middleName,
        "isOpened": false,
        "childFolders": []
    })
    setFolders(middle);
}

const topEdit = (folderName) => {
    undoState.push(folders);
    let Index = folders.findIndex(folder => folder.name === folderName);
    let middle = JSON.parse(JSON.stringify(folders));
    middle[Index].name = editName;
    setFolders(middle);
}


const middleEdit = (level1name, level2name) => {
    undoState.push(folders);
    let upperIndex = folders.findIndex(folder => folder.name === level1name);
    let index = folders[upperIndex].childFolders.findIndex(folder => folder.name === level2name);
    let middle = JSON.parse(JSON.stringify(folders));
    middle[upperIndex].childFolders[index].name = editName;
    setFolders(middle);
}

const bottomEdit = (level1name, level2name, level3name) => {
    undoState.push(folders);
    let upperIndex = folders.findIndex(folder => folder.name === level1name);
    let index = folders[upperIndex].childFolders.findIndex(folder => folder.name === level2name);
    let lowerIndex = folders[upperIndex].childFolders[index].childFolders.findIndex(folder => folder.name === level3name);
    let middle = JSON.parse(JSON.stringify(folders));
    // console.log(middle[upperIndex].childFolders[index].childFolders[lowerIndex]);
    middle[upperIndex].childFolders[index].childFolders[lowerIndex].name = editName;
    setFolders(middle);
}

const deleteTop = (name) => {
    undoState.push(folders)
    let index = folders.findIndex(folder => folder.name === name);
    let middle = JSON.parse(JSON.stringify(folders));
    middle.splice(index, 1);
    setFolders(middle);
}

const deleteMiddle = (level1name, level2name) => {
    undoState.push(folders)
    let upperIndex = folders.findIndex(folder => folder.name === level1name);
    let index = folders[upperIndex].childFolders.findIndex(folder => folder.name === level2name);
    let middle = JSON.parse(JSON.stringify(folders));
    middle[upperIndex].childFolders.splice(index, 1);
    setFolders(middle);
}

const deleteBottom = (level1name, level2name, level3name) => {
    undoState.push(folders)
    let upperIndex = folders.findIndex(folder => folder.name === level1name);
    let index = folders[upperIndex].childFolders.findIndex(folder => folder.name === level2name);
    let lowerIndex = folders[upperIndex].childFolders[index].childFolders.findIndex(folder => folder.name === level3name);
    let middle = JSON.parse(JSON.stringify(folders));
    // console.log(middle[upperIndex].childFolders[index].childFolders[lowerIndex]);
    middle[upperIndex].childFolders[index].childFolders.splice(lowerIndex, 1);
    setFolders(middle);
}

const showTopInput = (name) => {
    
    let Index = folders.findIndex(folder => folder.name === name);
    let middle = JSON.parse(JSON.stringify(folders));
    middle[Index].showInput = !middle[Index].showInput;
    setFolders(middle);
}

const showMiddleInput = (level1name, level2name) => {
    let upperIndex = folders.findIndex(folder => folder.name === level1name);
    let index = folders[upperIndex].childFolders.findIndex(folder => folder.name === level2name);
    let middle = JSON.parse(JSON.stringify(folders));
    console.log(middle);
    middle[upperIndex].childFolders[index].showInput = !middle[upperIndex].childFolders[index].showInput;
    setFolders(middle);
}

const showTopEdit = (name) => {
    let Index = folders.findIndex(folder => folder.name === name);
    let middle = JSON.parse(JSON.stringify(folders));
    middle[Index].showEdit = !middle[Index].showEdit;
    setFolders(middle);
}

const showMiddleEdit = (level1name, level2name) => {
    let upperIndex = folders.findIndex(folder => folder.name === level1name);
    let index = folders[upperIndex].childFolders.findIndex(folder => folder.name === level2name);
    let middle = JSON.parse(JSON.stringify(folders));
    console.log(middle);
    middle[upperIndex].childFolders[index].showEdit = !middle[upperIndex].childFolders[index].showEdit;
    setFolders(middle);
}

const showBottomEdit = (level1name, level2name, level3name) => {
    let upperIndex = folders.findIndex(folder => folder.name === level1name);
    let index = folders[upperIndex].childFolders.findIndex(folder => folder.name === level2name);
    let lowerIndex = folders[upperIndex].childFolders[index].childFolders.findIndex(folder => folder.name === level3name);
    let middle = JSON.parse(JSON.stringify(folders));
    // console.log(middle[upperIndex].childFolders[index].childFolders[lowerIndex]);
    middle[upperIndex].childFolders[index].childFolders[lowerIndex].showEdit = !middle[upperIndex].childFolders[index].childFolders[lowerIndex].showEdit;
    setFolders(middle);
}

const undo = () => {
    if (undoState.length !== 0) {
    redoState.push(folders);
    setFolders(undoState.pop());
    console.log(undoState);
    }
    else return;
}

const redo = () => {
    if (redoState.length !== 0) {
    undoState.push(folders);
    setFolders(redoState.pop());
    console.log(redoState);
    }
    else return;
}


const [upperName, setUpperName] = useState();
const [topName, setTopName] = useState();
const [middleName, setMiddleName] = useState();

const [editName, setEditName] = useState();

const [search, setSearch] = useState();

  return (
    <div >
    <button onClick={() => setUpperTopOutput(!upperTopInput)}>New Folder</button><span>   {upperTopInput && <div style={{float: 'inline-start'}}><input onChange={event => setUpperName(event.target.value)} /> <button onClick={upperAdd}>Add new folder</button></div>}</span>

    <button onClick={undo}>Undo</button>
    <button onClick={redo}>Redo</button>

    {/* <button onClick={() => console.log(folders[0].childFolders.map(child => child.childFolders).concat.apply([], folders[0].childFolders.map(child => child.childFolders)).map( grandchild => grandchild.name).includes('BIEN CHE'))} /> */}

    <span>      Search bar: </span><input onChange={event => setSearch(event.target.value)} />

      {!search && folders.map((folder, key) => (
          <React.Fragment key={key}>
          <Folder name={folder.name} isOpened={folder.isOpened} open={() => topOpen(folder.name)} remove={() => deleteTop(folder.name)} add={() => showTopInput(folder.name)} edit={() => {setEditName(folder.name); showTopEdit(folder.name)}}/>
          {folder.showInput && <div style={{float: 'inline-start', marginLeft: 30}}><input onChange={event => setTopName(event.target.value)} /> <button onClick={() => {topAdd(folder.name)}}>Add new folder</button></div>}
          {folder.showEdit && <div style={{float: 'inline-start', marginLeft: 30}}><input onChange={event => setEditName(event.target.value)} /> <button onClick={() => topEdit(folder.name)}>Edit name</button></div>}
          {
             folder.isOpened && folder.childFolders !== [] ? folder.childFolders.map((childFolder, key) => ( 
             <React.Fragment key={key}>
             <div style={{marginLeft: 30}}><Folder name={childFolder.name} isOpened={childFolder.isOpened} remove={() => deleteMiddle(folder.name, childFolder.name)} open={() => middleOpen(folder.name, childFolder.name)} edit={() => {setEditName(childFolder.name);showMiddleEdit(folder.name, childFolder.name)}} add={() => showMiddleInput(folder.name, childFolder.name)}/></div> 
             {childFolder.showInput && <div style={{float: 'inline-start'}}><input onChange={event => setMiddleName(event.target.value)} /> <button onClick={() => middleAdd(folder.name, childFolder.name)}>Add new folder</button></div>}
             {childFolder.showEdit && <div style={{float: 'inline-start', marginLeft: 30}}><input onChange={event => setEditName(event.target.value)} /> <button onClick={() => middleEdit(folder.name, childFolder.name)}>Edit name</button></div>}
             {childFolder.isOpened && childFolder.childFolders !== [] ? childFolder.childFolders.map((grandChildFolder, key) => (
                 <React.Fragment key={key}>
                    <div style={{marginLeft: 60}}><Folder name={grandChildFolder.name} isOpened={grandChildFolder.isOpened} remove={() => deleteBottom(folder.name, childFolder.name, grandChildFolder.name)} edit={() => {setEditName(grandChildFolder.name); showBottomEdit(folder.name, childFolder.name, grandChildFolder.name)}}/></div>
                    {grandChildFolder.showInput && <div style={{float: 'inline-start', marginLeft: 60}}><input onChange={event => setMiddleName(event.target.value)} /> <button onClick={() => middleAdd(folder.name, childFolder.name)}>Add new folder</button></div>}
                    {grandChildFolder.showEdit && <div style={{float: 'inline-start', marginLeft: 60}}><input onChange={event => setEditName(event.target.value)} /> <button onClick={() => bottomEdit(folder.name, childFolder.name, grandChildFolder.name)}>Edit name</button></div>}
             
                 </React.Fragment>

             )) : console.log() }
             
             </React.Fragment>
             

             )) : console.log()
          }
          </React.Fragment>
      )
      )}

        {/* This is filtered version of the folders */}
        {/* Filter checks to see is the name in any of the arrays matched the search parameter */}
      {search && folders.filter(result => (result.name == search || result.childFolders.map(child => child.name).includes(search) || folders[0].childFolders.map(child => child.childFolders).concat.apply([], folders[0].childFolders.map(child => child.childFolders)).map( grandchild => grandchild.name).includes(search) )).map((folder, key) => (
          <React.Fragment key={key}>
          <Folder name={folder.name} isOpened={folder.isOpened} open={() => topOpen(folder.name)} remove={() => deleteTop(folder.name)} add={() => showTopInput(folder.name)} edit={() => {setEditName(folder.name); showTopEdit(folder.name)}}/>
          {folder.showInput && <div style={{float: 'inline-start', marginLeft: 30}}><input onChange={event => setTopName(event.target.value)} /> <button onClick={() => {topAdd(folder.name)}}>Add new folder</button></div>}
          {folder.showEdit && <div style={{float: 'inline-start', marginLeft: 30}}><input onChange={event => setEditName(event.target.value)} /> <button onClick={() => topEdit(folder.name)}>Edit name</button></div>}
          {
             folder.isOpened && folder.childFolders !== [] ? folder.childFolders.map((childFolder, key) => ( 
             <React.Fragment key={key}>
             <div style={{marginLeft: 30}}><Folder name={childFolder.name} isOpened={childFolder.isOpened} remove={() => deleteMiddle(folder.name, childFolder.name)} open={() => middleOpen(folder.name, childFolder.name)} edit={() => {setEditName(childFolder.name);showMiddleEdit(folder.name, childFolder.name)}} add={() => showMiddleInput(folder.name, childFolder.name)}/></div> 
             {childFolder.showInput && <div style={{float: 'inline-start'}}><input onChange={event => setMiddleName(event.target.value)} /> <button onClick={() => middleAdd(folder.name, childFolder.name)}>Add new folder</button></div>}
             {childFolder.showEdit && <div style={{float: 'inline-start', marginLeft: 30}}><input onChange={event => setEditName(event.target.value)} /> <button onClick={() => middleEdit(folder.name, childFolder.name)}>Edit name</button></div>}
             {childFolder.isOpened && childFolder.childFolders !== [] ? childFolder.childFolders.map((grandChildFolder, key) => (
                 <React.Fragment key={key}>
                    <div style={{marginLeft: 60}}><Folder name={grandChildFolder.name} isOpened={grandChildFolder.isOpened} remove={() => deleteBottom(folder.name, childFolder.name, grandChildFolder.name)} edit={() => {setEditName(grandChildFolder.name); showBottomEdit(folder.name, childFolder.name, grandChildFolder.name)}}/></div>
                    {grandChildFolder.showInput && <div style={{float: 'inline-start', marginLeft: 60}}><input onChange={event => setMiddleName(event.target.value)} /> <button onClick={() => middleAdd(folder.name, childFolder.name)}>Add new folder</button></div>}
                    {grandChildFolder.showEdit && <div style={{float: 'inline-start', marginLeft: 60}}><input onChange={event => setEditName(event.target.value)} /> <button onClick={() => bottomEdit(folder.name, childFolder.name, grandChildFolder.name)}>Edit name</button></div>}
             
                 </React.Fragment>

             )) : console.log() }
             
             </React.Fragment>
             

             )) : console.log()
          }
          </React.Fragment>
      )
      )}
    </div>
  );
}

export default Home;