<template>
  <v-footer class="footer" dark padless>
    <v-card-text class="py-2 white--text text-center">
      {{ new Date().getFullYear() }} — <strong>OrangeApp </strong> &copy; Todos
      los derechos reservados - Desarrollado por E-0-6
    </v-card-text>
  </v-footer>
</template>


<script>
export default {
  name: "AppFooter",
};
</script>

<style scoped>
.footer {
  display: flex;
  width: 100%;
  align-self: flex-end;
}
</style>