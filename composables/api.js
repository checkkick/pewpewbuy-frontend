import { alerts } from '~~/store/alerts'

export const api = (url, options = {}) =>
  $fetch(`https://api-pewpewbuy.bexram.online/${url}`, {
    retry: 0,
    headers: {
      'Content-Type': 'application/json',
    },
    ...options,

    onRequestError() {
      const storeAlerts = alerts()

      storeAlerts.alerts.push({
        id: storeAlerts.counter,
        alert: options.errorAlert,
      })
      storeAlerts.counter++

      return false
    },
  })
