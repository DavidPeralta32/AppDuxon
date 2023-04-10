<template>
    <!-- Navbar de opciones de navegacion -->
    <navBar></navBar>
    <!-- Fin navBar-->


    <v-container style="z-index: 0; width: 100%;  border-width:1px; background-color: white;">
        <h2>Registro Patronal</h2>
        <div
            style="z-index: 0; width: 100%;  border-width:1px; background-color: white;text-align: end;margin-bottom: 16px; ">
            <v-btn small style="vertical-align: bottom;" prepend-icon="mdi-account-multiple-plus-outline" color="blue"
                bg-color="white" @click="nuevoRegistroPatronal()">Agregar</v-btn>
        </div>

        <tablaRegistroPatronal></tablaRegistroPatronal>
    </v-container>

    <!--Modal agregar nuevo registro patronal-->
    <v-dialog style="width: 60%; min-height: auto;" v-model="dialogAgregarRegistroPatronal" persistent="true"
        transition="dialog-top-transition">
        <v-card>
            <v-toolbar color="primary" dark style="position: fixed;z-index: 100; width: 100%;">

                <div class="toolbar-titulo">
                    <div class="texto">
                        <h2 style="margin-left: 20px">Agregar Registro Patronal </h2>
                    </div>
                    <div class="icon_close">
                        <v-btn icon dark @click="dialogAgregarRegistroPatronal = false" style="margin-right: 8px;">
                            <v-icon>mdi-close</v-icon></v-btn>
                    </div>
                </div>

            </v-toolbar>

            <v-container style="margin-top: 80px;">
                <v-form ref="formEditarEmpleados" v-model="valid" lazy-validation>
                    <v-row class="filasRegistro">
                        <!--numero de registro patronal-->
                        <v-col cols="12" md="6">
                            <v-text-field v-model="nRegistroPatronal" label="#Registro Patronal" density="compact"
                                variant="outlined" required></v-text-field>
                        </v-col>

                        <!-- Fecha alta -->
                        <v-col cols="12" md="6">
                            <v-text-field v-model="dfechaAlta" type="date" label="Fecha Alta" variant="outlined" required
                                density="compact"></v-text-field>
                        </v-col>

                        <!-- Zona o ciudad -->
                        <v-col cols="12" md="6">
                            <v-text-field v-model="sZonaCiudad" label="Zona ó Ciudad" variant="outlined" required
                                density="compact"></v-text-field>
                        </v-col>

                        <!-- nSalarioMinimoZRP -->
                        <v-col cols="12" md="6">
                            <v-text-field v-model="nSalarioMinimoZPR" type="number" step=0.01 min="0" max="1000"
                                label="Salario Minimo ZRP" density="compact" variant="outlined" required></v-text-field>
                        </v-col>

                        <!-- Prima de riesgo -->
                        <v-col cols="12" md="6">
                            <v-text-field v-model="nPrimaRiesgo" label="Prima de Riesgo" variant="outlined" required
                                density="compact"></v-text-field>
                        </v-col>

                        <!-- Numero de lementos -->
                        <v-col cols="12" md="6">
                            <v-text-field v-model="nElementos" type="number" min="0" max="1000" label="#Elementos"
                                variant="outlined" required density="compact"></v-text-field>
                        </v-col>
                    </v-row>
                    <v-divider style="margin-bottom: 20px;"></v-divider>
                    <v-row>
                        <v-col cols="12" md="6">
                            <v-btn color="red" @click="(this.dialogAgregarRegistroPatronal = false)">Cancelar</v-btn>
                        </v-col>
                        <v-col cols="12" md="6" style="text-align:right">
                            <v-btn color="primary" @click="registrarEmpleados">Registrar</v-btn>

                        </v-col>
                    </v-row>
                </v-form>
            </v-container>
        </v-card>
    </v-dialog>
    <!--FIN Modal agregar nuevo registro patronal-->
</template>

<script>
import navBar from '../general/navBar.vue';
import tablaRegistroPatronal from '../../components/tablaRegistroPatronal.vue';

export default {
    components: {
        navBar,
        tablaRegistroPatronal,
        EasyDataTable: window['vue3-easy-data-table'],
    },
    created() {

    },
    data() {
        return {
            //pruebas:'http://localhost:7005/',
            //produccion:'http://api-app.duxon.com.mx/',
            //entorno: 'http://api-app.duxon.com.mx/',
            entorno: 'http://localhost:7005/',

            dialogAgregarRegistroPatronal: false,
            nRegistroPatronal: null,
            dfechaAlta: '',
            nEstado: null,
            sZonaCiudad: null,
            nSalarioMinimoZPR: 0.0,
            nPrimaRiesgo: null,
            nElementos: 0,

        }
    },
    methods: {
        nuevoRegistroPatronal() {
            let self = this;
            self.dialogAgregarRegistroPatronal = true;
            self.dfechaAlta = self.printDate();
        },
        printDate: function () {
            return new Date().toLocaleDateString();
        },
        agregarRegistroPatronal: function(){
            let self = this;

            axios.post(self.entorno + 'contabilidad/getRegistroPatronal')
                .then(function (response) {
                    self.itemsRegistrosPatronal = response.data;
                    self.nEstadoRegistroPatronal = response.data[0].nEstado;
                })
        }
    },
    mounted: function () {
        
    }
}
</script>

<style>
.toolbar-titulo {
    width: 100%;
    display: flex;
    justify-content: space-between;
}
</style>

