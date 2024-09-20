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
      :desc="user.profile ? user.profile : '未填写简介'"
      :title="user.username ? user.username : '无昵称'"
      :thumb="user.avatarUrl ? user.avatarUrl: 'https://fastly.jsdelivr.net/npm/@vant/assets/ipad.jpeg'"
  >
    <template #tags>
      <van-tag style="margin-right: 8px; margin-top: 4px" plain type="primary" v-for="tag in user.tags" :key="tag">{{tag}}</van-tag>
<!--      <div>{{user}}</div>--><!--用来看数据的-->
    </template>
  </van-card>

</template>

<style scoped>

</style>