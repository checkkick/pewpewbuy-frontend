<template>
  <ul
    v-if="notificationsStore.ALL_NOTIFICATIONS.length > 0"
    class="notification">
    <li
      v-for="item in notificationsStore.ALL_NOTIFICATIONS"
      :key="item.id"
      class="notification__item"
      :class="item.type">
      <h4 class="notification__title">{{ item.title }}</h4>
      <p class="notification__text">
        {{ item.text }}
      </p>
      <button
        class="notification__close"
        @click="notificationsStore.DELETE_NOTIFICATION(item.id)"></button>
    </li>
  </ul>
</template>

<script setup>
import { notifications } from '@/store/notifications'

const notificationsStore = notifications()
</script>

<style lang="scss" scoped>
.notification {
  overflow: auto;
  padding: 15px 0 0 15px;
  height: 60vh;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  gap: 20px;
  list-style: none;
  margin: 0;
  position: fixed;
  top: 300px;
  right: 0;

  &__item {
    max-width: 568px;
    position: relative;
    border: 1px solid $filter-border;
    border-top-left-radius: 15px;
    border-bottom-left-radius: 15px;
    padding: 29px 30px 29px 102px;

    &.alert {
      background: url('@/assets/img/notification-alert.svg') no-repeat 37px
          center / 42px 38px,
        $white;
    }
    &.success {
      background: url('@/assets/img/notification-success.svg') no-repeat 37px
          center / 42px 38px,
        $white;
    }
    &.edit {
      background: url('@/assets/img/notification-edit.svg') no-repeat 37px
          center / 42px 38px,
        $white;
    }
    &.delete {
      background: url('@/assets/img/notification-delete.svg') no-repeat 37px
          center / 42px 38px,
        $white;
    }
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
