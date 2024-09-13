<script setup lang="ts">
import {ref} from "vue";

const user =  {

  id: 1,
  userAccount: 'jackson',
  tags: [
    "Java",
    "Python",
    "JS"
  ],
  username: null,
  avatarUrl: null,
  gender: 0,
  phone: null,
  email: null,
  userStatus: null,
  userRole: 1,

}
</script>

<template>
  <van-cell title="昵称" is-link :value="user.username==null?'未填写':user.username"/>
  <van-cell title="账号" is-link :value="user.userAccount==null?'未填写':user.userAccount"/>
  <van-cell title="头像" is-link>
    <img width="46px" :src="user.avatarUrl==null?'src/assets/logo.svg':user.avatarUrl" alt="加载失败">
  </van-cell>
  <van-cell title="性别" is-link :value="user.gender?'女':'男'"/>
  <van-cell title="电话" is-link :value="user.phone==null?'未填写':user.phone"/>
  <van-cell title="邮箱" is-link :value="user.email==null?'未填写':user.email"/>
</template>

<style scoped>

</style>