import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutation.js'
import actions from './action.js'

Vue.use(Vuex)

const state = {
  username: '',
  cartCount: 0,
  unitPro: ''
}
export default new Vuex.Store({
  state,
  mutations,
  actions
})
