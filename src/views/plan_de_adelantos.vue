<template>
  <div id="layout">
    <v-img id="logo" :src="imagen_unidad()"></v-img>
    <p id="titulo">{{ nombre }}</p>
    <p id="sub_titulo">{{ id }}</p>
    <v-tabs
      fixed-tabs
      v-model="tab"
      background-color="#222b5c"
      id="tabs"
      v-if="unidad == 'Familia'"
    >
      <v-tab color="#ffe255" id="tabs" v-for="item in familia" :key="item">{{
        item
      }}</v-tab>
    </v-tabs>
    <v-tabs
      fixed-tabs
      v-else-if="unidad == 'Manada'"
      background-color="#222b5c"
      id="tabs"
      v-model="tab"
    >
      <v-tab color="#ffe255" v-for="item in manada" :key="item">{{
        item
      }}</v-tab>
    </v-tabs>
    <v-tabs
      fixed-tabs
      v-else-if="unidad == 'Tropa'"
      background-color="#222b5c"
      id="tabs"
      v-model="tab"
    >
      <v-tab color="#ffe255" v-for="item in tropa" :key="item">{{
        item
      }}</v-tab>
    </v-tabs>
    <v-tabs
      fixed-tabs
      v-else-if="unidad == 'Sociedad'"
      background-color="#222b5c"
      id="tabs"
      v-model="tab"
    >
      <v-tab color="#ffe255" v-for="item in sociedad" :key="item">{{
        item
      }}</v-tab>
    </v-tabs>
    <v-tabs
      fixed-tabs
      v-else-if="unidad == 'Clan'"
      background-color="#222b5c"
      id="tabs"
      v-model="tab"
    >
      <v-tab color="#ffe255" v-for="item in clan" :key="item">{{ item }}</v-tab>
    </v-tabs>
    <v-tabs-items id="tabs_items" v-model="tab">
      <v-tab-item>
        <areasDeCrecimientoCard />
      </v-tab-item>
      <v-tab-item v-if="unidad === 'Familia' || unidad === 'clan'">
        <especialidadesCard />
      </v-tab-item>

      <v-tab-item v-else>
        <v-tabs fixed-tabs background-color="#222b5c" id="tabs2" v-model="tab2">
          <v-tab v-for="item in especialidades" :key="item">{{ item }}</v-tab>
        </v-tabs>
        <v-tabs-items id="tabs_items" v-model="tab2">
          <v-tab-item>
            <especialidadesCard />
          </v-tab-item>
          <v-tab-item>
            <especialidadesOptativasCard />
            <!-- BOTON PARA CREAR UNA NUEVA ESPECIALIDAD OPTATIVA -->
            <v-row v-if="rol != 'Integrante'" justify="center">
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
                <!--FORMULARIO PARA CREAR EL LA ESPECIALIDAD OPTATIVA -->
                <v-card color="#121D3C">
                  <v-card-title id="cards_title"
                    >CREAR ESPECIALIDAD OPTATIVA</v-card-title
                  >
                  <v-card-title id="cards_title"></v-card-title>
                  <!-- campos-->
                  <v-card-text>
                    <v-container>
                      <v-col class="camposGSK31">
                        <p id="indices">Nombre de la especialidad:</p>
                        <v-text-field
                          color="#FFE255"
                          v-model="nombre_especialidad"
                          background-color="#eee"
                          outlined
                        ></v-text-field>
                      </v-col>
                    </v-container>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                      id="botones_cortos_GSK31"
                      @click.stop="dialog = false"
                      >Cancelar</v-btn
                    >
                    <v-btn
                      id="botones_cortos_GSK31"
                      v-on:click="crear_especialidad_optativa()"
                      >Confirmar</v-btn
                    >
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-row>
            <!--  -->
          </v-tab-item>
        </v-tabs-items>
      </v-tab-item>
      <!--  -->

      <v-tab-item>
        <adelantosCard />
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>
<script>
import areasDeCrecimientoCard from "../components/areasDeCrecimientoCard";
import especialidadesCard from "../components/especialidadesCard";
import especialidadesOptativasCard from "../components/especialidadesOptativasCard";
import adelantosCard from "../components/adelantosCard";
export default {
  components: {
    areasDeCrecimientoCard,
    especialidadesCard,
    especialidadesOptativasCard,
    adelantosCard,
  },
  data() {
    return {
      dialog: false,
      id: "",
      _id: "",
      nombre: "",
      individuo: [],
      tab: null,
      tab2: null,
      unidad: "",
      rol: "",
      familia: ["Dentelladas", "Especialidades", "Adelantos"],
      manada: ["Prezas de caza", "Especialidades", "Adelantos"],
      tropa: ["Aventuras", "Especialidades", "Adelantos"],
      sociedad: ["Desafios de acción", "Especialidades", "Adelantos"],
      clan: ["Rutas para rovers", "Proyectos", "Adelantos"],
      especialidades: ["Basicas", "Optativas"],
      nombre_especialidad: "",
      tipo_especialidad: "",
      imagen_especialidad: "",
      especialidad: [],
    };
  },
  methods: {
    imagen_unidad() {
      if (this.unidad == "Familia") {
        return "https://i.ibb.co/h73PVvz/familia.png";
      } else if (this.unidad == "Manada") {
        return "https://i.ibb.co/dkJZnJr/manada.png";
      } else if (this.unidad == "Tropa") {
        return "https://i.ibb.co/mJ9nxt4/tropa.png";
      } else if (this.unidad == "Sociedad") {
        return "https://i.ibb.co/d0zrmJ6/sociedad.png";
      } else {
        return "https://i.ibb.co/FxqMjgb/clan.png";
      }
    },
    crear_especialidad_optativa() {
      this.especialidad = [];
      if (this.nombre_especialidad != "") {
        if (this.unidad == "Familia") {
        } else if (this.unidad == "Manada") {
          this.tipo_especialidad = "Especialidad Manada Optativa";
          this.imagen_especialidad = "https://i.ibb.co/dkJZnJr/manada.png";
        } else if (this.unidad == "Tropa") {
          this.tipo_especialidad = "Especialidad Tropa Optativa";
          this.imagen_especialidad = "https://i.ibb.co/mJ9nxt4/tropa.png";
        } else if (this.unidad == "Sociedad") {
          this.tipo_especialidad = "Especialidad Sociedad Optativa";
          this.imagen_especialidad = "https://i.ibb.co/d0zrmJ6/sociedad.png";
        }

        this.especialidad = [
          {
            nombre: this.nombre_especialidad,
            tipo: this.tipo_especialidad,
            imagen: this.imagen_especialidad,
          },
        ];
        this.axios
          .post("cuadro/nuevo_adicional/" + this._id, this.especialidad[0])
          .then((respuesta) => {
            this.dialog = false;
            location.reload();
          })
          .catch((e) => {
            alert(e);
          });
      }else{
        alert("El nombre no pude estar vacio.")
      }
    },
  },
  mounted() {
    //LIMIPIAMOS EL LOCAL STORAGE
    if (localStorage.unidad_integrante) {
      this.unidad = localStorage.unidad_integrante;
    }
    if (localStorage.rol) {
      this.rol = localStorage.rol;
    }

    if (localStorage._id_integrante) {
      this._id = localStorage._id_integrante;
    }
    if (localStorage.id_integrante) {
      this.id = localStorage.id_integrante;
    }
    this.axios
      .get("scout/listar/" + this.id)
      .then((respuesta) => {
        this.id = respuesta.data.id;
        this.nombre = respuesta.data.nombre + " " + respuesta.data.apellidos;
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
  height: 100%;
  margin: auto;
}
#tabs {
  font-size: 10px;
  font-weight: bold;
  margin: auto;
  width: (100px/3px);
  color: #fff;
  background: #121d3c;
}
#tabs_items {
  background: #121d3c;
  color: #fff;
}
p {
  text-align: center;
}
#logo {
  max-width: 100%;
  display: block;
  margin: auto;
  margin-top: 5%;
  width: 100px;
  height: auto;
  top: 0%;
  margin-bottom: 20px;
}
#titulo {
  color: #ffe255;
  margin-top: 5px;
  display: block;
  margin: auto;
  width: 80%;
  font-size: 17px;
  font-weight: bold;
}
#sub_titulo {
  color: #bababa;
  font-size: 15px;
  font-weight: bold;
  text-align: center;
  display: block;
  margin: auto;
  margin-bottom: 8px;
}
#btn_flotante {
  display: scroll;
  position: fixed;
  background: #1C398A;
  text-align: center;
  padding: 0px;
  z-index: 3;
  max-width: 60px;
  max-height: 60px;
  padding: 15px;
  color: #fff;
  border-radius: 50px;
  bottom: 20px;
  right: 20px;
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
