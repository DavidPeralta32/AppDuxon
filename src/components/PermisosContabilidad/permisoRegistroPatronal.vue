<template>
    <h2>Registro patronal</h2>

    <v-row style="margin-bottom: 16px;">
        <v-col cols="6">
            
        </v-col>
        <v-col cols="5" style="text-align:right;">
            <v-btn depressed color="primary" @click="actualizarPermisosRPatronal()">Guardar cambios</v-btn>
        </v-col>
    </v-row>

    <!--Seccion de permisos modulo-->
    <v-row style="width: 100%; display: flex; justify-content: space-around;">

        <!--Sección rregistros patronales activos-->
        <v-card style="width: 40%;margin-left: 1%; margin-right: 1%;" :readonly="activoCH" title="Registro patronal activos"
            variant="tonal" theme="dark">
            <v-col cols="12">
                <table style="width: 100%;">
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
                            Agregar nuevo Registro Patronal
                        </td>
                        <td>
                            <v-switch style="margin-left:2.5rem;" :readonly="activoCH" v-model="switchNuevoPatronal"
                                color="success" hide-details true-value="1" false-value="0"></v-switch>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Ver Registro Patronal
                        </td>
                        <td>
                            <v-switch style="margin-left:2.5rem;" :readonly="activoCH" v-model="switchVerPatronal"
                                color="success" hide-details true-value="1" false-value="0"></v-switch>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Edición del Registro Patronal
                        </td>
                        <td>
                            <v-switch style="margin-left:2.5rem;" :readonly="activoCH" v-model="switchEditarPatronal"
                                color="success" hide-details true-value="1" false-value="0"></v-switch>
                        </td>
                    </tr>

                    <tr>
                        <td>
                            Agregar Tarjeta Laboral
                        </td>
                        <td>

                            <v-switch style="margin-left:2.5rem;" :readonly="activoCH" v-model="switchTarjetaLaboral"
                                color="success" hide-details true-value="1" false-value="0"></v-switch>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Asignar Servicios
                        </td>
                        <td>


                            <v-switch style="margin-left:2.5rem;" :readonly="activoCH" v-model="switchAsignarServicios"
                                color="success" hide-details true-value="1" false-value="0"></v-switch>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Dar de baja Registros Patronales
                        </td>
                        <td>


                            <v-switch style="margin-left:2.5rem;" :readonly="activoCH" v-model="switchBajaPatronal"
                                color="success" hide-details true-value="1" false-value="0"></v-switch>

                        </td>
                    </tr>
                </table>
            </v-col>

        </v-card>

        <!--Sección registro patronal baja-->
        <v-card style="width: 40%; margin-left: 1%; margin-right: 1%;" title="Registros Patronales dados de baja"
            variant="tonal" theme="dark">
            <v-col cols="12">
                <table style="width: 100%;">
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
                            Ver Registro Patronal
                        </td>
                        <td>
                            <v-switch style="margin-left:2.5rem;" :readonly="activoCH" v-model="switchVerBajaPAtronal"
                                color="success" hide-details true-value="1" false-value="0"></v-switch>
                        </td>
                    </tr>

                    <tr>
                        <td>
                            Activar Registro Patronal
                        </td>
                        <td>
                            <v-switch style="margin-left:2.5rem;" :readonly="activoCH" v-model="switchActivarPatronal"
                                color="success" hide-details true-value="1" false-value="0"></v-switch>
                        </td>
                    </tr>

                </table>
            </v-col>
        </v-card>


    </v-row>
</template>

<script>
import axios from 'axios';
export default ({
    data() {
        return {


            //entorno: 'http://api-app.duxon.com.mx/',
            entorno: 'http://localhost:7005/',


            switchModuloRP: "0",
            switchBajaPatronal: "0",
            switchAsignarServicios: "0",
            switchTarjetaLaboral: "0",
            switchEditarPatronal: "0",
            switchEditarPatronal: "0",
            switchVerPatronal: "0",
            switchNuevoPatronal: "0",
            switchVerBajaPAtronal: "0",
            switchActivarPatronal: "0",



        }
    },
    methods: {
        obtenerPermisosRPatronal() {
            let self = this;
            
            axios.post(self.entorno + 'configuracion/permisoUsuarioRPatronal', {
                idEmpleado: self.$route.params.id
            }).then(function (response) {
                //Si no hay un registro de permisos, se crea
                if (response.data == '' || response.data == []) {
                    axios.post(self.entorno + 'configuracion/crearPermisoRPatronal', {
                        idEmpleado: self.$route.params.id
                    }).then(function (responseCreate) {
                        if (responseCreate.affectedRows > 0) {
                            self.obtenerPermisosCH();
                        }

                    })
                } else {
                    var permisos = response.data[0]

                    self.switchBajaPatronal = permisos.nBajaRPatronal.toString()
                    self.switchAsignarServicios = permisos.nAsignarServicios.toString()
                    self.switchTarjetaLaboral = permisos.nAgregarTarjetaLaboral.toString()
                    self.switchEditarPatronal = permisos.nEditarRPatronal.toString()
                    self.switchVerPatronal = permisos.nVerRPatronal.toString()
                    self.switchNuevoPatronal = permisos.nNuevoRPatronal.toString()
                    self.switchVerBajaPAtronal = permisos.nVerRPatronalBaja.toString()
                    self.switchActivarPatronal = permisos.nActivarRPatronal.toString()
                }

            })
        },

        async actualizarPermisosRPatronal() {
            let self = this;

            await axios.post(self.entorno + 'configuracion/actualizarPermisosUsuarioRPatronal', {
                idEmpleado: self.$route.params.id,
                //moduloCH: self.switchModuloCH,
                nBajaRPatronal: self.switchBajaPatronal,
                nAsignarServicios: self.switchAsignarServicios,
                nAgregarTarjetaLaboral: self.switchTarjetaLaboral,
                nEditarRPatronal: self.switchEditarPatronal,
                nVerRPatronal: self.switchVerPatronal,
                nNuevoRPatronal: self.switchNuevoPatronal,
                nVerRPatronalBaja: self.switchVerBajaPAtronal,
                nActivarRPatronal: self.switchActivarPatronal,
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





    },
    created() {
        this.obtenerPermisosRPatronal();
    },
});

</script>

