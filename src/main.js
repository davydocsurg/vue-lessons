import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'animate.css/animate.compat.css';

// import {animate} from 'animate.css'
// import 'animate.css'

// import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
// import { Bootstrap } from 'bootstrap'
import 'bootstrap/dist/css/bootstrap.css'
// import 'bootstrap-vue/dist/bootstrap-vue.css'


// Install BootstrapVue
// Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
// Vue.use(IconsPlugin)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  // animate,
  render: h => h(App)
}).$mount('#app')
