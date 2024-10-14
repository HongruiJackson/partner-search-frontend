<script setup lang="ts">
import {showToast} from "vant";
import {onMounted, ref} from "vue";
import router from "@/router";
import {routes} from "vue-router/auto-routes";
const onClickLeft = () => history.back();
const onClickRight = () => router.push('/search');

const BEIANHAO = import.meta.env.VITE_BEIANHAO

// 更改导航栏的标题
const pageTitle = ref('Home')

const DEFAULT_TITLE = '伙伴匹配';
const title = ref(DEFAULT_TITLE)
const onChange = (index: string) => {pageTitle.value = index}; //vant组件包含的事件

</script>

<template>
  <van-nav-bar
      v-bind:title=pageTitle
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
  >
    <template #right v-if="pageTitle === 'Home'">
      <slot name="right-option"></slot>
    </template>
  </van-nav-bar>

  <!-- 插槽接router-view页面  -->
  <div id="content">
    <slot name="content"></slot>
  </div>

  <!-- 底部导航栏 -->
  <van-tabbar route @change="onChange">
    <van-tabbar-item replace to="/home" icon="home-o" name="Home">Home</van-tabbar-item>
    <van-tabbar-item replace to="/team" icon="friends-o" name="Team">Team</van-tabbar-item>
    <van-tabbar-item replace to="/user" icon="contact-o" name="User">User</van-tabbar-item>
  </van-tabbar>

  <!-- 底部链接 -->
  <footer>
    <a href="http://beian.miit.gov.cn/">{{ BEIANHAO }}</a>
  </footer>
</template>

<style scoped>
#content {
  padding-bottom: 50px;
}

/* 确保tabbar固定在底部 */
.van-tabbar--fixed {
  bottom: 20px;
}

/* 将备案链接放置在tabbar下方 */
footer a {
  position: fixed;
  bottom: 0;
  font-size: 12px; /* 根据需要调整字体大小 */
  height: 20px;
  color: #999; /* 文字颜色 */
  width: 100%;
  text-align: center; /* 水平居中文本 */
  background: #fff;
}
</style>