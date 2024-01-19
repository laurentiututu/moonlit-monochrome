import Vue from 'vue'
import VueRouter from 'vue-router'
const Home = () =>
  import(/* webpackChunkName: "vsf-home" */ '../views/Home.vue');
const About = () =>
  import(/* webpackChunkName: "vsf-about" */ '../views/About.vue');
const Locations = () =>
  import(/* webpackChunkName: "vsf-locations" */ '../views/Locations.vue');
const Location = () =>
  import(/* webpackChunkName: "vsf-location" */ '../views/Location.vue');
const Team = () =>
  import(/* webpackChunkName: "vsf-team" */ '../views/Team.vue');
const Employee = () =>
  import(/* webpackChunkName: "vsf-employee" */ '../views/Employee.vue');
const Weddings = () =>
  import(/* webpackChunkName: "vsf-weddings" */ '../views/Weddings.vue');
const MyAccount = () =>
  import(/* webpackChunkName: "vsf-my-account" */ '../views/MyAccount.vue');
const Login = () =>
  import(/* webpackChunkName: "vsf-login" */ '../views/Login.vue');
const AdminPanel = () =>
  import(/* webpackChunkName: "vsf-admin-panel" */ '../views/AdminPanel.vue');
const EmployeePanel = () =>
  import(/* webpackChunkName: "vsf-employee-panel" */ '../views/EmployeePanel.vue');


Vue.use(VueRouter)

const routes = [
  { name: 'Home', path: '/', component: Home },
  { name: 'About', path: '/about', component: About },
  { name: 'Locations', path: '/locations', component: Locations },
  { name: 'Location', path: '/locations/:slug', component: Location },
  { name: 'Team', path: '/team', component: Team },
  { name: 'Employee', path: '/team/:id', component: Employee },
  { name: 'Weddings', path: '/weddings', component: Weddings },
  { name: 'Login', path: '/login', component: Login },
  { 
    name: 'MyAccount',
    path: '/my-account',
    component: MyAccount,
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem('userToken')) {
        next();
      } else {
        next('/login');
      }
    }
  },
  { 
    name: 'AdminPanel',
    path: '/admin',
    component: AdminPanel,
    beforeEnter: (to, from, next) => {
      let token = localStorage.getItem('userToken')
      let role = localStorage.getItem('userRole')
      if (token && role === 'admin') {
        next();
      } else {
        next('/');
      }
    }
  },
  { 
    name: 'EmployeePanel',
    path: '/employee',
    component: EmployeePanel,
    beforeEnter: (to, from, next) => {
      let token = localStorage.getItem('userToken')
      let role = localStorage.getItem('userRole')
      if (token && (role === 'admin' || role === 'employee')) {
        next();
      } else {
        next('/');
      }
    }
  },
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
