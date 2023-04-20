<template>
    <v-text-field variant="outlined" label="Buscar" density="compact" type="text" v-model="valorCampo"
        style="width: 100%;"></v-text-field>
    <notifications style="z-index:1001110 ;" />

    <EasyDataTable :headers="headersBaja" :items="itemsRegistrosPatronalBaja" buttons-pagination
        table-class-name="customize-table" :search-value="valorCampo" :loading="isLoading" empty-message = "No se encontraron registros patronales">

        <template #item-Opciones="{ nRegistroPatronal }">
            <v-menu>
                <template v-slot:activator="{ props }">
                    <v-btn icon="mdi-dots-vertical" v-bind="props"></v-btn>
                </template>

                <v-list>
                    <v-list-item @click="abrirModalVerRegistroPatronal(nRegistroPatronal)">
                        <v-list-item-title>Ver</v-list-item-title>
                    </v-list-item>

                    <v-list-item @click="abrirModalActivarPatronal(nRegistroPatronal)">
                        <v-list-item-title>Activar Registro</v-list-item-title>
                    </v-list-item>

                </v-list>
            </v-menu>
        </template>

    </EasyDataTable>


    <!-- Modal alert activar registro patronal-->
    <v-dialog style="width: 50%; min-height: auto;" v-model="dialogAlertActivo">
        <v-card>
            <v-card-text style="text-align: center;">
                <h3 style="font-size: 1.2em;"> ¿Esta seguro que desea Activar el Registro Patronal?</h3>
            </v-card-text>
            <v-row style="padding: 2%;">
                <v-col cols="6" md="6">
                    <v-btn depressed color="error" @click="(this.dialogAlertActivo = false)">Cancelar</v-btn>
                </v-col>
                <v-col cols="6" md="6" style="text-align:right">
                    <v-btn depressed color="primary" @click="activarRegistroPatronal()">Aceptar</v-btn>
                </v-col>
            </v-row>

        </v-card>
    </v-dialog>
    <!-- FIN Modal alert activar registro patronal-->

    <!--Modal VER registro patronal baja-->
    <v-dialog style="width: 80%; min-height: auto;" v-model="dialogVerRegistroPatronal" persistent="true"
        transition="dialog-top-transition">
        <v-card>
            <v-toolbar color="primary" dark style="position: fixed;z-index: 100; width: 100%;">

                <div class="toolbar-titulo">
                    <div class="texto">
                        <h2 style="margin-left: 20px">Ver Registro Patronal </h2>
                    </div>
                    <div class="icon_close">
                        <v-btn icon dark @click="dialogVerRegistroPatronal = false" style="margin-right: 8px;">
                            <v-icon>mdi-close</v-icon></v-btn>
                    </div>
                </div>

            </v-toolbar>

            <v-container style="margin-top: 80px;">
                <v-form ref="formVerRegistroPatronal" v-model="valid" lazy-validation>
                    <v-row class="filasRegistro">
                        <v-text-field v-model="nID" label="#Registro Patronal" density="compact" variant="outlined" required
                            style="display: none;"></v-text-field>
                        <!--numero de registro patronal-->
                        <v-col cols="12" md="6">
                            <v-text-field v-model="nRegistroPatronal" label="#Registro Patronal" density="compact"
                                variant="outlined" required readonly></v-text-field>
                        </v-col>

                        <!-- Fecha alta -->
                        <v-col cols="12" md="6">
                            <v-text-field v-model="dFechaBaja" label="Fecha Baja" variant="outlined" required
                                density="compact" readonly></v-text-field>
                        </v-col>

                        <!-- Estado -->
                        <v-col cols="12" md="6">
                            <v-text-field v-model="selectEstado" label="Estado" variant="outlined" required
                                :rules="nameRules" density="compact" readonly></v-text-field>
                        </v-col>

                        <!-- Zona o ciudad -->
                        <v-col cols="12" md="6">
                            <v-text-field v-model="sZonaCiudad" label="Zona ó Ciudad" variant="outlined" required
                                density="compact" readonly></v-text-field>
                        </v-col>

                        <!-- nSalarioMinimoZRP -->
                        <v-col cols="12" md="6">
                            <v-text-field v-model="nSalarioMinimoZRP" type="number" step=0.01 min="0" max="1000"
                                label="Salario Minimo ZRP" density="compact" variant="outlined" required
                                readonly></v-text-field>
                        </v-col>

                        <!-- Prima de riesgo -->
                        <v-col cols="12" md="6">
                            <v-text-field v-model="PrimaDeRiesgo" type="number" step=0.01 min="0" label="Prima de Riesgo"
                                variant="outlined" required density="compact" readonly></v-text-field>
                        </v-col>

                        <!-- Numero de lementos -->
                        <v-col cols="12" md="6">
                            <v-text-field v-model="nElementos" type="number" min="0" max="1000" label="#Elementos"
                                variant="outlined" required density="compact" readonly></v-text-field>
                        </v-col>

                        <!-- Motivo Baja -->
                        <v-col cols="12" md="12">
                            <v-textarea v-model="sMotivoBaja" label="Motivo de Baja" maxlength="130" variant="outlined" readonly></v-textarea>
                        </v-col>
                    </v-row>
                </v-form>

                <!--Tabla servicios-->
                <v-divider style="margin-bottom: 20px;"></v-divider>
                <h3 style="margin-bottom: 16px;">Servicios Asignados</h3>
                <div style="width: 100%; display: flex; justify-content: center;">
                    <EasyDataTable ref="tablaServicios" :headers="headersServicios" :items="itemsServicios" buttons-pagination
                        table-class-name="customize-table" :search-value="valorCampo" empty-message="No tiene servicios asignados" style="width: 90%;">

                    </EasyDataTable>
                </div>

            </v-container>
        </v-card>
    </v-dialog>
    <!--FIN Modal Ver registro patronal baja-->


</template>

<script>
import axios from 'axios'

export default ({
    components: {
        EasyDataTable: window['vue3-easy-data-table'],
    },
    created() {
        this.getRegistrosPatronalBaja();

    },
    data() {
        return {
            //pruebas:'http://localhost:7005/',
            //produccion:'http://api-app.duxon.com.mx/',
            //entorno: 'http://api-app.duxon.com.mx/',
            entorno: 'http://localhost:7005/',

            //Tabla registro patronal
            sEstadoBaja: "",
            headersBaja: [
                { text: "ID", value: "nID", sortable: true },
                { text: "#Registro Patronal", value: "nRegistroPatronal", sortable: true },
                { text: "Fecha de Baja", value: "dFechaBaja", sortable: true },
                { text: "Estado", value: "sEstadoBaja" },
                { text: "Zona ó Ciudad", value: "sZonaCiudad" },
                { text: "Salario Minimo Z.R.P", value: "nSalarioMinimoZRP" },
                { text: "Prima de Riesgo", value: "PrimaDeRiesgo" },
                { text: "# Elementos", value: "nElementos" },
                { text: "Motivo Baja", value: "sMotivoBaja", width: 20, sortable: true, },
                { text: "Opciones", value: "Opciones" },
            ],
            headersServicios: [
                { text: "IDServicio ", value: "idServicio", width: 20, sortable: true },
                { text: "Nombre", value: "nombre", sortable: true },
                { text: "Zona", value: "contrato", sortable: true },
                { text: "Estado", value: "EstadoServicio", sortable: true },
            ],
            searchField: ["nID", "nRegistroPatronal", "dFechaBaja", "sEstadoBaja", "sZonaCiudad", "nSalarioMinimoZRP", "PrimaDeRiesgo", "nElementos", "sMotivoBaja"],
            valorCampo: '',
            itemsRegistrosPatronalBaja: [],
            idActual: '',
            dialogAlertActivo: false,
            itemsServicios: [],
            dialogVerRegistroPatronal: false,
            sMotivoBaja: "",
            isLoading: true,


        }
    },
    methods: {
        /** getRegistrosPatronalBaja
         *  Metodo que trae desde el backend todos los registros patronales que estan dados de bajo
         * @returns json  registros patronales dados de baja
         * @author DPA
         */
        getRegistrosPatronalBaja() {
            let self = this;
            this.isLoading = true;
            axios.post(self.entorno + 'contabilidad/getRegistroPatronalBaja')
                .then(function (response) {
                    self.itemsRegistrosPatronalBaja = response.data;
                    setTimeout(() => {
                        self.isLoading = false;
                    }, 2000);
                });
        },

        /** abrirModalActivarPatronal
         * @description Metodo que abre el dialog para activar una registro patronal, y recibe como parametro el #Registro Patronal
         * @param {string} p_RegistroPatronal 
         * @returns null
         * @author DPA
         */
        abrirModalActivarPatronal(p_RegistroPatronal) {
            this.nRegistroPatronal = p_RegistroPatronal;
            this.dialogAlertActivo = true;
        },

        /**activarRegistroPatronal
         * @description Metodo que activa el registro patronal con el #registro patronal que se guardo en la variable nRegistroPatronal.
         * @author DPA
         */
        async activarRegistroPatronal() {
            let self = this;

            await axios.post(self.entorno + 'contabilidad/activarRegistroPatronal', {
                nRegistroPatronal: self.nRegistroPatronal
            }).then(function (response) {
                var res = response.data.affectedRows;
                if (res == '1') {
                    self.$notify({
                        title: "OK",
                        text: "El Registro Patronal fue Activado con exito.",
                        type: 'success'
                    });
                    self.getRegistrosPatronalBaja();
                    self.dialogAlertActivo = false
                } else {
                    this.$notify({
                        title: "Error",
                        text: "Ocurrio un error al Activar el Registro Patronal.",
                        type: 'warn'
                    });
                }
            })
        },

        /**abrirModalVerRegistroPatronal
         * @description Metodo que manda a llamar la funcion que obtiene la informacion del registro patronal seleccionado y los servicios que tiene asignados
         * @param {string} p_RegistroPatronal 
         * @author DPA
         */
        async abrirModalVerRegistroPatronal(p_RegistroPatronal) {
            this.nRegistroPatronal = p_RegistroPatronal;
            this.itemsServicios = [];
            await this.obtenerInforRegistroPatronal(p_RegistroPatronal);
            //await this.getServiciosxId(p_RegistroPatronal);
            const servicios = await this.getServiciosxId(p_RegistroPatronal);
            await this.abrirModalVer(servicios);


        },

        /** abrirModalVer
         * @description Metodo que abre el dialog con la informacion del registro patronal y los servicios que tiene asignados.
         * @param {json} servicios 
         * @author DPA
         */
        async abrirModalVer(servicios) {
            await this.getServicios(servicios);

            this.dialogVerRegistroPatronal = true;
        },

        /**obtenerInforRegistroPatronal
         * @description Metodo que obtiene la informacion del registro patronal por el #registro patronal que fue pasado como parametro
         * @param {string} p_nRegistroPatronal 
         * @author DPA
         */
        async obtenerInforRegistroPatronal(p_nRegistroPatronal) {
            let self = this;

            await axios.post(self.entorno + 'contabilidad/getRegistroPatronalxIdBaja', {
                nRegistroPatronal: p_nRegistroPatronal,
            }).then(function (response) {
                console.log(response);
                self.nID = response.data[0].nID != 'null' || '' ? response.data[0].nID : '',
                    self.nRegistroPatronal = response.data[0].nRegistroPatronal != 'null' || '' ? response.data[0].nRegistroPatronal : '',
                    self.dFechaBaja = response.data[0].dFechaBaja != 'null' || '' ? response.data[0].dFechaBaja : '',
                    self.selectEstado = response.data[0].sEstado != 'null' || '' ? response.data[0].sEstado : '',
                    self.sZonaCiudad = response.data[0].sZonaCiudad != 'null' || '' ? response.data[0].sZonaCiudad : '',
                    self.nSalarioMinimoZRP = response.data[0].nSalarioMinimoZRP != 'null' || '' ? response.data[0].nSalarioMinimoZRP : '',
                    self.PrimaDeRiesgo = response.data[0].PrimaDeRiesgo != 'null' || '' ? response.data[0].PrimaDeRiesgo : '',
                    self.nElementos = response.data[0].nElementos != 'null' || '' ? response.data[0].nElementos : '',
                    self.sMotivoBaja = response.data[0].sMotivoBaja != 'null' || '' ? response.data[0].sMotivoBaja : ''

            });
        },

        /** getServicios
         * @description Metodo que obtiene los servicios que tiene asignado el registro patronal previamente seleccionado.
         * @param {json} servicios 
         * @author DPA
         */
        getServicios(servicios) {
            let self = this;
            axios.post(this.entorno + 'contabilidad/getServicios', {
                selectServicios: servicios
            }).then(function (response) {
                if (response.data.length > 0) {
                    self.itemsServicios = response.data;
                    
                } else {

                }

            });
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

        /** getServiciosxId
         * @description Metodo que obtiene los servicios por el #registro patronal 
         * @param {string} p_nRegistroPatronal 
         * @returns {json} servicios
         * @author DPA
         */
        async getServiciosxId(p_nRegistroPatronal) {
            let self = this;
            var servicios = '';
            await axios.post(this.entorno + 'contabilidad/serviciosxId', {
                nRegistroPatronal: p_nRegistroPatronal
            }).then(function (response) {
                servicios = response.data[0].ServiciosAsignados
                console.log(servicios.split(','))
                if (servicios == [] || servicios == '') {
                    self.selectServicios = null;
                } else {
                    self.selectServicios = self.splitIntoArray(servicios); //servicios.split(',')
                    servicios = self.splitIntoArray(servicios);
                }
            });

            return servicios;
        },

    },
});



</script>