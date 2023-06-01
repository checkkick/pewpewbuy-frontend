<template>
  <button class="back">
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M20.125 5.9375L10.2292 15.8333L20.125 25.7292"
        stroke="white"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  </button>
</template>

<script setup></script>

<style lang="scss" scoped>
.back {
  @include defineBtnPrimary(1rem, 100%, 15px, 15px);
  position: fixed;
  bottom: 7rem;
  left: 30px;
  z-index: 1;

  @media (max-width: 750px) {
    left: 15px;

    & svg {
      width: 20px;
      height: 20px;
    }
  }
}
</style>
