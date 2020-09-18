<template>
<div>
    <div class="page-title">
        <h3>Категории</h3>
    </div>
    <section>
        <loader v-if="loading"></loader>
        <div class="row" v-else>
            <category-create @created="addNewCategory"></category-create>

            <category-edit></category-edit>
        </div>
    </section>
</div>
</template>

<script>
  /*eslint-disable*/
  import CategoryCreate from '../components/CategoryCreate'
  import CategoryEdit from '../components/CategoryEdit'
export default {
    name: 'Categories',
    data:() =>({
      categories: [],
      loading: true
    }),
    async mounted(){
     this.categories = await this.$store.dispatch('fetchCategories')
     this.loading = false
    },
    components: {
      CategoryCreate,
      CategoryEdit
    },
    methods:{
        addNewCategory(category){
            this.categories.push(category)
        }
    }
}
</script>

