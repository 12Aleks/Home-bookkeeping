<template>
  <div>
    <Loader v-if="loading"></Loader>
    <div class="app-main-layout" v-else>
      <navbar @click="isOpen = !isOpen"></navbar>

      <sidebar :value="isOpen" :key="locale"></sidebar>

      <main class="app-content" :class="{full : !isOpen}">
        <div class="app-page">
          <router-view/>
        </div>
      </main>

      <div class="fixed-action-btn">
        <router-link class="btn-floating btn-large blue" to="/record" v-tooltipe="'Создать новую запись'">
          <i class="large material-icons">add</i>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
  import Navbar from "@/components/app/Navbar";
  import Sidebar from "@/components/app/Sidebar";
  import message from "../utils/message";


  export default {
    name: "MainLayout",
    data: () => ({
      isOpen: true,
      loading: true
    }),
    async mounted() {
      if (!Object.keys(this.$store.getters.info).length) {
        await this.$store.dispatch('fetchInfo')
      }
      this.loading = false
    },
    components: {
      Navbar,
      Sidebar
    },
    computed: {
      error() {
        return this.$store.getters.error
      },
      locale() {
        return this.$store.getters.info.locale
      }
    },
    watch: {
      // locale(){
      //
      // },
      error(fbError) {
        this.$error(message[fbError.code] || 'Что-то пошло не так' )
      }
    }
  };
</script>
