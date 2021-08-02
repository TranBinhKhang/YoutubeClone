import axios from 'axios';
import { api } from "../config.json";



export function getData() {
  return dispatch => {
    axios.get(api + "/folders")
    .then(res =>
      dispatch({
        type: "FetchFolder",
        data: res.data
      })
    );
  };
}

export function getCRUD() {
  return dispatch => {
    axios.get(api + "/list")
    .then(res =>
      dispatch({
        type: "FetchCRUD",
        data: res.data
      })
    );
  };
}

export function getUpdate(data) {
  return dispatch => {
      dispatch({
        type: "FetchUpdate",
        payload: data
      })
  };
}

export function GetFolderUpdate(data) {
  return dispatch => {
      dispatch({
        type: "FolderUpdate",
        payload: data
      })
  };
}

export const UpdateName = (data) => {
  return (dispatch) => {
      dispatch({
          type: "UpdateName",
          payload: data
      });
    }
}

export const UpdateId = (data) => {
  return (dispatch) => {
      dispatch({
          type: "UpdateId",
          payload: data
      });
    }
}

export const UpdateParent = (data) => {
  return (dispatch) => {
      dispatch({
          type: "UpdateParent",
          payload: data
      });
    }
}


export const EditCode = (data) => {
  return (dispatch) => {
      dispatch({
          type: "EditCode",
          payload: data
      });
    }
}

export const EditListName = (data) => {
  return (dispatch) => {
      dispatch({
          type: "EditListName",
          payload: data
      });
    }
}

export const EditCategory = (data) => {
  return (dispatch) => {
      dispatch({
          type: "EditCategory",
          payload: data
      });
    }
}

export const EditBudget = (data) => {
  return (dispatch) => {
      dispatch({
          type: "EditBudget",
          payload: data
      });
    }
}

export const EditStatus = (data) => {
  return (dispatch) => {
      dispatch({
          type: "EditStatus",
          payload: data
      });
    }
}




// export function deleteCRUD() {
//   return dispatch => {
//     axios.post('http://192.168.1.142:4000/api/deleteitem', {_id: rowData._id}, axiosConfig)
//     .then(res =>
//       dispatch({
//         type: "FetchCRUD",
//         data: res.data
//       })
//     );
//   };
// }


export const openFolder = (index) => {
  return (dispatch) => {
      dispatch({
          type: "OpenFolder",
          payload: index
      });
  }
}

export const setSelected = (index) => {
  return (dispatch) => {
      dispatch({
          type: "SetSelected",
          payload: index
    });
  }
}

export const openItem = (index) => {
  return (dispatch) => {
      dispatch({
          type: "OpenItem",
          payload: index
      });
  }
}

export const selectItem = (index) => {
  return (dispatch) => {
      dispatch({
          type: "SelectItem",
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

export const setUsername = (name) => {
  return (dispatch) => {
      dispatch({
          type: "SetUsername",
          payload: name
      });
  }
}

export const setPassword = (password) => {
  return (dispatch) => {
      dispatch({
          type: "setPassword",
          payload: password
      });
  }
}

export const setUser = (token) => {
  return (dispatch) => {
      dispatch({
          type: "SetUser",
          payload: token
      });
  }
}

export const Logout = () => {
  return (dispatch) => {
      dispatch({
          type: "LogOut"
      });
  }
}