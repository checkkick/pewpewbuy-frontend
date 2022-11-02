import { auth } from '@/store/auth'

export default defineNuxtRouteMiddleware(async to => {
  const checkAuth = await auth().CHECK_AUTH()

  if (to.path === '/profile' && !checkAuth) {
    return navigateTo('/?login=/profile')
  } else if (to.path.includes('/product') && !checkAuth) {
    return navigateTo('/?login=' + to.path)
  }
})
