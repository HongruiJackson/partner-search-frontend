<script setup lang="ts">
import type {PropType} from "vue";
import type {TeamType} from "@/models/team";
import {useUserStore} from "@/stores/user";
import {ref} from "vue";
import {deleteTeam, joinTeam, quitTeam} from "@/api/team";
import {showFailToast, showSuccessToast} from "vant";

// pinia存储的用户状态
const userStore = useUserStore()
const currentUser = userStore.getUser()

// 对外接收的参数
defineProps({
  team: {
    type: Object as PropType<TeamType>,
    required: true,
  },
})

/**
 * 加入队伍
 */
const joinTeamId = ref(0);
const password = ref('');
  // 弹出框控制
const showPasswordDialog = ref(false);
const preJoinTeam = (team:TeamType)=>{
  joinTeamId.value = team.id;
  if (team.teamStatus === 0) {
    doJoinTeam()
  } else {
    showPasswordDialog.value = true;
  }
}
const doJoinCancel = () => {
  joinTeamId.value = 0;
  password.value = '';
}

const doJoinTeam = async () => {
  if (!joinTeamId.value) {
    return;
  }
  const res = await joinTeam(joinTeamId.value,password.value);
  if (res.data.code == 0) {
    showSuccessToast('加入成功')
    doJoinCancel()
  }
  else showFailToast('加入失败')

}

// 更新队伍
const doUpdateTeam = (id:number)=>{

}

// 退出队伍
const doQuitTeam = async (id:number)=>{
  const res = await quitTeam(id)
  if (res.data.code == 0) {
    showSuccessToast('退出成功')
  }
  else showFailToast('退出失败')
}

// 解散队伍
const doDeleteTeam = async (id:number) =>{
  const res = await deleteTeam(id)
  if (res.data.code == 0) {
    showSuccessToast('删除成功')
  }
  else showFailToast('删除失败')
}
</script>

<template>
  <van-card
      :desc="team.description ? team.description : '未填写队伍描述'"
      :title="team.name ? team.name : '未填写队伍名称'"
  >
    <template #tags>
      <van-tag plain type="primary" v-if="team.teamStatus===0">公开</van-tag>
      <van-tag plain type="success" v-else-if="team.teamStatus===1">私有</van-tag>
      <van-tag plain type="danger" v-else>加密</van-tag>
    </template>

    <template #bottom>
      <div>
        {{ `队伍人数: ${team.hasJoinNum}/${team.maxNum}` }}
      </div>
      <div v-if="team.expireTime">
        {{ '过期时间: ' + team.expireTime }}
      </div>
    </template>

    <template #footer>
      <van-button size="small" type="primary" v-if="team.userId !== currentUser?.id && !team.hasJoin" plain
                  @click="preJoinTeam(team)">
        加入队伍
      </van-button>
      <van-button v-if="team.userId === currentUser?.id" size="small" plain
                  @click="doUpdateTeam(team.id)">更新队伍
      </van-button>
      <!-- 仅加入队伍可见 -->
      <van-button v-if="team.userId !== currentUser?.id && team.hasJoin" size="small" plain
                  @click="doQuitTeam(team.id)">退出队伍
      </van-button>
      <van-button v-if="team.userId === currentUser?.id" size="small" type="danger" plain
                  @click="doDeleteTeam(team.id)">解散队伍
      </van-button>
    </template>
  </van-card>
  <div style="height: 10px"/>
  <van-dialog v-model:show="showPasswordDialog" title="请输入密码" show-cancel-button @confirm="doJoinTeam" @cancel="doJoinCancel">
    <van-field v-model="password" placeholder="请输入密码"/>
  </van-dialog>
</template>

<style scoped>

</style>