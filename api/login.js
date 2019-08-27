const api = {
  login: '/manager/login/loginSysUser'
};

export default axios => {
  return {
    login(data) {
      return axios.post(api.login, data);
    }
  };
};
