<template>
    <div>
        <case-user-info></case-user-info>
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
      <case-fit-result></case-fit-result>
    </div>
  </template>
  
  <script>
import CaseUserInfo from "@/components/case/CaseUserInfo.vue";
import CaseFitResult from "@/components/case/CaseFitResult.vue";
  import { mapState, mapActions } from "vuex";
  const caseStore = "caseStore";
  const userStore = "userStore";
    export default {
    components: {
        CaseUserInfo,
        CaseFitResult,
    },
    data() {
      return {
        FllList: null,
        map: null,
          markers: [],
          overlay: null,
      }
    },
    computed: {
        ...mapState(caseStore, ["fitList"]),
        ...mapState(userStore, ["userInfo"]),
    },
    methods: {
      ...mapActions(caseStore, ["getFitCaseList"]),
      async makeOveray(makerno) {
        if (this.overlay!=null &&this.overlay.getMap()!=null) {
          this.overlay.setMap(null);
        }
        var marker1 = this.markers[makerno];
        console.log("이게 케이스번호입니다", this.fitList[makerno]);
        console.log("이건 포지션입니다.", marker1.getPosition());
        var content =
          `<div class="card" style="width: 18rem;bg-white">
        <div class="card-body">
          <h5 class="card-title" >${this.fitList[makerno].adress}</h5>
          <ul class="list-group list-group-flush">
            <li class="list-group-item">사고시간 : ${this.fitList[makerno].casedate}</li>
            <li class="list-group-item">가해차량 : ${this.fitList[makerno].pertrans}</li>
            <li class="list-group-item">피해차량 : ${this.fitList[makerno].victrans}</li>
            <li class="list-group-item">사고원인 : ${this.fitList[makerno].caseissue}</li>
            <li class="list-group-item">피해정도 : ${this.fitList[makerno].vicdamage}</li>
            <li class="list-group-item">피해자 연령 : ${this.fitList[makerno].vicage}</li>
            <li class="list-group-item">피해자 성별 : ${this.fitList[makerno].vicsex}</li>
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
        for (let index = 0; index < this.fitList.length; index++) {
          var llat = this.fitList[index].lat, llng = this.fitList[index].lng;
          var placePosition = new kakao.maps.LatLng(llat,llng );
          //기타 충돌시의 마커
          var imageSrc = 'https://cdn-icons-png.flaticon.com/128/6304/6304794.png';
          if (this.fitList[index].victrans==="승용차") {
            imageSrc = 'https://cdn-icons-png.flaticon.com/128/1810/1810768.png';
          }
          else if (this.fitList[index].victrans==="자전거") {
            imageSrc = 'https://cdn-icons-png.flaticon.com/128/5349/5349909.png';
          }
          else if (this.fitList[index].victrans==="보행자") {
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
            this.makeOveray(index,this.fitList[index].caseno);
          });
          this.markers.push(marker2);
        }
        console.log("마커찍기 종료");
      },
  
      async gettingList() {
        await this.getFitCaseList(this.userInfo);
      },
  
      
  
    },
    watch: {
      async fitList(value) {
        this.FllList = value;
        console.log("리스트 가져 왔나?", this.FllList);
        await this.displayMarker();
      },
          
    },
    created() {
      
        this.FllList = null;
    },
    async mounted() {
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
      console.log("맵 불러왔고 , 유저 정보 기반으로 fitList 가져오자")
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