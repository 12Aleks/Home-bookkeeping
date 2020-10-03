<template>
<div>
    <div>
        <div class="page-title">
            <h3>Профиль</h3>
        </div>

        <form class="form">
            <div class="input-field">
                <input id="description" type="text">
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
export default {
  name: 'Profile',

}
</script>

<style scoped>
 .switch{
   margin-bottom: 2rem;
 }
</style>
