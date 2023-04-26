<template>
  <div class="layout">
    <HeaderDesktop
      v-if="!mobile"
      @open-login-window="showLogin = true"
    />
    <HeaderMobile v-else />

    <NavigationDesktop v-if="!mobile" />
    <NavigationMobile v-else />

    <slot />
    <FooterDesktop v-if="!mobile" />

    <LayoutNotifications />

    <LoginModal
      v-if="showLogin"
      @close-login-window="showLogin = false"
      @open-register-window="; (showRegister = true), (showLogin = false)"
    />
    <RegisterModal
      v-if="showRegister"
      @close-register-window="showRegister = false"
      @open-login-window="; (showLogin = true), (showRegister = false)"
    />
  </div>
</template>

<script>
import { auth } from '@/store/auth';
import { media } from '@/store/media';
import HeaderMobile from '@/components/mobile/HeaderMobile.vue';
import NavigationMobile from '@/components/mobile/NavigationMobile.vue';
import NavigationDesktop from '@/components/desktop/NavigationDesktop.vue';
import HeaderDesktop from '@/components/desktop/HeaderDesktop.vue';
import FooterDesktop from '@/components/desktop/FooterDesktop.vue';

export default {
  components: {
    HeaderMobile, NavigationMobile, NavigationDesktop, HeaderDesktop, FooterDesktop,
  },
  setup() {
    const authStore = auth();
    const showLogin = ref(false);
    const showRegister = ref(false);

    onMounted(() => {
      authStore.CHECK_AUTH();
    });
    return {
      authStore,
      showLogin,
      showRegister,
      mobile: computed(() => media().MEDIA_MOBILE),
    };
  },
  watch: {
    '$route.query.login': {
      handler() {
        if (Object.hasOwn(this.$route.query, 'login')) {
          this.showLogin = true;
        }
      },
      deep: true,
    },
  },
  async mounted() {
    if (Object.hasOwn(this.$route.query, 'login')) {
      if (await this.authStore.CHECK_AUTH()) {
        this.$router.push(this.$route.query.login);
      } else {
        this.showLogin = true;
      }
    }
  },
};
</script>

<style lang="scss" scoped>
.layout {
  position: relative;
}
</style>
