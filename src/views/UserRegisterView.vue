<script setup lang="ts">
import {ref} from "vue";
import {userRegister} from "@/api/user";
import router from "@/router";
import {showFailToast} from "vant";

const ICP_BEI_AN_HAO = import.meta.env.VITE_ICP_BEI_AN_HAO
const GONG_AN_BEI_AN_HAO = import.meta.env.VITE_GONG_AN_BEI_AN_HAO
const GONG_AN_BEI_AN_WEB = import.meta.env.VITE_GONG_AN_BEI_AN_WEB
/**
 * 注册信息
 */
const userAccount = ref('');
const userPassword = ref('');
const checkPassword = ref('')
const onSubmit = async () => {
  const res = await userRegister(userAccount.value, userPassword.value, checkPassword.value);
  if (res.data.code === 40000) showFailToast(res.data.description)
  else {
    await router.replace({name: 'login'})
  }
};

const onClickLeft = () => history.back();
</script>

<template>
  <van-nav-bar left-arrow title="注册" @click-left="onClickLeft"/>
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
      <van-field
          v-model="checkPassword"
          type="password"
          name="确认密码"
          label="确认密码"
          placeholder="确认密码"
          :rules="[{ required: true, message: '请填写密码' }]"
      />
    </van-cell-group>

    <div style="margin: 16px;">
      <van-button round block type="primary" native-type="submit">
        注册
      </van-button>
    </div>
  </van-form>
  <footer>
    <a :href="GONG_AN_BEI_AN_WEB" rel="noreferrer" target="_blank">
      <img src="/GongAnPic.png" alt="GongAnBeiAn" height="15">
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
  font-size: 15px; /* 根据需要调整字体大小 */
  height: 15px;
  color: #999; /* 文字颜色 */
  width: 100%;
  text-align: center; /* 水平居中文本 */
  background: #fff;
}
</style>