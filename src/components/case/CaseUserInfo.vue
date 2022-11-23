<template>
  <div>
    <h2>여기에 "userInfo" 사용해서 유저 정보좀 띄워주라</h2>
  </div>
</template>

<script>
 import { mapState  } from "vuex";
  const userStore = "userStore";
export default {
    
    ...mapState(userStore, ["userInfo"]),
}
</script>

<style>

</style>