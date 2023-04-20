<template>
    <notifications style="z-index:1001110 ;" />
    <v-container style="z-index: 0; width: 100%;  border-width:1px; background-color: white;">
        <h1>Departamentos</h1>

        <!--boton agregar departamento-->
        <div
            style="z-index: 0; width: 100%;  border-width:1px; background-color: white;text-align: end;margin-bottom: 16px; ">
            <v-btn small style="vertical-align: bottom;" prepend-icon="mdi-plus-circle-outline" color="blue"
                bg-color="white" @click="this.dialogAgregarDepartamento = true">Agregar</v-btn>
        </div>

        <!--Tabla y buscador de Departamentos-->
        <v-text-field variant="outlined" label="Buscar" density="compact" type="text" v-model="valorCampo"
            style="width: 100%; margin-top: 16px;"></v-text-field>

        <EasyDataTable :headers="headers" :items="itemsDepartamentos" buttons-pagination table-class-name="customize-table"
            :search-value="valorCampo" empty-message="No se encontraron departamentos" rowsPerPageMessage="Departamentos por pagina:">

            <template #item-Opciones="{ idDepartamento }">
                <v-menu>
                    <template v-slot:activator="{ props }">
                        <v-btn icon="mdi-dots-vertical" v-bind="props"></v-btn>
                    </template>

                    <v-list>
                        <v-list-item @click="abrirDialogerDepartamento(idDepartamento)">
                            <v-list-item-title>Ver</v-list-item-title>
                        </v-list-item>
                        <v-list-item @click="abrirDialogEditarDepartamento(idDepartamento)">
                            <v-list-item-title>Editar</v-list-item-title>
                        </v-list-item>
                    </v-list>
                </v-menu>
            </template>
        </EasyDataTable>

    </v-container>


    <!-- Dialog agregar Departamento-->
    <v-dialog style="width: 70%; min-height: auto;" v-model="dialogAgregarDepartamento">
        <v-card>
            <v-toolbar color="primary" dark style="position: fixed;z-index: 100; width: 100%;">
                <div class="toolbar-titulo">
                    <div class="texto">
                        <h2 style="margin-left: 20px">Agregar Departamento </h2>
                    </div>
                    <div class="icon_close">
                        <v-btn icon dark @click="cerrarDialogAgregarDepartamento()" style="margin-right: 8px;">
                            <v-icon>mdi-close</v-icon></v-btn>
                    </div>
                </div>
            </v-toolbar>

            <!--Body dialog-->
            <v-container style="margin-top: 80px;">
                <v-form ref="formAgregarDepartamento" v-model="valid" lazy-validation>
                    <v-row class="filasRegistro">

                        <!-- Nombre departamento -->
                        <v-col cols="12" md="6">
                            <v-text-field v-model="sNombreDepartamento" label="Nombre" variant="outlined" required
                                density="compact" :rules="nameRules"></v-text-field>
                        </v-col>

                        <!-- Descripcion departamento -->
                        <v-col cols="12" md="12">
                            <v-textarea v-model="sDescripcion" label="Descripcion" maxlength="130"
                                variant="outlined" :rules="nameRules"></v-textarea>
                        </v-col>
                    </v-row>
                </v-form>
            </v-container>

            <!--Botones de acciones-->
            <v-divider></v-divider>
            <v-row style="padding: 2%;">
                <v-col cols="6" md="6">
                    <v-btn depressed color="error" @click="cerrarDialogAgregarDepartamento()">Cancelar</v-btn>
                </v-col>
                <v-col cols="6" md="6" style="text-align:right">
                    <v-btn depressed color="primary" @click="agregarDepartamento()">Agregar</v-btn>
                </v-col>
            </v-row>

        </v-card>
    </v-dialog>
    <!-- FIN Dialog agregar departamento-->



    <!-- Dialog ver Departamento-->
    <v-dialog style="width: 65%; min-height: auto;" v-model="dialogVerDepartamento">
        <v-card>
            <v-toolbar color="primary" dark style="position: fixed;z-index: 100; width: 100%;">
                <div class="toolbar-titulo">
                    <div class="texto">
                        <h2 style="margin-left: 20px">Ver Departamento </h2>
                    </div>
                    <div class="icon_close">
                        <v-btn icon dark @click="cerrarDialogVerDepartamento()" style="margin-right: 8px;">
                            <v-icon>mdi-close</v-icon></v-btn>
                    </div>
                </div>
            </v-toolbar>

            <!--Body dialog-->
            <v-container style="margin-top: 80px;">
                <v-form ref="formVerDepartamento" v-model="valid" lazy-validation>
                    <v-row class="filasRegistro">

                        <!-- ID Departamento -->
                        <v-col cols="12" md="6">
                            <v-text-field v-model="idDepartamento" label="ID" variant="outlined" required
                                density="compact" readonly></v-text-field>
                        </v-col>

                        <!-- Nombre departamento -->
                        <v-col cols="12" md="6">
                            <v-text-field v-model="sNombreDepartamento" label="Nombre" variant="outlined" required
                                density="compact" readonly></v-text-field>
                        </v-col>

                        <!-- Descripcion departamento -->
                        <v-col cols="12" md="12">
                            <v-textarea v-model="sDescripcion" label="Descripcion" maxlength="130"
                                variant="outlined" readonly></v-textarea>
                        </v-col>
                    </v-row>
                </v-form>


                <!--Tabla Departamentos-->
                <v-divider style="margin-bottom: 20px;"></v-divider>
                <h3 style="margin-bottom: 16px;">Puestos asignados</h3>
                <div style="width: 100%; display: flex; justify-content: center;">
                    <EasyDataTable ref="tablaPuestos" :headers="headersPuestos" :items="itemsPuestos"
                        buttons-pagination table-class-name="customize-table" empty-message="No tiene puestos asignados" style="width: 90%;"
                         rowsPerPageMessage="Puestos por pagina:">
                    </EasyDataTable>
                </div>
            </v-container>
        </v-card>
    </v-dialog>
    <!-- FIN Dialog ver departamentos-->


    <!-- Dialog editar Departamento-->
    <v-dialog style="width: 65%; min-height: auto;" v-model="dialogEditarDepartamento">
        <v-card>
            <v-toolbar color="primary" dark style="position: fixed;z-index: 100; width: 100%;">
                <div class="toolbar-titulo">
                    <div class="texto">
                        <h2 style="margin-left: 20px">Editar Departamento </h2>
                    </div>
                    <div class="icon_close">
                        <v-btn icon dark @click="cerrarDialogEditarDepartamento()" style="margin-right: 8px;">
                            <v-icon>mdi-close</v-icon></v-btn>
                    </div>
                </div>
            </v-toolbar>

            <!--Body dialog-->
            <v-container style="margin-top: 80px;">
                <v-form ref="formEditarDepartamento" v-model="valid" lazy-validation>
                    <v-row class="filasRegistro">

                        <!-- ID Departamento -->
                        <v-col cols="12" md="6">
                            <v-text-field v-model="idDepartamento" label="ID" variant="outlined" required
                                density="compact" readonly></v-text-field>
                        </v-col>

                        <!-- Nombre departamento -->
                        <v-col cols="12" md="6">
                            <v-text-field v-model="sNombreDepartamento" label="Nombre" variant="outlined" required
                                density="compact" :rules="nameRules"></v-text-field>
                        </v-col>

                        <!-- Descripcion departamento -->
                        <v-col cols="12" md="12">
                            <v-textarea v-model="sDescripcion" label="Descripcion" maxlength="130"
                                variant="outlined" :rules="nameRules"></v-textarea>
                        </v-col>

                    </v-row>
                </v-form>
            </v-container>

            <!--Botones de acciones-->
            <v-divider></v-divider>
            <v-row style="padding: 2%;">
                <v-col cols="6" md="6">
                    <v-btn depressed color="error" @click="cerrarDialogEditarDepartamento()">Cancelar</v-btn>
                </v-col>
                <v-col cols="6" md="6" style="text-align:right">
                    <v-btn depressed color="primary" @click="editarDepartamento()">Agregar</v-btn>
                </v-col>
            </v-row>
        </v-card>
    </v-dialog>
    <!-- FIN Dialog editar departamentos-->

</template>

<script>
import axios from 'axios';
import { defineComponent, ref } from "vue";

export default ({

    components: {
        EasyDataTable: window['vue3-easy-data-table'],
    },
    created() {
        this.getDepartamentos();
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
                { text: "ID", value: "idDepartamento", width: 20, sortable: true },
                { text: "Nombre", value: "sNombreDepartamento", sortable: true },
                { text: "Descripcion", value: "sDescripcion", sortable: true },
                { text: "Opciones", value: "Opciones", width: 5 }
            ],
            searchField: ["sNombreDepartamento", "sDescripcion", "idDepartamento"],
            itemsDepartamentos: [],
            valorCampo: '',

            dialogAgregarDepartamento: false,
            dialogVerDepartamento:false,
            dialogEditarDepartamento: false,
            sNombreDepartamento: "",
            sDescripcion: "",
            idDepartamento: "",


            headersPuestos: [
                { text: "ID", value: "idPuestos", width: 20, sortable: true },
                { text: "Puesto", value: "sNombrePuesto", sortable: true },
                { text: "Descripcion", value: "sDescripcionPuesto", sortable: true }
            ],
            
            itemsPuestos: [],


        }
    },

    methods: {

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
                    self.itemsDepartamentos = response.data;
                } else {
                    self.$notify({
                        title: "Error",
                        text: "Ocurrio un error al asignar los servicios.",
                        type: 'warn'
                    });
                    self.itemsDepartamentos = [];
                }
            });
        },

        /** cerrarDialogAgregarDepartamento
         *  @description Metodo que cierra el dialog para registrar un nuevo departamento y limpia el formulario
         *  @author DPA
         */
        cerrarDialogAgregarDepartamento() {
            this.$refs.formAgregarDepartamento.reset();
            this.dialogAgregarDepartamento = false;
        },

        /** agregarDepartamento
         * @description Metodo que inserta en la base de datos un departamento (nombre,descripcion)
         * @returns {json} departamentos
         * @author DPA
         */
        async agregarDepartamento() {
            const self = this;

            const { valid } = await this.$refs.formAgregarDepartamento.validate();

            if (valid) {
                axios.post(self.entorno + 'departamentos/agregarDepartamento', {
                    sNombreDepartamento: self.sNombreDepartamento,
                    sDescripcion: self.sDescripcion
                }).then((response) => {
                    if (response.data.affectedRows == '1') {
                        self.$notify({
                            title: "OK",
                            text: "El Departamento fue agregado con exito.",
                            type: 'success'
                        });
                        self.cerrarDialogAgregarDepartamento();
                        self.getDepartamentos();
                    }else if(response.data.sqlState == '23000'){
                        self.$notify({
                            title: "Error de registro",
                            text: "Nombre del Departamento ya existe",
                            type: 'warn'
                        });
                    } else {
                        self.$notify({
                            title: "Error de registro",
                            text: "No se pudo agregar el departamento.",
                            type: 'warn'
                        });
                    }
                    self.getDepartamentos();
                    
                });
            } else {
                this.$notify({
                    title: "Error de registro",
                    text: "Campos obligatorios.",
                    type: 'warn'
                });
            }
        },

        /** cerrarDialogVerDepartamento
         * @description Metodo que cierra el dialog de ver departamento
         * @author DPA
         */
        cerrarDialogVerDepartamento(){
            this.$refs.formVerDepartamento.reset();
            this.itemsPuestos = [];
            this.dialogVerDepartamento = false;
        },

       async abrirDialogerDepartamento(p_idDepartamento){
           await this.getDepartamentoxId(p_idDepartamento);
           await this.getPuestoxDepartamento(p_idDepartamento);
           this.dialogVerDepartamento = true;
        },

        getDepartamentoxId(p_idDepartamento){
            const self = this;
            axios.post(self.entorno + "departamentos/getDepartamentosxId",{
                idDepartamento : p_idDepartamento
            }).then((response) =>{
                if(response.data.length > 0){
                    self.idDepartamento = response.data[0].idDepartamento != 'null' || '' ? response.data[0].idDepartamento : '',
                    self.sNombreDepartamento = response.data[0].sNombreDepartamento != 'null' || '' ? response.data[0].sNombreDepartamento : '',
                    self.sDescripcion = response.data[0].sDescripcion != 'null' || '' ? response.data[0].sDescripcion : ''
                }else{
                    this.$notify({
                    title: "Error de registro",
                    text: "No se pudo obtener el departamento.",
                    type: 'warn'
                });
                }
            });
        },

        async abrirDialogEditarDepartamento(p_idDepartamento){
           await this.getDepartamentoxId(p_idDepartamento)
            this.dialogEditarDepartamento = true;
        },

        cerrarDialogEditarDepartamento(){
            this.$refs.formEditarDepartamento.reset();
            this.dialogEditarDepartamento = false;
        },

        async editarDepartamento(){
            const self = this;

            const { valid } = await this.$refs.formEditarDepartamento.validate();

            if(valid){
                axios.post(self.entorno + "departamentos/editarDepartamento",{
                    idDepartamento: self.idDepartamento,
                    sNombreDepartamento: self.sNombreDepartamento,
                    sDescripcion: self.sDescripcion
                }).then((response)=>{
                    if(response.data.affectedRows == "1"){
                        self.$notify({
                            title: "OK",
                            text: "El Departamento fue editado con exito.",
                            type: 'success'
                        });
                        self.getDepartamentos();
                        self.cerrarDialogEditarDepartamento();
                    }else if(response.data.sqlState == '23000'){
                        self.$notify({
                            title: "Error de registro",
                            text: "Nombre del Departamento ya existe",
                            type: 'warn'
                        });
                    }else{
                        self.$notify({
                            title: "Error de registro",
                            text: "No se pudo actualizar correctamente el departamento",
                            type: 'warn'
                        });
                    }
                })
            }else{
                this.$notify({
                    title: "Error de registro",
                    text: "Campos obligatorios.",
                    type: 'warn'
                });
            }
        },

        getPuestoxDepartamento(p_idDepartamento) {
            const self = this;
            axios.post(self.entorno + "puestos/getPuestoxDepartamento", {
                nIdDepartamento: p_idDepartamento
            }).then((response) => {
                if (response.data.length > 0) {
                    self.itemsPuestos = response.data;
                }
            })
        },




    }

});
</script>