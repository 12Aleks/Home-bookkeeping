<template>
<div>
    <div>
        <div class="page-title">
            <h3>Профиль</h3>
        </div>

        <form class="form">
            <div class="input-field">
                <input id="description" type="text" v-model="name">
                <label for="description">Имя</label>
                <span class="helper-text invalid">name</span>
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

<script>
import {mapGetters} from 'vuex'
import M from 'materialize-css'

export default {
  name: 'Profile',
  data: () => ({
    name: ''
  }),
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
  }
}
</script>

<style scoped>
 .switch{
   margin-bottom: 2rem;
 }
</style>
