<template>
  <ul class="sidenav app-sidenav" :class="{open: value}">
    <router-link
      tag="li"
      active-class="active"
      v-for="link in links"
      :key="link.url"
      :to="link.url"
      :exact="link.exact"
    >
      <a href="#" class="waves-effect waves-orange pointer">{{ link.title }}</a>
    </router-link>
  </ul>
</template>

<script>
export default {
  name: "Sidebar",
  props: ["value"],
  data() {
    return {
      links: [
        { title: "Счет", url: "/", exact: true },
        { title: "История", url: "/history" },
        { title: "Планирование", url: "/planing" },
        { title: "Новая запись", url: "/record" },
        { title: "Категории", url: "/categories" }
      ]
    };
  }
};
</script>
