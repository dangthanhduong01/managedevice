export default [
  {
    component: 'CNavItem',
    name: 'Tổng quan',
    to: '/dashboard',
    icon: 'cil-speedometer',
    badge: {
      color: 'primary',
      text: 'NEW',
    },
  },
  {
    component: 'CNavItem',
    name: 'Quản lí dự án',
    to: '/allProject',
  },
  {
    component: 'CNavItem',
    name: 'Quản lí thiết bị',
    to: '/allDevice',
  },
  {
    component: 'CNavItem',
    name: 'Quản lí phần mềm',
    to: '/allSoftware',
  },
  {
    component: 'CNavItem',
    name: 'Quản lí tài sản phòng',
    to: '/room',
  },
  // {
  //   component: 'CNavItem',
  //   name: 'Download CoreUI',
  //   href: 'http://coreui.io/vue/',
  //   icon: { name: 'cil-cloud-download', class: 'text-white' },
  //   _class: 'bg-success text-white',
  //   target: '_blank'
  // },
  // {
  //   component: 'CNavItem',
  //   name: 'Try CoreUI PRO',
  //   href: 'http://coreui.io/pro/vue/',
  //   icon: { name: 'cil-layers', class: 'text-white' },
  //   _class: 'bg-danger text-white',
  //   target: '_blank'
  // }
]
