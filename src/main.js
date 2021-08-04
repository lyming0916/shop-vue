import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/basic.css'

Vue.config.productionTip = false

Vue.use(ElementUI)
new Vue({
  el: '#app',
  router,
  render: h => h(App),
  components: {App},
  template: '<App/>'
})