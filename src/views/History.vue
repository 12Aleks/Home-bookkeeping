<template>
<div>
    <div>
        <div class="page-title">
            <h3>История записей</h3>
        </div>

        <div class="history-chart">
            <canvas></canvas>
        </div>
        <Loader v-if="loading"></Loader>

        <p class="center" v-else-if="!records.length">Записей пока нет <router-link to="/record">Добавить</router-link></p>

        <section v-else>
          <history-table :records="records"></history-table>
        </section>
    </div>
</div>
</template>

<script>/*eslint-disable*/
import HistoryTable from "../components/HistoryTable";
export default {
    name: 'History',
    data: () => ({
      loading: true,
      records: [],
      categories: []
    }),
    async mounted(){
      // this.records = this.$store.dispatch('fetchRecords')
      const records = await this.$store.dispatch('fetchRecords')
      this.categories = await this.$store.dispatch('fetchCategories')
      this.records = records.map(record => {
        return {
          ...record,
          categoryName: this.categories.find(c => c.id === record.categoryId).title,
          typeClass: record.type === 'income'? 'green' : 'red',
          typeText: record.type === 'income'? 'Доход': 'Расход'
        }
      })

      this.loading = false
    },
    components:{
      HistoryTable
    }
}
</script>
