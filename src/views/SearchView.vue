<script setup lang="ts">
import {onMounted, ref} from "vue";
import router from "@/router";
import {getCompletedTagList} from "@/api/tag";

// 选中标签的标记
const activeIds = ref([]);
const activeIndex = ref(0);
// 移除标签
const doClose = (chosenTag: string) => {
  activeIds.value = activeIds.value.filter(item => {
    return item !== chosenTag;
  })
}
const originalTagList = ref([])
onMounted(async ()=>{
  const res = await getCompletedTagList()
  originalTagList.value = res.data.data
})

const onCancel = () => {
  searchText.value = '';
  tagList.value = originalTagList.value;
}

const searchText = ref('');
let tagList = ref(originalTagList);
const onSearch = () => {
  tagList.value = originalTagList.value.map(parentTag => {
    const tempChildren = [...parentTag.children];
    const tempParentTag = {...parentTag};
    tempParentTag.children = tempChildren.filter(item => item.text.includes(searchText.value));
    return tempParentTag;
  });

}

/**
 * 执行搜索
 */
const doSearchResult = () => {
  router.push({
    path: '/user/list',
    query: {
      tags: activeIds.value
    }
  })
}
</script>

<template>
  <form action="/">
    <van-search
        v-model="searchText"
        show-action
        placeholder="请输入要查询的标签"
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
      :items="tagList"
  />

  <div style="padding: 12px">
    <van-button block type="primary" @click="doSearchResult">搜索</van-button>
  </div>


</template>

<style scoped>

</style>