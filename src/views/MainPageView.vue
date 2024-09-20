<script setup lang="ts">

import BasicLayout from "@/layouts/BasicLayout.vue";
import {RouterView} from "vue-router";
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