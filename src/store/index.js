import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import config from '../../config/local.json'

const page = 1;
const limit = 25;

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    locations: [],
    notifications: []
  },
  getters: {
    getLocations (state) {
      return state.locations
    },
    getLocation (state) {
      return state.location
    },
    notifications: state => state.notifications
  },
  actions: {
    spawnNotification ({ commit, state, dispatch }, notification) {
      if (state.notifications.length > 0 &&
        state.notifications[state.notifications.length - 1].message === notification.message
      ) {
        return
      }

      const id = Math.floor(Math.random() * 100000)
      const newNotification = { id, ...notification }

      commit('add', newNotification)

      if (!newNotification.hasNoTimeout) {
        setTimeout(() => {
          dispatch('removeNotificationById', id)
        }, newNotification.timeToLive || 5000)
      }

      return newNotification
    },
    removeNotification ({ commit, state }, index) {
      if (!index) {
        commit('remove', state.notifications.length - 1)
      } else {
        commit('remove', index)
      }
    },
    removeNotificationById ({ commit, state }, id) {
      const index = state.notifications.findIndex(notification => notification.id === id)

      if (index !== -1) {
        commit('remove', index)
      }
    },
    async fetchLocations({ commit }) {
      try {
        await axios.get(
          config.api.url + config.locations.all_endpoint.replace('{{page}}', page).replace('{{limit}}', limit)
        ).then(res => {
          commit("SET_LOCATIONS", res.data.data.locations);
        })
      } catch (error) {
        console.log(error);
      }
    },
    async fetchLocation({ commit }, slug) {
      try {
        await axios.get(
          config.api.url + config.locations.slug_endpoint.replace('{{slug}}', slug)
        ).then(res => {
          commit("SET_LOCATION", res.data.data);
        })
      } catch (error) {
        console.log(error);
      }
    }
  },
  mutations: {
    SET_LOCATIONS(state, locations) {
      state.locations = locations;
    },
    SET_LOCATION(state, location) {
      state.location = location;
    },
    add (state, payload) {
      state.notifications.push(payload)
    },
    remove (state, index) {
      state.notifications.splice(index, 1)
    }
  }
})
