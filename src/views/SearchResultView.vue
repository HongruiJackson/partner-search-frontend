<script setup lang="ts">
import {ref} from "vue";
import {useRoute} from "vue-router";
import mockUserList from "@/mock/UserList";
import mockUser from "@/mock/User";
import UserCard from "@/components/UserCard.vue";
const route = useRoute();
const tags = route.query.tags
console.log(tags)

// const userList = ref([]);
const userList = mockUserList;


</script>

<template>
  <div v-for="user in userList">
    <UserCard :user = user />
  </div>
</template>

<style scoped>

</style>