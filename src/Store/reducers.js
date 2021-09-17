
import { combineReducers } from "redux";
import accountReducer from "./accountReducer";
import navItemReducer from "./navItemReducer";
import videoReducer from "./videoReducer";
import commentReducer from "./commentReducer";

const reducers = combineReducers({
    account: accountReducer,
    item: navItemReducer,
    video: videoReducer,
    comment: commentReducer
})

export default reducers
