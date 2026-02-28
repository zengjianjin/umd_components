<template>
  <div>
    <input :type="type" class="form-control" :placeholder="placeholder" :value="modelValue" @input="updateValue" />
  </div>
</template>
<script setup>
const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: 'Enter your name'
  },
  type: {
    type: String,
    default: 'text'
  }
});

const emit = defineEmits(['update:modelValue']);

const updateValue = (event) => {
  emit('update:modelValue', event.target.value);
};
</script>
<style scoped></style>
