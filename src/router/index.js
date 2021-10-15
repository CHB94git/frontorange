import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import decode from 'jwt-decode';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/admin',
    name: 'Admin',
    component: () => import( /* webpackChunkName: "admin" */ '../views/Admin.vue'),
    meta: {
      requiresAuth: true
    },
    children: [
      {
        path: 'about',
        name: 'About',
        component: () => import( /* webpackChunkName: "about" */ '../views/About.vue')
      },
      {
        path: 'categories',
        name: 'Categories',
        component: () => import( /* webpackChunkName: "categories" */ '../views/categories/CRUD.vue'),
        meta: {
          requiresAdmin: true
        }},

      {
        path: 'index',
        name: 'Index',
        component: () => import( /* webpackChunkName: "index" */ '../views/Index.vue')
      },
      {
        path: 'listproducts',
        name: 'ListProducts',
        component: () => import( /* webpackChunkName: "listproducts" */ '../views/products/List.vue')
      },
      {
        path: 'products',
        name: 'Products',
        component: () => import( /* webpackChunkName: "products" */ '../views/products/CRUD.vue'),
        meta: {
          requiresAdmin: true
        },
      },
      {
        path: 'team',
        name: 'Team',
        component: () => import( /* webpackChunkName: "team" */ '../views/Team.vue')
      },

      {
        path: 'users',
        name: 'Users',
        component: () => import( /* webpackChunkName: "users" */ '../views/users/CRUD.vue'),
        meta: {
          requiresAdmin: true
        },
      },
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import( /* webpackChunkName: "login" */ '../views/Login.vue')
  },
  
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