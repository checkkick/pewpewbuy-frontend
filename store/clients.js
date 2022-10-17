import { api } from '@/composables/api'
import { get } from '@/store/cookies'
import { defineStore } from 'pinia'

export const clients = defineStore('clients', {
  state: () => {
    return {
      user: {},
    }
  },

  actions: {
    async GET_SELF() {
      try {
        const response = await api('clients/getself/', {
          method: 'GET',
          errorAlert: 'при загрузке товара',
          headers: { Authorization: 'Bearer ' + get('access_pew') },
        })
        this.user = response
      } catch (error) {
        return error.response
      }
    },
  },

  getters: {
    USER_STATE: state => state.user,
  },
})
