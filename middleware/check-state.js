export default async ({ $axios, store, route, redirect, req }) => {
  const cookieStr = process.server ? req.headers.cookie : '';
  await store.dispatch('loadLoggedUser', cookieStr);
  const { loggedUser } = store.state;
  if (loggedUser) {
    $axios.setHeader('token', loggedUser.token);
  }

  const { path, name: routeName } = route;

  if (!loggedUser && routeName !== 'login') {
    return redirect('/login');
  }

  if (loggedUser && routeName === 'login') {
    return redirect('/apps/list');
  }

  if (path === '/') {
    return redirect('/login');
  }
  store.dispatch('loadBreadcumbData', route);
};
