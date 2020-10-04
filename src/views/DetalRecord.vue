<template>
<div>
     <Loader v-if="loading"></Loader>
    <div v-else-if="record">
        <div class="breadcrumb-wrap">
            <router-link to="/history" class="breadcrumb">{{'Menu_History'| localizeFilter}}</router-link>
            <a @click.prevent class="breadcrumb">
              {{ record.type === 'income' ? 'Income' : 'Outcome' | localizeFilter }}
            </a>
        </div>
        <div class="row">
            <div class="col s12 m6">
                <div class="card" :class="{
                  'red': record.type === 'outcome',
                  'green': record.type === 'income'}">
                    <div class="card-content white-text">
                        <p>{{'Description'|localizeFilter}}: {{record.description}}</p>
                        <p>{{'Amount'| localizeFilter}}: {{record.amount | currencyFilter}}</p>
                        <p>{{'Category'| localizeFilter}}: {{record.categoryName}}</p>

                        <small>{{record.date | dateFilter('date time')}}</small>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <p class="center" v-else>Запись с id = {{$route.params.id}} не найдена</p>
</div>
</template>


<script>/*eslint-disable*/
  export default {
    name: 'DetalRecord',
    metaInfo(){
      return{
        title: this.$title('Detail_title')
      }
    },
    data:() => ({
      record: null,
      loading: true
    }),
    async mounted(){
      const id = this.$route.params.id
      const record = await this.$store.dispatch('fetchRecordById', id)
      const category = await this.$store.dispatch('fetchCategoryById', record.categoryId)

      this.record = {
        ...record,
           categoryName: category.title
      }
      this.loading = false
    }
  }
</script>

