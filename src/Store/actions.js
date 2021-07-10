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

export const openFolder = (index) => {
  return (dispatch) => {
      dispatch({
          type: "OpenFolder",
          payload: index
      });
  }
}

export const NewFolder = (newName, parent) => {
  return (dispatch) => {
      dispatch({
          type: "OpenFolder",
          payload: {
            newName,
            parent
          }
      });
  }
}