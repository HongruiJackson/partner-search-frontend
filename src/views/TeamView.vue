<script setup lang="ts">
import {useRouter} from "vue-router";
import {onMounted, ref, type Ref} from "vue";
import {getRecommendUserList} from "@/api/user";
import TeamCard from "@/components/TeamCard.vue";
import {listTeam} from "@/api/team";
import {showToast} from "vant";

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
  await onLoad(searchText.value)
})
const onLoad = async (searchTextVal) => {
  const res = await listTeam({pageNum:list.value.length/20+1,pageSize:pageSize,searchText:searchTextVal});
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


// 搜索相关
const searchText = ref('');
const onSearch = async (val) => {
  list.value = []
  await onLoad(val)
};
const onCancel = async () => {
  list.value = []
  searchText.value = ''
  await onLoad(searchText.value)
};
</script>

<template>
  <div id="teamPage">
    <van-search
        v-model="searchText" placeholder="请输入队伍关键词"
        show-action
        @search="onSearch"
        @cancel="onCancel"
    />
    <van-button type="primary" @click="addTeam">创建队伍</van-button>
    <van-empty image="search" description="主页丢失" v-if="list.length < 1" />
    <van-list
        v-model:loading="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad(searchText)"
        v-else
    >
      <div v-for="team in list.values()" v-bind:key="team.id" >
        <TeamCard :team = team />
      </div>
    </van-list>
  </div>
</template>

<style scoped>

</style>