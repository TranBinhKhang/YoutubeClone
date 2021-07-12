import axios from 'axios';

// export const fetchData = (folders) => {
//     return {
//       type: 'FetchFolder',
//       folders
//     }
//   };
  
//   export const fetchFolderData = () => {
//     return (dispatch) => {
//       return axios.get("https://api.jsonbin.io/b/60e69ab7fe016b59dd5f2435")
//         .then(response => {
//           dispatch(fetchData(response.data))
//         })
//         .catch(error => {
//           throw(error);
//         });
//     };
//   };

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

export function test() {
  return dispatch => {
    axios.get("https://api.jsonbin.io/b/60e69ab7fe016b59dd5f2435")
    .then(res =>
      dispatch({
        type: "FetchTest",
        data: res.data
      })
    );
  };
}

// export const openFolder = (index) => {
//   return (dispatch) => {
//       dispatch({
//           type: "OpenFolder",
//           index: index
//       });
//   }
// }

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

// export const Undo = (state) => {
//   return (dispatch) => {
//       dispatch({
//           type: "Undo",
//           payload: state
//       });
//   }
// }

// export const Redo = (state) => {
//   return (dispatch) => {
//       dispatch({
//           type: "Redo",
//           payload: state
//       });
//   }
// }