<template>
  <b-jumbotron :header="[`${user.name} 님의 My Page`]" >
    <div>
      <b-card class="text-left" style="margin:0 auto;" read>
        <b-form class="mb-4">
          이메일 :
          <b-input-group>
            <b-form-input
            v-model="user.email.id"
            readonly>
            </b-form-input>
            <b-input-group-prepend is-text>
              <b-icon icon="envelope"></b-icon>
            </b-input-group-prepend>
            <b-form-select
            v-model="user.email.domain" disabled>
              <option>선택</option>
              <option value="ssafy.com">싸피</option>
              <option value="google.com">구글</option>
              <option value="naver.com">네이버</option>
              <option value="kakao.com">카카오</option>
            </b-form-select>
          </b-input-group>
          비밀번호 :
          <b-form-input type="password" id="text-password"  aria-describedby="password-help-block" readonly></b-form-input>
          이름 :
          <b-form-input
          v-model="user.name" readonly
          ></b-form-input>
          전화번호 :
          <b-form-input
          v-model="user.phone" readonly
          ></b-form-input>
          주소 :
          <b-form-input
          v-model="user.addr" readonly
          ></b-form-input>
          성별 :
          <b-form-select
            v-model="user.sex" disabled
            >
              <option value=null>선택</option>
              <option value="남">남자</option>
              <option value="여">여자</option>
          </b-form-select>
          나이 :
          <b-form-input
          type="number"
          v-model="user.age" readonly
          ></b-form-input>
          주요 교통수단 :
          <b-form-select
            v-model="user.trans"
            class="mb-4" disabled
            >
              <option value=null>선택</option>
              <option value="자전거">자전거</option>
              <option value="보행자">보행</option>
              <option value="승용차">승용차</option>
              <option value="기타">기타</option>
          </b-form-select>
        </b-form>
  
      </b-card>
    </div>
  </b-jumbotron>
</template>

<script>
import { mapState} from "vuex";
const userStore = "userStore";

export default {
  name: "UserMypage",
  data() {
    return {
      user: {
        emailid: null,
        emaildomain: null,
        password: null,
        name: null,
        addr: null,
        phone: null,
        sex: null,
        age: 0,
        trans: null,
      },
    }
  },
  mounted () {
    this.user = this.userInfo;
  },
  computed: {
    ...mapState(userStore, [ "userInfo"]),
      
  }
}
</script>

<style>

</style>