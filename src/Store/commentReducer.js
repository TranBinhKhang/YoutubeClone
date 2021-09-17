import axios from "axios"
import axiosConfig from "../Utils/axiosConfig"

const commentReducer = (
    state = {comment: []},
    action
) => {
    const middle = state.comment

    switch (action.type) {
        case "GetComment":
            return {
                ...state,
                comment: action.payload
        }
        case "ShowChild":  
        middle[action.payload].showChild = !middle[action.payload].showChild;
        return {
        ...state,
        }
        case "ShowCommentReply":  
        middle[action.payload].showReply = !middle[action.payload].showReply;
        return {
        ...state,
        }
        default:
            return state
    }
}

export default commentReducer;