<template>
  <v-container>
    <v-row class="text-center">
      <v-col
        class="mb-5"
        cols="12"
      >
        <h1 class="headline font-weight-bold mb-3">
        Acerca de esta App
        </h1>
      </v-col>
      <v-col cols="12">
        <v-img
          :src="require('../assets/AboutUsPage.svg')"
          class="my-2"
          contain
          width="100%"
          max-height="350"
        />
      </v-col>
      <v-col
        class="mb-5"
        cols="12"
      >
        <h3 class="headline font-weight-normal mb-3">
            OrangeApp nace de la idea de un mercado online orientado a los productos agrícolas, donde un usuario podría tener un perfil y manejar sus productos para ofrecerlos en línea a modo de mercado.
        </h3>
      </v-col>
    </v-row>

    <v-row class="text-center">
      <v-col
        class="mb-5"
        cols="12"
      >
        
      </v-col>
      <v-col cols="12" md="6">
          <h1 class="headline font-weight-bold mt-3">
         Nuestra marca
        </h1>
        <v-img
          src="@/assets/img/Orange_Logo.png"
          class="my-5"
          contain
          width="100%"
          max-height="150"
        />
       
      </v-col>
      <v-col cols="12" md="6">
          <h1 class="headline font-weight-bold mt-3">
         Nuestros servicios
        </h1>
        <ul class="mt-7 list">
            <li>Administración de productos</li>
            <li>Perfiles de usuario</li>
            <li>Mercado online</li>
        </ul>
      </v-col>
    </v-row>

    
  </v-container>
</template>

<script>
export default {
  name: "infoAbout",

  data: () => ({}),
};
</script>

<style scoped>
.list{
    margin: 20px;
    list-style: none;
    font-size: 20px;
    font-weight: bold;
}
</style>