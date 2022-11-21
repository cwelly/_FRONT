<template>
  
    <b-navbar toggleable="lg" type="dark" variant="info">
      <b-navbar-brand  to="/">WhereIsMyHome</b-navbar-brand>
  
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
  
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav >
          <!-- 이전 네브바
          <b-nav-item to="/map/drawmap">동별 검색</b-nav-item>
          <b-nav-item to="/map/name">이름별 검색</b-nav-item>
          <b-nav-item to="/about">관심지역확인</b-nav-item>
             바꾼 네브바  -->
          <b-nav-item to="/case/drawallamp">모든 사건 확인</b-nav-item>
          <b-nav-item to="/map/drawmap">사용자 맞춤 사건</b-nav-item>
          <b-nav-item to="/about"></b-nav-item>
        </b-navbar-nav>
  
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <!-- <b-nav-form>
            <b-form-input size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>
            <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
          </b-nav-form> -->
  
          <!-- <b-nav-item-dropdown text="Lang" right>
            <b-dropdown-item href="#">EN</b-dropdown-item>
            <b-dropdown-item href="#">ES</b-dropdown-item>
            <b-dropdown-item href="#">RU</b-dropdown-item>
            <b-dropdown-item href="#">FA</b-dropdown-item>
          </b-nav-item-dropdown> -->
          <b-nav-item-dropdown right v-if="userInfo">
            <template #button-content>
              <em>{{userInfo.name}}님 환영합니다</em>
            </template>
            <b-dropdown-item to="/user/mypage">MyPage</b-dropdown-item>
            <b-dropdown-item to="/user/logout" @click.prevent="onClickLogout">LOGOUT</b-dropdown-item>
          </b-nav-item-dropdown>
          <b-nav-item-dropdown right v-else>
            <template #button-content>
              <em>로그인 해주세요!</em>
            </template>
            <b-dropdown-item to="/user/join">JOIN</b-dropdown-item>
            <b-dropdown-item to="/user/login">LOGIN</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  
</template>

<script>
import { mapState  , mapGetters, mapActions} from "vuex";
const userStore = "userStore";

export default {
  name: "UserLogin",
  data() {
    return{
    }
  },
  computed: {
    ...mapState(userStore, ["isLogin", "userInfo"]),
    ...mapGetters(["checkUserInfo"]),
  },
  methods: {
    ...mapActions(userStore, ["userLogout"]),
    // ...mapMutations(memberStore, ["SET_IS_LOGIN", "SET_USER_INFO"]),
    onClickLogout() {
      // this.SET_IS_LOGIN(false);
      // this.SET_USER_INFO(null);
      // sessionStorage.removeItem("access-token");
      // if (this.$route.path != "/") this.$router.push({ name: "main" });
      console.log("로그아웃 시도에 의한 유저넘버 : ",this.userInfo.userno);
      //vuex actions에서 userLogout 실행(Backend에 저장 된 리프레시 토큰 없애기
      //+ satate에 isLogin, userInfo 정보 변경)
      // this.$store.dispatch("userLogout", this.userInfo.userid);
      this.userLogout(this.userInfo.userno);
      sessionStorage.removeItem("access-token"); //저장된 토큰 없애기
      sessionStorage.removeItem("refresh-token"); //저장된 토큰 없애기
      if (this.$route.path != "/") this.$router.push({ name: "main" });
    },
  },

  
}
</script>

<style>

</style>