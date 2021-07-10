
import { combineReducers } from "redux";
import folderReducer from "./folderReducer"

const reducers = combineReducers({
    folder: folderReducer
})

export default reducers
