import Vue from 'vue'
import VueResource from 'vue-resource'
import VueResourceNProgress from 'vue-resource-nprogress'

import App from './App.vue'
import router from './router'
import store from './store'

Vue.use(VueResource)
Vue.use(VueResourceNProgress)

Vue.http.options.root = 'https://api.imgur.com/'
Vue.http.headers.common['Authorization'] = 'Client-ID a476f4cf659c7a1'

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
