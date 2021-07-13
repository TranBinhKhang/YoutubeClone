import axios from 'axios';


export function getData() {
  return dispatch => {
    axios.get("https://api.jsonbin.io/b/60e69ab7fe016b59dd5f2435")
    .then(res =>
      dispatch({
        type: "FetchFolder",
        data: res.data
      })
    );
  };
}

export const openFolder = (index) => {
  return (dispatch) => {
      dispatch({
          type: "OpenFolder",
          payload: index
      });
  }
}

export const showInput = (index) => {
  return (dispatch) => {
      dispatch({
          type: "ShowInput",
          payload: index
      });
  }
}

export const showEdit = (index) => {
  return (dispatch) => {
      dispatch({
          type: "ShowEdit",
          payload: index
      });
  }
}

export const EditName = (index, editName) => {
  return (dispatch) => {
      dispatch({
          type: "EditName",
          payload: {
            index,
            editName
          }
      });
  }
}

export const NewFolder = (newName, parent) => {
  return (dispatch) => {
      dispatch({
          type: "NewFolder",
          payload: {
            newName,
            parent
          }
      });
  }
}

export const NewFolderTop = (newName) => {
  return (dispatch) => {
      dispatch({
          type: "NewFolder",
          payload: newName
      });
  }
}

export const DeleteFolder = (index) => {
  return (dispatch) => {
      dispatch({
          type: "DeleteFolder",
          payload: index
      });
  }
}

export const UndoState = (oldState) => {
  return (dispatch) => {
      dispatch({
          type: "UndoState",
          payload: oldState
      });
  }
}

export const RedoState = (newState) => {
  return (dispatch) => {
      dispatch({
          type: "RedoState",
          payload: newState
      });
  }
}

export const UndoPush = (oldState) => {
  return (dispatch) => {
      dispatch({
          type: "UndoPush",
          payload: oldState
      });
  }
}

export const RedoPush = (newState) => {
  return (dispatch) => {
      dispatch({
          type: "RedoPush",
          payload: newState
      });
  }
}

// export const DoTest = (newState) => {
//   return (dispatch) => {
//       dispatch({
//           type: "DoTest",
//           payload: newState
//       });
//   }
// }

export const Undo = (oldState) => {
  return (dispatch) => {
      dispatch({
          type: "Undo",
          payload: oldState
      });
  }
}