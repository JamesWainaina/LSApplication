import { route } from 'quasar/wrappers';
import {
  createMemoryHistory,
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from 'vue-router';

import CustomerList from 'src/components/CustomerList.vue';
import CustomerForm from 'src/components/CustomerForm.vue';
import ProjectList from 'src/components/ProjectList.vue';
import ProjectForm from 'src/components/ProjectForm.vue';


/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

import { RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  { path: '/customers', component: CustomerList, name: 'CustomerList' },
  { path: '/customers/add', component: CustomerForm, name: 'AddCustomer' },
  { path: '/projects', component: ProjectList, name: 'ProjectList' },
  { path: '/projects/add', component: ProjectForm, name: 'AddProject' },
  { path: '/', redirect: '/customers' }
];

export default route(function (/* { store, ssrContext } */) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : (process.env.VUE_ROUTER_MODE === 'history' ? createWebHistory : createWebHashHistory);

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(process.env.VUE_ROUTER_BASE),
  });

  return Router;
});
