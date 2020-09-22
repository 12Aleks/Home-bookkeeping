<template>
<div>
    <div>
        <div class="page-title">
            <h3>Новая запись</h3>
        </div>

        <loader v-if="loading"></loader>

        <p v-else-if="!categories.length" class="center">Категорий пока не существует.<router-link to="/categories"> Добавить новую категорию</router-link> </p>

        <form v-else class="form" @submit.prevent="handlerSubmit">
            <div class="input-field">
                <select ref="select" v-model="category">
                    <option v-for="c in categories" :key='c.id' :value="c.id">{{c.title}}</option>
                </select>
                <label>Выберите категорию</label>
            </div>

            <p>
                <label>
                    <input class="with-gap" name="type" type="radio" value="income" v-model="type"/>
                    <span>Доход</span>
                </label>
            </p>

            <p>
                <label>
                    <input class="with-gap" name="type" type="radio" value="outcome" v-model="type" />
                    <span>Расход</span>
                </label>
            </p>

            <div class="input-field">
                <input id="amount" type="number" v-model.number="amount" :class="{invalid: $v.amount.$dirty && !$v.amount.minValue && $v.amount.required}">
                <label for="amount">Сумма</label>
                <span v-if="$v.amount.$dirty && !$v.amount.minValue && $v.amount.required" class="helper-text invalid">Минимальное значение {{$v.amount.$params.minValue.min}}</span>
            </div>

            <div class="input-field">
                <input id="description" type="text" v-model.trim="description" :class="{invalid: $v.description.$dirty && $v.description.required}">
                <label for="description">Описание</label>
                <span class="helper-text invalid" v-if="$v.description.$dirty && $v.description.required">Введите описание</span>
            </div>

            <button class="btn waves-effect waves-light" type="submit">
                Создать
                <i class="material-icons right">send</i>
            </button>
        </form>

    </div>
</div>
</template>

<script>
  /* eslint-disable */
  import {required, minValue} from 'vuelidate/lib/validators'
  import M from 'materialize-css'
export default {
    name: 'Record',
    data: () => ({
      loading: true,
      select: null,
      categories: [],
      category: null,
      type: 'outcome',
      amount: 1,
      description: ''
    }),
    validations: {
      amount: {required: true, minValue: minValue(1)},
      description: {required: true}
    },
    methods:{
      async handlerSubmit(){
        if(this.$v.invalid){
          this.$v.$touch()
          return
        }
      }
    },
    async mounted(){
      this.categories = await this.$store.dispatch('fetchCategories')
      this.loading = false

      if(this.categories.length){
        this.category = this.categories[0].id
      }

      setTimeout(() =>{
        this.select = M.FormSelect.init(this.$refs.select)
      }, 0)
    },
    destroyed() {
      if(this.select && this.select.destroy){
         this.select.destroy()
      }
    }
}
</script>

