<script setup lang="ts">
import {ref} from "vue";
import {showFailToast, showSuccessToast, showToast} from "vant";
import {addTeam} from "@/api/team";
import router from "@/router";

const initFormData = {
  "name": "",
  "description": "",
  "maxNum": 0,
  "expireTime": "",
  "teamStatus": 0,
  "teamPassword": ""
}
// 需要用户填写的表单数据
const addTeamData = ref({...initFormData})

//日期相关
const currentDateTime = new Date();
const currentYear = currentDateTime.getFullYear().toString()
const currentMonth = (currentDateTime.getMonth()+1).toString()
const currentDay = currentDateTime.getDate().toString()
const currentHour = currentDateTime.getHours().toString()
const currentMinute = currentDateTime.getMinutes().toString()
const currentMilliseconds = currentDateTime.getMilliseconds().toString()

const currentDate = ref([currentYear,currentMonth,currentDay]);
const currentTime = ref([currentHour,currentMinute,currentMilliseconds]);

const minDate = new Date();
let maxDate =  new Date(minDate.getFullYear()+1,minDate.getMonth(),minDate.getDate());


const onCancel = () => {
  showPicker.value = false;
};

// 日期时间组件控制相关
const columnsType = ['hour', 'minute', 'second'];
const showPicker = ref(false);
const onConfirm = () => {
  addTeamData.value.expireTime = `${currentDate.value.join('-')} ${currentTime.value.join(':')}`
  showPicker.value = false;
};

const onSubmit = async () => {
  const res = await addTeam(addTeamData.value)
  if (res.data.code === 0) {
    showSuccessToast("创建成功")
    await router.back()
  }
  else showFailToast(res.data.description);
};
</script>

<template>
  <div id="teamAddPage">
    <van-form @submit="onSubmit">
      <van-cell-group inset>
        <van-field
            v-model="addTeamData.name"
            name="name"
            label="队伍名称"
            placeholder="请输入队伍名称"
            maxlength="20"
            show-word-limit
            :rules="[{ required: true, message: '请输入队伍名称' }]"
        />
        <van-field
            v-model="addTeamData.description"
            rows="2"
            autosize
            label="队伍描述"
            type="textarea"
            maxlength="512"
            placeholder="请输入队伍描述"
            show-word-limit
        />
        <van-field name="maxNum" label="最大人数">
          <template #input>
            <van-stepper v-model="addTeamData.maxNum" min="2" max="20"/>
          </template>
        </van-field>
        <van-field
            v-model="addTeamData.expireTime"
            is-link
            readonly
            name="datePicker"
            label="过期时间"
            placeholder="点击选择时间"
            :rules="[{ required: true, message: '请选择过期时间' }]"
            @click="showPicker = true"
        />
        <van-popup v-model:show="showPicker" position="bottom">
          <van-picker-group
              title="过期时间"
              :tabs="['选择日期', '选择时间']"
              @confirm="onConfirm"
              @cancel="onCancel"
          >
            <van-date-picker
                v-model="currentDate"
                :min-date="minDate"
                :max-date="maxDate"
            />
            <van-time-picker
                v-model="currentTime"
                :columns-type="columnsType"
            />
          </van-picker-group>
        </van-popup>




        <van-field name="radio" label="队伍状态">
          <template #input>
            <van-radio-group v-model="addTeamData.teamStatus" direction="horizontal">
              <van-radio :name=0>公开</van-radio>
              <van-radio :name=1>私有</van-radio>
              <van-radio :name=2>加密</van-radio>
            </van-radio-group>
          </template>
        </van-field>
        <van-field
            v-if="addTeamData.teamStatus==2"
            v-model="addTeamData.teamPassword"
            type="password"
            name="teamPassword"
            label="队伍密码"
            placeholder="请输入队伍密码"
            maxlength="32"
            show-word-limit
            :rules="[{ required: true, message: '请输入队伍密码' }]"
        />
      </van-cell-group>
      <div style="margin: 16px;">
        <van-button round block type="primary" native-type="submit">
          提交
        </van-button>
      </div>
    </van-form>

  </div>
</template>

<style scoped>

</style>