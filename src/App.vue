<template>
  <div id="app" style=" width: 100%;height: 100%;">
    <header-vue></header-vue>
    <router-view style=" width: 100%;height: 100%;"/>
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
