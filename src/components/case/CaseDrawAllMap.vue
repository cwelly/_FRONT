<template>
  <div>
    <div id="map" ></div>
    <b-row style="width: 80%;margin:0 auto;">
      <b-col cols="6"></b-col>
      <b-col>
        사고종류 :
        <img src="https://cdn-icons-png.flaticon.com/128/190/190462.png" style="height:30px ; width:30px"/>: 보행자
        <img src='https://cdn-icons-png.flaticon.com/128/5349/5349909.png' style="height:30px ; width:30px"/>: 자전거
        <img src='https://cdn-icons-png.flaticon.com/128/1810/1810768.png' style="height:30px ; width:30px"/>: 승용차
        <img src='https://cdn-icons-png.flaticon.com/128/6304/6304794.png' style="height:30px ; width:30px"/>: 기타
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
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
    ...mapActions(caseStore, ["getAllCaseList"]),

    async initMap() {
      var mapContainer = document.getElementById('map'), // 지도를 표시할 div 
      mapOption = { 
          center: new kakao.maps.LatLng(36.35535250462965, 127.29938420271769), // 지도의 중심좌표
          level: 5 // 지도의 확대 레벨
      };

      // 지도를 표시할 div와  지도 옵션으로  지도를 생성합니다
      this.map = new kakao.maps.Map(mapContainer, mapOption); 
      console.log("로드맵 실행", this.map);
    },

    async displayMarker() {
      console.log("마커찍기 실행",this.AllList.length);
      for (let index = 0; index < this.AllList.length; index++) {
        var llat = this.AllList[index].lat, llng = this.AllList[index].lng;
        var placePosition = new kakao.maps.LatLng(llat,llng );
        //기타 충돌시의 마커
        var imageSrc = 'https://cdn-icons-png.flaticon.com/128/6304/6304794.png';
        if (this.AllList[index].victrans==="승용차") {
          imageSrc = 'https://cdn-icons-png.flaticon.com/128/1810/1810768.png';
        }
        else if (this.AllList[index].victrans==="자전거") {
          imageSrc = 'https://cdn-icons-png.flaticon.com/128/5349/5349909.png';
        }
        else if (this.AllList[index].victrans==="보행자") {
          imageSrc = 'https://cdn-icons-png.flaticon.com/128/190/190462.png';
        }
        

        var imageSize = new kakao.maps.Size(44, 49),
            imageOptions =  {offset: new kakao.maps.Point(27, 69)};
        var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOptions);
        var marker = new kakao.maps.Marker({
          position: placePosition, //
          image: markerImage,
        });
        marker.setMap(this.map);
        // this.markers.push(marker);
      }
      console.log("마커찍기 종료");
    },

    gettingList() {
      this.getAllCaseList();
    },

    

  },
  watch: {
     allList(value) {
      this.AllList = value;
      console.log("리스트 가져 왔나?", this.AllList);
      this.displayMarker();
    },
  },
  created() {
    
  },
  async mounted() {
    this.allList = null;
    // console.log(" 되나?")
    if (!window.kakao || !window.kakao.maps) {
      const script = document.createElement("script");
      script.src = "//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=32b7b36540e75a778fb8400e8a821a41&libraries=services";
      /* global kakao */
      script.onload = () => kakao.maps.load(this.initMap);
      console.log("initMap 끝~!");
      document.head.appendChild(script);
    }
    else {
      console.log("이미 로딩됨 : ", window.kakao);
      this.initMap(); 
      // console.log(this.map);
    }
    if (window.kakao &&window.kakao.maps) {
      // console.log("제대로 불러옴");
    }
    this.gettingList();
    

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