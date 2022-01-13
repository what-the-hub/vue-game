<template>
  <div class="home">
    <Registration/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Registration from '@/components/Registration.vue'

@Component({
  components: {
    Registration
  }
})
export default class Home extends Vue {}
</script>
