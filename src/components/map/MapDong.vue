<template>
  <div>
    <h2>동별 검색합니다</h2>
    <div id="map"  style="width:500px;height:500px;"></div>
  </div>
</template>

<script>
export default {
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
    }
}
</script>

<style>

</style>