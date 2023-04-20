<template>
   <v-container style="z-index: 0; width: 100%;  border-width:1px; background-color: white;">
      <h2>IMSS</h2>

      <v-text-field variant="outlined" label="Buscar" density="compact" type="text" v-model="valorCampo"
         style="width: 100%; margin-top: 16px;"></v-text-field>

      <EasyDataTable :headers="headers" :items="itemsImss" buttons-pagination table-class-name="customize-table"
         :search-value="valorCampo" :loading="isLoading" empty-message="No se encontraron empleados con seguro social">

      </EasyDataTable>



   </v-container>
</template>


<script>

export default {
   components: {
      EasyDataTable: window['vue3-easy-data-table'],
      Header: window['vue3-easy-data-table'],
      Item: window['vue3-easy-data-table'],
   },
   data() {
      return {
         //pruebas:'http://localhost:7005/',
         //produccion:'http://api-app.duxon.com.mx/',
         //entorno: 'http://api-app.duxon.com.mx/',
         entorno: 'http://localhost:7005/',


         isLoading: false,
         //Tabla IMSS
         headers: [
            { text: "ID", value: "nID", sortable: true },
            { text: "#Registro Patronal", value: "nRegistroPatronal", sortable: true },
            { text: "Fecha de Alta", value: "dFechaAlta", sortable: true },
            { text: "Estado", value: "sEstado" },
            { text: "Zona ó Ciudad", value: "sZonaCiudad" },
            { text: "Salario Minimo Z.R.P", value: "nSalarioMinimoZRP" },
            { text: "Prima de Riesgo", value: "PrimaDeRiesgo" },
            { text: "# Elementos", value: "nElementos", sortable: true },
            { text: "Opciones", value: "Opciones" },
         ],
         itemsImss: [],
      }
   },

}
</script>