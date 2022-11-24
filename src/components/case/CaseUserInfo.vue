<template>
  <b-breadcrumb>
    <b-breadcrumb-item v-model="user.name" readonly>
      이름 {{ user.name }}</b-breadcrumb-item
    >
    <b-breadcrumb-item v-model="user.sex" readonly
      >성별 {{ user.sex }}</b-breadcrumb-item
    >
    <b-breadcrumb-item v-model="user.age" readonly>
      나이 {{ user.age }}</b-breadcrumb-item
    >
    <b-breadcrumb-item v-model="user.trans" readonly
      >주요 이동 수단 : {{ user.trans }}</b-breadcrumb-item
    >
  </b-breadcrumb>
</template>

<script>
import { mapState } from "vuex";
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
    };
  },
  mounted() {
    this.user = this.userInfo;
  },
  computed: {
    ...mapState(userStore, ["userInfo"]),
  },
};
</script>

<style></style>
