// Router
import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../components/Home.vue'
import Projects from '../components/Projects.vue'
import Pictures from '../components/Pictures.vue'
import About from '../components/About.vue'

Vue.use(VueRouter)

// TODO: think up navigations for the site
// - Home
// - Projects
// - Pictures
// - About me (Include my CV)
// - Contact Me

export default new VueRouter({
  linkActiveClass: 'active',
  routes: [
    {path: '/', name: 'home', component: Home},
    {path: '/projects', name: 'projects', component: Projects},
    {path: '/pictures', name: 'pictures', component: Pictures},
    {path: '/about', name: 'about', component: About}
  ],
  mode: 'history'
})
