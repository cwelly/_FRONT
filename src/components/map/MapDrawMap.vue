<template>
  <div>
    <h2>동별 검색합니다</h2>
    <div>
      <div id="map"   style="width:800px;height:800px;"></div>
    </div>
  </div>
</template>

<script>

import { mapState } from "vuex";
const mapStore = "mapStore";

export default {
  data() {
    return {
      AptList:null,
    }
  },
  watch: {
    aptList(value) {
      console.log(value);
      this.AptList = value;
      this.loadMap()
    },
  },
  computed: {
    ...mapState(mapStore, ["aptList"]),
  },
  methods: {
    loadMap() {
      if (this.aptList=== null) {
        alert("검색 내역이 없습니다!")
      } else {
        console.log("시작");
        console.log(this.aptList);
        // let map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴
        var container = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스
        var myPos = new kakao.maps.LatLng(36.098594, 128.38977) //lat: 36.098594, lng: 128.38977 }
        var options = { //지도를 생성할 때 필요한 기본 옵션
          center: myPos, //지도의 중심좌표.
          level: 3 //지도의 레벨(확대, 축소 정도)
        };
        let map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴
        let geocoder = new kakao.maps.services.Geocoder();


        //주소로 좌표 얻기

        let addressArr = [];
        let aptArr = [];


        this.aptList.forEach((apt) => {
          let aptInfo = {};

          let address = apt["sido"] + " " + apt["gugun"] + " " + apt["dong"] + apt["jibun"];

          addressArr.push(address);

          aptInfo.address = address;
          aptInfo.aptName = apt["apartmentName"];
          aptInfo.aptPirce = apt["dealAmount"];
          aptInfo.aptSize = apt["area"];
          aptInfo.aptYear = apt["buildYear"];

          aptArr.push(aptInfo);
          
          let dm = this.displayMarker;
          //마커 생성
          geocoder.addressSearch(aptInfo.address, function (result, status) {
            // 정상적으로 검색이 완료됐으면 
            if (status === kakao.maps.services.Status.OK) { 
              var coords = new kakao.maps.LatLng(result[0].y, result[0].x);
              dm(coords, aptInfo, map);

            }
          });
        });
      }
    },
    displayMarker: function (locPosition, aptInfo, map) {
      // 마커를 생성합니다
      var marker = new kakao.maps.Marker({
        map: map,
        position: locPosition,
      });
      marker.setMap(map);

      let mkWrap = document.createElement("div")
      mkWrap.className = "markerWrap"
      let info = document.createElement("div")
      info.className = "info"
      let title = document.createElement("div")
      title.className = "title"
      title.innerHTML = aptInfo.aptName;
      let closeBtn = document.createElement("button")
      closeBtn.className = "close"
      closeBtn.setAttribute("title", "닫기")
      title.appendChild(closeBtn);

      let body = document.createElement("div")
      body.className = "body"
      body.innerHTML = `<div class="desc" >
          <div class="ellipsis" style="width:100%;height:100%; word-break:break-all;margin-bottom:5px "><p ">상세주소 : ${aptInfo.address} ${aptInfo.aptName}</p>
          <p>건축년도 : ${aptInfo.aptYear}</p>
          <p> 아파트 면적 : ${aptInfo.aptSize}</p>
          <p>거래 금액 : ${aptInfo.aptPirce}</p>
          </div>
      </div>`;

      info.appendChild(title);
      info.appendChild(body);
      mkWrap.appendChild(info);


      var overlay = new kakao.maps.CustomOverlay({
        content: mkWrap,
        map: map,
        position: marker.getPosition()
      });

      //오버레이 닫기
      closeBtn.addEventListener("click", () => {
        overlay.setMap(null);
      })

      // 지도 중심좌표를 접속위치로 변경합니다
      map.setCenter(locPosition);

      //오버레이 열기
      kakao.maps.event.addListener(marker, 'click', function () {
        overlay.setMap(map);
        map.setCenter(locPosition);
      });
      closeBtn.dispatchEvent(new Event("click"));
      return overlay;
    }, //displayMaker
  },
  mounted() {
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
      console.log(this.map);
    }
    if (window.kakao &&window.kakao.maps) {
      console.log("제대로 불러옴");
    }
  },
}
</script>

<style>

</style>