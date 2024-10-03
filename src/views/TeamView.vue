<script setup lang="ts">
import {useRouter} from "vue-router";
import {onMounted, ref, type Ref} from "vue";
import {getRecommendUserList} from "@/api/user";
import TeamCard from "@/components/TeamCard.vue";
import {listTeam} from "@/api/team";

const router = useRouter()

// 跳转到创建队伍页面
const addTeam = () => {
  router.push({name: 'teamAdd'})
}

let teamList: Ref = ref([]);
const list = ref([]);
const loading = ref(false);
const finished = ref(false);
const pageSize = 20; //单页最大
onMounted(async () => {
  await onLoad()
})
const onLoad = async () => {
  const res = await listTeam({pageNum:list.value.length/20+1,pageSize:pageSize});
  teamList.value = res.data.data.records
  teamList.value.forEach((team)=>{
    list.value.push(team)
  })
  // 加载状态结束
  loading.value = false;
  // 数据全部加载完成
  if (list.value.length >= res.data.data.total) {
    finished.value = true;
  }
};

</script>

<template>
  <div id="teamPage">
    <van-button type="primary" @click="addTeam">创建队伍</van-button>
  </div>
  <van-empty image="search" description="主页丢失" v-if="list.length < 1" />
  <van-list
      v-model:loading="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      v-else
  >
    <div v-for="team in list.values()" v-bind:key="team.id" >
      <TeamCard :team = team />
    </div>
  </van-list>
</template>

<style scoped>

</style>