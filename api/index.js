// import qs from 'qs';
import { Message } from 'element-ui';
let files = require.context('~/api', false, /^\.\/(?!-).*\.(js)$/);
let filenames = files.keys();

function getModule(filename) {
  let file = files(filename);
  return file.default ? file.default : file;
}
let api = {};

filenames.forEach(filename => {
  let name = filename.replace(/^\.\//, '').replace(/\.(js)$/, '');
  if (name === 'index') return false;
  api[name] = getModule(filename);
});

export default (ctx, inject) => {
  const { $axios, store } = ctx;
  const { loggedUser } = store.state;
  if (loggedUser) {
    $axios.setHeader('token', loggedUser.token);
  }
  // $axios.onResponse(response => {
  //   let { data } = response;
  //   let { code, message } = data;
  //   console.log(code, message);
  //   if (code !== '200') {
  //     if (code === '401') {
  //       Message.warning('会话已过期，请重新登陆');
  //       // store.commit('setUser', null);
  //       // app.router.replace({ name: 'login' });
  //     } else {
  //       Message.warning(message || '服务繁忙');
  //     }
  //   }
  // });

  $axios.onError(error => {
    console.log(error, error.response);
    if (error.response) {
      let { data } = error.response;
      Message.error(data.message);
    } else {
      Message.error('系统炸了~');
    }
  });

  for (let key in api) {
    inject(key, api[key]($axios));
  }
};
