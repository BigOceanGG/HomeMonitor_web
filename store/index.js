import Cookie from 'cookie';
import Cookies from 'js-cookie';

import { getMenuData, getBreadcrumbData } from '~/common/menu';

const inBrowser = process.client;

export const state = () => ({
  menuData: getMenuData(),
  breadcrumbData: [],
  loggedUser: null
});

export const getters = {
  loggedUser(state) {
    return state.loggedUser;
  },
  menuData(state) {
    return state.menuData;
  },
  getBreadcrumbData(state) {
    return state.breadcrumbData;
  }
};

export const mutations = {
  setBreadcrumbData(state, breadcrumbData) {
    state.breadcrumbData = breadcrumbData;
  },
  setLoggedUser(state, loggedUser) {
    state.loggedUser = loggedUser;
    if (inBrowser) {
      if (!loggedUser) {
        Cookies.remove('LOGGED_USER');
      } else {
        Cookies.set('LOGGED_USER', JSON.stringify(loggedUser));
      }
    }
  }
};

export const actions = {
  loadBreadcumbData({ commit, state }, route) {
    const breadcrumbData = getBreadcrumbData(state.menuData, route);
    commit('setBreadcrumbData', breadcrumbData);
  },
  loadLoggedUser({ commit }, cookieStr) {
    if (inBrowser) {
      cookieStr = document.cookie;
    }
    const cookies = Cookie.parse(cookieStr || '') || {};
    const user = cookies.LOGGED_USER;
    const loggedUser = user ? JSON.parse(user) : '';
    commit('setLoggedUser', loggedUser);
  }
};
