<template>
  <v-container>
    <v-row class="text-center">
      <v-col
        class="mb-5"
        cols="12"
      >
        <h1 class="headline font-weight-bold mb-3">
         Bienvenido a OrangeApp
        </h1>
      </v-col>
      <v-col cols="12">
        <v-img
          :src="require('../assets/Welcome.svg')"
          class="my-3"
          contain
          width="100%"
          max-height="350"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "HelloWorld",

  data: () => ({}),
};
</script>
