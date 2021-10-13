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

      <v-col v-for="card in cards" :key="card.title" cols="12" lg="6">
        <v-card class="mx-auto my-3 rounded-lg elevation-5" max-width="350">
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
        src: "https://cdn.vuetifyjs.com/images/cards/sunshine.jpg",
        title: "Gabriel Forero",
        subtitle: "Backend",
        explore: "Explore more...",
        text: "Im a thing. But, like most politicians, he promised more than he could deliver. You won't have time for sleeping, soldier, not with all",
      },
      {
        src: "https://cdn.vuetifyjs.com/images/cards/sunshine.jpg",
        title: "Cristian Hernandez",
        subtitle: "Frontend",
        explore: "Explore more...",
        text: "Im a thing. But, like most politicians, he promised more than he could deliver. You won't have time for sleeping, soldier, not with all",
      },
    ],
  }),
};
</script>