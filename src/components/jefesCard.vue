<template>
  <div id="layout">
    <!--Tarjeta de presentacion de JEFES -->
    <v-card id="card_jefe" :elevation="10" v-for="jefe in jefes" :key="jefe.id">
      <v-list-item three-line>
        <v-list-item-content>
          <v-list-item-title id="cards_subtitle">{{
            jefe.unidad
          }}</v-list-item-title>
          <v-list-item-title id="cards_title">{{
            jefe.nombre + " " + jefe.apellidos
          }}</v-list-item-title>
          <v-list-item-subtitle id="cards_subtitle">{{
            jefe.id
          }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-card-actions>
        <!--BOTON VISUALIZAR -->
        <v-row>
          <v-dialog
            v-model="dialog"
            fullscreen
            hide-overlay
            transition="dialog-bottom-transition"
          >
            <template v-slot:activator="{ on }">
              <v-btn
                id="botones_cortos_GSK31"
                v-on="on"
                v-on:click="visualizar(jefe.id)"
                >VISUALIZAR</v-btn
              >
            </template>
            <v-card color="#121D3C">
              <v-toolbar color="#222b5c">
                <v-btn icon dark @click="cambiaso()">
                  <v-icon>mdi-close</v-icon>
                </v-btn>
                <v-toolbar-title id="cards_title"
                  >INFORMACIÓN DEL JEFE</v-toolbar-title
                >
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-list three-line subheader color="#121D3C">
                <br />
                <v-subheader id="cards_title">INFORMACIÓN PERSONAL</v-subheader>
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>
                      <v-col class="camposGSK31">
                        <p id="indices">Número de identificación:</p>
                        <v-text-field
                          color="#FFE255"
                          v-model="individuo.id"
                          background-color="#eee"
                          outlined
                          disabled
                        ></v-text-field>
                      </v-col>
                    </v-list-item-title>
                    <v-list-item-title>
                      <v-col class="camposGSK31">
                        <p id="indices">Nombres:</p>
                        <v-text-field
                          color="#FFE255"
                          v-model="individuo.nombre"
                          background-color="#eee"
                          outlined
                          disabled
                        ></v-text-field>
                      </v-col>
                    </v-list-item-title>

                    <v-list-item-title>
                      <v-col class="camposGSK31">
                        <p id="indices">Apellidos:</p>
                        <v-text-field
                          color="#FFE255"
                          v-model="individuo.apellidos"
                          background-color="#eee"
                          outlined
                          disabled
                        ></v-text-field>
                      </v-col>
                    </v-list-item-title>
                    <v-list-item-title>
                      <v-col class="camposGSK31">
                        <p id="indices">Fecha de nacimiento:</p>
                        <v-text-field
                          color="#FFE255"
                          v-model="individuo.fechaNacimiento"
                          background-color="#eee"
                          outlined
                          disabled
                        ></v-text-field>
                      </v-col>
                    </v-list-item-title>
                    <v-list-item-title>
                      <v-col class="camposGSK31">
                        <p id="indices">Celular:</p>
                        <v-text-field
                          color="#FFE255"
                          v-model="individuo.celular"
                          background-color="#eee"
                          outlined
                          disabled
                        ></v-text-field>
                      </v-col>
                    </v-list-item-title>
                    <v-list-item-title>
                      <v-col class="camposGSK31">
                        <p id="indices">Telefono:</p>
                        <v-text-field
                          color="#FFE255"
                          v-model="individuo.telefono"
                          background-color="#eee"
                          outlined
                          disabled
                        ></v-text-field>
                      </v-col>
                    </v-list-item-title>
                    <v-list-item-title>
                      <v-col class="camposGSK31">
                        <p id="indices">Correo:</p>
                        <v-text-field
                          color="#FFE255"
                          v-model="individuo.correo"
                          background-color="#eee"
                          outlined
                          disabled
                        ></v-text-field>
                      </v-col>
                    </v-list-item-title>
                    <v-list-item-title>
                      <v-col class="camposGSK31">
                        <p id="indices">Direción:</p>
                        <v-text-field
                          color="#FFE255"
                          v-model="individuo.direccion"
                          background-color="#eee"
                          outlined
                          disabled
                        ></v-text-field>
                      </v-col>
                    </v-list-item-title>
                    <v-list-item-title>
                      <v-col class="camposGSK31">
                        <p id="indices">Barrio:</p>
                        <v-text-field
                          color="#FFE255"
                          v-model="individuo.barrio"
                          background-color="#eee"
                          outlined
                          disabled
                        ></v-text-field>
                      </v-col>
                    </v-list-item-title>
                    <v-list-item-title>
                      <v-col class="camposGSK31">
                        <p id="indices">Inscrito:</p>
                        <v-text-field
                          color="#FFE255"
                          :label="cambio_texto()"
                          background-color="#eee"
                          outlined
                          disabled
                        ></v-text-field>
                      </v-col>
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-card>
          </v-dialog>
        </v-row>
        <!--BOTON ACTUALIZAR -->
        <v-row>
          <v-dialog
            v-model="dialog2"
            fullscreen
            hide-overlay
            transition="dialog-bottom-transition"
          >
            <template v-slot:activator="{ on }">
              <v-btn
                id="botones_cortos_GSK31"
                v-on="on"
                v-on:click="visualizar(jefe.id)"
                >ACTUALIZAR</v-btn
              >
            </template>
            <v-card color="#121D3C">
              <v-toolbar color="#222b5c">
                <v-btn icon dark @click="cambiaso()">
                  <v-icon>mdi-close</v-icon>
                </v-btn>
                <v-toolbar-title id="cards_title"
                  >INFORMACIÓN DEL JEFE</v-toolbar-title
                >
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-list three-line subheader color="#000233">
                <v-subheader id="cards_title">INFORMACIÓN PERSONAL</v-subheader>
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>
                      <v-col class="camposGSK31">
                        <p id="indices">Número de identificación:</p>
                        <v-text-field
                          color="#FFE255"
                          v-model="individuo.id"
                          background-color="#eee"
                          outlined
                          disabled
                        ></v-text-field>
                      </v-col>
                    </v-list-item-title>
                    <v-list-item-title>
                      <v-col class="camposGSK31">
                        <p id="indices">Nombres:</p>
                        <v-text-field
                          color="#FFE255"
                          v-model="individuo.nombre"
                          background-color="#eee"
                          outlined
                        ></v-text-field>
                      </v-col>
                    </v-list-item-title>

                    <v-list-item-title>
                      <v-col class="camposGSK31">
                        <p id="indices">Apellidos:</p>
                        <v-text-field
                          color="#FFE255"
                          v-model="individuo.apellidos"
                          background-color="#eee"
                          outlined
                        ></v-text-field>
                      </v-col>
                    </v-list-item-title>
                    <!--  -->
                    <v-list-item-title>
                      <v-col class="camposGSK31">
                        <p id="indices">Fecha de nacimiento:</p>
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
                              v-model="individuo.fechaNacimiento"
                              v-on="on"
                              background-color="#eee"
                              outlined
                              prepend-inner-icon="event"
                            ></v-text-field>
                          </template>
                          <v-date-picker
                            color="#FFE255"
                            v-model="date"
                            scrollable
                          >
                            <v-spacer></v-spacer>
                            <v-btn text color="#121D3C" @click="modal = false"
                              >Cancel</v-btn
                            >
                            <v-btn
                              text
                              color="#121D3C"
                              @click="$refs.dialog.save(date)"
                              >OK</v-btn
                            >
                          </v-date-picker>
                        </v-dialog>
                      </v-col>
                    </v-list-item-title>
                    <v-list-item-title>
                      <v-col class="camposGSK31">
                        <p id="indices">Celular:</p>
                        <v-text-field
                          color="#FFE255"
                          v-model="individuo.celular"
                          background-color="#eee"
                          outlined
                        ></v-text-field>
                      </v-col>
                    </v-list-item-title>
                    <v-list-item-title>
                      <v-col class="camposGSK31">
                        <p id="indices">Telefono:</p>
                        <v-text-field
                          color="#FFE255"
                          v-model="individuo.telefono"
                          background-color="#eee"
                          outlined
                        ></v-text-field>
                      </v-col>
                    </v-list-item-title>
                    <v-list-item-title>
                      <v-col class="camposGSK31">
                        <p id="indices">Correo:</p>
                        <v-text-field
                          color="#FFE255"
                          v-model="individuo.correo"
                          background-color="#eee"
                          outlined
                        ></v-text-field>
                      </v-col>
                    </v-list-item-title>
                    <v-list-item-title>
                      <v-col class="camposGSK31">
                        <p id="indices">Direción:</p>
                        <v-text-field
                          color="#FFE255"
                          v-model="individuo.direccion"
                          background-color="#eee"
                          outlined
                        ></v-text-field>
                      </v-col>
                    </v-list-item-title>
                    <v-list-item-title>
                      <v-col class="camposGSK31">
                        <p id="indices">Barrio:</p>
                        <v-text-field
                          color="#FFE255"
                          v-model="individuo.barrio"
                          background-color="#eee"
                          outlined
                        ></v-text-field>
                      </v-col>
                    </v-list-item-title>
                    <v-list-item-title>
                      <v-col class="camposGSK31">
                        <p id="indices">Inscrito:</p>
                        <v-checkbox
                          v-model="individuo.inscrito"
                          id="check"
                          color="#FFE255"
                          :label="cambio_texto()"
                        ></v-checkbox>
                      </v-col>
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn id="botones_cortos_2_GSK31" text @click="cambiaso()"
                    >Cancelar</v-btn
                  >
                  <v-btn
                    id="botones_cortos_2_GSK31"
                    text
                    v-on:click="actualizar()"
                    >Confirmar</v-btn
                  >
                </v-card-actions>
              </v-list>
            </v-card>
          </v-dialog>
        </v-row>
        <!--BOTON ELIMINAR -->
        <v-row>
          <v-btn
            id="botones_cortos_GSK31"
            @click.stop="(dialog3 = true), visualizar(jefe.id)"
            >Desactivar</v-btn
          >
          <v-dialog v-model="dialog3" max-width="290">
            <v-card color="#222b5c">
              <v-card-title id="cards_title"
                >¿Seguro que desea desactivar el jefe?</v-card-title
              >

              <v-card-text id="cards_subtitle"
                >Si desactivas a este no podras visualizar o actualizar su
                información</v-card-text
              >

              <v-card-actions>
                <v-spacer></v-spacer>

                <v-btn color="yellow" text @click="dialog3 = false"
                  >Cancelar</v-btn
                >
                <v-btn color="yellow" text v-on:click="eliminar(individuo._id)"
                  >Aceptar</v-btn
                >
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-row>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
Vue.use(VueAxios, axios);
axios.defaults.baseURL = "https://backgsk31.herokuapp.com/";
export default {
  name: "jefeCard",
  props: {
    jefe: Object,
  },

  data: () => ({
    verDato: false,
    jefes: [],
    individuo: [],
    individuo_completo: [],
    dialog: false,
    dialog2: false,
    dialog3: false,
    date: new Date().toISOString().substr(0, 10),
    menu: false,
    modal: false,
    menu2: false,
    id_local: "",
  }),
  methods: {
    visualizar(id_jefe) {
      this.individuo = [];
      this.axios
        .get("jefe/listar/" + id_jefe)
        .then((respuesta) => {
          this.individuo = respuesta.data;
          this.verDato = true;
        })
        .catch((e) => {
          alert(e);
        });
    },
    cambio_texto() {
      if (this.individuo.inscrito == true) {
        return "Inscrito";
      } else {
        return "No nscrito";
      }
    },
    // En este metodo solo se cambia el valor de estas variables, funciona para corregir algunos bugs
    cambiaso() {
      this.verDato = false;
      this.dialog = false;
      this.dialog2 = false;
      this.dialog3 = false;
    },
    /* METODO PARA RECARGAR LA LISTA DE JEFES */
    volver_a_cargar_especialidades() {
      this.jefes = [];
      //lLENAMOS LA INFORMACION DE LOS JEFES
      this.axios
        .get("jefe/listar/")
        .then((response) => {
          this.jefes = response.data;
        })
        .catch((e) => {
          alert(e);
        });
    },
    actualizar() {
      this.individuo_completo = [];
      this.individuo_completo = [
        {
          _id: this.individuo._id,
          id: this.individuo.id,
          nombre: this.individuo.nombre,
          apellidos: this.individuo.apellidos,
          correo: this.individuo.correo,
          fechaNacimiento: this.date,
          direccion: this.individuo.direccion,
          imagen: "",
          unidad: this.individuo.unidad,
          celular: this.individuo.celular,
          barrio: this.individuo.barrio,
          telefono: this.individuo.telefono,
          inscrito: this.individuo.inscrito,
          estado: this.individuo.estado,
          nombre_de_caza: this.individuo.nombre_de_caza,
          rol: this.individuo.rol,
          ocupacion: this.individuo.ocupacion,
        },
      ];
      if (
        this.individuo_completo[0].id == "" ||
        this.individuo_completo[0].nombre == "" ||
        this.individuo_completo[0].apellidos == "" ||
        this.individuo_completo[0].fechaNacimiento == "" ||
        this.individuo_completo[0].celular == "" ||
        this.individuo_completo[0].telefono == "" ||
        this.individuo_completo[0].correo == "" ||
        this.individuo_completo[0].direccion == "" ||
        this.individuo_completo[0].barrio == "" ||
        this.individuo_completo[0].ocupacion == ""
      ) {
        alert("Los campos no puede estar vacios.");
      } else {
        this.axios
          .put(
            "jefe/actualizar/" + this.individuo_completo[0]._id,
            this.individuo_completo[0]
          )
          .then((response) => {
            this.dialog2=false
            this.volver_a_cargar_especialidades()
          })
          .catch((e) => {
            alert(
              "Error al actualizar, compruebe la información e intente mas tade."
            );
          });
      }
    },
    eliminar(id_jefe) {
      this.axios
        .put("jefe/eliminar/" + id_jefe)
        .then((respuesta) => {
          this.dialog3 = false;
         this.volver_a_cargar_especialidades()
        })
        .catch((e) => {
          alert("Error al desactivar el jefe, intente mas tade.");
        });
    },
  },
  created() {
    this.axios
      .get("jefe/listar/")
      .then((response) => {
        this.jefes = response.data;
      })
      .catch((e) => {
        alert(e);
      });
  },
};
</script>
<style scoped>
#layout {
  font-family: "Muli";
  width: 100%;
  height: auto;
  margin: auto;
}
#card_jefe {
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
  text-align: justify;
}
.camposGSK31 {
  margin: auto;
  width: 100%;
  height: 100%;
}
#indices {
  color: #bababa;
  font-size: 15px;
  font-weight: bold;
}
#botones_cortos_GSK31 {
  background: #ffe255;
  margin: auto;
  max-width: 90%;
  width: 80px;
  display: block;
  font-size: 10px;
  height: 30px;
  font-weight: bold;
  color: #121d3c;
}
#botones_cortos_2_GSK31 {
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
#botones_cortos_3_GSK31 {
  margin: auto;
  max-width: 90%;
  width: 45%;
  font-size: 10px;
  height: 50px;
  font-weight: bold;
}
#check {
  color: #ffe255;
  background: #fff;
}
</style>
