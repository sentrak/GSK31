<template>
  <div id="layout">
    <v-card id="cards_lobby" :elevation="5" v-on:click="envio(0)">
      <v-card-title id="cards_title"> JEFATURA</v-card-title>
      <v-card-subtitle id="cards_subtitle">Esta sección sirve para crear, visualizar, actualizar y/o eliminar a un jefe.</v-card-subtitle>
    </v-card>
    <br />
    <v-card id="cards_lobby" :elevation="5" v-on:click="envio(1)">
      <v-card-title id="cards_title">INTEGRANTES</v-card-title>
      <v-card-subtitle id="cards_subtitle">Esta sección sirve para crear, visualizar, actualizar y/o eliminar a un integrante de tu unidad.</v-card-subtitle>
    </v-card>
    <br />
    <v-card id="cards_lobby" :elevation="5" v-on:click="envio(2)">
      <v-card-title id="cards_title">PLAN DE ADELANTO</v-card-title>
      <v-card-subtitle  id="cards_subtitle">Esta sección sirve para validar el progreso de los integrantes de tu unidad en su proceso con el plan de adelantos.</v-card-subtitle>
    </v-card>
    <br />
  </div>
</template>
<script>
export default {
  data() {
    return {}
  },
  methods: {
    envio(i) {
      if (i == 0) {
        this.$router.push('/Jefatura')
      } else if (i == 1) {
        this.$router.push('/integrantes')
      } else {
        this.$router.push('/Integrantes_plan_de_adelantos')
      }
    }
  }
}
</script>
<style scoped>
#layout {
    font-family: 'Muli';
  width: 100%;
  height: auto;
margin: auto;
}
#cards_lobby {
  background: #222B5C;
  max-width: 100%;
  max-height: 150px;
  height: 130px;
}
#cards_title {
  font-size: 20px;
  font-weight: bold;
  display: block;
  color: #FFE255;
  text-align: center;
}
#cards_subtitle {
  color: #bababa;
  font-size: 15px;
  font-weight: bold;
  margin-bottom: -8px;
  text-align: justify;
}
</style>