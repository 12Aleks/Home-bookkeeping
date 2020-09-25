<template>
<div>
    <div>
        <div class="page-title">
            <h3>Планирование</h3>
            <h4>{{info.bill | currencyFilter('PLN')}}</h4>
        </div>

        <loader v-if="loading"></loader>

        <section v-else>
            <div v-for="cat of categories" :key="cat.id">
                <p>
                    <strong>{{cat.title}}:</strong>
                    {{cat.spend | currencyFilter}} из {{cat.limit | currencyFilter}}
                </p>
                <div class="progress" v-tooltipe="cat.tooltip">
                    <div class="determinate"
                         :class="[cat.progressColor]"
                         :style="{width: cat.progressPersent + '%'}"></div>
                </div>
            </div>
        </section>
    </div>
</div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import currencyFilter from '@/filter/currency.filter'

export default {
    /*eslint-disable*/
    name: 'Planning',
    data: () => ({
      loading: true,
      categories: []
    }),
    computed:{
      ...mapGetters({
        info: "info"
      })
    },
    async mounted(){
      const records = await this.$store.dispatch('fetchRecords')
      const categories = await this.$store.dispatch('fetchCategories')

     // debugger
      this.categories = categories.map(cat => {
        const spend = records
         .filter(r => r.categoryId === cat.id)
         .filter(r => r.type === 'outcome')
        .reduce((total, record) => {
          return total += +record.amount
        }, 0)

        const persent = 100 * spend / cat.limit;
        const progressPersent = persent > 100 ? 100 : persent;
        const progressColor = persent < 60? 'green': persent < 100 ? 'yellow' : 'red';

        const tooltipValue = cat.limit - spend;
        const tooltip = `${tooltipValue < 0? 'Привышение на' : 'Осталось' } ${currencyFilter(Math.abs(tooltipValue))}`

        return {
          ...cat,
          progressColor,
          progressPersent,
          spend,
          tooltip
        }
      });

      this.loading = false
    }

}
</script>
