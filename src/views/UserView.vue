<script setup lang="ts">
import {ref} from "vue";
import router from "@/router";

const user =  {

  id: 1,
  userAccount: 'jackson',
  tags: [
    "Java",
    "Python",
    "JS"
  ],
  profile: null,
  username: null,
  avatarUrl: null,
  gender: 0,
  phone: null,
  email: null,
  userStatus: null,
  userRole: 1,

}

const toEdit= (editKey:string, currentValue:string|null|number,title:string|null)=> {
  router.push({
    path: '/user/edit',
    query: {
      editKey,
      currentValue,
      title
    }
  })
}

const tempPush = ()=>{
  router.push('/user/login')
}
</script>

<template>
  <van-cell title="昵称" is-link :value="user.username==null?'未填写':user.username" @click="toEdit('username',user.username,'昵称')"/>
  <van-cell title="账号" is-link :value="user.userAccount==null?'未填写':user.userAccount" @click="toEdit('userAccount',user.userAccount,'账号')"/>
  <van-cell title="简介" is-link :value="user.profile==null?'未填写':user.profile" @click="toEdit('profile',user.profile,'简介')"/>
<!--  <van-cell title="头像" is-link @click="toEdit('avatarUrl',user.avatarUrl,'头像')">-->
  <van-cell title="头像">
    <img width="46px" :src="user.avatarUrl==null?'src/assets/logo.svg':user.avatarUrl" alt="加载失败">
  </van-cell>
  <van-cell title="性别" is-link :value="user.gender?'女':'男'" @click="toEdit('gender',user.gender,'性别')"/>
  <van-cell title="电话" is-link :value="user.phone==null?'未填写':user.phone" @click="toEdit('phone',user.phone,'电话')"/>
  <van-cell title="邮箱" is-link :value="user.email==null?'未填写':user.email" @click="toEdit('email',user.email,'邮箱')"/>

  <div style="padding: 12px">
    <van-button block type="primary" @click="tempPush">to login page temp</van-button>
  </div>
</template>

<style scoped>

</style>