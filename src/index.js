import Vue from 'vue'
import fontawesome from '@fortawesome/fontawesome'
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
import github from '@fortawesome/fontawesome-free-brands/faGithub'
import codepen from '@fortawesome/fontawesome-free-brands/faCodepen'
import instagram from '@fortawesome/fontawesome-free-brands/faInstagram'
import linkedin from '@fortawesome/fontawesome-free-brands/faLinkedinIn'
import times from '@fortawesome/fontawesome-free-solid/faTimes'

import App from './App.vue'
import router from './router'
import store from './store'

fontawesome.library.add(github)
fontawesome.library.add(codepen)
fontawesome.library.add(instagram)
fontawesome.library.add(linkedin)
fontawesome.library.add(times)

Vue.component('fa-icon', FontAwesomeIcon)

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
