<template>
  <b-button variant="outline-primary">
    <slot>
      {{ title }}
    </slot>
  </b-button>
</template>
<script lang="ts">
export default {
  props: {
    color: String,

    size: Number,
    title: {
      type: String,
      default: 'some title',
    },
    isDisabled: Boolean,
    action: Function,
  },
};
</script>

<style lang="sass">
</style>
