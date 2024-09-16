<script setup lang="ts">
import {ref} from "vue";
import {useRoute} from "vue-router";


const route = useRoute();
const editUser = ref({
  editKey: route.query.editKey,
  currentValue: route.query.currentValue,
  title: route.query.title
})
const onSubmit = () => {
  console.log('submit', editUser.value);
};


</script>

<template>
  <van-form @submit="onSubmit">
    <van-cell-group inset>
      <van-field v-if="editUser.editKey!='gender'"
          v-model="editUser.currentValue"
          :name="editUser.editKey"
          :label="editUser.title"
          placeholder="输入内容"
          :rules="[{ required: true, message: '填写修改内容' }]"
      />
      <van-field name="radio" label="单选框" v-else>
        <template #input>
          <van-radio-group v-model="editUser.currentValue" direction="horizontal">
            <van-radio name=0>男</van-radio>
            <van-radio name=1>女</van-radio>
          </van-radio-group>
        </template>
      </van-field>

    </van-cell-group>
    <div style="margin: 16px;">
      <van-button round block type="primary" native-type="submit">
        提交
      </van-button>
    </div>
  </van-form>
</template>

<style scoped>

</style>