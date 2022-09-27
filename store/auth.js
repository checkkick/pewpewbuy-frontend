import { defineStore } from 'pinia'
import { api } from '~~/composables/api'

export const auth = defineStore('auth', {
  state: () => {
    return {
    }
  },

  actions: {
    async GET_TOKEN(mail,password) {
      try {
        const response = await api('auth/login/', {
          body: { 'email': mail, 'password': password },
          method: 'POST',
          errorAlert: 'при загрузке товара'
        })
        console.log(response.access)
        this.$cookies.set("access_pew",response.access,{maxAge: 1000 * 60 * 60 * 24 * 30,})
        this.$cookies.set("refresh_pew",response.refresh, {maxAge: 1000 * 60 * 60 * 24 * 30,})
        console.log(this.$cookies.get('access_pew'))
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
      try {
        const response = await api('clients/getself/', {
          method: 'GET',
          errorAlert: 'при загрузке товара'
        })
        this.allProducts = response.results
      } catch (error) {
        return error.response
      }
    },
  },

  getters: {
  }
})
