<template>
  <div class="bg-white rounded-lg shadow p-4 flex items-center gap-4">
    <div :class="['w-12 h-12 rounded-md flex items-center justify-center text-white', iconBg]">
      <slot name="icon">📊</slot>
    </div>
    <div>
      <div class="text-sm text-gray-500">{{ title }}</div>
      <div class="text-2xl font-bold text-gray-800">{{ value }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'StatCard',
  props: {
    title: { type: String, required: true },
    value: { type: [String, Number], required: true },
    iconBg: { type: String, default: 'bg-indigo-500' },
  },
};
</script>

<style scoped></style>
