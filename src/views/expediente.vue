
<template>

    <div style="width: 100%; text-align: left; margin: 0ch;">
        <v-container>

            <v-row dense>
                <v-col cols="2">
                    <v-img :src="urlFotoActual" style="border: 1px dashed #ccc; width: 50%;" />

                </v-col>
                <v-col cols="3">
                    <h4>Empleado: </h4>
                    <p>{{ this.nombre + ' ' + this.apellidoPaterno + ' ' + this.apellidoMaterno }}</p>
                </v-col>
                <v-col cols="2">
                    <h4>Departamento: </h4>
                    <p>{{ this.departamento }}</p>
                </v-col>
                <v-col cols="2">
                    <h4>Zona: </h4>
                    <p>{{ this.zona }}</p>
                </v-col>
                <v-col cols="3">
                    <h4>Servicio actual: </h4>
                    <p>{{ this.nombreServicio }}</p>
                </v-col>
            </v-row>
        </v-container>
    </div>
    <v-btn prepend-icon="mdi-arrow-left-circle" variant="plain" :to="{ name: 'Empleados' }">
        <span>Regresar</span>
    </v-btn>
    <div>

        <notifications style="z-index:1001110 ;" />

        <!--ESTAS SON -->
        <v-tabs v-model="tab" bg-color="white" show-arrows slider-color="light-blue accent-4">
        <!--TABLAS CREADAS POR UN FOR<v-tab v-for="i in 2" :key="i" :value="'tab-' + i">
                 {{ i }}
                                </v-tab>-->
            <v-tab value="tab-1"> GENERALES</v-tab>
            <v-tab value="tab-2"> Expediente</v-tab>
            <v-tab value="tab-3"> Documentación</v-tab>
            <v-tab value="tab-4"> Fotografía</v-tab>
            <v-tab value="tab-5"> Historial Laboral</v-tab>
        </v-tabs>
        <!--AQUI VA EL CONTENIDO DE CADA PESTAÑA-->
        <v-window v-model="tab">
            <v-window-item value="tab-1"> <!--GENERALES-->
                <br>
                <v-card style="width: 98%;   margin-left: 1%; margin-right: 1%;" variant="outlined"
                    title="Información general del empleado">

                    <hr>
                    <v-row style="align-items: center;"> <br>

                        <h3 style="margin-left:2%;margin-top: 2%;font-size:1.5rem;font-weight:bold">Datos personales
                        </h3>
                        <v-divider style="margin-bottom: 1%;margin-left: 2%;margin-right: 2.3%;"></v-divider>

                        <v-col cols="3">
                            <v-list class="d-flex justify-left">
                                <v-list-item title="Nombre">
                                    <v-list-item-subtitle>{{ nombre }}</v-list-item-subtitle>
                                </v-list-item>
                            </v-list>
                        </v-col>

                        <v-col cols="3">
                            <v-list class="d-flex justify-left">
                                <v-list-item title="Apellido Paterno">
                                    <v-list-item-subtitle>{{ apellidoPaterno }}</v-list-item-subtitle>
                                </v-list-item>
                            </v-list>
                        </v-col>

                        <v-col cols="3">
                            <v-list class="d-flex justify-left">
                                <v-list-item title="Apellido Materno">
                                    <v-list-item-subtitle>{{ apellidoMaterno }}</v-list-item-subtitle>
                                </v-list-item>
                            </v-list>
                        </v-col>
                        <v-col cols="3">
                            <v-list class="d-flex justify-left">
                                <v-list-item title="Sexo">
                                    <v-list-item-subtitle>{{ sexo }}</v-list-item-subtitle>

                                </v-list-item>
                            </v-list>
                        </v-col>
                    </v-row>


                    <v-row>
                        <v-col cols="3">
                            <v-list class="d-flex justify-left">
                                <v-list-item title="Fecha de nacimiento">
                                    <v-list-item-subtitle>{{ fechaNacimiento }}</v-list-item-subtitle>
                                </v-list-item>
                            </v-list>
                        </v-col>

                        <v-col cols="3">
                            <v-list class="d-flex justify-left">
                                <v-list-item title="Lugar de nacimiento">
                                    <v-list-item-subtitle>{{ fechaNacimiento }}</v-list-item-subtitle>
                                </v-list-item>
                            </v-list>
                        </v-col>

                        <v-col cols="3">
                            <v-list class="d-flex justify-left">
                                <v-list-item title="Municipio de Nacimiento">
                                    <v-list-item-subtitle>{{ municipioNacimiento }}</v-list-item-subtitle>
                                </v-list-item>
                            </v-list>
                        </v-col>

                        <v-col cols="3">
                            <v-list class="d-flex justify-left">
                                <v-list-item title="Estado de nacimiento">
                                    <v-list-item-subtitle>{{ estadoNacimiento }}</v-list-item-subtitle>
                                </v-list-item>
                            </v-list>
                        </v-col>

                    </v-row>


                    <v-row style="text-align:left;">

                        <v-col cols="3">
                            <v-list lines="one">
                                <v-list-item style="align-items: center">
                                    <v-list-item-title>Pais de nacimiento</v-list-item-title>
                                    <v-list-item-subtitle>{{ paisNacimiento }}</v-list-item-subtitle>

                                </v-list-item>
                            </v-list>

                        </v-col>
                        <v-col cols="3">
                            <v-list>
                                <v-list-item title="Nacionalidad">
                                    <v-list-item-subtitle>{{ nacionalidad }}</v-list-item-subtitle>
                                </v-list-item>
                            </v-list>
                        </v-col>

                        <v-col cols="3">
                            <v-list>
                                <v-list-item title="Estado Civil">
                                    <v-list-item-subtitle>{{ estadoCivil }}</v-list-item-subtitle>
                                </v-list-item>
                            </v-list>
                        </v-col>
                        <v-col cols="3">
                            <v-list>
                                <v-list-item title="Nivel de estudios">
                                    <v-list-item-subtitle>{{ nivelEstudios }}</v-list-item-subtitle>
                                </v-list-item>
                            </v-list>
                        </v-col>
                    </v-row>
                    <h3 style="margin-left:1%;margin-top: 2%;font-size:1.5rem;font-weight:bold">Información General
                    </h3>
                    <v-divider style="margin-bottom: 1%;margin-left: 1.2%;margin-right: 2.1%;"></v-divider>

                    <v-row style="text-align:left;">

                        <v-col cols="3">
                            <v-list>
                                <v-list-item title="Número de empleado">
                                    <v-list-item-subtitle>{{ nEmpleado }}</v-list-item-subtitle>
                                </v-list-item>
                            </v-list>
                        </v-col>


                        <v-col cols="3">
                            <v-list>
                                <v-list-item title="Fecha de ingreso">
                                    <v-list-item-subtitle>{{ fechaIngreso }}</v-list-item-subtitle>

                                </v-list-item>
                            </v-list></v-col>
                        <v-col cols="3">
                            <v-list>
                                <v-list-item title="Departamento">
                                    <v-list-item-subtitle>{{ departamento }}</v-list-item-subtitle>
                                </v-list-item>
                            </v-list>
                        </v-col>
                        <v-col cols="3">
                            <v-list>
                                <v-list-item title="Tipo de empleado">
                                    <v-list-item-subtitle>{{ tipoEmpleado }}</v-list-item-subtitle>

                                </v-list-item>
                            </v-list>
                        </v-col>

                    </v-row>


                    <v-row>
                        <v-col cols="3">
                            <v-list class="d-flex justify-left">
                                <v-list-item title="Zona">
                                    <v-list-item-subtitle>{{ zona }}</v-list-item-subtitle>
                                </v-list-item>
                            </v-list>
                        </v-col>

                        <v-col cols="3">
                            <v-list class="d-flex justify-left">
                                <v-list-item title="Servicio">
                                    <v-list-item-subtitle>{{ servicio }}</v-list-item-subtitle>
                                </v-list-item>
                            </v-list>
                        </v-col>

                        <v-col cols="3">
                            <v-list class="d-flex justify-left">
                                <v-list-item title="Puesto">
                                    <v-list-item-subtitle>{{ puesto }}</v-list-item-subtitle>
                                </v-list-item>
                            </v-list>
                        </v-col>

                        <v-col cols="3">
                            <v-list class="d-flex justify-left">
                                <v-list-item title="Contrato determinado">
                                    <v-list-item-subtitle>{{ contratoDeterminado1 }}</v-list-item-subtitle>
                                </v-list-item>
                            </v-list>
                        </v-col>

                    </v-row>

                    <v-row>
                        <v-col cols="3">
                            <v-list class="d-flex justify-left">
                                <v-list-item title="Contrato determinado 2">
                                    <v-list-item-subtitle>{{ contratoDeterminado2 }}</v-list-item-subtitle>
                                </v-list-item>
                            </v-list>
                        </v-col>

                        <v-col cols="3">
                            <v-list class="d-flex justify-left">
                                <v-list-item title="Contrato indeterminado">
                                    <v-list-item-subtitle>{{ contratoIndeterminado }}</v-list-item-subtitle>
                                </v-list-item>
                            </v-list>
                        </v-col>

                        <v-col cols="3">
                            <v-list class="d-flex justify-left">
                                <v-list-item title="Años laborados">
                                    <v-list-item-subtitle>{{ aniosLaborados }}</v-list-item-subtitle>
                                </v-list-item>
                            </v-list>
                        </v-col>

                        <v-col cols="3">
                            <v-list class="d-flex justify-left">
                                <v-list-item title="Turno">
                                    <v-list-item-subtitle>{{ turno }}</v-list-item-subtitle>
                                </v-list-item>
                            </v-list>
                        </v-col>

                    </v-row>
                    <v-row>
                        <v-col cols="3">
                            <v-list class="d-flex justify-left">
                                <v-list-item title="Sueldo deseado mensual">
                                    <v-list-item-subtitle>{{ sueldoDeseado }}</v-list-item-subtitle>
                                </v-list-item>
                            </v-list>
                        </v-col>


                    </v-row>

                    <h3 style="margin-left:1%;margin-top: 2%;font-size:1.5rem;font-weight:bold">Dirección
                    </h3> <v-divider style="margin-bottom: 1%;margin-left: 1.2%;margin-right: 2.2%;"></v-divider>

                    <v-row>


                        <v-col cols="3">
                            <v-list class="d-flex justify-left">
                                <v-list-item title="Calle">
                                    <v-list-item-subtitle>{{ calle }}</v-list-item-subtitle>
                                </v-list-item>
                            </v-list>
                        </v-col>

                        <v-col cols="3">
                            <v-list class="d-flex justify-left">
                                <v-list-item title="N° Exterior">
                                    <v-list-item-subtitle>{{ nExterior }}</v-list-item-subtitle>
                                </v-list-item>
                            </v-list>
                        </v-col>

                        <v-col cols="3">
                            <v-list class="d-flex justify-left">
                                <v-list-item title="N° Interior">
                                    <v-list-item-subtitle>{{ nInterior }}</v-list-item-subtitle>
                                </v-list-item>
                            </v-list>
                        </v-col>
                        <v-col cols="3">
                            <v-list class="d-flex justify-left">
                                <v-list-item title="Fracc. O Colonia">
                                    <v-list-item-subtitle>{{ fraccColonia }}</v-list-item-subtitle>
                                </v-list-item>
                            </v-list>
                        </v-col>

                        <v-col cols="3">
                            <v-list class="d-flex justify-left">
                                <v-list-item title="Código Postal">
                                    <v-list-item-subtitle>{{ codigoPostal }}</v-list-item-subtitle>
                                </v-list-item>
                            </v-list>
                        </v-col>

                        <v-col cols="3">
                            <v-list class="d-flex justify-left">
                                <v-list-item title="Entre calle">
                                    <v-list-item-subtitle>{{ entreCalle }}</v-list-item-subtitle>
                                </v-list-item>
                            </v-list>
                        </v-col>

                        <v-col cols="3">
                            <v-list class="d-flex justify-left">
                                <v-list-item title="Y calle">
                                    <v-list-item-subtitle>{{ yCalle }}</v-list-item-subtitle>
                                </v-list-item>
                            </v-list>
                        </v-col>
                        <v-col cols="3">
                            <v-list class="d-flex justify-left">
                                <v-list-item title="Ciudad">
                                    <v-list-item-subtitle>{{ ciudad }}</v-list-item-subtitle>
                                </v-list-item>
                            </v-list>
                        </v-col>
                    </v-row>

                    <h3 style="margin-left:1%;margin-top: 2%;font-size:1.5rem;font-weight:bold">Contacto
                    </h3>
                    <v-divider style="margin-bottom: 1% ;margin-left: 1.2%;margin-right:2.2%;"></v-divider>

                    <v-row>

                        <v-col cols="3">
                            <v-list class="d-flex justify-left">
                                <v-list-item title="Teléfono">
                                    <v-list-item-subtitle>{{ telefono }}</v-list-item-subtitle>
                                </v-list-item>
                            </v-list>
                        </v-col>

                        <v-col cols="3">
                            <v-list class="d-flex justify-left">
                                <v-list-item title="Celular">
                                    <v-list-item-subtitle>{{ celular }}</v-list-item-subtitle>
                                </v-list-item>
                            </v-list>
                        </v-col>

                        <v-col cols="3">
                            <v-list class="d-flex justify-left">
                                <v-list-item title="Correo electrónico">
                                    <v-list-item-subtitle>{{ correo }}</v-list-item-subtitle>
                                </v-list-item>
                            </v-list>
                        </v-col>
                    </v-row>

                    <h3 style="margin-left:1%;margin-top: 2%;font-size:1.5rem;font-weight:bold">Documentación
                    </h3>
                    <v-divider style="margin-bottom: 1%; margin-left: 1.2%;margin-right: 2.2%;"></v-divider>

                    <v-row>

                        <v-col cols="3">
                            <v-list class="d-flex justify-left">
                                <v-list-item title="N° Cartilla">
                                    <v-list-item-subtitle>{{ nCartilla }}</v-list-item-subtitle>
                                </v-list-item>
                            </v-list>
                        </v-col>

                        <v-col cols="3">
                            <v-list class="d-flex justify-left">
                                <v-list-item title="N° Pasaporte">
                                    <v-list-item-subtitle>{{ nPasaporte }}</v-list-item-subtitle>
                                </v-list-item>
                            </v-list>
                        </v-col>

                        <v-col cols="3">
                            <v-list class="d-flex justify-left">
                                <v-list-item title="CURP">
                                    <v-list-item-subtitle>{{ CURP }}</v-list-item-subtitle>
                                </v-list-item>
                            </v-list>
                        </v-col> <v-col cols="3">
                            <v-list class="d-flex justify-left">
                                <v-list-item title="RFC">
                                    <v-list-item-subtitle>{{ RFC }}</v-list-item-subtitle>
                                </v-list-item>
                            </v-list>
                        </v-col>

                    </v-row>

                    <v-row>
                        <v-col cols="3">
                            <v-list class="d-flex justify-left">
                                <v-list-item title="Afore">
                                    <v-list-item-subtitle>{{ afore }}</v-list-item-subtitle>
                                </v-list-item>
                            </v-list>
                        </v-col>

                        <v-col cols="3">
                            <v-list class="d-flex justify-left">
                                <v-list-item title="NSS">
                                    <v-list-item-subtitle>{{ NSS }}</v-list-item-subtitle>
                                </v-list-item>
                            </v-list>
                        </v-col>

                        <v-col cols="3">
                            <v-list class="d-flex justify-left">
                                <v-list-item title="Clave de elector">
                                    <v-list-item-subtitle>{{ claveElector }}</v-list-item-subtitle>
                                </v-list-item>
                            </v-list>
                        </v-col>
                        <v-col cols="3">
                            <v-list class="d-flex justify-left">
                                <v-list-item title="Tipo de licencia">
                                    <v-list-item-subtitle>{{ tipoLicencia }}</v-list-item-subtitle>
                                </v-list-item>
                            </v-list>
                        </v-col>

                    </v-row>


                    <v-row>
           

                        <v-col cols="3">
                            <v-list class="d-flex justify-left">
                                <v-list-item title="Fecha vigencia">
                                    <v-list-item-subtitle>{{ fechaVigencia }}</v-list-item-subtitle>
                                </v-list-item>
                            </v-list>
                        </v-col>

                        <v-col cols="3">
                            <v-list class="d-flex justify-left">
                                <v-list-item title="Libreta de mar">
                                    <v-list-item-subtitle>{{ libretaMar }}</v-list-item-subtitle>
                                </v-list-item>
                            </v-list>
                        </v-col>

                        <v-col cols="3">
                            <v-list class="d-flex justify-left">
                                <v-list-item title="Banco">
                                    <v-list-item-subtitle>{{ banco }}</v-list-item-subtitle>
                                </v-list-item>
                            </v-list>
                        </v-col>
                        <v-col cols="3">
                            <v-list class="d-flex justify-left">
                                <v-list-item title="Cuenta">
                                    <v-list-item-subtitle>{{ cuenta }}</v-list-item-subtitle>
                                </v-list-item>
                            </v-list>
                        </v-col>
                    </v-row>


                    <v-row>
 

                        <v-col cols="3">
                            <v-list class="d-flex justify-left">
                                <v-list-item title="CLABE">
                                    <v-list-item-subtitle>{{ clabe }}</v-list-item-subtitle>
                                </v-list-item>
                            </v-list>
                        </v-col>

                        <v-col cols="3">
                            <v-list class="d-flex justify-left">
                                <v-list-item title="Código postal CIF">
                                    <v-list-item-subtitle>{{ cpCIF }}</v-list-item-subtitle>
                                </v-list-item>
                            </v-list>
                        </v-col>

                        <v-col cols="3">
                            <v-list class="d-flex justify-left">
                                <v-list-item title="Dirección de CIF">
                                    <v-list-item-subtitle>{{ direccionCIF }}</v-list-item-subtitle>
                                </v-list-item>
                            </v-list>
                        </v-col>
                        <v-col cols="3">
                            <v-list class="d-flex justify-left">
                                <v-list-item title="Población de la CIF">
                                    <v-list-item-subtitle>{{ poblacionCIF }}</v-list-item-subtitle>
                                </v-list-item>
                            </v-list>
                        </v-col>
                    </v-row>


                    <v-row>


                        <v-col cols="3">
                            <v-list class="d-flex justify-left">
                                <v-list-item title="Infonavit">
                                    <v-list-item-subtitle>{{ infonavit }}</v-list-item-subtitle>
                                </v-list-item>
                            </v-list>
                        </v-col>

                        <v-col cols="3">
                            <v-list class="d-flex justify-left">
                                <v-list-item title="Número de crédito">
                                    <v-list-item-subtitle>{{ numCreditoInfonavit }}</v-list-item-subtitle>
                                </v-list-item>
                            </v-list>
                        </v-col>

                        <v-col cols="3">
                            <v-list class="d-flex justify-left">
                                <v-list-item title="Fecha de alta IMMS">
                                    <v-list-item-subtitle>{{ fechaAltaImms }}</v-list-item-subtitle>
                                </v-list-item>
                            </v-list>
                        </v-col>

                    </v-row>


                    <h3 style="margin-left:1%;margin-top: 2%;font-size:1.5rem;font-weight:bold">Análisis clínico
                    </h3>
                    <v-divider style="margin-bottom: 1%;margin-left: 1.2%;margin-right:2.2%;"></v-divider>


                    <v-row>
                        <v-col cols="3">
                            <v-list class="d-flex justify-left">
                                <v-list-item title="Tipo de Sangre">
                                    <v-list-item-subtitle>{{ tipoSangre }}</v-list-item-subtitle>
                                </v-list-item>
                            </v-list>
                        </v-col>

                        <v-col cols="3">
                            <v-list class="d-flex justify-left">
                                <v-list-item title="Enfermedades Crónicas">
                                    <v-list-item-subtitle>{{ enfermedadCronica }}</v-list-item-subtitle>
                                </v-list-item>
                            </v-list>
                        </v-col>

                        <v-col cols="3">
                            <v-list class="d-flex justify-left">
                                <v-list-item title="Medicamentos que toma">
                                    <v-list-item-subtitle>{{ medicamentoQueToma }}</v-list-item-subtitle>
                                </v-list-item>
                            </v-list>
                        </v-col>

                        <v-col cols="3">
                            <v-list class="d-flex justify-left">
                                <v-list-item title="Donador de órganos">
                                    <v-list-item-subtitle>{{ donadorOrganos }}</v-list-item-subtitle>
                                </v-list-item>
                            </v-list>
                        </v-col>

                    </v-row>

                    <v-row>
                        <v-col cols="3">
                            <v-list class="d-flex justify-left">
                                <v-list-item title="Alérgico a algun medicamento">
                                    <v-list-item-subtitle>{{ alergias }}</v-list-item-subtitle>
                                </v-list-item>
                            </v-list>
                        </v-col>

                        <v-col cols="3">
                            <v-list class="d-flex justify-left">
                                <v-list-item title="Alergias a medicamento">
                                    <v-list-item-subtitle>{{ alergiasMedicamento }}</v-list-item-subtitle>
                                </v-list-item>
                            </v-list>
                        </v-col>

                        <v-col cols="3">
                            <v-list class="d-flex justify-left">
                                <v-list-item title="Alergias">
                                    <v-list-item-subtitle>{{ alergias }}</v-list-item-subtitle>
                                </v-list-item>
                            </v-list>
                        </v-col>

                        <v-col cols="3">
                            <v-list class="d-flex justify-left">
                                <v-list-item title="Tiene tatuajes">
                                    <v-list-item-subtitle>{{ tieneTatuajes }}</v-list-item-subtitle>
                                </v-list-item>
                            </v-list>
                        </v-col>

                    </v-row>


                    <v-row>
                        <v-col cols="3">
                            <v-list class="d-flex justify-left">
                                <v-list-item title="Estatura">
                                    <v-list-item-subtitle>{{ estatura }}</v-list-item-subtitle>
                                </v-list-item>
                            </v-list>
                        </v-col>

                        <v-col cols="3">
                            <v-list class="d-flex justify-left">
                                <v-list-item title="Peso">
                                    <v-list-item-subtitle>{{ peso }}</v-list-item-subtitle>
                                </v-list-item>
                            </v-list>
                        </v-col>

                        <v-col cols="3">
                            <v-list class="d-flex justify-left">
                                <v-list-item title="Complexión">
                                    <v-list-item-subtitle>{{ complexion }}</v-list-item-subtitle>
                                </v-list-item>
                            </v-list>
                        </v-col>

                        <v-col cols="3">
                            <v-list class="d-flex justify-left">
                                <v-list-item title="Fuma">
                                    <v-list-item-subtitle>{{ fuma }}</v-list-item-subtitle>
                                </v-list-item>
                            </v-list>
                        </v-col>

                    </v-row>


                    <v-row>
                        <v-col cols="3">
                            <v-list class="d-flex justify-left">
                                <v-list-item title="Consume Alcohol">
                                    <v-list-item-subtitle>{{ toma }}</v-list-item-subtitle>
                                </v-list-item>
                            </v-list>
                        </v-col>

                        <v-col cols="3">
                            <v-list class="d-flex justify-left">
                                <v-list-item title="Perforaciones">
                                    <v-list-item-subtitle>{{ tienePerforaciones }}</v-list-item-subtitle>
                                </v-list-item>
                            </v-list>
                        </v-col>

                        <v-col cols="3">
                            <v-list class="d-flex justify-left">
                                <v-list-item title="Utiliza lentes">
                                    <v-list-item-subtitle>{{ usaLentes }}</v-list-item-subtitle>
                                </v-list-item>
                            </v-list>
                        </v-col>

                        <v-col cols="3">
                            <v-list class="d-flex justify-left">
                                <v-list-item title="Color de ojos">
                                    <v-list-item-subtitle>{{ colorOjos }}</v-list-item-subtitle>
                                </v-list-item>
                            </v-list>
                        </v-col>

                    </v-row>


                    <v-row>
                        <v-col cols="3">
                            <v-list class="d-flex justify-left">
                                <v-list-item title="Color de caballo">
                                    <v-list-item-subtitle>{{ colorCabello }}</v-list-item-subtitle>
                                </v-list-item>
                            </v-list>
                        </v-col>

                    </v-row>

                    <h3 style="margin-left:1%;margin-top: 2%;font-size:1.5rem;font-weight:bold">Contacto de emergencia
                    </h3>
                    <v-divider style="margin-bottom: 1%;margin-left: 1.2%;margin-right:2.2%;"></v-divider>

                    <v-row>

                        <v-col cols="3">
                            <v-list class="d-flex justify-left">
                                <v-list-item title="Notificar a:">
                                    <v-list-item-subtitle>{{ contactoEmergencia }}</v-list-item-subtitle>
                                </v-list-item>
                            </v-list>
                        </v-col>

                        <v-col cols="3">
                            <v-list class="d-flex justify-left">
                                <v-list-item title="Parentesco">
                                    <v-list-item-subtitle>{{ parentescoCE }}</v-list-item-subtitle>
                                </v-list-item>
                            </v-list>
                        </v-col>

                        <v-col cols="3">
                            <v-list class="d-flex justify-left">
                                <v-list-item title="Número de contacto">
                                    <v-list-item-subtitle>{{ numeroCE }}</v-list-item-subtitle>
                                </v-list-item>
                            </v-list>
                        </v-col>

                    </v-row>


                    <h3 style="margin-left:1%;margin-top: 2%;font-size:1.5rem;font-weight:bold">Beneficiario
                    </h3>
                    <v-divider style="margin-bottom: 1%;margin-left: 1.2%;margin-right:2.2%;"></v-divider>

                    <v-row>
                        <v-col cols="3">
                            <v-list class="d-flex justify-left">
                                <v-list-item title="Beneficiario:">
                                    <v-list-item-subtitle>{{ beneficiario }}</v-list-item-subtitle>
                                </v-list-item>
                            </v-list>
                        </v-col>

                        <v-col cols="3">
                            <v-list class="d-flex justify-left">
                                <v-list-item title="Parentesco">
                                    <v-list-item-subtitle>{{ parentescoBE }}</v-list-item-subtitle>
                                </v-list-item>
                            </v-list>
                        </v-col>

                        <v-col cols="3">
                            <v-list class="d-flex justify-left">
                                <v-list-item title="Número de contacto">
                                    <v-list-item-subtitle>{{ numeroBE }}</v-list-item-subtitle>
                                </v-list-item>
                            </v-list>
                        </v-col>
                    </v-row>

                    <h3 style="margin-left:1%;margin-top: 2%;font-size:1.5rem;font-weight:bold">Otros
                    </h3>
                    <v-divider style="margin-bottom: 1%;margin-left: 1.2%;margin-right:2.2%;"></v-divider>

                    <v-row>
                        <v-col cols="3">
                            <v-list class="d-flex justify-left">
                                <v-list-item title="Comentarios">
                                    <v-list-item-subtitle>{{ comentarios }}</v-list-item-subtitle>
                                </v-list-item>
                            </v-list>
                        </v-col>
                    </v-row>
                </v-card>

            </v-window-item>

            <!--Expedientes-->
            <v-window-item value="tab-2"><br>
                <v-divider></v-divider>
                <v-card style="width: 98%;   margin-left: 1%; margin-right: 1%;" variant="outlined" title="Expedientes">
                    <hr>
                    <div>
                        <v-row> <v-col cols="6" md="3" lg="3" sm="3" xs="3">
                                <v-list-item>
                                    <v-container @click="generarPerfilPuestos('determinado')"
                                        style="background:none; cursor: pointer;">
                                        <v-list-item-title>
                                            RRH-001-F01
                                        </v-list-item-title>
                                        <v-list-subtitle>
                                            Perfil de Puestos</v-list-subtitle>
                                    </v-container>

                                    <template v-slot:prepend>
                                        <v-row>

                                            <v-checkbox v-model="f01"></v-checkbox>


                                        </v-row>

                                    </template>

                                </v-list-item>

                            </v-col>

                            <v-col cols="6" md="3" lg="3" sm="3" xs="3">
                                <v-list-item>
                                    <v-container @click="generarSolicitudEmpleo()"
                                        style="background:none; cursor: pointer;">
                                        <v-list-item-title>
                                            RRH-001-F04
                                        </v-list-item-title>
                                        <v-list-subtitle>
                                            Solicitud de empleo y estudio socieconómico</v-list-subtitle>
                                    </v-container>

                                    <template v-slot:prepend>
                                        <v-row>

                                            <v-checkbox v-model="f04"></v-checkbox>

                                        </v-row>

                                    </template>

                                </v-list-item>
                            </v-col>

                            <v-col cols="6" md="3" lg="3" sm="3" xs="3">
                                <v-list-item>
                                    <v-container style="background:none; cursor: pointer;">
                                        <v-list-item-title>
                                            RRH-001-F05
                                        </v-list-item-title>
                                        <v-list-subtitle>
                                            Reporte Entrevista Administrativa/Corporativa</v-list-subtitle>
                                    </v-container>

                                    <template v-slot:prepend>
                                        <v-row>
                                            <v-checkbox v-model="f05"></v-checkbox>
                                        </v-row>

                                    </template>

                                </v-list-item>
                            </v-col>
                            <v-col cols="6" md="3" lg="3" sm="3" xs="3"> <v-list-item>
                                    <v-container @click="generarContrato('determinado')"
                                        style="background:none; cursor: pointer;">
                                        <v-list-item-title>
                                            RRH-001-F06
                                        </v-list-item-title>
                                        <v-list-subtitle>
                                            Reporte de Entrevista Operativa</v-list-subtitle>
                                    </v-container>

                                    <template v-slot:prepend>
                                        <v-row>

                                            <v-checkbox v-model="f06"></v-checkbox>


                                        </v-row>

                                    </template>

                                </v-list-item>
                            </v-col>
                        </v-row>


                        <v-row>
                            <v-col cols="6" md="3" lg="3" sm="3" xs="3">
                                <v-list-item>
                                    <v-container @click="generarAvisoRetenciones('credito')"
                                        style="background:none; cursor: pointer;">
                                        <v-list-item-title>
                                            RRH-001-F07
                                        </v-list-item-title>
                                        <v-list-subtitle>
                                            Aviso de Retenciones por Crédito</v-list-subtitle>
                                    </v-container>

                                    <template v-slot:prepend>
                                        <v-row>

                                            <v-checkbox v-model="f07"></v-checkbox>

                                        </v-row>
                                    </template>

                                </v-list-item>
                            </v-col>


                            <v-col cols="6" md="3" lg="3" sm="3" xs="3">
                                <v-list-item>
                                    <v-container @click="generarAvisoPrivacidadEmpleo()"
                                        style="background:none; cursor: pointer;">
                                        <v-list-item-title>
                                            RRH-001-F09
                                        </v-list-item-title>
                                        <v-list-subtitle>
                                            Aviso de Privacidad solicitante de Empleo</v-list-subtitle>
                                    </v-container>

                                    <template v-slot:prepend>
                                        <v-row>

                                            <v-checkbox v-model="f09"></v-checkbox>
                                        </v-row>
                                    </template>

                                </v-list-item></v-col>
                        <!--<v-col cols="6" md="3" lg="3" sm="3" xs="3">
                                <v-list-item title="RRH-001-F01" subtitle="Perfil de Puestos">
                                    <template v-slot:prepend>
                                        <v-checkbox v-model="f01"></v-checkbox>
                                    </template>
                                </v-list-item>
                            </v-col>

                            <v-col cols="6" md="3" lg="3" sm="3" xs="3">
                                <v-list-item title="RRH-001-F04" subtitle="Solicitud de empleo y estudio socieconómico">
                                    <template v-slot:prepend>
                                        <v-checkbox v-model="f04"></v-checkbox>
                                    </template>
                                </v-list-item>
                            </v-col>

                            <v-col cols="6" md="3" lg="3" sm="3" xs="3">
                                <v-list-item title="RRH-001-F05"
                                    subtitle="Reporte Entrevista Administrativa/Corporativa">
                                    <template v-slot:prepend>
                                        <v-checkbox v-model="f05"></v-checkbox>
                                    </template>
                                </v-list-item>
                            </v-col>
                            <v-col cols="6" md="3" lg="3" sm="3" xs="3">

                                <v-list-item title="RRH-001-F06" subtitle="Reporte de Entrevista Operativa">
                                    <template v-slot:prepend>
                                        <v-checkbox v-model="f06"></v-checkbox>
                                    </template>
                                </v-list-item>
                            </v-col>
                        </v-row>


                        <v-row>
                            <v-col cols="6" md="3" lg="3" sm="3" xs="3">
                                <v-list-item title="RRH-001-F07" subtitle="Aviso de Retenciones por Crédito">
                                    <template v-slot:prepend>
                                        <v-checkbox v-model="f07"></v-checkbox>
                                    </template>
                                </v-list-item>
                            </v-col>
                            <v-col cols="6" md="3" lg="3" sm="3" xs="3">
                                <v-list-item title="RRH-001-F09" subtitle="Aviso de Privacidad solicitante de Empleo">
                                    <template v-slot:prepend>
                                        <v-checkbox v-model="f09"></v-checkbox>
                                    </template>
                                                </v-list-item></v-col>-->
                            <v-col cols="6" md="3" lg="3" sm="3" xs="3">

                                <v-list-item>
                                    <v-container @click="generarContrato('determinado')"
                                        style="background:none; cursor: pointer;">
                                        <v-list-item-title>
                                            RRH-001-F10
                                        </v-list-item-title>
                                        <v-list-subtitle>
                                            Contrato Individual de Trabajo por Tiempo
                                            Determinado</v-list-subtitle>
                                    </v-container>

                                    <template v-slot:prepend>
                                        <v-row>

                                            <v-checkbox v-model="f10"></v-checkbox>


                                        </v-row>

                                    </template>



                                </v-list-item>

                            </v-col>

                            <v-col cols="6" md="3" lg="3" sm="3" xs="3">
                                <v-list-item>
                                    <v-container @click="generarContrato('indeterminado')"
                                        style="background:none; cursor: pointer;">
                                        <v-list-item-title>
                                            RRH-001-F11
                                        </v-list-item-title>
                                        <v-list-subtitle>
                                            Contrato Individual de Trabajo por Tiempo Indeterminado
                                        </v-list-subtitle>
                                    </v-container>

                                    <template v-slot:prepend>
                                        <v-row>

                                            <v-checkbox v-model="f11"></v-checkbox>
                                        </v-row>

                                    </template>

                                </v-list-item>

                            </v-col>
                            <v-row> </v-row>
                            <v-col cols="6" md="3" lg="3" sm="3" xs="3">
                                <v-list-item>
                                    <v-container @click="generarConvenioConfidencialidadLaboral()"
                                        style="background:none; cursor: pointer;">
                                        <v-list-item-title>
                                            RRH-001-F12
                                        </v-list-item-title>
                                        <v-list-subtitle>
                                            Convenio de Confidencialidad Laboral
                                        </v-list-subtitle>
                                    </v-container>

                                    <template v-slot:prepend>
                                        <v-row>

                                            <v-checkbox v-model="f12"></v-checkbox>

                                        </v-row>

                                    </template>

                                </v-list-item>

                            <!-- 
                                <v-list-item title="RRH-001-F11"
                                    subtitle="Contrato Individual de Trabajo por Tiempo Indeterminado">
                                    <template v-slot:prepend>
                                        <v-checkbox v-model="f11"></v-checkbox>
                                    </template>
                                                </v-list-item> -->

                            </v-col>

                            <v-col cols="6" md="3" lg="3" sm="3" xs="3">

                                <v-list-item>
                                    <v-container @click="generarAcuerdoPruebaAntidoping()"
                                        style="background:none; cursor: pointer;">
                                        <v-list-item-title>
                                            RRH-001-F13 </v-list-item-title>
                                        <v-list-subtitle>
                                            Acuerdo de Autorizaciones de Prueba Anti-Doping
                                        </v-list-subtitle>
                                    </v-container>

                                    <template v-slot:prepend>
                                        <v-row>

                                            <v-checkbox v-model="f13"></v-checkbox>


                                        </v-row>

                                    </template>

                                </v-list-item></v-col><v-col cols="6" md="3" lg="3" sm="3" xs="3">


                                <v-list-item>
                                    <v-container @click="generarSolicitudAltaImss()"
                                        style="background:none; cursor: pointer;">
                                        <v-list-item-title>
                                            RRH-001-F15 </v-list-item-title>
                                        <v-list-subtitle>
                                            Solicitud de Alta IMMS
                                        </v-list-subtitle>
                                    </v-container>

                                    <template v-slot:prepend>
                                        <v-row>

                                            <v-checkbox v-model="f15"></v-checkbox>


                                        </v-row>

                                    </template>

                                </v-list-item>
                            </v-col>

                            <v-col cols="6" md="3" lg="3" sm="3" xs="3">


                                <v-list-item>
                                    <v-container @click="generarContrato('indeterminado')"
                                        style="background:none; cursor: pointer;">
                                        <v-list-item-title>
                                            RRH-001-F18 </v-list-item-title>
                                        <v-list-subtitle>
                                            Convenio de Terminación de Relación Laboral
                                        </v-list-subtitle>
                                    </v-container>

                                    <template v-slot:prepend>
                                        <v-row>

                                            <v-checkbox v-model="f18"></v-checkbox>

                                        </v-row>

                                    </template>
                                </v-list-item>
                            </v-col> </v-row>

                        <v-row> <v-col cols="6" md="3" lg="3" sm="3" xs="3">
                                <v-list-item>
                                    <v-container @click="generarContrato('indeterminado')"
                                        style="background:none; cursor: pointer;">
                                        <v-list-item-title>
                                            RRH-001-F19 </v-list-item-title>
                                        <v-list-subtitle>
                                            Renuncia Voluntaria
                                        </v-list-subtitle>
                                    </v-container>

                                    <template v-slot:prepend>
                                        <v-row>

                                            <v-checkbox v-model="f19"></v-checkbox>


                                        </v-row>

                                    </template>

                                </v-list-item>
                            </v-col>
                            <v-col cols="6" md="3" lg="3" sm="3" xs="3">

                                <v-list-item>
                                    <v-container @click="generarContrato('indeterminado')"
                                        style="background:none; cursor: pointer;">
                                        <v-list-item-title>
                                            RRH-001-F21 </v-list-item-title>
                                        <v-list-subtitle>
                                            Entrega de Documentación
                                        </v-list-subtitle>
                                    </v-container>

                                    <template v-slot:prepend>
                                        <v-row>

                                            <v-checkbox v-model="f21"></v-checkbox>


                                        </v-row>

                                    </template>

                                </v-list-item> </v-col>
                            <v-col cols="6" md="3" lg="3" sm="3" xs="3">

                                <v-list-item>
                                    <v-container @click="generarContrato('indeterminado')"
                                        style="background:none; cursor: pointer;">
                                        <v-list-item-title>
                                            RRH-001-F22 </v-list-item-title>
                                        <v-list-subtitle>
                                            Prestamo de documentación
                                        </v-list-subtitle>
                                    </v-container>

                                    <template v-slot:prepend>
                                        <v-row>
                                            <v-checkbox v-model="f22"></v-checkbox>

                                        </v-row>

                                    </template>

                                </v-list-item>

                            </v-col></v-row>




                    </div>
                </v-card>
            </v-window-item>

            <!--PESTAÑA DOCUMENTACION-->
            <v-window-item value="tab-3">

                <!--PESTAÑA DOCUMENTACION-->
                <v-card style="width: 98%;   margin-left: 1%; margin-right: 1%; margin-top: 1%;" variant="outlined"
                    title="Documentos">

                    <hr>
                    <v-table fixed-header height="100%">
                        <thead style="background: gray;">
                            <tr>
                                <th style="width: 5%;">Estado</th>
                                <th style="width: 5%;">N/A</th>
                                <th class="text-left" style="width: 18%;">
                                    Documento
                                </th>
                                <th class="text-left">
                                    Acciones
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><v-checkbox readonly v-model="checkCurp" density="compact"
                                        hide-details="true"></v-checkbox></td>
                                <td></td>        
                                <td>CURP</td>
                                <td>
                                    <v-btn :loading="loading3" :disabled="loading3" color="blue" density="compact"
                                        class="ma-2 white--text" @click="verDocumento('curp')">
                                        Ver
                                        <v-icon right dark>
                                            mdi-eye
                                        </v-icon>
                                    </v-btn>

                                    <v-btn :loading="loading3" :disabled="loading3" color="blue-grey" density="compact"
                                        class="ma-2 white--text" @click="cargarDocumentos('curp')">
                                        Cargar URL
                                        <v-icon right dark>
                                            mdi-cloud-upload
                                        </v-icon>
                                    </v-btn>

                                </td>
                            </tr>
                            <tr>
                                <td><v-checkbox readonly v-model="checkRFC" density="compact"
                                        hide-details="true"></v-checkbox></td>
                                <td></td> 
                                <td>RFC</td>
                                <td>
                                    <v-btn :loading="loading3" :disabled="loading3" color="blue" density="compact"
                                        class="ma-2 white--text" @click="verDocumento('rfc')">
                                        Ver
                                        <v-icon right dark>
                                            mdi-eye
                                        </v-icon>
                                    </v-btn>

                                    <v-btn :loading="loading3" :disabled="loading3" color="blue-grey" density="compact"
                                        class="ma-2 white--text" @click="cargarDocumentos('rfc')">
                                        Cargar URL
                                        <v-icon right dark>
                                            mdi-cloud-upload
                                        </v-icon>
                                    </v-btn>

                                </td>
                            </tr>
                            <tr>
                                <td><v-checkbox readonly v-model="checknss" density="compact"
                                        hide-details="true"></v-checkbox></td>
                                <td></td> 
                                <td>NSS</td>
                                <td>
                                    <v-btn :loading="loading3" :disabled="loading3" color="blue" density="compact"
                                        class="ma-2 white--text" @click="verDocumento('nss')">
                                        Ver
                                        <v-icon right dark>
                                            mdi-eye
                                        </v-icon>
                                    </v-btn>

                                    <v-btn :loading="loading3" :disabled="loading3" color="blue-grey" density="compact"
                                        class="ma-2 white--text" @click="cargarDocumentos('nss')">
                                        Cargar URL
                                        <v-icon right dark>
                                            mdi-cloud-upload
                                        </v-icon>
                                    </v-btn>
                                </td>
                            </tr>
                            <tr>
                                <td><v-checkbox readonly  v-model="checkCartilla" density="compact"
                                        hide-details="true"></v-checkbox></td>
                                <td><v-checkbox readonly v-model="checkNACartilla" density="compact"
                                        hide-details="true"></v-checkbox></td>
                                <td>Cartilla Militar</td>
                                <td>
                                    <v-btn :loading="loading3" :disabled="isDisable" color="blue" density="compact"
                                        class="ma-2 white--text btnVerCartilla" @click="verDocumento('cartillaMilitar')">
                                        Ver
                                        <v-icon right dark>
                                            mdi-eye
                                        </v-icon>
                                    </v-btn>
                                    <v-btn :loading="loading3" :disabled="isDisable" color="blue-grey" density="compact"
                                        class="ma-2 white--text btnDescargarCartilla" @click="cargarDocumentos('cartillaMilitar')">
                                        Cargar URL
                                        <v-icon right dark>
                                            mdi-cloud-upload
                                        </v-icon>
                                    </v-btn>
                                </td>
                            </tr>
                            <tr>
                                <td><v-checkbox readonly v-model="checkIne" density="compact"
                                        hide-details="true"></v-checkbox></td>
                                <td></td>
                                <td>INE</td>
                                <td>
                                    <v-btn :loading="loading3" :disabled="loading3" color="blue" density="compact"
                                        class="ma-2 white--text" @click="verDocumento('ine')">
                                        Ver
                                        <v-icon right dark>
                                            mdi-eye
                                        </v-icon>
                                    </v-btn>

                                    <v-btn :loading="loading3" :disabled="loading3" color="blue-grey" density="compact"
                                        class="ma-2 white--text" @click="cargarDocumentos('ine')">
                                        Cargar URL
                                        <v-icon right dark>
                                            mdi-cloud-upload
                                        </v-icon>
                                    </v-btn>
                                </td>
                            </tr>
                            <tr>
                                <td><v-checkbox readonly v-model="checkDomicilio" density="compact"
                                        hide-details="true"></v-checkbox>
                                </td>
                                <td></td>
                                <td>Comprobante de domicilio</td>
                                <td>
                                    <v-btn :loading="loading3" :disabled="loading3" color="blue" density="compact"
                                        class="ma-2 white--text" @click="verDocumento('comprobanteDomicilio')">
                                        Ver
                                        <v-icon right dark>
                                            mdi-eye
                                        </v-icon>
                                    </v-btn>

                                    <v-btn :loading="loading3" :disabled="loading3" color="blue-grey" density="compact"
                                        class="ma-2 white--text" @click="cargarDocumentos('comprobanteDomicilio')">
                                        Cargar URL
                                        <v-icon right dark>
                                            mdi-cloud-upload
                                        </v-icon>
                                    </v-btn>
                                </td>
                            </tr>
                            <tr>
                                <td><v-checkbox readonly v-model="checkActaNacimiento" density="compact"
                                        hide-details="true"></v-checkbox></td>
                                <td></td>
                                <td>Acta de Nacimiento</td>
                                <td>
                                    <v-btn :loading="loading3" :disabled="loading3" color="blue" density="compact"
                                        class="ma-2 white--text" @click="verDocumento('actaNacimiento')">
                                        Ver
                                        <v-icon right dark>
                                            mdi-eye
                                        </v-icon>
                                    </v-btn>

                                    <v-btn :loading="loading3" :disabled="loading3" color="blue-grey" density="compact"
                                        class="ma-2 white--text" @click="cargarDocumentos('actaNacimiento')">
                                        Cargar URL
                                        <v-icon right dark>
                                            mdi-cloud-upload
                                        </v-icon>
                                    </v-btn>
                                </td>
                            </tr>

                            <tr>
                                <td><v-checkbox readonly v-model="checkCompranteEstudio" density="compact"
                                        hide-details="true"></v-checkbox></td>
                                <td></td>
                                <td>Comprobante de estudios</td>
                                <td>
                                    <v-btn :loading="loading3" :disabled="loading3" color="blue" density="compact"
                                        class="ma-2 white--text" @click="verDocumento('comprobanteEstudios')">
                                        Ver
                                        <v-icon right dark>
                                            mdi-eye
                                        </v-icon>
                                    </v-btn>

                                    <v-btn :loading="loading3" :disabled="loading3" color="blue-grey" density="compact"
                                        class="ma-2 white--text" @click="cargarDocumentos('comprobanteEstudios')">
                                        Cargar URL
                                        <v-icon right dark>
                                            mdi-cloud-upload
                                        </v-icon>
                                    </v-btn>
                                </td>
                            </tr>

                            <tr>
                                <td><v-checkbox readonly v-model="checkContratoBanco" density="compact"
                                        hide-details="true"></v-checkbox></td>
                                <td></td>
                                <td>Contrato de banco</td>
                                <td>
                                    <v-btn :loading="loading3" :disabled="loading3" color="blue" density="compact"
                                        class="ma-2 white--text" @click="verDocumento('contratoBanco')">
                                        Ver
                                        <v-icon right dark>
                                            mdi-eye
                                        </v-icon>
                                    </v-btn>

                                    <v-btn :loading="loading3" :disabled="loading3" color="blue-grey" density="compact"
                                        class="ma-2 white--text" @click="cargarDocumentos('contratoBanco')">
                                        Cargar URL
                                        <v-icon right dark>
                                            mdi-cloud-upload
                                        </v-icon>
                                    </v-btn>
                                </td>
                            </tr>
                            <tr>

                                <td><v-checkbox readonly v-model="checkLibretaMar" density="compact"
                                        hide-details="true"></v-checkbox></td>
                                <td><v-checkbox v-model="checkNALibretaMar" density="compact"
                                        hide-details="true" @change="onChangeLibretaMar(isDisableLibretaMar)"></v-checkbox></td> 
                                <td>Libreta de Mar</td>
                                <td>
                                    <v-btn :loading="loading3" :disabled="isDisableLibretaMar" color="blue" density="compact"
                                        class="ma-2 white--text" @click="verDocumento('libretaMar')">
                                        Ver
                                        <v-icon right dark>
                                            mdi-eye
                                        </v-icon>
                                    </v-btn>

                                    <v-btn :loading="loading3" :disabled="isDisableLibretaMar" color="blue-grey" density="compact"
                                        class="ma-2 white--text" @click="cargarDocumentos('libretaMar')">
                                        Cargar URL
                                        <v-icon right dark>
                                            mdi-cloud-upload
                                        </v-icon>
                                    </v-btn>
                                </td>
                            </tr>


                            <tr>

                                <td><v-checkbox readonly v-model="checkLicencia" density="compact"
                                        hide-details="true"></v-checkbox></td>
                                <td><v-checkbox v-model="checkNALicencia" density="compact"
                                        hide-details="true" @change="onChangeLicencia(isDisableLicencia)"></v-checkbox></td> 
                                <td>Licencia</td>
                                <td>
                                    <v-btn :loading="loading3" :disabled="isDisableLicencia" color="blue" density="compact"
                                        class="ma-2 white--text" @click="verDocumento('licencia')">
                                        Ver
                                        <v-icon right dark>
                                            mdi-eye
                                        </v-icon>
                                    </v-btn>

                                    <v-btn :loading="loading3" :disabled="isDisableLicencia" color="blue-grey" density="compact"
                                        class="ma-2 white--text" @click="cargarDocumentos('licencia')">
                                        Cargar URL
                                        <v-icon right dark>
                                            mdi-cloud-upload
                                        </v-icon>
                                    </v-btn>
                                </td>
                            </tr>


                        </tbody>
                    </v-table>
                </v-card>
            </v-window-item>

            <v-window-item value="tab-4"> <!--PESTAÑA FOTOGRAFÍA -->
                <v-card style="width: 98%;   margin-left: 1%; margin-right: 1%; margin-top: 1%;" variant="outlined"
                    title="Fotografías">
                    <hr>
                    <v-table fixed-header height="100%">
                        <hr>
                        <thead style="background: gray;">
                            <tr>

                                <th class="text-left" style="width: 18%;">
                                    Fotografía

                                </th>
                                <th class="text-left">
                                    Acciones
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>

                                <td>Foto Frontal</td>
                                <td>
                                    <v-btn :loading="loading3" :disabled="loading3" color="blue" density="compact"
                                        class="ma-2 white--text" @click="descargarImagen('fotoFrontal')">
                                        Descargar
                                        <v-icon right dark>
                                            mdi-eye
                                        </v-icon>
                                    </v-btn>

                                    <v-btn :loading="loading3" :disabled="loading3" color="blue-grey" density="compact"
                                        class="ma-2 white--text" @click="dialogFoto = true">
                                        Añadir
                                        <v-icon right dark>
                                            mdi-cloud-upload
                                        </v-icon>
                                    </v-btn>

                                </td>
                            </tr>
                            <tr>

                                <td>Foto Lateral Izquierda</td>
                                <td>
                                    <v-btn :loading="loading3" :disabled="loading3" color="blue" density="compact"
                                        class="ma-2 white--text" @click="descargarImagen('fotoLateral1')">
                                        Descargar
                                        <v-icon right dark>
                                            mdi-eye
                                        </v-icon>
                                    </v-btn>

                                    <v-btn :loading="loading3" :disabled="loading3" color="blue-grey" density="compact"
                                        class="ma-2 white--text" @click="dialogFotoLateral1 = true">
                                        Añadir <v-icon right dark>
                                            mdi-cloud-upload
                                        </v-icon>
                                    </v-btn>

                                </td>
                            </tr>
                            <tr>

                                <td>Foto Lateral Derecha</td>
                                <td>
                                    <v-btn :loading="loading3" :disabled="loading3" color="blue" density="compact"
                                        class="ma-2 white--text" @click="descargarImagen('fotoLateral2')">
                                        Descargar
                                        <v-icon right dark>
                                            mdi-eye
                                        </v-icon>
                                    </v-btn>

                                    <v-btn :loading="loading3" :disabled="loading3" color="blue-grey" density="compact"
                                        class="ma-2 white--text" @click="dialogFotoLateral2 = true">
                                        Añadir
                                        <v-icon right dark>
                                            mdi-cloud-upload
                                        </v-icon>
                                    </v-btn>

                                </td>
                            </tr>

                        </tbody>
                    </v-table>
                </v-card>

                <!-- Dialog  foto Frontal que recorta fotografías -->
                <v-dialog v-model="dialogFoto" persistent max-width="65%">

                    <v-card style="height:70vh">
                        <v-toolbar color="primary" dark>
                            <h3 style="margin-left: 5%;">Añadir Fotografía de empleado</h3>
                        </v-toolbar>
                        <!--Se añade un cargador de fotografías -->
                        <v-row style="margin-left: 1%; margin-top: auto ;">

                            <v-col cols="4">
                                <div style="width: 150px; max-height:150px;text-align: center;">
                                    <h4>Foto Actual:</h4>
                                    <v-divider></v-divider>
                                    <v-img :src="urlFotoActual"
                                        style="border: 1px dashed #ccc; min-height: 150px;max-height: 400px;" />
                                </div>
                            </v-col>


                            <v-col style="text-align: center;align-items:center; " cols="3">
                                <div>
                                    <h4>Foto cargada:</h4>
                                    <cropper :stencil-props="{
                                        aspectRatio: 4 / 5
                                    }" v-model="imagenRecortada" style="width: 100%; " :src="image" @change="change" />
                                </div>
                            </v-col>
                            <v-col cols="1">

                            </v-col>
                            <v-col cols="4">
                                <div style="width: 4cm; max-height:5cm;">
                                    <h4>Vista previa:</h4>
                                    <v-img :src="imageRecortada" style="border: 1px dashed #ccc;width: 4cm; height:5cm;" />
                                </div>
                            </v-col>
                        </v-row>


                        <v-card-actions>
                            <v-row>

                                <v-col cols="3">

                                    <v-btn @click="dialogFoto = false" small
                                        style="vertical-align: bottom; background: red;" color="white">Cancelar
                                    </v-btn>

                                </v-col>

                                <v-col cols="1">
                                </v-col>
                                <v-col cols="5">
                                    <v-file-input label="Actualizar fotografía" @change="handleImage" class="custom-input"
                                        type="file" accept="image/*" density="compact" variant="outlined">
                                    </v-file-input>
                                </v-col>
                                <v-col cols="3">
                                    <v-btn @click="subirImagen('fotoFrontal')" small
                                        style="vertical-align: bottom; background: #1867c0;" color="white">Actualizar
                                    </v-btn>
                                </v-col>
                            </v-row>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
                <!-- Dialog  foto lateral 1 que recorta fotografías -->
                <v-dialog v-model="dialogFotoLateral1" persistent max-width="65%">

                    <v-card style="height:70vh">
                        <v-toolbar color="primary" dark>
                            <h3 style="margin-left: 5%;">Añadir Fotografía de empleado</h3>
                        </v-toolbar>
                        <!--Se añade un cargador de fotografías -->
                        <v-row style="margin-left: 1%; margin-top: auto ;">

                            <v-col cols="4">
                                <div style="width: 150px; max-height:150px;text-align: center;">
                                    <h4>Foto Actual:</h4>
                                    <v-divider></v-divider>
                                    <v-img :src="fotoLateral1Actual"
                                        style="border: 1px dashed #ccc; min-height: 150px;max-height: 400px;" />
                                </div>
                            </v-col>


                            <v-col style="text-align: center;align-items:center; " cols="3">
                                <div>
                                    <h4>Foto cargada:</h4>
                                    <cropper :stencil-props="{
                                        aspectRatio: 4 / 5
                                    }" v-model="imagenRecortadaL1" style="width: 100%; " :src="imageL1"
                                        @change="changeL1" />
                                </div>
                            </v-col>
                            <v-col cols="1">

                            </v-col>
                            <v-col cols="4">
                                <div style="width: 4cm; max-height:5cm;">
                                    <h4>Vista previa:</h4>
                                    <v-img :src="imagenRecortadaL1"
                                        style="border: 1px dashed #ccc;width: 4cm; height:5cm;" />
                                </div>
                            </v-col>
                        </v-row>


                        <v-card-actions>
                            <v-row>

                                <v-col cols="3">

                                    <v-btn @click="dialogFotoLateral1 = false" small
                                        style="vertical-align: bottom; background: red;" color="white">Cancelar
                                    </v-btn>

                                </v-col>

                                <v-col cols="1">
                                </v-col>
                                <v-col cols="5">
                                    <v-file-input label="Actualizar fotografía" @change="handleImageL1" class="custom-input"
                                        type="file" accept="image/*" density="compact" variant="outlined">
                                    </v-file-input>
                                </v-col>
                                <v-col cols="3">
                                    <v-btn @click="subirImagen('fotoLateral1')" small
                                        style="vertical-align: bottom; background: #1867c0;" color="white">Actualizar
                                    </v-btn>
                                </v-col>
                            </v-row>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
                <v-dialog v-model="dialogFotoLateral2" persistent max-width="65%">

                    <v-card style="height:70vh">
                        <v-toolbar color="primary" dark>
                            <h3 style="margin-left: 5%;">Añadir Foto lateral derecha de empleado</h3>
                        </v-toolbar>
                        <!--Se añade un cargador de fotografías -->
                        <v-row style="margin-left: 1%; margin-top: auto ;">

                            <v-col cols="4">
                                <div style="width: 150px; max-height:150px;text-align: center;">
                                    <h4>Foto Actual:</h4>
                                    <v-divider></v-divider>
                                    <v-img :src="fotoLateral2Actual"
                                        style="border: 1px dashed #ccc; min-height: 150px;max-height: 400px;" />
                                </div>
                            </v-col>


                            <v-col style="text-align: center;align-items:center; " cols="3">
                                <div>
                                    <h4>Foto cargada:</h4>
                                    <cropper :stencil-props="{
                                        aspectRatio: 4 / 5
                                    }" v-model="imagenRecortadaL2" style="width: 100%; " :src="imageL2"
                                        @change="changeL2" />
                                </div>
                            </v-col>
                            <v-col cols="1">

                            </v-col>
                            <v-col cols="4">
                                <div style="width: 4cm; max-height:5cm;">
                                    <h4>Vista previa:</h4>
                                    <v-img :src="imagenRecortadaL2"
                                        style="border: 1px dashed #ccc;width: 4cm; height:5cm;" />
                                </div>
                            </v-col>
                        </v-row>


                        <v-card-actions>
                            <v-row>

                                <v-col cols="3">

                                    <v-btn @click="dialogFotoLateral2 = false" small
                                        style="vertical-align: bottom; background: red;" color="white">Cancelar
                                    </v-btn>

                                </v-col>

                                <v-col cols="1">
                                </v-col>
                                <v-col cols="5">
                                    <v-file-input label="Actualizar fotografía" @change="handleImage2" class="custom-input"
                                        type="file" accept="image/*" density="compact" variant="outlined">
                                    </v-file-input>
                                </v-col>
                                <v-col cols="3">
                                    <v-btn @click="subirImagen('fotoLateral2')" small
                                        style="vertical-align: bottom; background: #1867c0;" color="white">Actualizar
                                    </v-btn>
                                </v-col>
                            </v-row>
                        </v-card-actions>
                    </v-card>
                </v-dialog>


            </v-window-item>

            <!--Historial Laboral pestaña-->
            <v-window-item value="tab-5">


                <v-card style="width: 98%; margin-top: 1%;  margin-left: 1%; margin-right: 1%;" variant="outlined"
                    title="Historial laboral del empleado">
                    <hr>
                    <EasyDataTable :headers="headers" :items="historial" buttons-pagination
                        table-class-name="customize-table">
                        <!-- :search-field="camposBusqueda" :search-value="valorCampo" -->
                        <!-- #item-Opciones="{  }" -->
                        <template>

                            <v-menu>
                                <v-list>
                                    <v-list-item>
                                        <v-list-item-title>Ver Expediente</v-list-item-title>
                                    </v-list-item>
                                    <v-list-item>
                                        <v-list-item-title>Editar Empleado</v-list-item-title>
                                    </v-list-item>
                                    <v-divider></v-divider>

                                    <v-list-item>
                                        <v-list-item-title>Ver hoja de vida</v-list-item-title>
                                    </v-list-item>
                                    <v-list-item>
                                        <v-list-item-title>Ver gafete</v-list-item-title>
                                    </v-list-item>
                                    <v-divider></v-divider>

                                    <v-list-item>
                                        <v-list-item-title style="color: red;">Dar de baja </v-list-item-title>
                                    </v-list-item>
                                </v-list>
                            </v-menu>

                        </template>

                    </EasyDataTable>

                </v-card>
            </v-window-item>

        </v-window>


        <v-row justify="center">
            <v-dialog v-model="dialogAñadirArchivo" persistent max-width="550">

                <v-card>
                    <v-card-title class="text-h5">
                        Agregar URL del archivo
                    </v-card-title>
                    <v-card-text>
                        <v-text-field v-model="urlDoc" label="URL" density="compact" variant="outlined"
                            :rules="inputsCargarURL">
                        </v-text-field>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="green darken-1" text @click="dialogAñadirArchivo = false">
                            Cancelar
                        </v-btn>
                        <v-btn color="green darken-1" text @click="añadirUrl()">
                            Agregar URL
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-row>

        <v-row justify="center">
            <v-dialog v-model="dialogFotoURL" persistent max-width="550">

                <v-card>
                    <v-card-title class="text-h5">
                        Agregar URL del archivo
                    </v-card-title>
                    <v-card-text>
                        <v-text-field v-model="urlFoto" label="URL" density="compact" variant="outlined">
                        </v-text-field>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="green darken-1" text @click="dialogFotoURL = false">
                            Cancelar
                        </v-btn>
                        <v-btn color="green darken-1" text @click="SubirFotoURL()">
                            Agregar URL
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-row>
        <!--Aqui termina donde va elcontenido de cada pestaña-->
    </div>
</template>

<script>
import axios from 'axios';
import { isNull } from 'lodash';
let InstFormData = new FormData();
//recorte
// import { Cropper } from 'vue-advanced-cropper'
// import 'vue-advanced-cropper/dist/style.css';
import { Cropper } from 'vue-advanced-cropper';
import { StencilPreview, BoundingBox, DraggableArea } from 'vue-advanced-cropper';
import Docxtemplater from "docxtemplater";
import PizZip from "pizzip";
import PizZipUtils from "pizzip/utils/index.js";
import { saveAs } from "file-saver";

import navBar from "../views/general/navBar.vue";

import 'vue-advanced-cropper/dist/style.css';
export default {
    components:{
        navBar,
    },
    data: () => ({
        //Rules
        permisoUsuario: false,
        inputsCargarURL: [
            value => !!value || 'Campo requerido.',
            //value => (value || '').length <= 20 || 'Max 20 characters',
            value => {
                const pattern = /^(ht|f)tps?:\/\/\w+([\.\-\w]+)?\.dropbox\.com.*?$/
                return pattern.test(value) || 'URL Invalida.'
            },
        ],
        //FOTOS
        urlFotoActual: '',
        licenciaDoc: '',
        libretaMarDoc: '',
        headers: [
            { text: "Fecha de ingreso", value: "fechaIngreso" },
            { text: "Fecha de baja", value: "fechaBaja" },
            { text: "Motivo de baja", value: "motivoBaja" },
            { text: "Servicio", value: "nombre" },
            { text: "Puesto", value: "puesto" }
        ],
        historial: [],
        imagenRecortadaL2: undefined,
        canvasFotoL2: undefined,
        imagenRecortadaL1: undefined,
        imageL1: undefined,
        imageL2: undefined,
        fotoLateral2: undefined,
        fotoLateral1Actual: undefined,
        fotoLateral2Actual: undefined,
        fotoLateral1: undefined,
        dialogFotoLateral1: false,
        dialogFotoLateral2: false,
        dialogFoto: false,
        fotoFrontalActual: undefined,
        imageRecortada: undefined,
        canvasFotoFrontal: undefined,
        canvasFotoFrontal: undefined,

        canvasFotoL1: undefined,
        canvasFotoL2: undefined,
        imagenRecortada: null,
        imageActual: '',
        image: undefined,
        // to save image url
        imageUrl: '',
        //conexion
    //entorno: 'http://api-app.duxon.com.mx/',
    entorno: 'http://localhost:7005/',
        
        fotoPerfilDoc: '',
        fotoFrontalDoc: '',
        checkfotoPerfil: false,
        checkfotoFrontal: false,

        archivo: undefined,
        checkCurp: false,
        checkRFC: false,
        checknss: false,
        checkCartilla: false,
        checkNACartilla: false,
        checkIne: false,
        checkDomicilio: false,
        checkActaNacimiento: false,
        checkCompranteEstudio: false,
        checkContratoBanco: false,
        checkLicencia: false,
        checkNALicencia: false,
        checkLibretaMar: false,
        checkNALibretaMar: false,
        isDisable: false,
        isDisableLibretaMar: false,
        isDisableLicencia: false,
        image: undefined,
        imageUrl: '',
        dialogAñadirArchivo: false,
        urlDoc: '',
        urlFoto: '',
        dialogFotoURL: false,
        docActual: '',
        //información General
        nEmpleado: '',
        fechaIngreso: '',
        tipoTrabajador: '',
        ciudad: '',
        nss: '',
        fechaNacimiento: '',
        curp: '',
        rfc: '',
        zona: '',
        servicio: '',
        contrato: '',
        status: '',
        estado: '',
        cuenta: '',
        clabe: '',
        contratoDeterminado1: '',
        contratoDeterminado2: '',
        contratoIndeterminado: '',
        telefono: '',
        direccion: '',
        observaciones: '',
        fechaAltaImss: '',
        aniosLaborados: '',
        fechaFirmaRenuncia: '',
        motivoBaja: '',
        //documentos
        curpDoc: '',
        rfcDoc: '',

        cartillaMilitarDoc: '',
        ineDoc: '',
        comprobanteDomicilioDoc: '',
        actaNacimientoDoc: '',
        comprobanteEstudiosDoc: '',
        contratoBancoDoc: '',
        imagenCargada: null,
        column: null,
        inline: null,
        //*------------------información General------------------------*
        nombre: '',
        apellidoPaterno: '',
        apellidoMaterno: '',
        sexo: '',
        fechaNacimiento: '',
        lugarNacimiento: '',
        municipioNacimiento: '',
        estadoNacimiento: '',
        paisNacimiento: '',
        nacionalidad: '',
        estadoCivil: '',
        nivelEstudios: '',
        nEmpleado: '',
        fechaIngreso: '',
        departamento: '',
        tipoEmpleado: '',
        zona: '',
        servicio: '',
        puesto: '',
        contratoDeterminado1: '',
        contratoDeterminado2: '',
        contratoIndeterminado: '',
        aniosLaborados: '',
        turno: '',
        sueldoDeseado: '',
        //DIRECCION
        calle: '',
        nExterior: '',
        nInterior: '',
        fraccColonia: '',
        codigoPostal: '',
        entreCalle: '',
        yCalle: '',
        ciudad: '',
        //CONTACTO
        telefono: '',
        celular: '',
        correo: '',
        //DOCUMENTACION
        nCartilla: '',
        nPasaporte: '',
        CURP: '',
        RFC: '',
        afore: '',
        NSS: '',
        claveElector: '',
        tipoLicencia: '',
        fechaVigencia: '',
        libretaMar: '',
        banco: '',
        cuenta: '',
        clabe: '',
        cpCIF: '',
        direccionCIF: '',
        poblacionCIF: '',
        infonavit: '',
        numCreditoInfonavit: '',
        info: '',
        fechaAltaImms: '',
        tipoSangre: '',
        enfermedadCronica: '',
        medicamentoQueToma: '',
        donadorOrganos: '',
        alergias: '',
        toma:'',
        alergiasMedicamento: '',
        tieneTatuajes: '',
        estatura: '',
        peso: '',
        complexion: '',
        fuma: '',
        //consumeAlcohol:'',
        tienePerforaciones: '',
        usaLentes: '',
        colorOjos: '',
        colorCabello: '',
        //Contacto de emergencia.
        contactoEmergencia: '',
        parentescoCE: '',
        numeroCE: '',
        //Beneficiario.
        beneficiario: '',
        edadBE: '',
        representanteBE: '',
        parentescoBE: '',
        numeroBE: '',
        comentarios: '',
        //Datos contrato
        numeroLicitacion: '',
        salario: '',
        cuotaSalario: '',
        equipoACargo: '',
        tipoTrabajador: '',
        ciudad: '',
        nss: '',
        curp: '',
        rfc: '',

        contrato: '',
        status: '',
        estado: '',
        cuenta: '',
        clabe: '',
        telefono: '',
        direccion: '',
        observaciones: '',
        fechaAltaImss: '',
        aniosLaborados: '',
        fechaFirmaRenuncia: '',
        motivoBaja: '',
        //documentos
        curpDoc: '',
        rfcDoc: '',
        nssDoc: '',
        cartillaMilitarDoc: '',
        ineDoc: '',
        comprobanteDomicilioDoc: '',
        actaNacimientoDoc: '',
        comprobanteEstudiosDoc: '',
        contratoBancoDoc: '',
        libretaMarDoc: '',
        licenciaDoc: '',
        //LISTA DE CHECKBOX'S DEL LADO DE EXPEDIENTE
        f01: false,
        f04: false,
        f05: false,
        f06: false,
        f07: false,
        f09: false,
        f10: false,
        f100: false,
        f11: false,
        f12: false,
        f13: false,
        f15: false,
        f18: false,
        f19: false,
        f21: false,
        f22: false,
        imageL2: undefined,
        //CAMARA



        //LISTA DE MÉTODOS PARA APARTADO DE ENTREVISTA DE SALIDA
        historial: [],
        notifications: false,
        sound: true,
        widgets: false,
        checkbox: false,
        enabled: false,
        opciones: [
            { title: 'Ver' },
            { title: 'Editar' },
        ],
        loading: [],
        tab: 1,
        drawer: null,
        i: [
            ['', 'Empleados Activos'],
            //['mdi-send', 'Jurídico'],
            ['', 'Empleados dados de baja'],
        ]
    }),
    created() {
        this.validarPermisos()
        this.informacionEmpleado(this.$route.params.id)
        this.getExpediente(this.$route.params.id)
        this.getDocumentos(this.$route.params.id)
        this.getHistorial(this.$route.params.id)
        
    },
    watch: {
        imageRecortada() {
            if (this.imageRecortada != undefined) {

            }
        },
        checkCurp() {
            if (this.checkCurp == true) {
                this.actualizarDocumentacion("estadoCurp", 1)
            } else {
                this.actualizarDocumentacion("estadoCurp", 0)
            }
        },
        checkRFC() {
            if (this.checkRFC == true) {
                this.actualizarDocumentacion("estadoRfc", 1)
            } else {
                this.actualizarDocumentacion("estadoRfc", 0)
            }
        }, checknss() {
            if (this.checknss == true) {

                this.actualizarDocumentacion("estadoNss", 1)
            } else {
                this.actualizarDocumentacion("estadoNss", 0)
            }
        }, checkCartilla() {
            if (this.checkCartilla == true) {
                this.actualizarDocumentacion("estadoCartillaMilitar", 1)
            } else {
                this.actualizarDocumentacion("estadoCartillaMilitar", 0)
            }
        }, checkIne() {
            if (this.checkIne == true) {
                this.actualizarDocumentacion("estadoIne", 1)
            } else {
                this.actualizarDocumentacion("estadoIne", 0)
            }
        }, checkDomicilio() {
            if (this.checkDomicilio == true) {
                this.actualizarDocumentacion("estadoComprobanteDomicilio", 1)
            } else {
                this.actualizarDocumentacion("estadoComprobanteDomicilio", 0)
            }
        }, checkActaNacimiento() {
            if (this.checkActaNacimiento == true) {
                this.actualizarDocumentacion("estadoActaNacimiento", 1)
            } else {
                this.actualizarDocumentacion("estadoActaNacimiento", 0)
            }
        }, checkCompranteEstudio() {
            if (this.checkCompranteEstudio == true) {
                this.actualizarDocumentacion("estadoComprobanteEstudios", 1)
            } else {
                this.actualizarDocumentacion("estadoComprobanteEstudios", 0)
            }
        }, checkContratoBanco() {
            if (this.checkContratoBanco == true) {
                this.actualizarDocumentacion("estadoContratoBanco", 1)
            } else {
                this.actualizarDocumentacion("estadoContratoBanco", 0)
            }
        }, checkLibretaMar() {
            if (this.checkLibretaMar == true) {
                this.actualizarDocumentacion("estadoLibretaMar", 1)
            } else {
                this.actualizarDocumentacion("estadoLibretaMar", 0)
            }
        },
        checkLicencia() {
            if (this.checkLicencia == true) {
                this.actualizarDocumentacion("estadoLicencia", 1)
            } else {
                this.actualizarDocumentacion("estadoLicencia", 0)
            }
        },
        f01() {
            if (this.f01 == true) {
                this.actualizarExpediente("perfilPuestos", 1)
            } else {
                this.actualizarExpediente("perfilPuestos", 0)
            }
        },
        f04() {
            if (this.f04 == true) {
                this.actualizarExpediente("solicitudEmpleo", 1)
            } else {
                this.actualizarExpediente("solicitudEmpleo", 0)
            }
        }
        ,
        f05() {
            if (this.f05 == true) {
                this.actualizarExpediente("reporteEntrevistaAdmin", 1)
            } else {
                this.actualizarExpediente("reporteEntrevistaAdmin", 0)
            }
        }
        ,
        f06() {
            if (this.f06 == true) {
                this.actualizarExpediente("reporteEntrevistaOp", 1)
            } else {
                this.actualizarExpediente("reporteEntrevistaOp", 0)
            }
        }
        ,
        f07() {
            if (this.f07 == true) {
                this.actualizarExpediente("avisoRetencionesCredito", 1)
            } else {
                this.actualizarExpediente("avisoRetencionesCredito", 0)
            }
        }
        ,
        f09() {
            if (this.f09 == true) {
                this.actualizarExpediente("avisoPrivacidadSolicitante", 1)
            } else {
                this.actualizarExpediente("avisoPrivacidadSolicitante", 0)
            }
        },
        f10() {
            if (this.f10 == true) {
                this.actualizarExpediente("contratoDeterminado1", 1)
            } else {
                this.actualizarExpediente("contratoDeterminado1", 0)
            }
        },
        f100() {
            if (this.f100 == true) {
                this.actualizarExpediente("contratoDeterminado2", 1)
            } else {
                this.actualizarExpediente("contratoDeterminado2", 0)
            }
        },
        f11() {
            if (this.f11 == true) {
                this.actualizarExpediente("contratoIndeterminado", 1)
            } else {
                this.actualizarExpediente("contratoIndeterminado", 0)
            }
        },
        f12() {
            if (this.f12 == true) {
                this.actualizarExpediente("convenioConfi", 1)
            } else {
                this.actualizarExpediente("convenioConfi", 0)
            }
        },
        f13() {
            if (this.f13 == true) {
                this.actualizarExpediente("acuerdoAntidoping", 1)
            } else {
                this.actualizarExpediente("acuerdoAntidoping", 0)
            }
        },
        f15() {
            if (this.f15 == true) {
                this.actualizarExpediente("altaImms", 1)
            } else {
                this.actualizarExpediente("altaImms", 0)
            }
        },
        f18() {
            if (this.f18 == true) {
                this.actualizarExpediente("convenioTerminacionLaboral", 1)
            } else {
                this.actualizarExpediente("convenioTerminacionLaboral", 0)
            }
        },
        f19() {
            if (this.f19 == true) {
                this.actualizarExpediente("renunciaVoluntaria", 1)
            } else {
                this.actualizarExpediente("renunciaVoluntaria", 0)
            }
        },
        f21() {
            if (this.f21 == true) {
                this.actualizarExpediente("entregaDocumentacion", 1)
            } else {
                this.actualizarExpediente("entregaDocumentacion", 0)
            }
        },
        f22() {
            if (this.f22 == true) {
                this.actualizarExpediente("prestamoDocumentacion", 1)
            } else {
                this.actualizarExpediente("prestamoDocumentacion", 0)
            }
        },
        curpDoc() {
            if (this.curpDoc == null || this.curpDoc == '') {
                this.checkCurp = false
            } else {
                this.checkCurp = true
            }
        },
        rfcDoc() {
            if (this.rfcDoc == null || this.rfcDoc == '') {
                this.checkRFC = false
            } else {
                this.checkRFC = true
            }
        },
        nssDoc() {
            if (this.nssDoc == null || this.nssDoc == '') {
                this.checknss = false
            } else {
                this.checknss = true
            }
        },
        cartillaMilitarDoc() {
            if (this.cartillaMilitarDoc == null || this.cartillaMilitarDoc == '') {
                this.checkCartilla = false
            } else {
                this.checkCartilla = true
            }
        },
        ineDoc() {
            if (this.ineDoc == null || this.ineDoc == '') {
                this.checkIne = false
            } else {
                this.checkIne = true
            }
        },
        comprobanteDomicilioDoc() {
            if (this.comprobanteDomicilioDoc == null || this.comprobanteDomicilioDoc == '') {
                this.checkDomicilio = false
            } else {
                this.checkDomicilio = true
            }
        },
        actaNacimientoDoc() {
            if (this.actaNacimientoDoc == null || this.actaNacimientoDoc == '') {
                this.checkActaNacimiento = false
            } else {
                this.checkActaNacimiento = true
            }
        },
        comprobanteEstudiosDoc() {
            if (this.comprobanteEstudiosDoc == null || this.comprobanteEstudiosDoc == '') {
                this.checkCompranteEstudio = false
            } else {
                this.checkCompranteEstudio = true
            }
        },
        contratoBancoDoc() {
            if (this.contratoBancoDoc == null || this.contratoBancoDoc == '') {
                this.checkContratoBanco = false
            } else {
                this.checkContratoBanco = true
            }
        },
        licenciaDoc() {
            if (this.licenciaDoc == null || this.licenciaDoc == '') {
                this.checkLicencia = false
            } else {
                this.checkLicencia = true
            }
        },
        libretaMarDoc() {
            if (this.libretaMarDoc == null || this.libretaMarDoc == '') {
                this.checkLibretaMar = false
            } else {
                this.checkLibretaMar = true
            }
        },
        


        /* 
        checkCurp(){

        },
        checkRFC: false,
        checknss: false,
        checkCartilla: false,
        checkIne: false,
        checkDomicilio: false,
        checkActaNacimiento: false,
        checkCompranteEstudio: false,
        checkContratoBanco: false,
*/


    },
    methods:
    {
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
        //METODO PARA SOLICITUD DE EMPLEO Y ESTUDIO SOCIOECONOMICO 
        generarSolicitudEmpleo() {
            let self = this;
            //self.$refs.formEditarEmpleados.reset()
            axios.post(self.entorno + 'empleados/getEmpleadoInfo', {
                id: self.$route.params.id
            }).then(function (response) {
                //alert(response.data[0].nombre)
                //Campos de registro
                let puesto = response.data[0].puesto != 'null' || '' ? response.data[0].puesto : ''
                let sueldoDeseado = response.data[0].sueldoDeseado != 'null' || '' ? response.data[0].sueldoDeseado : ''

                let fechaIngreso = response.data[0].fechaIngreso != 'null' || '' ? response.data[0].fechaIngreso : ''
                let nombre = response.data[0].nombre != 'null' || '' ? response.data[0].nombre : ''
                let apellidoPaterno = response.data[0].apellidoPaterno != null ? response.data[0].apellidoPaterno : ''
                let apellidoMaterno = response.data[0].apellidoMaterno != 'null' || '' ? response.data[0].apellidoMaterno : ''
                let fraccColonia = response.data[0].fraccColonia != 'null' || '' ? response.data[0].fraccColonia : ''
                let codigoPostal = response.data[0].codigoPostal != 'null' || '' ? response.data[0].codigoPostal : ''
                let estadoNacimiento = response.data[0].estadoNacimiento != 'null' || '' ? response.data[0].estadoNacimiento : ''
                let calle = response.data[0].calle != 'null' || '' ? response.data[0].calle : ''
                let nExterior = response.data[0].nExterior != 'null' || '' ? response.data[0].nExterior : ''
                let nInterior = response.data[0].nInterior != 'null' || '' ? response.data[0].nInterior : ''
                let municipioNacimiento = response.data[0].municipioNacimiento != 'null' || '' ? response.data[0].municipioNacimiento : ''
                let yCalle = response.data[0].yCalle != 'null' || '' ? response.data[0].yCalle : ''
                let entreCalle = response.data[0].entreCalle != 'null' || '' ? response.data[0].entreCalle : ''
                let fechaNacimiento = response.data[0].fechaNacimiento != 'null' || '' ? response.data[0].fechaNacimiento : ''
                let lugarNacimiento = response.data[0].lugarNacimiento != 'null' || '' ? response.data[0].lugarNacimiento : ''

                let nacionalidad = response.data[0].nacionalidad != 'null' || '' ? response.data[0].nacionalidad : ''
                let nPasaporte = response.data[0].nPasaporte != 'null' || '' ? response.data[0].nPasaporte : ''
                let nCartilla = response.data[0].nCartilla != 'null' || '' ? response.data[0].nCartilla : ''
                let CURP = response.data[0].CURP != 'null' || '' ? response.data[0].CURP : ''
                let RFC = response.data[0].RFC != 'null' || '' ? response.data[0].RFC : ''

                let claveElector = response.data[0].claveElector != 'null' || '' ? response.data[0].claveElector : ''
                let NSS = response.data[0].NSS != 'null' || '' ? response.data[0].NSS : ''
                let afore = response.data[0].afore != 'null' || '' ? response.data[0].afore : ''
                let contactoEmergencia = response.data[0].contactoEmergencia != 'null' || '' ? response.data[0].contactoEmergencia : ''
                let numeroCE = response.data[0].numeroCE != 'null' || '' ? response.data[0].numeroCE : ''
                let parentescoCE = response.data[0].parentescoCE != 'null' || '' ? response.data[0].parentescoCE : ''
                let beneficiario = response.data[0].beneficiario != 'null' || '' ? response.data[0].beneficiario : ''
                let numeroBE = response.data[0].numeroBE != 'null' || '' ? response.data[0].numeroBE : ''
                let parentescoBE = response.data[0].parentescoBE != 'null' || '' ? response.data[0].parentescoBE : ''
                let tipoSangre = response.data[0].tipoSangre != 'null' || '' ? response.data[0].tipoSangre : ''

                let estatura = response.data[0].estatura != 'null' || '' ? response.data[0].estatura : ''
                let peso = response.data[0].peso != 'null' || '' ? response.data[0].peso : ''
                let numCreditoInfonavit = response.data[0].numCreditoInfonavit != 'null' || '' ? response.data[0].numCreditoInfonavit : ''
                let fuma = response.data[0].fuma != 'null' || '' ? response.data[0].fuma : ''
                let toma = response.data[0].toma != 'null' || '' ? response.data[0].toma : ''



                self.loadFile('src\\templatesDoc\\SolicitudDeEmpleoTemplate.docx', function (
                    error,
                    content
                ) {
                    if (error) {
                        throw error;
                    }
                    const zip = new PizZip(content);
                    const doc = new Docxtemplater(zip, { paragraphLoop: true, linebreaks: true });
                    let nombreMayus = nombre.toUpperCase();
                    let apellidoPaternoMayus = apellidoPaterno.toUpperCase();
                    let apellidoMaternoMayus = apellidoMaterno.toUpperCase();
                    doc.setData({
                        puesto: puesto,
                        sueldoDeseado: sueldoDeseado,
                        nombre: nombreMayus,
                        apellidoPaterno: apellidoPaternoMayus,
                        apellidoMaterno: apellidoMaternoMayus,
                        fechaIngreso: fechaIngreso,
                        fraccColonia: fraccColonia,
                        codigoPostal: codigoPostal,
                        municipioNacimiento: municipioNacimiento,
                        estadoNacimiento: estadoNacimiento,
                        calle: calle,
                        nExterior: nExterior,
                        nInterior: nInterior,
                        yCalle: yCalle,
                        entreCalle: entreCalle,
                        fechaNacimiento: fechaNacimiento,
                        lugarNacimiento: lugarNacimiento,
                        nacionalidad: nacionalidad,
                        nPasaporte: nPasaporte,
                        nCartilla: nCartilla,
                        CURP: CURP,
                        claveElector: claveElector,
                        NSS: NSS,
                        RFC: RFC,
                        afore: afore,
                        contactoEmergencia: contactoEmergencia,
                        numeroCE: numeroCE,
                        parentescoCE: parentescoCE,
                        beneficiario: beneficiario,
                        numeroBE: numeroBE,
                        parentescoBE: parentescoBE,
                        tipoSangre: tipoSangre,
                        estatura: estatura,
                        peso: peso,
                        numCreditoInfonavit: numCreditoInfonavit,
                        fuma: fuma,
                        toma: toma,
                    });
                    try {
                        // render the document (replace all occurences of {first_name} by John, {last_name} by Doe, ...)
                        doc.render();
                    } catch (error) {
                        // The error thrown here contains additional information when logged with JSON.stringify (it contains a properties object containing all suberrors).
                        function replaceErrors(key, value) {
                            if (value instanceof Error) {
                                return Object.getOwnPropertyNames(value).reduce(function (
                                    error,
                                    key
                                ) {
                                    error[key] = value[key];
                                    return error;
                                },
                                    {});
                            }
                            return value;
                        }
                        console.log(JSON.stringify({ error: error }, replaceErrors));

                        if (error.properties && error.properties.errors instanceof Array) {
                            const errorMessages = error.properties.errors
                                .map(function (error) {
                                    return error.properties.explanation;
                                })
                                .join("\n");
                            console.log("errorMessages", errorMessages);
                            // errorMessages is a humanly readable message looking like this :
                            // 'The tag beginning with "foobar" is unopened'
                        }
                        throw error;
                    }
                    const out = doc.getZip().generate({
                        type: "blob",
                        mimeType:
                            "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                    });
                    // Output the document using Data-URI
                    saveAs(out, "SolicituddeEmpleo -" + nombre + ".docx");
                });


            })

        },
        //METODO PARA AVISO DE RETENCIONES POR CRÉDITO
        generarAvisoRetenciones() {
            let self = this;
            //self.$refs.formEditarEmpleados.reset()
            axios.post(self.entorno + 'empleados/getEmpleadoInfo', {
                id: self.$route.params.id
            }).then(function (response) {
                //alert(response.data[0].nombre)
                //Campos de registro
                let puesto = response.data[0].puesto != 'null' || '' ? response.data[0].puesto : ''
                let sueldoDeseado = response.data[0].sueldoDeseado != 'null' || '' ? response.data[0].sueldoDeseado : ''

                let fechaIngreso = response.data[0].fechaIngreso != 'null' || '' ? response.data[0].fechaIngreso : ''
                let nombre = response.data[0].nombre != 'null' || '' ? response.data[0].nombre : ''
                let apellidoPaterno = response.data[0].apellidoPaterno != null ? response.data[0].apellidoPaterno : ''
                let apellidoMaterno = response.data[0].apellidoMaterno != 'null' || '' ? response.data[0].apellidoMaterno : ''
                let fraccColonia = response.data[0].fraccColonia != 'null' || '' ? response.data[0].fraccColonia : ''
                let codigoPostal = response.data[0].codigoPostal != 'null' || '' ? response.data[0].codigoPostal : ''
                let estadoNacimiento = response.data[0].estadoNacimiento != 'null' || '' ? response.data[0].estadoNacimiento : ''
                let calle = response.data[0].calle != 'null' || '' ? response.data[0].calle : ''
                let nExterior = response.data[0].nExterior != 'null' || '' ? response.data[0].nExterior : ''
                let nInterior = response.data[0].nInterior != 'null' || '' ? response.data[0].nInterior : ''
                let municipioNacimiento = response.data[0].municipioNacimiento != 'null' || '' ? response.data[0].municipioNacimiento : ''
                let yCalle = response.data[0].yCalle != 'null' || '' ? response.data[0].yCalle : ''
                let entreCalle = response.data[0].entreCalle != 'null' || '' ? response.data[0].entreCalle : ''
                let fechaNacimiento = response.data[0].fechaNacimiento != 'null' || '' ? response.data[0].fechaNacimiento : ''
                let lugarNacimiento = response.data[0].lugarNacimiento != 'null' || '' ? response.data[0].lugarNacimiento : ''

                let nacionalidad = response.data[0].nacionalidad != 'null' || '' ? response.data[0].nacionalidad : ''
                let nPasaporte = response.data[0].nPasaporte != 'null' || '' ? response.data[0].nPasaporte : ''
                let nCartilla = response.data[0].nCartilla != 'null' || '' ? response.data[0].nCartilla : ''
                let CURP = response.data[0].CURP != 'null' || '' ? response.data[0].CURP : ''
                let RFC = response.data[0].RFC != 'null' || '' ? response.data[0].RFC : ''

                let claveElector = response.data[0].claveElector != 'null' || '' ? response.data[0].claveElector : ''
                let NSS = response.data[0].NSS != 'null' || '' ? response.data[0].NSS : ''
                let afore = response.data[0].afore != 'null' || '' ? response.data[0].afore : ''
                let contactoEmergencia = response.data[0].contactoEmergencia != 'null' || '' ? response.data[0].contactoEmergencia : ''
                let numeroCE = response.data[0].numeroCE != 'null' || '' ? response.data[0].numeroCE : ''
                let parentescoCE = response.data[0].parentescoCE != 'null' || '' ? response.data[0].parentescoCE : ''
                let beneficiario = response.data[0].beneficiario != 'null' || '' ? response.data[0].beneficiario : ''
                let numeroBE = response.data[0].numeroBE != 'null' || '' ? response.data[0].numeroBE : ''
                let parentescoBE = response.data[0].parentescoBE != 'null' || '' ? response.data[0].parentescoBE : ''
                let tipoSangre = response.data[0].tipoSangre != 'null' || '' ? response.data[0].tipoSangre : ''

                let estatura = response.data[0].estatura != 'null' || '' ? response.data[0].estatura : ''
                let peso = response.data[0].peso != 'null' || '' ? response.data[0].peso : ''
                let numCreditoInfonavit = response.data[0].numCreditoInfonavit != 'null' || '' ? response.data[0].numCreditoInfonavit : ''
                let fuma = response.data[0].fuma != 'null' || '' ? response.data[0].fuma : ''
                let toma = response.data[0].toma != 'null' || '' ? response.data[0].toma : ''



                self.loadFile('src\\templatesDoc\\AvisoRetencionCreditoTemplate.docx', function (
                    error,
                    content
                ) {
                    if (error) {
                        throw error;
                    }
                    const zip = new PizZip(content);
                    const doc = new Docxtemplater(zip, { paragraphLoop: true, linebreaks: true });
                    let nombreMayus = nombre.toUpperCase();
                    let apellidoPaternoMayus = apellidoPaterno.toUpperCase();
                    let apellidoMaternoMayus = apellidoMaterno.toUpperCase();
                    doc.setData({
                        puesto: puesto,
                        sueldoDeseado: sueldoDeseado,
                        nombre: nombreMayus,
                        apellidoPaterno: apellidoPaternoMayus,
                        apellidoMaterno: apellidoMaternoMayus,
                        fechaIngreso: fechaIngreso,
                        fraccColonia: fraccColonia,
                        codigoPostal: codigoPostal,
                        municipioNacimiento: municipioNacimiento,
                        estadoNacimiento: estadoNacimiento,
                        calle: calle,
                        nExterior: nExterior,
                        nInterior: nInterior,
                        yCalle: yCalle,
                        entreCalle: entreCalle,
                        fechaNacimiento: fechaNacimiento,
                        lugarNacimiento: lugarNacimiento,
                        nacionalidad: nacionalidad,
                        nPasaporte: nPasaporte,
                        nCartilla: nCartilla,
                        CURP: CURP,
                        claveElector: claveElector,
                        NSS: NSS,
                        RFC: RFC,
                        afore: afore,
                        contactoEmergencia: contactoEmergencia,
                        numeroCE: numeroCE,
                        parentescoCE: parentescoCE,
                        beneficiario: beneficiario,
                        numeroBE: numeroBE,
                        parentescoBE: parentescoBE,
                        tipoSangre: tipoSangre,
                        estatura: estatura,
                        peso: peso,
                        numCreditoInfonavit: numCreditoInfonavit,
                        fuma: fuma,
                        toma: toma,
                    });
                    try {
                        // render the document (replace all occurences of {first_name} by John, {last_name} by Doe, ...)
                        doc.render();
                    } catch (error) {
                        // The error thrown here contains additional information when logged with JSON.stringify (it contains a properties object containing all suberrors).
                        function replaceErrors(key, value) {
                            if (value instanceof Error) {
                                return Object.getOwnPropertyNames(value).reduce(function (
                                    error,
                                    key
                                ) {
                                    error[key] = value[key];
                                    return error;
                                },
                                    {});
                            }
                            return value;
                        }
                        console.log(JSON.stringify({ error: error }, replaceErrors));

                        if (error.properties && error.properties.errors instanceof Array) {
                            const errorMessages = error.properties.errors
                                .map(function (error) {
                                    return error.properties.explanation;
                                })
                                .join("\n");
                            console.log("errorMessages", errorMessages);
                            // errorMessages is a humanly readable message looking like this :
                            // 'The tag beginning with "foobar" is unopened'
                        }
                        throw error;
                    }
                    const out = doc.getZip().generate({
                        type: "blob",
                        mimeType:
                            "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                    });
                    // Output the document using Data-URI
                    saveAs(out, "AvisoRetencionCredito -" + nombre + ".docx");
                });


            })

        },
        //METODO AVISO PRIVACIDAD SOLICITANTE DE EMPLEO
        generarAvisoPrivacidadEmpleo() {
            let self = this;
            //self.$refs.formEditarEmpleados.reset()
            axios.post(self.entorno + 'empleados/getEmpleadoInfo', {
                id: self.$route.params.id
            }).then(function (response) {
                //alert(response.data[0].nombre)
                //Campos de registro
                let puesto = response.data[0].puesto != 'null' || '' ? response.data[0].puesto : ''
                let sueldoDeseado = response.data[0].sueldoDeseado != 'null' || '' ? response.data[0].sueldoDeseado : ''

                let fechaIngreso = response.data[0].fechaIngreso != 'null' || '' ? response.data[0].fechaIngreso : ''
                let nombre = response.data[0].nombre != 'null' || '' ? response.data[0].nombre : ''
                let apellidoPaterno = response.data[0].apellidoPaterno != null ? response.data[0].apellidoPaterno : ''
                let apellidoMaterno = response.data[0].apellidoMaterno != 'null' || '' ? response.data[0].apellidoMaterno : ''
                let fraccColonia = response.data[0].fraccColonia != 'null' || '' ? response.data[0].fraccColonia : ''
                let codigoPostal = response.data[0].codigoPostal != 'null' || '' ? response.data[0].codigoPostal : ''
                let estadoNacimiento = response.data[0].estadoNacimiento != 'null' || '' ? response.data[0].estadoNacimiento : ''
                let calle = response.data[0].calle != 'null' || '' ? response.data[0].calle : ''
                let nExterior = response.data[0].nExterior != 'null' || '' ? response.data[0].nExterior : ''
                let nInterior = response.data[0].nInterior != 'null' || '' ? response.data[0].nInterior : ''
                let municipioNacimiento = response.data[0].municipioNacimiento != 'null' || '' ? response.data[0].municipioNacimiento : ''
                let yCalle = response.data[0].yCalle != 'null' || '' ? response.data[0].yCalle : ''
                let entreCalle = response.data[0].entreCalle != 'null' || '' ? response.data[0].entreCalle : ''
                let fechaNacimiento = response.data[0].fechaNacimiento != 'null' || '' ? response.data[0].fechaNacimiento : ''
                let lugarNacimiento = response.data[0].lugarNacimiento != 'null' || '' ? response.data[0].lugarNacimiento : ''

                let nacionalidad = response.data[0].nacionalidad != 'null' || '' ? response.data[0].nacionalidad : ''
                let nPasaporte = response.data[0].nPasaporte != 'null' || '' ? response.data[0].nPasaporte : ''
                let nCartilla = response.data[0].nCartilla != 'null' || '' ? response.data[0].nCartilla : ''
                let CURP = response.data[0].CURP != 'null' || '' ? response.data[0].CURP : ''
                let RFC = response.data[0].RFC != 'null' || '' ? response.data[0].RFC : ''

                let claveElector = response.data[0].claveElector != 'null' || '' ? response.data[0].claveElector : ''
                let NSS = response.data[0].NSS != 'null' || '' ? response.data[0].NSS : ''
                let afore = response.data[0].afore != 'null' || '' ? response.data[0].afore : ''
                let contactoEmergencia = response.data[0].contactoEmergencia != 'null' || '' ? response.data[0].contactoEmergencia : ''
                let numeroCE = response.data[0].numeroCE != 'null' || '' ? response.data[0].numeroCE : ''
                let parentescoCE = response.data[0].parentescoCE != 'null' || '' ? response.data[0].parentescoCE : ''
                let beneficiario = response.data[0].beneficiario != 'null' || '' ? response.data[0].beneficiario : ''
                let numeroBE = response.data[0].numeroBE != 'null' || '' ? response.data[0].numeroBE : ''
                let parentescoBE = response.data[0].parentescoBE != 'null' || '' ? response.data[0].parentescoBE : ''
                let tipoSangre = response.data[0].tipoSangre != 'null' || '' ? response.data[0].tipoSangre : ''

                let estatura = response.data[0].estatura != 'null' || '' ? response.data[0].estatura : ''
                let peso = response.data[0].peso != 'null' || '' ? response.data[0].peso : ''
                let numCreditoInfonavit = response.data[0].numCreditoInfonavit != 'null' || '' ? response.data[0].numCreditoInfonavit : ''
                let fuma = response.data[0].fuma != 'null' || '' ? response.data[0].fuma : ''
                let toma = response.data[0].toma != 'null' || '' ? response.data[0].toma : ''



                self.loadFile('src\\templatesDoc\\AvisoPrivacidadSolicitanteEmpleoTemplate.docx', function (
                    error,
                    content
                ) {
                    if (error) {
                        throw error;
                    }
                    const zip = new PizZip(content);
                    const doc = new Docxtemplater(zip, { paragraphLoop: true, linebreaks: true });
                    let nombreMayus = nombre.toUpperCase();
                    let apellidoPaternoMayus = apellidoPaterno.toUpperCase();
                    let apellidoMaternoMayus = apellidoMaterno.toUpperCase();
                    doc.setData({
                        puesto: puesto,
                        sueldoDeseado: sueldoDeseado,
                        nombre: nombreMayus,
                        apellidoPaterno: apellidoPaternoMayus,
                        apellidoMaterno: apellidoMaternoMayus,
                        fechaIngreso: fechaIngreso,
                        fraccColonia: fraccColonia,
                        codigoPostal: codigoPostal,
                        municipioNacimiento: municipioNacimiento,
                        estadoNacimiento: estadoNacimiento,
                        calle: calle,
                        nExterior: nExterior,
                        nInterior: nInterior,
                        yCalle: yCalle,
                        entreCalle: entreCalle,
                        fechaNacimiento: fechaNacimiento,
                        lugarNacimiento: lugarNacimiento,
                        nacionalidad: nacionalidad,
                        nPasaporte: nPasaporte,
                        nCartilla: nCartilla,
                        CURP: CURP,
                        claveElector: claveElector,
                        NSS: NSS,
                        RFC: RFC,
                        afore: afore,
                        contactoEmergencia: contactoEmergencia,
                        numeroCE: numeroCE,
                        parentescoCE: parentescoCE,
                        beneficiario: beneficiario,
                        numeroBE: numeroBE,
                        parentescoBE: parentescoBE,
                        tipoSangre: tipoSangre,
                        estatura: estatura,
                        peso: peso,
                        numCreditoInfonavit: numCreditoInfonavit,
                        fuma: fuma,
                        toma: toma,
                    });
                    try {
                        // render the document (replace all occurences of {first_name} by John, {last_name} by Doe, ...)
                        doc.render();
                    } catch (error) {
                        // The error thrown here contains additional information when logged with JSON.stringify (it contains a properties object containing all suberrors).
                        function replaceErrors(key, value) {
                            if (value instanceof Error) {
                                return Object.getOwnPropertyNames(value).reduce(function (
                                    error,
                                    key
                                ) {
                                    error[key] = value[key];
                                    return error;
                                },
                                    {});
                            }
                            return value;
                        }
                        console.log(JSON.stringify({ error: error }, replaceErrors));

                        if (error.properties && error.properties.errors instanceof Array) {
                            const errorMessages = error.properties.errors
                                .map(function (error) {
                                    return error.properties.explanation;
                                })
                                .join("\n");
                            console.log("errorMessages", errorMessages);
                            // errorMessages is a humanly readable message looking like this :
                            // 'The tag beginning with "foobar" is unopened'
                        }
                        throw error;
                    }
                    const out = doc.getZip().generate({
                        type: "blob",
                        mimeType:
                            "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                    });
                    // Output the document using Data-URI
                    saveAs(out, "AvisoRetencionCredito -" + nombre + ".docx");
                });


            })

        },
        //METODO PARA CONVENIO CONFIDENCIALIDAD LABORAL 
        generarConvenioConfidencialidadLaboral() {
            let self = this;
            //self.$refs.formEditarEmpleados.reset()
            axios.post(self.entorno + 'empleados/getEmpleadoInfo', {
                id: self.$route.params.id
            }).then(function (response) {
                //alert(response.data[0].nombre)
                //Campos de registro
                let puesto = response.data[0].puesto != 'null' || '' ? response.data[0].puesto : ''
                let sueldoDeseado = response.data[0].sueldoDeseado != 'null' || '' ? response.data[0].sueldoDeseado : ''

                let fechaIngreso = response.data[0].fechaIngreso != 'null' || '' ? response.data[0].fechaIngreso : ''
                let nombre = response.data[0].nombre != 'null' || '' ? response.data[0].nombre : ''
                let apellidoPaterno = response.data[0].apellidoPaterno != null ? response.data[0].apellidoPaterno : ''
                let apellidoMaterno = response.data[0].apellidoMaterno != 'null' || '' ? response.data[0].apellidoMaterno : ''
                let fraccColonia = response.data[0].fraccColonia != 'null' || '' ? response.data[0].fraccColonia : ''
                let codigoPostal = response.data[0].codigoPostal != 'null' || '' ? response.data[0].codigoPostal : ''
                let estadoNacimiento = response.data[0].estadoNacimiento != 'null' || '' ? response.data[0].estadoNacimiento : ''
                let calle = response.data[0].calle != 'null' || '' ? response.data[0].calle : ''
                let nExterior = response.data[0].nExterior != 'null' || '' ? response.data[0].nExterior : ''
                let nInterior = response.data[0].nInterior != 'null' || '' ? response.data[0].nInterior : ''
                let municipioNacimiento = response.data[0].municipioNacimiento != 'null' || '' ? response.data[0].municipioNacimiento : ''
                let yCalle = response.data[0].yCalle != 'null' || '' ? response.data[0].yCalle : ''
                let entreCalle = response.data[0].entreCalle != 'null' || '' ? response.data[0].entreCalle : ''
                let fechaNacimiento = response.data[0].fechaNacimiento != 'null' || '' ? response.data[0].fechaNacimiento : ''
                let lugarNacimiento = response.data[0].lugarNacimiento != 'null' || '' ? response.data[0].lugarNacimiento : ''

                let nacionalidad = response.data[0].nacionalidad != 'null' || '' ? response.data[0].nacionalidad : ''
                let nPasaporte = response.data[0].nPasaporte != 'null' || '' ? response.data[0].nPasaporte : ''
                let nCartilla = response.data[0].nCartilla != 'null' || '' ? response.data[0].nCartilla : ''
                let CURP = response.data[0].CURP != 'null' || '' ? response.data[0].CURP : ''
                let RFC = response.data[0].RFC != 'null' || '' ? response.data[0].RFC : ''

                let claveElector = response.data[0].claveElector != 'null' || '' ? response.data[0].claveElector : ''
                let NSS = response.data[0].NSS != 'null' || '' ? response.data[0].NSS : ''
                let afore = response.data[0].afore != 'null' || '' ? response.data[0].afore : ''
                let contactoEmergencia = response.data[0].contactoEmergencia != 'null' || '' ? response.data[0].contactoEmergencia : ''
                let numeroCE = response.data[0].numeroCE != 'null' || '' ? response.data[0].numeroCE : ''
                let parentescoCE = response.data[0].parentescoCE != 'null' || '' ? response.data[0].parentescoCE : ''
                let beneficiario = response.data[0].beneficiario != 'null' || '' ? response.data[0].beneficiario : ''
                let numeroBE = response.data[0].numeroBE != 'null' || '' ? response.data[0].numeroBE : ''
                let parentescoBE = response.data[0].parentescoBE != 'null' || '' ? response.data[0].parentescoBE : ''
                let tipoSangre = response.data[0].tipoSangre != 'null' || '' ? response.data[0].tipoSangre : ''

                let estatura = response.data[0].estatura != 'null' || '' ? response.data[0].estatura : ''
                let peso = response.data[0].peso != 'null' || '' ? response.data[0].peso : ''
                let numCreditoInfonavit = response.data[0].numCreditoInfonavit != 'null' || '' ? response.data[0].numCreditoInfonavit : ''
                let fuma = response.data[0].fuma != 'null' || '' ? response.data[0].fuma : ''
                let toma = response.data[0].toma != 'null' || '' ? response.data[0].toma : ''



                self.loadFile('src\\templatesDoc\\ConvenioConfidencialidadLaboralTemplate.docx', function (
                    error,
                    content
                ) {
                    if (error) {
                        throw error;
                    }
                    const zip = new PizZip(content);
                    const doc = new Docxtemplater(zip, { paragraphLoop: true, linebreaks: true });
                    let nombreMayus = nombre.toUpperCase();
                    let apellidoPaternoMayus = apellidoPaterno.toUpperCase();
                    let apellidoMaternoMayus = apellidoMaterno.toUpperCase();
                    doc.setData({
                        puesto: puesto,
                        sueldoDeseado: sueldoDeseado,
                        nombre: nombreMayus,
                        apellidoPaterno: apellidoPaternoMayus,
                        apellidoMaterno: apellidoMaternoMayus,
                        fechaIngreso: fechaIngreso,
                        fraccColonia: fraccColonia,
                        codigoPostal: codigoPostal,
                        municipioNacimiento: municipioNacimiento,
                        estadoNacimiento: estadoNacimiento,
                        calle: calle,
                        nExterior: nExterior,
                        nInterior: nInterior,
                        yCalle: yCalle,
                        entreCalle: entreCalle,
                        fechaNacimiento: fechaNacimiento,
                        lugarNacimiento: lugarNacimiento,
                        nacionalidad: nacionalidad,
                        nPasaporte: nPasaporte,
                        nCartilla: nCartilla,
                        CURP: CURP,
                        claveElector: claveElector,
                        NSS: NSS,
                        RFC: RFC,
                        afore: afore,
                        contactoEmergencia: contactoEmergencia,
                        numeroCE: numeroCE,
                        parentescoCE: parentescoCE,
                        beneficiario: beneficiario,
                        numeroBE: numeroBE,
                        parentescoBE: parentescoBE,
                        tipoSangre: tipoSangre,
                        estatura: estatura,
                        peso: peso,
                        numCreditoInfonavit: numCreditoInfonavit,
                        fuma: fuma,
                        toma: toma,
                    });
                    try {
                        // render the document (replace all occurences of {first_name} by John, {last_name} by Doe, ...)
                        doc.render();
                    } catch (error) {
                        // The error thrown here contains additional information when logged with JSON.stringify (it contains a properties object containing all suberrors).
                        function replaceErrors(key, value) {
                            if (value instanceof Error) {
                                return Object.getOwnPropertyNames(value).reduce(function (
                                    error,
                                    key
                                ) {
                                    error[key] = value[key];
                                    return error;
                                },
                                    {});
                            }
                            return value;
                        }
                        console.log(JSON.stringify({ error: error }, replaceErrors));

                        if (error.properties && error.properties.errors instanceof Array) {
                            const errorMessages = error.properties.errors
                                .map(function (error) {
                                    return error.properties.explanation;
                                })
                                .join("\n");
                            console.log("errorMessages", errorMessages);
                            // errorMessages is a humanly readable message looking like this :
                            // 'The tag beginning with "foobar" is unopened'
                        }
                        throw error;
                    }
                    const out = doc.getZip().generate({
                        type: "blob",
                        mimeType:
                            "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                    });
                    // Output the document using Data-URI
                    saveAs(out, "ConvenioConfidencialidadLaboral -" + nombre + ".docx");
                });


            })

        },
        //METODO PARA ACUERDO DE AUTORIZACIONES DE PRUEBA ANTIDOPING
        generarAcuerdoPruebaAntidoping() {
            let self = this;
            //self.$refs.formEditarEmpleados.reset()
            axios.post(self.entorno + 'empleados/getEmpleadoInfo', {
                id: self.$route.params.id
            }).then(function (response) {
                //alert(response.data[0].nombre)
                //Campos de registro
                let puesto = response.data[0].puesto != 'null' || '' ? response.data[0].puesto : ''
                let sueldoDeseado = response.data[0].sueldoDeseado != 'null' || '' ? response.data[0].sueldoDeseado : ''

                let fechaIngreso = response.data[0].fechaIngreso != 'null' || '' ? response.data[0].fechaIngreso : ''
                let nombre = response.data[0].nombre != 'null' || '' ? response.data[0].nombre : ''
                let apellidoPaterno = response.data[0].apellidoPaterno != null ? response.data[0].apellidoPaterno : ''
                let apellidoMaterno = response.data[0].apellidoMaterno != 'null' || '' ? response.data[0].apellidoMaterno : ''
                let fraccColonia = response.data[0].fraccColonia != 'null' || '' ? response.data[0].fraccColonia : ''
                let codigoPostal = response.data[0].codigoPostal != 'null' || '' ? response.data[0].codigoPostal : ''
                let ciudad = response.data[0].ciudad != 'null' || '' ? response.data[0].ciudad : ''
                let calle = response.data[0].calle != 'null' || '' ? response.data[0].calle : ''
                let nExterior = response.data[0].nExterior != 'null' || '' ? response.data[0].nExterior : ''
                let nInterior = response.data[0].nInterior != 'null' || '' ? response.data[0].nInterior : ''
                let municipioNacimiento = response.data[0].municipioNacimiento != 'null' || '' ? response.data[0].municipioNacimiento : ''
                let yCalle = response.data[0].yCalle != 'null' || '' ? response.data[0].yCalle : ''
                let entreCalle = response.data[0].entreCalle != 'null' || '' ? response.data[0].entreCalle : ''
                let fechaNacimiento = response.data[0].fechaNacimiento != 'null' || '' ? response.data[0].fechaNacimiento : ''
                let lugarNacimiento = response.data[0].lugarNacimiento != 'null' || '' ? response.data[0].lugarNacimiento : ''

                let nacionalidad = response.data[0].nacionalidad != 'null' || '' ? response.data[0].nacionalidad : ''
                let nPasaporte = response.data[0].nPasaporte != 'null' || '' ? response.data[0].nPasaporte : ''
                let nCartilla = response.data[0].nCartilla != 'null' || '' ? response.data[0].nCartilla : ''
                let CURP = response.data[0].CURP != 'null' || '' ? response.data[0].CURP : ''
                let RFC = response.data[0].RFC != 'null' || '' ? response.data[0].RFC : ''

                let claveElector = response.data[0].claveElector != 'null' || '' ? response.data[0].claveElector : ''
                let NSS = response.data[0].NSS != 'null' || '' ? response.data[0].NSS : ''
                let afore = response.data[0].afore != 'null' || '' ? response.data[0].afore : ''
                let contactoEmergencia = response.data[0].contactoEmergencia != 'null' || '' ? response.data[0].contactoEmergencia : ''
                let numeroCE = response.data[0].numeroCE != 'null' || '' ? response.data[0].numeroCE : ''
                let parentescoCE = response.data[0].parentescoCE != 'null' || '' ? response.data[0].parentescoCE : ''
                let beneficiario = response.data[0].beneficiario != 'null' || '' ? response.data[0].beneficiario : ''
                let numeroBE = response.data[0].numeroBE != 'null' || '' ? response.data[0].numeroBE : ''
                let parentescoBE = response.data[0].parentescoBE != 'null' || '' ? response.data[0].parentescoBE : ''
                let tipoSangre = response.data[0].tipoSangre != 'null' || '' ? response.data[0].tipoSangre : ''

                let estatura = response.data[0].estatura != 'null' || '' ? response.data[0].estatura : ''
                let peso = response.data[0].peso != 'null' || '' ? response.data[0].peso : ''
                let numCreditoInfonavit = response.data[0].numCreditoInfonavit != 'null' || '' ? response.data[0].numCreditoInfonavit : ''
                let fuma = response.data[0].fuma != 'null' || '' ? response.data[0].fuma : ''
                let toma = response.data[0].toma != 'null' || '' ? response.data[0].toma : ''



                self.loadFile('src\\templatesDoc\\AcuerdoAutPruebaAntidopingTemplate.docx', function (
                    error,
                    content
                ) {
                    if (error) {
                        throw error;
                    }
                    const zip = new PizZip(content);
                    const doc = new Docxtemplater(zip, { paragraphLoop: true, linebreaks: true });
                    let nombreMayus = nombre.toUpperCase();
                    let apellidoPaternoMayus = apellidoPaterno.toUpperCase();
                    let apellidoMaternoMayus = apellidoMaterno.toUpperCase();
                    doc.setData({
                        puesto: puesto,
                        sueldoDeseado: sueldoDeseado,
                        nombre: nombreMayus,
                        apellidoPaterno: apellidoPaternoMayus,
                        apellidoMaterno: apellidoMaternoMayus,
                        fechaIngreso: fechaIngreso,
                        fraccColonia: fraccColonia,
                        codigoPostal: codigoPostal,
                        municipioNacimiento: municipioNacimiento,
                        ciudad: ciudad,
                        calle: calle,
                        nExterior: nExterior,
                        nInterior: nInterior,
                        yCalle: yCalle,
                        entreCalle: entreCalle,
                        fechaNacimiento: fechaNacimiento,
                        lugarNacimiento: lugarNacimiento,
                        nacionalidad: nacionalidad,
                        nPasaporte: nPasaporte,
                        nCartilla: nCartilla,
                        CURP: CURP,
                        claveElector: claveElector,
                        NSS: NSS,
                        RFC: RFC,
                        afore: afore,
                        contactoEmergencia: contactoEmergencia,
                        numeroCE: numeroCE,
                        parentescoCE: parentescoCE,
                        beneficiario: beneficiario,
                        numeroBE: numeroBE,
                        parentescoBE: parentescoBE,
                        tipoSangre: tipoSangre,
                        estatura: estatura,
                        peso: peso,
                        numCreditoInfonavit: numCreditoInfonavit,
                        fuma: fuma,
                        toma: toma,
                    });
                    try {
                        // render the document (replace all occurences of {first_name} by John, {last_name} by Doe, ...)
                        doc.render();
                    } catch (error) {
                        // The error thrown here contains additional information when logged with JSON.stringify (it contains a properties object containing all suberrors).
                        function replaceErrors(key, value) {
                            if (value instanceof Error) {
                                return Object.getOwnPropertyNames(value).reduce(function (
                                    error,
                                    key
                                ) {
                                    error[key] = value[key];
                                    return error;
                                },
                                    {});
                            }
                            return value;
                        }
                        console.log(JSON.stringify({ error: error }, replaceErrors));

                        if (error.properties && error.properties.errors instanceof Array) {
                            const errorMessages = error.properties.errors
                                .map(function (error) {
                                    return error.properties.explanation;
                                })
                                .join("\n");
                            console.log("errorMessages", errorMessages);
                            // errorMessages is a humanly readable message looking like this :
                            // 'The tag beginning with "foobar" is unopened'
                        }
                        throw error;
                    }
                    const out = doc.getZip().generate({
                        type: "blob",
                        mimeType:
                            "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                    });
                    // Output the document using Data-URI
                    saveAs(out, "AcuerdoAutorizacionesAntidoping-" + nombre + ".docx");
                });


            })

        },
        //METODO SOLICITUD DE ALTA IMSS
        generarSolicitudAltaImss() {
            let self = this;
            //self.$refs.formEditarEmpleados.reset()
            axios.post(self.entorno + 'empleados/getEmpleadoInfo', {
                id: self.$route.params.id
            }).then(function (response) {
                //alert(response.data[0].nombre)
                //Campos de registro
                let puesto = response.data[0].puesto != 'null' || '' ? response.data[0].puesto : ''
                let sueldoDeseado = response.data[0].sueldoDeseado != 'null' || '' ? response.data[0].sueldoDeseado : ''

                let fechaIngreso = response.data[0].fechaIngreso != 'null' || '' ? response.data[0].fechaIngreso : ''
                let nombre = response.data[0].nombre != 'null' || '' ? response.data[0].nombre : ''
                let apellidoPaterno = response.data[0].apellidoPaterno != null ? response.data[0].apellidoPaterno : ''
                let apellidoMaterno = response.data[0].apellidoMaterno != 'null' || '' ? response.data[0].apellidoMaterno : ''
                let fraccColonia = response.data[0].fraccColonia != 'null' || '' ? response.data[0].fraccColonia : ''
                let codigoPostal = response.data[0].codigoPostal != 'null' || '' ? response.data[0].codigoPostal : ''
                let ciudad = response.data[0].ciudad != 'null' || '' ? response.data[0].ciudad : ''
                let calle = response.data[0].calle != 'null' || '' ? response.data[0].calle : ''
                let nExterior = response.data[0].nExterior != 'null' || '' ? response.data[0].nExterior : ''
                let nInterior = response.data[0].nInterior != 'null' || '' ? response.data[0].nInterior : ''
                let municipioNacimiento = response.data[0].municipioNacimiento != 'null' || '' ? response.data[0].municipioNacimiento : ''
                let yCalle = response.data[0].yCalle != 'null' || '' ? response.data[0].yCalle : ''
                let entreCalle = response.data[0].entreCalle != 'null' || '' ? response.data[0].entreCalle : ''
                let fechaNacimiento = response.data[0].fechaNacimiento != 'null' || '' ? response.data[0].fechaNacimiento : ''
                let lugarNacimiento = response.data[0].lugarNacimiento != 'null' || '' ? response.data[0].lugarNacimiento : ''

                let nacionalidad = response.data[0].nacionalidad != 'null' || '' ? response.data[0].nacionalidad : ''
                let nPasaporte = response.data[0].nPasaporte != 'null' || '' ? response.data[0].nPasaporte : ''
                let nCartilla = response.data[0].nCartilla != 'null' || '' ? response.data[0].nCartilla : ''
                let CURP = response.data[0].CURP != 'null' || '' ? response.data[0].CURP : ''
                let RFC = response.data[0].RFC != 'null' || '' ? response.data[0].RFC : ''

                let claveElector = response.data[0].claveElector != 'null' || '' ? response.data[0].claveElector : ''
                let NSS = response.data[0].NSS != 'null' || '' ? response.data[0].NSS : ''
                let afore = response.data[0].afore != 'null' || '' ? response.data[0].afore : ''
                let contactoEmergencia = response.data[0].contactoEmergencia != 'null' || '' ? response.data[0].contactoEmergencia : ''
                let numeroCE = response.data[0].numeroCE != 'null' || '' ? response.data[0].numeroCE : ''
                let parentescoCE = response.data[0].parentescoCE != 'null' || '' ? response.data[0].parentescoCE : ''
                let beneficiario = response.data[0].beneficiario != 'null' || '' ? response.data[0].beneficiario : ''
                let numeroBE = response.data[0].numeroBE != 'null' || '' ? response.data[0].numeroBE : ''
                let parentescoBE = response.data[0].parentescoBE != 'null' || '' ? response.data[0].parentescoBE : ''
                let tipoSangre = response.data[0].tipoSangre != 'null' || '' ? response.data[0].tipoSangre : ''

                let estatura = response.data[0].estatura != 'null' || '' ? response.data[0].estatura : ''
                let peso = response.data[0].peso != 'null' || '' ? response.data[0].peso : ''
                let numCreditoInfonavit = response.data[0].numCreditoInfonavit != 'null' || '' ? response.data[0].numCreditoInfonavit : ''
                let fuma = response.data[0].fuma != 'null' || '' ? response.data[0].fuma : ''
                let toma = response.data[0].toma != 'null' || '' ? response.data[0].toma : ''



                self.loadFile('src\\templatesDoc\\Rev03 Sol alta IMSS.xlsx', function (
                    error,
                    content
                ) {
                    if (error) {
                        throw error;
                    }
                    const zip = new PizZip(content);
                    const doc = new Docxtemplater(zip, { paragraphLoop: true, linebreaks: true });
                    let nombreMayus = nombre.toUpperCase();
                    let apellidoPaternoMayus = apellidoPaterno.toUpperCase();
                    let apellidoMaternoMayus = apellidoMaterno.toUpperCase();
                    doc.setData({
                        puesto: puesto,
                        sueldoDeseado: sueldoDeseado,
                        nombre: nombreMayus,
                        apellidoPaterno: apellidoPaternoMayus,
                        apellidoMaterno: apellidoMaternoMayus,
                        fechaIngreso: fechaIngreso,
                        fraccColonia: fraccColonia,
                        codigoPostal: codigoPostal,
                        municipioNacimiento: municipioNacimiento,
                        ciudad: ciudad,
                        calle: calle,
                        nExterior: nExterior,
                        nInterior: nInterior,
                        yCalle: yCalle,
                        entreCalle: entreCalle,
                        fechaNacimiento: fechaNacimiento,
                        lugarNacimiento: lugarNacimiento,
                        nacionalidad: nacionalidad,
                        nPasaporte: nPasaporte,
                        nCartilla: nCartilla,
                        CURP: CURP,
                        claveElector: claveElector,
                        NSS: NSS,
                        RFC: RFC,
                        afore: afore,
                        contactoEmergencia: contactoEmergencia,
                        numeroCE: numeroCE,
                        parentescoCE: parentescoCE,
                        beneficiario: beneficiario,
                        numeroBE: numeroBE,
                        parentescoBE: parentescoBE,
                        tipoSangre: tipoSangre,
                        estatura: estatura,
                        peso: peso,
                        numCreditoInfonavit: numCreditoInfonavit,
                        fuma: fuma,
                        toma: toma,
                    });
                    try {
                        // render the document (replace all occurences of {first_name} by John, {last_name} by Doe, ...)
                        doc.render();
                    } catch (error) {
                        // The error thrown here contains additional information when logged with JSON.stringify (it contains a properties object containing all suberrors).
                        function replaceErrors(key, value) {
                            if (value instanceof Error) {
                                return Object.getOwnPropertyNames(value).reduce(function (
                                    error,
                                    key
                                ) {
                                    error[key] = value[key];
                                    return error;
                                },
                                    {});
                            }
                            return value;
                        }
                        console.log(JSON.stringify({ error: error }, replaceErrors));

                        if (error.properties && error.properties.errors instanceof Array) {
                            const errorMessages = error.properties.errors
                                .map(function (error) {
                                    return error.properties.explanation;
                                })
                                .join("\n");
                            console.log("errorMessages", errorMessages);
                            // errorMessages is a humanly readable message looking like this :
                            // 'The tag beginning with "foobar" is unopened'
                        }
                        throw error;
                    }
                    const out = doc.getZip().generate({
                        type: "blob",
                        mimeType:
                            "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                    });
                    // Output the document using Data-URI
                    saveAs(out, "Solicitud de Alta Imss-" + nombre + ".xlsx");
                });


            })

        },
        actualizarDocumentacion(tipoDocumentacion, estado) {
            //this.$route.params.id
            let self = this;
            //self.$refs.formEditarEmpleados.reset()
            axios.post(self.entorno + 'empleados/updateDocumentacion', {
                id: self.$route.params.id,
                columna: tipoDocumentacion,
                estado: estado
            }).then(function (response) {
            })
        },
        generarContrato(tipoContrato) {
            //self.$route.params.id

            let self = this;
            //self.$refs.formEditarEmpleados.reset()
            axios.post(self.entorno + 'empleados/getEmpleadoInfo', {
                id: self.$route.params.id
            }).then(function (response) {
                //alert(response.data[0].nombre)
                //Campos de registro

                let nombre = response.data[0].nombre != 'null' || '' ? response.data[0].nombre : ''
                let apelidoPaterno = response.data[0].apellidoPaterno != null ? response.data[0].apellidoPaterno : ''
                let apellidoMaterno = response.data[0].apellidoMaterno != 'null' || '' ? response.data[0].apellidoMaterno : ''

                let selectPuesto = response.data[0].puesto != 'null' || '' ? response.data[0].puesto : ''
                let servicio = response.data[0].nombreServicio != 'null' || '' ? response.data[0].nombreServicio : ''
                let curp = response.data[0].CURP != 'null' || '' || 'undefined' ? response.data[0].CURP : ''
                let nss = response.data[0].NSS != 'null' || '' ? response.data[0].NSS : ''
                let alergias = response.data[0].alergias != 'null' || '' || 'undefined' ? response.data[0].alergias : ''
                let celular = response.data[0].celular != 'null' || '' ? response.data[0].celular : ''

                let calle = response.data[0].calle != 'null' || '' ? response.data[0].calle : ''
                let FraccColonia = response.data[0].fraccColonia != 'null' || '' ? response.data[0].fraccColonia : ''
                let ciudad = response.data[0].ciudad != 'null' || '' ? response.data[0].ciudad : ''
                let lugarNacimiento = response.data[0].lugarNacimiento != 'null' || '' ? response.data[0].lugarNacimiento : ''
                let rfc = response.data[0].RFC != 'null' || '' ? response.data[0].RFC : ''
                let estadoCivil = response.data[0].estadoCivil != 'null' || '' ? response.data[0].estadoCivil : ''
                let fechaNacimiento = response.data[0].fechaNacimiento != 'null' || '' ? response.data[0].fechaNacimiento : ''
                let fechaIngreso = response.data[0].fechaIngreso != 'null' || '' ? response.data[0].fechaIngreso : ''
                let fechaFin = response.data[0].fechaFin != 'null' || '' ? response.data[0].fechaFin : ''
                let horario = response.data[0].turno != 'null' || '' ? response.data[0].turno : ''
                let parentescoBen = response.data[0].parentescoBE != 'null' || '' ? response.data[0].parentescoBE : ''
                let nombreBen = response.data[0].beneficiario != 'null' || '' ? response.data[0].beneficiario : ''
                let edadBen = response.data[0].turno != 'null' || '' ? response.data[0].turno : ''
                let tipoEmpleado = response.data[0].tipoEmpleado != 'null' || '' ? response.data[0].tipoEmpleado : ''



                let documento = ""
                //

                switch (tipoContrato) {
                    case 'determinado':
                        if (tipoEmpleado == 'Administrativo') {
                            documento = 'src\\templatesDoc\\determinado_admin.docx'
                        }
                        if (tipoEmpleado == 'Operativo') {
                            documento = 'src\\templatesDoc\\ContratoDeterminado.docx'
                        }
                        break;
                    case 'indeterminado':
                        if (tipoEmpleado == 'Administrativo') {
                            documento = 'src\\templatesDoc\\indeterminado_admin.docx'
                        }
                        if (tipoEmpleado == 'Operativo') {
                            documento = 'src\\templatesDoc\\ContratoIndeterminado.docx'
                        }
                        break;
                    default:
                        break;
                }
                self.loadFile(documento, function (
                    error,
                    content
                ) {
                    if (error) {
                        throw error;
                    }
                    const zip = new PizZip(content);
                    const doc = new Docxtemplater(zip, { paragraphLoop: true, linebreaks: true });
                    let nombreCompleto = nombre + ' ' + apelidoPaterno + ' ' + apellidoMaterno
                    nombreCompleto = nombreCompleto.toUpperCase()
                    doc.setData({
                        nombre: nombreCompleto,
                        puesto: selectPuesto,
                        servicio: servicio,
                        domicilio: calle + "," + FraccColonia + ". " + ciudad,
                        curp: curp,
                        nss: nss,
                        alergias: alergias,
                        celular: celular,
                        ciudad: ciudad,
                        lugarNacimiento: lugarNacimiento,
                        rfc: rfc,
                        estadoCivil: estadoCivil,
                        fechaNacimiento: fechaNacimiento,
                        fechaIngreso: fechaIngreso,
                        fechaFin: fechaFin,
                        horario: horario,
                        parentescoBen: parentescoBen,
                        nombreBen: nombreBen,
                        edadBen: 22

                    });
                    try {
                        // render the document (replace all occurences of {first_name} by John, {last_name} by Doe, ...)
                        doc.render();
                    } catch (error) {
                        // The error thrown here contains additional information when logged with JSON.stringify (it contains a properties object containing all suberrors).
                        function replaceErrors(key, value) {
                            if (value instanceof Error) {
                                return Object.getOwnPropertyNames(value).reduce(function (
                                    error,
                                    key
                                ) {
                                    error[key] = value[key];
                                    return error;
                                },
                                    {});
                            } g
                            return value;
                        }


                        if (error.properties && error.properties.errors instanceof Array) {
                            const errorMessages = error.properties.errors
                                .map(function (error) {
                                    return error.properties.explanation;
                                })
                                .join("\n");

                            // errorMessages is a humanly readable message looking like this :
                            // 'The tag beginning with "foobar" is unopened'
                        }
                        throw error;
                    }
                    const out = doc.getZip().generate({
                        type: "blob",
                        mimeType:
                            "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                    });
                    // Output the document using Data-URI
                    saveAs(out, "contrato-" + nombre + ".docx");
                });
            });

        },
        renderDoc() {
            this.loadFile('src\\templatesDoc\\Hoja de Vida template.docx', function (
                error,
                content
            ) {
                if (error) {
                    throw error;
                }
                const zip = new PizZip(content);
                const doc = new Docxtemplater(zip, { paragraphLoop: true, linebreaks: true });
                doc.setData({
                    nombre: "Leonardo Ivan Landeros",
                    celular: "0652455478",
                    puesto: "New Website"
                });
                try {
                    // render the document (replace all occurences of {first_name} by John, {last_name} by Doe, ...)
                    doc.render();
                } catch (error) {
                    // The error thrown here contains additional information when logged with JSON.stringify (it contains a properties object containing all suberrors).
                    function replaceErrors(key, value) {
                        if (value instanceof Error) {
                            return Object.getOwnPropertyNames(value).reduce(function (
                                error,
                                key
                            ) {
                                error[key] = value[key];
                                return error;
                            },
                                {});
                        }
                        return value;
                    }


                    if (error.properties && error.properties.errors instanceof Array) {
                        const errorMessages = error.properties.errors
                            .map(function (error) {
                                return error.properties.explanation;
                            })
                            .join("\n");

                        // errorMessages is a humanly readable message looking like this :
                        // 'The tag beginning with "foobar" is unopened'
                    }
                    throw error;
                }
                const out = doc.getZip().generate({
                    type: "blob",
                    mimeType:
                        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                });
                // Output the document using Data-URI
                saveAs(out, "output.docx");
            });
        },
        loadFile(url, callback) {
            PizZipUtils.getBinaryContent(url, callback);
        },
        async downloadImage(imageSrc) {
            const image = await fetch(imageSrc)
            const imageBlog = await image.blob()
            const imageURL = URL.createObjectURL(imageBlog)

            const link = document.createElement('a')
            link.href = imageURL
            link.download = 'image file name here'
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
        },
        async descargarImagen(tipoFoto) {
            // var fs = require('fs');
            let foto;
            switch (tipoFoto) {
                case 'fotoFrontal':
                    foto = this.urlFotoActual
                    break;
                case 'fotoLateral1':
                    foto = this.fotoLateral1Actual
                    break;
                case 'fotoLateral2':
                    foto = this.fotoLateral2Actual
                    break;

                default:
                    break;
            }
            if (isNull(foto)) {
                const image = await fetch(foto)
                let random = Math.random();

                const imageBlog = await image.blob()
                const imageURL = URL.createObjectURL(imageBlog)

                const link = document.createElement('a')
                link.href = imageURL
                link.download = tipoFoto + random + ".png"
                document.body.appendChild(link)
                link.click()
                document.body.removeChild(link)


            } else {
                this.$notify({
                    title: "Error",
                    text: "El usuario no tiene una fotografía almacenada.",
                    type: 'warn'
                });
            }
        },
        subirImagen(tipoFoto) {
            let self = this;
            let foto = undefined
            switch (tipoFoto) {
                case 'fotoFrontal':
                    foto = self.imageRecortada

                    break;
                case 'fotoLateral1':
                    foto = self.imagenRecortadaL1
                    break;
                case 'fotoLateral2':
                    foto = self.imagenRecortadaL2
                    break;
                default:
                    break;
            }

            //this.imageRecortada= this.canvasFotoFrontal.toDataURL()
            axios.post(self.entorno + 'empleados/subirFoto',
                {
                    tipoFoto: tipoFoto,
                    foto: foto,
                    id: self.$route.params.id,

                }).then(function (response) {
                    self.informacionEmpleado(self.$route.params.id)
                    self.imageRecortada = undefined
                    self.image = undefined
                    self.fotoLateral1 = undefined
                    self.imagenRecortadaL1 = undefined
                    self.imageL1 = undefined
                    self.imagenRecortadaL2 = undefined
                    self.imageL2 = undefined
                    self.dialogFoto = false
                    self.dialogFotoLateral1 = false
                    self.dialogFotoLateral2 = false
                    self.$notify({
                        title: "OK",
                        text: "Se ha actualizado la fotografia con exito.",
                        type: 'success'
                    });
                });
        },
        change({ coordinates, canvas }) {

            this.canvasFotoFrontal = canvas;
            this.imageRecortada = this.canvasFotoFrontal.toDataURL()

        },
        changeL1({ coordinates, canvas }) {

            this.canvasFotoL1 = canvas;
            this.imagenRecortadaL1 = this.canvasFotoL1.toDataURL()

        },
        changeL2({ coordinates, canvas }) {

            this.canvasFotoL2 = canvas;
            this.imagenRecortadaL2 = this.canvasFotoL2.toDataURL()

        },
        setFotoLateral2(e) {
            const selectedImage = e.target.files[0]; // get first file
            this.createBase64ImageLateral2(selectedImage);
        },
        createBase64ImageLateral2(fileObject) {
            const reader = new FileReader();
            reader.onload = (e) => {
                this.fotoLateral2 = e.target.result;
                //this.uploadImage();
            };
            reader.readAsDataURL(fileObject);
        },
        setFotoLateral1(e) {
            const selectedImage = e.target.files[0]; // get first file
            this.createBase64ImageLateral(selectedImage);
        },
        createBase64ImageLateral(fileObject) {
            const reader = new FileReader();
            reader.onload = (e) => {
                this.fotoLateral1 = e.target.result;
                //this.uploadImage();
            };
            reader.readAsDataURL(fileObject);
        },
        handleImage(e) {
            const selectedImage = e.target.files[0]; // get first file
            this.createBase64Image(selectedImage);
        },
        handleImageL1(e) {
            const selectedImage = e.target.files[0]; // get first file
            this.createBase64ImageL2(selectedImage);
        },
        createBase64ImageL2(fileObject) {
            const reader = new FileReader();
            reader.onload = (e) => {
                this.imageL1 = e.target.result;
                //this.uploadImage();
            };
            reader.readAsDataURL(fileObject);
        },
        createBase64Image(fileObject) {
            const reader = new FileReader();
            reader.onload = (e) => {
                this.image = e.target.result;
                //this.uploadImage();
            };
            reader.readAsDataURL(fileObject);
        },
        handleImage2(e) {
            const selectedImage = e.target.files[0]; // get first file
            this.createBase64Image2(selectedImage);
        },
        createBase64Image2(fileObject) {
            const reader = new FileReader();
            reader.onload = (e) => {
                this.imageL2 = e.target.result;
                //this.uploadImage();
            };
            reader.readAsDataURL(fileObject);
        },
        uploadImage() {

            // const { image } = this;
            let self = this;
            axios.post(self.entorno + 'empleados/subirFoto',
                {
                    foto: foto,
                    id: self.$route.params.id
                }).then(function (response) {


                });

        },
        añadirUrl() {
            let self = this;
            axios.post(this.entorno + 'empleados/uURLdoc', {
                id: self.$route.params.id,
                columna: this.docActual,
                url: this.urlDoc
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
        verDocumento(tipoDocumento) {
            switch (tipoDocumento) {
                case "curp":
                    if (this.curpDoc != '' && this.curpDoc != null) {
                        var win = window.open(this.curpDoc, '_blank');
                        win.focus();
                    } else {
                        this.$notify({
                            title: "Error",
                            text: "No hay un archivo para ver.",
                            type: 'warn'
                        });

                    }
                    break;


                case "rfc":
                    if (this.rfcDoc != '' && this.rfcDoc != null) {
                        var win = window.open(this.rfcDoc, '_blank');
                        win.focus();
                    } else {
                        this.$notify({
                            title: "Error",
                            text: "No hay un archivo para ver.",
                            type: 'warn'
                        });
                    }
                    break;

                case "nss":
                    if (this.nssDoc != '' && this.nssDoc != null) {
                        var win = window.open(this.nssDoc, '_blank');
                        win.focus();
                    } else {
                        this.$notify({
                            title: "Error",
                            text: "No hay un archivo para ver.",
                            type: 'warn'
                        });
                    }
                    break;

                case "cartillaMilitar":
                    if (this.cartillaMilitarDoc != '' && this.cartillaMilitarDoc != null) {
                        var win = window.open(this.cartillaMilitarDoc, '_blank');
                        win.focus();
                    } else {
                        this.$notify({
                            title: "Error",
                            text: "No hay un archivo para ver.",
                            type: 'warn'
                        });
                    }
                    break;

                case "ine":
                    if (this.ineDoc != '' && this.ineDoc != null) {
                        var win = window.open(this.ineDoc, '_blank');
                        win.focus();
                    } else {
                        this.$notify({
                            title: "Error",
                            text: "No hay un archivo para ver.",
                            type: 'warn'
                        });
                    }
                    break;

                case "comprobanteDomicilio":
                    if (this.comprobanteDomicilioDoc != '' && this.comprobanteDomicilioDoc != null) {
                        var win = window.open(this.comprobanteDomicilioDoc, '_blank');
                        win.focus();
                    } else {
                        this.$notify({
                            title: "Error",
                            text: "No hay un archivo para ver.",
                            type: 'warn'
                        });
                    }
                    break;

                case "actaNacimiento":
                    if (this.actaNacimientoDoc != '' && this.actaNacimientoDoc != null) {
                        var win = window.open(this.actaNacimientoDoc, '_blank');
                        win.focus();
                    } else {
                        this.$notify({
                            title: "Error",
                            text: "No hay un archivo para ver.",
                            type: 'warn'
                        });
                    }
                    break;
                case "comprobanteEstudios":
                    if (this.comprobanteEstudiosDoc != '' && this.comprobanteEstudiosDoc != null) {
                        var win = window.open(this.comprobanteEstudiosDoc, '_blank');
                        win.focus();
                    } else {
                        this.$notify({
                            title: "Error",
                            text: "No hay un archivo para ver.",
                            type: 'warn'
                        });
                    }
                    break;

                case "contratoBanco":
                    if (this.contratoBancoDoc != '' && this.contratoBancoDoc != null) {
                        var win = window.open(this.contratoBancoDoc, '_blank');
                        win.focus();
                    } else {
                        this.$notify({
                            title: "Error",
                            text: "No hay un archivo para ver.",
                            type: 'warn'
                        });
                    }
                    break;

                case "fotoPerfil":
                    if (this.fotoPerfilDoc != '' && this.fotoPerfilDoc != null) {
                        var win = window.open(this.fotoPerfilDoc, '_blank');
                        win.focus();
                    } else {
                        this.$notify({
                            title: "Error",
                            text: "No hay un archivo para ver.",
                            type: 'warn'
                        });
                    }
                    break;
                case "fotoFrontal":
                    if (this.fotoFrontalDoc != '' && this.fotoFrontalDoc != null) {
                        var win = window.open(this.fotoFrontalDoc, '_blank');
                        win.focus();
                    } else {
                        this.$notify({
                            title: "Error",
                            text: "No hay un archivo para ver.",
                            type: 'warn'
                        });
                    }
                    break;

                case "licencia":
                    if (this.licenciaDoc != '' && this.licenciaDoc != null) {
                        var win = window.open(this.licenciaDoc, '_blank');
                        win.focus();
                    } else {
                        this.$notify({
                            title: "Error",
                            text: "No hay un archivo para ver.",
                            type: 'warn'
                        });
                    }
                    break;
                case "libretaMar":
                    if (this.libretaMarDoc != '' && this.libretaMarDoc != null) {
                        var win = window.open(this.libretaMarDoc, '_blank');
                        win.focus();
                    } else {
                        this.$notify({
                            title: "Error",
                            text: "No hay un archivo para ver.",
                            type: 'warn'
                        });
                    }
                    break;
                default:
                    break;
            }
        },
        cargarDocumentos(tipoDocumento) {
            switch (tipoDocumento) {
                case "curp":
                    this.urlDoc = this.curpDoc
                    break;
                case "rfc":
                    this.urlDoc = this.rfcDoc
                    break;
                case "nss":
                    this.urlDoc = this.nssDoc
                    break;
                case "cartillaMilitar":
                    this.urlDoc = this.cartillaMilitarDoc
                    break;
                case "ine":
                    this.urlDoc = this.ineDoc
                    break;
                case "comprobanteDomicilio":
                    this.urlDoc = this.comprobanteDomicilioDoc
                    break;
                case "actaNacimiento":
                    this.urlDoc = this.actaNacimientoDoc
                    break;
                case "comprobanteEstudios":
                    this.urlDoc = this.comprobanteEstudiosDoc
                    break;
                case "contratoBanco":
                    this.urlDoc = this.contratoBancoDoc
                    break;
                case "libretaMar":
                    this.urlDoc = this.libretaMarDoc
                    break;
                case "licencia":
                    this.urlDoc = this.licenciaDoc
                    break;

                default:
                    break;
            }
            //this.$route.params.id
            this.docActual = tipoDocumento
            this.dialogAñadirArchivo = true

        },
        actualizarExpediente(tipoExpediente, estado) {
            //this.$route.params.id

            let self = this;
            //self.$refs.formEditarEmpleados.reset()
            axios.post(self.entorno + 'empleados/updateExpediente', {
                id: self.$route.params.id,
                columna: tipoExpediente,
                estado: estado
            }).then(function (response) {


            })

        },
        async blobToBase64(blob) {
            return new Promise((resolve, _) => {
                const reader = new FileReader();
                reader.onloadend = () => resolve(reader.result);
                reader.readAsDataURL(blob);

            });
        },
        informacionEmpleado(id) {

            let self = this;
            //self.$refs.formEditarEmpleados.reset()
            axios.post(self.entorno + 'empleados/getEmpleadoInfo', {
                id: id
            }).then(function (response) {
                self.complexion= response.data[0].complexion
                self.fotoFrontalActual = response.data[0].fotoFrontal
                self.urlFotoActual = self.entorno + response.data[0].fotoFrontal
                self.fotoLateral1Actual = self.entorno + response.data[0].fotoLateral1
                self.fotoLateral2Actual = self.entorno + response.data[0].fotoLateral2
                // self.fotoLateral1Actual = response.data[1][1]
                // self.fotoLateral2Actual = response.data[1][2]
                self.toma=  response.data[0].toma
                self.nombre = response.data[0].nombre
                self.apellidoPaterno = response.data[0].apellidoPaterno
                self.apellidoMaterno = response.data[0].apellidoMaterno
                self.sexo = response.data[0].sexo
                self.fechaNacimiento = response.data[0].fechaNacimiento
                self.lugarNacimiento = response.data[0].lugarNacimiento
                self.estadoNacimiento = response.data[0].estadoNacimiento
                self.paisNacimiento = response.data[0].paisNacimiento
                self.nacionalidad = response.data[0].nacionalidad
                self.estadoCivil = response.data[0].estadoCivil
                self.nivelEstudios = response.data[0].nivelEstudios
                self.nEmpleado = response.data[0].nEmpleado
                self.fechaIngreso = response.data[0].fechaIngreso
                self.departamento = response.data[0].departamento
                self.tipoEmpleado = response.data[0].tipoEmpleado
                self.zona = response.data[0].zona
                self.servicio = response.data[0].servicio
                self.puesto = response.data[0].puesto
                self.contratoDeterminado1 = response.data[0].contratoDeterminado1
                self.contratoDeterminado2 = response.data[0].contratoDeterminado2
                self.contratoIndeterminado = response.data[0].contratoIndeterminado
                self.aniosLaborados = response.data[0].aniosLaborados
                self.turno = response.data[0].turno
                self.sueldoDeseado = response.data[0].sueldoDeseado
                self.calle = response.data[0].calle
                self.nExterior = response.data[0].nExterior
                self.nInterior = response.data[0].nInterior
                self.fraccColonia = response.data[0].fraccColonia
                self.codigoPostal = response.data[0].codigoPostal
                self.entreCalle = response.data[0].entreCalle
                self.yCalle = response.data[0].yCalle
                self.ciudad = response.data[0].ciudad
                self.telefono = response.data[0].telefono
                self.celular = response.data[0].celular
                self.correo = response.data[0].correo
                self.nCartilla = response.data[0].nCartilla
                self.nPasaporte = response.data[0].nPasaporte
                self.CURP = response.data[0].CURP
                self.RFC = response.data[0].RFC
                self.afore = response.data[0].afore
                self.NSS = response.data[0].NSS
                self.claveElector = response.data[0].claveElector
                self.tipoLicencia = response.data[0].tipoLicencia
                self.fechaVigencia = response.data[0].fechaVigencia
                self.libretaMar = response.data[0].libretaMar
                self.banco = response.data[0].banco
                self.cuenta = response.data[0].cuenta
                self.clabe = response.data[0].clabe
                self.cpCIF = response.data[0].cpCIF
                self.direccionCIF = response.data[0].direccionCIF
                self.poblacionCIF = response.data[0].poblacionCIF
                self.infonavit = response.data[0].infonavit
                self.numCreditoInfonavit = response.data[0].numCreditoInfonavit
                self.fechaAltaImms = response.data[0].fechaAltaImms
                self.tipoSangre = response.data[0].tipoSangre
                self.tipoSangre = response.data[0].tipoSangre
                self.enfermedadCronica = response.data[0].enfermedadCronica
                self.medicamentoQueToma = response.data[0].medicamentoQueToma
                self.donadorOrganos = response.data[0].donadorOrganos
                self.alergias = response.data[0].alergias
                self.alergiasMedicamento = response.data[0].alergiasMedicamento
                self.tieneTatuajes = response.data[0].tieneTatuajes
                self.estatura = response.data[0].estatura
                self.peso = response.data[0].peso
                self.fuma = response.data[0].fuma
                self.tienePerforaciones = response.data[0].tienePerforaciones
                self.usaLentes = response.data[0].usaLentes
                self.colorOjos = response.data[0].colorOjos
                self.colorCabello = response.data[0].colorCabello
                self.contactoEmergencia = response.data[0].contactoEmergencia
                self.parentescoCE = response.data[0].parentescoCE
                self.numeroCE = response.data[0].numeroCE
                self.beneficiario = response.data[0].beneficiario
                self.parentescoBE = response.data[0].parentescoBE
                self.numeroBE = response.data[0].numeroBE
                self.comentarios = response.data[0].comentarios



                self.nEmpleado = response.data[0].numeroEmpleado
                self.fechaIngreso = response.data[0].fechaIngreso
                self.tipoTrabajador = response.data[0].tipoEmpleado
                self.ciudad = response.data[0].ciudad
                self.nss = response.data[0].NSS
                self.fechaNacimiento = response.data[0].fechaNacimiento
                self.curp = response.data[0].CURP
                self.rfc = response.data[0].RFC
                self.zona = response.data[0].zona
                self.servicio = response.data[0].nombreServicio
                self.status = response.data[0].status
                self.cuenta = response.data[0].cuenta
                self.clabe = response.data[0].clabe
                self.contratoDeterminado1 = response.data[0].fechaContrato1
                self.contratoDeterminado2 = response.data[0].fechaContrato2
                self.contratoIndeterminado = response.data[0].fechaContratoIndeterminado
                self.telefono = response.data[0].celular
                self.direccion = response.data[0].calle + "," + response.data[0].fraccColonia + "," + response.data[0].ciudad
                self.fechaAltaImss = response.data[0].fechaAltaImms
                self.motivoBaja = response.data[0].motivoBaja
                self.fechaFirmaRenuncia = response.data[0].fechaBaja
                self.observaciones = response.data[0].comentarios
                self.fotoFrontalDoc = response.data[0].fotoFrontal
                self.fotoPerfilDoc = response.data[0].fotoPerfil
                self.licencia = response.data[0].licencia
            })
        },
        getHistorial(id) {
            let self = this;
            //self.$refs.formEditarEmpleados.reset()
            axios.post(self.entorno + 'empleados/getHistorial', {
                id: id
            }).then(function (response) {
                self.historial = response.data
            })
        },
        getExpediente(id) {
            let self = this;
            //self.$refs.formEditarEmpleados.reset()
            axios.post(self.entorno + 'empleados/expediente', {
                id: id
            }).then(function (response) {

                if (response.data[0].perfilPuestos == 1) {
                    self.f01 = true

                }
                if (response.data[0].ContratoIndeterminado == 1) {
                    self.f11 = true

                }
                if (response.data[0].acuerdoAntidoping == 1) {
                    self.f13 = true
                }
                if (response.data[0].altaImms == 1) {
                    self.f15 = true
                }
                if (response.data[0].avisoPrivacidadSolicitante == 1) {
                    self.f09 = true
                }
                if (response.data[0].avisoRetencionesCredito == 1) {
                    self.f07 = true
                }
                if (response.data[0].contratoDeterminado1 == 1) {
                    self.f10 = true
                }
                if (response.data[0].contratoDeterminado2 == 1) {
                    self.f100 = true
                }
                if (response.data[0].convenioConfi == 1) {
                    self.f12 = true
                }
                if (response.data[0].convenioTerminacionLaboral == 1) {
                    self.f18 = true
                }
                if (response.data[0].entregaDocumentacion == 1) {
                    self.f21 = true
                }
                if (response.data[0].prestamoDocumentacion == 1) {
                    self.f22 = true
                }
                if (response.data[0].renunciaVoluntaria == 1) {
                    self.f19 = true
                }
                if (response.data[0].reporteEntrevistaAdmin == 1) {
                    self.f05 = true
                }
                if (response.data[0].reporteEntrevistaOp == 1) {
                    self.f06 = true
                }
                if (response.data[0].solicitudEmpleo == 1) {
                    self.f04 = true
                }

            })
        },
        getDocumentos(id) {
            let self = this;
            axios.post(self.entorno + 'empleados/documentos', {
                id: id
            }).then(function (response) {

                self.curpDoc = response.data[0].curp
                self.rfcDoc = response.data[0].rfc
                self.nssDoc = response.data[0].nss
                if(self.sexo != "Masculino"){
                    self.checkNACartilla = true
                    self.isDisable = true
                }else{
                    self.isDisable = false
                    self.cartillaMilitarDoc = response.data[0].cartillaMilitar;
                }
                self.ineDoc = response.data[0].ine
                self.comprobanteDomicilioDoc = response.data[0].comprobanteDomicilio
                self.actaNacimientoDoc = response.data[0].actaNacimiento
                self.comprobanteEstudiosDoc = response.data[0].comprobanteEstudios
                self.contratoBancoDoc = response.data[0].contratoBanco
                if(response.data[0].NALibretaMar == 1){
                    self.isDisableLibretaMar = true
                    self.checkNALibretaMar = true
                }else{
                    self.isDisableLibretaMar = false
                    self.libretaMarDoc = response.data[0].libretaMar
                }

                if(response.data[0].NALicencia == 1){
                    self.isDisableLicencia = true
                    self.checkNALicencia = true
                }else{
                    self.isDisableLicencia = false
                    self.licenciaDoc = response.data[0].licencia
                }
                

            })
        },
        SubirFotoURL() {
            let self = this;
            axios.post(this.entorno + 'empleados/URLfotografia', {
                id: self.$route.params.id,
                campo: campo,
                url: this.urlDoc
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
        cargarFoto(foto) {
            this.dialogFotoURL = true
        },
        onChangeLibretaMar(valueLibretaMar){
            let self = this;
            if(valueLibretaMar){
                self.isDisableLibretaMar = false
                axios.post(self.entorno + "empleados/updateNADocumentos",{
                    id: self.$route.params.id,
                    columna: 'NALibretaMar',
                    value: 0
                }).then(function (response){
                    
                })
            }else{
                self.isDisableLibretaMar = true
                axios.post(self.entorno + "empleados/updateNADocumentos",{
                    id: self.$route.params.id,
                    columna: 'NALibretaMar',
                    value: 1
                }).then(function (response){
                    
                })
            }
        },
        onChangeLicencia(valueLicencia){
            let self = this;
             if(valueLicencia){
                self.isDisableLicencia = false
                axios.post(self.entorno + "empleados/updateNADocumentos",{
                    id: self.$route.params.id,
                    columna: 'NALicencia',
                    value: 0
                }).then(function (response){

                })
             }else{
                self.isDisableLicencia = true
                axios.post(self.entorno + "empleados/updateNADocumentos",{
                    id: self.$route.params.id,
                    columna: 'NALicencia',
                    value: 1
                }).then(function (response){

                })
             }
        }
    },
    components: {
        EasyDataTable: window['vue3-easy-data-table'],
        Cropper
    },


}
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

.containerCamaraWeb {
    margin-top: 2rem;
    margin-bottom: 2rem;
    padding: 2rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border: 1px solid #ccc;
    border-radius: 4px;
    width: 500px;
}


.camera-button {
    margin-bottom: 2rem;
}

.camera-box .camera-shutter {
    opacity: 0;
    width: 450px;
    height: 337.5px;
    background-color: #fff;
    position: absolute;
}

flash {
    opacity: 1;
}

.camera-shoot {
    margin: 1rem 0;
}

botonCamara {
    height: 60px;
    width: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 100%;
}

img {
    height: 35px;
    object-fit: cover;

}


.camera-loading {
    overflow: hidden;
    height: 100%;
    position: absolute;
    width: 100%;
    min-height: 150px;
    margin: 3rem 0 0 -1.2rem;
}

ul {
    height: 100%;
    position: absolute;
    width: 100%;
    z-index: 999999;
    margin: 0;
}

.loader-circle {
    display: block;
    height: 14px;
    margin: 0 auto;
    top: 50%;
    left: 100%;
    transform: translateY(-50%);
    transform: translateX(-50%);
    position: absolute;
    width: 100%;
    padding: 0;
}

.li {
    display: block;
    float: left;
    width: 10px;
    height: 10px;
    line-height: 10px;
    padding: 0;
    position: relative;
    margin: 0 0 0 4px;
    background: #999;
    animation: preload 1s infinite;
    top: -50%;
    border-radius: 100%;
}





@keyframes preload {
    0% {
        opacity: 1
    }

    50% {
        opacity: .4
    }

    100% {
        opacity: 1
    }
}

/*AQUI TERMINA EL CSS DE CAMARA*/


.generales {
    text-align: left;
}

.custom-loader {
    animation: loader 1s infinite;
    display: flex;
}

.filasencuesta {

    margin-top: 10px;

}

.pregEncuestaSalida {

    color: grey;



}
</style>

