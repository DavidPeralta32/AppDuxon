<template>
    <notifications style="z-index:1001110 ;" />
    <v-navigation-drawer style="color: white; font-size: 1em; margin: 0;padding: 0px;border: 0;" color="rgba(43,49,61)"
        v-model="drawer" app>
        <v-sheet color="white" style="width:100%; " class="pa-2">
            <!--Icono de avatar-->

            <div style="width:200px;  text-align: center; ">
                <img style="width: 80%;" src="../fondos/LogoDuxon.svg">
            </div>

        </v-sheet>
        <v-divider></v-divider>

        <!--OTRA LISTA DE ITEMS EN NAVEGACIÓN-->



        <v-list density="compact" nav style=" margin: 0;padding: 0px;">
            <v-list-item :to="{ name: 'dashboard' }" prepend-icon="mdi-home-city" title="Inicio" value="home">
            </v-list-item>




            <!--Capital Humano modulo-->
            <div>
                <v-list-group class="v-list-item__content:hover" value="capitalHumanoMenu" style="position: relative; ">
                    <template v-slot:activator="{ props }">
                        <v-list-item v-bind="props" prepend-icon="mdi-human-greeting-proximity"
                            title="Capital Humano"></v-list-item>
                    </template>
                    <v-list-item :to="{ name: 'Capital Humano' }" class="v-list-item__content" title="Empleados"
                        value="Empleados">
                    </v-list-item>


                </v-list-group>

                <!-- Almacén-->
                <v-list-group v-if="almacen_show" class="v-list-item__content:hover" value="AlmacenMenu"
                    style="position: relative; ">
                    <template v-slot:activator="{ props }">
                        <v-list-item v-bind="props" prepend-icon="mdi-human-greeting-proximity"
                            title="Almacén"></v-list-item>
                    </template>
                    <v-list-item to="" class="v-list-item__content" title="Empleados" value="">
                    </v-list-item>
                </v-list-group>

                <v-list-group v-if="Usuarios_show" class="v-list-item__content:hover" style="position: relative; ">
                    <template v-slot:activator="{ props }">
                        <v-list-item v-bind="props" prepend-icon="mdi-human-greeting-proximity"
                            title="Admon. Usuarios"></v-list-item>
                    </template>
                    <v-list-item :to="{ name: 'usuarios' }" class="v-list-item__content" title="Usuarios" value="">
                    </v-list-item>
                </v-list-group>
            </div>


            <!--FIN Capital Humano modulo-->
            <v-list-item :to="{ name: 'servicios' }" v-show="permisoUsuario" prepend-icon="mdi-home-city" title="Servicios"
                value="Servicios">
            </v-list-item>

            <v-list-item :to="{ name: 'usuarios' }" v-show="permisoUsuario" prepend-icon="mdi-home-city" title="Usuarios"
                value="Usuarios">
            </v-list-item>
        </v-list>
    </v-navigation-drawer>


    <v-app-bar style="background:#2890CD ;">
        <v-app-bar-nav-icon style="color: white;" @click="drawer = !drawer"></v-app-bar-nav-icon>
        <v-toolbar-title style="color: white;">Bienvenido</v-toolbar-title>
        <v-btn @click="limpiarCodigo()" :to="{ name: 'login' }" style="color: white;" title="Cerrar sesión">
            <v-icon left>
                mdi-exit-to-app
            </v-icon>
            Cerrar sesión
        </v-btn>
    </v-app-bar>
    <v-row>


        <v-select variant="outlined" label="Selecciona un módulo" hint="Por favor, elige el módulo correspondiente."
            persistent-hint v-model="selectModulo" style="margin-left:20rem;margin-right:6rem;margin-top:2rem; width: 10;"
            :items="modulosDisponibles">
        </v-select>
    </v-row>
    <br>
    <v-divider></v-divider>
    <br>
    <br>
    <div v-if="empleadosIF" style="margin-left:3%; margin-right: 1%; margin-bottom: 5%;">
        <h2>Módulo de Capital Humano</h2>
        <v-row>
            <v-col cols="6">
                <v-switch style="margin-left: 1%;  font-size: 3em;" aria-label="16" label="Estado del módulo"
                    v-model="switchModuloCH" color="success" hide-details true-value="1" false-value="0">

                </v-switch>
            </v-col>
            <v-col cols="5" style="text-align:right;">
                <v-btn depressed color="primary" @click="actualizarPermisosCH()">Guardar cambios</v-btn>
            </v-col>
        </v-row>
        <v-row>
            <!--Sección empleados activos-->
            <v-card style="width: 30%;   margin-left: 1%; margin-right: 1%;" :readonly="activoCH" variant="outlined"
                title="Empleados activos">
                <v-col cols="12">
                    <table>
                        <tr>
                            <th>
                                Permiso
                            </th>
                            <th>
                                Estado
                            </th>
                        </tr>
                        <tr>
                            <td>
                                Agregar nuevo empleado
                            </td>
                            <td>
                                <v-switch style="margin-left:2.5rem;" :readonly="activoCH" v-model="switchNuevoEmpleado"
                                    color="success" hide-details true-value="1" false-value="0"></v-switch>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Ver expediente del empleado
                            </td>
                            <td>
                                <v-switch style="margin-left:2.5rem;" :readonly="activoCH" v-model="switchVerExpediente"
                                    color="success" hide-details true-value="1" false-value="0"></v-switch>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Edición del empleado
                            </td>
                            <td>
                                <v-switch style="margin-left:2.5rem;" :readonly="activoCH" v-model="switchEditarEmpleado"
                                    color="success" hide-details true-value="1" false-value="0"></v-switch>
                            </td>
                        </tr>

                        <tr>
                            <td>
                                Generar hoja de vida
                            </td>
                            <td>

                                <v-switch style="margin-left:2.5rem;" :readonly="activoCH" v-model="switchVerHoja"
                                    color="success" hide-details true-value="1" false-value="0"></v-switch>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Generar gafete de empleado
                            </td>
                            <td>


                                <v-switch style="margin-left:2.5rem;" :readonly="activoCH" v-model="switchVerGafete"
                                    color="success" hide-details true-value="1" false-value="0"></v-switch>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Dar de baja empleados
                            </td>
                            <td>


                                <v-switch style="margin-left:2.5rem;" :readonly="activoCH" v-model="switchBaja"
                                    color="success" hide-details true-value="1" false-value="0"></v-switch>

                            </td>
                        </tr>
                    </table>
                </v-col>

            </v-card>

            <!--Sección empleados baja-->

            <v-card style="width: 30%;   margin-left: 1%; margin-right: 1%;" variant="outlined"
                title="Empleados dados de baja">
                <v-col cols="12">
                    <table>
                        <tr>
                            <th>
                                Permiso
                            </th>
                            <th>
                                Estado
                            </th>
                        </tr>

                        <tr>
                            <td>
                                Agregar y actualizar encuesta de salida
                            </td>
                            <td>
                                <v-switch style="margin-left:2.5rem;" :readonly="activoCH" v-model="switchEncuestaSalida"
                                    color="success" hide-details true-value="1" false-value="0"></v-switch>
                            </td>
                        </tr>

                        <tr>
                            <td>
                                Añadir y actualizar motivo de baja
                            </td>
                            <td>
                                <v-switch style="margin-left:2.5rem;" :readonly="activoCH" v-model="switchMotivoBaja"
                                    color="success" hide-details true-value="1" false-value="0"></v-switch>
                            </td>
                        </tr>


                        <tr>
                            <td>
                                Reingresar empleado dados de baja
                            </td>
                            <td>
                                <v-switch style="margin-left:2.5rem;" :readonly="activoCH" v-model="switchReingresar"
                                    color="success" hide-details true-value="1" false-value="0"></v-switch>
                            </td>
                        </tr>

                    </table>
                </v-col>
            </v-card>

            <v-card style="width: 30%;   margin-left: 1%; margin-right: 1%;" :readonly="activoCH" variant="outlined"
                title="Expediente de empleado">
                <v-col cols="12">
                    <table>
                        <tr>
                            <th>
                                Permiso
                            </th>
                            <th style="text-align: center;">
                                Estado
                            </th>
                        </tr>
                        <tr>
                            <td>
                                Ver y editar expediente
                            </td>
                            <td>
                                <v-switch style="margin-left:2.5rem;" :readonly="activoCH" v-model="switchEditarExpediente"
                                    color="success" hide-details true-value="1" false-value="0"></v-switch>
                            </td>
                        </tr>

                        <tr>
                            <td>
                                Ver y editar documentación
                            </td>
                            <td>
                                <v-switch style="margin-left:2.5rem;" :readonly="activoCH"
                                    v-model="switchEditarDocumentacion" color="success" hide-details true-value="1"
                                    false-value="0"></v-switch>
                            </td>
                        </tr>

                        <tr>
                            <td>
                                Ver y editar fotografías
                            </td>
                            <td>
                                <v-switch style="margin-left:2.5rem;" :readonly="activoCH" v-model="switchEditarFotografia"
                                    color="success" hide-details true-value="1" false-value="0"></v-switch>
                            </td>
                        </tr>


                        <tr>
                            <td>
                                Ver historial laboral
                            </td>
                            <td>
                                <v-switch style="margin-left:2.5rem;" :readonly="activoCH" v-model="switchEditarHistorial"
                                    color="success" hide-details true-value="1" false-value="0"></v-switch>
                            </td>
                        </tr>

                    </table>
                </v-col>
            </v-card>
        </v-row>






        <!-- <v-row> 
                 
                                      <v-switch style="margin-left:2.5rem;" v-model="switchEditarDocumentacion" color="success"
                                        hide-details true-value="1" false-value="0"
                                        :label="`${switchEditarDocumentacion}`"></v-switch>


                        <v-col cols="6" md="3" lg="3" sm="3" xs="3">
                            <v-card height="150"> <v-card-title>
                                    Editar fotografía

                                </v-card-title></v-card>
                        </v-col>

                  


                    </v-row> -->
    </div>

    <div v-if="servicioIF" style="margin-left:1.5rem">

        <h2>Aqui va la info de los permisos de servicio </h2>
        HOLA MUNDO
    </div>
</template>

<script>
import router from '@/main';
import axios from 'axios';
import { isNull } from 'lodash';
export default {
    data: () => ({
        permisoUsuario: false,
        modulosDisponibles: [],
        //entorno: 'http://api-app.duxon.com.mx/',
        entorno: 'http://localhost:7005/',        
        permisoModulo: [],
        servicioIF: '',
        empleadosIF: '',
        selectModulo: '',
        activoCH: true,
        switchModuloCH: '',
        //codigo switches para aisnacion de permisos
        switchNuevoEmpleado: "0",
        switchVerExpediente: "0",
        switchEditarEmpleado: "0",
        switchVerHoja: "0",
        switchVerGafete: "0",
        switchBaja: "0",
        switchEncuestaSalida: "0",
        switchMotivoBaja: "0",
        switchReingresar: "0",
        switchEditarExpediente: "0",
        switchEditarDocumentacion: "0",
        switchEditarFotografia: "0",
        switchEditarHistorial: "0",
        open: ['Users'],
        admins: [
            ['Management', 'mdi-account-multiple-outline'],
            ['Settings', 'mdi-cog-outline'],
        ],
        drawer: null,
        links: [
            ['mdi-account-group', 'Capital Humano'],
            //['mdi-send', 'Jurídico'],
            ['mdi-chart-bar', 'Contabilidad'],
            // ['mdi-alert-octagon', 'Spam'],
        ]
    }),
    watch: {

        selectModulo() {
            switch (this.selectModulo) {
                case "Capital Humano":
                    this.empleadosIF = true
                    this.servicioIF = false
                    //llamar metodo que traiga permisos
                    this.obtenerPermisosCH();
                    break;

                case "Servicios":
                    this.servicioIF = true
                    this.empleadosIF = false
                    break;
            }
        },
        switchModuloCH() {



            switch (this.switchModuloCH) {
                case '0':
                    this.activoCH = true
                    this.switchNuevoEmpleado = "0"
                    this.switchVerExpediente = "0"
                    this.switchEditarEmpleado = "0"
                    this.switchVerHoja = "0"
                    this.switchVerGafete = "0"
                    this.switchBaja = "0"

                    this.switchEncuestaSalida = "0"
                    this.switchMotivoBaja = "0"
                    this.switchReingresar = "0"

                    this.switchEditarExpediente = "0"
                    this.switchEditarDocumentacion = "0"
                    this.switchEditarFotografia = "0"
                    this.switchEditarHistorial = "0"




                    break;
                case '1':
                    this.activoCH = false
                    break;
                default:
                    break;
            }
        }
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
        obtenerPermisosCH() {
            let self = this;
            //http://127.0.0.1:7005/general/permisoUsuarioCH
            axios.post(self.entorno+'general/permisoUsuarioCH', {
                idEmpleado: self.$route.params.id
            }).then(function (response) {

                //Si no hay un registro de permisos, se crea
                if (response.data == '' || response.data == []) {
                    axios.post(self.entorno+'general/crearPermisoCH', {
                        idEmpleado: self.$route.params.id
                    }).then(function (response) {

                    })

                } else {
                    var permisos = response.data[0]
                    self.switchModuloCH = permisos.moduloCH.toString()
                    self.switchNuevoEmpleado = permisos.nuevoEmpleado.toString()
                    self.switchVerExpediente = permisos.verExpediente.toString()
                    self.switchEditarEmpleado = permisos.edicionEmpleado.toString()
                    self.switchVerHoja = permisos.generarHojaVida.toString()
                    self.switchVerGafete = permisos.generarGafete.toString()
                    self.switchBaja = permisos.darBajaEmpleado.toString()
                    self.switchEncuestaSalida = permisos.agregarEncuestaSalida.toString()
                    self.switchMotivoBaja = permisos.agregarMotivoBaja.toString()
                    self.switchReingresar = permisos.reingresarEmpleado.toString()

                    self.switchEditarExpediente = permisos.editarExpediente.toString()
                    self.switchEditarDocumentacion = permisos.editarDocumentacion.toString()
                    self.switchEditarFotografia = permisos.agregarFotografias.toString()
                    self.switchEditarHistorial = permisos.verHistorialLaboral.toString()
                }

            })
        },
        actualizarPermisosCH() {
            let self = this;
            console.log("a");
            //http://127.0.0.1:7005/general/permisoUsuarioCH
            axios.post(self.entorno+'general/actualizarPermisosUsuarioCH', {
                idEmpleado: self.$route.params.id,
                moduloCH: self.switchModuloCH,
                nuevoEmpleado: self.switchNuevoEmpleado,
                verExpediente: self.switchVerExpediente,
                edicionEmpleado: self.switchEditarEmpleado,
                generarHojaVida: self.switchVerHoja,
                generarGafete: self.switchVerGafete,
                darBajaEmpleado: self.switchBaja,
                agregarEncuestaSalida: self.switchEncuestaSalida,
                agregarMotivoBaja: self.switchMotivoBaja,
                reingresarEmpleado: self.switchReingresar,
                editarExpediente: self.switchEditarExpediente,
                editarDocumentacion: self.switchEditarDocumentacion,
                agregarFotografias: self.switchEditarFotografia,
                verHistorialLaboral: self.switchEditarHistorial
            }).then(function (response) {

                if (response.data.affectedRows > 0) {

                    self.$notify({
                        title: "OK",
                        text: "Los permisos han sido actualizados con exito.",
                        type: 'success'
                    });

                } else {
                    self.$notify({
                        title: "Error",
                        text: "Ocurrio un error al actualizar los permisos.",
                        type: 'warn'
                    });
                }

            })
        },
        guardarCambiosCH() {
            alert(this.switchModuloCH)
            // switchModuloCH: '',
            //codigo switches para aisnacion de permisos
            //switchNuevoEmpleado: "0",
            // switchVerExpediente: "0",
            // switchEditarEmpleado: "0",
            // switchVerHoja: "0",
            // switchVerGafete: "0",
            // switchBaja: "0",
            // switchEncuestaSalida: "0",
            // switchMotivoBaja: "0",
            // switchReingresar: "0",

            // switchEditarExpediente: ".",
            // switchEditarDocumentacion: "0",
            // switchEditarFotografia: "0",
            // switchEditarHistorial: "0",
        },
        actualizarPermisos() {

            if (this.tipoPermisoEdit != '') {
                //this.tipoPermisoEdit
                //   alert(this.idPermisoActual)

                let self = this
                axios.post(this.entorno + 'general/actualizarPermiso', {
                    id: self.idPermisoActual,
                    permiso: self.tipoPermisoEdit
                }).then(function (response) {
                    if (response.data.affectedRows > 0) {
                        self.$notify({
                            title: "OK",
                            text: "Los permisos han sido eliminados con exito.",
                            type: 'success'
                        });
                        // self.getPermisosUsuario()
                        self.dialogEdicionPermiso = false
                    } else {
                        self.$notify({
                            title: "Error",
                            text: "Ocurrio un error al eliminar los permisos.",
                            type: 'warn'
                        });
                    }
                })
            } else {
                this.$notify({
                    title: "Error",
                    text: "Selecciona un tipo de permiso para el módulo.",
                    type: 'warn'
                });
            }

        },
        getPermisosUsuario() {
            let self = this;
            axios.post(this.entorno + 'general/userPermisos', {
                id: self.$route.params.id
            }).then(function (response) {
                //console.log(response.data[0].urlEncuestaSalida)
                //self.urlEncuesta = response.data[0].urlEncuestaSalida
                //console.log(response.data)
                self.permisos = response.data
                console.log(self.permisos)
            })
        },
        getInfoUsuario() {
            let self = this;

            //self.$refs.formEditarEmpleados.reset()
            axios.post(self.entorno + 'empleados/getEmpleadoInfo', {
                id: self.$route.params.id
            }).then(function (response) {
                console.log(response)
                //alert(self.$route.params.id)
                var puesto = response.data[0].puesto
                var departamento = response.data[0].departamento
                if (puesto.includes('GERENTE')) {
                    //todos
                    self.modulosDisponibles = ['Capital Humano']
                } else {
                    switch (departamento) {
                        case 'CAPITAL HUMANO':

                            self.modulosDisponibles = ['Capital Humano']
                            break;

                        default:
                            break;
                    }

                }
            })
        }

    },
    created() {
        this.getInfoUsuario();
        this.validarPermisos();
    }


}

</script>


<!--<template>  //Código por default creado por el router
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </nav>
  <router-view/>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
-->