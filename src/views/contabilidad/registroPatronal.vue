<template>
    <v-container style="z-index: 0; width: 100%;  border-width:1px; background-color: white;">
        <h2>Registro Patronal</h2>

        <!--Tab´s para cambiar de componente de Activo a Bajas -->
        <v-tabs color="blue" style="width: 100%;" bg-color="white" v-model="tab" show-arrows>

            <v-tab value="tab-Activos" @click="obtenerPatronalActivos()">
                <v-icon style="margin-right: 5px;">mdi-account-plus </v-icon>Registro Patronal Activos</v-tab>

            <v-tab value="tab-Bajas" @click="obtenerPatronalBajas()">
                <v-icon style="margin-right: 5px; ">mdi-account-minus </v-icon>Registro Patronal Baja</v-tab>
        </v-tabs>
    </v-container>

    <v-window v-model="tab" style="min-height:  100%; padding: 0% 5%;">
        <!--item Activos-->
        <v-window-item value="tab-Activos" style="min-height:  100%; margin-top: 2%; margin-bottom: 5%; border: 0;">
            <v-container style="z-index: 0; width: 100%;  border-width:1px; background-color: white;">
                <div style="z-index: 0; width: 100%;  border-width:1px; background-color: white;text-align: end;margin-bottom: 16px; display: flex; justify-content: space-between; ">
                    <v-btn small style="vertical-align: bottom;" prepend-icon="mdi-plus-circle-outline" color="blue"
                        bg-color="white" @click="abrirDialogRPatronalAdmin()">Agregar Servicio Administrativos</v-btn>
                    
                    <v-btn small style="vertical-align: bottom;" prepend-icon="mdi-plus-circle-outline" color="blue"
                        bg-color="white" @click="nuevoRegistroPatronal()"
                        :disabled="this.nNuevoRPatronal_dis">Agregar</v-btn>
                </div>

                <tablaRegistroPatronal ref="tablaRegistroPatronal"></tablaRegistroPatronal>
            </v-container>
        </v-window-item>

        <!--item bajas-->
        <v-window-item value="tab-Bajas" style="min-height:  100%; margin-top: 2%; margin-bottom: 5%; border: 0;">
            <v-container style="z-index: 0; width: 100%;  border-width:1px; background-color: white;">
                <tablaRegistroPatronalBaja ref="tablaRegistroPatronalBaja"></tablaRegistroPatronalBaja>
            </v-container>
        </v-window-item>

    </v-window>



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
                        <v-btn icon dark @click="limpiarContenidoFormAgregar()" style="margin-right: 8px;">
                            <v-icon>mdi-close</v-icon></v-btn>
                    </div>
                </div>

            </v-toolbar>

            <v-container style="margin-top: 80px;">
                <v-form ref="formAltaRegistroPatronal" v-model="valid" lazy-validation autocomplete="on">
                    <v-row class="filasRegistro">
                        <!--numero de registro patronal-->
                        <v-col cols="12" md="6">
                            <v-text-field v-model="nRegistroPatronal" label="#Registro Patronal" density="compact"
                                variant="outlined" required :rules="nameRules"></v-text-field>
                        </v-col>

                        <!-- Fecha alta -->
                        <v-col cols="12" md="6">
                            <v-text-field v-model="dfechaAlta" type="date" min="dFechaAlta" label="Fecha Alta"
                                variant="outlined" required density="compact" :rules="nameRules"></v-text-field>
                        </v-col>

                        <!-- Estado -->
                        <v-col cols="12" md="6">
                            <v-autocomplete v-model="selectEstado" label="Estado" :items="estados" variant="outlined"
                                required :rules="nameRules" density="compact"></v-autocomplete>
                        </v-col>

                        <!-- Zona o ciudad -->
                        <v-col cols="12" md="6">
                            <v-text-field v-model="sZonaCiudad" label="Zona ó Ciudad" variant="outlined" required
                                density="compact" :rules="nameRules"></v-text-field>
                        </v-col>

                        <!-- nSalarioMinimoZRP -->
                        <v-col cols="12" md="6">
                            <v-text-field v-model="nSalarioMinimoZPR" type="number" step=0.01 min="0" max="1000"
                                label="Salario Minimo ZRP" density="compact" variant="outlined" required
                                :rules="nameRules"></v-text-field>
                        </v-col>

                        <!-- Prima de riesgo -->
                        <v-col cols="12" md="6">
                            <v-text-field v-model="nPrimaRiesgo" type="number" step=0.01 min="0" label="Prima de Riesgo"
                                variant="outlined" required density="compact" :rules="nameRules"></v-text-field>
                        </v-col>
                    </v-row>
                    <v-divider style="margin-bottom: 20px;"></v-divider>
                    <v-row>
                        <v-col cols="12" md="6">
                            <v-btn color="red" @click="limpiarContenidoFormAgregar()">Cancelar</v-btn>
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




    <!--Modal servicio a registro patronal administrativo-->
    <v-dialog style="width: 60%; min-height: auto;" v-model="dialogAsignarRPatronalAdmin" persistent="true"
        transition="dialog-top-transition">
        <v-card>
            <v-toolbar color="primary" dark style="position: fixed;z-index: 100; width: 100%;">

                <div class="toolbar-titulo">
                    <div class="texto">
                        <h2 style="margin-left: 20px">Asignar Registro Patronal a Servicio Administrativo </h2>
                    </div>
                    <div class="icon_close">
                        <v-btn icon dark @click="this.dialogAsignarRPatronalAdmin = false" style="margin-right: 8px;">
                            <v-icon>mdi-close</v-icon></v-btn>
                    </div>
                </div>

            </v-toolbar>

            <v-container style="margin-top: 80px;">
                <v-row style="margin-left: 1%;">
                    <v-col cols="12" md="12">
                        <v-autocomplete v-model="selectRegistroPatronal" label="Selección de Registro Patronal"
                            multiple="true" :items="itemRegistroPatronal" item-title="nRegistroPatronal" item-value="nID"
                            variant="outlined" required :rules="nameRules" density="compact"></v-autocomplete>

                    </v-col>
                </v-row>
            </v-container>

            <v-divider style="margin-bottom: 20px;"></v-divider>
            <v-card-actions>
                <v-row>
                    <v-col cols="3">
                        <v-btn @click="this.dialogAsignarRPatronalAdmin = false" small
                            style="vertical-align: bottom; background: red;" color="white">Cancelar
                        </v-btn>
                    </v-col>

                    <v-col cols="6">
                    </v-col>
                    <v-col cols="3">
                        <v-btn small @click="asignarRPatronalAServicioAdmin()" style="vertical-align: bottom; background: #1867c0;" color="white">Asignar servicios
                        </v-btn>
                    </v-col>
                </v-row>
            </v-card-actions>

        </v-card>
    </v-dialog>
    <!--FIN Modal servicio a registro patronal administrativo-->
</template>

<script>
import { defineComponent, ref } from "vue";
import tablaRegistroPatronal from '@/components/Contabilidad/tablaRegistroPatronal.vue';
import tablaRegistroPatronalBaja from '@/components/Contabilidad/tablaRegistroPatronalBaja.vue';

import axios from 'axios';

export default defineComponent({
    components: {
        tablaRegistroPatronal: tablaRegistroPatronal,
        tablaRegistroPatronalBaja: tablaRegistroPatronalBaja,
        EasyDataTable: window['vue3-easy-data-table'],
    },
    created() {
        this.getPermisoArea();
        this.getRegistrosPatronalAdmin();
    },
    data() {
        return {
            //pruebas:'http://localhost:7005/',
            //produccion:'http://api-app.duxon.com.mx/',
            //entorno: 'http://api-app.duxon.com.mx/',
            entorno: 'http://localhost:7005/',
            tablaRegistroPatronal: "",
            tablaRegistroPatronalBaja: "",

            //rules
            nameRules: [
                v => !!v || 'Campo requerido'

            ],

            dialogAgregarRegistroPatronal: false,
            nRegistroPatronal: null,
            dfechaAlta: '',
            nEstado: null,
            sZonaCiudad: null,
            nSalarioMinimoZPR: 0.0,
            nPrimaRiesgo: null,
            nElementos: 0,
            tab: "tab-Activos",
            selectEstado: "",
            estados: ["Extranjero", "Aguascalientes", "Baja California", "Baja California Sur", "Campeche", "Chiapas", "Chihuahua", "Ciudad de México", "Coahuila de Zaragoza", "Colima", "Durango", "Estado de México", "Guanajuato", "Guerrero", "Hidalgo", "Jalisco", "Michoacán de Ocampo", "Morelos", "Nayarit", "Nuevo León", "Oaxaca", "Puebla", "Querétaro", "Quintana Roo", "San Luis Potosí", "Sinaloa", "Sonora", "Tabasco", "Tamaulipas", "Tlaxcala", "Veracruz de Ignacio de la Llave", "Yucatán", "Zacatecas"],
            valid: true,
            dialogAsignarRPatronalAdmin: false,
            selectRegistroPatronal: {},
            itemRegistroPatronal: "",
            sRPatronalAdmin:"",

            //permisos
            nNuevoRPatronal_dis: "",


        }
    },
    watch: {
        obtenerPatronalBajas() {
            this.$refs.tablaRegistroPatronalBaja.getRegistrosPatronalBaja();
        },
        obtenerPatronalActivos() {
            const self = this;
            self.$refs.tablaRegistroPatronal.getRegistrosPatronal();
        },
    },
    methods: {
        /** nuevoRegistroPatronal
         *  Metodo que abre el dialog para crear un nuevo registro patronal
         * @author DPA
         */
        nuevoRegistroPatronal() {
            let self = this;
            self.dialogAgregarRegistroPatronal = true;
        },
        /**agregarRegistroPatronal
         * Metodo asincrono para agregar un nuevo registro patronal
         * @author DPA
         */
        async agregarRegistroPatronal() {
            let self = this;
            const { valid } = await this.$refs.formAltaRegistroPatronal.validate()
            if (valid) {
                axios.post(self.entorno + 'contabilidad/altaRegistroPatronal', {
                    nRegistroPatronal: self.nRegistroPatronal,
                    dFechaAlta: self.dfechaAlta,
                    sEstado: self.selectEstado,
                    sZonaCiudad: self.sZonaCiudad,
                    nSalarioMinimoZPR: self.nSalarioMinimoZPR,
                    nPrimaRiesgo: self.nPrimaRiesgo
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
                    } else if (response.data.sqlState == "23000") {
                        self.$notify({
                            title: "Error",
                            text: "Numero de Registro Patronal Duplicado.",
                            type: 'warn'
                        });
                    } else {
                        self.$notify({
                            title: "Error de registro",
                            text: "Ocurrio un error al registrar el Registro patronal.",
                            type: 'warn'
                        });
                    }
                })

            } else {
                this.$notify({
                    title: "Error de registro",
                    text: "Campos obligatorios.",
                    type: 'warn'
                });
            }

        },
        /** obtenerPatronalBajas
         * Metodo para obtener el listado de los registros patronales que estan dados de baja
         * @author DPA
         */
        async obtenerPatronalBajas() {
            await this.$refs.tablaRegistroPatronalBaja.getRegistrosPatronalBaja();
        },

        /** obtenerPatronalActivos
         * Metodo para obtener el listado de los registros patronales que estan Activos
         * @author DPA
         */
        obtenerPatronalActivos() {
            this.$refs.tablaRegistroPatronal.getRegistrosPatronal();
        },

        /** limpiarContenidoFormAgregar
         * Metodo que limpia el formulario del dialog de agregar nuevo registro patronal y ademas cierra el dialog.
         * @author DPA
         */
        limpiarContenidoFormAgregar() {
            this.$refs.formAltaRegistroPatronal.reset();
            this.dialogAgregarRegistroPatronal = false;


        },

        async getPermisoArea() {
            let self = this;

            await axios.post(this.entorno + 'configuracion/permisoUsuarioRPatronal', {
                idEmpleado: localStorage.getItem("id")
            }).then(function (response) {

                if (response.data[0].nNuevoRPatronal == 1) {
                    self.nNuevoRPatronal_dis = false
                } else {
                    self.nNuevoRPatronal_dis = true
                }

            });
        },


        async abrirDialogRPatronalAdmin() {
            
            await this.getRPatronalesAServicioAdmin();

            this.dialogAsignarRPatronalAdmin = true;
        },

        /** getRegistrosPatronal
         * @description Metodo que trae desde el backend todos los registros patronales que estan Activos
         * @returns {json}  registros patronales Activos
         * @author DPA
         */
        getRegistrosPatronalAdmin() {
            let self = this;
            axios.post(self.entorno + 'contabilidad/getRegistroPatronal')
                .then(function (response) {
                    self.itemRegistroPatronal = response.data;
                })
        },

        /** splitIntoArray
         * @description Metodo que  toma un número como argumento y lo convierte en una matriz de números separando las cifras del número original por comas..
         * @param {json} num 
         * @returns {Array} Array numerico
         * @author DPA
         */
        splitIntoArray(num) {
            return String(num).split(',').map(Number);
        },

        async getRPatronalesAServicioAdmin() {
            let self = this;
            var rPatronales = '';
            await axios.post(self.entorno + 'contabilidad/getRPatronalesAServicioAdmin')
                .then(function (response) {
                    rPatronales = response.data[0].idRPatronalAsignado;
                    if(response.data.length > 0){
                        self.selectRegistroPatronal = self.splitIntoArray(rPatronales); //servicios.split(',')
                        self.rPatronales = self.splitIntoArray(rPatronales);
                    }else{
                        self.sRPatronalAdmin = "";
                        self.selectRegistroPatronal = "";
                    }
                    
                });
                return rPatronales;
        },

        /** asignarRPatronalAServicioAdmin
         * @description Metodo que asigna los servicios seleccionados al registro patronal seleccionado
         * @returns 
         * @author DPA
         */
         asignarRPatronalAServicioAdmin() {
            let self = this;

            axios.post(this.entorno + 'contabilidad/asignarRPatronalAServicioAdmin', {
                serviciosAsignados: self.selectRegistroPatronal.toString()
            }).then(function (response) {
                if (response.data.affectedRows > 0) {

                    self.$notify({
                        title: "OK",
                        text: "Los servicios han sido asignados con exito",
                        type: 'success'
                    });
                    self.obtenerPatronalActivos();
                    self.dialogAsignarRPatronalAdmin = false;
                } else {
                    self.$notify({
                        title: "Error",
                        text: "Ocurrio un error al asignar los servicios.",
                        type: 'warn'
                    });
                }
            })

        },



    },
})
</script>

<style>
.toolbar-titulo {
    width: 100%;
    display: flex;
    justify-content: space-between;
}
</style>

