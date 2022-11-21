<template>
  <div>
    <case-radio></case-radio>
    <case-result></case-result>
    <router-view style=" width: 100%;height: 100%;"></router-view>
  </div>
</template>

<script>
import CaseRadio from "@/components/case/CaseRadio.vue";
import CaseResult from "@/components/case/CaseResultList.vue";
export default {
    name: "VueAllCase",
    components: {
        CaseRadio,
        CaseResult,
    }
}
</script>

<style>

</style>