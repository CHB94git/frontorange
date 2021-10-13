import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

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
    path: '/admin',
    name: 'Admin',
    component: () => import( /* webpackChunkName: "Admin" */ '../views/Admin.vue'),
    meta: {
      requiresAuth: true
    },
    children: [{
        path: 'users',
        name: 'Users',
        component: () => import( /* webpackChunkName: "Users" */ '../views/users/CRUD.vue')
      },
      {
        path: 'categories',
        name: 'Categories',
        component: () => import( /* webpackChunkName: "Categories" */ '../views/categories/CRUD.vue')
      },
      {
        path: 'products',
        name: 'Products',
        component: () => import( /* webpackChunkName: "Products" */ '../views/products/CRUD.vue')
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
    let token = localStorage.getItem('token');
    if (!token) {
      next({
        name: 'Login',
        //query: {redirect: to.fullPath}
      })
    } else {
      next();
    }
  } else {
    next();
  }
})


export default router