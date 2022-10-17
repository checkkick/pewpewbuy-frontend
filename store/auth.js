import { api } from '@/composables/api'
import { checkСookies, get, set } from '@/store/cookies'
import { defineStore } from 'pinia'

export const auth = defineStore('auth', {
  state: () => {
    return {
      user: {},
      authorized: false,
    }
  },

  actions: {
    async GET_TOKEN(mail, password) {
      try {
        const response = await api('auth/login/', {
          body: { email: mail, password },
          method: 'POST',
          errorAlert: 'при загрузке товара',
        })
        set('access_pew', response.access)
        set('refresh_pew', response.refresh)
        this.authorized = true
        return response
      } catch (error) {
        return error.response.status
      }
    },
    async REFRESH_TOKEN() {
      try {
        const response = await api('auth/refresh/', {
          body: { refresh: get('refresh_pew') },
          method: 'POST',
          errorAlert: 'при загрузке товара',
        })
        set('access_pew', response.access)
        set('refresh_pew', response.refresh)
        this.authorized = true
        return response
      } catch (error) {
        return error.response.status
      }
    },

    async SEND_CODE(mail) {
      try {
        const response = await api('auth/send_code/', {
          body: { login: mail },
          method: 'POST',
          errorAlert: 'Ошибка. Попробуйте снова',
        })
        return response
      } catch (error) {
        return error.response.status
      }
    },
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
    async CHECK_MAIL(mail) {
      try {
        const response = await api('auth/check_mail/', {
          body: { mail },
          method: 'POST',
          errorAlert: 'Ошибка. Попробуйте снова',
        })
        return response
      } catch (error) {
        return error.response.status
      }
    },
    async CONFIRM_MAIL(mail, code) {
      try {
        const response = await api('auth/confirm_mail/', {
          body: { mail, code },
          method: 'POST',
          errorAlert: 'Ошибка. Попробуйте снова',
        })
        return response
      } catch (error) {
        return error.response.status
      }
    },
    async CHECK_AUTH() {
      const coockieState = checkСookies()
      if (coockieState === 'access') {
        this.authorized = true
        return true
      } else if (coockieState === 'refresh') {
        await this.REFRESH_TOKEN()
        this.authorized = true
        return true
      } else if (coockieState === 'login') {
        return false
      }
    },
  },

  getters: {
    USER_STATE: state => state.user,
    AUTHORIZED: state => state.authorized,
  },
})
