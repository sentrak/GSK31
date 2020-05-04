<template>
  <div>
    <!--Tarjeta de presentacion de unidades -->
    <v-card
      id="espacio"
      :elevation="10"
      color="#000233"
      max-width="100%"
      v-for="unidad in unidades"
      :key="unidad.id"
    >
      <v-list-item three-line>
        <v-list-item-content>
          <div class="overline mb-4">{{unidad.unidad}}</div>
          <v-list-item-title class="headline mb-1 yellow--text">{{unidad.nombre}}</v-list-item-title>
          <v-list-item-subtitle>{{unidad.id}}</v-list-item-subtitle>
        </v-list-item-content>
        <v-img
          tile
          size="10"
          color="grey"
          max-width="100px"
          max-height="100px"
        ></v-img>
      </v-list-item>

      <v-card-actions>
        
        <!--Boton de elimiar -->
        <v-row justify="center">
          <v-btn
            id="margenes"
            class="yellow--text"
            color="#000552"
            @click.stop="dialog3 = true"
          >Eliminar</v-btn>

          <v-dialog v-model="dialog3" max-width="290">
            <v-card color="#000233">
              <v-card-title class="headline yellow--text">¿Seguro que desea eliminar esta unidad?</v-card-title>

              <v-card-text>Si eliminas esta unidad, se perdera todos sus integrantes con ella</v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>

                <v-btn color="yellow" text @click="dialog3 = false">Cancelar</v-btn>

                <v-btn color="yellow" text @click="dialog3 = false">Aceptar</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-row>
      </v-card-actions>
    </v-card>
    <br />
  </div>
</template>

<script>
export default {
  name: 'unidadesCard',
  props: {
    unidad: Object
  },
  data: () => ({
    unidades: [],
    dialog: false,
    dialog2: false,
    dialog3: false,
    date: new Date().toISOString().substr(0, 10),
    menu: false,
    modal: false,
    menu2: false
  })
}
</script>
<style scoped>
#margenes {
  margin-left: 4px;
  margin-right: 4px;
}
#espacio {
  margin-bottom: 20px;
}
</style>