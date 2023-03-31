import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';

export function set(key, value) {
  Cookies.set(key, value, { expires: 30 });
}

export function get(key) {
  return Cookies.get(key);
}

export function removeCookies() {
  Cookies.remove('access_pew');
  Cookies.remove('refresh_pew');
}

export function checkСookies() {
  if (get('access_pew') !== undefined) {
    let decoded = jwtDecode(get('access_pew')); // токен доступа существует и не истек
    if (decoded.exp >= parseInt(new Date().getTime() / 1000, 10)) {
      return 'access';
    } if (get('refresh_pew') !== undefined) {
      // токен доступа истек, но есть не истекший токен обновления
      decoded = jwtDecode(get('refresh_pew'));
      if (decoded.exp >= parseInt(new Date().getTime() / 1000, 10)) {
        return 'refresh';
      }
      return 'login';
    }
  } else if (
    get('access_pew') === undefined
    && get('refresh_pew') !== undefined
  ) {
    // токен доступа не существует, но есть не истекший токен обновления
    decoded = jwtDecode(get('refresh_pew'));
    if (decoded.exp >= parseInt(new Date().getTime() / 1000, 10)) {
      return 'refresh';
    }
    return 'login';
  } else if (get('refresh_pew') === undefined) {
    return 'login';
  }

  return false;
}
