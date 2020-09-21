<template>
<div>
    <div class="page-title">
        <h3>Категории</h3>
    </div>
    <section>
        <loader v-if="loading"></loader>
        <div class="row" v-else>
            <category-create @created="addNewCategory"></category-create>

          <CategoryEdit
            v-if="categories.length"
            :categories="categories"
            :key="categories.length + updateCount"
            @updated="updateCategories"
          />
            <p v-else class="center">Категорий пока нет</p>
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
  data: () => ({
    categories: [],
    loading: true,
    updateCount: 0
  }),
  async mounted() {
    this.categories = await this.$store.dispatch('fetchCategories')
    this.loading = false
  },
  components: {
    CategoryCreate, CategoryEdit
  },
  methods: {
    addNewCategory(category) {
      this.categories.push(category)
    },
    updateCategories(category) {
      const idx = this.categories.findIndex(c => c.id === category.id)
      this.categories[idx].title = category.title
      this.categories[idx].limit = category.limit
      this.updateCount++
    }
  }
}
</script>

