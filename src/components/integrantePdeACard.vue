<template>
  <div id="layout">
    <!--Tarjeta de presentacion de Integrante -->
    <v-card
      id="card_integrante"
      :elevation="10"
      v-on:click="plan_de_adelanto(integrante._id,integrante.id,integrante.unidad)"
      v-for="integrante in integrantes"
      :key="integrante.id"
    >
      <v-list-item three-line>
        <v-list-item-content>
          <v-list-item-title id="cards_subtitle">{{integrante.unidad}}</v-list-item-title>
          <v-list-item-title id="cards_title">{{integrante.nombre+" "+integrante.apellidos}}</v-list-item-title>
          <v-list-item-subtitle id="cards_subtitle">{{integrante.id}}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-card>
  </div>
</template>
<script>
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)
axios.defaults.baseURL = 'https://backgsk31.herokuapp.com/'
export default {
  name: 'integranteCard',
  props: {
    integrante: Object
  },
  data: () => ({
    integrantes: [],
    dialog: false,
    dialog2: false,
    dialog3: false,
    date: new Date().toISOString().substr(0, 10),
    menu: false,
    modal: false,
    menu2: false,
    id_local: '',
    unidad: ''
  }),
  mounted() {
    localStorage.removeItem('id_integrante')
    localStorage.removeItem('unidad_integrante')
    localStorage.removeItem('_id_integrante')
    if (localStorage.unidad_jefe) {
      this.unidad = localStorage.unidad_jefe
    } else {
      alert('unidad no existe prro')
    }
    this.axios.get('scout/integrantes/' + this.unidad).then(response => {
      this.integrantes = response.data
    })
  },
  methods: {
    plan_de_adelanto(_id,id, unidad) {      
      localStorage.setItem('_id_integrante', _id)
      localStorage.setItem('id_integrante', id)
      localStorage.setItem('unidad_integrante', unidad)
      this.$router.push('/plan_de_adelantos')
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
#card_integrante {
  background: #222b5c;
  max-width: 100%;
  max-height: auto;
  margin: 5%;
}
#cards_title {
  font-size: 20px;
  font-weight: bold;
  color: #ffe255;
}
#cards_subtitle {
  color: #bababa;
  font-size: 14px;
  font-weight: bold;

  margin-bottom: -8px;
  text-align: center;
}
</style>