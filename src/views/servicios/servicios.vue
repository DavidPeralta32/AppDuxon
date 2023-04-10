<template>
    
    <!-- Navbar de opciones de navegacion -->
    <navBar></navBar>
    <!-- Fin navBar-->

    <v-row style="margin-top: 1%; width: 80%; margin-left: 10%;">
        <v-text-field variant="outlined" label="Buscar servicio" density="compact" type="text" v-model="valorCampo"
            style="width: 100%;"></v-text-field>
    </v-row>
    <v-row style="margin-right: 1%;margin-top: 1%;">
        <notifications style="z-index:1001110 ;" />
        <v-col cols="4">
        </v-col>

        <v-col cols="4">

        </v-col>

        <v-col cols="4" style="text-align: right; margin-bottom: 20px; ">
            <v-btn @click="dialogAltaServicios = true" small style="vertical-align: bottom;"
                prepend-icon="mdi-account-multiple-plus-outline" color="blue" bg-color="white">Nuevo Servicio
            </v-btn>
        </v-col>
    </v-row>
    <v-dialog style="width: 90%; min-height: auto;" v-model="dialogAltaServicios">
        <v-card>
            <v-toolbar color="primary" dark style="position: fixed;z-index: 100; width: 100%;">
                <h2 style="margin-left: 20px">Alta de servicio </h2>
            </v-toolbar>

            <v-container style="margin-top: 4%;">
                <v-form v-model="altaServicios" lazy-validation>




                    <v-divider style="margin-bottom: 30px;"></v-divider>
                    <v-row class="filasRegistro">
                        <v-col cols="12" md="3">
                            <v-text-field v-model="nombre" :rules="nameRules" label="Nombre del servicio" density="compact"
                                variant="outlined" required></v-text-field>

                        </v-col>
                        <v-col cols="12" md="3">
                            <v-select v-model="selectZona" :items="zona" label="Zona" variant="outlined" dense
                                bg-color="white" density="compact">
                            </v-select>
                        </v-col>

                        <v-col cols="12" md="3">
                            <v-text-field v-model="contrato" :rules="nameRules" label="Numero de contrato" density="compact"
                                variant="outlined" required></v-text-field>

                        </v-col>
                    </v-row>










                    <v-row>
                        <v-col cols="12" md="6">
                            <v-btn color="red" @click="(this.dialogAltaServicios = false)">Cancelar</v-btn>
                        </v-col>
                        <v-col cols="12" md="6" style="text-align:right">
                            <v-btn color="primary" @click="registrarServicios">Registrar</v-btn>
                        </v-col>
                    </v-row>
                </v-form>

            </v-container>
        </v-card>

    </v-dialog>

    <v-dialog style="width: 90%; min-height: auto;" v-model="dialogEdicionServicios">
        <v-card>
            <v-toolbar color="primary" dark style="position: fixed;z-index: 100; width: 100%;">
                <h2 style="margin-left: 20px"> Edición de servicio </h2>
            </v-toolbar>

            <v-container style="margin-top: 4%;">
                <v-form v-model="altaServicios" lazy-validation>


                    <v-divider style="margin-bottom: 30px;"></v-divider>
                    <v-row class="filasRegistro">
                        <v-col cols="12" md="3">
                            <v-text-field v-model="nombreEdicion" :rules="nameRules" label="Nombre del servicio"
                                density="compact" variant="outlined" required></v-text-field>

                        </v-col>
                        <v-col cols="12" md="3">
                            <v-select v-model="selectZonaEdicion" :items="zona" label="Zona" variant="outlined" dense
                                bg-color="white" density="compact">
                            </v-select>
                        </v-col>

                        <v-col cols="12" md="3">
                            <v-text-field v-model="contratoEdicion" :rules="nameRules" label="Numero de contrato"
                                density="compact" variant="outlined" required></v-text-field>

                        </v-col>
                    </v-row>

                    <v-row>
                        <v-col cols="12" md="6">
                            <v-btn color="red" @click="(this.dialogEdicionServicios = false)">Cancelar</v-btn>
                        </v-col>
                        <v-col cols="12" md="6" style="text-align:right">
                            <v-btn color="primary" @click="actualizarServicio">Registrar</v-btn>
                        </v-col>
                    </v-row>
                </v-form>

            </v-container>
        </v-card>

    </v-dialog>
    <div style="width: 90%; margin-left: 5%;">
        <EasyDataTable :headers="headers" :items="servicios" buttons-pagination table-class-name="customize-table"
            :search-field="camposBusqueda" :search-value="valorCampo">

            <template #item-Opciones="{ idServicio }">
                <v-menu>
                    <template v-slot:activator="{ props }">
                        <v-btn icon="mdi-dots-vertical" v-bind="props"></v-btn>
                    </template>

                    <v-list>
                        <v-list-item @click="edicionServicioDialog(idServicio)">
                            <v-list-item-title>Editar</v-list-item-title>
                        </v-list-item>

                    </v-list>
                </v-menu>
            </template>

        </EasyDataTable>
    </div>
</template>

<script>
import axios from 'axios';
import { isNull } from 'lodash';
import router from '@/main';
import navBar from '../general/navBar.vue'

export default {
    components: {
        navBar,
    },
    data() {
        return {
            entorno: 'http://localhost:7005/',
            //entorno: 'http://api-app.duxon.com.mx/',
            permisoUsuario: false,

            headers: [
                { text: "#Servicio", value: "idServicio", width: 20, sortable: true },
                { text: "Nombre", value: "nombre" },
                { text: "Zona", value: "zona" },
                { text: "Contrato", value: "contrato" },
                { text: "Opciones", value: "Opciones" },
            ],
            nombre: '',
            selectZona: '',
            contrato: '',
            servicios: [],
            dialogAltaServicios: false,
            zona: ["NOROESTE","NORTE","NORESTE", "CENTRO", "GOLFO-SUR"],

            dialogEdicionServicios: false,
            nombreEdicion: '',
            contratoEdicion: '',
            selectZonaEdicion: '',
            idServicioActual: '',
            valorCampo: '',

        }
    },
    created() {
        this.getServicios();
        this.validarPermisos()
    },
    methods: {
        limpiarCodigo() {
            localStorage.clear()
        },
        validarPermisos() {
            var tipoUsuario = localStorage.getItem("tipoUsuario");

            if (isNull(tipoUsuario)) {
                router.push("/login")
            } else {
                if (tipoUsuario == 'admin') {
                    this.permisoUsuario = true;
                }
                if (tipoUsuario == 'user') {
                    this.permisoUsuario = false;

                }
            }

        },
        getServicios() {
            let self = this;
            //self.$refs.formEditarEmpleados.reset()
            axios.post(self.entorno + 'general/allServicios', {

            }).then(function (response) {
                console.log(self.servicios)
                self.servicios = response.data

            })
        },
        registrarServicios() {
            let self = this;
            if (this.nombre != '' && this.selectZona != '' && this.contrato != '') {
                axios.post(self.entorno + 'general/altaServicio', {
                    nombre: self.nombre,
                    zona: self.selectZona,
                    contrato: self.contrato
                }).then(function (response) {
                    var res = response.data.affectedRows;
                    if (res == '1') {
                        self.$notify({
                            title: "OK",
                            text: "El servicio fue dado de alta con exito.",
                            type: 'success'
                        });
                        self.getServicios()
                        self.dialogAltaServicios = false
                    } else {
                        self.$notify({
                            title: "Error",
                            text: "Ocurrio un error al dar de alta el servicio.",
                            type: 'warn'
                        });
                    }
                })

            } else {
                this.$notify({
                    title: "Error",
                    text: "Ingresa todos los campos.",
                    type: 'warn'
                });
            }
        },
        edicionServicioDialog(idServicio) {
            this.dialogEdicionServicios = true
            let self = this;
            //self.$refs.formEditarEmpleados.reset()
            axios.post(self.entorno + 'general/servicioxId', {
                idServicio: idServicio
            }).then(function (response) {
                console.log(response)
                self.nombreEdicion = response.data[0].nombre
                self.contratoEdicion = response.data[0].contrato
                self.selectZonaEdicion = response.data[0].zona
                self.idServicioActual = response.data[0].idServicio
            })
        },
        actualizarServicio() {
            let self = this;
            if (this.nombreEdicion != '' && this.selectZonaEdicion != '' && this.contratoEdicion != '') {
                axios.post(self.entorno + 'general/actualizarServicio', {
                    nombre: self.nombreEdicion,
                    zona: self.selectZonaEdicion,
                    contrato: self.contratoEdicion,
                    idServicio: self.idServicioActual
                }).then(function (response) {
                    var res = response.data.affectedRows;
                    if (res == '1') {
                        self.$notify({
                            title: "OK",
                            text: "El servicio fue actualizado con exito.",
                            type: 'success'
                        });
                        self.getServicios()
                        self.dialogEdicionServicios = false
                    } else {
                        self.$notify({
                            title: "Error",
                            text: "Ocurrio un error al actualizar el servicio.",
                            type: 'warn'
                        });
                    }
                })

            } else {
                this.$notify({
                    title: "Error",
                    text: "Ingresa todos los campos.",
                    type: 'warn'
                });
            }
        },
        altaServicio() {
            let self = this;
            if (this.nombre != '' && this.selectZona != '' && this.contrato != '') {
                axios.post(self.entorno + 'general/altaServicio', {
                    nombre: self.nombre,
                    zona: self.selectZona,
                    contrato: self.contrato
                }).then(function (response) {
                    var res = response.data.affectedRows;
                    if (res == '1') {
                        self.$notify({
                            title: "OK",
                            text: "El servicio fue dado de alta con exito.",
                            type: 'success'
                        });
                        self.getServicios()
                        self.dialogEdicionServicios = false
                    } else {
                        self.$notify({
                            title: "Error",
                            text: "Ocurrio un error al dar de alta el servicio.",
                            type: 'warn'
                        });
                    }
                })

            } else {
                this.$notify({
                    title: "Error",
                    text: "Ingresa todos los campos.",
                    type: 'warn'
                });
            }
        }
    }
}

</script>
 