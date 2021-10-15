<template>

  <v-card class="mx-auto overflow-hidden" height="100%">
    <v-app-bar color="orange accent-2" dark dense app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title> {{ titleApp }} </v-toolbar-title>
      <v-spacer></v-spacer>
      <div class="pa-2">
        <v-btn color="black" @click="LogOut">
          <v-icon class="mx-2">mdi-logout</v-icon></v-btn
        >
      </div>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" temporary absolute>
      <v-list nav dense>
        <v-list-item-group
          v-model="group"
          active-class="green lighten-2--text text--lighten-2"
        >
          <v-list-item exact :to="{ name: 'Home' }">
            <v-list-item-icon>
              <v-icon>mdi-home</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item>

          <v-list-item class="mt-2" exact :to="{ name: 'Index' }">
            <v-list-item-icon>
              <v-icon>mdi-cube-unfolded</v-icon>
            </v-list-item-icon>
            <v-list-item-title>App Index</v-list-item-title>
          </v-list-item>

          <v-list-item class="mt-2" :to="{ name: 'ListProducts' }">
            <v-list-item-icon>
              <v-icon>mdi-clipboard-list</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Lista de Productos</v-list-item-title>
          </v-list-item>

          <v-list-item v-if="isAdmin" class="mt-2" :to="{ name: 'Users' }">
            <v-list-item-icon>
              <v-icon>mdi-account-multiple-plus</v-icon>
            </v-list-item-icon>
            <v-list-item-title>CRUD Usuarios</v-list-item-title>
          </v-list-item>

          <v-list-item v-if="isAdmin" class="mt-2" :to="{ name: 'Products' }">
            <v-list-item-icon>
              <v-icon>mdi-view-dashboard</v-icon>
            </v-list-item-icon>
            <v-list-item-title>CRUD Productos</v-list-item-title>
          </v-list-item>

          <v-list-item v-if="isAdmin" class="mt-2" :to="{ name: 'Categories' }">
            <v-list-item-icon>
              <v-icon>mdi-shape</v-icon>
            </v-list-item-icon>
            <v-list-item-title>CRUD Categorías</v-list-item-title>
          </v-list-item>

          <v-list-item class="mt-2" :to="{ name: 'Team' }">
            <v-list-item-icon>
              <v-icon>mdi-human-male-board-poll</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Team</v-list-item-title>
          </v-list-item>

          <v-list-item class="mt-2" :to="{ name: 'About' }">
            <v-list-item-icon>
              <v-icon>mdi-information</v-icon>
            </v-list-item-icon>
            <v-list-item-title>About</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <router-view />
  </v-card>
  

</template>


<script>
import decode from "jwt-decode";

export default {
  name: "Admin",

  data() {
    return {
      titleApp: "OrangeApp",
      drawer: false,
      group: null,
    };
  },

  methods: {
    LogOut() {
      localStorage.removeItem("token");
      this.$router.push({
        name: "Login",
      });
    },
  },

  computed: {
    isAdmin() {
      let token = decode(localStorage.getItem("token"));
      return token.role === "Administrador" ? true : false;
    },
  },
};
</script>


<style scope>
.route {
  text-decoration: none;
}
</style>