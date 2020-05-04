<template>
  <div id="layout">
    <!--Tarjeta de presentacion de adelanto -->
    <br />
    <div
      id="card_cuadro_de_adelanto"
      :elevation="5"
      color="#000233"
      max-width="100%"
      @click="adelanto.show = !adelanto.show"
      v-for="adelanto in adelantos"
      :key="adelanto._id"
    >
      <div
        id="imagen_estado"
        v-if="adelanto.estado == true"
        style="background:#42f435"
      >
        <v-img id="logo" :src="adelanto.imagen"></v-img>
      </div>
      <div
        id="imagen_estado"
        v-if="adelanto.estado == false"
        style="background: #f44235"
      >
        <v-img id="logo" :src="adelanto.imagen"></v-img>
      </div>

      <div id="derecha">
        <p id="titulo">{{ adelanto.nombre }}</p>
        <p id="sub_titulo">{{ cambio_texto(adelanto.estado) }}</p>
      </div>
      <br />
      <!------------------------------------------------------------------------------------------------------------ -->
      <v-card-actions>
        <v-spacer></v-spacer>
      </v-card-actions>
      <v-expand-transition>
        <div v-show="adelanto.show">
          <v-divider></v-divider>
          <div
            id="card_requisito"
            :elevation="5"
            color="#000233"
            max-width="100%"
            v-for="requisito in adelanto.requisitos"
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
            <hr />
            <!--BOTONES INTEGRANTE-->
            <v-btn
              v-if="requisito.estado == 'No realizado' && rol == 'Integrante'"
              id="boton1"
              text
              v-on:click="peticion_integrante(requisito._id, adelanto.tipo)"
              >Pedir validación</v-btn
            >
            <v-btn
              v-else-if="requisito.estado == 'Pendiente' && rol == 'Integrante'"
              id="boton1"
              text
              v-on:click="peticion_integrante(requisito._id, adelanto.tipo)"
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
                realizado_a_no_realizado(requisito._id, adelanto.tipo)
              "
              >Aceptar</v-btn
            >
            <v-btn
              v-else-if="requisito.estado == 'Realizado' && rol != 'Integrante'"
              id="boton1"
              text
              v-on:click="
                realizado_a_no_realizado(requisito._id, adelanto.tipo)
              "
              >Cancelar</v-btn
            >
            <v-btn
              v-else-if="requisito.estado == 'Pendiente' && rol != 'Integrante'"
              id="boton1"
              text
              v-on:click="rechazar_peticion(requisito._id, adelanto.tipo)"
              >Rechazar petición</v-btn
            >
            <!--BOTONE 2-->
            <v-btn
              v-if="requisito.estado == 'Pendiente' && rol != 'Integrante'"
              id="boton2"
              text
              v-on:click="aceptar_peticion(requisito._id, adelanto.tipo)"
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
  name: "adelantosCard",
  props: {
    adelanto: Object,
    requisito: Object,
  },
  data: () => ({
    id_integrante: "",
    unidad: "",
    tipo: "",
    rol: "",
    background: "",
    adelantos: [],
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
          this.adelantos = response.data;
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
          this.adelantos = response.data;
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
          this.adelantos = response.data;
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
          this.adelantos = response.data;
          this.ponerdatos();
        })
        .catch((e) => {
          alert("ERROR: " + e);
        });
    },
     cambio_texto(estado){
  if (estado == true) {
        return "Obtenido";
      } else {
        return "No obtenido";
      }
    },
    //AGREGAMOS EL CAMPO SHOW A CADA CUADRO DE ADELANTOS PARA VISUALIZAR SUS REQUISITOS
    ponerdatos() {
      for (let i = 0; i < this.adelantos.length; i++) {
        if (this.adelantos[i].show == true) {
          this.adelantos[i].show = true;
        } else {
          this.$set(this.adelantos[i], "show", false);
        }
      }
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

    //lLENAMOS LA INFORMACION DE LOS ADELANTOS DEL PLAN DE ADELANTO
    this.axios
      .get("cuadro/lista/Adelanto/" + this.id_integrante)
      .then((response) => {
        this.adelantos = response.data;
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
#card_cuadro_de_adelanto {
  margin-bottom: 10px;
  background: #222b5c;
  max-width: 100%;
  width: 96%;
  margin-left: 2%;
  margin-right: 2%;
  max-height: 70px;
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
  margin-top: 5px;
  width: 80%;
  font-size: 20px;
  font-weight: bold;
}
#sub_titulo {
  color: #bababa;
  font-size: 15px;
  margin-top: -15px;

  font-weight: bold;
}
#derecha {
  padding-left: 10px;
  float: left;
  width: 65%;
  height: 70px;
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
</style>
