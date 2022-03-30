import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import dateFilter from "./utils/dateFormater";
import './assets/styles/_styles.scss'
import Vuelidate from 'vuelidate'

Vue.config.productionTip = false
Vue.filter('date', dateFilter)
Vue.use(Vuelidate)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
