import { alerts } from '~~/store/alerts'

export const api = (url, options = {}) =>
  $fetch(`http://bexram.online:8500/${url}`, {
    retry: 0,
    ...options,

    onRequestError() {
      const storeAlerts = alerts()

      storeAlerts.alerts.push({
        id: storeAlerts.counter,
        alert: options.errorAlert
      })
      storeAlerts.counter++

      return false
    }
  })
