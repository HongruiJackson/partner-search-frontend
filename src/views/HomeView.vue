<script setup lang="ts">
import {onMounted, type Ref, ref} from "vue";
import UserCard from "@/components/UserCard.vue";
import mockList from "@/mock/UserList";

let userList: Ref = ref([]);
// const userList = mockUserList;
onMounted(async () => {
  // const res = await searchUserByTags(tags);
  // console.log(res)
  userList.value = mockList
})

</script>

<template>
  <van-empty image="search" description="搜索结果为空" v-if="userList.length < 1" />
  <div v-for="user in userList.values()" v-bind:key="user.userAccount" v-else>
    <UserCard :user = user />
  </div>
</template>

<style scoped>

</style>