import { api } from '@/composables/api'
import { get } from '@/store/cookies'
import { notifications } from '@/store/notifications'
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
          errorAlert: 'Ошибка при загрузке данных пользователя',
          headers: { Authorization: 'Bearer ' + get('access_pew') },
        })
        this.user = response
      } catch (error) {
        return false
      }
    },
    async UPDATE_USER(id, data) {
      try {
        const response = await api(`clients/updateuser/${id}/`, {
          method: 'PATCH',
          body: data,
          errorAlert: 'Ошибка при обновлении данных пользователя',
          headers: {
            Authorization: 'Bearer ' + get('access_pew'),
          },
        })

        for (const key in response) {
          if (Object.hasOwnProperty.call(this.user, key)) {
            this.user[key] = response[key]
          }
        }

        notifications().ADD_NOTIFICATION(
          'Изменение профиля',
          'Профиль успешно изменен',
          'success'
        )

        return true
      } catch (error) {
        return false
      }
    },
  },

  getters: {
    USER_STATE: state => state.user,
  },
})
