<template>
  <v-container fluid>
    <v-card class="mx-auto mb-1 elevation-15">
      <v-card-title>
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify-plus-outline"
          label="Buscar..."
          single-line
          hide-details
          color="#2C3A47"
        >
        </v-text-field>
      </v-card-title>
    </v-card>

    <v-data-table
      :headers="headers"
      :items="products"
      sort-by="codeProduct"
      class="elevation-15 rounded-lg"
      :search="search"
    >
      <template v-slot:top>
        <v-toolbar flat class="rounded-lg" md-4>
          <v-toolbar-title>Productos</v-toolbar-title>

          <v-divider class="mx-3" inset vertical></v-divider>

          <v-spacer></v-spacer>

          <v-dialog v-model="dialog" max-width="600px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                color="orange accent-2"
                dark
                class="mb-2 elevation-7"
                v-bind="attrs"
                v-on="on"
              >
                Nuevo producto
              </v-btn>
            </template>

            <v-card max-width="98%">
              <v-form @submit.prevent="save" ref="product" lazy-validation>
                <v-card-title>
                  <span class="text-h5">{{ formTitle }}</span>
                </v-card-title>

                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12" sm="4">
                        <v-text-field
                          v-model="product.codeProduct"
                          label="Código del producto"
                        ></v-text-field>
                      </v-col>

                      <v-col cols="12" sm="8">
                        <v-text-field
                          v-model="product.name"
                          label="Nombre del producto"
                        ></v-text-field>
                      </v-col>

                      <v-col cols="12">
                        <v-text-field
                          v-model="product.src"
                          label="Link imagen (fuente)"
                        ></v-text-field>
                      </v-col>

                      <v-col cols="12" sm="4">
                        <v-text-field
                          v-model="product.stock"
                          label="Stock"
                          type="number"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="4">
                        <v-text-field
                          v-model="product.price"
                          label="Precio"
                          type="number"
                          prefix="$"
                        ></v-text-field>
                      </v-col>

                      <v-col cols="12" sm="4">
                        <v-select
                          v-model="product.category"
                          :items="categories"
                          label="Categoría"
                        ></v-select>
                      </v-col>

                      <v-col cols="12">
                        <v-textarea
                          v-model="product.description"
                          counter
                          label="Descripción"
                          :rules="rules"
                          rows="5"
                        ></v-textarea>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="red" text @click="close"> Cancelar </v-btn>
                  <v-btn color="green" type="submit" text> Guardar </v-btn>
                </v-card-actions>
              </v-form>
            </v-card>
          </v-dialog>

          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="text-h5"
                >¿Está seguro/a de eliminar el producto?</v-card-title
              >
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="red" text @click="closeDelete">Cancelar</v-btn>
                <v-btn color="green" text @click="deleteItemConfirm"
                  >Aceptar</v-btn
                >
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>

      <template v-slot:item.actions="{ item }">
        <v-icon color="green accent-4" class="mr-2" @click="editProduct(item)">
          mdi-pencil
        </v-icon>
        <v-icon color="red" @click="deleteProduct(item)"> mdi-delete </v-icon>
      </template>

      <template v-slot:no-results>
        <v-alert
          :value="true"
          color="red accent-2"
          icon="warning"
          dark
          class="mt-2"
        >
          Tú busqueda "{{ search }}" no existe!
        </v-alert>
      </template>
    </v-data-table>

    <v-snackbar v-model="snackbar" bottom right :color="color">
      {{ text }}
      <v-btn color="black" text @click="snackbar = false"> Cerrar </v-btn>
    </v-snackbar>
  </v-container>
</template>


<script>
import {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../../controllers/ProductsController";

export default {
  data: () => ({
    rules: [(v) => v.length <= 250 || "Max 250 carácteres"],
    //units: ["Libra", "Kilo", "Arroba", "Bulto", "Canasta", "Carga"],
    categories: [
      "Verduras",
      "Frutas",
      "Cereales",
      "Hortalizas",
      "Tubérculos",
      "Granos",
    ],
    dialog: false,
    dialogDelete: false,
    headers: [
      { text: "Código producto", value: "codeProduct" },
      {
        text: "Nombre del producto",
        align: "start",
        value: "name",
      },
      { text: "Precio", value: "price" },
      { text: "Stock", value: "stock" },
      { text: "Categoría", value: "category" },
      { text: "Descripción", value: "description" },
      { text: "Acciones", value: "actions", sortable: false },
    ],
    products: [],
    productIndex: -1,
    search: "",
    snackbar: false,
    text: "",
    color: "",

    product: {
      codeProduct: "",
      name: "",
      price: "",
      src: "",
      stock: "",
      category: "",
      description: "",
    },
    default: {
      codeProduct: "",
      name: "",
      price: "0",
      src: "",
      stock: "0",
      category: "",
      description: "",
    },
  }),

  computed: {
    formTitle() {
      return this.productIndex === -1 ? "Crear producto" : "Editar producto";
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },

  created() {
    this.loadAllProducts();
  },

  methods: {
    loadAllProducts() {
      getAllProducts()
        .then((response) => {
          this.products = response.data;
        })
        .catch((err) => console.error(err));
    },

    save() {
      if (this.productIndex > -1) {
        this.update();
      } else {
        this.create();
      }
      this.close();
    },

    create() {
      let request = null;
      const product = {
        codeProduct: this.product.codeProduct,
        name: this.product.name,
        price: this.product.price,
        src: this.product.src,
        stock: this.product.stock,
        category: this.product.category,
        description: this.product.description,
      };
      request = createProduct(product);

      request
        .then(() => {
          (this.color = "success"),
            (this.text = "El producto se ha creado correctamente!"),
            (this.snackbar = true);
          this.loadAllProducts();
        })
        .catch((err) => {
          console.error(err);
          this.color = "error";
          this.text = "Fallido!, Ha ocurrido un error.";
          this.snackbar = true;
        });
      this.close();
      
    },

    update() {
      const product = {
        codeProduct: this.product.codeProduct,
        name: this.product.name,
        price: this.product.price,
        src: this.product.src,
        stock: this.product.stock,
        category: this.product.category,
        description: this.product.description,
      };
      console.log(this.product._id);
      updateProduct(this.product._id, product)
        .then((res) => {
          console.log(res);
          (this.color = "info"),
            (this.text = "El producto ha sido modificado correctamente!"),
            (this.snackbar = true);
          this.loadAllProducts();
        })
        .catch((err) => {
          console.error(err);
          this.color = "error";
          this.text = "Fallido!, Ha ocurrido un error.";
          this.snackbar = true;
        });
      this.close();
    },

    deleteItemConfirm() {
      console.log(this.product._id);
      deleteProduct(this.product._id)
        .then((res) => {
          console.log(res);
          this.color = "success";
          this.text = "El producto ha sido eliminado";
          this.snackbar = true;
          this.loadAllProducts();
        })
        .catch((error) => {
          console.log(error);
          this.color = "error";
          this.text = "Fallido!, Ha ocurrido un error.";
          this.snackbar = true;
        });
      this.closeDelete();
    },

    editProduct(item) {
      this.productIndex = this.products.indexOf(item);
      this.product = Object.assign({}, item);
      this.dialog = true;
    },

    deleteProduct(item) {
      this.productIndex = this.products.indexOf(item);
      this.product = Object.assign({}, item);
      this.dialogDelete = true;
    },

    close() {
      this.dialog = false;
      setTimeout(() => {
        this.product = Object.assign({}, this.default);
        this.productIndex = -1;
      }, 300);
    },

    closeDelete() {
      this.dialogDelete = false;
      setTimeout(() => {
        this.product = Object.assign({}, this.default);
        this.productIndex = -1;
      }, 300);
    },
  },
};
</script>