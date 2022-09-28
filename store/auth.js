import { defineStore } from 'pinia'
import { api } from '~~/composables/api'
import { get, set, check_cookies } from '~~/plugins/cookies'

export const auth = defineStore('auth', {
  state: () => {
    return {
      user:{}
    }
  },

  actions: {
    async GET_TOKEN(mail, password) {
      try {
        const response = await api('auth/login/', {
          body: { 'email': mail, 'password': password },
          method: 'POST',
          errorAlert: 'при загрузке товара'
        })
        set('access_pew', response.access)
        set('refresh_pew', response.refresh)
        return response.success
      } catch (error) {
        return error.response
      }
    },

    async SEND_CODE(mail) {
      try {
        const response = await api('auth/send_code/', {
          body: { 'login': mail },
          method: 'POST',
          errorAlert: 'при загрузке товара'

        })
        return response.success
      } catch (error) {
        return error.response
      }
    },
    async GET_SELF() {
      console.log(check_cookies())
      try {
        const response = await api('clients/getself/', {
          method: 'GET',
          errorAlert: 'при загрузке товара',
          headers: { 'Authorization': 'Bearer '+ get('access_pew') }
        })
        this.user = response
      } catch (error) {
        return error.response
      }
    }
  },

  getters: {}
})
