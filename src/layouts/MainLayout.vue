<template>
  <div>
    <Loader v-if="loading"></Loader>
    <div class="app-main-layout" v-else>
      <navbar @click="isOpen = !isOpen"></navbar>
      <sidebar :value="isOpen"></sidebar>

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
    }
  };
</script>
