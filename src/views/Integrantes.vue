<template>
  <div id="layout">
    <integranteCard></integranteCard>
    <br />
    <v-row justify="center">
      <v-dialog v-model="dialog" persistent max-width="600px">
        <template v-slot:activator="{ on }">
          <div id="btn_flotante" color="primary" dark v-on="on">
            <v-img
              tile
              size="10"
              color="grey"
              max-width="60px"
              max-height="60px"
              src="https://i.ibb.co/xzjQ9V4/mas.png"
            ></v-img>
          </div>
        </template>
        <!--FORMULARIO PARA CREAR EL INTEGRANTE -->
        <v-card color="#121D3C">
          <v-card-title id="cards_title">REGISTRAR INTEGRANTE</v-card-title>
          <v-card-title id="cards_title">Información personal.</v-card-title>
          <!-- campos-->
          <v-card-text>
            <v-container>
              <v-col class="camposGSK31">
                <p id="indices">Número de identificación:</p>
                <v-text-field color="#FFE255" v-model="id" background-color="#eee" outlined></v-text-field>
              </v-col>
              <v-col class="camposGSK31">
                <p id="indices">Nombre completo:</p>

                <v-text-field color="#FFE255" v-model="nombre" background-color="#eee" outlined></v-text-field>
              </v-col>
              <v-col class="camposGSK31">
                <p id="indices">Apellidos:</p>

                <v-text-field color="#FFE255" v-model="apellidos" background-color="#eee" outlined></v-text-field>
              </v-col>
              <v-col class="camposGSK31">
                <p id="indices">Correo electronico:</p>
                <v-text-field color="#FFE255" v-model="correo" background-color="#eee" outlined></v-text-field>
              </v-col>
              <v-col class="camposGSK31">
                <p id="indices">Fecha de nacimiento:</p>
                <!--Date picker -->
                <v-dialog
                  ref="dialog"
                  v-model="modal"
                  :return-value.sync="date"
                  persistent
                  width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      color="#FFE255"
                      v-model="date"
                      v-on="on"
                      background-color="#eee"
                      outlined
                      prepend-inner-icon="event"
                    ></v-text-field>
                  </template>
                  <v-date-picker color="#FFE255" v-model="date" scrollable>
                    <v-spacer></v-spacer>
                    <v-btn text color="#121D3C" @click="modal = false">Cancel</v-btn>
                    <v-btn text color="#121D3C" @click="$refs.dialog.save(date)">OK</v-btn>
                  </v-date-picker>
                </v-dialog>
              </v-col>
              <!--FIN DATE PICKER -->
              <v-col class="camposGSK31">
                <p id="indices">Número de telefono:</p>
                <v-text-field color="#FFE255" v-model="telefono" background-color="#eee" outlined></v-text-field>
              </v-col>
              <v-col class="camposGSK31">
                <p id="indices">Número celular:</p>
                <v-text-field color="#FFE255" v-model="celular" background-color="#eee" outlined></v-text-field>
              </v-col>
              <v-col class="camposGSK31">
                <p id="indices">Dirección:</p>
                <v-text-field color="#FFE255" v-model="direccion" background-color="#eee" outlined></v-text-field>
              </v-col>
              <v-col class="camposGSK31">
                <p id="indices">Barrio:</p>
                <v-text-field color="#FFE255" v-model="barrio" background-color="#eee" outlined></v-text-field>
              </v-col>
              <v-col class="camposGSK31">
                <p id="indices">Ocupación:</p>
                <v-text-field color="#FFE255" v-model="ocupacion" background-color="#eee" outlined></v-text-field>
              </v-col>
              <v-card-title id="cards_title">Información extra.</v-card-title>
              <v-col class="camposGSK31">
                <p id="indices">Nombre de la madre:</p>
                <v-text-field
                  color="#FFE255"
                  v-model="nombreMadre"
                  background-color="#eee"
                  outlined
                ></v-text-field>
              </v-col>
              <v-col class="camposGSK31">
                <p id="indices">"Número de la madre:</p>
                <v-text-field
                  color="#FFE255"
                  v-model="celularMadre"
                  background-color="#eee"
                  outlined
                ></v-text-field>
              </v-col>
              <v-col class="camposGSK31">
                <p id="indices">Nombre del padre</p>
                <v-text-field
                  color="#FFE255"
                  v-model="nombrePadre"
                  background-color="#eee"
                  outlined
                ></v-text-field>
              </v-col>
              <v-col class="camposGSK31">
                <p id="indices">Número del padre:</p>
                <v-text-field
                  color="#FFE255"
                  v-model="celularPadre"
                  background-color="#eee"
                  outlined
                ></v-text-field>
              </v-col>
              <v-col class="camposGSK31">
                <p id="indices">Nombre contacto de emergencia:</p>
                <v-text-field
                  color="#FFE255"
                  v-model="nombreEmergencia"
                  background-color="#eee"
                  outlined
                ></v-text-field>
              </v-col>
              <v-col class="camposGSK31">
                <p id="indices">Número contacto de emergencia:</p>
                <v-text-field
                  color="#FFE255"
                  v-model="celularEmergencia"
                  background-color="#eee"
                  outlined
                ></v-text-field>
              </v-col>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn id="botones_cortos_GSK31" @click.stop="dialog = false">Cancelar</v-btn>
            <v-btn id="botones_cortos_GSK31" v-on:click="validar_y_crear()">Confirmar</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </div>
</template>
<script>
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)
axios.defaults.baseURL = 'https://backgsk31.herokuapp.com/'
import integranteCard from '../components/integranteCard'
export default {
  components: {
    integranteCard
  },
  data: () => ({
    id: '',
    nombre: '',
    apellidos: '',
    correo: '',
    fechaNacimiento: '',
    direccion: '',
    celular: '',
    barrio: '',
    telefono: '',
    nombreMadre: '',
    celularMadre: '',
    nombrePadre: '',
    celularPadre: '',
    nombreEmergencia: '',
    celularEmergencia: '',
    ocupacion: '',
    imagen: '',
    contrasena: '',
    dialog: false,
    dialog2: false,
    date: new Date().toISOString().substr(0, 10),
    menu: false,
    modal: false

  }),
  methods: {
    validar_y_crear() {
      this.validacion = []
      this.validacion = [
        {
          id: this.id,
          nombre: this.nombre,
          apellidos: this.apellidos,
          correo: this.correo,
          contrasena: this.nombre + '123',
          fechaNacimiento: this.date,
          direccion: this.direccion,
          imagen: this.imagen,
          celular: this.celular,
          barrio: this.barrio,
          ocupacion: this.ocupacion,
          telefono: this.telefono,
          nombreMadre: this.nombrePadre,
          celularMadre: this.celularMadre,
          nombrePadre: this.nombrePadre,
          celularPadre: this.celularPadre,
          nombreEmergencia: this.nombreEmergencia,
          celularEmergencia: this.celularEmergencia
        }
      ]
      if (
        this.validacion[0].id == '' ||
        this.validacion[0].nombre == '' ||
        this.validacion[0].apellidos == '' ||
        this.validacion[0].correo == '' ||
        this.validacion[0].fechaNacimiento == '' ||
        this.validacion[0].barrio == '' ||
        this.validacion[0].nombreMadre == '' ||
        this.validacion[0].celularoMadre == '' ||
        this.validacion[0].nombrePadre == '' ||
        this.validacion[0].celularPadre == '' ||
        this.validacion[0].nombreEmergencia == '' ||
        this.validacion[0].celularEmergencia == '' ||
        this.validacion[0].ocupacion == ''
      ) {
        alert('Los campos no puede estar vacios.')
      } else {
        //hacemos la conexion y creamos el scout
        this.axios
          .post('scout/nuevo', this.validacion[0])
          .then(response => {
            this.dialog = false
            location.reload()
          })
          .catch(e => {
            alert(
              'Lo sentimos, ha ocurrido un error, verifique la información e intente nuevamente'
            )
          })
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
#cards_title {
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  display: block;

  color: #ffe255;
}
#cards_subtitle {
  color: #bababa;
  font-size: 15px;
  margin-bottom: -8px;
  text-align: justify;
}
#indices {
  color: #bababa;
  font-size: 15px;
  font-weight: bold;
}
.camposGSK31 {
  margin: auto;
  width: 100%;
  height: 100%;
}
#btn_flotante {
  display: scroll;
  position: fixed;
  background: #1C398A;
  text-align: center;
  padding: 0px;
  max-width: 60px;
  max-height: 60px;
  padding: 15px;
  color: #fff;
  border-radius: 50px;
  bottom: 20px;
  right: 20px;
}
#botones_cortos_GSK31 {
  background: #ffe255;
  margin-right: 5%;
  margin-bottom: 5%;
  max-width: 90%;
  width: 45%;

  font-size: 10px;
  height: 50px;
  font-weight: bold;
  color: #121d3c;
}
</style>