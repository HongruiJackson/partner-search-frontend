<script setup lang="ts">
import type {UserType} from "@/models/user";
import type {PropType} from "vue";

defineProps({
  user: {
    type: Object as PropType<UserType>,
    required: true,
  },
})
</script>

<template>
  <van-card
      desc="描述信息"
      :title=user.userAccount
      thumb="https://fastly.jsdelivr.net/npm/@vant/assets/ipad.jpeg"
  >
    <template #tags>
      <van-tag plain type="primary" v-for="tag in user.tags">{{tag}}</van-tag>
      <div>{{user}}</div>
    </template>
  </van-card>

</template>

<style scoped>

</style>