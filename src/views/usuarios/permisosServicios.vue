<template>
        <h1>Permisos Servicios</h1>
        <v-btn prepend-icon="mdi-arrow-left-circle" variant="plain" :to="{ name: 'usuarios' }">
            <span>Regresar</span>
        </v-btn>
</template>
<script>
import axios from 'axios';
import { isEmpty } from 'lodash';
export default ({
    components: {
       
    },
    created() {
        
    },
    data() {
        return {
 
        }

    },

    watch: {

    },
    methods: {
        getAllUser() {
      let self = this;
      axios.post(this.entorno+'general/user', {
    
      }).then(function (response) {
        //console.log(response.data[0].urlEncuestaSalida)
        //self.urlEncuesta = response.data[0].urlEncuestaSalida
        //console.log(response.data)
        self.usuarios= response.data
      })
    },
    }
})

</script>
   
   
  
  
<style>
.customize-table {
    --easy-table-border: 1px solid rgb(228, 214, 214);
    --easy-table-row-border: 1px solid #445269;

    --easy-table-header-font-size: 14px;
    --easy-table-header-height: 50px;
    --easy-table-header-font-color: white;
    --easy-table-header-background-color: rgb(40, 144, 205);

    --easy-table-header-item-padding: 10px 15px;

    --easy-table-body-even-row-font-color: #fff;
    --easy-table-body-even-row-background-color: #4c5d7a;

    --easy-table-body-row-font-color: black;
    --easy-table-body-row-background-color: white;
    --easy-table-body-row-height: 50px;
    --easy-table-body-row-font-size: 14px;

    --easy-table-body-row-hover-font-color: #2d3a4f;
    --easy-table-body-row-hover-background-color: #eee;

    --easy-table-body-item-padding: 10px 15px;

    --easy-table-footer-background-color: #ffffff;
    --easy-table-footer-font-color: black;
    --easy-table-footer-font-size: 14px;
    --easy-table-footer-padding: 0px 10px;
    --easy-table-footer-height: 50px;

    --easy-table-rows-per-page-selector-width: 70px;
    --easy-table-rows-per-page-selector-option-padding: 10px;

    --easy-table-scrollbar-track-color: #2d3a4f;
    --easy-table-scrollbar-color: #2d3a4f;
    --easy-table-scrollbar-thumb-color: #4c5d7a;
    ;
    --easy-table-scrollbar-corner-color: #2d3a4f;

    --easy-table-loading-mask-background-color: #2d3a4f;
}
</style>