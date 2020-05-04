<template>
  <div class="mx-auto" align="center">
    <unidadesCard></unidadesCard>
    <br/>
    
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
        <v-card color="#000552">
          <v-card-title class="text-center">
            <span class="headline yellow--text">REGISTRAR UNIDADES</span>
          </v-card-title>
          <v-card-title class="text-center">
            <span class="title">Informacion personal</span>
          </v-card-title>
          <!-- campos-->
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" sm="10" md="5">
                  <v-text-field color="yellow" label="documento de identidad" required></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="10" md="5">
                  <v-text-field color="yellow" label="Primer nombre"></v-text-field>
                </v-col>
                <v-col cols="12" sm="10" md="5">
                  <v-text-field color="yellow" label="Segundo nombre"></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="10" md="5">
                  <v-text-field color="yellow" label="Primer apellido"></v-text-field>
                </v-col>
                <v-col cols="12" sm="10" md="5">
                  <v-text-field color="yellow" label="Segundo apellido"></v-text-field>
                </v-col>
                <!--Date picker -->
                <v-row>
                  <v-col cols="12" sm="10" md="5">
                    <v-dialog color="yellow"
                      ref="dialog"
                      v-model="modal"
                      :return-value.sync="date"
                      persistent
                      width="290px"
                    >
                      <template v-slot:activator="{ on }">
                        <v-text-field
                        color="yellow"
                          v-model="date"
                          label="Fecha de nacimiento"
                          prepend-icon="event"
                          readonly
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker color="yellow" v-model="date" scrollable>
                        <v-spacer
                        color="#000552"></v-spacer>
                        <v-btn text color="yellow" @click="modal = false">Cancel</v-btn>
                        <v-btn text color="yellow" @click="$refs.dialog.save(date)">OK</v-btn>
                      </v-date-picker>
                    </v-dialog>
                  </v-col>
                  <v-col cols="12" sm="10" md="5">
                    <v-text-field color="yellow" label="Correo electronico" required></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" sm="10" md="5">
                    <v-text-field color="yellow" label="Dirección"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="10" md="5">
                    <v-text-field color="yellow" label="Barrio"></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" sm="10" md="5">
                    <v-select
                    color="yellow" 

                      :items="['Familia', 'Manada', 'Tropa', 'Sociedad', 'Clan']"
                      label="Unidad"
                      required
                    ></v-select>
                  </v-col>
                  <v-col cols="12" sm="10" md="5">
                    <v-text-field color="yellow" label="Ocupación"></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" sm="10" md="5">
                    <v-text-field color="yellow" label="Número de telefono"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="10" md="5">
                    <v-text-field color="yellow" label="Número celular"></v-text-field>
                  </v-col>
                </v-row>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="yellow" text @click="dialog = false">Cancelar</v-btn>
            <v-btn color="yellow" text @click="dialog = false">Confirmar</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </div>
</template>
<script>
import unidadesCard from '../components/unidadesCard'
export default {
  components: {
    unidadesCard
  },
  data: () => ({
     dialog: false
  })
}
</script>
<style scoped>
#btn_flotante {
  display: scroll;
  position: fixed;
  background: #1C398A;
  text-align: center;
  padding: 0px;
  width: 50px;
  height: 50px;
  padding: 15px;
  color: #fff;
  border-radius: 50px;
  bottom: 50px;
  right: 15px;
}
</style>