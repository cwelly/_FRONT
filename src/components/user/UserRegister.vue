<template>
  
<b-jumbotron header="회원가입" >
  <div>
    <b-card class="text-left" style="margin:0 auto;" >
      <b-form class="mb-4">
        이메일 :
        <b-input-group>
          <b-form-input
          v-model="user.emailid"
          >
          </b-form-input>
          <b-input-group-prepend is-text>
            <b-icon icon="envelope"></b-icon>
          </b-input-group-prepend>
          <b-form-select
          v-model="user.emaildomain">
            <option>선택</option>
            <option value="ssafy.com">싸피</option>
            <option value="google.com">구글</option>
            <option value="naver.com">네이버</option>
            <option value="kakao.com">카카오</option>
          </b-form-select>
        </b-input-group>
        비밀번호 :
        <b-form-input type="password" id="text-password" v-model="user.password" aria-describedby="password-help-block"></b-form-input>
        이름 :
        <b-form-input
        v-model="user.name"
        ></b-form-input>
        전화번호 :
        <b-form-input
        v-model="user.phone"
        ></b-form-input>
        주소 :
        <b-form-input
        v-model="user.addr"
        ></b-form-input>
        성별 :
        <b-form-select
          v-model="user.sex"
          >
            <option value=null>선택</option>
            <option value="남">남자</option>
            <option value="여">여자</option>
        </b-form-select>
        나이 :
        <b-form-input
        type="number"
        v-model="user.age"
        ></b-form-input>
        주요 교통수단 :
        <b-form-select
          v-model="user.trans"
          class="mb-4"
          >
            <option value=null>선택</option>
            <option value="자전거">자전거</option>
            <option value="보행자">보행</option>
            <option value="승용차">승용차</option>
            <option value="기타">기타</option>
        </b-form-select>
        <b-button block variant="primary" @click.prevent="regist">등 록</b-button>
      </b-form>

    </b-card>
  </div>
</b-jumbotron>
</template>

<script>
import {join} from "@/api/user";
import router from "@/router";
export default {
  name: "UserRegister",
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
          trans:null,
        },
      }
  },
  methods: {
    async regist() {
      // 데이터 정제 작업
      if (this.user.age>100) {
        alert('나이를 확인해주세요');
      }
      else {
        await join(this.user,
                  ({ data }) => {
                      if (data.resMsg==="회원등록완료") {
                        alert('회원 가입 성공');
                        router.push({ name: "VueMain" });
                      }
                      else if (data.resMsg==="중복회원") {
                          alert('중 복 회 원 입니다 ');
                      }
                      else {
                          alert('회원가입 실패!');
                      }
                  },
                  (error) => {
                      console.log(error);
                  }
              );
        }
      },
    }
}

</script>

<style>

</style>