<template>
  <div>
    <!-- <map-search-component-vue ></map-search-component-vue> -->
    <div style="height: 4rem"></div>
    <div id="map" ></div>
    <div style="height: 2rem"></div>
    <b-row align-h="around">
        <b-col cols="3">
            <div v-if="leftval==null">
                <b-button 
                    class="w-100" 
                    @click="leftCliked" 
                    v-if="drawdot==0 || drawdot==2"  
                    size="lg" 
                    variant="primary">
                    출발지 선택
                </b-button>
                <b-button 
                    class="w-100" 
                    @click="leftCliked" 
                    v-if="drawdot==1"  
                    size="lg" 
                    variant="primary">
                    선택 중
                </b-button>
            </div>
            <div v-if="leftval!=null" >
                <b-button 
                    class="w-100" 
                    @click="leftCliked" 
                    size="lg" 
                    variant="primary">
                    선택됨
                </b-button>
            </div>
        
        </b-col>
        <b-col cols="3">    
            <div v-if="rightval==null">
                <b-button 
                    class="w-100" 
                    @click="rightCliked" 
                    v-if="drawdot==0 || drawdot==1" 
                    size="lg">
                    도착지 선택
                </b-button>
                <b-button 
                    class="w-100" 
                    @click="rightCliked" 
                    v-if="drawdot==2" 
                    size="lg">
                    선택 중
                </b-button>
            </div>
            <div v-if="rightval!=null" >
                <b-button 
                    class="w-100" 
                    @click="rightCliked" 
                    size="lg" >
                    선택됨
                </b-button>
            </div>
        </b-col>
    </b-row>
    <b-row>

    </b-row>
    
  </div>
</template>

<script>

import { getWayCase } from "@/api/case";

export default {
    components: {
    },
    data() {
        return {
            way: {
                lat1: null,
                lat2: null,
                lng1: null,
                lng2:null,  
            },
            markers:[],
            map:null,
            resultList: null,
            leftval: null,
            rightval: null,
            overlays:null,
            drawdot:0,//  0 은 아무도 안그려지고 있을때 1 은 왼쪽 버튼이 그리고 있을때  , 2는 오른쪽이 그리고있을때
            //  moveLine, // 선이 그려지고 있을때 마우스 움직임에 따라 그려질 선 객체 입니다
            //  clickLine, // 마우스로 클릭한 좌표로 그려질 선 객체입니다
            //  distanceOverlay, // 선의 거리정보를 표시할 커스텀오버레이 입니다
             dots : {}, // 선이 그려지고 있을때 클릭할 때마다 클릭 지점과 거리를 표시하는 커스텀 오버레이 배열입니다.

        }
    },
    //searchDetailAddrFromCoords(mouseEvent.latLng, function(result, status) {
    methods: {
        async makeOveray(makerno) {
        if (this.overlay!=null &&this.overlay.getMap()!=null) {
          this.overlay.setMap(null);
        }
        var marker1 = this.markers[makerno];
        var content =
            `<div class="card" style="width: 18rem;bg-white">
            <div class="card-body">
            <h5 class="card-title" >${this.resultList[makerno].adress}</h5>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">사고시간 : ${this.resultList[makerno].casedate}</li>
                <li class="list-group-item">가해차량 : ${this.resultList[makerno].pertrans}</li>
                <li class="list-group-item">피해차량 : ${this.resultList[makerno].victrans}</li>
                <li class="list-group-item">사고원인 : ${this.resultList[makerno].caseissue}</li>
                <li class="list-group-item">피해정도 : ${this.resultList[makerno].vicdamage}</li>
                <li class="list-group-item">피해자 연령 : ${this.resultList[makerno].vicage}</li>
                <li class="list-group-item">피해자 성별 : ${this.resultList[makerno].vicsex}</li>
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
        makedisplaymaker(list) {
            console.log("매개 리스트 ",list);
            if (this.markers!=null) {
                for (let index = 0; index < this.markers.length; index++) {
                    this.markers[index].setMap(null);
                }
                this.markers = [];
            }
            for (let index = 0; index < list.length; index++) {
                var llat = list[index].lat, llng = list[index].lng;
                var placePosition = new kakao.maps.LatLng(llat,llng );
                //기타 충돌시의 마커
                var imageSrc = 'https://cdn-icons-png.flaticon.com/128/6304/6304794.png';
                if (list[index].victrans==="승용차") {
                    imageSrc = 'https://cdn-icons-png.flaticon.com/128/1810/1810768.png';
                }
                else if (list[index].victrans==="자전거") {
                    imageSrc = 'https://cdn-icons-png.flaticon.com/128/5349/5349909.png';
                }
                else if (list[index].victrans==="보행자") {
                    imageSrc = 'https://cdn-icons-png.flaticon.com/128/190/190462.png';
                }
                
        
                var imageSize = new kakao.maps.Size(44, 49),
                    imageOptions =  {offset: new kakao.maps.Point(27, 69)};
                var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOptions);
                var marker2 =new kakao.maps.Marker({
                    position: placePosition, //
                    image: markerImage,
                });
                marker2.setMap(this.map);
                kakao.maps.event.addListener(marker2, 'click', () =>  {
                    this.makeOveray(index,list[index].caseno);
                });
                this.markers.push(marker2);
            }
            console.log("마커찍기 종료");  
        },
        displayCircleDot(position,isleft) {
            // 클릭 지점을 표시할 빨간 동그라미 커스텀오버레이를 생성합니다
            var circleOverlay = new kakao.maps.CustomOverlay({
                content: '<span class="dot"></span>',
                position: position,
                zIndex: 1
            });
            
            // 지도에 표시합니다
            circleOverlay.setMap(this.map);
            
            
            if (isleft) {
                this.leftval=({circle:circleOverlay});
            }
            else {
                this.rightval=({circle:circleOverlay});
            }
            // 만약 두곳다 선택 된상태라면?
            if (this.leftval!=null && this.rightval!=null) {
                console.log("둘다 선택하셨네요?!", this.leftval.circle.getPosition().Ma);
                var lat1 = this.leftval.circle.getPosition().Ma < this.rightval.circle.getPosition().Ma ? this.leftval.circle.getPosition().Ma : this.rightval.circle.getPosition().Ma;
                this.way.lat1 = lat1;
                var lat2 = this.leftval.circle.getPosition().Ma > this.rightval.circle.getPosition().Ma ? this.leftval.circle.getPosition().Ma : this.rightval.circle.getPosition().Ma;
                this.way.lat2 = lat2;
                var lng1 = this.leftval.circle.getPosition().La < this.rightval.circle.getPosition().La ? this.leftval.circle.getPosition().La : this.rightval.circle.getPosition().La;
                this.way.lng1 = lng1;
                var lng2 = this.leftval.circle.getPosition().La > this.rightval.circle.getPosition().La ? this.leftval.circle.getPosition().La : this.rightval.circle.getPosition().La;
                this.way.lng2 = lng2;
                console.log(this.way);
                getWayCase(this.way,
                    ({ data }) => {
                        if (data.resMsg === "Success OK") {
                            this.resultList=data.wayList;
                            console.log("가져오기 성공",this.resultList);
                        }
                        else {
                            console.log("가져오기 없음");
                        }
                    }, (error) => { console.log("wayList 가져오다가 에러남", error) });
                this.drawdot = 0;
            }
        },
        initMap() {
            var mapContainer = document.getElementById('map'), // 지도를 표시할 div 
            mapOption = { 
                center: new kakao.maps.LatLng(36.35535250462965, 127.29938420271769), // 지도의 중심좌표
                level: 5 // 지도의 확대 레벨
            };
    
            // 지도를 표시할 div와  지도 옵션으로  지도를 생성합니다 
            this.map =new kakao.maps.Map(mapContainer, mapOption); 
            console.log("로드맵 실행", this.map);
        },  
        leftCliked() {
            console.log(this.leftval);
            if (this.leftval!=null) {
                this.leftval.circle.setMap(null);
            }
            this.leftval = null;

            if (this.drawdot==0) {
                this.drawdot = 1;
            }
            else if (this.drawdot==1) {
                this.drawdot = 0;
            }
            else {
                this.drawdot = 1;
            }
            console.log(this.drawdot);
        },
        rightCliked() {
            console.log(this.rightval);
            if (this.rightval!=null) {
                this.rightval.circle.setMap(null);
            }
            this.rightval = null;
            if (this.drawdot==0) {
                this.drawdot = 2;
            }
            else if (this.drawdot==1) {
                this.drawdot = 2;
            }
            else {
                this.drawdot = 0;
            }
            console.log(this.drawdot);
        },
    },
    watch: {
        resultList (value){
            this.makedisplaymaker(value);
        }
    },
    mounted() {
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
            this.initMap(); 
            console.log(this.map);
        }
        kakao.maps.event.addListener(this.map, 'click',(mouseEvent)=> {
            var clickPosition = mouseEvent.latLng;
            console.log(this.drawdot);
            if (this.drawdot==1) {
                console.log("왼쪽 버튼을 선택하셨었네요?!");
                this.leftval = null;
                this.displayCircleDot(clickPosition, true);
            }
            else if (this.drawdot==2) {
                console.log("오른쪽 버튼을 선택하셨었네요?!");
                this.rightval = null;
                this.displayCircleDot(clickPosition, false);
            }
            else {
                console.log("아무것도 선택하지 않았네요!");
            }
        });
    },
}
</script>

<style>
.dot {overflow:hidden;float:left;width:12px;height:12px;background: url('https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/mini_circle.png');}  
</style>