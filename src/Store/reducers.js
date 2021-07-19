
import { combineReducers } from "redux";
import folderReducer from "./folderReducer"
import doReducer from "./doReducer"
import accountReducer from "./accountReducer";

const reducers = combineReducers({
    folder: folderReducer,
    doState: doReducer,
    account: accountReducer
})

export default reducers
