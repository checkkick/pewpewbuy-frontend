import { auth } from '@/store/auth'

export default defineNuxtRouteMiddleware(async to => {
  const checkAuth = await auth().CHECK_AUTH()

  if (to.path === '/profile' && !checkAuth) {
    return navigateTo('/?login')
  }
})
