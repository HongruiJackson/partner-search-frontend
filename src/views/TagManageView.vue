<script setup lang="ts">
import {onMounted, ref} from "vue";
import router from "@/router";
import {getCompletedTagList} from "@/api/tag";
import {useRoute} from "vue-router";
import {updateUser} from "@/api/user";
import {showFailToast, showSuccessToast} from "vant";

// 选中标签的标记
const route = useRoute()
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
  tagList.value = JSON.parse(JSON.stringify(originalTagList.value));

  if (route.query.currentActiveIds != null) {
    activeIds.value = route.query.currentActiveIds
  }

})

const onCancel = () => {
  searchText.value = '';
  tagList.value= originalTagList.value;
  activeIds.value = []
}

const searchText = ref('');
let tagList = ref([]);
const onSearch = () => {
  tagList.value = originalTagList.value.map(parentTag => {
    const tempChildren = [...parentTag.children];
    const tempParentTag = {...parentTag};
    tempParentTag.children = tempChildren.filter(item => item.text.includes(searchText.value));
    return tempParentTag;
  });

}

const refresh = () =>  {
  if (searchText.value == '') {
    tagList.value= originalTagList.value;
  } else {
    onSearch()
  }
}


/**
 * 执行搜索
 */
const doSearchResult = async () => {
  const res = await updateUser({"tags": activeIds.value})
  if (res.data.code == 0) {
    showSuccessToast("更新成功")
    router.back()
  } else {
    showFailToast(res.data.message)
  }
}
</script>

<template>
  <van-empty image="search" description="页面丢失" v-if="originalTagList.length < 1" />
  <form action="/">
    <van-search
        v-model="searchText"
        show-action
        placeholder="请输入要查询的标签"
        @search="onSearch"
        @cancel="onCancel"
        @update:model-value="refresh"
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
    <van-button block type="primary" @click="doSearchResult">更新标签</van-button>
  </div>


</template>

<style scoped>

</style>