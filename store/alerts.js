import { defineStore } from 'pinia'

export const alerts = defineStore('alerts', {
  state: () => {
    return {
      counter: 0,
      alerts: [],
    }
  },

  actions: {
    DELETE_ALERT(id) {
      const index = this.alerts.findIndex(n => n.id === id)

      if (index !== -1) {
        this.alerts.splice(index, 1)
      }
    },
  },

  getters: {
    ALL_ALERTS: state => state.alerts,
  },
})
