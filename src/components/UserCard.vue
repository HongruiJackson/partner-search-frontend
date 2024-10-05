<script setup lang="ts">
import type {UserType} from "@/models/user";
import type {PropType} from "vue";
import {showToast} from "vant";
import {ref} from "vue";

defineProps({
  user: {
    type: Object as PropType<UserType>,
    required: true,
  },
})
const show = ref(false);
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
    <template #bottom>
      <div v-if="user.phone!=null">
        {{ `联系电话: ${user.phone}` }}
      </div>
      <div v-if="user.email!=null">
        {{ `联系邮箱: ${user.email}` }}
      </div>
    </template>
<!--    <template #footer>-->
<!--      <van-button size="small" type="primary" @click="show = true">-->
<!--        联系我-->
<!--      </van-button>-->
<!--      <van-popup v-model:show="show" round :style="{ padding: '102px' }" >-->

<!--      </van-popup>-->
<!--    </template>-->
  </van-card>
  <div style="height: 10px"/>
</template>

<style scoped>

</style>