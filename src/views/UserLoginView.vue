<script setup lang="ts">
import {ref} from "vue";
import {searchUserByTags, userLogin} from "@/api/user";
import {useUserStore} from "@/stores/user";
import router from "@/router";
import {showFailToast} from "vant";

const ICP_BEI_AN_HAO = import.meta.env.VITE_ICP_BEI_AN_HAO
const GONG_AN_BEI_AN_HAO = import.meta.env.VITE_GONG_AN_BEI_AN_HAO
const GONG_AN_BEI_AN_WEB = import.meta.env.VITE_GONG_AN_BEI_AN_WEB
const userStore = useUserStore()
/**
 * 登录信息
 */
const userAccount = ref('');
const userPassword = ref('');
const onSubmit = async () => {
  const res = await userLogin(userAccount.value, userPassword.value);
  if (res.data.data === null) showFailToast('登录失败');
  userStore.setUser(res.data.data)
  await router.replace('/main')
};

const onClickLeft = () => history.back();
</script>

<template>
  <van-nav-bar title="登录" @click-left="onClickLeft"/>
  <van-form @submit="onSubmit">
    <van-cell-group inset>
      <van-field
          v-model="userAccount"
          name="用户名"
          label="用户名"
          placeholder="用户名"
          :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <van-field
          v-model="userPassword"
          type="password"
          name="密码"
          label="密码"
          placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]"
      />
    </van-cell-group>
    <van-cell is-link value="没有账号？跳转注册！" @click="router.push({name: 'register'})"/>
    <div style="margin: 16px;">
      <van-button round block type="primary" native-type="submit">
        登录
      </van-button>
    </div>
  </van-form>
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