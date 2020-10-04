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
  import localizeFilter from "../../filter/localize.filter";
export default {
  name: "Sidebar",
  props: ["value"],
  data() {
    return {
      links: [
        { title: localizeFilter('Menu_Count'), url: "/", exact: true },
        { title: localizeFilter('Menu_History'), url: "/history" },
        { title: localizeFilter('Menu_Planning'), url: "/planing" },
        { title: localizeFilter('Menu_New_record'), url: "/record" },
        { title: localizeFilter('Menu_Categories'), url: "/categories" }
      ]
    };
  }
};
</script>
