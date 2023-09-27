<template>
  <div class="layout">
    <HeaderDesktop
      v-if="!tablet"
      @open-login-window="showLogin = true"
    />
    <HeaderMobile
      v-else
      @close-categories="showCategories = false"
      @close-or-open-categories="showCategories = !showCategories"
    />

    <Transition name="slide">
      <CategoriesMobile
        v-if="tablet"
        v-show="showCategories"
        @close="showCategories = false"
      />
    </Transition>

    <NavigationDesktop v-if="!tablet" />
    <NavigationMobile
      v-else
      :show-search="showSearch"
      :show-login="showLogin"
      :show-register="showRegister"
      @open-search="showSearch = true"
      @close-search="showSearch = false"
      @any-click="showCategories = false"
    />

    <slot />
    <FooterDesktop v-if="!tablet" />

    <LayoutNotifications />

    <SearchMobile
      v-if="showSearch"
      @close-search="showSearch = false"
    />
    <LoginModal
      v-if="showLogin"
      @close-login-window="closeWindowLogin()"
      @open-register-window="; (showRegister = true), (showLogin = false)"
    />
    <RegisterModal
      v-if="showRegister"
      @close-register-window="closeWindowRegister()"
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
import SearchMobile from '@/components/mobile/SearchMobile.vue';
import CategoriesMobile from '@/components/mobile/CategoriesMobile.vue';

export default {
  components: {
    HeaderMobile, NavigationMobile, NavigationDesktop, HeaderDesktop, FooterDesktop, SearchMobile, CategoriesMobile,
  },
  setup() {
    const authStore = auth();
    const showCategories = ref(false);
    const showLogin = ref(false);
    const showRegister = ref(false);
    const showSearch = ref(false);

    onMounted(async () => {
      await authStore.CHECK_AUTH();
    });
    return {
      showCategories,
      authStore,
      showLogin,
      showRegister,
      showSearch,
      tablet: computed(() => media().MEDIA_TABLET),
    };
  },
  watch: {
    '$route.query.login': {
      handler() {
        if (Object.hasOwn(this.$route.query, 'login')) {
          this.showLogin = true;
          this.showRegister = false;
          this.showSearch = false;
        }
      },
      deep: true,
    },
    '$route.query.slug': {
      handler() {
        if (Object.hasOwn(this.$route.query, 'slug')) {
          this.showLogin = false;
          this.showRegister = false;
          this.showSearch = false;
        }
      },
      deep: true,
    },
    '$route.query.search': {
      handler() {
        if (Object.hasOwn(this.$route.query, 'search')) {
          this.showLogin = false;
          this.showRegister = false;
          this.showSearch = true;
        }
      },
      deep: true,
    },
    '$route.path': {
      handler() {
        if (this.$route.path.includes('rules')) {
          this.showLogin = false;
          this.showRegister = false;
          this.showSearch = false;
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

    if (Object.hasOwn(this.$route.query, 'search')) {
      this.showSearch = true;
    }
  },
  methods: {
    closeWindowLogin() {
      this.showLogin = false;
      this.$router.replace({ query: null });
    },
    closeWindowRegister() {
      this.showRegister = false;
      this.$router.replace({ query: null });
    },
  },
};
</script>

<style lang="scss" scoped>
.slide-enter-active {
  animation: slide-in 0.5s;
}

.slide-leave-active {
  animation: slide-in 0.5s reverse;
}

@keyframes slide-in {
  0% {
    opacity: 0;
    transform: translateX(100%);
  }

  100% {
    opacity: 1;
    transform: translateX(0);
  }
}

.layout {
  position: relative;
}
</style>
