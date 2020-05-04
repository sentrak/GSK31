<template>
  <div id="layout">
    <!--Tarjeta de presentacion de especialidades-->
    <br />
    <div
      id="card_cuadro_de_especialidad"
      :elevation="5"
      color="#000233"
      max-width="100%"
      @click="especialidad.show = !especialidad.show"
      v-for="especialidad in especialidades"
      :key="especialidad._id"
    >
      <div
        id="imagen_estado"
        v-if="especialidad.estado == true"
        style="background:#42f435"
      >
        <v-img id="logo" :src="especialidad.imagen"></v-img>
      </div>
      <div
        id="imagen_estado"
        v-if="especialidad.estado == false"
        style="background: #f44235"
      >
        <v-img id="logo" :src="especialidad.imagen"></v-img>
      </div>

      <div id="derecha">
        <p id="titulo">{{ especialidad.nombre }}</p>
        <p id="sub_titulo">{{ cambio_texto(especialidad.estado) }}</p>
      </div>
      <br />
      <!------------------------------------------------------------------------------------------------------------ -->
      <div v-if="rol != 'Integrante'">
        <!--ACTUALIZAR  -->
        <v-dialog v-model="dialog2" width="500">
          <template v-slot:activator="{ on }">
            <v-btn id="boton2" v-on="on">
              Actualizar
            </v-btn>
          </template>

          <v-card color="#121D3C">
            <v-card-title id="cards_title">{{ especialidad._id }}</v-card-title>

            <v-card-text>
              <v-col class="camposGSK31">
                <p id="indices">Nombre de la especialidad:</p>
                <v-text-field
                  color="#FFE255"
                  v-model="nuevo_nombre"
                  background-color="#eee"
                  outlined
                ></v-text-field>
              </v-col>
            </v-card-text>

            <v-divider></v-divider>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn id="boton2" @click="dialog2 = false">
                Cancelar
              </v-btn>
              <v-btn
                id="boton2"
                @click="
                  actualizar_especialidad(
                    especialidad._id,
                    nuevo_nombre,
                    especialidad.tipo,
                    especialidad.imagen
                  )
                "
              >
                Aceptar
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <!--  -->
        <!-- ELIMINAR -->
        <v-dialog v-model="dialog3" width="500">
          <template v-slot:activator="{ on }">
            <v-btn id="boton2" v-on="on">
              ELIMINAR
            </v-btn>
          </template>

          <v-card color="#121D3C">
            <v-card-title id="cards_title">¿ESTAS SEGURO?</v-card-title>
            <v-card-text>
              <p id="card_title">
                Si eliminas esta especialiad se perdera todo el progreso de
                esta.
              </p>
            </v-card-text>

            <v-divider></v-divider>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn id="boton2" @click="dialog3 = false">
                Cancelar
              </v-btn>
              <v-btn
                id="boton2"
                @click="eliminar_especialidad(especialidad._id)"
              >
                Aceptar
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <hr />
        <!--  -->
        <!-- CREAR REQUISITO -->
        <v-dialog v-model="dialog1" width="500">
          <template v-slot:activator="{ on }">
            <v-btn id="boton2" v-on="on">
              Crear Requisito
            </v-btn>
          </template>

          <v-card color="#121D3C">
            <v-card-title id="cards_title">Nuevo requisito</v-card-title>

            <v-card-text>
              <v-col class="camposGSK31">
                <p id="indices">Descripción:</p>
                <v-text-field
                  color="#FFE255"
                  v-model="nueva_descripcion"
                  background-color="#eee"
                  outlined
                ></v-text-field>
              </v-col>
            </v-card-text>

            <v-divider></v-divider>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn id="boton2" @click="dialog1 = false">
                Cancelar
              </v-btn>
              <v-btn
                id="boton2"
                @click="crear_requisito(especialidad._id, nueva_descripcion)"
              >
                Aceptar
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <!--  -->
      </div>
      <!------------------------------------------------------------------------------------------------------------ -->

      <br />
      <!------------------------------------------------------------------------------------------------------------ -->
      <v-card-actions>
        <v-spacer></v-spacer>
      </v-card-actions>
      <v-expand-transition>
        <div v-show="especialidad.show">
          <v-divider></v-divider>
          <div
            id="card_requisito"
            :elevation="5"
            color="#000233"
            max-width="100%"
            v-for="requisito in especialidad.requisitos"
            :key="requisito._id"
          >
            <div
              id="color_estado"
              v-if="requisito.estado == 'No realizado'"
              style="background: #f44235"
            ></div>
            <div
              id="color_estado"
              v-if="requisito.estado == 'Realizado'"
              style="background: #42f435"
            ></div>
            <div
              id="color_estado"
              v-if="requisito.estado == 'Pendiente'"
              style="background: #f49f35"
            ></div>
            <p id="titulo2">{{ requisito.estado }}</p>
            <p id="sub_titulo2">{{ requisito.descripcion }}</p>
            <!--INICIO BOTON DE CRUD REQUISITOS  -->
            <hr />
            <!--ACTUALIZAR REQUISITO  -->

            <v-dialog v-model="dialog4" width="500">
              <template v-slot:activator="{ on }">
                <v-btn id="boton2" v-on="on">
                  Actualizar
                </v-btn>
              </template>

              <v-card color="#121D3C">
                <v-card-title id="cards_title"
                  >Actualizar requisito</v-card-title
                >

                <v-card-text>
                  <v-col class="camposGSK31">
                    <p id="indices">Descripción del requisito:</p>
                    <v-text-field
                      color="#FFE255"
                      v-model="nueva_descripcion_requisito"
                      background-color="#eee"
                      outlined
                    ></v-text-field>
                  </v-col>
                </v-card-text>

                <v-divider></v-divider>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn id="boton2" @click="dialog4 = false">
                    Cancelar
                  </v-btn>
                  <v-btn
                    id="boton2"
                    @click="
                      actualizar_requisitos(
                        requisito._id,
                        nueva_descripcion_requisito
                      )
                    "
                  >
                    Aceptar
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <!--  -->
            <!-- ELIMINAR REQUISITO -->
            <v-dialog v-model="dialog5" width="500">
              <template v-slot:activator="{ on }">
                <v-btn id="boton2" v-on="on">
                  ELIMINAR
                </v-btn>
              </template>

              <v-card color="#121D3C">
                <v-card-title id="cards_title">¿ESTAS SEGURO?</v-card-title>
                <v-card-text>
                  <p id="card_title">
                    Si eliminas esta especialiad se perdera todo el progreso de
                    esta.
                  </p>
                </v-card-text>

                <v-divider></v-divider>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn id="boton2" @click="dialog5 = false">
                    Cancelar
                  </v-btn>
                  <v-btn
                    id="boton2"
                    @click="eliminar_requisitos(requisito._id)"
                  >
                    Aceptar
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <!-- FIN BOTON CRUD REQUISITOS -->
            <hr />
            <!--BOTONES INTEGRANTE-->
            <v-btn
              v-if="requisito.estado == 'No realizado' && rol == 'Integrante'"
              id="boton1"
              text
              v-on:click="peticion_integrante(requisito._id, especialidad.tipo)"
              >Pedir validación</v-btn
            >
            <v-btn
              v-else-if="requisito.estado == 'Pendiente' && rol == 'Integrante'"
              id="boton1"
              text
              v-on:click="peticion_integrante(requisito._id, especialidad.tipo)"
              >Cancelar petición</v-btn
            >
            <!--BOTONES JEFE-->
            <!--BOTONE 1-->
            <v-btn
              v-else-if="
                requisito.estado == 'No realizado' && rol != 'Integrante'
              "
              id="boton1"
              text
              v-on:click="
                realizado_a_no_realizado(requisito._id, especialidad.tipo)
              "
              >Aceptar</v-btn
            >
            <v-btn
              v-else-if="requisito.estado == 'Realizado' && rol != 'Integrante'"
              id="boton1"
              text
              v-on:click="
                realizado_a_no_realizado(requisito._id, especialidad.tipo)
              "
              >Cancelar</v-btn
            >
            <v-btn
              v-else-if="requisito.estado == 'Pendiente' && rol != 'Integrante'"
              id="boton1"
              text
              v-on:click="rechazar_peticion(requisito._id, especialidad.tipo)"
              >Rechazar petición</v-btn
            >
            <!--BOTONE 2-->
            <v-btn
              v-if="requisito.estado == 'Pendiente' && rol != 'Integrante'"
              id="boton2"
              text
              v-on:click="aceptar_peticion(requisito._id, especialidad.tipo)"
              >Aceptar petición</v-btn
            >
          </div>
          <br />
          <br />
        </div>
      </v-expand-transition>
      <!------------------------------------------------------------------------------------------------------------ -->
    </div>
    <br />
  </div>
</template>
<script>
export default {
  name: "especialidadesOptativasCard",
  props: {
    especialidad: Object,
    requisito: Object,
  },
  data: () => ({
    dialog: false,
    dialog1: false,
    dialog2: false,
    dialog3: false,
    dialog4: false,
    dialog5: false,
    nueva_descripcion: "",
    nueva_descripcion_requisito: "",
    nuevo_nombre: "",
    id_integrante: "",
    unidad: "",
    tipo: "",
    rol: "",
    background: "",
    especialidades: [],
    especialidad_actualizar: [],
    requisito_actualizar: [],
    requisito_nuevo: [],
  }),
  methods: {
    //PETICIONES:
    //JEFES
    //DE NARANJA A VERDE(BUENO)
    //.get('cuadro/aceptar-peticion/' + this.id_integrante + '/' + tipo + '/' + id)
    //DE NARANJA A ROJO(BUENO)
    //.get('cuadro/rechazar-peticion/' + this.id_integrante + '/' + tipo + '/' + id)
    //DE ROJO A VERDE Y VICEVERSA(BUENO)
    //.get('cuadro/validar-cancelar/' + this.id_integrante + '/' + tipo + '/' + id)

    //INTEGRANTE
    //DE ROJO A NARANJA Y DE NARANJA A ROJO(BUENO)
    //.get('cuadro/integrante-peticion-cancelacion/' + this.id_integrante + '/' + tipo + '/' + id)

    //INTEGRANTE: CAMBIA EL ESTADO DE NO REALIZADO A PENDIENTE Y DE PENDIENTE A NO REALIZADO
    peticion_integrante(id, tipo) {
      this.axios
        .get(
          "cuadro/integrante-peticion-cancelacion/" +
            this.id_integrante +
            "/" +
            tipo +
            "/" +
            id
        )
        .then((response) => {
          this.especialidades = response.data;
          this.ponerdatos();
        })
        .catch((e) => {
          alert("ERROR: " + e);
        });
    },
    //JEFE: CAMBIA EL ESTADO DE NO REALIZADO A REALIZADO Y DE REALIZADO A NO REALIZADO(ROJO A VERDE Y VERDE A ROJO)
    realizado_a_no_realizado(id, tipo) {
      this.axios
        .get(
          "cuadro/validar-cancelar/" +
            this.id_integrante +
            "/" +
            tipo +
            "/" +
            id
        )
        .then((response) => {
          this.especialidades = response.data;
          this.ponerdatos();
        })
        .catch((e) => {
          alert("ERROR: " + e);
        });
    },
    //JEFE: CAMBIA EL ESTADO DE PENDIENTE A REALIZADO(DE NARANJA A VERDE)
    aceptar_peticion(id, tipo) {
      this.axios
        .get(
          "cuadro/aceptar-peticion/" +
            this.id_integrante +
            "/" +
            tipo +
            "/" +
            id
        )
        .then((response) => {
          this.especialidades = response.data;
          this.ponerdatos();
        })
        .catch((e) => {
          alert("ERROR: " + e);
        });
    },
    //JEFE: CAMBIA EL ESTADO DE PENDIENTE A NO REALIZADO(DE NARANJA A ROJO)
    rechazar_peticion(id, tipo) {
      this.axios
        .get(
          "cuadro/rechazar-peticion/" +
            this.id_integrante +
            "/" +
            tipo +
            "/" +
            id
        )
        .then((response) => {
          this.especialidades = response.data;
          this.ponerdatos();
        })
        .catch((e) => {
          alert("ERROR: " + e);
        });
    },
    cambio_texto(estado) {
      if (estado == true) {
        return "Obtenido";
      } else {
        return "No obtenido";
      }
    },
    //AGREGAMOS EL CAMPO SHOW A CADA CUADRO DE ADELANTOS PARA VISUALIZAR SUS REQUISITOS
    ponerdatos() {
      for (let i = 0; i < this.especialidades.length; i++) {
        if (this.especialidades[i].show == true) {
          this.especialidades[i].show = true;
        } else {
          this.$set(this.especialidades[i], "show", false);
        }
      }
    },
    /* METODO PARA CREAR UN NUEVO REQUISITO */
    crear_requisito(id, descripcion) {
      this.requisito_nuevo = [];
      this.requisito_nuevo = [
        {
          descripcion: descripcion,
        },
      ];

      if (descripcion != "") {
        this.axios
          .post(
            "requisito/nuevo_adicional/" + this.id_integrante + "/" + id,
            this.requisito_nuevo[0]
          )
          .then((response) => {
            this.dialog1 = false;
            this.volver_a_cargar_especialidades()
          })
          .catch((e) => {
            alert("ERROR: " + e);
          });
      } else {
        alert("El nombre no puede estar vacio.");
      }
    },

    /* METODO PARA ACTUALIZAR UNA ESPECIALIDAD */
    actualizar_especialidad(id, nombre, tipo, imagen) {
      this.especialidad_actualizar = [];
      this.especialidad_actualizar = [
        {
          nombre: nombre,
          tipo: tipo,
          imagen: imagen,
        },
      ];
      if (nombre != "") {
        this.axios
          .put(
            "cuadro/actualizar_adicional/" + this.id_integrante + "/" + id,
            this.especialidad_actualizar[0]
          )
          .then((response) => {
            this.dialog2 = false;
            this.volver_a_cargar_especialidades()
          })
          .catch((e) => {
            alert("ERROR: " + e);
          });
      } else {
        alert("El nombre no puede estar vacio.");
      }
    },
    /* METODO PARA ELIMINAR UNA ESPECIALIDAD */
    eliminar_especialidad(id) {
      this.axios
        .delete("cuadro/eliminar_adicional/" + this.id_integrante + "/" + id)
        .then((response) => {
          this.dialog3 = false;
         this.volver_a_cargar_especialidades()
        })
        .catch((e) => {
          alert("ERROR: " + e);
        });
    },
    /* METODO PARA ACTUALIZAR UN REQUISITO */
    actualizar_requisitos(id, descripcion) {
      this.requisito_actualizar = [];
      this.requisito_actualizar = [
        {
          descripcion: descripcion,
        },
      ];
      if (descripcion != "") {
        this.axios
          .put(
            "requisito/actualizar_adicional/" + this.id_integrante + "/" + id,
            this.requisito_actualizar[0]
          )
          .then((response) => {
            this.dialog4 = false;
           this.volver_a_cargar_especialidades()
          })
          .catch((e) => {
            alert("ERROR: " + e);
          });
      } else {
        alert("La descripción no puede estar vacio.");
      }
    },
    /* METODO PARA ELIMINAR UN REQUISITO */
    eliminar_requisitos(id) {
      this.axios
        .delete("requisito/eliminar_adicional/" + this.id_integrante + "/" + id)
        .then((response) => {
          this.dialog5 = false;
          this.volver_a_cargar_especialidades()
        })
        .catch((e) => {
          alert("ERROR: " + e);
        });
    },
    /* METODO PARA RECARGAR LA LISTA DE ESPECIALIDADES */
    volver_a_cargar_especialidades() {
      this.especialidades = [];
      //lLENAMOS LA INFORMACION DE LAS ESPECIALIDADES DEL PLAN DE ADELANTO

      if (this.unidad == "Familia") {
        this.tipo = "Especialidad Familia";
      } else if (this.unidad == "Manada") {
        this.tipo = "Especialidad Manada Optativa";
      } else if (this.unidad == "Tropa") {
        this.tipo = "Especialidad Tropa Optativa";
      } else {
        this.tipo = "Especialidad Sociedad Optativa";
      }
      this.axios
        .get("cuadro/lista/" + this.tipo + "/" + this.id_integrante)
        .then((response) => {
          this.especialidades = response.data;
          this.ponerdatos();
        })
        .catch((e) => {
          alert("ERROR: " + e);
        });
    },
  },
  //SE LLENA EL PLAN DE ADELANTOS DEL INTEGRANTE
  created() {
    //OBTENEMOS EL ID DEL INTEGRANTE

    if (localStorage._id_integrante) {
      this.id_integrante = localStorage._id_integrante;
    } else {
      alert("id_integrante no existe");
    }
    //OBTENEMOS EL ROL SEA DE JEFE O DE INTEGRANTE PARA SABER COMO REALIZAR LA PAGE
    if (localStorage.rol) {
      this.rol = localStorage.rol;
    } else {
      alert("rol no existe");
    }
    //OBTENEOS LA UNIDAD DEL INTEGRANTE
    if (localStorage.unidad_integrante) {
      this.unidad = localStorage.unidad_integrante;
    } else {
      alert("unidad no existe");
    }

    //lLENAMOS LA INFORMACION DE LAS ESPECIALIDADES DEL PLAN DE ADELANTO

    if (this.unidad == "Familia") {
      this.tipo = "Especialidad Familia";
    } else if (this.unidad == "Manada") {
      this.tipo = "Especialidad Manada Optativa";
    } else if (this.unidad == "Tropa") {
      this.tipo = "Especialidad Tropa Optativa";
    } else {
      this.tipo = "Especialidad Sociedad Optativa";
    }
    this.axios
      .get("cuadro/lista/" + this.tipo + "/" + this.id_integrante)
      .then((response) => {
        this.especialidades = response.data;
        this.ponerdatos();
      })
      .catch((e) => {
        alert("ERROR: " + e);
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
#card_cuadro_de_especialidad {
  margin-bottom: 10px;
  background: #222b5c;
  max-width: 100%;
  width: 96%;
  margin-left: 2%;
  margin-right: 2%;
  height: auto;
  display: inline-block;
}
#imagen_estado {
  width: 70px;
  height: 70px;
  background: #f44235;
  float: left;
  position: relative;
}
#logo {
  max-width: 100%;
  display: block;
  margin: auto;
  width: 90%;
  height: auto;
}
#titulo {
  color: #ffe255;
  margin-top: 10px;
  width: 80%;
  font-size: 15px;
  font-weight: bold;
}
#sub_titulo {
  color: #bababa;
  font-size: 13px;
  margin-top: -12px;

  font-weight: bold;
}
#derecha {
  padding-left: 10px;
  float: left;
  width: 65%;
  height: 70px;
}
#abajo {
  float: inherit;
  margin-top: -15px;
}
/*ESTILO REQUISITOS */
#card_requisito {
  margin-top: 2.5%;
  background: #222b5c;
  max-width: 100%;
  width: 100%;
  height: auto;
  display: inline-block;
}

#color_estado {
  width: 100%;
  height: 40px;
  background: #f44235;
}
#titulo2 {
  margin: auto;
  color: #ffe255;
  font-size: 20px;
  margin-top: 10px;
  margin-left: 15px;
  font-weight: bold;
}
#sub_titulo2 {
  color: #bababa;
  font-size: 15px;
  font-weight: bold;
  text-align: justify;
  margin-left: 15px;
  margin-top: 7px;
  width: 90%;
}
#boton1 {
  background: #ffe255;
  margin: auto;
  max-width: 90%;
  width: 130px;
  float: left;
  position: relative;
  font-size: 10px;
  height: 40px;
  font-weight: bold;
  color: #121d3c;
  margin: 1%;
}
#boton2 {
  background: #ffe255;
  margin: auto;
  max-width: 90%;
  width: 130px;
  font-size: 10px;
  height: 40px;
  margin: 1%;
  position: relative;
  font-weight: bold;
  color: #121d3c;
}
#mostrado {
  margin-top: 30%;
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
</style>
