import { defineStore } from 'pinia'

export const notifications = defineStore('notifications', {
  state: () => {
    return {
      counter: 0,
      notifications: [],
    }
  },

  actions: {
    ADD_NOTIFICATION(notificationTitle, notificationText, notificationType) {
      const id = this.counter

      this.notifications.push({
        id,
        title: notificationTitle,
        text: notificationText,
        type: notificationType,
      })

      setTimeout(() => {
        this.DELETE_NOTIFICATION(id)
      }, 10 * 1000)

      this.counter++
    },

    DELETE_NOTIFICATION(id) {
      const index = this.notifications.findIndex(n => n.id === id)

      if (index !== -1) {
        this.notifications.splice(index, 1)
      }
    },
  },

  getters: {
    ALL_NOTIFICATIONS: state => state.notifications,
  },
})
