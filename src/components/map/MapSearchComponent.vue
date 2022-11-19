<template>
  <div align-h="center">
    <h2>검색 조건들입니다</h2>
    <b-form inline>
      <b-form-select id="sido" v-model="selectedsido" :options="sido"></b-form-select>
      <b-form-select id="gugun" v-model="selectedgugun" :options="gugun"></b-form-select>
      <b-form-select id="dong" v-model="selecteddong" :options="dong"></b-form-select>
      <b-button variant="primary" @click="gosearchdong">검색</b-button>
    </b-form>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import http from "@/api/http-common";
const mapStore = "mapStore";

export default {
    data() { 
        return {
          selectedsido: -1,
          selectedgugun: -1,
          selecteddong: -1,
          sido: [{
            text: "시도선택", value: -1
          },],
            gugun:  [{
            text: "구군선택", value: -1
          },],
            dong: [{
            text: "동선택", value: -1
          },],
          searchList: null,  
        }
  },
  created() {
    http.get(`/region.do/sido`).then(({ data }) => {
      data.regions.forEach(item => {
        // console.log(item);
        let iitem = { text: item.name, value: item.code };
        this.sido.push(iitem);
      });
    });
  },
  methods: {
    ...mapMutations(mapStore, ["SET_APTLIST"]),
    // 동별 검색
    gosearchdong() {
      if (this.selecteddong==-1||this.selectedgugun==-1||this.selectedsido==-1) {
        alert("시,군,동 을 전부 입력해주세요");
      }
      else {
        let paradong = null;
        this.dong.forEach(element => {
          if (element.value==this.selecteddong) {
            paradong = element.text;
          }
        });
        http.get(`/map.do/searchDong/${paradong}`).then(({ data }) => {
          this.SET_APTLIST(data.aptList);
          // console.log(this.$store.mapStore.state.aptList);
        });
      }
    }
  },
  computed: {
    
  },
  watch: {
    // 시도 변경될때
    selectedsido: function () {
      if (this.selectedsido!=-1) {
        this.gugun = [{
          text: "구군선택", value: -1
        },];
        http.get(`/region.do/gugun/${this.selectedsido}`).then(({ data }) => {
          data.regions.forEach(item1 => {
            let iitem1 = { text: item1.name, value: item1.code };
            this.gugun.push(iitem1);
          });
        });
        this.dong= [{
          text: "동선택", value: -1
        },];
        this.selectedgugun = -1;
        this.selecteddong = -1;
      }
      else {
        this.gugun = [{
          text: "구군선택", value: -1
        },];
        this.dong= [{
          text: "동선택", value: -1
        },];
        this.selectedgugun = -1;
        this.selecteddong = -1;
      }
    },
    // 군 병경될때
    selectedgugun: function () {
      this.dong = [{
          text: "동선택", value: -1
      },];
      http.get(`/region.do/dong/${this.selectedgugun}`).then(({ data }) => {
        data.regions.forEach(item2 => {
            let iitem2 = { text: item2.name, value: item2.code };
            this.dong.push(iitem2);
          });
      });
      this.selecteddong = -1;
    }
  },

}
</script>

<style>

</style>