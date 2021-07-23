
import { combineReducers } from "redux";
import folderReducer from "./folderReducer"
import doReducer from "./doReducer"
import accountReducer from "./accountReducer";
import listReducer from "./listReducer";

const reducers = combineReducers({
    folder: folderReducer,
    doState: doReducer,
    account: accountReducer,
    list: listReducer
})

export default reducers
