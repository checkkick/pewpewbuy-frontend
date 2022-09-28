import Cookies from 'js-cookie'
import jwtDecode from 'jwt-decode'

export function set(key, value) {
  Cookies.set(key, value, { expires: 30 })
}

export function get(key) {
  return Cookies.get(key)

}

export function remove(key) {
  Cookies.remove(key)
}

export function check_cookies() {
  if (get('access_pew')) {
    var decoded = jwtDecode(get('access_pew')) // токен доступа существует и не истек
    if (decoded.exp >= parseInt(new Date().getTime() / 1000)) {
      return 'access'
    } else if (get('refresh_pew')) {
      // токен доступа истек, но есть не истекший токен обновления
      decoded = jwtDecode(get('refresh_pew'))
      if (decoded.exp >= parseInt(new Date().getTime() / 1000)) {
            return 'refresh'
      } else {
        return 'login'
      }
    }
  } else if (!get('access_pew') && get('refresh_pew')) {
    // токен доступа не существует, но есть не истекший токен обновления
    decoded = jwtDecode(get('refresh_pew'))
    if (decoded.exp >= parseInt(new Date().getTime() / 1000)) {
          return 'refresh'
    } else {
      return 'login'
    }
  } else if (!get('refresh')) {
    return 'login'
  }
}
