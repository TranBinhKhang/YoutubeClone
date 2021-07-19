
const accountReducer = (
    state = {username: undefined, password: undefined, user: undefined},
    action
) => {
    switch (action.type) {
        case "SetUsername":
            state.username = action.payload
            return {
                ...state,
                username: action.payload
        }
        case "SetPassword":
            state.password = action.payload
            return {
                ...state,
                password: action.payload
        }
        case "SetUser":
            state.user = action.user
            return {
                ...state,
                user: action.payload
        }
        case "LogOut":
            state.user = undefined
            return {
                ...state,
                user: undefined
        }
        default:
            return state
    }
}

export default accountReducer;