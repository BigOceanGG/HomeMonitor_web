/* eslint-disable no-useless-escape */
const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/g;

export function isUrl(path) {
  return reg.test(path);
}

const menuData = [
  {
    name: '数据统计',
    icon: 'dashboard',
    path: 'dashboard'
  },
  {
    name: '用户管理',
    icon: 'user',
    path: 'users',
    disableInBreadcrumb: true,
    // hideInBreadcrumb: true,
    // hideInMenu: true,
    children: [
      {
        name: '用户列表',
        path: 'list'
      },
      {
        name: '认证审核',
        path: 'review'
      }
    ]
  },
  {
    name: '应用管理',
    icon: 'appstore-o',
    path: 'apps',
    disableInBreadcrumb: true,
    children: [
      {
        name: '接入应用',
        path: 'list'
      },
      {
        name: '应用申请',
        path: 'apply'
      }
    ]
  }
];

function formatter(data, parentPath = '/') {
  return data.map(item => {
    let { path } = item;
    if (!isUrl(path)) {
      path = `${parentPath}${path}`;
    }
    const result = {
      ...item,
      path,
      authority: item.authority
    };
    if (item.children) {
      result.children = formatter(item.children, `${parentPath}${item.path}/`);
    }
    return result;
  });
}

function buildBreadcrumb(data, route, homePath = '/dashboard') {
  let breadcrumb = [];
  if (route.path === homePath) {
    return breadcrumb;
  }

  data.map(item => {
    const { name, path, disableInBreadcrumb } = item;
    if (route.path.indexOf(path) !== -1) {
      breadcrumb.push({ name, path: disableInBreadcrumb ? '' : path });
    }
    if (item.children) {
      breadcrumb = breadcrumb.concat(buildBreadcrumb(item.children, route));
    }
  });

  return breadcrumb;
}

export const getMenuData = () => formatter(menuData);

export const getBreadcrumbData = (m, r, p) => buildBreadcrumb(m, r, p);
