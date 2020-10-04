<template>
  <div>
    <div class="page-title">
      <h3>{{'Menu_Count' | localizeFilter}}</h3>

      <button class="btn waves-effect waves-light btn-small" @click="refresh">
        <i class="material-icons">refresh</i>
      </button>
    </div>
    <Loader v-if='loading'></Loader>
    <div v-else class="row">
      <home-bill
       :rates='currency.rates'
      ></home-bill>
      <home-currency
        :rates='currency.rates'
        :date='currency.date'
      ></home-currency>
    </div>
  </div>
</template>

<script>
/*eslint-disable*/
import HomeBill from "@/components/HomeBill";
import HomeCurrency from "@/components/HomeCurrency";
export default {
  name: "Home",
  data: () =>({
   loading: true,
   currency: null
  }),
  metaInfo() {
    return {
      title: this.$title('Menu_Count')
    }
  },
 async mounted(){
  this.currency = await this.$store.dispatch('fetchCurrency')
  this.loading = false
  },
  components: {
    HomeBill,
    HomeCurrency
  },
  methods:{
   async refresh(){
      this.loading = true
      this.currency = await this.$store.dispatch('fetchCurrency')
      this.loading = false
    }
  }
};
</script>
