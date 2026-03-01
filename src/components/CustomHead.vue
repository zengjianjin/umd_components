<template>
  <div class="customHead">
    <img v-if="argument?.leftUrl?.url" :src="argument?.leftUrl?.url" class="left"
         @click="jumpUrl(argument?.leftUrl?.jumpUrl)"/>
    <div class="center" @click="jumpUrl(argument?.title?.jumpUrl)">{{ argument?.title?.text }}</div>
    <img v-if="argument?.rightUrl?.url" :src="argument?.rightUrl?.url" class="right"
         @click="jumpUrl(argument?.rightUrl?.jumpUrl)"/>
  </div>
</template>

<script setup>
import { reactive, watch } from 'vue'
import { configuration } from '../config/configuration.js'
import pic from '../assets/vite.svg'

const props = defineProps({
  data: {
    title: {
      type: Object,
      default: () => {
        return {
          text: 'title',
          jumpUrl: '',
        }
      },
    },
    leftUrl: {
      type: Object,
      default: () => {
        return {
          url: pic,
          jumpUrl: '',
        }
      },
    },
    rightUrl: {
      type: Object,
      default: () => {
        return {
          url: pic,
          jumpUrl: '',
        }
      },
    },
    sticky: {
      type: Boolean,
      default: false,
    },
  },
})
const jumpUrl = url => {
  url && (window.location.href = url)
}
const argument = reactive({
  title: props?.data?.title ?? {
    text: 'title',
    jumpUrl: '',
  },
  leftUrl: props?.data?.leftUrl ?? {
    url: pic,
    jumpUrl: '',
  },
  rightUrl: props?.data?.rightUrl ?? {
    url: pic,
    jumpUrl: '',
  },
  sticky: props?.data?.sticky ?? false,
})
const description = reactive({
  title: {
    text: {
      type: configuration.TEXT,
      label: '标题',
    },
    jumpUrl: {
      type: configuration.URL,
      label: '跳转链接',
    },
  },
  leftUrl: {
    url: {
      type: configuration.URL,
      label: '左侧图片',
    },
    jumpUrl: {
      type: configuration.URL,
      label: '左侧跳转链接',
    },
  },
  rightUrl: {
    url: {
      type: configuration.URL,
      label: '右侧图片',
    },
    jumpUrl: {
      type: configuration.URL,
      label: '右侧跳转链接',
    },
  },
  sticky: {
    value: {
      type: configuration.RADIO,
      label: '是否固定在顶部',
      data: [
        { label: '是', value: true },
        { label: '否', value: false },
      ],
    },
  },
})
defineExpose({
  argument,
  description,
})
watch(() => props.data, n => {
  console.log(1321)
  for (const nKey in n) {
    argument[nKey] = n[nKey]
  }
}, { immediate: true, deep: true })
</script>

<style scoped>
.customHead {
  width: 100%;
  height: 30px;
  background-color: #f5f5f5;
  display: flex;
  align-items: center;
}

.center {
  flex: 1;
  text-align: center;
  font-size: 16px;
  color: #333333;
}

.left, .right {
  width: 30px;
  height: 30px;
}
</style>
