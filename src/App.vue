<template>
  <router-view v-slot="{ Component }">
    <keep-alive exclude="">
      <component :is="Component" />
    </keep-alive>
  </router-view>
</template>

<style lang="scss"></style>
