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
                    <v-list-item @click="abrirModalVerRegistroPatronal(nRegistroPatronal)">
                        <v-list-item-title>Ver</v-list-item-title>
                    </v-list-item>
                    <v-list-item @click="abrirModalEditarPatronal(nRegistroPatronal)">
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

                    <v-list-item @click="abrirModalBajaPatronal(nRegistroPatronal)">
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
                        <v-text-field v-model="nID" label="#Registro Patronal" density="compact"
                                variant="outlined" required style="display: none;"></v-text-field>
                        <!--numero de registro patronal-->
                        <v-col cols="12" md="6">
                            <v-text-field v-model="nRegistroPatronal" label="#Registro Patronal" density="compact"
                                variant="outlined" required></v-text-field>
                        </v-col>

                        <!-- Fecha alta -->
                        <v-col cols="12" md="6">
                            <v-text-field v-model="dFechaAlta" label="Fecha de Alta" variant="outlined" required
                                density="compact" readonly></v-text-field>
                        </v-col>

                        <!-- Zona o ciudad -->
                        <v-col cols="12" md="6">
                            <v-text-field v-model="sZonaCiudad" label="Zona ó Ciudad" variant="outlined" required
                                density="compact"></v-text-field>
                        </v-col>

                        <!-- nSalarioMinimoZRP -->
                        <v-col cols="12" md="6">
                            <v-text-field v-model="nSalarioMinimoZRP" type="number" step=0.01 min="0" max="1000"
                                label="Salario Minimo ZRP" density="compact" variant="outlined" required></v-text-field>
                        </v-col>

                        <!-- Prima de riesgo -->
                        <v-col cols="12" md="6">
                            <v-text-field v-model="PrimaDeRiesgo" type="number" step=0.01 min="0" label="Prima de Riesgo"
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
    <v-dialog style="width: 60%; min-height: auto;" v-model="dialogVerRegistroPatronal" persistent="true"
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
                        <v-text-field v-model="nID" label="#Registro Patronal" density="compact"
                                variant="outlined" required style="display: none;"></v-text-field>
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

                        <!-- Zona o ciudad -->
                        <v-col cols="12" md="6">
                            <v-text-field v-model="sZonaCiudad" label="Zona ó Ciudad" variant="outlined" required
                                density="compact" readonly></v-text-field>
                        </v-col>

                        <!-- nSalarioMinimoZRP -->
                        <v-col cols="12" md="6">
                            <v-text-field v-model="nSalarioMinimoZRP" type="number" step=0.01 min="0" max="1000"
                                label="Salario Minimo ZRP" density="compact" variant="outlined" required readonly></v-text-field>
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
                    </v-row>
                </v-form>
            </v-container>
        </v-card>
    </v-dialog>
    <!--FIN Modal Ver registro patronal-->
</template>

<script>
import axios from 'axios'
import { isEmpty } from 'lodash';

export default ({
    components: {
        EasyDataTable: window['vue3-easy-data-table'],
    },
    created() {
        this.getRegistrosPatronal();
        this.fechaActual();
    },
    data() {
        return {
            //pruebas:'http://localhost:7005/',
            //produccion:'http://api-app.duxon.com.mx/',
            //entorno: 'http://api-app.duxon.com.mx/',
            entorno: 'http://localhost:7005/',

            nRegistroPatronal: "",
            dFechaAlta: '',
            nEstado: 0,
            sZonaCiudad: "",
            nSalarioMinimoZRP: 0,
            PrimaDeRiesgo: 0,
            nElementos: 0,
            nID: null,

            //Tabla registro patronal
            headers: [
                { text: "ID", value: "nID", sortable: true },
                { text: "#Registro Patronal", value: "nRegistroPatronal", sortable: true },
                { text: "Fecha de Alta", value: "dFechaAlta", sortable: true },
                { text: "Estado", value: "nEstado" },
                { text: "Zona ó Ciudad", value: "sZonaCiudad" },
                { text: "Salario Minimo Z.R.P", value: "nSalarioMinimoZRP" },
                { text: "Prima de Riesgo", value: "PrimaDeRiesgo" },
                { text: "# Elementos", value: "nElementos", sortable: true },
                { text: "Opciones", value: "Opciones" },
            ],
            searchField: ["idEmpleado", "dFechaAlta", "sZonaCiudad", "nSalarioMinimoZRP", "PrimaDeRiesgo", "nElementos"],
            valorCampo: '',
            itemsRegistrosPatronal: [],
            nEstadoRegistroPatronal: 0,
            idActual: '',
            dFechaBaja: '',
            dFechaActual: '',
            sMotivoBaja: '',
            dialogAlertBaja: false,
            dialogEditarRegistroPatronal: false,
            dialogVerRegistroPatronal: false,

        }
    },
    watch: {

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
        fechaActual() {
            this.dFechaActual = new Date().toISOString().slice(0, 10);
        },
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
        abrirModalBajaPatronal(p_RegistroPatronal) {
            this.nRegistroPatronal = p_RegistroPatronal;
            this.dialogAlertBaja = true;
        },
        async abrirModalEditarPatronal(p_RegistroPatronal) {
            this.nRegistroPatronal = p_RegistroPatronal;
            await this.obtenerInforRegistroPatronal(this.nRegistroPatronal);
            this.dialogEditarRegistroPatronal = true;
        },
        async editarRegistroPatronal() {
            let self = this;

            await axios.post(self.entorno + 'contabilidad/editarRegistroPatronal', {
                nID: self.nID,
                nRegistroPatronal: self.nRegistroPatronal,
                sZonaCiudad: self.sZonaCiudad,
                nSalarioMinimoZRP: self.nSalarioMinimoZRP,
                PrimaDeRiesgo: self.PrimaDeRiesgo,
                nElementos: self.nElementos,
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
                }else if(response.data.sqlState == "23000"){
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
        },
        async obtenerInforRegistroPatronal(p_nRegistroPatronal) {
            let self = this;

            await axios.post(self.entorno + 'contabilidad/getRegistroPatronalxId', {
                nRegistroPatronal: p_nRegistroPatronal,
            }).then(function (response) {
                console.log(response);
                    self.nID = response.data[0].nID != 'null' || '' ? response.data[0].nID : '',
                    self.nRegistroPatronal = response.data[0].nRegistroPatronal != 'null' || '' ? response.data[0].nRegistroPatronal : '',
                    self.dFechaAlta = response.data[0].dFechaAlta != 'null' || '' ? response.data[0].dFechaAlta : '',
                    self.nEstado = response.data[0].nEstado != 'null' || '' ? response.data[0].nEstado : '',
                    self.sZonaCiudad = response.data[0].sZonaCiudad != 'null' || '' ? response.data[0].sZonaCiudad : '',
                    self.nSalarioMinimoZRP = response.data[0].nSalarioMinimoZRP != 'null' || '' ? response.data[0].nSalarioMinimoZRP : '',
                    self.PrimaDeRiesgo = response.data[0].PrimaDeRiesgo != 'null' || '' ? response.data[0].PrimaDeRiesgo : '',
                    self.nElementos = response.data[0].nElementos != 'null' || '' ? response.data[0].nElementos : ''

            });
        },
        async abrirModalVerRegistroPatronal(p_RegistroPatronal){
            this.nRegistroPatronal = p_RegistroPatronal;
            await this.obtenerInforRegistroPatronal(p_RegistroPatronal);
            this.dialogVerRegistroPatronal = true;
            
        },


    },
});



</script>