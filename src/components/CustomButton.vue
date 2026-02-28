<template>
  <button :class="['btn', `btn-${type}`, { 'btn-disabled': disabled }]" :disabled="disabled" @click="handleClick">
    {{ text }}
  </button>
</template>

<script setup>

// 定义属性
const props = defineProps({
  type: {
    type: String,
    default: 'primary',
    validator: (value) => ['primary', 'secondary', 'success', 'warning', 'danger'].includes(value)
  },
  disabled: {
    type: Boolean,
    default: false
  },
  text: {
    type: String,
    default: 'Button'
  }
});

// 定义事件
const emit = defineEmits(['click']);

// 处理点击事件
const handleClick = (event) => {
  if (!props.disabled) {
    emit('click', event);
  }
};
</script>

<style scoped>
.btn {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.2s;
  display: inline-block;
  text-align: center;
  outline: none;
  min-height: 36px;
}

.btn-primary {
  background-color: #409eff;
  color: white;
}

.btn-primary:hover {
  background-color: #66b1ff;
}

.btn-secondary {
  background-color: #909399;
  color: white;
}

.btn-secondary:hover {
  background-color: #a6a9ad;
}

.btn-success {
  background-color: #67c23a;
  color: white;
}

.btn-success:hover {
  background-color: #85ce61;
}

.btn-warning {
  background-color: #e6a23c;
  color: white;
}

.btn-warning:hover {
  background-color: #ebb563;
}

.btn-danger {
  background-color: #f56c6c;
  color: white;
}

.btn-danger:hover {
  background-color: #f78989;
}

.btn-disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
