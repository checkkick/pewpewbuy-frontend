<template>
  <div class="rating">
    <svg
      v-for="item in stars"
      :key="item"
      :width="size"
      height="22"
      viewBox="0 0 24 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12 0L14.6942 8.2918H23.4127L16.3593 13.4164L19.0534 21.7082L12 16.5836L4.94658 21.7082L7.64074 13.4164L0.587322 8.2918H9.30583L12 0Z"
        fill="#F8B94E" />
    </svg>
    <svg
      v-for="item in nonStars"
      :key="item"
      :width="size"
      height="22"
      viewBox="0 0 24 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12 0L14.6942 8.2918H23.4127L16.3593 13.4164L19.0534 21.7082L12 16.5836L4.94658 21.7082L7.64074 13.4164L0.587322 8.2918H9.30583L12 0Z"
        fill="#D9D9D9" />
    </svg>
  </div>
</template>

<script>
export default {
  props: {
    stars: {
      type: Number,
      required: true,
      default: 0,
    },
    size: {
      type: Number,
      default: 24,
    },
  },
  data() {
    return {
      nonStars: 0,
    }
  },
  mounted() {
    this.nonStars = 5 - this.stars
  },
}
</script>

<style lang="scss" scoped>
.rating {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 1px;
}
</style>
