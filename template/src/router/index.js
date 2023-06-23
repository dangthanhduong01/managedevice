import { h, resolveComponent } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import { checkTokenExpiration } from './middleware'
import DefaultLayout from '@/layouts/DefaultLayout'

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: DefaultLayout,
    redirect: '/dashboard',
    children: [
      {
        path: '/dashboard',
        name: 'Dashboard',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "dashboard" */ '@/views/Dashboard.vue'),
        meta: {
          requiresAuth: true,
        }
        },
      {
        path: '/device/:id',
        name: 'Device',
        component: () => import('@/views/Device.vue'),
      },
      {
        path: '/addNew',
        name: 'New',
        component: () => import('@/views/New.vue'),
      },
      {
        path: '/software/:id',
        name: 'Software',
        component: () => import('@/views/Software.vue'),
      }, 
      {
        path: '/duan',
        name: 'Project',
        component: () => import('@/views/Project.vue'),
      }, 
      {
        path:'/tables',
        name: 'Tables',
        component: () => import('@/views/base/Tables.vue'),
      },
      {
        path: '/allDevice',
        name: 'ManageDevice',
        component: () => import('@/views/ManageDevice.vue'),
      },
      {
        path: '/allSoftware',
        name: 'ManageSoftware',
        component: () => import('@/views/ManageSoftware.vue'),
      },     
      {
        path: '/allProject',
        name: 'ManageProject',
        component: () => import('@/views/ManageProject.vue'),
      },
      {
        path: '/room',
        name: 'Room',
        component: () => import('@/views/Room.vue'),
      },                  
    ],
  },
  // {
  //   path: '/duan',
  //   name: 'Project',
  //   component: {
  //     render() {
  //       return h(resolveComponent('router-view'))
  //     },
  //   },    
  //   redirect: '/duan',
  //   children: [
  //     {
  //       path: '/duan',
  //       name: 'Project',
  //       component: () => 
  //         import('@/views/Project.vue'),
  //     },
  //   ]
  // },  
  {
    path: '/pages',
    redirect: '/pages/404',
    name: 'Pages',
    component: {
      render() {
        return h(resolveComponent('router-view'))
      },
    },
    children: [
      {
        path: '403',
        name: 'Page403',
        component: () => import('@/views/pages/Page403'),
      },      
      {
        path: '404',
        name: 'Page404',
        component: () => import('@/views/pages/Page404'),
      },
      {
        path: '500',
        name: 'Page500',
        component: () => import('@/views/pages/Page500'),
      },
      {
        path: '/login',
        name: 'Login',
        component: () => import('@/views/pages/Login'),
      },
      {
        path: 'register',
        name: 'Register',
        component: () => import('@/views/pages/Register'),
      },
    ],
  },
]

const router = createRouter({
  history: createWebHashHistory('http://192.168.25.50:8080/'),
  routes,
  scrollBehavior() {
    // always scroll to top
    return { top: 0 }
  },
});

router.beforeEach((to, from, next) => {
  const publicPages = ['/login'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('user');
  
  if (authRequired && !loggedIn) {
    next('/login');
  } else if(to.meta.requiresAuth){
    checkTokenExpiration(to,from,next);
  } else {
    next();
  }

});


export default router
