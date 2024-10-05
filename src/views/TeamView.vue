<script setup lang="ts">
import {useRouter} from "vue-router";
import {onMounted, ref, type Ref} from "vue";
import {getRecommendUserList} from "@/api/user";
import TeamCard from "@/components/TeamCard.vue";
import {getCreatedTeam, getJoinedTeam, listTeam} from "@/api/team";
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
  await getMyCreatedList()
  await getMyJoinedList()
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

// 标签页控制
const active = ref(0);

// 手风琴控制
const activeName = ref('0');

//我创建的队伍
const myCreatedList = ref([]);
const getMyCreatedList = async () => {
  const res = await getCreatedTeam()
  myCreatedList.value = res.data.data
}
const myJoinedList = ref([]);
const getMyJoinedList = async () => {
  const res = await getJoinedTeam()
  myJoinedList.value = res.data.data
}

// 标签页刷新逻辑
const refreshContent = async () =>{
  if (active.value == 1) {
    await getMyCreatedList()
    await getMyJoinedList()
  } else {
    list.value = []
    searchText.value = ''
    await onLoad(searchText.value)
  }
}
</script>

<template>
  <van-tabs v-model:active="active" @change="refreshContent">
<!--    搜索队伍-->
    <van-tab title="搜索队伍">
      <div id="searchTeam">
        <van-search
            v-model="searchText" placeholder="请输入队伍关键词"
            show-action
            @search="onSearch"
            @cancel="onCancel"
        />
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
    </van-tab>
<!--我的队伍-->
    <van-tab title="我的队伍">
      <van-button type="primary" @click="addTeam">创建队伍</van-button>
<!--      手风琴组件-->
      <van-collapse v-model="activeName" accordion>
        <van-collapse-item title="我创建的队伍" name="1">
          <div v-for="team in myCreatedList.values()" v-bind:key="team.id" >
            <TeamCard :team = team />
          </div>
        </van-collapse-item>
        <van-collapse-item title="我加入的队伍" name="2">
          <div v-for="team in myJoinedList.values()" v-bind:key="team.id" >
            <TeamCard :team = team />
          </div>
        </van-collapse-item>
      </van-collapse>

    </van-tab>
  </van-tabs>


</template>

<style scoped>

</style>