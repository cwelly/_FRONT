<template>
  
<b-jumbotron header="로그인" >
  <b-container class="bv-example-row">
    <b-row>
      <b-col></b-col>
      <b-col cols="8" >
        <b-card class="text-center " style="margin:0 auto;" align="center">
          <b-form inline class="text-center mb-4 "  >
            <b-input-group size="lg" >
                <b-form-input
                  class="mb-2 mr-sm-2 mb-sm-0"
                  id="userid"
                  v-model="user.emailid"
                  required
                  placeholder="아이디 입력...."
                  @keyup.enter="confirm"
                ></b-form-input>
              <!-- </b-form-group> -->
              <b-input-group-prepend is-text>
                <b-icon icon="envelope"></b-icon>
              </b-input-group-prepend>
              <b-form-select
              class="mb-2 mr-sm-4 mb-sm-0"  
                  id="emaildomain"
                  name="emaildomain"
                  v-model="user.emaildomain"
                  aria-label="이메일 도메인 선택"
                >
                  <option>선택</option>
                  <option value="ssafy.com">싸피</option>
                  <option value="google.com">구글</option>
                  <option value="naver.com">네이버</option>
                  <option value="kakao.com">카카오</option>
                </b-form-select>
            </b-input-group>
            </b-form>
            <b-form  class="mb-4">
              <b-form-input
                type="password"
                id="userpwd"
                size="lg"
                v-model="user.userpassword"
                required
                placeholder="비밀번호 입력...."
                @keyup.enter="confirm"
              ></b-form-input>
            </b-form>
            <b-button type="button" variant="primary" class="m-1" @click="confirm">로그인</b-button>
            <b-button type="button" variant="success" class="m-1" @click="movePage">회원가입</b-button>
        </b-card>
      </b-col>
      <b-col></b-col>
    </b-row>
  </b-container>
</b-jumbotron>
  <!-- 
  <div>
    <h2>Login 입니다</h2>
      <b-container class="bg-light" variant="light">

        <b-form >
            <b-form-group
            id="input-group-1"
            label="Email address:"
            label-for="input-1"
          >
          </b-form-group>
        </b-form>
    </b-container>
    
  </div>
-->
</template>

<script>
import { mapState, mapActions } from "vuex";

const userStore = "userStore";

export default {
  name: "UserLogin",
  data() {
    return {
      // isLoginError: false,
      user: {
        emailid: null,
        emaildomain:null, 
        userpassword: null,
      },
    };
  },
  computed: {
    ...mapState(userStore, ["isLogin", "isLoginError", "userInfo"]),
  },
  methods: {
    ...mapActions(userStore, ["userConfirm", "getUserInfo"]),
    async confirm() {
      await this.userConfirm(this.user);
      let token = sessionStorage.getItem("access-token");
      // console.log("1. confirm() token >> " + token);
      if (this.isLogin) {
        await this.getUserInfo(token);
        // console.log("4. confirm() userInfo :: ", this.userInfo);
        this.$router.push({ name: "VueMain" });
        console.log(this.userInfo);
      }
    },
    movePage() {
      this.$router.push({ name: "join" });
    },
  },
}
</script>

<style>

</style>