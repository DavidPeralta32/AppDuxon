<template>
    <!-- Navbar de opciones de navegacion -->
    <navBar></navBar>
    <!-- Fin navBar-->


    <v-container style="z-index: 0; width: 100%;  border-width:1px; background-color: white;">
        <h2>Registro Patronal</h2>
        <!--ESTAS SON -->
        <v-tabs color="blue" style="width: 100%;" bg-color="white" v-model="tab" show-arrows>

            <v-tab value="tab-1" >
                <v-icon style="margin-right: 5px;">mdi-account-plus </v-icon>Reistro Patronal Activos</v-tab>
            <!-- <v-tab value="tab-2" @click="actualizarTablaBaja()"> -->
            <v-tab value="tab-2" >
                <v-icon style="margin-right: 5px; ">mdi-account-minus </v-icon>Reistro Patronal Baja</v-tab>
        </v-tabs>
        <div
            style="z-index: 0; width: 100%;  border-width:1px; background-color: white;text-align: end;margin-bottom: 16px; ">
            <v-btn small style="vertical-align: bottom;" prepend-icon="mdi-account-multiple-plus-outline" color="blue"
                bg-color="white" @click="nuevoRegistroPatronal()">Agregar</v-btn>
        </div>

        <tablaRegistroPatronal ref="tablaRegistroPatronal"></tablaRegistroPatronal>
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
                <v-form ref="formAltaRegistroPatronal" v-model="valid" lazy-validation>
                    <v-row class="filasRegistro">
                        <!--numero de registro patronal-->
                        <v-col cols="12" md="6">
                            <v-text-field v-model="nRegistroPatronal" label="#Registro Patronal" density="compact"
                                variant="outlined" required></v-text-field>
                        </v-col>

                        <!-- Fecha alta -->
                        <v-col cols="12" md="6">
                            <v-text-field v-model="dfechaAlta" type="date" min="dFechaAlta" label="Fecha Alta"
                                variant="outlined" required density="compact"></v-text-field>
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
                            <v-text-field v-model="nPrimaRiesgo" type="number" step=0.01 min="0" label="Prima de Riesgo"
                                variant="outlined" required density="compact"></v-text-field>
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
                            <v-btn color="primary" @click="agregarRegistroPatronal">Registrar</v-btn>

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
import axios from 'axios';

export default {
    components: {
        navBar,
        tablaRegistroPatronal: tablaRegistroPatronal,
        EasyDataTable: window['vue3-easy-data-table'],
    },
    created() {
        let dFechaActual = new Date().toLocaleDateString();
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
        },
        agregarRegistroPatronal: function () {
            let self = this;
            console.log(self.dfechaAlta);
            axios.post(self.entorno + 'contabilidad/altaRegistroPatronal', {
                nRegistroPatronal: self.nRegistroPatronal,
                dFechaAlta: self.dfechaAlta,
                sZonaCiudad: self.sZonaCiudad,
                nSalarioMinimoZPR: self.nSalarioMinimoZPR,
                nPrimaRiesgo: self.nPrimaRiesgo,
                nElementos: self.nElementos
            }).then(function (response) {
                var res = response.data.affectedRows;
                if (res == '1') {
                    self.$notify({
                        title: "OK",
                        text: "El registro patronal fue registrado con exito.",
                        type: 'success'
                    });
                    self.$refs.formAltaRegistroPatronal.reset()
                    self.dialogAgregarRegistroPatronal = false;
                    self.$refs.tablaRegistroPatronal.getRegistrosPatronal();
                } else {
                    self.$notify({
                        title: "Error de registro",
                        text: "Ocurrio un error al registrar el Registro patronal.",
                        type: 'warn'
                    });
                }
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

