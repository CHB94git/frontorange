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
      :items="categories"
      sort-by="codeCategory"
      class="elevation-15 rounded-lg"
      :search="search"
    >
      <template v-slot:top>
        <v-toolbar flat class="rounded-lg" md-4>
          <v-toolbar-title>Categorías</v-toolbar-title>

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
                Nueva categoría
              </v-btn>
            </template>

            <v-card max-width="98%">
              <v-form @submit.prevent="save" ref="category" lazy-validation>
                <v-card-title>
                  <span class="text-h5">{{ formTitle }}</span>
                </v-card-title>

                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12" sm="4">
                        <v-text-field
                          type="number"
                          v-model="category.codeCategory"
                          label="Código de la categoría"
                        ></v-text-field>
                      </v-col>

                      <v-col cols="12" sm="8">
                        <v-text-field
                          v-model="category.name"
                          label="Nombre de la categoría"
                        ></v-text-field>
                      </v-col>

                      <v-col cols="12">
                        <v-textarea
                          v-model="category.description"
                          counter
                          label="Descripción"
                          :rules="rules"
                          rows="3"
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
                >¿Está seguro/a de eliminar la categoría?</v-card-title
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
        <v-icon color="green accent-4" class="mr-2" @click="editCategory(item)">
          mdi-pencil
        </v-icon>
        <v-icon color="red" @click="deleteCategory(item)"> mdi-delete </v-icon>
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
  getAll,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../../controllers/CategoriesController";

export default {
  data: () => ({
    rules: [(v) => v.length <= 150 || "Max 150 carácteres"],
    dialog: false,
    dialogDelete: false,
    headers: [
      //{ text: "ID", value: "_id" },
      { text: "Código categoría", value: "codeCategory" },
      {
        text: "Nombre categoría",
        align: "start",
        value: "name",
      },
      { text: "Descripción", value: "description" },
      { text: "Acciones", value: "actions", sortable: false },
    ],
    categories: [],
    categoryIndex: -1,
    search: "",
    snackbar: false,
    text: "",
    color: "",

    category: {
      _id: "",
      codeCategory: "",
      name: "",
      description: "",
    },
    default: {
      codeCategory: "0",
      name: "",
      description: "",
    },
  }),

  computed: {
    formTitle() {
      return this.categoryIndex === -1 ? "Crear categoría" : "Editar categoría";
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
    this.loadAll();
  },

  methods: {
    loadAll() {
      getAll()
        .then((response) => {
          this.categories = response.data;
        })
        .catch((err) => console.error(err));
    },

    save() {
      if (this.categoryIndex > -1) {
        this.update();
      } else {
        this.create();
      }
      this.close();
    },

    create() {
      let request = null;
      const category = {
        codeCategory: this.category.codeCategory,
        name: this.category.name,
        description: this.category.description,
      };
      request = createCategory(category);

      request
        .then(() => {
          (this.color = "success"),
            (this.text = "La categoría se ha creado correctamente!"),
            (this.snackbar = true);
          this.loadAll();
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
      const category = {
        codeCategory: this.category.codeCategory,
        name: this.category.name,
        description: this.category.description,
      };
      console.log(this.category._id);
      updateCategory(this.category._id, category)
        .then((res) => {
          console.log(res);
          (this.color = "info"),
            (this.text = "La categoría se ha sido modificado correctamente!"),
            (this.snackbar = true);
          this.loadAll();
        })
        .catch((err) => {
          console.error(err);
          this.color = "error";
          this.text = "Fallido!, Ha ocurrido un error.";
          this.snackbar = true;
        });
      this.close();
    },

    editCategory(item) {
      this.categoryIndex = this.categories.indexOf(item);
      this.category = Object.assign({}, item);
      this.dialog = true;
    },

    deleteCategory(item) {
      this.categoryIndex = this.categories.indexOf(item);
      this.category = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      console.log(this.category._id);
      deleteCategory(this.category._id)
        .then((res) => {
          console.log(res);
          this.color = "success";
          this.text = "La categoría ha sido eliminado";
          this.snackbar = true;
          this.loadAll();
        })
        .catch((error) => {
          console.log(error);
          this.color = "error";
          this.text = "Fallido!, Ha ocurrido un error.";
          this.snackbar = true;
        });
      this.closeDelete();
    },

    close() {
      this.dialog = false;
      setTimeout(() => {
        this.category = Object.assign({}, this.default);
        this.categoryIndex = -1;
      }, 300);
    },

    closeDelete() {
      this.dialogDelete = false;
      setTimeout(() => {
        this.category = Object.assign({}, this.default);
        this.categoryIndex = -1;
      }, 300);
    },
  },
};
</script>