<template>
  <div class="layout">
    <Header @open-login-window="showLogin = true" />
    <slot />
    <Footer />

    <LoginModal
      v-if="showLogin"
      @close-login-window="showLogin = false"
      @open-register-window=";(showRegister = true), (showLogin = false)" />
    <RegisterModal
      v-if="showRegister"
      @close-register-window="showRegister = false"
      @open-login-window=";(showLogin = true), (showRegister = false)" />
  </div>
</template>

<script>
import { auth } from '@/store/auth.js'
import { onMounted } from '../.nuxt/imports'

export default {
  setup() {
    const authStore = auth()
    const showLogin = ref(false)
    const showRegister = ref(false)

    onMounted(() => {
      authStore.CHECK_AUTH()
    })
    return {
      authStore,
      showLogin,
      showRegister,
    }
  },
  async mounted() {
    if (Object.hasOwn(this.$route.query, 'login')) {
      if (await this.authStore.CHECK_AUTH()) {
        this.$router.push('/profile')
      } else {
        this.showLogin = true
      }
    }
  },
}
</script>

<style lang="scss" scoped></style>
