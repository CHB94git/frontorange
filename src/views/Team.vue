<template>
  <v-container>
    <v-row dense>
      <v-col v-for="member in Team" :key="member.title" cols="12">
        <v-card class="mx-auto my-3 rounded-lg elevation-10" max-width="500">
          <v-img :src="member.src" height="100%" width="100%"></v-img>

          <v-card-title> {{ member.title }} </v-card-title>

          <v-card-subtitle> {{ member.subtitle }} </v-card-subtitle>
        </v-card>
      </v-col>

      <v-col v-for="card in cards" :key="card.title" cols="12" md="6">
        <v-card class="mx-auto my-3 rounded-lg elevation-5" max-width="400">
          <v-img :src="card.src" height="200px"></v-img>

          <v-card-title> {{ card.title }} </v-card-title>

          <v-card-subtitle> {{ card.subtitle }} </v-card-subtitle>

          <v-card-actions>
            <v-btn color="orange lighten-2" text> {{ card.explore }} </v-btn>

            <v-spacer></v-spacer>

            <v-btn icon @click="show = !show">
              <v-icon>{{
                show ? "mdi-chevron-up" : "mdi-chevron-down"
              }}</v-icon>
            </v-btn>
          </v-card-actions>

          <v-expand-transition>
            <div v-show="show">
              <v-divider></v-divider>

              <v-card-text>
                {{ card.text }}
              </v-card-text>
            </div>
          </v-expand-transition>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>


<script>
export default {
  data: () => ({
    show: false,
    show2: false,
    Team: [
      {
        src: require("../assets/img/team.svg"),
        title: "Nuestro equipo",
        subtitle: "Integrantes del equipo",
      },
    ],

    cards: [
      {
        src: "https://images.pexels.com/photos/326501/pexels-photo-326501.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        title: "Juan Gabriel Forero Barreto",
        subtitle: "Backend, Diseño(Mockups), Docs",
        explore: "Ver más...",
        text: "Integrante del grupo 18 de Misión TIC 2022 de la UTP. Manejo lenguajes de programación como JavaScript, TypeScript y Java y manejo básico de HTML y CSS. Ingresé con muchas ganas de aprender y apropiar algunos conceptos adquiridos en mi carrera de Ingeniería de Sistemas.",
      },
      {
        src: "https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        title: "Cristian Hernandez Bautista",
        subtitle: "Frontend, Backend, BD",
        explore: "Ver más...",
        text: "Integrante del grupo 18 de la UTP del programa Misión TIC 2022. Ingresé a este programa con la ilusión de aprender cosas nuevas del desarrollo de aplicaciones, y vaya que ha superado mis expectativas sobre todo por lo visto en este ciclo 3, sé que me servirá mucho para mi experiencia profesional a futuro. Obviamente no me puedo olvidar que ingresé también para una mejor inclusión laboral.",
      },
    ],
  }),
};
</script>