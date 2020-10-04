<template>
  <table>
    <thead>
    <tr>
      <th>#</th>
      <th>{{'Amount'| localizeFilter}}</th>
      <th>{{'Date'|localizeFilter}}</th>
      <th>{{'Category'|localizeFilter}}</th>
      <th>{{'Type'|localizeFilter}}</th>
      <th>{{'Open'|localizeFilter}}</th>
    </tr>
    </thead>

    <tbody>
    <tr v-for="(record, index) in records" :key="record.id">
      <td>{{index + 1}}</td>
      <td>{{record.amount| currencyFilter('PLN')}}</td>
      <td>{{record.date | dateFilter('data time')}}</td>
      <td>{{record.categoryName}}</td>
      <td>
        <span class="white-text badge" :class="[record.typeClass]">{{record.typeText}}</span>
      </td>
      <td>
        <button v-tooltipe="'OpenRecord'" class="btn-small btn" @click="$router.push('/detail/' + record.id)">
          <i class="material-icons">open_in_new</i>
        </button>
      </td>
    </tr>
    </tbody>
  </table>
</template>

<script>/*eslint-disable*/
    export default {
        name: "HistoryTable",
        props: {
          records: {
            required: true,
            type: Array
          }
        }
    }
</script>

<style scoped>

</style>
