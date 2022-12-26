import { auth } from '@/store/auth'

export default defineNuxtRouteMiddleware(async to => {
  const checkAuth = await auth().CHECK_AUTH()

  if (!checkAuth) {
    return navigateTo('/?login=' + to.path)
  }
})
