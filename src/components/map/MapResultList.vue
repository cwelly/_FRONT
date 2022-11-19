<template>
  <div >
    <h2>결과리스트 입니다</h2>
    <b-table striped hover :items="aptList"></b-table>
  </div>
</template>

<script>
import { mapState } from "vuex";
const mapStore = "mapStore";
export default {
    name: "MapResultList",
    data() {
      return {
        items: null,
        slide: 0,
        sliding: null,
        img:"https://picsum.photos/1024/480/?image=52",
      }
  },
  methods: {
    
  },
  watch: {
  },
  computed: {
    ...mapState(mapStore, ["aptList"]),
  },
}
</script>

<style>

</style>