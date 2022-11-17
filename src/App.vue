<template>
  <div id="app" >
    <header-vue></header-vue>
    <router-view/>
  </div>
</template>

<script>
import headerVue from '@/components/headerVue.vue'
export default {
  name: 'AppView',
  components: {
    headerVue
  }
}

</script>

<style>

</style>
