import axios from "axios"
import axiosConfig from "../axiosConfig"

const listReducer = (
    state = {list: undefined, update: {}},
    action
) => {
    const update = state.update;
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