<template>
  <v-container>
    <div id="nav">
      <router-link :to="{ name: 'Home' }">Home</router-link> |
      <router-link 
      v-if="!isLogin"
      :to="{ name: 'Login' }">Login</router-link> 
      <router-link 
        v-else
      :to="{ name: 'Admin' }">Admin</router-link>
    </div>
  </v-container>
</template>

<script>
export default {
  name: "Navigation",
  computed: {
    isLogin(){
      return localStorage.getItem('token') ? true : false
    }
  }
};
</script>


<style scoped>
#nav {
  padding: 30px;
  display: flex;
  justify-content: center;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
  padding: 0 30px;
  text-decoration: none;
}

#nav a.router-link-exact-active {
  color: orange;
}
</style>