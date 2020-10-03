<template>
<div>
    <div>
        <div class="page-title">
            <h3>Профиль</h3>
        </div>

        <form class="form" @submit.prevent="submitHandler">
            <div class="input-field">
                <input id="description" type="text" v-model="name" :class="{invalid: $v.name.$dirty && !$v.name.required}">
                <label for="description">Имя</label>
                <small class="helper-text invalid"
                v-if="$v.name.$dirty && !$v.name.required"
                >Введите имя</small>
            </div>


           <div class="switch">
             <label>
              English
               <input type="checkbox">
               <span class="lever"></span>
              Russian
             </label>
           </div>


            <button class="btn waves-effect waves-light" type="submit">
                Обновить
                <i class="material-icons right">send</i>
            </button>
        </form>
    </div>
</div>
</template>

<script>/*eslint-disable*/
import {mapGetters, mapActions} from 'vuex'
import M from 'materialize-css'
import {required} from 'vuelidate/lib/validators'

export default {
  name: 'Profile',
  data: () => ({
    name: ''
  }),
  validations: {
    name: {required}
  },
  mounted(){
      this.name = this.infoUser.name;
      setTimeout(() => {
        M.updateTextFields()
      }, 0)

  },
  computed:{
    ...mapGetters({
      infoUser : 'info'
    })
  },
  methods: {
    ...mapActions(["updateInfo"]),
    async submitHandler() {
      if(this.$v.$invalid){
        this.$v.$touch()
        return
      }
      try{
       await this.updateInfo({
         name: this.name
       })
      }catch(e){}

    }
  }
}
</script>

<style scoped>
 .switch{
   margin-bottom: 2rem;
 }
</style>
