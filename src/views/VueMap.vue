<template>
    <div>
        <b-container class="text-center" fluid >
            <h2 >Map Zone 입니다.</h2>
            <b-row>
                <map-search-component></map-search-component>
            </b-row>
            <b-row align-v="center">
                <b-col>
                    <map-result-list/>
                </b-col>
                <b-col cols="7">
                    <router-view></router-view>
                </b-col>
            </b-row>
        </b-container>
        
    </div>
</template>

<script>
import MapResultList from "@/components/map/MapResultList.vue";
import MapSearchComponent from "@/components/map/MapSearchComponent.vue";
export default {
    name: "VueMap",
    components: {
        MapResultList,
        MapSearchComponent
    }
}
</script>

<style>

</style>