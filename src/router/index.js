import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import decode from 'jwt-decode';

Vue.use(VueRouter)

const routes = [{
    path: '/login',
    name: 'Login',
    component: () => import( /* webpackChunkName: "login" */ '../views/Login.vue')
  },
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/app',
    name: 'Admin',
    component: () => import( /* webpackChunkName: "Admin" */ '../views/Admin.vue'),
    meta: {
      requiresAuth: true
    },
    children: [
      {
        path: 'index',
        name: 'Index',
        component: () => import( /* webpackChunkName: "Index" */ '../views/Index.vue')
      },
      {
        path: 'users',
        name: 'Users',
        component: () => import( /* webpackChunkName: "Users" */ '../views/users/CRUD.vue'),
        meta: {
          requiresAdmin: true
        },
      },
      {
        path: 'categories',
        name: 'Categories',
        component: () => import( /* webpackChunkName: "Categories" */ '../views/categories/CRUD.vue'),
        meta: {
          requiresAdmin: true
        },
      },
      {
        path: 'products',
        name: 'Products',
        component: () => import( /* webpackChunkName: "Products" */ '../views/products/CRUD.vue'),
        meta: {
          requiresAdmin: true
        },
      },
      {
        path: 'listproducts',
        name: 'ListProducts',
        component: () => import( /* webpackChunkName: "ListProducts" */ '../views/products/List.vue')
      },
      {
        path: 'team',
        name: 'Team',
        component: () => import( /* webpackChunkName: "Team" */ '../views/Team.vue')
      },

      {
        path: 'about',
        name: 'About',
        component: () => import( /* webpackChunkName: "About" */ '../views/About.vue')
      },
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    let token = decode(localStorage.getItem('token'));
    if (!token) {
      next({
        name: 'Login',
      })
    } else {
      if (to.matched.some(record => record.meta.requiresAdmin)) {
        if (token["role"] === 'Administrador') {
          next()
        } else {
          next({
            name: 'Admin'
          })
        }
      } else {
        next()
      }
    }
  } else {
    next();
  }
});


export default router;