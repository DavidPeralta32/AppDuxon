<template>
    <notifications style="z-index:1001110 ;" />
    <v-container style="z-index: 0; width: 100%;  border-width:1px; background-color: white;">
        <h1>Puestos</h1>

        <!--boton agregar puestos-->
        <div
            style="z-index: 0; width: 100%;  border-width:1px; background-color: white;text-align: end;margin-bottom: 16px; ">
            <v-btn small style="vertical-align: bottom;" prepend-icon="mdi-plus-circle-outline" color="blue"
                bg-color="white" @click="abrirDialogAgregarPuesto()">Agregar</v-btn>
        </div>

        <!--Tabla y buscador de Puestos-->
        <v-text-field variant="outlined" label="Buscar" density="compact" type="text" v-model="valorCampo"
            style="width: 100%; margin-top: 16px;"></v-text-field>

        <EasyDataTable :headers="headers" :items="itemsPuestos" buttons-pagination table-class-name="customize-table"
            :search-value="valorCampo" empty-message="No se encontraron Puestos" rowsPerPageMessage="Puestos por pagina:">

            <template #item-Opciones="{ idPuestos }">
                <v-menu>
                    <template v-slot:activator="{ props }">
                        <v-btn icon="mdi-dots-vertical" v-bind="props"></v-btn>
                    </template>

                    <v-list>
                        <v-list-item @click="abrirDialogVerPuesto(idPuestos)">
                            <v-list-item-title>Ver</v-list-item-title>
                        </v-list-item>
                        <v-list-item @click="abrirDialogEditarPuesto(idPuestos)">
                            <v-list-item-title>Editar</v-list-item-title>
                        </v-list-item>
                    </v-list>
                </v-menu>
            </template>
        </EasyDataTable>

        <!-- Dialog agregar Puestos-->
        <v-dialog style="width: 70%; min-height: auto;" v-model="dialogAgregarPuesto">
            <v-card>
                <v-toolbar color="primary" dark style="position: fixed;z-index: 100; width: 100%;">
                    <div class="toolbar-titulo">
                        <div class="texto">
                            <h2 style="margin-left: 20px">Agregar Puesto </h2>
                        </div>
                        <div class="icon_close">
                            <v-btn icon dark @click="cerrarDialogAgregarPuesto()" style="margin-right: 8px;">
                                <v-icon>mdi-close</v-icon></v-btn>
                        </div>
                    </div>
                </v-toolbar>

                <!--Body dialog-->
                <v-container style="margin-top: 80px;">
                    <v-form ref="formAgregarPuesto" v-model="valid" lazy-validation>
                        <v-row class="filasRegistro">

                            <!-- Nombre puesto -->
                            <v-col cols="12" md="6">
                                <v-text-field v-model="sNombrePuesto" label="Puesto" variant="outlined" required
                                    density="compact" :rules="nameRules"></v-text-field>
                            </v-col>

                            <!-- Seleccionar Departamento -->
                            <v-col cols="12" md="6">
                                <v-autocomplete v-model="selectDepartamento" label="Selección de Departamento"
                                    :items="departamentos" item-title="sNombreDepartamento" item-value="idDepartamento"
                                    variant="outlined" required :rules="nameRules" density="compact"></v-autocomplete>
                            </v-col>

                            <!-- Descripcion puesto -->
                            <v-col cols="12" md="12">
                                <v-textarea v-model="sDescripcion" label="Descripcion" maxlength="130" variant="outlined"
                                    :rules="nameRules"></v-textarea>
                            </v-col>
                        </v-row>
                    </v-form>
                </v-container>

                <!--Botones de acciones-->
                <v-divider></v-divider>
                <v-row style="padding: 2%;">
                    <v-col cols="6" md="6">
                        <v-btn depressed color="error" @click="cerrarDialogAgregarPuesto()">Cancelar</v-btn>
                    </v-col>
                    <v-col cols="6" md="6" style="text-align:right">
                        <v-btn depressed color="primary" @click="agregarPuesto()">Agregar</v-btn>
                    </v-col>
                </v-row>

            </v-card>
        </v-dialog>
        <!-- FIN Dialog agregar puestos-->


        <!-- Dialog ver Puesto-->
        <v-dialog style="width: 65%; min-height: auto;" v-model="dialogVerPuesto">
            <v-card>
                <v-toolbar color="primary" dark style="position: fixed;z-index: 100; width: 100%;">
                    <div class="toolbar-titulo">
                        <div class="texto">
                            <h2 style="margin-left: 20px">Ver Puesto </h2>
                        </div>
                        <div class="icon_close">
                            <v-btn icon dark @click="cerrarDialogVerPuesto()" style="margin-right: 8px;">
                                <v-icon>mdi-close</v-icon></v-btn>
                        </div>
                    </div>
                </v-toolbar>

                <!--Body dialog-->
                <v-container style="margin-top: 80px;">
                    <v-form ref="formVerPuesto" v-model="valid" lazy-validation>
                        <v-row class="filasRegistro">

                            <!-- ID Puesto -->
                            <v-col cols="12" md="6">
                                <v-text-field v-model="idPuestos" label="ID" variant="outlined" required density="compact"
                                    readonly></v-text-field>
                            </v-col>

                            <!-- Nombre puesto -->
                            <v-col cols="12" md="6">
                                <v-text-field v-model="sNombrePuesto" label="Puesto" variant="outlined" required
                                    density="compact" readonly></v-text-field>
                            </v-col>

                            <!-- Departamento -->
                            <v-col cols="12" md="6">
                                <v-text-field v-model="Departamento" label="Departamento" variant="outlined"
                                    density="compact" readonly></v-text-field>
                            </v-col>

                            <!-- Descripcion Puesto -->
                            <v-col cols="12" md="12">
                                <v-textarea v-model="sDescripcion" label="Descripcion" maxlength="130" variant="outlined"
                                    readonly></v-textarea>
                            </v-col>


                        </v-row>
                    </v-form>
                </v-container>
            </v-card>
        </v-dialog>
        <!-- FIN Dialog ver puesto-->


        <!-- Dialog editar Puestos-->
        <v-dialog style="width: 65%; min-height: auto;" v-model="dialogEditarPuesto">
            <v-card>
                <v-toolbar color="primary" dark style="position: fixed;z-index: 100; width: 100%;">
                    <div class="toolbar-titulo">
                        <div class="texto">
                            <h2 style="margin-left: 20px">Editar Departamento </h2>
                        </div>
                        <div class="icon_close">
                            <v-btn icon dark @click="cerrarDialogEditarPuesto()" style="margin-right: 8px;">
                                <v-icon>mdi-close</v-icon></v-btn>
                        </div>
                    </div>
                </v-toolbar>

                <!--Body dialog-->
                <v-container style="margin-top: 80px;">
                    <v-form ref="formEditarPuestos" v-model="valid" lazy-validation>
                        <v-row class="filasRegistro">

                            <!-- ID Puestos -->
                            <v-col cols="12" md="6">
                                <v-text-field v-model="idPuestos" label="ID" variant="outlined" required density="compact"
                                    readonly></v-text-field>
                            </v-col>

                            <!-- Nombre Puestos -->
                            <v-col cols="12" md="6">
                                <v-text-field v-model="sNombrePuesto" label="Nombre" variant="outlined" required
                                    density="compact" :rules="nameRules"></v-text-field>
                            </v-col>

                            <!-- Seleccionar Departamento -->
                            <v-col cols="12" md="6">
                                <v-autocomplete v-model="selectDepartamento" label="Selección de Departamento"
                                    :items="departamentos" item-title="sNombreDepartamento" item-value="idDepartamento"
                                    variant="outlined" required :rules="nameRules" density="compact"></v-autocomplete>
                            </v-col>

                            <!-- Descripcion Puestos -->
                            <v-col cols="12" md="12">
                                <v-textarea v-model="sDescripcion" label="Descripcion" maxlength="130" variant="outlined"
                                    :rules="nameRules"></v-textarea>
                            </v-col>

                        </v-row>
                    </v-form>
                </v-container>

                <!--Botones de acciones-->
                <v-divider></v-divider>
                <v-row style="padding: 2%;">
                    <v-col cols="6" md="6">
                        <v-btn depressed color="error" @click="cerrarDialogEditarPuesto()">Cancelar</v-btn>
                    </v-col>
                    <v-col cols="6" md="6" style="text-align:right">
                        <v-btn depressed color="primary" @click="editarPuesto()">Agregar</v-btn>
                    </v-col>
                </v-row>
            </v-card>
        </v-dialog>
        <!-- FIN Dialog editar Puestos-->





    </v-container>
</template>

<script>
import axios from "axios";



export default ({
    components: {
        EasyDataTable: window['vue3-easy-data-table'],
    },
    created() {
        this.getPuestos();
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


            headers: [
                { text: "ID", value: "idPuestos", width: 20, sortable: true },
                { text: "Puesto", value: "sNombrePuesto", sortable: true },
                { text: "Descripcion", value: "sDescripcion", sortable: true },
                { text: "Departamento", value: "Departamento", sortable: true },
                { text: "Opciones", value: "Opciones", width: 10 }
            ],
            searchField: ["sNombrePuesto", "sDescripcion", "idPuestos", "Departamento"],
            itemsPuestos: [],
            valorCampo: '',

            idPuestos: "",
            sNombrePuesto: "",
            sDescripcion: "",
            Departamento: "",

            selectDepartamento: "",
            departamentos: [],

            dialogAgregarPuesto: false,
            dialogVerPuesto: false,
            dialogEditarPuesto: false,


        }
    },

    methods: {
        getPuestos() {
            const self = this;

            axios.post(self.entorno + "puestos/getPuestos", {

            }).then((response) => {
                if (response.data.length > 0) {
                    self.itemsPuestos = response.data;
                } else {

                }
            });
        },

        /** getDepartamentos
         * @description Metodo que trae todos los departamentos 
         * @returns {json} departamentos id,nombre, descripcion
         * @author DPA
         */
        getDepartamentos() {
            const self = this;
            axios.post(self.entorno + 'departamentos/getDepartamentos', {

            }).then(function (response) {
                if (response.data.length > 0) {
                    self.departamentos = response.data;
                } else {
                    self.$notify({
                        title: "Error",
                        text: "Ocurrio un error obtener los departamentos.",
                        type: 'warn'
                    });
                    self.departamentos = [];
                }
            });
        },

        async abrirDialogAgregarPuesto() {
            await this.getDepartamentos();
            this.dialogAgregarPuesto = true;
        },

        cerrarDialogAgregarPuesto() {
            this.$refs.formAgregarPuesto.reset();
            this.dialogAgregarPuesto = false;
        },

        async agregarPuesto() {
            const self = this;

            const { valid } = await this.$refs.formAgregarPuesto.validate();
            if (valid) {
                axios.post(self.entorno + "puestos/agregarPuesto", {
                    sNombrePuesto: self.sNombrePuesto,
                    sDescripcion: self.sDescripcion,
                    idDepartamento: self.selectDepartamento
                }).then((response) => {
                    if (response.data.affectedRows == "1") {
                        self.$notify({
                            title: "OK",
                            text: "El Puesto fue agregado con exito.",
                            type: 'success'
                        });
                        self.getPuestos();
                        this.cerrarDialogAgregarPuesto();
                    } else if (response.data.sqlState == '23000') {
                        self.$notify({
                            title: "Error de registro",
                            text: "Nombre del Puesto ya existe",
                            type: 'warn'
                        });
                    } else {
                        self.$notify({
                            title: "Error",
                            text: "Ocurrio un error al agregar el Puesto.",
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

        cerrarDialogVerPuesto() {
            this.$refs.formVerPuesto.reset();
            this.dialogVerPuesto = false;
        },

        async abrirDialogVerPuesto(p_nIdPuesto) {
            await this.getPuestoxId(p_nIdPuesto);
            this.dialogVerPuesto = true;
        },

        getPuestoxId(p_nIdPuesto) {
            const self = this;
            axios.post(self.entorno + "puestos/getPuestoxId", {
                nIdPuesto: p_nIdPuesto
            }).then((response) => {
                if (response.data.length > 0) {
                    self.idPuestos = response.data[0].idPuestos != 'null' || '' ? response.data[0].idPuestos : '',
                        self.sNombrePuesto = response.data[0].sNombrePuesto != 'null' || '' ? response.data[0].sNombrePuesto : '',
                        self.sDescripcion = response.data[0].sDescripcion != 'null' || '' ? response.data[0].sDescripcion : '',
                        self.Departamento = response.data[0].Departamento != 'null' || '' ? response.data[0].Departamento : ''
                        self.selectDepartamento = response.data[0].nidDepartamento != 'null' || '' ? response.data[0].nidDepartamento : ''
                } else {
                    self.$notify({
                        title: "Error",
                        text: "Ocurrio un error al obtener el puesto.",
                        type: 'warn'
                    });
                }
            })
        },

        cerrarDialogEditarPuesto() {
            this.$refs.formEditarPuestos.reset();
            this.dialogEditarPuesto = false;
        },

        async abrirDialogEditarPuesto(p_idPuesto) {
            await this.getPuestoxId(p_idPuesto);
            await this.getDepartamentos();
            
            this.dialogEditarPuesto = true;
        },


        async editarPuesto() {
            const self = this;
            const { valid } = await this.$refs.formEditarPuestos.validate();
            if (valid) {
               await axios.post(self.entorno + "puestos/editarPuesto", {
                    nIdPuesto: self.idPuestos,
                    sNombrePuesto: self.sNombrePuesto,
                    sDescripcion: self.sDescripcion,
                    idDepartamento: self.selectDepartamento
                }).then((response) => {
                    if (response.data.affectedRows == "1") {
                        self.$notify({
                            title: "OK",
                            text: "El Puesto fue actualizado con exito.",
                            type: 'success'
                        });
                        self.getPuestos();
                        this.cerrarDialogEditarPuesto();
                    } else if (response.data.sqlState == '23000') {
                        self.$notify({
                            title: "Error de registro",
                            text: "Nombre del Puesto ya existe",
                            type: 'warn'
                        });
                    } else {
                        self.$notify({
                            title: "Error",
                            text: "Ocurrio un error al actualizar el Puesto.",
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



    }

});

</script>
