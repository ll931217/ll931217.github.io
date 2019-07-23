import Vue from 'vue';

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import {
  faGithub,
  faCodepen,
  faInstagram,
  faLinkedinIn,
} from '@fortawesome/free-brands-svg-icons';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

import App from './App.vue';
import router from './router';
import store from './store';

library.add(faGithub);
library.add(faCodepen);
library.add(faInstagram);
library.add(faLinkedinIn);
library.add(faTimes);

Vue.component('fa-icon', FontAwesomeIcon);

/*eslint-disable */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
});
