<script setup lang="ts">
import {onMounted, ref} from "vue";
import {useRoute} from "vue-router";
import UserCard from "@/components/UserCard.vue";
import {searchUserByTags} from "@/api/user";
const route = useRoute();
const tags = route.query.tags

let userList = ref([]);
// const userList = mockUserList;
onMounted(async () => {
  const res = await searchUserByTags(tags);
  // console.log(res)
  userList.value = res.data.data
})

</script>

<template>
  <div v-for="user in userList.values()" v-bind:key="user.userAccount">
    <UserCard :user = user />
  </div>
</template>

<style scoped>

</style>