<template>
<div>
    <div class="page-title">
        <h3>Категории</h3>
    </div>
    <section>
        <div class="row">
            <category-create></category-create>

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
    components: {
      CategoryCreate,
      CategoryEdit
    }
}
</script>

