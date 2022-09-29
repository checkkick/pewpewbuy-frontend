import { defineStore } from 'pinia'
import { api } from '~~/composables/api'
import { get, set } from '~~/cookies/cookies'
import { check_cookies } from '~/cookies/cookies'

export const auth = defineStore('auth', {
  state: () => {
    return {
      user: {},
      authorized: false
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
        this.authorized=true
        return response
      } catch (error) {
        return error.response.status
      }
    },
    async REFRESH_TOKEN() {
      try {
        const response = await api('auth/refresh/', {
          body: { 'refresh': get('refresh_pew') },
          method: 'POST',
          errorAlert: 'при загрузке товара'
        })
        set('access_pew', response.access)
        set('refresh_pew', response.refresh)
        this.authorized=true
        return response
      } catch (error) {
        return error.response.status
      }
    },

    async SEND_CODE(mail) {
      try {
        const response = await api('auth/send_code/', {
          body: { 'login': mail },
          method: 'POST',
          errorAlert: 'Ошибка. Попробуйте снова'
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
          headers: { 'Authorization': 'Bearer ' + get('access_pew') }
        })
        this.user = response
      } catch (error) {
        return error.response
      }
    },
    async CHECK_MAIL(mail) {
      try {
        const response = await api('auth/check_mail/', {
          body: { 'mail': mail },
          method: 'POST',
          errorAlert: 'Ошибка. Попробуйте снова'
        })
        return response
      } catch (error) {
        return error.response.status
      }
    },
    async CONFIRM_MAIL(mail, code) {
      try {
        const response = await api('auth/confirm_mail/', {
          body: { 'mail': mail, 'code': code },
          method: 'POST',
          errorAlert: 'Ошибка. Попробуйте снова'
        })
        return response
      } catch (error) {
        return error.response.status
      }
    },
    async CHECK_AUTH() {
      const coockie_state=check_cookies()
      if (coockie_state==='access') {
        this.authorized=true
        return true
      }
      else if(coockie_state==='refresh'){
        await this.REFRESH_TOKEN()
        this.authorized=true
        return true
      }
      else if(coockie_state==='login'){
        return false
      }

    }

  },


  getters: {
    USER_STATE: state => state.user,
    AUTHORIZED: state => state.authorized

  }
})
