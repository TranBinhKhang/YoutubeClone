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

export function getVideo() {
  return dispatch => {
    axios
    .get(api + "/fetchall")
    .then(res =>
      dispatch({
        type: "FetchVideo",
        data: res.data
      })
    );
  };
}

export function getComment(data) {
  return dispatch => {
      dispatch({
        type: "GetComment",
        payload: data
      })
  };
}
export function getMyVideo() {
  return dispatch => {
    axios.get(api + "/fetchmyvideo")
    .then(res =>
      dispatch({
        type: "FetchMyVideo",
        data: res.data
      })
    );
  };
}


export const ShowChild = (index) => {
  return (dispatch) => {
      dispatch({
          type: "ShowChild",
          payload: index
      });
  }
}

export const ShowCommentReply = (index) => {
  return (dispatch) => {
      dispatch({
          type: "ShowCommentReply",
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