<template>
    <v-text-field variant="outlined" label="Buscar" density="compact" type="text" v-model="valorCampo"
        style="width: 100%;"></v-text-field>
    <notifications style="z-index:1001110 ;" />

    <EasyDataTable :headers="headers" :items="itemsRegistrosPatronal" buttons-pagination table-class-name="customize-table"
        :search-value="valorCampo" :loading="isLoading" empty-message="No se encontraron registros patronales"
        rowsPerPageMessage="Registros Patronales por pagina:">

        <template #item-Opciones="{ nRegistroPatronal }">
            <v-menu>
                <template v-slot:activator="{ props }">
                    <v-btn icon="mdi-dots-vertical" v-bind="props"></v-btn>
                </template>

                <v-list>
                    <v-list-item @click="abrirModalVerRegistroPatronal(nRegistroPatronal)">
                        <v-list-item-title>Ver</v-list-item-title>
                    </v-list-item>
                    <v-list-item @click="abrirModalEditarPatronal(nRegistroPatronal)">
                        <v-list-item-title>Editar</v-list-item-title>
                    </v-list-item>
                    <v-divider></v-divider>

                    <v-list-item @click="abrirDialogTarjetaLaboral(nRegistroPatronal)">
                        <v-list-item-title>Tarjeta laboral</v-list-item-title>
                    </v-list-item>
                    <v-list-item @click="abrirModalAsignarServicio(nRegistroPatronal)">
                        <v-list-item-title>Asignar Servicios</v-list-item-title>
                    </v-list-item>
                    <v-divider></v-divider>

                    <v-list-item @click="abrirModalBajaPatronal(nRegistroPatronal)">
                        <v-list-item-title style="color: red;">Dar de baja </v-list-item-title>
                    </v-list-item>
                </v-list>
            </v-menu>
        </template>

    </EasyDataTable>


    <!-- Modal alert dar de baja registro patronal-->
    <v-dialog style="width: 50%; min-height: auto;" v-model="dialogAlertBaja">
        <v-card>
            <v-card-text style="text-align: center;">
                <h3 style="font-size: 1.2em;"> ¿Esta seguro que desea dar de baja el Registro Patronal?</h3>
            </v-card-text>
            <div style="text-align: center;width: 100%; padding: 15px;">
                <v-textarea v-model="sMotivoBaja" label="Motivo de Baja" maxlength="130" variant="outlined"></v-textarea>
            </div>
            <v-row style="padding: 2%;">
                <v-col cols="6" md="6">
                    <v-btn depressed color="error" @click="(this.dialogAlertBaja = false)">Cancelar</v-btn>
                </v-col>
                <v-col cols="6" md="6" style="text-align:right">
                    <v-btn depressed color="primary" @click="bajaRegistroPatronal(nRegistroPatronal)">Aceptar</v-btn>
                </v-col>
            </v-row>

        </v-card>
    </v-dialog>
    <!-- FIN Modal alert dar de baja registro patronal-->

    <!--Modal editar registro patronal-->
    <v-dialog style="width: 60%; min-height: auto;" v-model="dialogEditarRegistroPatronal" persistent="true"
        transition="dialog-top-transition">
        <v-card>
            <v-toolbar color="primary" dark style="position: fixed;z-index: 100; width: 100%;">

                <div class="toolbar-titulo">
                    <div class="texto">
                        <h2 style="margin-left: 20px">Editar Registro Patronal </h2>
                    </div>
                    <div class="icon_close">
                        <v-btn icon dark @click="dialogEditarRegistroPatronal = false" style="margin-right: 8px;">
                            <v-icon>mdi-close</v-icon></v-btn>
                    </div>
                </div>

            </v-toolbar>

            <v-container style="margin-top: 80px;">
                <v-form ref="formEditarRegistroPatronal" v-model="valid" lazy-validation>
                    <v-row class="filasRegistro">
                        <v-text-field v-model="nID" label="#Registro Patronal" density="compact" variant="outlined" required
                            style="display: none;"></v-text-field>
                        <!--numero de registro patronal-->
                        <v-col cols="12" md="6">
                            <v-text-field v-model="nRegistroPatronal" label="#Registro Patronal" density="compact"
                                variant="outlined" required :rules="nameRules"></v-text-field>
                        </v-col>

                        <!-- Fecha alta -->
                        <v-col cols="12" md="6">
                            <v-text-field v-model="dFechaAlta" type="date" label="Fecha Alta" :rules="nameRules"
                                variant="outlined" required density="compact"></v-text-field>
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
                            <v-text-field v-model="nSalarioMinimoZRP" type="number" step=0.01 min="0" max="1000"
                                label="Salario Minimo ZRP" density="compact" variant="outlined" required
                                :rules="nameRules"></v-text-field>
                        </v-col>

                        <!-- Prima de riesgo -->
                        <v-col cols="12" md="6">
                            <v-text-field v-model="PrimaDeRiesgo" type="number" step=0.01 min="0" label="Prima de Riesgo"
                                variant="outlined" required density="compact" :rules="nameRules"></v-text-field>
                        </v-col>

                        <!-- Numero de lementos 
                        <v-col cols="12" md="6">
                            <v-text-field v-model="nElementos" type="number" min="0" max="1000" label="#Elementos"
                                variant="outlined" required density="compact"></v-text-field>
                        </v-col>-->
                    </v-row>
                    <v-divider style="margin-bottom: 20px;"></v-divider>
                    <v-row>
                        <v-col cols="12" md="6">
                            <v-btn color="red" @click="(this.dialogEditarRegistroPatronal = false)">Cancelar</v-btn>
                        </v-col>
                        <v-col cols="12" md="6" style="text-align:right">
                            <v-btn color="primary" @click="editarRegistroPatronal()">Actualizar</v-btn>

                        </v-col>
                    </v-row>
                </v-form>
            </v-container>
        </v-card>
    </v-dialog>
    <!--FIN Modal editar registro patronal-->

    <!--Modal VER registro patronal-->
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
                            <v-text-field v-model="dFechaAlta" label="Fecha de Alta" variant="outlined" required
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

                        <!-- Numero de lementos 
                        <v-col cols="12" md="6">
                            <v-text-field v-model="nElementos" type="number" min="0" max="1000" label="#Elementos"
                                variant="outlined" required density="compact" readonly></v-text-field>
                        </v-col>-->
                    </v-row>
                </v-form>

                <!--Tabla servicios-->
                <v-divider style="margin-bottom: 20px;"></v-divider>
                <h3 style="margin-bottom: 16px;">Servicios Asignados</h3>
                <div style="width: 100%; display: flex; justify-content: center;">
                    <EasyDataTable ref="tablaServicios" :headers="headersServicios" :items="itemsServicios"
                        buttons-pagination table-class-name="customize-table" :search-value="valorCampo"
                        empty-message="No tiene servicios asignados" style="width: 90%;">
                    </EasyDataTable>
                </div>
            </v-container>
        </v-card>
    </v-dialog>
    <!--FIN Modal Ver registro patronal-->

    <!-- Modal Asignar servicio-->
    <v-dialog v-model="dialogAsignarServicios" persistent="true" style="width: 80%; min-height: auto;"
        transition="dialog-top-transition">

        <v-card>
            <v-toolbar color="primary" dark style="position: fixed;z-index: 100; width: 100%;">
                <div class="toolbar-titulo">
                    <div class="texto">
                        <h2 style="margin-left: 20px">Asignar Registros</h2>
                    </div>
                    <div class="icon_close">
                        <v-btn icon dark @click="dialogAsignarServicios = false" style="margin-right: 8px;">
                            <v-icon>mdi-close</v-icon></v-btn>
                    </div>
                </div>
            </v-toolbar>

            <!--lista de servicios -->
            <v-container style="margin-top: 80px;">
                <v-row style="margin-left: 1%;">
                    <v-col cols="12" md="12">
                        <v-autocomplete v-model="selectServicios" label="Selección de servicios" multiple="true"
                            :items="servicios" item-title="nombre" item-value="idServicio" variant="outlined" required
                            :rules="nameRules" density="compact"></v-autocomplete>

                    </v-col>
                </v-row>
            </v-container>

            <!--Botones de acciones -->
            <v-card-actions>
                <v-row>
                    <v-col cols="3">
                        <v-btn @click="dialogAsignarServicios = false" small
                            style="vertical-align: bottom; background: red;" color="white">Cancelar
                        </v-btn>
                    </v-col>

                    <v-col cols="6">
                    </v-col>
                    <v-col cols="3">
                        <v-btn @click="asignarServicio()" small style="vertical-align: bottom; background: #1867c0;"
                            color="white">Asignar servicios
                        </v-btn>
                    </v-col>
                </v-row>
            </v-card-actions>
        </v-card>
    </v-dialog>
    <!-- FIN Modal Asignar servicio-->

    <!-- Modal Tarjeta laboral-->
    <v-row justify="center">
        <v-dialog v-model="dialogAñadirTarjetaLaboral" persistent max-width="550">

            <v-card>
                <v-card-title class="text-h5">
                    Agregar URL del archivo
                </v-card-title>
                <v-card-text>
                    <!--<v-text-field v-model="urlTarjetaLaboral" label="URL" density="compact" variant="outlined"
                        :rules="inputsCargarURL">
                    </v-text-field>-->

                    <v-file-input v-model="urlTarjetaLaboral" placeholder="Subir Archivo" label="Subir Archivo"
                        density="compact" variant="outlined" prepend-icon="mdi-archive" />
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="green darken-1" text @click="dialogAñadirTarjetaLaboral = false">
                        Cancelar
                    </v-btn>
                    <v-btn color="green darken-1" text @click="añadirUrlTarjetaLaboral()">
                        Agregar URL
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-row>
    <!-- FIN Modal Tarjeta laboral-->
</template>

<script>
import axios from 'axios'
import { isEmpty } from 'lodash';
import { ref } from "vue";

export default ({
    components: {
        EasyDataTable: window['vue3-easy-data-table'],
        Header: window['vue3-easy-data-table'],
        Item: window['vue3-easy-data-table'],
    },
    created() {
        this.getRegistrosPatronal();
        this.fechaActual();
        this.getServiciosPrincipal();
    },
    data() {
        return {
            //pruebas:'http://localhost:7005/',
            //produccion:'http://api-app.duxon.com.mx/',
            //entorno: 'http://api-app.duxon.com.mx/',
            entorno: 'http://localhost:7005/',

            //rules
            nameRules: [
                v => !!v || 'Campo requerido'

            ],

            inputsCargarURL: [
                value => !!value || 'Campo requerido.',
                //value => (value || '').length <= 20 || 'Max 20 characters',
                value => {
                    const pattern = /^(ht|f)tps?:\/\/\w+([\.\-\w]+)?\.dropbox\.com.*?$/
                    return pattern.test(value) || 'URL Invalida.'
                },
            ],

            nRegistroPatronal: "",
            dFechaAlta: "",
            sEstado: "",
            sZonaCiudad: "",
            nSalarioMinimoZRP: 0,
            PrimaDeRiesgo: 0,
            nElementos: 0,
            nID: null,
            //headers servicios
            idServicio: null,
            nombre: "",
            contrato: "",
            EstadoServicio: "",

            //Tabla registro patronal
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
            headersServicios: [
                { text: "IDServicio ", value: "idServicio", width: 20, sortable: true },
                { text: "Nombre", value: "nombre", sortable: true },
                { text: "Zona", value: "contrato", sortable: true },
                { text: "Estado", value: "EstadoServicio", sortable: true },
            ],
            searchField: ["idEmpleado", "dFechaAlta", "sEstado", "sZonaCiudad", "nSalarioMinimoZRP", "PrimaDeRiesgo", "nElementos"],
            valorCampo: '',
            itemsServicios: [],
            itemsRegistrosPatronal: [],
            idActual: '',
            dFechaBaja: '',
            dFechaActual: '',
            sMotivoBaja: '',
            dialogAlertBaja: false,
            dialogEditarRegistroPatronal: false,
            dialogVerRegistroPatronal: false,
            dialogAsignarServicios: false,
            dialogAñadirTarjetaLaboral: false,
            selected: '',
            selectServicios: {},
            servicios: '',
            selectEstado: '',
            estados: ["Extranjero", "Aguascalientes", "Baja California", "Baja California Sur", "Campeche", "Chiapas", "Chihuahua", "Ciudad de México", "Coahuila de Zaragoza", "Colima", "Durango", "Estado de México", "Guanajuato", "Guerrero", "Hidalgo", "Jalisco", "Michoacán de Ocampo", "Morelos", "Nayarit", "Nuevo León", "Oaxaca", "Puebla", "Querétaro", "Quintana Roo", "San Luis Potosí", "Sinaloa", "Sonora", "Tabasco", "Tamaulipas", "Tlaxcala", "Veracruz de Ignacio de la Llave", "Yucatán", "Zacatecas"],
            valid: true,
            isLoading: true,
            urlTarjetaLaboral: "",


        }
    },
    watch: {

    },
    methods: {
        /** getRegistrosPatronal
         * @description Metodo que trae desde el backend todos los registros patronales que estan Activos
         * @returns {json}  registros patronales Activos
         * @author DPA
         */
        getRegistrosPatronal() {
            let self = this;
            self.isLoading = true;
            axios.post(self.entorno + 'contabilidad/getRegistroPatronal')
                .then(function (response) {
                    self.itemsRegistrosPatronal = response.data;
                    setTimeout(() => {
                        self.isLoading = false;
                    }, 2000);

                })
        },

        /** fechaActual
         * @description Metodo que obtiene la fecha actual y la pone en formato dd-mm-yyyy
         * @returns {date} fecha
         * @author DPA
         */
        fechaActual() {
            this.dFechaActual = new Date().toISOString().slice(0, 10);
        },

        /** bajaRegistroPatronal
         * @description Metodo que da de baja el registro patronal seleccionado
         * @param {string} nRegistroPatronal 
         * @author DPA
         */
        async bajaRegistroPatronal(nRegistroPatronal) {
            let self = this;
            self.dFechaBaja = self.dFechaActual;
            if (!isEmpty(self.dFechaBaja)) {
                await axios.post(self.entorno + 'contabilidad/bajaRegistroPatronal', {
                    nRegistroPatronal: nRegistroPatronal,
                    dFechaBaja: self.dFechaBaja,
                    sMotivoBaja: self.sMotivoBaja,
                }).then(function (response) {
                    var res = response.data.affectedRows;
                    if (res == '1') {
                        self.$notify({
                            title: "OK",
                            text: "El Registro Patronal fue dado de baja con exito.",
                            type: 'success'
                        });
                        self.getRegistrosPatronal();
                        self.sMotivoBaja = '';
                        self.dialogAlertBaja = false
                    } else {
                        this.$notify({
                            title: "Error",
                            text: "Ocurrio un error al dar de baja el Registro Patronal.",
                            type: 'warn'
                        });
                    }
                });
            } else { // fecha vacia
                this.$notify({
                    title: "Error",
                    text: "No hay fecha de baja.",
                    type: 'warn'
                });
            }

        },

        /** abrirModalBajaPatronal
         * @description Metodo que abre el dialog para dar de baja un registro patronal
         * @param {string} p_RegistroPatronal 
         * @author DPA
         */
        abrirModalBajaPatronal(p_RegistroPatronal) {
            this.sMotivoBaja = '';
            this.nRegistroPatronal = p_RegistroPatronal;
            this.dialogAlertBaja = true;
        },

        /** abrirModalEditarPatronal
         * @description Metodo que abre el dialog para editar un registro patronal y asu vez obtiene la informacion del registro patronal seleccionado.
         * @param {string} p_RegistroPatronal 
         * @author DPA
         */
        async abrirModalEditarPatronal(p_RegistroPatronal) {
            this.nRegistroPatronal = p_RegistroPatronal;
            await this.obtenerInforRegistroPatronal(this.nRegistroPatronal);
            this.dialogEditarRegistroPatronal = true;
        },

        /** editarRegistroPatronal
         * @description Metodo  que actualiza el registro patronal con los nuevos campos que de modificaron en el modal
         * @author DPA
         */
        async editarRegistroPatronal() {
            let self = this;

            const { valid } = await this.$refs.formEditarRegistroPatronal.validate();

            if (valid) {
                await axios.post(self.entorno + 'contabilidad/editarRegistroPatronal', {
                    nID: self.nID,
                    nRegistroPatronal: self.nRegistroPatronal,
                    dFechaAlta: self.dFechaAlta,
                    sZonaCiudad: self.sZonaCiudad,
                    selectEstado: self.selectEstado,
                    nSalarioMinimoZRP: self.nSalarioMinimoZRP,
                    PrimaDeRiesgo: self.PrimaDeRiesgo,
                }).then(function (response) {
                    console.log(response);
                    if (response.data.affectedRows == '1') {
                        self.$notify({
                            title: "OK",
                            text: "El Registro Patronal fue editado con exito.",
                            type: 'success'
                        });
                        self.getRegistrosPatronal();
                        self.dialogEditarRegistroPatronal = false
                    } else if (response.data.sqlState == "23000") {
                        self.$notify({
                            title: "Error",
                            text: "Numero de Registro Patronal Duplicado.",
                            type: 'warn'
                        });
                    } else {
                        self.$notify({
                            title: "Error",
                            text: "Ocurrio un error al editar el Registro Patronal.",
                            type: 'warn'
                        });
                    }
                });
            } else {
                this.$notify({
                    title: "Error de registro",
                    text: "Campos obligatorios.",
                    type: 'warn'
                });
            }

        },

        /** obtenerInforRegistroPatronal
         * @description Metodo que obtiene la informacion del registro patronal seleccionado para guardarlo en su variables
         * @param {string} p_nRegistroPatronal 
         * @author DPA
         */
        async obtenerInforRegistroPatronal(p_nRegistroPatronal) {
            let self = this;

            await axios.post(self.entorno + 'contabilidad/getRegistroPatronalxId', {
                nRegistroPatronal: p_nRegistroPatronal,
            }).then(function (response) {
                console.log(response);
                self.nID = response.data[0].nID != 'null' || '' ? response.data[0].nID : '',
                    self.nRegistroPatronal = response.data[0].nRegistroPatronal != 'null' || '' ? response.data[0].nRegistroPatronal : '',
                    self.dFechaAlta = response.data[0].dFechaAlta != 'null' || '' ? response.data[0].dFechaAlta : '',
                    self.selectEstado = response.data[0].sEstado != 'null' || '' ? response.data[0].sEstado : '',
                    self.sZonaCiudad = response.data[0].sZonaCiudad != 'null' || '' ? response.data[0].sZonaCiudad : '',
                    self.nSalarioMinimoZRP = response.data[0].nSalarioMinimoZRP != 'null' || '' ? response.data[0].nSalarioMinimoZRP : '',
                    self.PrimaDeRiesgo = response.data[0].PrimaDeRiesgo != 'null' || '' ? response.data[0].PrimaDeRiesgo : '',
                    self.nElementos = response.data[0].nElementos != 'null' || '' ? response.data[0].nElementos : ''

            });
        },

        /** abrirModalVerRegistroPatronal
         * @description Metodo que manda a llamar la funcion que carga los datos del registro patronal
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

        /**abrirModalVer
         * @description Metodo que abre el dialog para visualizar el registro patronal seleccionado
         * @param {json} servicios 
         * @author DPA
         */
        async abrirModalVer(servicios) {
            await this.getServicios(servicios);

            this.dialogVerRegistroPatronal = true;
        },

        /** abrirModalAsignarServicio
         * @description Metodo que abre el dialog para asignar servicios 
         * @param {string} p_RegistroPatronal 
         * @author DPA
         */
        abrirModalAsignarServicio(p_RegistroPatronal) {
            this.nRegistroPatronal = p_RegistroPatronal;
            this.getServiciosxId(p_RegistroPatronal)
            this.dialogAsignarServicios = true;

        },

        /** getServicios
         * @description Metodo que obtiene los  servicios que tiene asignados el registro patronal
         * @param {json} servicios 
         * @returns {json}
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

        /** asignarServicio
         * @description Metodo que asigna los servicios seleccionados al registro patronal seleccionado
         * @returns 
         * @author DPA
         */
        asignarServicio() {
            let self = this;

            axios.post(this.entorno + 'contabilidad/asignarServicios', {
                nRegistroPatronal: self.nRegistroPatronal,
                serviciosAsignados: self.selectServicios.toString()
            }).then(function (response) {
                if (response.data.affectedRows > 0) {

                    self.$notify({
                        title: "OK",
                        text: "Los servicios han sido asignados con exito",
                        type: 'success'
                    });
                    self.getRegistrosPatronal();
                    self.dialogAsignarServicios = false
                } else {
                    self.$notify({
                        title: "Error",
                        text: "Ocurrio un error al asignar los servicios.",
                        type: 'warn'
                    });
                }
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

        /** getServiciosPrincipal
         * @description Metodo que trae todos los servicios disponibles.
         * @returns {json} servicios
         * @author DPA
         */
        getServiciosPrincipal() {
            let self = this;
            axios.post(this.entorno + 'contabilidad/getServiciosPrincipal', {

            }).then(function (response) {
                self.servicios = response.data
            });

        },

        abrirDialogTarjetaLaboral(p_nRegistroPatronal) {
            this.nRegistroPatronal = p_nRegistroPatronal;
            this.dialogAñadirTarjetaLaboral = true;
        },

        añadirUrlTarjetaLaboral() {
            let self = this;

            const formData = new FormData();
            formData.append('document', this.urlTarjetaLaboral);

            axios.post(this.entorno + 'contabilidad/actualizarUrlTarjetaLAboral', {
                nRegistroPatronal: self.nRegistroPatronal,
                url: formData
            }).then(function (response) {
                var res = response.data.affectedRows;
                if (res == '1') {
                    self.$notify({
                        title: "OK",
                        text: "La URL se ha ingresado con exito.",
                        type: 'success'
                    });
                    self.getDocumentos(self.$route.params.id)
                    self.dialogAñadirArchivo = false;

                } else {
                    self.$notify({
                        title: "Error de registro",
                        text: "Ocurrio un error al ingresar el URL para el documento.",
                        type: 'warn'
                    });
                }
            })
        },

    },
});



</script>