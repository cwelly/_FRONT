<template>
  <div style="margin-top: 0px">
   
    <div style="margin-left : 0px ; margin-right: 0px"> 
      <b-carousel
        id="carousel-1"
        v-model="slide"
        :interval="4000"
        controls
        indicators
        background="#ababab"
        img-width="1920"
        img-height="800"
        style="text-shadow: 1px 1px 2px #333  "
        @sliding-start="onSlideStart"
        @sliding-end="onSlideEnd"
      >
      
      
        <!-- Slides with image only -->
        <b-carousel-slide
        :img-src="img1"
        ></b-carousel-slide>
        <b-carousel-slide
        :img-src="img2"
        ></b-carousel-slide>
        <b-carousel-slide
        :img-src="img3"
        ></b-carousel-slide>
        <b-carousel-slide
        :img-src="img4"
        ></b-carousel-slide>
        <b-carousel-slide
        :img-src="img5"
        ></b-carousel-slide>
        <!-- Slides with img slot -->
        <!-- Note the classes .d-block and .img-fluid to prevent browser default image alignment -->
       
      </b-carousel>
    </div>
    <div style="height:20%">
      <b-button block variant="info" bg-variant="info" text-variant="white" style="height:100% ;font-size:260% ; text-align:left" >안전한 여정에 오신 것을 환영합니다.</b-button>
    </div>
    <!-- <b-jumbotron nobody bg-variant="info" text-variant="white" >
      <template #header>안전한 여정에 오신 것을 환영합니다.</template>
      <template #lead> 최현호, 김우진의 최종 관통 페이지입니다 ^^ </template>
      <hr class="my-4" />
    </b-jumbotron> -->
    
  </div>
</template>

<script>
export default {
  data() {
    return {
      img1: require('../assets/cross.jpg'),
      img2: require('../assets/cross2.jpg'),
      img3:require('../assets/bike2.jpg'),
      img4: require('../assets/car.jpg'),
      img5: require('../assets/bike1.jpg'),
      slide: 0,
      sliding: null,
    };
  },
  methods: {
    onSlideStart(slide) {
      console.log(slide);
      this.sliding = true;
    },
    onSlideEnd(slide) {
      console.log(slide);
      this.sliding = false;
    },
  },
};
</script>
