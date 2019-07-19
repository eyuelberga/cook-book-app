import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from './views/Dashboard.vue'
import Auth from './views/Auth.vue'

Vue.use(Router)

const router =  new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: '/auth'
    },
    {
      path: '*',
      redirect: '/auth'
    },
    {
      path: '/auth',
      name: 'auth',
      component: Auth
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard,
      meta: {
        requiresAuth: true
      }
    }
  ]
});

router.beforeEach((to, from, next) => {
  console.log(localStorage.getItem('access_token'));
  if (to.matched.some(record => record.meta.requiresAuth)) {
  if (!localStorage.getItem('access_token')) {
    next({
      path: '/auth',
      query: { redirect: to.fullPath }
    })
  } else {
    next()
  }
}
else{
  next() 
}
});

export default router;
