// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ViewUI from 'view-design'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Vuex from 'vuex'
import storeData from './store'
import 'view-design/dist/styles/iview.css'
import { getCookie } from './libs/util'


Vue.use(ViewUI)
Vue.use(VueAxios, axios)
Vue.use(Vuex)

const store = new Vuex.Store(storeData)
// console.log('store', store)

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  ViewUI.LoadingBar.start();
  const { username } = getCookie()
  console.log('user', username)
  store.commit('setUser', username)
  
  const { matched } = to
  if (matched.length === 0) {
    from.name ? next({ name: from.name }) : next('/')
    ViewUI.LoadingBar.finish();
    return
  }

  // return next()
  
  if (matched.some(v => v.meta.hasLogin)) {
    if (!username) {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else if (to.meta.loginPage) {
    console.log('xxx11111x')
    if (username) {
      next('/')
    } else {
      next()
    }
  } else {
    next()
  }

});

router.afterEach((to, from, next) => {
  ViewUI.LoadingBar.finish();
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
