<script setup lang="ts">
import {onMounted, type Ref, ref, type UnwrapRef} from "vue";
import router from "@/router";
import {useUserStore} from "@/stores/user";
import type {UserType} from "@/models/user";
import {getCurrentUser} from "@/api/user";

const userStore = useUserStore()
const user: Ref<UserType>= ref({})

const toEdit= (editKey: string, currentValue: UnwrapRef<UnwrapRef<Ref<UserType>>["profile"]> | undefined | number, title: string | null)=> {
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

onMounted(async ()=>{
  const res = await getCurrentUser()
  user.value = res.data.data
  userStore.setUser(user.value)
})
</script>

<template>
  <van-cell title="昵称" is-link :value="user.username==null?'未填写':user.username" @click="toEdit('username',user.username,'昵称')"/>
  <van-cell title="账号" :value="user.userAccount==null?'未填写':user.userAccount"/>
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