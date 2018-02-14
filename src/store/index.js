// Store (vuex)
import Vue from 'vue'
import Vuex from 'vuex'

import * as types from './types'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    bgImg: {}
  },
  getters: {
    [types.BG_IMAGE]: state => state.bgImg
  },
  mutations: {
    [types.MUTATE_SET_BG_IMAGE]: (state, img) => state.bgImg = img
  },
  actions: {
    [types.SET_BG_IMAGE]: ({commit}, img) => commit(types.MUTATE_SET_BG_IMAGE, img)
  }
})
