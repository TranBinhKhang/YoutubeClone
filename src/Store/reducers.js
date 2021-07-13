
import { combineReducers } from "redux";
import folderReducer from "./folderReducer"
import doReducer from "./doReducer"

const reducers = combineReducers({
    folder: folderReducer,
    doState: doReducer
})

export default reducers
