import Vue from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faFacebook, faTwitter, faGithub, faCodepen } from '@fortawesome/free-brands-svg-icons'
import { faEnvelopeOpenText } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import VueMarkdown from '@adapttive/vue-markdown'
import VueScrollTo from 'vue-scrollto'

import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from './router'
import store from './store'

library.add(
  faFacebook,
  faTwitter,
  faGithub,
  faCodepen,
  faEnvelopeOpenText
)

Vue.component('fa-icon', FontAwesomeIcon)
Vue.component('md', VueMarkdown)

Vue.use(VueScrollTo)

Vue.config.productionTip = false

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
