<template>
  <button @click="action"
          class="btn"
          :style="{background: color}"
          :disabled = isDisabled>
    {{ title }}
  </button>
</template>

<script lang="ts">
export default {
  props: {
    color: {
      type: String,
      default: 'red',
    },
    size: Number,
    title: {
      type: String,
      default: 'some title',
    },
    isDisabled: {
      type: Boolean,
      default: false,
    },
    action: {
      required: true,
      type: Function,
    },
  },
};
</script>

<style scoped lang="sass">
button
  width: 300px
  color: #ffffff
</style>
