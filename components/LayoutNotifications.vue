<template>
  <ul
    v-if="notificationsStore.ALL_NOTIFICATIONS.length > 0"
    class="notification"
  >
    <li
      v-for="item in notificationsStore.ALL_NOTIFICATIONS"
      :key="item.id"
      class="notification__item"
      :class="'notification__item--' + item.type"
    >
      <h4 class="notification__title">
        {{ item.title }}
      </h4>
      <p class="notification__text">
        {{ item.text }}
      </p>
      <button
        class="notification__close"
        @click="notificationsStore.DELETE_NOTIFICATION(item.id)"
      />
    </li>
  </ul>
</template>

<script setup>
import { notifications } from '@/store/notifications';

const notificationsStore = notifications();
</script>

<style lang="scss" scoped>
.notification {
  overflow: auto;
  padding: 15px 0 0 15px;
  max-height: 60vh;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  list-style: none;
  margin: 0;
  position: fixed;
  top: 25%;
  right: 0;

  @media (max-width: 1150px) {
    max-height: 30vh;
    top: 0.5rem;
    margin: 0 auto;
    left: 0;
    right: 0;
    padding: 1rem;
  }

  &__item {
    max-width: 500px;
    position: relative;
    border: 1px solid $filter-border;
    border-top-left-radius: 15px;
    border-bottom-left-radius: 15px;
    padding: 20px 30px 20px 90px;

    @media (max-width: 1150px) {
      margin: 0 auto;
      width: 100%;
      max-width: 600px;
      border-radius: 15px;
    }

    &.notification__item--alert {
      background: url('@/assets/img/notification-alert.svg') no-repeat 37px center / 42px 38px,
        $white;
    }

    &.notification__item--success {
      background: url('@/assets/img/notification-success.svg') no-repeat 37px center / 42px 38px,
        $white;
    }

    &.notification__item--edit {
      background: url('@/assets/img/notification-edit.svg') no-repeat 37px center / 42px 38px,
        $white;
    }

    &.notification__item--delete {
      background: url('@/assets/img/notification-delete.svg') no-repeat 37px center / 42px 38px,
        $white;
    }
  }

  &__close {
    cursor: pointer;
    position: absolute;
    top: -12px;
    left: -12px;
    border-radius: 100%;
    width: 32px;
    height: 32px;
    background-color: $white;
    border: 1px solid $filter-border;

    @media (max-width: 1150px) {
      width: 24px;
      height: 24px;
      left: auto;
      top: -10px;
      right: -10px;
    }

    &::before {
      content: '';
      position: absolute;
      top: 14px;
      left: 7px;
      width: 16px;
      height: 2px;
      background-color: $black;
      transform: rotate(45deg);

      @media (max-width: 1150px) {
        top: 11px;
        left: 5px;
        width: 12px;
        height: 1px;
      }
    }

    &::after {
      content: '';
      position: absolute;
      top: 14px;
      left: 7px;
      width: 16px;
      height: 2px;
      background-color: $black;
      transform: rotate(-45deg);

      @media (max-width: 1150px) {
        top: 11px;
        left: 5px;
        width: 12px;
        height: 1px;
      }
    }
  }

  &__title {
    @include defineFontMontserrat(600, 16px, 20px);
    margin-bottom: 8px;

    @media (max-width: 1150px) {
      font-size: 14px;
      line-height: 15px;
    }
  }

  &__text {
    @include defineFontMontserrat(400, 15px, 18px);

    @media (max-width: 1150px) {
      font-size: 13px;
      line-height: 13px;
    }
  }
}
</style>
