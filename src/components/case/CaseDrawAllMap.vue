<template>
  <div>
    <div id="map" ></div>
    <div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
const caseStore = "caseStore";

export default {
  data() {
    return {
      AllList: null,
      map: null,
      markers:null,
    }
  },
  computed: {
    ...mapState(caseStore, ["allList"]),
  },
  methods: {
    initMap() {
      var mapContainer = document.getElementById('map'), // 지도를 표시할 div 
      mapOption = { 
          center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
          level: 5 // 지도의 확대 레벨
      };

      // 지도를 표시할 div와  지도 옵션으로  지도를 생성합니다
      this.map = new kakao.maps.Map(mapContainer, mapOption); 
      console.log("로드맵 실행",this.map);
    },
    displayMarker() {
      
    },
  },
  created() {
  },
  mounted() {
    // console.log(" 되나?")
    if (!window.kakao || !window.kakao.maps) {
      const script = document.createElement("script");
      script.src = "//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=32b7b36540e75a778fb8400e8a821a41&libraries=services";
      /* global kakao */
      script.onload = () => kakao.maps.load(this.initMap);
      // console.log("initMap 끝~!");
      document.head.appendChild(script);
    }
    else {
      // console.log("이미 로딩됨 : ", window.kakao);
      this.initMap(); 
      // console.log(this.map);
    }
    if (window.kakao &&window.kakao.maps) {
      // console.log("제대로 불러옴");
    }


  },
}
</script>

<style>
#map {
  width: 80%;
  height: 80%;
  margin:0 auto;
}
</style>