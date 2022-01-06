<template>
  <div class="hello">
    <Button :action=onClick color="red" title="hello" :disabled=isDisable />
  </div>
</template>

<script lang="ts">

import Button from '@/components/Button.vue';

export default {
  /* eslint-disable */
  name: 'HelloWorld',
  components: {
    Button,
  },

  computed: {

    /*    isDisable: ():boolean => {
          return  true;
        }*/
  },
  methods: {
    onClick: function () {
      alert('Hello')
      debugger;
      console.log(this)

    },
  },
};
</script>

<style scoped lang="sass">
h3
  margin: 40px 0 0

ul
  list-style-type: none
  padding: 0

li
  display: inline-block
  margin: 0 10px

a
  color: #42b983
</style>
