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
      markers: [],
      overlay:null,
    }
  },
  computed: {
    ...mapState(caseStore, ["allList"]),
  },
  methods: {
    ...mapActions(caseStore, ["getAllCaseList"]),

    async makeOveray(makerno) {
      if (this.overlay!=null &&this.overlay.getMap()!=null) {
        this.overlay.setMap(null);
      }
      var marker1 = this.markers[makerno];
      console.log("이게 케이스번호입니다", this.AllList[makerno]);
      console.log("이건 포지션입니다.", marker1.getPosition());
      var content =
        `<div class="card" style="width: 18rem;bg-white">
      <div class="card-body">
        <h5 class="card-title" >${this.AllList[makerno].adress}</h5>
        <ul class="list-group list-group-flush">
          <li class="list-group-item">사고시간 : ${this.AllList[makerno].casedate}</li>
          <li class="list-group-item">가해차량 : ${this.AllList[makerno].pertrans}</li>
          <li class="list-group-item">피해차량 : ${this.AllList[makerno].victrans}</li>
          <li class="list-group-item">사고원인 : ${this.AllList[makerno].caseissue}</li>
          <li class="list-group-item">피해정도 : ${this.AllList[makerno].vicdamage}</li>
        </ul>
      </div>
      <a id="closebtn"  class="btn btn-primary">close</a>
    </div>`;
    this.overlay = new kakao.maps.CustomOverlay({
      content: content,
      map: this.map,
      position: marker1.getPosition()       
    });
    await this.overlay.setMap(this.map);
      document.querySelector('#closebtn').addEventListener("click",  () =>{
          this.overlay.setMap(null);
          this.overlay = null;
        });

    },

    async initMap() {
      var mapContainer = document.getElementById('map'), // 지도를 표시할 div 
      mapOption = { 
          center: new kakao.maps.LatLng(36.35535250462965, 127.29938420271769), // 지도의 중심좌표
          level: 5 // 지도의 확대 레벨
      };

      // 지도를 표시할 div와  지도 옵션으로  지도를 생성합니다
      this.map =new kakao.maps.Map(mapContainer, mapOption); 
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
        var marker2 =await new kakao.maps.Marker({
          position: placePosition, //
          image: markerImage,
        });
        marker2.setMap(this.map);
        kakao.maps.event.addListener(marker2, 'click', () =>  {
          this.makeOveray(index,this.AllList[index].caseno);
        });
        this.markers.push(marker2);
      }
      console.log("마커찍기 종료");
    },

    async gettingList() {
      await this.getAllCaseList();
    },

    

  },
  watch: {
    async allList(value) {
      this.AllList = value;
      console.log("리스트 가져 왔나?", this.AllList);
      await this.displayMarker();
    },
        
  },
  created() {
    
  },
  async mounted() {
    this.AllList = null;
    // console.log(" 되나?")
    if (!window.kakao || !window.kakao.maps) {
      const script = document.createElement("script");
      /* global kakao */
      script.onload = () =>kakao.maps.load(this.initMap);
      script.src = "//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=32b7b36540e75a778fb8400e8a821a41&libraries=services";
      document.head.appendChild(script);
      console.log("initMap 끝~!");
    }
    else {
      console.log("이미 로딩됨 : ", window.kakao);
      await this.initMap(); 
      // console.log(this.map);
    }
    if (window.kakao &&window.kakao.maps) {
      // console.log("제대로 불러옴");
    }
    await this.gettingList();
    

  },
}
</script>

<style>
h5{
  overflow: hidden;
}
#map {
  width: 80%;
  height: 80%;
  margin:0 auto;
}
</style>