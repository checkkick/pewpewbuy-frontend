import { alerts } from '@/store/alerts'

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
    // }

    onResponseError() {
      const storeAlerts = alerts()

      const id = storeAlerts.counter

      storeAlerts.alerts.push({
        id,
        alert: options.errorAlert,
      })

      setTimeout(() => {
        storeAlerts.DELETE_ALERT(id)
      }, 30 * 1000)

      storeAlerts.counter++

      return false
    },
  })
