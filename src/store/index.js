import Vue from 'vue'
import Vuex from 'vuex'
import router from '@/router'
import axios from 'axios'

Vue.use(Vuex)
Vue.use(axios, router)

const api = "https://gnito-api.herokuapp.com/api"

export default new Vuex.Store({
  state: {
    flash: {
      on: false,
      context: '',
      message: '',
      timeout: 0
    },
    creating: false,
    drop: {
      message: '',
      password: '',
      title: ''
    },
  },
  mutations: {
    SET_FLASH(state, flash) {
      state.flash = flash
      state.flash.on = true
      
      // Staged for removal, close button on flash makes more sense
      state.flash.timeout = 10
      setTimeout(() => { state.flash = { 
        on: false, 
        context: '',
        message: '',
      }}, state.flash.timeout * 1000)
    },
    CREATING_TOGGLE(state) {
      state.creating = !state.creating
    },
    SET_DROP(state, drop) {
      state.drop = drop
    }
  },
  actions: {
    setFlash(context, flash) {
      context.commit('SET_FLASH', flash)
    },
    createDrop(context, drop) {
      context.commit('CREATING_TOGGLE')

      axios.post(api, drop).then(res => { 
        context.commit('CREATING_TOGGLE')
        
        context.commit('SET_FLASH', {
          message:
            `
            <h2>Success!</h2>
            ${res.data._id}, ${res.data.password}
            `,
            context: 'success'
          })
        })
    },
    retrieveDrop(context) {
      axios.get(api + router.currentRoute.fullPath).then(response => {
        const drop = response.data
        context.commit('SET_DROP', drop)

        context.commit('SET_FLASH', {
            message: 
            `
            <h2>Success!</h2>
            <p>Drop retireved, then deleted</p>
            `,
            context: 'success'
          })
        })

      }
  },
  getters: {

  }
})
