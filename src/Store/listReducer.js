import axios from "axios"
import axiosConfig from "../axiosConfig"

const listReducer = (
    state = {list: undefined, update: {}, folder: {}},
    action
) => {
    const update = state.update;
    const folderUpdate = state.folder;
    switch (action.type) {
        case "FetchCRUD":
            return {
                ...state,
                list: action.data
        }
        case "FetchUpdate":
            return {
                ...state,
                update: action.payload
        }
        case "FolderUpdate":
            return {
                ...state,
                folder: action.payload
        }
        case "UpdateId":
            folderUpdate.id = action.payload;
            return {
                ...state,
                folder: state.folder
        }
        case "UpdateName":
            folderUpdate.name = action.payload;
            return {
                ...state,
                update: state.folder
        }
        case "UpdateParent":
            folderUpdate.parent = action.payload;
            return {
                ...state,
                update: state.folder
        }
        case "EditCode":
            update.code = action.payload;
            return {
                ...state,
                update: state.update
        }
        case "EditListName":
            update.name = action.payload;
            return {
                ...state,
                update: state.update
        }
        case "EditCode":
            update.code = action.payload;
            return {
                ...state,
                update: state.update
        }
        case "EditCategory":
            update.category = action.payload;
            return {
                ...state,
                update: state.update
        }
        case "EditBudget":
            update.budget = action.payload;
            return {
                ...state,
                update: state.update
        }
        case "EditStatus":
            update.status = action.payload;
            return {
                ...state,
                update: state.update
        }
        default:
            return state
    }
}

export default listReducer;