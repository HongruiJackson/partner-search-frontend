<script setup lang="ts">
import {ref} from "vue";
import {searchUserByTags, userLogin} from "@/api/user";
import {useUserStore} from "@/stores/user";
import router from "@/router";
import {showFailToast} from "vant";


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
  <van-nav-bar left-arrow title="登录" @click-left="onClickLeft"/>
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
    <div style="margin: 16px;">
      <van-button round block type="primary" native-type="submit">
        提交
      </van-button>
    </div>
  </van-form>

</template>

<style scoped>

</style>