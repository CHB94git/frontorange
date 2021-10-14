<template>
  <v-container fluid>
    <v-carousel
      class="my-1 rounded-lg"
      cycle
      height="90vh"
      width="100%"
      show-arrows-on-hover
    >
      <v-carousel-item
        v-for="(item, i) in items"
        :key="i"
        :src="item.src"
        reverse-transition="fade-transition"
        transition="fade-transition"
      >
        <v-toolbar flat class="elevation-10" color="green accent-4">
          <v-spacer></v-spacer>
          <v-toolbar-title> {{categorie}} {{ item.text }} </v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
      </v-carousel-item>
    </v-carousel>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      categorie: "Categoría:",
      items: [
        {
          src: "https://images.unsplash.com/photo-1597362925123-77861d3fbac7?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=870&q=80",
          text: "Verduras",
        },
        {
          src: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=870&q=80",
          text: "Frutas",
        },
        {
          src: "https://images.unsplash.com/photo-1437252611977-07f74518abd7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
          text: "Cereales",
        },
        {
          src: "https://images.unsplash.com/photo-1504283708523-52171518259f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=869&q=80",
          text: "Hortalizas",
        },
        {
          src: "https://images.pexels.com/photos/4451875/pexels-photo-4451875.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
          text: "Tubérculos",
        },
        {
          src: "https://images.pexels.com/photos/1192053/pexels-photo-1192053.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
          text: "Granos",
        },
      ],
    };
  },
};
</script>
