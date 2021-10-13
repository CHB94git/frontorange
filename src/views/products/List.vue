<template>
  <v-container fluid>
    <v-row dense>
      <v-col v-for="product in displayedProducts" :key="product._id">
        <v-card class="mx-auto my-2" max-width="400">
          <v-img
            class="white--text align-end"
            height="240px"
            :src="product.src"
          >
            <v-card-title v-text="product.name"></v-card-title>
          </v-img>

          <v-card-text class="text--primary">
            <div><strong>Categoría: </strong> {{ product.category }}</div>
          </v-card-text>

          <v-divider></v-divider>
          <v-card-text
            ><strong>Descripción</strong> <br />
            {{ product.description }}</v-card-text
          >

          <v-card-actions>
            <v-btn
              color="orange accent-2"
              outlined
              block
              @click="(dialog = true), getOneProduct(product)"
              class="elevation-5"
            >
              <v-icon class="xs">mdi-eye</v-icon>
              Ver más...
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <v-dialog v-model="dialog" persistent max-width="400px">
      <v-card :loading="loading" class="mx-auto" max-width="96%">
        <template slot="progress">
          <v-progress-linear
            color="green accent-4"
            height="10"
            indeterminate
          ></v-progress-linear>
        </template>

        <v-img height="250" v-model="src" :src="this.src"></v-img>

        <v-card-title v-model="name"> {{ this.name }}</v-card-title>

        <v-card-text v-model="category"
          ><b>Categoría: </b>{{ this.category }}</v-card-text
        >
        <v-spacer></v-spacer>
        <v-card-text v-model="codeProduct"
          ><b>Código del producto: </b>{{ this.codeProduct }}</v-card-text
        >
        <v-card-text v-model="stock">
          <b>Stock: </b>{{ this.stock }}
        </v-card-text>
        <v-card-text v-model="price"
          ><b>Precio: </b>${{ this.price }}
        </v-card-text>

        <v-divider class="mx-2"></v-divider>

        <v-card-title v-model="description">Descripción <br /></v-card-title>
        <v-card-text cols="12">{{ this.description }}</v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red" text @click="dialog = false"> Cerrar </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <div class="text-center my-1">
      <v-container>
        <v-row justify="center">
          <v-col cols="6">
            <v-container class="max-width">
              <v-pagination
                v-model="page"
                :length="length"
                prev-icon="mdi-menu-left"
                next-icon="mdi-menu-right"
              >
              </v-pagination>
            </v-container>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </v-container>
</template>


<script>
import { getAllProducts, getById } from "../../controllers/ProductsController";

export default {
  data() {
    return {
      dialog: false,
      loading: false,
      selection: 1,
      descrip: "Descripción",
      page: 1,
      length: 1,
      products: [],
      product: "",
      id: "",
      codeProduct: "",
      name: "",
      price: "",
      src: "",
      stock: "",
      category: "",
      description: "",
    };
  },
  created() {
    getAllProducts()
      .then((response) => {
        this.products = response.data;
      })
      .catch((err) => console.error(err));
  },
  methods: {
    reserve() {
      this.loading = true;
      setTimeout(() => (this.loading = false), 2000);
    },

    getOneProduct(product) {
      getById(this.id)
        .then(() => {
          console.log(this.id);
          this.id = product._id;
          this.codeProduct = product.codeProduct;
          this.name = product.name;
          this.price = product.price;
          this.src = product.src;
          this.stock = product.stock;
          this.category = product.category;
          this.description = product.description;
        })
        .catch((err) => console.error(err));
    },
  },

  computed: {
    displayedProducts() {
      const { page, length, products } = this;
      const number = Math.ceil(products.length / length); // Numero de elementos a mostrar por página
      return this.products.slice((page - 1) * number, page * number);
    },
  },
};
</script>
