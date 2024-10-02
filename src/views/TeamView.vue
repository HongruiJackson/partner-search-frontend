<script setup lang="ts">
import {useRouter} from "vue-router";

const router = useRouter()

// 跳转到创建队伍页面
const addTeam = () => {
  router.push({name: 'teamAdd'})
}

</script>

<template>
  <div id="teamPage">
    <van-button type="primary" @click="addTeam">创建队伍</van-button>
  </div>
</template>

<style scoped>

</style>