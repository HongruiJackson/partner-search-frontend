<script setup lang="ts">
import {showToast} from "vant";
import {onMounted, ref} from "vue";
import router from "@/router";
import {routes} from "vue-router/auto-routes";
const onClickLeft = () => history.back();
const onClickRight = () => router.push('/search');

const ICP_BEI_AN_HAO = import.meta.env.VITE_ICP_BEI_AN_HAO
const GONG_AN_BEI_AN_HAO = import.meta.env.VITE_GONG_AN_BEI_AN_HAO
const GONG_AN_BEI_AN_WEB = import.meta.env.VITE_GONG_AN_BEI_AN_WEB

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
    <a :href="GONG_AN_BEI_AN_WEB" rel="noreferrer" target="_blank">
      <img src="/GongAnPic.png" alt="GongAnBeiAn" height="12">
      {{GONG_AN_BEI_AN_HAO}}
    </a>
    &nbsp;
    <a href="http://beian.miit.gov.cn/">{{ICP_BEI_AN_HAO}}</a>
  </footer>
</template>

<style scoped>
#content {
  padding-bottom: 50px;
}

/* 确保tabbar固定在底部 */
.van-tabbar--fixed {
  bottom: 18px;
}

/* 将备案链接放置在tabbar下方 */
footer {
  position: fixed;
  bottom:0;
  left:0;
  right:0;
  margin-left:auto;
  margin-right:auto;
  text-align: center;
  width: 100%;
  background: #fff;
}

footer a {
  font-size: 12px; /* 根据需要调整字体大小 */
  height: 12px;
  color: #999; /* 文字颜色 */
  width: 100%;
  text-align: center; /* 水平居中文本 */
  background: #fff;
}
</style>