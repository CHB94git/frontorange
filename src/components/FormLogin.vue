<template>
    <v-container fluid>
      <v-row align="center" justify="center" >
        <v-col cols="12" lg="8" md="8" sm="8" xs="6">
          <v-card class="elevation-12 rounded-xl mb-0">
            <v-img
              width="100%"
              height="150px"
              src="https://images.unsplash.com/photo-1545898073-346e42dc7357?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
            >
            </v-img>
            <v-window>
              <v-window-item>
                <v-row class="fill-height">
                  <v-col cols="12" md="8">
                    <v-card-text class="mt-6">
                      <h1
                        class="text-center display-2 brown--text text--darken-1"
                      >
                        Iniciar sesión
                      </h1>

                      <h4 class="text-center mt-4">Ingresa tus credenciales</h4>
                      <v-form>
                        <v-text-field
                          label="Email"
                          name="Email"
                          prepend-icon="mdi-email"
                          type="text"
                          v-model="email"
                          :rules="emailRules"
                          color="brown darken-1"
                        />

                        <v-text-field
                          id="password"
                          v-model="password"
                          :rules="passwordRules"
                          label="Contraseña"
                          :type="showPassword ? 'text' : 'password'"
                          :append-icon="
                            showPassword ? 'mdi-eye' : 'mdi-eye-off'
                          "
                          @click:append="showPassword = !showPassword"
                          name="password"
                          prepend-icon="mdi-lock"
                          color="brown darken-1"
                        />
                      </v-form>
                    </v-card-text>
                    <div class="text-center mb-3">
                      <v-btn rounded @click="login" color="brown darken-1" dark
                        >INGRESAR</v-btn
                      >
                    </div>
                  </v-col>
                  <v-col cols="12" md="4" class="brown darken-1">
                    <v-card-text class="white--text">
                      <h1 class="text-center display-1 mt-10">
                        <strong>Empecemos por loguearnos!</strong>
                      </h1>
                      <h4 class="text-center mt-6">
                        Ingresa tus datos personales para ingresar al sitio
                      </h4>
                    </v-card-text>
                  </v-col>
                </v-row>
              </v-window-item>
            </v-window>
          </v-card>
            <v-snackbar v-model="snackbar" bottom right :color="color" class="ml-5">
              {{ text }}
              <v-btn color="black" class="ml-10" text @click="snackbar = false"> 
                Cerrar
              </v-btn>
            </v-snackbar>
        </v-col>
      </v-row>
    </v-container>
</template>


<script>
import axios from "axios";

export default {
  name: "FormLogin",

  data: () => ({
    snackbar: false,
    text: "",
    color: "",
    email: "",
    password: "",
    passwordRules: [(v) => !!v || "La contraseña es requerida"],
    showPassword: false,
    email: "",
    emailRules: [
      (v) => !!v || "El email es requerido",
      (v) => /.+@.+\..+/.test(v) || "Ingresa un email válido",
    ],
  }),
  methods: {
    login() {
      axios
        .post("http://localhost:3000/api/users/login", {
          email: this.email,
          password: this.password,
        })
        .then((response) => {
          localStorage.setItem("token", response.data.tokenReturn);
          this.$router.push({ name: "Admin" });
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
          this.color = "error";
          this.text = "Ocurrió un error al ingresar!";
          this.snackbar = true;
        });
    },
  },
};
</script>