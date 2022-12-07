<template>
  <div class="layout">
    <Header @open-login-window="showLogin = true" />
    <slot />
    <Footer />

    <ul v-if="alertsSore.ALL_ALERTS.length > 0" class="notification">
      <li
        v-for="item in alertsSore.ALL_ALERTS"
        :key="item.id"
        class="notification__item">
        <h4 class="notification__title">Ошибка {{ item.alert }}</h4>
        <p class="notification__text">Системная ошибка</p>
        <button
          class="notification__close"
          @click="alertsSore.DELETE_ALERT(item.id)"></button>
      </li>
    </ul>

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
import { alerts } from '@/store/alerts'
import { auth } from '@/store/auth.js'
import { onMounted } from '../.nuxt/imports'

export default {
  setup() {
    const alertsSore = alerts()
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
      alertsSore,
    }
  },
  watch: {
    '$route.query': {
      handler() {
        if (Object.hasOwn(this.$route.query, 'login')) {
          this.showLogin = true
        }
      },
      deep: true,
    },
  },
  async mounted() {
    if (Object.hasOwn(this.$route.query, 'login')) {
      if (await this.authStore.CHECK_AUTH()) {
        this.$router.push(this.$route.query.login)
      } else {
        this.showLogin = true
      }
    }
  },
}
</script>

<style lang="scss" scoped>
.layout {
  position: relative;
}
.notification {
  overflow: auto;
  padding: 15px 0 0 15px;
  height: 60vh;
  z-index: 999;
  display: flex;
  flex-direction: column;
  gap: 20px;
  list-style: none;
  margin: 0;
  position: absolute;
  top: 60%;
  right: 0;

  &__item {
    position: relative;
    border: 1px solid $filter-border;
    border-top-left-radius: 15px;
    border-bottom-left-radius: 15px;
    padding: 29px 10px 29px 102px;
    background: url('@/assets/img/system-alert.svg') no-repeat 37px center /
        42px 38px,
      $white;
  }

  &__close {
    cursor: pointer;
    position: absolute;
    top: -14px;
    left: -14px;
    border-radius: 100%;
    width: 36px;
    height: 36px;
    background-color: $white;
    border: 1px solid $filter-border;

    &::before {
      content: '';
      position: absolute;
      top: 15px;
      left: 8px;
      width: 18px;
      height: 2px;
      background-color: $black;
      transform: rotate(45deg);
    }
    &::after {
      content: '';
      position: absolute;
      top: 15px;
      left: 8px;
      width: 18px;
      height: 2px;
      background-color: $black;
      transform: rotate(-45deg);
    }
  }

  &__title {
    @include defineFontMontserrat(600, 22px, 27px);
    margin-bottom: 8px;
  }

  &__text {
    @include defineFontMontserrat(400, 20px, 24px);
  }
}
</style>
