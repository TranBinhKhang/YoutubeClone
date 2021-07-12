
const folderReducer = (
    state = [],
    action
) => {
    const middle = state.data
    switch (action.type) {
        case "FetchFolder":
            return {
                ...state,
                data: action.data
            }
        case "FetchTest":
            return {
                ...state,
                test: action.data
            }
        // case "OpenFolder":
        //     const index = action.payload;
        //     let middle = state.data;
        //     middle[index].isOpened = !middle[index].isOpened
        //     return {
        //         ...state,
        //         data: middle
        //     }
        case "OpenFolder":  
            // let middle = state.data;
            middle[action.payload].isOpened = !middle[action.payload].isOpened;
            return {
            ...state,
        }
        case "ShowInput":
            // let middle2 = state.data;
            middle[action.payload].showInput = !middle[action.payload].showInput;
            return {
            ...state,
        }
        case "ShowEdit":
            // let middle2 = state.data;
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
        // case "Undo":
        //         return {
        //             ...state,
        //             data: action.payload
                    
        // }
        // case "Redo":
        //         return {
        //             ...state,
        //             data: action.payload
                    
        // }
        default:
            return state
    }
}

export default folderReducer;