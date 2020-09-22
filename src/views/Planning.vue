<template>
<div>
    <div>
        <div class="page-title">
            <h3>Планирование</h3>
            <h4>12 212</h4>
        </div>

        <loader v-if="loading"></loader>

        <section v-else>
            <div>
                <p>
                    <strong>Девушка:</strong>
                    12 122 из 14 0000
                </p>
                <div class="progress">
                    <div class="determinate green" style="width:40%"></div>
                </div>
            </div>
        </section>
    </div>
</div>
</template>

<script>
export default {
    name: 'Planning',
    data: () => ({
      loading: true,
      categories: []
    }),
    async mounted(){
      // const records = await this.$store.dispatch('fetchRecords')
      // const categories = await this.$store.dispatch('fetchCategories')

      this.loading = false
    }

}
</script>
