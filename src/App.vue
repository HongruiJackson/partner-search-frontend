<script setup lang="ts">
import { RouterView } from 'vue-router'
import BasicLayout from "@/layouts/BasicLayout.vue";
</script>

<template>

  <BasicLayout>
    <template v-slot:right-option>
      <van-icon name="search" size="18" />
    </template>
    <template v-slot:content>
      <RouterView />
    </template>
  </BasicLayout>


</template>

<style scoped>

</style>
