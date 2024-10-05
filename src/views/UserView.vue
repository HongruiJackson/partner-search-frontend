<script setup lang="ts">
import {onMounted, type Ref, ref, type UnwrapRef} from "vue";
import router from "@/router";
import {useUserStore} from "@/stores/user";
import type {UserType} from "@/models/user";
import {getCurrentUser, logout} from "@/api/user";

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

/**
 * 退出登录，回到登录界面
 */
const loginPage = async () => {
  userStore.setUser(null) //清除store数据保存的用户信息
  await logout()
  await router.push({name: 'login'})
}

onMounted(async ()=>{
  const res = await getCurrentUser()
  user.value = res.data.data
  userStore.setUser(user.value)
})

const toLogin = ()=> {
  router.push({name: 'login'})
}
</script>

<template>
  <van-empty image="error" description="未登录" v-if="!user">
    <van-button round type="primary" class="bottom-button" @click="toLogin">跳转登录</van-button>
  </van-empty>
  <div v-else>
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
    <van-cell title="标签" is-link value="标签管理" @click="router.push({name: 'register'})"/>
    <van-space :size="20" wrap style="padding-left: 20px;padding-top: 10px;padding-right:20px">
      <van-tag type="primary" size="large" v-for="tag in user.tags" :key="tag">{{tag}}</van-tag>
    </van-space>


    <div style="padding: 12px">
      <van-button block type="primary" @click="loginPage">退出登录</van-button>
    </div>
  </div>
</template>

<style scoped>
.bottom-button {
  width: 160px;
  height: 40px;
}
</style>