<!-- <template>
  <div>
    <b-table striped hover 
    :items="AllList"
    :current-page="currentPage"
    :per-page="perPage"
    show-empty
    style=" width: 100%;height: 100%;">
      
    </b-table>


    <b-row  class="mb-5">
      <b-col sm="5" md="6" class="my-1">
        <b-form-group
          label="Per page"
          label-for="per-page-select"
          label-cols-sm="6"
          label-cols-md="4"
          label-cols-lg="3"
          label-align-sm="right"
          label-size="sm"
          class="mb-0"
        >
          <b-form-select
            id="per-page-select"
            v-model="perPage"
            :options="pageOptions"
            size="sm"
          ></b-form-select>
        </b-form-group>
      </b-col>

      <b-col sm="7" md="6" class="my-1">
        <b-pagination
          v-model="currentPage"
          :total-rows="totalRows"
          :per-page="perPage"
          align="fill"
          size="sm"
          class="my-0"
        ></b-pagination>
      </b-col>
    </b-row>
    <b-row></b-row>
  </div>
</template>

<script>
import { mapState } from "vuex";
const caseStore = "caseStore";
export default {
  
  data() {
    return {
      totalRows: 1,
      currentPage: 1,
      perPage: 5,
      AllList: [],
      pageOptions: [5, 10, 15, { value: 100, text: "Show a lot" }],
    }
  },
  mounted() {
      // Set the initial number of items
    this.totalRows = this.allList.length
    this.allList.forEach(element => {
      this.AllList.push({
        "사건번호": element.caseno,
        "피해정도":element.vicdamage,
        "피해원인":element.caseissue,
        "사건장소": element.sidogugun,
        "피해자 성별":element.vicsex, 
        "피해자 교통수단":element.victrans,
        "피해자 나이":element.vicage,
      });
    });
    },
  computed: {
    ...mapState(caseStore, ["allList"]),
  },
}
</script>

<style>

</style>     -->