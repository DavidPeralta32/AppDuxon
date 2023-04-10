<template>

    <notifications style="z-index:1001110 ;" />
    <!-- <h2>Administración de usuarios</h2> -->

    <!-- Navbar de opciones de navegacion -->
    <navBar></navBar>
    <!-- Fin navBar-->

    <v-row style="margin-top: 1%;">
        <v-col cols="1">

        </v-col>
        <v-col cols="10">
            <v-text-field variant="outlined" label="Buscar usuario" density="compact" type="text" v-model="valorCampo"
                style="width: 100%;"></v-text-field>
        </v-col>
    </v-row>

    <v-row>

        <v-col cols="1">

        </v-col>
        <v-col cols="10">
            <EasyDataTable :headers="headers" :items="usuarios" buttons-pagination :search-field="camposBusqueda"
                :search-value="valorCampo" table-class-name="customize-table">

                <template #item-Opciones="{ idEmpleado }">


                    <v-menu>
                        <template v-slot:activator="{ props }">
                            <v-btn icon="mdi-dots-vertical" v-bind="props"></v-btn>
                        </template>

                        <v-list>
                            <v-list-item @click="mostrarModulos(idEmpleado)">
                                <v-list-item-title>Asignar módulos</v-list-item-title>
                            </v-list-item>
                            <v-divider></v-divider>
                            <v-list-item @click="serviciosDialog(idEmpleado)">
                                <v-list-item-title>Asignar servicios</v-list-item-title>
                            </v-list-item>



                        </v-list>

                    </v-menu>

                </template>


            </EasyDataTable>
        </v-col>
        <v-col cols="1">

        </v-col>
    </v-row>
    <div style="width: 80%; text-align: center;">
    </div>


    <v-dialog v-model="dialogServicios" persistent max-width="65%">

        <v-card style="height:30vh">
            <v-toolbar color="primary" dark>
                <h3 style="margin-left: 5%;">Asignar servicios</h3>
            </v-toolbar>
            <!--Se añade un cargador de fotografías -->
            <v-row style="margin-left: 1%; margin-top: auto ;">

                <v-col cols="12" md="12">
                    <v-autocomplete v-model="selectServicios" label="Selección de servicios" multiple="true"
                        :items="servicios" item-title="nombre" item-value="idServicio" variant="outlined" required
                        :rules="nameRules" density="compact"></v-autocomplete>

                </v-col>

            </v-row>


            <v-card-actions>
                <v-row>

                    <v-col cols="3">

                        <v-btn @click="dialogServicios = false" small style="vertical-align: bottom; background: red;"
                            color="white">Cancelar
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
</template>
<script>
import axios from 'axios';
import { isEmpty, isNull } from 'lodash';
import router from '@/main';
import navBar from '../general/navBar.vue'

export default ({
    components: {
        EasyDataTable: window['vue3-easy-data-table'],
        navBar,

    },
    created() {
        this.getAllUser()
        this.getServicios()
        this.validarPermisos()
    },
    data() {
        return {
            idActual: null,
            selectServicios: null,
            dialogServicios: false,
            searchField: ["id", "nombre"],
            valorCampo: '',
            entorno: 'http://localhost:7005/',
            //entorno: 'http://api-app.duxon.com.mx/',
            headers: [
                { text: "#Usuario", value: "idEmpleado", width: 20, sortable: true },
                { text: "Nombre", value: "nombre" },
                { text: "Email", value: "correoDuxon" },
                { text: "Departamento", value: "departamento", sortable: true },
                { text: "Puesto", value: "puesto", sortable: true },
                { text: "Opciones", value: "Opciones" },
            ],
            usuarios: []
        }

    },

    watch: {

    },
    methods: {
        limpiarCodigo() {
            localStorage.clear()
        },
        splitIntoArray(num) {
            return String(num).split(',').map(Number);
        },
        getServiciosxId(id) {
            let self = this;
            axios.post(this.entorno + 'general/serviciosxId', {
                idEmpleado: id
            }).then(function (response) {
                var servicios = ''
                servicios = response.data[0].serviciosAsignados
                console.log(servicios.split(','))
                if (servicios == [] || servicios == '') {
                    self.selectServicios = null
                } else {
                    self.selectServicios = self.splitIntoArray(servicios) //servicios.split(',')
                }
            })

            //servicios
        },
        asignarServicio() {
            //     alert(this.idActual)
            //    alert(this.selectServicios.toString())
            let self = this;
            axios.post(this.entorno + 'empleados/asignarServicios', {
                idEmpleado: self.idActual,
                serviciosAsignados: self.selectServicios.toString()
            }).then(function (response) {
                if (response.data.affectedRows > 0) {

                    self.$notify({
                        title: "OK",
                        text: "Los servicios han sido asignados",
                        type: 'success'
                    });
                    self.dialogServicios = false
                } else {
                    self.$notify({
                        title: "Error",
                        text: "Ocurrio un error al asignar los servicios.",
                        type: 'warn'
                    });
                }
            })

        },
        getServicios() {
            let self = this;
            axios.post(this.entorno + 'general/allServicios', {

            }).then(function (response) {
                //console.log(response.data[0].urlEncuestaSalida)
                //self.urlEncuesta = response.data[0].urlEncuestaSalida
                //console.log(response.data)
                self.servicios = response.data
            })

            //servicios
        },
        getAllUser() {
            let self = this;
            axios.post(this.entorno + 'general/user', {

            }).then(function (response) {
                //console.log(response.data[0].urlEncuestaSalida)
                //self.urlEncuesta = response.data[0].urlEncuestaSalida
                //console.log(response.data)
                self.usuarios = response.data
            })
        },
        mostrarServicios(id) {
            router.push({ path: "/permisosServicios/" + id })
        },
        mostrarModulos(id) {
            router.push({ path: "/permisosModulos/" + id })
        },
        serviciosDialog(id) {
            this.idActual = id
            this.dialogServicios = true
            this.getServiciosxId(id)
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