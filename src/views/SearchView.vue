<script setup lang="ts">
import {showToast} from "vant";
import {ref} from "vue";

const value = ref('');
const onSearch = (val: string) => showToast(val);
const onCancel = () => history.back();

//
const activeIds = ref([]);
const activeIndex = ref(0);
const items = [
  {
    text: '浙江',
    children: [
      { text: '杭州', id: '杭州' },
      { text: '温州', id: '温州' },
    ],
  },
  {
    text: '江苏',
    children: [
      { text: '南京', id: '南京' },
      { text: '无锡', id: '无锡' },
      { text: '徐州', id: '徐州' },
    ],
  },
  {
    text: '四川',
    children: [
      { text: '成都', id: '成都' },
      { text: '攀枝花', id: '攀枝花' },
      { text: '达州', id: '达州' },
    ],
  }
];
// 移除标签
const doClose = (chosenTag: string) => {
  activeIds.value = activeIds.value.filter(item => {
    return item !== chosenTag;
  })
}
</script>

<template>
  <form action="/">
    <van-search
        v-model="value"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="onCancel"
    />
  </form>
  <van-divider content-position="left">已选标签</van-divider>
  <div v-if="activeIds.length === 0">请选择标签</div>

  <van-row :gutter="[20,20]">
    <van-col v-for = "chosenTag in activeIds" v-bind:key = "chosenTag">
      <van-tag closeable size="medium" type="primary" @close="doClose(chosenTag)">
        {{chosenTag}}
      </van-tag>
    </van-col>
  </van-row>
  <van-divider content-position="left">选择标签</van-divider>
  <van-tree-select
      v-model:active-id="activeIds"
      v-model:main-active-index="activeIndex"
      :items="items"
  />


</template>

<style scoped>

</style>