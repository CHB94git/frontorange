<template>
  <v-app>
    <header
      v-if="
        ![
          'Admin',
          'Users',
          'Categories',
          'Products',
          'Team',
          'About',
          'ListProducts',
          'Team',
          'Index',
        ].includes($route.name)
      "
    ></header>
    <navigation />
    <v-main>
      <router-view />
    </v-main>
    <app-footer />
  </v-app>
</template>

<script>
import Navigation from "./components/Navigation.vue";
import AppFooter from "./components/AppFooter.vue";

export default {
  components: { Navigation, AppFooter },
  name: "App",

  data: () => ({
    //
  }),
};
</script>
