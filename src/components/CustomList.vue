<template>
  <div class="list">
    <div v-for="item in argument.list">
      <img :src="item.url" alt="">
      <div>
        <p>{{ item.title }}</p>
        <p>{{ item.desc }}</p>
      </div>
      <a :href="item.jumpUrl">{{ item.jumpLabel }}</a>
    </div>
  </div>
</template>

<script setup>

// Define props
import { reactive, watch } from 'vue'
import { configuration } from '@/config/configuration.js'
import pic from '../assets/vite.svg'

const props = defineProps({
  data: {
    list: {
      type: Array,
      default: () => [
        {
          url: pic,
          title: '标题',
          desc: '描述',
          jumpUrl: 'https://www.baidu.com',
          jumpLabel: '跳转>',
        }],
    },
  },
})
const argument = reactive({
  list: props?.data?.list ?? [
    {
      url: pic,
      title: '标题',
      desc: '描述',
      jumpUrl: 'https://www.baidu.com',
      jumpLabel: '跳转>',
    }, {
      url: pic,
      title: '标题',
      desc: '描述',
      jumpUrl: 'https://www.baidu.com',
      jumpLabel: '跳转>',
    }],
})
const description = reactive({
  list: {
    type: configuration.ARRAY,
    data: {
      url: {
        type: configuration.URL,
        label: '图片地址',
      },
      title: {
        type: configuration.TEXT,
        label: '标题',
      },
      desc: {
        type: configuration.TEXT,
        label: '介绍',
      },
      jumpUrl: {
        type: configuration.URL,
        label: '跳转链接',
      },
      jumpLabel: {
        type: configuration.TEXT,
        label: '跳转名称',
      },
    },
  },
})
defineExpose({
  argument,
  description,
})
watch(() => props.data, n => {
  for (const nKey in n) {
    argument[nKey] = n[nKey]
  }
}, { immediate: true, deep: true })
</script>

<style scoped>
p {
  margin: 0;
}

.list {
}

.list > div {
  display: flex;
  align-items: center;
  padding: 5px 10px;
}

.list > div > div {
  flex: 1;
  padding-left: 20px;
}

img {
  width: 50px;
  height: 50px;
}
</style>
