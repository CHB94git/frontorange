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
      :items="users"
      sort-by="nameUser"
      class="elevation-15 rounded-lg"
      :search="search"
    >
      <template v-slot:top>
        <v-toolbar flat class="rounded-lg" md-4>
          <v-toolbar-title>Usuarios</v-toolbar-title>

          <v-divider class="mx-3" inset vertical></v-divider>

          <v-spacer></v-spacer>

          <v-dialog v-model="dialog" max-width="400px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                color="orange accent-2"
                dark
                class="mb-2 elevation-7"
                v-bind="attrs"
                v-on="on"
              >
                Nuevo Usuario
              </v-btn>
            </template>

            <v-card max-width="98%">
              <v-form @submit.prevent="save" ref="user" lazy-validation>
                <v-card-title>
                  <span class="text-h5">{{ formTitle }}</span>
                </v-card-title>

                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12">
                        <v-text-field
                          v-model="user.nameUser"
                          label="Nombre del usuario"
                          :rules="[(v) => !!v || 'Nombre requerido']"
                        ></v-text-field>
                      </v-col>

                      <v-col cols="12" v-if="!emailCheck">
                        <v-text-field
                          v-model="user.email"
                          label="Email de usuario"
                          :rules="emailRules"
                        ></v-text-field>
                      </v-col>

                      <v-col cols="12">
                        <v-text-field
                          :rules="[(v) => !!v || 'Contraseña requerida']"
                          v-model="user.password"
                          label="Contraseña"
                          :type="showPassword ? 'text' : 'password'"
                          :append-icon="
                            showPassword ? 'mdi-eye' : 'mdi-eye-off'
                          "
                          @click:append="showPassword = !showPassword"
                        ></v-text-field>
                      </v-col>

                      <v-col cols="12">
                        <v-select
                          :rules="[(v) => !!v || 'Item requerido']"
                          v-model="user.role"
                          :items="roles"
                          label="Rol del usuario"
                        ></v-select>
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

          <v-dialog v-model="dialogEnabled" max-width="500px">
            <v-card>
              <v-card-title class="text-h5"
                ><v-spacer></v-spacer>
                Habilitar/Inhabilitar Usuario
                <v-spacer></v-spacer>
              </v-card-title>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="red" text @click="closeEnabled">Cancelar</v-btn>
                <v-btn color="green" text @click="enabledItemConfirm"
                  >Aceptar</v-btn
                >
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>

      <template v-slot:item.actions="{ item }">
        <v-icon color="green accent-4" class="mr-2" @click="editUser(item)">
          mdi-pencil
        </v-icon>
        <v-icon color="red" @click="enabledUser(item)">
          mdi-account-reactivate
        </v-icon>
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
import axios from "axios";

export default {
  data: () => ({
    dialog: false,
    showPassword: false,
    emailRules: [
      (v) => !!v || "El email es requerido",
      (v) => /.+@.+\..+/.test(v) || "Ingresa un email válido",
    ],
    dialogEnabled: false,
    roles: ["Administrador", "Vendedor", "Usuario"],

    headers: [
      { text: "Nombre de usuario", value: "nameUser" },
      {
        text: "Email",
        align: "start",
        value: "email",
      },
      { text: "Rol del usuario", value: "role" },
      { text: "Estado", value: "state" },
      { text: "Acciones", value: "actions", sortable: false },
    ],
    users: [],
    userIndex: -1,
    search: "",
    snackbar: false,
    text: "",
    color: "",

    user: {
      _id: "",
      nameUser: "",
      email: "",
      password: "",
      role: "",
      state: "",
    },

    default: {
      nameUser: "",
      email: "",
      password: "",
      role: "Usuario",
      state: "",
    },
  }),

  computed: {
    formTitle() {
      return this.userIndex === -1 ? "Crear Usuario" : "Editar Usuario";
    },
    emailCheck() {
      return this.userIndex === -1 ? false : true;
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogEnabled(val) {
      val || this.closeEnabled();
    },
  },

  created() {
    this.list();
  },

  methods: {
    save() {
      if (this.userIndex > -1) {
        //Actualizar Usuarios
        axios
          .put('http://localhost:3000/api/users/update', {
            nameUser: this.userIndex.nameUser,
            email: this.userIndex.email,
            password: this.userIndex.password,
            role: this.userIndex.role,
            state: this.userIndex.state,
          })
          .then((response) => {
            console.log(response);
            this.list();
            this.color = "success";
            this.text = "El usuario se modificó correctamente!";
            this.snackbar = true;
          })
          .catch((error) => {
            console.log(error);
            this.color = "error";
            this.text = "Fallido!, Ha ocurrido un error.";
            this.snackbar = true;
          });
      } else {
        //Crear usuarios
        axios
          .post('http://localhost:3000/api/users/add', {
            nameUser: this.userIndex.nameUser,
            email: this.userIndex.email,
            password: this.userIndex.password,
            role: this.userIndex.role,
            state: this.userIndex.state,
          })
          .then((response) => {
            console.log(this.userIndex._id);
            console.log(response);
            this.list();
            this.color = "success";
            this.text = "El usuario se creó correctamente!";
            this.snackbar = true;
          })
          .catch((error) => {
            console.log(error);
            this.color = "error";
            this.text = "Fallido!, Ha ocurrido un error.";
            this.snackbar = true;
          });
      }
      this.close();
    },

    list() {
      axios
        .get('http://localhost:3000/api/users/list')
        .then((response) => {
          this.users = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    editUser(item) {
      this.userIndex = this.users.indexOf(item);
      this.user = Object.assign({}, item);
      this.dialog = true;
    },

    enabledUser(item) {
      this.userIndex = this.users.indexOf(item);
      this.user = Object.assign({}, item);
      this.dialogEnabled = true;
    },

    enabledItemConfirm() {
      if (this.userIndex.state === 1) {
        //Deshabilitar usuarios (Disabled)
        console.log(this.userIndex.state);
        axios
          .put('http://localhost:3000/api/users/disabled', {
            _id: this.userIndex._id
          })
          .then((response) => {
            console.log(response);
            console.log(this.userIndex._id);
            this.list();
            this.color = "success";
            this.text = "Usuario deshabilitado con éxito!";
            this.snackbar = true;
          })
          .catch((error) => {
            console.log(error);
            console.log(this.userIndex._id);
            this.color = "error";
            this.text = "Fallido!, Ha ocurrido un error.";
            this.snackbar = true;
          });
      } else {
        //Habilitar usuarios (Enabled)
        axios
          .put('http://localhost:3000/api/users/enabled', {
            _id: this.userIndex._id
          })
          .then((response) => {
            console.log(this.userIndex._id);
            console.log(response);
            this.list();
            this.color = "success";
            this.text = "Usuario habilitado con éxito!";
            this.snackbar = true;
          })
          .catch((error) => {
            console.log(error);
            console.log(this.userIndex._id);
            this.color = "error";
            this.text = "Fallido!, Ha ocurrido un error.";
            this.snackbar = true;
          });
      }
      this.closeEnabled();
    },

    close() {
      this.dialog = false;
      setTimeout(() => {
        this.user = Object.assign({}, this.default);
        this.userIndex = -1;
      }, 300);
    },

    closeEnabled() {
      this.dialogEnabled = false;
      setTimeout(() => {
        this.user = Object.assign({}, this.default);
        this.userIndex = -1;
      }, 300);
    },
  },
};
</script>