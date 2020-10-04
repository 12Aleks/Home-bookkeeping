<template>
  <div>
    <div>
      <div class="page-title">
        <h3>{{'Menu_New_record'|localizeFilter}}</h3>
      </div>

      <loader v-if="loading"></loader>

      <p v-else-if="!categories.length" class="center">   {{'NoCategories'| localizeFilter}}.
        <router-link to="/categories">{{'AddFirst'| localizeFilter}}</router-link>
      </p>

      <form v-else class="form" @submit.prevent="handlerSubmit">
        <div class="input-field">
          <select ref="select" v-model="category">
            <option v-for="c in categories" :key='c.id' :value="c.id">{{c.title}}</option>
          </select>
          <label>{{'SelectCategory'|localizeFilter}}</label>
        </div>

        <p>
          <label>
            <input class="with-gap" name="type" type="radio" value="income" v-model="type"/>
            <span>{{'Income'|localizeFilter}}</span>
          </label>
        </p>

        <p>
          <label>
            <input class="with-gap" name="type" type="radio" value="outcome" v-model="type"/>
            <span>{{'Outcome'|localizeFilter}}</span>
          </label>
        </p>

        <div class="input-field">
          <input id="amount" type="number" v-model.number="amount"
                 :class="{invalid: $v.amount.$dirty && !$v.amount.minValue}">
          <label for="amount">{{'Amount'|localizeFilter}}</label>
          <span v-if="$v.amount.$dirty && !$v.amount.minValue " class="helper-text invalid">{{'Message_MinLength'|localizeFilter}} {{$v.amount.$params.minValue.min}}</span>
        </div>

        <div class="input-field">
          <input id="description" type="text" v-model.trim="description"
                 :class="{invalid: $v.description.$dirty && !$v.description.required}">
          <label for="description">{{'Description'|  localizeFilter}}</label>
          <span class="helper-text invalid"
                v-if="$v.description.$dirty && !$v.description.required">{{'Message_EnterDescription'|localizeFilter}}</span>
        </div>

        <button class="btn waves-effect waves-light" type="submit">
          {{'CreateNewRecord'| localizeFilter}}
          <i class="material-icons right">send</i>
        </button>
      </form>

    </div>
  </div>
</template>

<script>
    /* eslint-disable */
    import {required, minValue} from 'vuelidate/lib/validators'
    import {mapGetters} from 'vuex'
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
      metaInfo() {
        return {
          title: this.$title('Menu_New_record')
        }
      },
        validations: {
            amount: {minValue: minValue(1)},
            description: {required}
        },
        computed: {
            ...mapGetters({
                info: 'info'
            }),
            canCreateRecord() {
                if (this.type === 'income') {
                    return true
                }

                return this.info.bill >= this.amount
            }
        },
        methods: {
            async handlerSubmit() {
                if (this.$v.$invalid) {
                    this.$v.$touch()
                    return
                }

                if (this.canCreateRecord) {
                    try{
                        await this.$store.dispatch('createRecord', {
                            categoryId: this.category,
                            amount: this.amount,
                            description: this.description,
                            type: this.type,
                            date: new Date().toJSON()
                        });
                        const bill = this.type === 'income'?
                            this.info.bill + this.amount :
                            this.info.bill - this.amount;
                        await this.$store.dispatch('updateInfo', {bill})
                        this.$message('Запись успешно создана')
                        this.$v.$reset()
                        this.amount = 1;
                        this.description = '';
                    }catch(e){}

                } else {
                    this.$message(`Недостаточно средств на счете, не хватает (${this.amount - this.info.bill}) `)
                }
            }
        },
        async mounted() {
            this.categories = await this.$store.dispatch('fetchCategories')
            this.loading = false

            if (this.categories.length) {
                this.category = this.categories[0].id
            }

            setTimeout(() => {
                this.select = M.FormSelect.init(this.$refs.select)
                M.updateTextFields()
            }, 0)
        },
        destroyed() {
            if (this.select && this.select.destroy) {
                this.select.destroy()
            }
        }
    }
</script>

