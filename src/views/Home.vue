<template>
  <div id="layout">
    <!-- imagen del frmulario -->
    <v-img id="logo" :src="images.miimagen"></v-img>
    <!--Sub titulo -->
    <p id="sub_titulo">Iniciar sesión</p>
    <p id="indices">Número de identificación:</p>
    <!--CAMPO IDENTIFICACIÓN -->
    <v-col class="camposGSK31">
      <v-text-field
        color="#FFE255"
        v-model="identificacion"
        persistent-hint
        type="phone"
        background-color="#eee"
        outlined
      ></v-text-field>
    </v-col>
    <!--CAMPO CONTRASEÑA -->
    <p id="indices">Contraseña</p>

    <v-col class="camposGSK31">
      <v-text-field
        color="#FFE255"
        v-model="password"
        :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
        :rules="[rules.required2]"
        :type="show1 ? 'text' : 'password'"
        name="input-10-1"
        background-color="#eee"
        outlined
        @click:append="show1 = !show1"
      ></v-text-field>
    </v-col>
    <!-- BOTON DE VALIDACIÓN-->
    <v-btn id="botones_largos_GSK31" v-on:click="validar_datos()"
      >Iniciar</v-btn
    >
  </div>
</template>
<script>
import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
Vue.use(VueAxios, axios);
axios.defaults.baseURL = "https://backgsk31.herokuapp.com/";
export default {
  data() {
    return {
      dialog: false,

      images: {
        miimagen: "https://i.ibb.co/0fBbtzs/logo-grupo-completo.png",
      },
      validacion: [],
      identificacion: "0",
      show1: false,
      show2: true,
      show3: false,
      show4: false,
      password: "",
      i: 0,
      rules: {
        required1: (value) => !!value || "El nombre de usuario es obligatorio.",
        required2: (value) => !!value || "La contraseña es obligatoria.",
        emailMatch: () => "El usuario y la contraseña no concuerdan",
      },
    };
  },
  methods: {
    validar_datos() {
      //VACIOMOS LA VALIDACIÓN DEL USUARIO
      this.validacion = [];
      //LLENAMOS VALIDACION CON LOS TATOS INGRESADOS
      this.validacion = [
        {
          id: this.identificacion,
          contrasena: this.password,
        },
      ];
      //VALIDAMOS QUE LOS CAMPOS NO ESTEN VACIOS
      if (this.validacion[0].id == "" || this.validacion[0].contrasena == "") {
        alert("Los campos no puede estar vacios.");
        //SI LOS CAMPOS NO ESTAN VACIOS
      } else {
        //HACEMOS LA CONEXION A LA BASE DE DATOS CON LA PETICION DE LOGIN
        this.axios
          .post("login", this.validacion[0])
          .then((response) => {
            //SI EL ROL ES JEFE DE GRUPO LO MANDA AL LOBBY DEL JEFE DE GRUPO
            if (response.data.usuario.rol == "Jefe de grupo") {
              localStorage.removeItem("id_jefe");
              localStorage.removeItem("unidad_jefe");
              localStorage.removeItem("rol");
              localStorage.setItem("id_jefe", response.data.usuario._id);
              localStorage.setItem("unidad_jefe", response.data.usuario.unidad);
              localStorage.setItem("rol", response.data.usuario.rol);

              this.$router.push("/lobby_jefe_de_grupo");
            }
            //SI EL ROL ES JEFE DE UNIDAD O SUB JEFE DE UNIDAD LO MANDA AL LOBBY DEL EQUIPO D EJEFATURA
            else if (
              response.data.usuario.rol == "Jefe de unidad" ||
              response.data.usuario.rol == "Sub jefe de unidad"
            ) {
              localStorage.removeItem("id_jefe");
              localStorage.removeItem("unidad_jefe");
              localStorage.removeItem("rol");
              localStorage.setItem("id_jefe", response.data.usuario._id);
              localStorage.setItem("unidad_jefe", response.data.usuario.unidad);
              localStorage.setItem("rol", response.data.usuario.rol);
              this.$router.push("/lobby_jefatura");
            }
            //SI EL ROL ES INTEGRANTE LO MANDA AL PLAN DE ADELANTOS
            else if (response.data.usuario.rol == "Integrante") {
              localStorage.removeItem("unidad_integrante");
              localStorage.removeItem("id_integrante");
              localStorage.removeItem("_id_integrante");
              localStorage.removeItem("rol");
              localStorage.setItem(
                "unidad_integrante",
                response.data.usuario.unidad
              );
              localStorage.setItem("_id_integrante", response.data.usuario._id);
              localStorage.setItem("id_integrante", response.data.usuario.id);
              localStorage.setItem("rol", response.data.usuario.rol);
              this.$router.push("/plan_de_adelantos");
            }
            this.identificacion = "";
            this.password = "";
          })
          .catch((e) => {
            alert(
              "Lo sentimos, la información no es correcta, intentalo nuevamente"
            );
          });
      }
    },
  },
  created() {
    //LIMIPIAMOS LOS CAMPOS
    this.identificacion = "";
    this.password = "";
  },
  mounted() {
    //LIMIPIAMOS EL LOCAL STORAGE
    if (localStorage.id_integrante) {
      localStorage.removeItem("id_integrante");
    }
    if (localStorage.rol) {
      localStorage.removeItem("rol");
    } if (localStorage.rol_jefe) {
      localStorage.removeItem("rol_jefe");
    }
    if (localStorage.unidad_integrante) {
      localStorage.removeItem("unidad_integrante");
    }
    if (localStorage.id_jefe) {
      localStorage.removeItem("id_jefe");
    }
    if (localStorage.unidad_jefe) {
      localStorage.removeItem("unidad_jefe");
    }
    if (localStorage._id_integrante) {
      localStorage.removeItem("_id_integrante");
    }
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
#logo {
  max-width: 100%;
  display: block;
  margin: auto;
  width: 350px;
  height: auto;
  margin-bottom: 20px;
}
.camposGSK31 {
  margin: auto;
  width: 100%;
  height: 100%;
}
#sub_titulo {
  margin: auto;
  color: #ffe255;
  text-align: center;
  font-size: 25px;
  font-weight: bold;
}
#indices {
  color: #bababa;
  font-size: 15px;
  font-weight: bold;
  margin-left: 12px;
  margin-bottom: -8px;
}

#botones_largos_GSK31 {
  background: #222b5c;
  margin: auto;
  width: 93%;
  display: block;
  height: 50px;
  font-weight: bold;
  color: #ffe255;
}
</style>
