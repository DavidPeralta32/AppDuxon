<template>
    <v-text-field variant="outlined" label="Buscar" density="compact" type="text" v-model="valorCampo"
        style="width: 100%;"></v-text-field>
    <notifications style="z-index:1001110 ;" />

    <EasyDataTable :headers="headers" :items="itemsRegistrosPatronal" buttons-pagination table-class-name="customize-table"
        :search-value="valorCampo">

        <template #item-Opciones="{ nRegistroPatronal }">
            <v-menu>
                <template v-slot:activator="{ props }">
                    <v-btn icon="mdi-dots-vertical" v-bind="props"></v-btn>
                </template>

                <v-list>
                    <v-list-item>
                        <v-list-item-title>Ver</v-list-item-title>
                    </v-list-item>
                    <v-list-item>
                        <v-list-item-title>Editar</v-list-item-title>
                    </v-list-item>
                    <v-divider></v-divider>

                    <v-list-item>
                        <v-list-item-title>Tarjeta laboral</v-list-item-title>
                    </v-list-item>
                    <v-list-item>
                        <v-list-item-title>Asignar Servicios</v-list-item-title>
                    </v-list-item>
                    <v-divider></v-divider>

                    <v-list-item>
                        <v-list-item-title style="color: red;">Dar de baja </v-list-item-title>
                    </v-list-item>
                </v-list>
            </v-menu>
        </template>

        <template #item-nEstado="{ nEstado }">
            <v-btn title="Activo" v-if="nEstado != null && nEstado != '' && nEstado == 1" color="green"
                icon="mdi-checkbox-marked-circle" v-bind="props"></v-btn>


            <v-btn title="Baja" v-if="nEstado == null || nEstado == '' && nEstado == 2" color="red"
                icon="mdi-checkbox-marked-circle" v-bind="props"></v-btn>
        </template>

    </EasyDataTable>
</template>

<script>
import axios from 'axios'


export default ({
    components: {
        EasyDataTable: window['vue3-easy-data-table'],
    },
    created() {
        this.getRegistrosPatronal();

    },
    data() {
        return {
            //pruebas:'http://localhost:7005/',
            //produccion:'http://api-app.duxon.com.mx/',
            //entorno: 'http://api-app.duxon.com.mx/',
            entorno: 'http://localhost:7005/',

            //Tabla registro patronal
            headers: [
                { text: "ID", value: "ID" },
                { text: "#Registro Patronal", value: "nRegistroPatronal" },
                { text: "Fecha de Alta", value: "dFechaAlta" },
                { text: "Estado", value: "nEstado" },
                { text: "Zona ó Ciudad", value: "sZonaCiudad" },
                { text: "Salario Minimo Z.R.P", value: "nSalarioMinimoZRP" },
                { text: "Prima de Riesgo", value: "PrimaDeRiesgo" },
                { text: "# Elementos", value: "nElementos" },
                { text: "Opciones", value: "Opciones" },
            ],
            searchField: ["idEmpleado", "dFechaAlta", "sZonaCiudad", "nSalarioMinimoZRP", "PrimaDeRiesgo", "nElementos"],
            valorCampo: '',
            itemsRegistrosPatronal: [],
            nEstadoRegistroPatronal: 0,
            idActual: '',
        }
    },
    methods: {
        getRegistrosPatronal() {
            let self = this;

            axios.post(self.entorno + 'contabilidad/getRegistroPatronal')
                .then(function (response) {
                    self.itemsRegistrosPatronal = response.data;
                    self.nEstadoRegistroPatronal = response.data[0].nEstado;
                })
        },
        bajaRegistroPatronal: function(nRegistroPatronal){
            
        }

    },
});



</script>