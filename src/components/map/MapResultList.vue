<template>
  <div >
    <h2>결과리스트 입니다</h2>
    <b-table striped hover :items="Items"></b-table>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
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
    ...mapMutations({
      setaptList: "SET_APTLIST",
    }),
    
    onSlideStart(slide) {
      console.log(slide);
        this.sliding = true
      },
    onSlideEnd(slide) {
      console.log(slide);
        this.sliding = false
      }
  },
  watch: {
    Items: function (value) {
      console.log(value);
      this.setaptList(value);
    }
  },
  computed: {
    Items: {
      get() {
        return this.$store.state.aptList;
      },
      set(value) {
        this.items = value;
      }
    }
  },
}
</script>

<style>

</style>