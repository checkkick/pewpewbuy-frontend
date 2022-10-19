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
          errorAlert: 'при загрузке данных пользователя',
          headers: { Authorization: 'Bearer ' + get('access_pew') },
        })
        this.user = response
      } catch (error) {
        return error.response
      }
    },
    async UPDATE_USER(id, data) {
      try {
        const response = await api(`clients/updateuser/${id}/`, {
          method: 'PATCH',
          body: data,
          errorAlert: 'при обновлении данных пользователя',
          headers: { Authorization: 'Bearer ' + get('access_pew') },
        })

        for (const key in response) {
          if (Object.hasOwnProperty.call(this.user, key)) {
            this.user[key] = response[key]
          }
        }
      } catch (error) {
        return error.response
      }
    },
  },

  getters: {
    USER_STATE: state => state.user,
  },
})
