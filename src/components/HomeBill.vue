<template>
  <div class="col s12 m6 l4">
    <div class="card light-blue bill-card">
      <div class="card-content white-text">
        <span class="card-title">{{'BillInCurrency'| localizeFilter}}</span>

        <p v-for="cur in currencies"
           :key="cur"
           class="currency-line">
          <span>{{getCurrency(cur) | currencyFilter(cur)}}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['rates'],
  data: () => ({
    currencies: ["PLN", "USD", "EUR", "UAH"],
    test: ''
  }),
  computed: {
    base() {
      return (
        this.$store.getters.info.bill / (this.rates["PLN"] / this.rates["EUR"])
      );
    }
  },
  methods: {
    getCurrency(currency) {
      return Math.floor(this.base * this.rates[currency]);
    }
  }
};
</script>
