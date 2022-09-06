<template>
  <div class="layout">
    <Header @open-login-window="showLogin = true" />
    <slot />
    <Footer />

    <LoginModal v-if="showLogin" @close-login-window="showLogin = false" />
  </div>
</template>

<script setup>
const showLogin = ref(false)
</script>

<style lang="scss" scoped></style>
