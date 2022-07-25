import { defineStore } from 'pinia'

export const alerts = defineStore('alerts', {
  state: () => {
    return {
      counter: 0,
      alerts: [],
    }
  },

  getters: {
    ALL_ALERTS: state => state.alerts,
  },
})
