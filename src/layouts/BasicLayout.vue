<script setup lang="ts">
import {showToast} from "vant";

const onClickLeft = () => history.back();
const onClickRight = () => showToast('按钮');
</script>

<template>
  <van-nav-bar
      title="标题"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
  >
    <template #right>
      <slot name="right-option"></slot>
    </template>
  </van-nav-bar>

  <!-- 插槽接router-view页面  -->
  <slot name="content"></slot>
  <!-- 底部导航栏-->
  <van-tabbar route>
    <van-tabbar-item replace to="/home" icon="home-o">Home</van-tabbar-item>
    <van-tabbar-item replace to="/team" icon="friends-o">Team</van-tabbar-item>
    <van-tabbar-item replace to="/user" icon="search">User</van-tabbar-item>
  </van-tabbar>
</template>

<style scoped>

</style>