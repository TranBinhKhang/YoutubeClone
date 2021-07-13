
const doReducer = (
    state = {undoStack: [], redoStack: []},
    action
) => {
    const undo = state.undoStack;
    const redo = state.redoStack;
    switch (action.type) {
        case "UndoPush":
            undo.push(action.payload);
            return {
                ...state,
                // stack: state.stack.concat(action.payload)
        }
        case "RedoPush":
            redo.push(action.payload);
                return {
                    ...state,
                    // stack: state.stack.concat(action.payload)
        }
        // case "DoTest": 
        //     console.log('reached', action.payload);
        //     undo.push(testData);
        //     console.log(undo)
        //     return {
        //         ...state,
        //         // stack: state.stack.push(testData)
        //     }
        default:
            return state
    }
}

export default doReducer;