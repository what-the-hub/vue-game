<template>
  <div class="hello">
    <Button></Button>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Button from '@/components/Button.vue';

// eslint-disable-next-line no-use-before-define
@Component({
  components: { Button },
})
export default class HelloWorld extends Vue {
  @Prop() private msg!: string;
}
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
