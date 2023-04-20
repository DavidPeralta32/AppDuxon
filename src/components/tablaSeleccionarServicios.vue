<template>
  <h2>{{ itemsSelected }}</h2>
  <EasyDataTable v-model:itemsSelected="itemsSelected" :headers="headers" :items="items" :theme-color="themeColor"
    buttons-pagination />
</template>

<script >
import { defineComponent, ref } from "vue";
import axios from 'axios'

export default defineComponent({

  created() {
    this.itemsSelected = [1, 3, 5];
    this.getServiciosPrincipal();
    this.getServiciosxId(this.nRegistroPatronal);
    
  },
  data() {
    const items = []; // initialize items as an empty array
    const itemsSelected = ref(items.map(item => item.idServicio)); // initialize itemsSelected as an array of idServicio values

    return {
      entorno: 'http://localhost:7005/',

      headers: [
        { text: "IDServicio ", value: "idServicio", width: 20, sortable: true },
        { text: "Nombre", value: "nombre", sortable: true },
        { text: "Zona", value: "contrato", sortable: true },
        { text: "Estado", value: "EstadoServicio", sortable: true },
      ],

      items: items,
      themeColor: "#f48225",
      itemsSelected: itemsSelected,

      nRegistroPatronal: 2525,
    }
  },
  watch: {
    itemsSelected() {
      console.log(this.itemsSelected.map(item => item.idServicio));
    }
  },
  methods: {
    getServicios(servicios) {
      let self = this;
      axios.post(this.entorno + 'contabilidad/getServicios', {
        selectServicios: servicios
      }).then(function (response) {
        if (response.data.length > 0) {
          self.items = response.data;
        } else {
          self.items = null;
        }

      });

      //servicios
    },

    getServiciosPrincipal() {
      let self = this;
      axios.post(this.entorno + 'contabilidad/getServiciosPrincipal', {

      }).then(function (response) {
        self.items = response.data
      });

    },

    splitIntoArray(num) {
      return String(num).split(',').map(Number);
    },

    async getServiciosxId(p_nRegistroPatronal) {
      let self = this;
      var servicios = "";
      await axios.post(this.entorno + 'contabilidad/serviciosxId', {
        nRegistroPatronal: p_nRegistroPatronal
      }).then(function (response) {
        servicios = response.data[0].ServiciosAsignados
        console.log(servicios.split(','));
        if ( servicios == '') {
          self.itemsSelected = [];
        } else {
          self.itemsSelected = servicios; //servicios.split(',')
          self.itemsSelected = self.splitIntoArray(servicios); //servicios.split(',')
          servicios = self.splitIntoArray(self.itemsSelected);
        }
      });

      //return servicios;
    },

  },
});


</script >