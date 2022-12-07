import { notifications } from '@/store/notifications'

export const api = (url, options = {}) =>
  $fetch(`http://bexram.online:8500/${url}`, {
    retry: 0,
    ...options,

    // async onResponse({ request, response, options }) {
    //   console.log('[fetch response]')
    // },
    // async onResponseError({ request, response, options }) {
    //   console.log('[fetch response error]')
    // },

    // async onRequest({ request, options }) {
    //   console.log('[fetch request]')
    // },
    // async onRequestError({ request, options, error }) {
    //   console.log('[fetch request error]')
    // },

    onResponseError({ options }) {
      const storeNotifications = notifications()

      storeNotifications.ADD_NOTIFICATION(
        options.errorAlert,
        'Системная ошибка',
        'alert'
      )

      return false
    },
  })
