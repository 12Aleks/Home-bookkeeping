
<template>
  <div class="grey darken-1 empty-layout">
    <router-view/>
  </div>
</template>

<script>
  import message from "../utils/message";

  export default {
    computed: {
      error() {
        return this.$store.getters.error
      }
    },
    watch: {
      error(fbError) {
        console.log(fbError)
        this.$error(message[fbError.code] || 'Что-то пошло не так' )
      }
    }
  }
</script>
