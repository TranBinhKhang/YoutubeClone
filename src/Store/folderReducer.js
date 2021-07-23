
const folderReducer = (
    state = {data: []},
    action
) => {
    const middle = state.data
    switch (action.type) {
        case "FetchFolder":
            return {
                ...state,
                data: action.data
        }
        case "OpenFolder":  
            middle[action.payload].isOpened = !middle[action.payload].isOpened;
            return {
            ...state,
        }
        case "SetSelected":
            middle.map(folder => folder.isSelected = false );  
            middle[action.payload].isSelected = true;
            return {
            ...state,
        }
        case "ShowInput":
            middle[action.payload].showInput = !middle[action.payload].showInput;
            return {
            ...state,
        }
        case "ShowEdit":
            middle[action.payload].showEdit = !middle[action.payload].showEdit;
            return {
            ...state,
        }
        
        case "NewFolder":
            return {
                ...state,
                data: state.data.concat({  
                        "id": Math.floor(Math.random() * (99999999999999999 - 1000 + 1)) + 1000,
                         "name": action.payload.newName,
                         "isOpened": true,
                         "showInput": false,
                         "showEdit": false,
                         "parent": action.payload.parent,
                     })
        }
        case "NewFolderTop":
            return {
                ...state,
                data: state.data.concat({  
                        "id": Math.floor(Math.random() * (99999999999999999 - 1000 + 1)) + 1000,
                         "name": action.payload,
                         "isOpened": true,
                         "showInput": false,
                         "showEdit": false,
                         "parent": null,
                     })
        }
        case "EditName":
            middle[action.payload.index].name = action.payload.editName;
            return {
                ...state,
                data: state.data
        }
        case "DeleteFolder":
                middle.splice(action.payload, 1)
                return {
                    ...state,
                    data: state.data.filter(index => index !== action.payload) 
        }
        case "Undo":
            console.log(action.payload)
            let copyUndo = JSON.parse(JSON.stringify(action.payload)); // deep copy because shallow copy cause problem
            return {
                    ...state,
                    data: copyUndo
                }
        case "Redo":
            let copyRedo = JSON.parse(JSON.stringify(action.payload)); // deep copy because shallow copy cause problem
            return {
                    ...state,
                    data: copyRedo
                }
        default:
            return state
    }
}

export default folderReducer;