<template>
  <form-login/>
</template>

<script>
import FormLogin from '../components/FormLogin.vue';
export default {
  components: { FormLogin },
  name: "Login",

  beforeCreate() {
    if (localStorage.getItem("token")) {
      this.$router.push({
        name: "Admin",
      });
    }
  },
};
</script>