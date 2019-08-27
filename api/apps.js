const api = {
  add: '/manager/app/addAppJoin',
  list: '/manager/app/findAppInfo',
  update: '/manager/app/modifyAppInfo'
};
export default axios => {
  return {
    add(params) {
      return axios.post(api.add, params);
    },
    list(params) {
      return axios.get(api.list, { params });
    },
    update(data) {
      return axios.post(api.update, data);
    }
  };
};
