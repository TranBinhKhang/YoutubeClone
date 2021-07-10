
const folderReducer = (
    state = [],
    action
) => {
    switch (action.type) {
        case "FetchFolder":
            return {
                ...state,
                data: action.data
            }
        case "OpenFolder":
            const index = action.payload;
            let middle = state.data;
            middle[index].isOpened = !middle[index].isOpened
            return {
                ...state,
                data: middle
            }
        
        case "NewFolder":
            const newFolder = {
                "id": Math.floor(Math.random() * (99999999999999999 - 1000 + 1)) + 1000,
                "name": action.payload.newName,
                "isOpened": true,
                "showInput": false,
                "showEdit": false,
                "parent": action.payload.parent,
            }
            return {
                ...state,
                newFolder
            }
        default:
            return state
    }
}

export default folderReducer;