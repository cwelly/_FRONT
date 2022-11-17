<template>
    <div class="topdiv">
        <b-container class="h-100" fluid="sm">
            <b-jumbotron header="Login" >
                
                <router-view></router-view>
            </b-jumbotron>
        </b-container>
    </div>
</template>

<script>
export default {
  name: "VueUser",
};
</script>

<style>
.topdiv{
    height:90%;
    padding: 60px 0px 0px 0px;
}
</style>