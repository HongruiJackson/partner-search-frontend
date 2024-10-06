<script setup lang="ts">
import {onMounted, type Ref, ref} from "vue";
import UserCard from "@/components/UserCard.vue";
import {getRecommendUserList} from "@/api/user";
import router from "@/router";

let userList: Ref = ref([]);
const list = ref([]);
const loading = ref(false);
const finished = ref(false);
const pageSize = 20; //单页最大
onMounted(async () => {
  await onLoad()
})
const onLoad = async () => {
  const res = await getRecommendUserList(list.value.length/20+1,pageSize);
  userList.value = res.data.data.records
  userList.value.forEach((user)=>{
    list.value.push(user)
  })
  // 加载状态结束
  loading.value = false;
  // 数据全部加载完成
  if (list.value.length >= res.data.data.total) {
    finished.value = true;
  }
};

const test=() =>router.push('/search');
</script>


<template>
  <van-empty image="search" description="主页丢失" v-if="list.length < 1" />
  <van-list
      v-model:loading="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      v-else
  >
    <div v-for="user in list.values()" v-bind:key="user.userAccount" >
      <UserCard :user = user />
    </div>
  </van-list>
  <van-back-top bottom="20vh"/>
</template>

<style scoped>

</style>