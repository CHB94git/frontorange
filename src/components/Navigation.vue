<template>
<v-container>
     <!-- <v-app-bar dense app color="orange accent-2" dark>
      <router-link :to="{name: 'Home'}">Home</router-link> |
      <router-link :to="{name: 'About'}">About</router-link> |
      <router-link :to="{name: 'Login'}">Login</router-link> |
      <router-link :to="{name: 'Admin'}">Admin</router-link> 
    </v-app-bar> -->


     <div id="nav">
      <router-link :to="{name: 'Home'}">Home</router-link> |
      <router-link :to="{name: 'About'}">About</router-link> |
      <router-link :to="{name: 'Login'}">Login</router-link> |
      <router-link :to="{name: 'Admin'}">Admin</router-link> 
    </div>


</v-container>


   
</template>

<script>
export default {
    name: 'Navigation'
}
</script>


<style scoped>

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
  padding: 0 30px;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>