import Vue from 'vue'
import fontawesome from '@fortawesome/fontawesome'
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
import brands from '@fortawesome/fontawesome-free-brands'

import App from './App.vue'

fontawesome.library.add(brands)

Vue.component('fa-icon', FontAwesomeIcon)

new Vue({
  el: '#app',
  render: h => h(App)
})
