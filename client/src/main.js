import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Vuetify from 'vuetify'
import Navbar from './components/Navbar'
import Popup from './components/Popup'
import 'vuetify/dist/vuetify.min.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'


Vue.config.productionTip = false
Vue.use(Vuetify);
new Vue({
  router,
  components: {
    Navbar,
    Popup
  },
  render: h => h(App)
}).$mount('#app')
