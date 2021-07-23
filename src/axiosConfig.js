const axiosConfig = {
    headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        "Access-Control-Allow-Origin": "*",
        'x-auth-token': localStorage.getItem('token')
    }
  };

export default axiosConfig;