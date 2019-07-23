import Vue from 'vue';
import VueRouter from 'vue-router';

import Home from '../components/Home.vue';
import StartPage from '../components/StartPage.vue';

Vue.use(VueRouter);

export default new VueRouter({
  routes: [
    { path: '', name: 'home', component: Home },
    { path: '/startpage', name: 'startpage', component: StartPage },
  ],
  mode: 'history',
});
