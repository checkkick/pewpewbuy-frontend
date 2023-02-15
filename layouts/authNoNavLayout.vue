<template>
  <div class="layout">
    <Header />
    <slot />
    <Footer />

    <LayoutNotifications />
  </div>
</template>

<script>
</script>

<style lang="scss" scoped>
.layout {
  position: relative;
}
</style>
