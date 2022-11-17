<template>
  <div>
    <h2>검색 조건들입니다</h2>
    <b-form-select inline v-model="selectedsido" :options="sido"></b-form-select>
    <b-form-select inline v-model="selectedgugun" :options="gugun"></b-form-select>
    <b-form-select inline v-model="selecteddong" :options="dong"></b-form-select>
  </div>
</template>

<script>
export default {
    data() { 
        return {
            selectedsido: "시도선택",
            selectedgugun: "구군선택",
            selecteddong: "동선택",
            sido: [ "시도선택"],
            gugun:  [ "구군선택"],
            dong: [ "동선택"],
        }
    }

}
</script>

<style>

</style>