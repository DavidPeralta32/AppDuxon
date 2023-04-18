<template>
  
   <notifications style="z-index:1001110 ;" />
   <div style="width: 95%; margin-left: 2%;  margin-top: 1%; padding-top: 1%;">

      <v-row align="center" align-content="end">
         <v-col cols="6">
            <p style="font-size: 1.3em; margin-bottom: 1%;">Servicios Asignados </p>
            <v-select :items="ServiciosDisponibles" item-title="nombre" item-value="idServicio"
               v-model="servicioSeleccionado" label="Busqueda por servicio" variant='outlined'></v-select>
         </v-col>
         
         <v-col cols="2">
            <p style="font-size: 1em;text-align: center;"> Empleados activos: </p>
            <p style="font-weight: bolder;font-size: 1.8em;text-align: center;"> {{ totalEmpleadosActivos }}</p>
         </v-col>

         <v-col cols="2">
            <p style="font-size: 1em;text-align: center;">Empleados baja: </p>
            <p style="font-weight: bolder; font-size: 1.8em;text-align: center;"> {{ totalEmpleadosBaja }}</p>
         </v-col>

         <v-col cols="2">
            <p style="font-size: 1em;text-align: center;">#Registro Patronal: </p>
            <p style="font-weight: bolder; font-size: 1.8em;text-align: center;"> {{ totalRegistroPatronal }}</p>
         </v-col>
      </v-row>

   </div>


   <v-card style="z-index: 0; height: 100%;  border-width:1px; background-color: white; ">
      <!--ESTAS SON -->
      <v-tabs color="blue" style="width: 100%;" bg-color="white" v-model="tab" show-arrows>

         <v-tab value="tab-1" @click="actualizarTablaActivos()">
            <v-icon style="margin-right: 5px;">mdi-account-plus </v-icon> Empleados Activos</v-tab>
         <!-- <v-tab value="tab-2" @click="actualizarTablaBaja()"> -->
         <v-tab value="tab-2" @click="actualizarTablaBaja()">
            <v-icon style="margin-right: 5px; ">mdi-account-minus </v-icon> Empleados Baja</v-tab>
      </v-tabs>
      <!--AQUI VA EL CONTENIDO DE CADA PESTAÑA-->
      <v-window v-model="tab" style="min-height:  100%; padding: 0% 5%;">
         <v-window-item value="tab-1" style="min-height:  100%; margin-top: 2%; margin-bottom: 5%; border: 0;">
            <v-row>
               <v-col cols="4">
               </v-col>

               <v-col cols="4">


               </v-col>

               <v-col cols="4" style="text-align: right; margin-bottom: 20px; ">

                  <v-btn @click="dialogClaveCurp = true" small :disabled="nuevoEmpleado_dis"
                     style="vertical-align: bottom;" prepend-icon="mdi-account-multiple-plus-outline" color="blue"
                     bg-color="white">Nuevo empleado
                  </v-btn>
                  <div class="text-center">
                     <v-dialog v-model="dialogClaveCurp" width="25%">
                        <v-card>
                           <v-toolbar color="primary" dark style="position: fixed;z-index: 100; width: 100%;">
                              <h2 style="margin-left: 20px">Buscar clave curp</h2>
                           </v-toolbar>
                           <v-card style="margin-top:4rem;">
                              <!-- claveElectorInput -->

                              <v-text-field :rules="rulesInputClaveCurp"
                                 style="margin-left:4rem;margin-right:4rem;margin-top:1.5rem;" v-model="curpInput"
                                 label="Clave curp" variant="outlined" maxlength="18"></v-text-field>

                              <v-row style="margin-bottom:20px;margin-top: 10px">
                                 <v-row cols="12">
                                 </v-row>
                                 <v-row cols="12">
                                 </v-row>
                                 <v-row cols="12">
                                 </v-row>
                                 <v-row cols="12">
                                 </v-row>
                                 <v-row cols="12">
                                 </v-row>
                                 <v-row cols="12">
                                 </v-row>
                                 <v-row cols="12">
                                 </v-row>
                                 <v-row cols="12">
                                 </v-row>
                                 <v-row cols="12">
                                 </v-row>
                                 <v-row cols="12">
                                 </v-row>
                                 <v-row cols="12">
                                 </v-row>
                                 <v-row cols="12">
                                 </v-row>
                                 <v-row cols="12">
                                    <v-btn :loading="loading3" :disabled="loading3" color="blue" style="margin-left:20%;"
                                       class="ma-2 white--text" @click="validarClaveCurp()">
                                       Buscar
                                       <v-icon size="small" right dark>
                                          mdi-magnify
                                       </v-icon>
                                    </v-btn>

                                 </v-row>
                              </v-row>
                           </v-card>
                        </v-card>
                     </v-dialog>

                     <v-dialog v-model="dialogHistorialBajas">
                        <v-toolbar color="primary" dark style="position: fixed;z-index: 100; width: 100%;">
                           <h2 style="margin-left: 20px">Reingreso de empleados</h2>
                        </v-toolbar>
                        <v-card style="margin-top:4rem;">

                           <v-card-text style="text-align: left; margin-left: 10%;">
                              <h3 style="font-size: 1.2em;">Historial laboral</h3>
                           </v-card-text>

                           <v-row style="margin: 2%; margin-top: 2%;">
                              <v-col cols="1">
                              </v-col>

                              <v-col cols="10">
                                 <EasyDataTable :headers="headers" :items="historialCurp" buttons-pagination
                                    table-class-name="customize-table">
                                 </EasyDataTable>
                              </v-col>

                              <v-col cols="1">
                              </v-col>


                           </v-row>

                           <div style="margin-left:10%; margin-right: 10%;">

                              <v-card-text style="text-align: center;">
                                 <h3 style="font-size: 1.2em;"> Reingresar al empleado...</h3>
                              </v-card-text>


                              <v-row style="padding: 2%;">
                                 <v-col cols="6" md="6">
                                    <v-btn depressed color="error"
                                       @click="(this.dialogHistorialBajas = false)">Cancelar</v-btn>
                                 </v-col>
                                 <v-col cols="6" md="6" style="text-align:right">
                                    <v-btn depressed color="primary"
                                       @click="abrirEditarEmpleados(idEmpleadoClaveCurp)">Siguiente</v-btn>
                                 </v-col>
                              </v-row>
                           </div>
                        </v-card>

                     </v-dialog>

                     <v-dialog v-model="dialog" width="85%" persistent="true">
                        <template v-slot:default="dialog">
                           <v-card>
                              <v-toolbar color="primary" dark style="position: fixed;z-index: 100; width: 100%;">
                                 <h2 style="margin-left: 20px"> Registro de empleados </h2>


                              </v-toolbar>

                              <v-container>
                                 <v-form ref="formAltaEmpleados" v-model="valid" lazy-validation>


                                    <h3 style="margin-top:5% ;">Datos personales</h3>

                                    <v-divider style="margin-bottom: 30px;"></v-divider>
                                    <v-row class="filasRegistro">
                                       <v-col cols="12" md="3">
                                          <v-text-field v-model="nombre" :rules="inputsRegistroLN" label="Nombre"
                                             density="compact" variant="outlined" required></v-text-field>

                                       </v-col>

                                       <v-col cols="12" md="3">
                                          <v-text-field v-model="apellidoPaterno" label="Apellido Paterno"
                                             variant="outlined" :rules="inputsRegistroLN" required
                                             density="compact"></v-text-field>
                                       </v-col>



                                       <v-col cols="12" md="3">
                                          <v-text-field v-model="apellidoMaterno" label="Apellido Materno"
                                             variant="outlined" :rules="inputsRegistroLN" required
                                             density="compact"></v-text-field>
                                       </v-col>

                                       <v-col cols="12" md="3">
                                          <v-select label="Sexo" v-model="selectSexo" :rules="nameRules"
                                             :items="['Masculino', 'Femenino']" variant="outlined" dense bg-color="white"
                                             density="compact">
                                          </v-select>
                                       </v-col>
                                    </v-row>

                                    <v-row class="filasRegistro">
                                       <v-col cols="12" md="3">
                                          <v-text-field v-model="fechaNacimiento" type="date" label="Fecha de nacimiento"
                                             variant="outlined" :rules="nameRules" required
                                             density="compact"></v-text-field>

                                       </v-col>

                                       <v-col cols="12" md="3">
                                          <v-text-field v-model="lugarNacimiento" label="Lugar de nacimiento"
                                             :rules="inputsRegistroLN" variant="outlined" required
                                             density="compact"></v-text-field>
                                       </v-col>


                                       <v-col cols="12" md="3">
                                          <v-text-field v-model="municipioNacimiento" label="Municipio de Nacimiento"
                                             :rules="inputsRegistroLN" variant="outlined" required
                                             density="compact"></v-text-field>
                                       </v-col>

                                       <v-col cols="12" md="3">
                                          <v-autocomplete v-model="selectEstadoNacimiento" label="Estado de Nacimiento"
                                             :items="estados" variant="outlined" required :rules="nameRules"
                                             density="compact"></v-autocomplete>

                                       </v-col>
                                    </v-row>

                                    <v-row class="filasRegistro">
                                       <v-col cols="12" md="3">
                                          <v-text-field v-model="paisNacimiento" label="País de nacimiento"
                                             :rules="inputsRegistroLN" variant="outlined" required
                                             density="compact"></v-text-field>
                                       </v-col>

                                       <v-col cols="12" md="3">
                                          <v-text-field v-model="nacionalidad" label="Nacionalidad" variant="outlined"
                                             :rules="inputsRegistroLN" required density="compact"></v-text-field>
                                       </v-col>

                                       <v-col cols="12" md="3">
                                          <v-select label="Estado Civil" v-model="selectEstadoCivil"
                                             :items="['Soltero', 'Casado', 'Viudo', 'Divorciado', 'Unión Libre']"
                                             :rules="nameRules" variant="outlined" dense bg-color="white"
                                             density="compact">
                                          </v-select>
                                       </v-col>

                                       <v-col cols="12" md="3">
                                          <v-select v-model="selectNivelEstudios"
                                             :items="['Primaria', 'Secundaria', 'Preparatoria', 'Técnica', 'Pasante', 'Licenciatura', 'Maestria', 'Doctorado']"
                                             label="Nivel de estudios" variant="outlined" dense bg-color="white"
                                             :rules="nameRules" density="compact">
                                          </v-select>
                                       </v-col>
                                    </v-row>


                                    <h3>Información General</h3>
                                    <v-divider style="margin-bottom: 30px;"></v-divider>
                                    <v-row class="filasRegistro">
                                       <v-col cols="12" md="3">
                                          <v-text-field v-model="nEmpleado" label="Número de empleado"
                                             :rules="inputsRegistroNNR" density="compact"
                                             variant="outlined"></v-text-field>
                                       </v-col>

                                       <v-col cols="12" md="3">
                                          <v-text-field v-model="fechaIngreso" label="Fecha de ingreso" :rules="nameRules"
                                             variant="outlined" type="date" required density="compact"></v-text-field>
                                       </v-col>

                                       <v-col cols="12" md="3">
                                          <v-select v-model="selectDepartamento" :items="departamentos" :rules="nameRules"
                                             label="Departamento" variant="outlined" dense bg-color="white"
                                             density="compact">
                                          </v-select>
                                       </v-col>

                                       <v-col cols="12" md="3">
                                          <v-select v-model="tipoEmpleado" :rules="nameRules"
                                             :items="['Operativo', 'Administrativo']"
                                             :disabled="selectDepartamento != 'OPERACIONES'" variant="outlined"
                                             label="Tipo de empleado" bg-color="white" density="compact">
                                          </v-select>

                                       </v-col>

                                    </v-row>

                                    <v-row class="filasRegistro">
                                       <v-col cols="12" md="3">
                                          <v-select v-model="selectZona" :items="zona" label="Zona" variant="outlined"
                                             :rules="nameRules" dense bg-color="white" density="compact">
                                          </v-select>
                                       </v-col>
                                       <v-col cols="12" md="3">
                                          <v-select :items="servicios" item-title='nombre' item-value='idServicio'
                                             :disabled="this.selectDepartamento != 'OPERACIONES'" label="Servicio"
                                             v-model="selectServicio" variant="outlined" dense bg-color="white"
                                             density="compact">
                                          </v-select>
                                       </v-col>

                                       <v-col cols="12" md="6">
                                          <v-select v-model="selectPuesto" :items="puesto" label="Puesto"
                                             :rules="nameRules" variant="outlined" dense bg-color="white"
                                             density="compact">
                                          </v-select>
                                       </v-col>





                                    </v-row>


                                    <v-row class="filasRegistro">


                                       <v-col cols="12" md="3">
                                          <v-text-field v-model="fechaContrato1" type="date" :rules="nameRules"
                                             label="Contrato determinado" variant="outlined" required
                                             density="compact"></v-text-field>
                                       </v-col>

                                       <v-col cols="12" md="3">
                                          <v-text-field v-model="fechaContrato2" type="date" label="Contrato determinado 2"
                                             variant="outlined" required density="compact"></v-text-field>
                                       </v-col>
                                       <v-col cols="12" md="3">
                                          <v-text-field v-model="fechaContratoIndeterminado" type="date"
                                             label="Contrato indeterminado" variant="outlined" required
                                             density="compact"></v-text-field>
                                       </v-col>

                                       <v-col cols="12" md="3">
                                          <v-text-field v-model="aniosLaborados" label="Años laborados"
                                             :rules="inputsRegistroNNR" variant="outlined" required type="number"
                                             density="compact" min="0" max="100"></v-text-field>
                                       </v-col>


                                    </v-row>

                                    <v-row class="filasRegistro">
                                       <v-col cols="12" md="3">
                                          <v-select v-model="selectTurno" :items="turnos" label="Turno" :rules="nameRules"
                                             variant="outlined" return-object dense bg-color="white" density="compact">
                                          </v-select>
                                       </v-col>
                                       <v-col cols="12" md="3">
                                          <v-text-field v-model="sueldoDeseado" label="Sueldo deseado mensual"
                                             :rules="inputsRegistroN" variant="outlined" required type="number"
                                             density="compact" min="0"></v-text-field>
                                       </v-col>
                                    </v-row>


                                    <h3>Dirección</h3>

                                    <v-divider style="margin-bottom: 30px;"></v-divider>
                                    <v-row class="filasRegistro">
                                       <v-col cols="12" md="3">
                                          <v-text-field v-model="calle" label="Calle" density="compact" variant="outlined"
                                             :rules="inputsRegistroLN" required></v-text-field>

                                       </v-col>

                                       <v-col cols="12" md="2">
                                          <v-text-field v-model="nExterior" label="N° Exterior" variant="outlined"
                                             :rules="inputsRegistroLN" required density="compact"></v-text-field>
                                       </v-col>

                                       <v-col cols="12" md="2">
                                          <v-text-field v-model="nInterior" label="N° Interior" variant="outlined" required
                                             density="compact"></v-text-field>
                                       </v-col>

                                       <v-col cols="12" md="3">
                                          <v-text-field label="Fracc. o Colonia" v-model="FraccColonia"
                                             :rules="inputsRegistroLN" variant="outlined" dense bg-color="white"
                                             density="compact">
                                          </v-text-field>
                                       </v-col>

                                       <v-col cols="12" md="2">
                                          <v-text-field label="Código postal" v-model="codigoPostal" variant="outlined"
                                             :rules="inputsRegistroN" dense bg-color="white" density="compact">
                                          </v-text-field>
                                       </v-col>
                                    </v-row>

                                    <v-row class="filasRegistro">
                                       <v-col cols="12" md="3">
                                          <v-text-field v-model="entreCalle" label="Entre calle" variant="outlined"
                                             required density="compact" :rules="inputsRegistroLNNR"></v-text-field>

                                       </v-col>

                                       <v-col cols="12" md="3">
                                          <v-text-field v-model="yCalle" label="Y calle" variant="outlined" required
                                             density="compact" :rules="inputsRegistroLNNR"></v-text-field>
                                       </v-col>

                                       <v-col cols="12" md="3">
                                          <v-text-field v-model="ciudad" :rules="inputsRegistroLN" label="Ciudad"
                                             variant="outlined" required density="compact"></v-text-field>
                                       </v-col>
                                    </v-row>


                                    <h3 style="margin-top: 10px;">Contacto</h3>


                                    <v-divider style="margin-bottom: 30px;"></v-divider>
                                    <v-row class="filasRegistro">
                                       <v-col cols="12" md="3">
                                          <v-text-field v-model="telefono" label="Teléfono" density="compact"
                                             :rules="nameRulesinputsTelefonos" variant="outlined" maxlength="10"
                                             required></v-text-field>

                                       </v-col>

                                       <v-col cols="12" md="3">
                                          <v-text-field label="Celular" :rules="nameRulesinputsTelefonos" v-model="celular"
                                             variant="outlined" dense bg-color="white" density="compact" maxlength="10">
                                          </v-text-field>
                                       </v-col>

                                       <v-col cols="12" md="3">
                                          <v-text-field label="Correo eléctronico" :rules="nameRulesinputsCorreos"
                                             v-model="correo" variant="outlined" dense bg-color="white" density="compact">
                                          </v-text-field>
                                       </v-col>
                                    </v-row>



                                    <h3 style="margin-top: 10px;">Documentación</h3>

                                    <v-divider style="margin-bottom: 30px;"></v-divider>
                                    <v-row class="filasRegistro">
                                       <v-col cols="12" md="3">
                                          <v-text-field v-model="nCartilla" :rules="inputsRegistroLNNR"
                                             label="N°. Cartilla" density="compact" variant="outlined"
                                             required></v-text-field>
                                       </v-col>

                                       <v-col cols="12" md="3">
                                          <v-text-field label="N°. Pasaporte" v-model="nPasaporte"
                                             :rules="inputsRegistroLNNR" variant="outlined" dense bg-color="white"
                                             density="compact">
                                          </v-text-field>
                                       </v-col>

                                       <v-col cols="12" md="3">
                                          <v-text-field label="CURP" :rules="inputsRegistroLN" v-model="curp"
                                             variant="outlined" dense bg-color="white" density="compact" maxlength="20"
                                             disabled="true">
                                          </v-text-field>
                                       </v-col>
                                       <v-col cols="12" md="3">
                                          <v-text-field v-model="afore" label="Afore" density="compact" variant="outlined"
                                             required></v-text-field>
                                       </v-col>
                                    </v-row>

                                    <v-row class="filasRegistro">


                                       <v-col cols="12" md="3">
                                          <v-text-field label="NSS" v-model="nss" variant="outlined" dense
                                             :rules="inputsRegistroNNR" bg-color="white" density="compact" maxlength="11">
                                          </v-text-field>
                                       </v-col>


                                       <v-col cols="12" md="3">
                                          <v-text-field label="Clave de elector" v-model="claveElector"
                                             :rules="inputsRegistroLN" variant="outlined" dense bg-color="white"
                                             density="compact">
                                          </v-text-field>
                                       </v-col>
                                       <v-col cols="12" md="3">
                                          <v-select label="Tipo de licencia" v-model="selectTipoLicencia"
                                             :items="['A', 'B', 'C', 'D']" variant="outlined" dense bg-color="white"
                                             density="compact">
                                          </v-select>
                                       </v-col>
                                       <v-col cols="12" md="3">
                                          <v-text-field v-model="fechaVigencia" label="Fecha Vigencia" type="date"
                                             density="compact" variant="outlined" required></v-text-field>
                                       </v-col>
                                    </v-row>

                                    <v-row class="filasRegistro">


                                       <v-col cols="12" md="3">
                                          <v-text-field label="Libreta de Mar" v-model="libretaMar" variant="outlined"
                                             dense bg-color="white" density="compact">
                                          </v-text-field>
                                       </v-col>


                                       <v-col cols="12" md="3">
                                          <v-text-field label="Banco" v-model="banco" variant="outlined" dense
                                             :rules="inputsRegistroLN" bg-color="white" density="compact">
                                          </v-text-field>
                                       </v-col>
                                       <v-col cols="12" md="3">
                                          <v-text-field label="Cuenta" v-model="cuenta" variant="outlined" dense
                                             :rules="inputsRegistroN" bg-color="white" density="compact" maxlength="11">
                                          </v-text-field>
                                       </v-col>
                                       <v-col cols="12" md="3">
                                          <v-text-field label="CLABE" v-model="clabe" variant="outlined" dense
                                             :rules="inputsRegistroN" bg-color="white" density="compact" maxlength="18">
                                          </v-text-field>
                                       </v-col>
                                    </v-row>
                                    <v-row class="filasRegistro">

                                       <v-col cols="12" md="3">
                                          <v-text-field label="RFC" :rules="inputsRegistroLN" v-model="rfc"
                                             variant="outlined" dense bg-color="white" density="compact">
                                          </v-text-field>
                                       </v-col>

                                       <v-col cols="12" md="3">
                                          <v-text-field label="Código postal de CIF" v-model="cpCIF"
                                             :rules="inputsRegistroLNNR" variant="outlined" dense bg-color="white"
                                             density="compact">
                                          </v-text-field>
                                       </v-col>
                                       <v-col cols="12" md="3">
                                          <v-text-field label="Dirección de CIF" v-model="direccionCIF"
                                             :rules="inputsRegistroLNNR" variant="outlined" dense bg-color="white"
                                             density="compact">
                                          </v-text-field>
                                       </v-col>
                                       <v-col cols="12" md="3">
                                          <v-text-field label="Población de la CIF" v-model="poblacionCIF"
                                             :rules="inputsRegistroLNNR" variant="outlined" dense bg-color="white"
                                             density="compact">
                                          </v-text-field>
                                       </v-col>
                                    </v-row>
                                    <v-row>
                                       <v-col cols="12" md="3">
                                          <v-select v-model="selectInfonavit" :rules="nameRules"
                                             :items="['Si tiene infonavit', 'No tiene infonavit']" variant="outlined"
                                             label="Infonavit" bg-color="white" density="compact">
                                          </v-select>
                                       </v-col>

                                       <v-col cols="12" md="3">
                                          <v-text-field
                                             :disabled="(this.selectInfonavit == 'No tiene infonavit' || this.selectInfonavit == '')"
                                             v-model="numCreditoInfonavit" label="Número de crédito" variant="outlined"
                                             required density="compact"></v-text-field>
                                       </v-col>
                                       <v-col cols="12" md="3">
                                          <v-text-field v-model="fechaImms" label="Fecha de alta IMMS" :rules="nameRules"
                                             variant="outlined" required type="date" density="compact"></v-text-field>
                                       </v-col>
                                    </v-row>

                                    <h3 style="margin-top: 10px;">Expediente clínico</h3>

                                    <v-divider style="margin-bottom: 30px;"></v-divider>
                                    <v-row class="filasRegistro">
                                       <v-col cols="12" md="3">
                                          <v-select label="Tipo de Sangre" v-model="selectTipoSangre" variant="outlined"
                                             :rules="nameRules" dense bg-color="white" density="compact"
                                             :items="['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']">
                                          </v-select>
                                       </v-col>

                                       <v-col cols="12" md="3">
                                          <v-text-field v-model="enfCronicas" label="Enfermedades crónicas"
                                             :rules="nameRules" density="compact" variant="outlined"
                                             required></v-text-field>
                                       </v-col>

                                       <v-col cols="12" md="3">
                                          <v-text-field label="Medicamentos que toma" v-model="medicamentos"
                                             :rules="nameRules" variant="outlined" dense bg-color="white"
                                             density="compact">
                                          </v-text-field>
                                       </v-col>
                                       <v-col cols="12" md="3">
                                          <v-select label="Es donador de organos" v-model="selectOrganos"
                                             :rules="nameRules" variant="outlined" dense :items="['Si', 'No']"
                                             bg-color="white" density="compact">
                                          </v-select>
                                       </v-col>
                                    </v-row>

                                    <v-row class="filasRegistro">
                                       <v-col cols="12" md="3">
                                          <v-select label="Es alérgico a algún medicamento" v-model="selectAlergia"
                                             :rules="nameRules" variant="outlined" dense bg-color="white" density="compact"
                                             :items="['Si', 'No']">
                                          </v-select>
                                       </v-col>

                                       <v-col cols="12" md="3">
                                          <v-text-field v-model="alergiasMedicamento"
                                             :disabled="(this.selectAlergia == 'No' || this.selectAlergia == '')"
                                             label="Alergias a medicamento" density="compact"
                                             variant="outlined"></v-text-field>
                                       </v-col>


                                       <v-col cols="12" md="3">
                                          <v-text-field v-model="alergias" label="Alergias" density="compact"
                                             variant="outlined" required></v-text-field>
                                       </v-col>
                                       <v-col cols="12" md="3">
                                          <v-select label="Tiene tatuajes" v-model="selectTatuajes" variant="outlined"
                                             :rules="nameRules" dense :items="['Si', 'No']" bg-color="white"
                                             density="compact">
                                          </v-select>
                                       </v-col>
                                    </v-row>

                                    <v-row class="filasRegistro">
                                       <v-col cols="12" md="3">
                                          <v-text-field v-model="estatura" label="Estatura(CM)" variant="outlined" required
                                             :rules="inputsRegistroN" density="compact"></v-text-field>
                                       </v-col>

                                       <v-col cols="12" md="3">
                                          <v-text-field v-model="peso" label="Peso(KG)" variant="outlined" required
                                             :rules="inputsRegistroN" density="compact"></v-text-field>
                                       </v-col>

                                       <v-col cols="12" md="3">
                                          <v-select label="Complexión" v-model="selectComplexion" :rules="nameRules"
                                             :items="['Delgada', 'Regular', 'Robusta', 'Atlética', 'Obesa']"
                                             variant="outlined" dense bg-color="white" density="compact">
                                          </v-select>
                                       </v-col>
                                       <v-col cols="12" md="3">
                                          <v-select label="Fuma" v-model="selectFuma" :rules="nameRules"
                                             :items="['Si', 'No']" variant="outlined" dense bg-color="white"
                                             density="compact">
                                          </v-select>
                                       </v-col>
                                    </v-row>

                                    <v-row class="filasRegistro">


                                       <v-col cols="12" md="3">
                                          <v-select label="Consume Alcohol" v-model="selectToma" :rules="nameRules"
                                             :items="['Si', 'No']" variant="outlined" dense bg-color="white"
                                             density="compact">
                                          </v-select>
                                       </v-col>

                                       <v-col cols="12" md="3">
                                          <v-select label="Perforaciones" v-model="selectPerforaciones" :rules="nameRules"
                                             :items="['Si', 'No']" variant="outlined" dense bg-color="white"
                                             density="compact">
                                          </v-select>
                                       </v-col>


                                       <v-col cols="12" md="3">
                                          <v-select label="Utiliza lentes" v-model="selectLentes" :rules="nameRules"
                                             :items="['Si', 'No']" variant="outlined" dense bg-color="white"
                                             density="compact">
                                          </v-select>
                                       </v-col>

                                       <v-col cols="12" md="3">
                                          <v-text-field v-model="colorOjos" label="Color de ojos" variant="outlined"
                                             :rules="inputsRegistroLN" required density="compact"></v-text-field>
                                       </v-col>
                                    </v-row>
                                    <v-row class="filasRegistro">
                                       <v-col cols="12" md="3">
                                          <v-text-field v-model="colorCabello" label="Color de cabello"
                                             :rules="inputsRegistroLN" variant="outlined" required
                                             density="compact"></v-text-field>
                                       </v-col>
                                    </v-row>

                                    <h3 style="margin-top: 10px;">Contacto de emergencia</h3>

                                    <v-divider style="margin-bottom: 30px;"></v-divider>
                                    <v-row class="filasRegistro">
                                       <v-col cols="12" md="4">
                                          <v-text-field v-model="notificarA" label="Notificar a:" variant="outlined"
                                             :rules="inputsRegistroLN" required density="compact"></v-text-field>
                                       </v-col>
                                       <v-col cols="12" md="4">
                                          <v-text-field v-model="parentescoEmergencia" label="Parentesco"
                                             :rules="inputsRegistroLN" variant="outlined" required
                                             density="compact"></v-text-field>
                                       </v-col>
                                       <v-col cols="12" md="4">
                                          <v-text-field v-model="numeroContacto" label="Número de contacto"
                                             :rules="inputsRegistroN" variant="outlined" required density="compact"
                                             maxlength="10"></v-text-field>
                                       </v-col>



                                    </v-row>

                                    <!--BENEFICIARIO-->
                                    <h3 style="margin-top: 10px;">Beneficiario</h3>

                                    <v-divider style="margin-bottom: 30px;"></v-divider>
                                    <v-row class="filasRegistro">
                                       <v-col cols="12" md="4">
                                          <v-text-field v-model="beneficiario" label="Beneficiario:" variant="outlined"
                                             :rules="inputsRegistroLN" required density="compact"></v-text-field>
                                       </v-col>

                                       <!-- <v-col cols="12" md="3" >
                                          <v-text-field :disabled="false" v-model="edadBeneficiario" variant="outlined"
                                               dense bg-color="white" density="compact"
                                             label="Edad del beneficiario" min="0" type="number">
                                          </v-text-field>
                                       </v-col> -->
                                       <!-- 
                                       <v-col cols="12" md="3">
                                          <v-text-field
                                             :disabled="(this.edadBeneficiario >= '18' || this.edadBeneficiario == '')"
                                             v-model="representanteBeneficiario" label="Representante" variant="outlined"
                                             required density="compact"></v-text-field>
                                       </v-col> -->


                                       <v-col cols="12" md="4">
                                          <v-text-field v-model="parentescoBeneficiario" label="Parentesco"
                                             :rules="inputsRegistroLN" variant="outlined" required
                                             density="compact"></v-text-field>
                                       </v-col>
                                       <!-- <v-col cols="12" md="4">
                                          <v-text-field v-model="numeroContactoBene" label="Número de contacto"
                                             :rules="inputsRegistroN" variant="outlined" maxlength="10" required
                                             density="compact"></v-text-field>
                                       </v-col> -->


                                    </v-row>
                                    <!--DATOS PARA CONTRATO-->

                                    <h3 style="margin-top: 10px;">Datos para contrato</h3>
                                    <v-divider style="margin-bottom: 30px;"></v-divider>
                                    <v-row class="filasRegistro">

                                       <v-col cols="12" md="3">
                                          <v-text-field label="N°. Licitación" v-model="numeroLicitacion"
                                             variant="outlined" dense bg-color="white" density="compact">
                                          </v-text-field>
                                       </v-col>

                                       <v-col cols="12" md="3">
                                          <v-text-field v-model="salario" label="Salario" density="compact"
                                             variant="outlined"></v-text-field>
                                       </v-col>

                                       <v-col cols="12" md="3">
                                          <v-text-field label="Cuota Diaria Salario" v-model="cuotaSalario"
                                             variant="outlined" dense bg-color="white" density="compact">
                                          </v-text-field>
                                       </v-col>

                                       <v-col cols="12" md="3">
                                          <v-select label="Equipo/Vehículo a cargo" v-model="selectEquipoACargo"
                                             variant="outlined" dense :items="['Si', 'No']" bg-color="white"
                                             density="compact">
                                          </v-select>
                                       </v-col>
                                    </v-row>



                                    <v-row class="filasRegistro" style="margin-top: 10px; width: 80%; margin-left: 10%;">
                                       <v-textarea solo name="input-7-4" v-model="comentarios" label="Comentarios"
                                          variant="outlined" :rules="inputsRegistroLNNR"></v-textarea>
                                    </v-row>

                                    <!--
                                    <v-btn variant="outlined" color="white" style="background-color: gray;" class="mr-4"
                                    type="submit">
                                          Guardar
                                    </v-btn>
                                    -->
                                    <v-row>
                                       <v-col cols="12" md="6">
                                          <v-btn color="red" @click="(this.dialog = false)">Cancelar</v-btn>
                                       </v-col>
                                       <v-col cols="12" md="6" style="text-align:right">
                                          <v-btn color="primary" @click="registrarEmpleados">Registrar</v-btn>

                                       </v-col>
                                    </v-row>
                                 </v-form>

                              </v-container>
                           </v-card>


                        </template>
                     </v-dialog>

                     <v-dialog v-model="dialogUsuarioActivo" width="60%" min-height="40%" persistent="true">
                        <template v-slot:default="dialogUsuarioActivo">
                           <v-card>
                              <v-toolbar color="primary" dark style="position: fixed;z-index: 100; width: 100%;">
                                 <v-row>
                                    <v-col cols="8">
                                       <h2 style="margin-left: 20px"> Empleado registrado y activo </h2>

                                    </v-col>
                                    <v-col cols="4">
                                       <v-btn style="position: fixed; right: 0; top: 0;"
                                          @click="this.dialogUsuarioActivo = false" size="x-large"
                                          icon="mdi-close-circle"></v-btn>
                                    </v-col>
                                 </v-row>

                              </v-toolbar>

                              <v-container>
                                 <h4>Este empleado ya esta registrado en el sistema y se encuentra activo:</h4>

                                 <v-row style="margin-top: 4%;">
                            
                                    <v-col cols="6">

                                       <v-list class="d-flex justify-center" style="width: 100%;" >
                                          <v-list-item title="Nombre" >
                                             <v-list-item-subtitle >{{ nombreUsuarioActivo }}</v-list-item-subtitle>
                                          </v-list-item>
                                       </v-list>
                                    </v-col>
                                    <v-col cols="6">
                                       <v-list class="d-flex justify-center" style="width: 100%;" >
                                          <v-list-item title="Servicio">
                                             <v-list-item-subtitle>{{ servicioUsuarioActivo }}</v-list-item-subtitle>
                                          </v-list-item>
                                       </v-list>
                                    </v-col>
 
                                 </v-row>
                                 <v-row>
                            
                                    <v-col cols="6">

                                       <v-list class="d-flex justify-center" style="width: 100%;"> 
                                          <v-list-item title="Departamento">
                                             <v-list-item-subtitle>{{ departamentoUsuarioActivo }}</v-list-item-subtitle>
                                          </v-list-item>
                                       </v-list>
                                    </v-col>
                                    <v-col cols="6">
                                       <v-list class="d-flex justify-center" style="width: 100%;" >
                                          <v-list-item title="Puesto">
                                             <v-list-item-subtitle>{{ puestoUsuarioActivo }}</v-list-item-subtitle>
                                          </v-list-item>
                                       </v-list>
                                    </v-col>
 
                                 </v-row>
  
                              </v-container>
                              <v-btn color="blue">Cerrar</v-btn>
                           </v-card>


                        </template>
                     </v-dialog>
                  </div>
               </v-col>


            </v-row>
            <tablaEmpleados ref="tablaEmpleados"> </tablaEmpleados>
         </v-window-item>


         <v-window-item value="tab-2" style="min-height:  100%; margin-top: 2%; margin-bottom: 5%; border: 0;">
            <tablaBajas ref="tablaBajas"></tablaBajas>
         </v-window-item>
      </v-window>


   </v-card>
</template>
 
<script>
import { invokeArrayFns } from '@vue/shared';
import axios from 'axios';
import { isNull } from 'lodash';
import tablaEmpleados from '../../components/tablaEmpleados.vue'
import tablaBajas from '../../components/tablasBajas.vue'

export default {
   components: {
      EasyDataTable: window['vue3-easy-data-table'],
      tablaEmpleados: tablaEmpleados,
      tablaBajas: tablaBajas
   },
   data() {
      return {
         nombreUsuarioActivo: '',
         servicioUsuarioActivo: '',
         departamentoUsuarioActivo: '',
         tipoEmpleadoUsuarioActivo: '',
         puestoUsuarioActivo: '',
         dialogUsuarioActivo: false,
         servicioSeleccionado: 0,
         ServiciosDisponibles: [],
         //Total de empleados
         totalEmpleadosActivos: 0,
         totalEmpleadosBaja: 0,
         totalRegistroPatronal: 0,

         //permisos modulo
         nuevoEmpleado_dis: true,
         verExpediente_dis: true,
         //permisos
         permisoUsuario: true,
         historialCurp: [],
         headers: [
            { text: "Fecha de ingreso", value: "fechaIngreso" },
            { text: "Fecha de baja", value: "fechaBaja" },
            { text: "Motivo de baja", value: "motivoBaja" },
            { text: "Servicio", value: "nombre" },
            { text: "Puesto", value: "puesto" }
         ],
         curpInput: '',
         image: undefined,
         // to save image url
         imageUrl: '',
         //conexion
         //pruebas:'http://localhost:7005/',
         //produccion:'http://api-app.duxon.com.mx/',
         //entorno: 'http://api-app.duxon.com.mx/',
         entorno: 'http://localhost:7005/',



         //rules
         nameRules: [
            v => !!v || 'Campo requerido'
         ],
         //rules generals from inputs
         rulesInputClaveCurp: [
            value => !!value || 'Campo requerido.',
            value => value.length <= 18 || 'Maximo 18 caracteres',
            value => {
               const pattern = /^[A-Z0-9]+$/g
               return pattern.test(value) || 'Solo numeros y letras mayusculas.'
            },
         ],
         // /^[A-Z0-9\s]+$/
         inputsRegistroLN: [
            value => !!value || 'Campo requerido.',
            value => {
               const pattern = /^[A-Za-zÀ-Öá-ö0-9\s]+$/g
               return pattern.test(value) || 'Solo numeros y letras.'
            },
         ],

         inputsRegistroN: [
            value => !!value || 'Campo requerido.',
            value => {
               const pattern = /^[0-9]+$/g
               return pattern.test(value) || 'Solo numeros.'
            },
         ],

         inputsRegistroNNR: [
            value => {
               const pattern = /^[0-9]*?$/g
               return pattern.test(value) || 'Solo numeros.'
            },
         ],

         nameRulesinputsTelefonos: [
            value => !!value || 'Campo requerido.',
            value => value.length <= 10 || 'Maximo 10 digitos',
            value => {
               const pattern = /^[0-9]+$/g
               return pattern.test(value) || 'Solo numeros.'
            },
         ],

         nameRulesinputsCorreos: [
            value => !!value || 'Campo requerido.',
            //value => (value || '').length <= 20 || 'Max 20 characters',
            value => {
               const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
               return pattern.test(value) || 'Correo invalido.'
            },
         ],

         inputsRegistroLNNR: [
            value => {
               const pattern = /^[A-Za-zÀ-Öá-ö0-9\s]*?$/
               return pattern.test(value) || 'Solo numeros y letras.'
            },
         ],


         //Campos de registro
         selectServicio: 0,
         enfCronicas: '',
         nEmpleado: '',
         fechaIngreso: '',
         selectTurno: "",
         selectDepartamento: "",
         selectPuesto: '',
         sueldoDeseado: '',
         selectZona: "",
         numContrato: '',
         fechaContrato1: '',
         selectNivelEstudios: "",
         selectInfonavit: "",
         fechaImms: '',
         aniosLaborados: '',
         nombre: '',
         apellidoPaterno: '',
         apellidoMaterno: '',
         selectSexo: "",
         selectEstadoNacimiento: "",
         fechaNacimiento: '',
         lugarNacimiento: '',
         municipioNacimiento: '',
         paisNacimiento: '',
         nacionalidad: '',
         estatura: '',
         peso: '',
         selectEstadoCivil: "",
         selectComplexion: "",
         selectFuma: "",
         selectToma: "",
         calle: '',
         nExterior: '',
         nInterior: '',
         FraccColonia: '',
         codigoPostal: '',
         entreCalle: '',
         yCalle: '',
         ciudad: '',
         telefono: '',
         celular: '',
         correo: '',
         nCartilla: '',
         curp: '',
         nPasaporte: '',
         rfc: '',
         afore: '',
         nss: '',
         claveElector: '',
         selectTipoLicencia: "",
         fechaVigencia: '',
         selectTipoSangre: '',
         banco: '',
         cuenta: '',
         libretaMar: '',
         selectOrganos: '',
         selectAlergia: '',
         alergias: '',
         alergiasMedicamento: '',
         selectTatuajes: '',
         selectPerforaciones: '',
         selectLentes: '',
         colorCabello: '',
         colorOjos: '',
         notificarA: '',
         parentescoEmergencia: '',
         numeroContacto: '',
         valid: true,
         beneficiario: '',
         parentescoBeneficiario: '',
         numeroContactoBene: '',
         clabe: '',
         comentarios: '',
         fechaContratoIndeterminado: '',
         tipoEmpleado: "",
         numCreditoInfonavit: '',
         selectServicio: "",
         servicios: [],
         cpCIF: '',
         direccionCIF: '',
         poblacionCIF: '',
         medicamentos: '',
         fechaContrato2: '',
         numeroLicitacion: '',
         salario: '',
         cuotaSalario: '',
         edadBeneficiario: '',
         representanteBeneficiario: '',
         selectEquipoACargo: '',

         //Items
         turnos: [
            "",
            "8",
            "12",
            "24",
            "libre"
         ],
         departamentos: [
            "ADMINISTRACIÓN Y FINANZAS",
            "CAPITAL HUMANO",
            "JURÍDICO Y LABORAL",
            "CONCURSOS Y PROCESOS TÉCNICOS",
            "DIRECCIÓN GENERAL",
            "GESTION DE CALIDAD Y CAPACITACIÓN",
            "RECURSOS MATERIALES",
            "OPERACIONES"

         ],
         puesto: [],

         zona: ["NOROESTE", "NORTE", "NORESTE", "CENTRO", "GOLFO-SUR"],
         idEmpleadoClaveCurp: '',
         tabRegistro: '',

         tab: "tab-1",
         drawer: '',
         i: [
            ['', 'Empleados Activos'],
            //['mdi-send', 'Jurídico'],
            ['', 'Empleados dados de baja'],
         ],
         dialogHistorialBajas: false,
         dialog: false,
         dialogClaveCurp: false,
         estados: ["Extranjero", "Aguascalientes", "Baja California", "Baja California Sur", "Campeche", "Chiapas", "Chihuahua", "Ciudad de México", "Coahuila de Zaragoza", "Colima", "Durango", "Estado de México", "Guanajuato", "Guerrero", "Hidalgo", "Jalisco", "Michoacán de Ocampo", "Morelos", "Nayarit", "Nuevo León", "Oaxaca", "Puebla", "Querétaro", "Quintana Roo", "San Luis Potosí", "Sinaloa", "Sonora", "Tabasco", "Tamaulipas", "Tlaxcala", "Veracruz de Ignacio de la Llave", "Yucatán", "Zacatecas"]
      }
   },
   created() {
      localStorage.setItem("servicioActual", 0);
      this.empleadosActivosBajas()
      this.mostrarTotalEmpleados()
      this.validarPermisos()
      // var permisosCH=localStorage.getItem("permisosCH");
      this.getPermisoArea()

   },
   mounted() {
      this.$refs.tablaEmpleados.getEmpleados()
      //this.$refs.tablaBajas.getEmpleados()
   }
   ,
   watch: {
      servicioSeleccionado() {
         localStorage.setItem("servicioActual", this.servicioSeleccionado);
         this.empleadosActivosBajas()
         switch (this.tab) {
            case "tab-1":
               this.$refs.tablaEmpleados.getEmpleados()
               break;
            case "tab-2":
               this.$refs.tablaBajas.getEmpleados()
               break;
            default:
               break;
         }

      },
      dialogClaveCurp() {
         if (
            this.dialogClaveCurp == false) {
            this.curpInput = ""

         }

      },
      tipoEmpleado() {
         this.selectPuesto = ""
         this.selectZona = ""
         if (this.tipoEmpleado == "Administrativo") {

         }
      },
      fechaIngreso() {
         //this.añosLaborados
         let aniosLaborados = this.diferencianios(this.fechaIngreso)
         this.aniosLaborados = aniosLaborados

      },
      selectDepartamento() {
         this.selectPuesto = ""
         switch (this.selectDepartamento) {

            case "DIRECCIÓN GENERAL":
               this.puesto = ["DIRECCIÓN", "COORDINACIÓN DE DISEÑO E IMAGEN", "JEFATURA DE DISEÑO E IMAGEN", "RESPONSABLE DE DISEÑO E IMAGEN", "GESTOR COMERCIAL", "ASISTENTE DE DIRECCIÓN"]
               this.tipoEmpleado = "Administrativo";
               this.servicios = [{
                  'nombre': "Administrativo",
                  'idServicio': 1
               }];
               this.selectServicio = 1;


               break;
            case "GESTION DE CALIDAD Y CAPACITACIÓN":
               this.tipoEmpleado = "Administrativo"

               this.puesto = ["GERENCIA DE GESTION DE CALIDAD Y CAPACITACION ", "COORDINADOR DE CAPACITACIÓN", "INSTRUCTOR AVSEC", "CAPACITACIÓN (EVENTUAL)", "CAPACITACIÓN", "JEFATURA DE GESTIÓN DE CALIDAD", "CONTROL DOCUMENTAL", "RESPONSABLE DE GESTIÓN DE CALIDAD", "JEFATURA DE DESARROLLO", "PROGRAMACIÓN"]
               this.servicios = [{
                  "nombre": "Administrativo",
                  "idServicio": 1
               }]
               this.selectServicio = 1

               break;
            case "JURÍDICO Y LABORAL":
               this.puesto = ["GERENCIA JURIDICO/LABORAL", "JEFATURA JURIDICO", "RESPONSABLE DE JURÍDICO", "COORDINACIÓN LABORAL", "GESTORÍA LABORAL"]
               this.tipoEmpleado = "Administrativo"

               this.servicios = [{
                  "nombre": "Administrativo",
                  "idServicio": 1
               }]
               this.selectServicio = 1
               break;
            case "CONCURSOS Y PROCESOS TÉCNICOS":
               this.puesto = ["GERENCIA DE CONCURSOS Y PROCESOS TÉCNICOS", "ENLACE CDMX", "JEFATURA DE LICITACIONES", "RESPONSABLE DE LICITACIONES", "JEFATURA DE PROCESOS TÉNICOS", "RESPONSABLE DE PROCESOS TECNICOS", "GESTORÍA DE PERMISOS"]
               this.tipoEmpleado = "Administrativo"

               this.servicios = [{
                  "nombre": "Administrativo",
                  "idServicio": 1
               }]
               this.selectServicio = 1
               break;

            case "ADMINISTRACIÓN Y FINANZAS":
               this.puesto = ["GERENCIA DE ADMINISTRACION Y FINANZAS", "SUBGERENCIA DE ADMINISTRACION Y FINANZAS", "ANALISTA DE CONTROL PRESUPUESTAL", "ANALISTA DE PRESUPUESTO", "ANALISTA DE EGRESOS", "ANALISTA DE FACTURACIÓN Y TESORERÍA", "RESPONSABLE ADMÓN. DE FACTURACIÓN", "ANALISTA DE COBRANZA", "ENLACE DE PROYECTOS", "FISCALISTA", "ANALISTA SUA FISCAL ", "ANALISTA DE CONTABILIDAD (SEPIVER)"]
               this.tipoEmpleado = "Administrativo"

               this.servicios = [{
                  "nombre": "Administrativo",
                  "idServicio": 1
               }]
               this.selectServicio = 1
               break;
            case "RECURSOS MATERIALES":
               this.puesto = ["GERENCIA DE RECURSOS MATERIALES ", "SUBGERENCIA DE RECURSOS MATERIALES", "ANALISTA CONTABLE ZONA CENTRO NORTE", "ANALISTA DE COMPRAS ZONA CENTRO NORTE", "RESPONSABLE ADMINISTRATIVO ZONA CENTRO NORTE", "ANALISTA CONTABLE ZONA GOLFO SUR", "ANALISTA DE COMPRAS GOLFO SUR", "RESPONSABLE ADMON GOLFO SUR ", "JEFATURA DE ALMACEN ZONA CENTRO NORTE", "RESPONSABLE DE ALMACEN Y ENTREGAS ZONA TAMPICO ", "RESPONSABLE DE ALMACEN Y ENTREGAS ZONA TAMAULIPAS ", "RESPONSABLE DE ALMACEN Y ENTREGAS ZONA ENSENADA ", "JEFATURA DE ALMACEN ZONA GOLFO SUR", "RESPONSABLE DE ALMACEN Y ENTREGAS DOS BOCAS ", "RESPONSABLE DE ALMACEN Y ENTREGAS ZONA VERACRUZ", "COORDINACIÓN T.I.", "RESPONSABLE DE CCTV", "RESPONSABLE DE RADIOCOMUNICACIÓN", "RESPONSABLE DE SOPORTE TÉCNICO", "SUBGERENCIA DE FLOTILLA, TI Y MANTENIMIENTO", "JEFATURA DE FLOTILLA", "RESPONSABLE DE FLOTILLA ZONA CENTRO NORTE", "RESPONSABLE DE FLOTILLA ZONA GOLFO SUR", "COORDINACIÓN DE MANTENIMIENTO Y LIMPIEZA ", "PERSONAL DE LIMPIEZA OF. MATRIZ", "PERSONAL DE LIMPIEZA OF. TAMAULIPAS"]
               this.tipoEmpleado = "Administrativo"

               this.servicios = [{
                  "nombre": "Administrativo",
                  "idServicio": 1
               }]
               this.selectServicio = 1
               break;

            case "CAPITAL HUMANO":
               this.tipoEmpleado = "Administrativo"

               this.selectZona = ""
               this.puesto = []
               this.servicios = [{
                  "nombre": "Administrativo",
                  "idServicio": 1
               }]
               this.selectServicio = 1

               break;

            case "OPERACIONES":
               this.selectServicio = ""
               this.selectZona = ""
               this.puesto = []

               break;

            default:
               break;
         }

      },
      selectZona() {
         //Logicas para Operativos
         if (this.tipoEmpleado == "Operativo" && this.selectDepartamento == "OPERACIONES") {
            this.servicios = []
            this.selectServicio = ''
            this.selectPuesto = ""
            switch (this.selectZona) {
               case "NORTE":
                  this.obtenerServicio(this.selectZona)
                  break;
               case "NORESTE":
                  this.obtenerServicio(this.selectZona)
                  break;
               case "NOROESTE":
                  this.obtenerServicio(this.selectZona)
                  break;
               case "CENTRO":
                  this.obtenerServicio(this.selectZona)
                  break;
               case "GOLFO-SUR":
                  this.obtenerServicio(this.selectZona)
                  break;
               default:
                  break;
            }
         }
         if (this.tipoEmpleado == "Administrativo" && this.selectDepartamento == "OPERACIONES") {
            this.selectPuesto = ""
            this.servicios = [{
               "nombre": "Administrativo",
               "idServicio": 0
            }]
            this.selectServicio = 0
            if (this.selectZona == "NORTE") {
               this.puesto = ["GERENTE DE OPERACIONES", "SUBGERENTE DE OPERACIONES", "COORDINACIÓN AP/OP DE INDEP(GENERAL)", "RESPONSABLE DE OPERACIONES ZONA NORTE", "COORDINACIÓN SENIOR ZONA NORTE", "COORDINACIÓN OPERTIVA ENSENADA", "COORDINACIÓN OPERATIVA TIJUANA", "JEFATURA DE ALMACEN INDEP TIJUANA", "SUPERVISIÓN LA PAZ", "SUPERVISIÓN LORETO", "SUPERVISIÓN MEXICALI", "SUPERVISIÓN TIJUANA", "COORDINACIÓN OPERATIVA SONORA", "JEFATURA DE ALMACEN INDEP SONORA", "SUPERVISIÓN NOGALES", "SUPERVISIÓN HERMOSILLO", "SUPERVISIÓN CIUDAD OBREGON", "COORDINACIÓN OPERATIVA CHIHUAHUA", "JEFATURA DE ALMACEN INDEP CHIHUAHUA", "SUPERVISIÓN CD JUAREZ", "SUPERVISIÓN CHIHUAHUA", "SUPERVISIÓN NICOLÁS BRAVO", "COORDINACIÓN OPERATIVA SINALOA DURANGO", "JEFATURA DE ALMACEN INDEP SINALOA", "SUPERVISIÓN DURANGO", "SUPERVISIÓN SINALOA"]
            }
            if (this.selectZona == "NORESTE") {
               this.puesto = ["GERENTE DE OPERACIONES", "SUBGERENTE DE OPERACIONES", "COORDINACIÓN AP/OP DE INDEP(GENERAL)", "COORDINACIÓN OPERTIVA ENSENADA", "COORDINACIÓN OPERATIVA TIJUANA", "COORDINACIÓN SENIOR ZONA NORESTE", "COORDINACIÓN OPERATIVA TAMPICO", "COORDINACIÓN OPERATIVA ALTAMIRA ASIPONA", "CHOFER CAMION", "CHOFER CUBREDESCANSO CAMION / VAN", "SUPERVISOR ASIPONA ALTAMIRA SEGURIDAD DIURNO", "SUPERVISOR ASIPONA ALTAMIRA SEGURIDAD NOCTURNO", "COORDINACIÓN OPERATIVA TAMAULIPAS ALTAMIRA CCTV", "CHOFER VAN", "COORDINACIÓN OPERATIVA NUEVO LEON", "JEFATURA DE ALMACEN INDEP MONTERREY", "SUPERVISIÓN MONTERREY", "SUPERVISIÓN COAHUILA", "SUPERVISIÓN ALTAMIRA", "SUPERVISIÓN NUEVO LAREDO", "SUPERVISIÓN MATAMOROS"]
            }
            if (this.selectZona == "NOROESTE") {
               this.puesto = ["GERENTE DE OPERACIONES", "SUBGERENTE DE OPERACIONES", "COORDINACIÓN AP/OP DE INDEP(GENERAL)", "COORDINACIÓN OPERTIVA ENSENADA", "COORDINACIÓN OPERATIVA TIJUANA", "JEFATURA DE ALMACEN INDEP TIJUANA", "SUPERVISIÓN LA PAZ", "SUPERVISIÓN LORETO", "SUPERVISIÓN MEXICALI", "SUPERVISIÓN TIJUANA", "COORDINACIÓN OPERATIVA SONORA", "JEFATURA DE ALMACEN INDEP SONORA", "SUPERVISIÓN NOGALES", "SUPERVISIÓN HERMOSILLO", "SUPERVISIÓN CIUDAD OBREGON", "COORDINACIÓN OPERATIVA CHIHUAHUA", "JEFATURA DE ALMACEN INDEP CHIHUAHUA", "SUPERVISIÓN CD JUAREZ", "SUPERVISIÓN CHIHUAHUA", "SUPERVISIÓN NICOLÁS BRAVO", "COORDINACIÓN OPERATIVA SINALOA DURANGO", "JEFATURA DE ALMACEN INDEP SINALOA", "SUPERVISIÓN DURANGO", "SUPERVISIÓN SINALOA"]
            }
            if (this.selectZona == "CENTRO") {
               this.puesto = ["GERENTE DE OPERACIONES", "SUBGERENTE DE OPERACIONES", "COORDINACIÓN AP/OP DE INDEP(GENERAL)", "RESPONSABLE DE OPERACIONES ZONA CENTRO", "COORDINACIÓN OPERATIVA CDMX", "SUPERVISIÓN CDMX", "SUPERVISIÓN LAZARO CARDENAS", "COORDINACIÓN OPERATIVA OCCIDENTE GUADALAJARA", "JEFATURA DE ALMACEN INDEP TLAQUEPAQUE", "JEFATURA DE ALMACEN INDEP MANZANILLO", "SUPERVISIÓN JALISCO", "SUPERVISIÓN NAYARIT", "COORDINACIÓN OPERATIVA BAJÍO QUERETARO", "JEFATURA DE ALMACEN INDEP QUERETARO", "SUPERVISIÓN AGUASCALIENTES", "SUPERVISIÓN QUERETARO", "SUPERVISIÓN SAN LUIS POTOSI", "SUPERVISIÓN GUANAJUATO", "SUPERVISIÓN ZACATECAS"]
            }

            if (this.selectZona == "GOLFO-SUR") {
               this.puesto = ["GERENTE DE OPERACIONES", "SUBGERENTE DE OPERACIONES", "COORDINACIÓN AP/OP DE INDEP(GENERAL)", "COORDINACIÓN OPERATIVA GOLFO", "JEFATURA DE ALMACEN INDEP VERACRUZ", "SUPERVISIÓN VERACRUZ", "SUPERVISIÓN VERACRUZ NOCTURNO", "SUPERVISÓN XALAPA TEZIUTLAN", "SUPERVISIÓN COATZACOALCOS", "SUPERVISIÓN PUEBLA", "SUPERVISIÓN CORDOBA ORIZABA", "SUPERVISIÓN MINATITLAN / OAXACA", "SUPERVISIÓN TLAXCALA", "SUPERVISIÓN POZA RICA", "SUPERVISIÓN PAPALOAPAN LOS TUXTLAS", "COORDINACIÓN OPERATIVA PROGRESO/YUCATAN", "SUPERVISIÓN CANCUN", "COORDINACIÓN OPERATIVA DOS BOCAS", "SUPERVISIÓN CHIAPAS", "COORDINACIÓN OPERATIVA ASIPONA VERACRUZ", "COORDINACIÓN DE MONITOREO GPS ", "RESPONSABLE DE COMBUSTIBLE", "RESPONSABLE DE MONITOREO ROTATIVO"]
            }
         }
         //Logicas para CH
         if (this.selectDepartamento == "CAPITAL HUMANO") {

            this.selectPuesto = ""
            if (this.selectZona == "NORTE") {
               this.puesto = ["GERENTE DE CAPITAL HUMANO", "COMUNICACIÓN Y DESARROLLO ORGANIZACIONAL", "RESPONSABLE DE CAPITAL HUMANO (ADMINISTRATIVO)", "COORDINACIÓN DE RECLUTAMIENTO", "RECLUTAMIENTO ", "SUBGERENCIA DE CAPITAL HUMANO NORTE", "RESPONSABLE DE CAPITAL HUMANO ENSENADA", "RESPONSABLE DE CAPITAL HUMANO TAMPICO", "JEFATURA DE NOMINAS NORTE / NORESTE", "ANALISTA DE NOMINAS ASIPONA ALTAMIRA SEGURIDAD / ADMN", "ANALISTA DE NOMINAS ASIPONA TAMPICO Y ASIPONA ALTAMIRA CCTV", "ANALISTA DE NOMINAS ASIPONA ENSENADA / ADUANAS SEMANAL"]
            }
            if (this.selectZona == "NORESTE") {
               this.puesto = ["GERENTE DE CAPITAL HUMANO", "COMUNICACIÓN Y DESARROLLO ORGANIZACIONAL", "RESPONSABLE DE CAPITAL HUMANO (ADMINISTRATIVO)", "COORDINACIÓN DE RECLUTAMIENTO", "RECLUTAMIENTO ", "RESPONSABLE DE CAPITAL HUMANO ENSENADA", "SUBGERENCIA DE CAPITAL HUMANO NORESTE", "RESPONSABLE DE CAPITAL HUMANO TAMPICO", "RESPONSABLE DE CAPITAL HUMANO ALTAMRIA", "RESPONSABLE DE CAPITAL HUMANO NORESTE", "JEFATURA DE NOMINAS NORTE / NORESTE", "ANALISTA DE NOMINAS ASIPONA ALTAMIRA SEGURIDAD / ADMN", "ANALISTA DE NOMINAS ASIPONA TAMPICO Y ASIPONA ALTAMIRA CCTV", "ANALISTA DE NOMINAS ASIPONA ENSENADA / ADUANAS SEMANAL"]
            }
            if (this.selectZona == "NOROESTE") {
               this.puesto = ["GERENTE DE CAPITAL HUMANO", "COMUNICACIÓN Y DESARROLLO ORGANIZACIONAL", "RESPONSABLE DE CAPITAL HUMANO (ADMINISTRATIVO)", "COORDINACIÓN DE RECLUTAMIENTO", "RECLUTAMIENTO", "RESPONSABLE DE CAPITAL HUMANO ENSENADA", "ANALISTA DE NOMINAS ASIPONA ALTAMIRA SEGURIDAD / ADMN", "ANALISTA DE NOMINAS ASIPONA TAMPICO Y ASIPONA ALTAMIRA CCTV", "ANALISTA DE NOMINAS ASIPONA ENSENADA / ADUANAS SEMANAL"]
            }
            if (this.selectZona == "CENTRO") {
               this.puesto = ["GERENTE DE CAPITAL HUMANO", "COMUNICACIÓN Y DESARROLLO ORGANIZACIONAL", "RESPONSABLE DE CAPITAL HUMANO (ADMINISTRATIVO)", "COORDINACIÓN DE RECLUTAMIENTO", "RECLUTAMIENTO ", "SUBGERENCIA DE CAPITAL HUMANO CENTRO", "RESPONSABLE DE CAPITAL HUMANO ADUANAS", "RESPONSABLE DE CAPITAL HUMANO BAJIO/OCCIDENTE", "JEFATURA DE NOMINAS CENTRO / SUR", "RESPONSABLE DE AFILIACIONES", "SUBGERENTE CENTRO", "RESPONSABLE C.H. BAJÍO", "RESPONSABLE C.H. CDMX", "RESPONSABLE C.H. CDMX", "RESPONSABLE C.H. CDMX", "RESPONSABLE DE NÓMINAS CDMX", "RESPONSABLE DE NÓMINAS INDEP"]
            }

            if (this.selectZona == "GOLFO-SUR") {
               this.puesto = ["GERENTE DE CAPITAL HUMANO", "COMUNICACIÓN Y DESARROLLO ORGANIZACIONAL", "RESPONSABLE DE CAPITAL HUMANO (ADMINISTRATIVO)", "COORDINACIÓN DE RECLUTAMIENTO", "RECLUTAMIENTO", "RESPONSABLE DE CAPITAL HUMANO ADUANAS", "RESPONSABLE DE CAPITAL HUMANO BAJIO/OCCIDENTE", "SUBGERENCIA DE CAPITAL HUMANO GOLFO SUR", "JEFATURA DE CAPITAL HUMANO GOLFO SUR", "RESPONSABLE DE CAPITAL HUMANO PROGRESO", "RESPONSABLE DE CAPITAL HUMANO VERACRUZ", "RESPONSABLE DE CAPITAL HUMANO DOS BOCAS", "JEFATURA DE AREA DE CAPITAL HUMANO GOLFO SUR", "RESPONSABLE DE CAPITAL HUMANO GOLFO", "RESPONSABLE DE CAPITAL HUMANO COATZACOALCOS", "SUBGERENCIA DE NOMINAS", "ANALISTA DE NOMINAS ADUANAS QUINCENAL", "JEFATURA DE NOMINAS NORTE / NORESTE", "ANALISTA DE NOMINAS ASIPONA ALTAMIRA SEGURIDAD / ADMN", "ANALISTA DE NOMINAS ASIPONA TAMPICO Y ASIPONA ALTAMIRA CCTV", "ANALISTA DE NOMINAS VERACRUZ", "ANALISTA DE NOMINAS GOLFO SUR", "ANALISTA DE NOMINAS ASA", "JEFATURA DE NOMINAS CENTRO / SUR", "ANALISTA DE NOMINAS INDEP 1 Y 2", "ANALISTA DE NOMINAS DOS BOCAS / PROGRESO", "ANALISTA DE AFILIACIONES"]
            }


         }





      },
      selectServicio() {

         switch (this.selectServicio) {
            case 22: //ASIPONA ENSENADA
               this.puesto = ""
               this.selectPuesto = ""
               this.puesto = ["GUARDIA/VIGILANTE", "GUARDIA AUXILIAR CONTROL", "GUARDIA AUXILIAR ADMINISTRATIVO", "GUARDIA MARINERO", "GUARDIA CONTROL", "GUARDIA (PARAMEDICO)", "GUARDIA (BOMBERO)"]
               break;

            case 28: //ASIPONA TAMPICO 
               this.puesto = ""
               this.selectPuesto = ""
               this.puesto = ["A1 - OFICIAL GENERAL", "B1 - VIALIDAD", "B2 - OPERADORES DE CCTV", "B2 - TECNICO EN COMPUTACION", "B3 - OPERADORES DEL SISTEMA DE CONTROL DE ACCESO", "B4 - ADMINISTRATIVOS", "C1 - JEFE DE TURNO"]
               break
            case 31: //ASIPONA ALTAMIRA
               this.puesto = ""
               this.selectPuesto = ""
               this.puesto = ["SG-7 - SUPERVISOR GENERAL", "OP M6 - OFICIAL DE PROTECCION EN MOTOCICLETA", "OP P5 - OFICIAL DE PROTECCION EN VEHICULO", "OP SA-4 - OFICIAL DE PROTECCION", "OP SA-4 - SUPERVISION AUXILIAR", "OP TUM-3 - OFICIAL DE PROTECCION Y SUPERVISION EN MUELLES TUM", "OPC2 - OFICIAL DE PROTECCION EN CUATRIMOT", "OP V1 - OFICIAL DE PROTECCION"]
               break

            case 5: //AEFCM
               this.puesto = ""
               this.selectPuesto = ""
               this.puesto = ["GUARDIA GENERAL", "ENCARGADOS DE TURNO", "JEFES DE SERVICIO"]
               break
            case 26: //ASIPONIA PROGRESO
               this.puesto = ""
               this.selectPuesto = ""
               this.puesto = ["GUARDIA A1 - VIGILANCIA", "GUARDIA A2 - MARINO", "GUARDIA B1 - JEFE DE AREA", "GUARDIA B2 - PATRON DE LANCHA", "GUARDIA B3 - VIGILANCIA CCTV", "SUPERVISOR DE APOYO S1 - SUPERVISOR DE GUARDIAS", "SUPERVISOR DE APOYO GENERAL S2 - SUPERVISOR DE GUARDIAS"]
               break
            case 23://ASIPONIA DOS BOCAS
               this.puesto = ""
               this.selectPuesto = ""
               this.puesto = ["A1 - GUARDIA", "A2 - BOMBERO", "A2 - PARAMEDICO", "A2 - SUPERVISORES DE PROTECCION", "A2 - SUPERVISORES EN SITIO", "A3 - COMANDO", "A3 - SUPERVISOR DE PERSONAL", "A4 - COORDINADOR OPERATIVO", "ADMINISTRATIVO"]
               break

            case 32: //ASIPONIA ALTAMIRA CCTV 
               this.puesto = ""
               this.selectPuesto = ""
               this.puesto = ["NIVEL 1 - SUPERVISOR GENERAL DEL SISPP-PBIP/ PILOTO DE AERONAVE", "NIVEL 1 - SUPERVISOR GENERAL DEL SISPP-SEGURIDAD (SG-SISPP)", "NIVEL 2 - SUPERVISOR OPERATIVO DEL SISPP (SO-SISPP)", "NIVEL 2 - COORDINADOR ANALISTA Y ADMINISTRATIVO (CA-PBIP)", "NIVEL 3 - COORDINADOR OPERATIVO DEL SISTEMA SISPP (CO-SISPP)", "NIVEL 3 - COORDINADOR DE SEGURIDAD Y PROTECCION PORTUARIA PBIP (CO-PBIP)", "NIVEL 4 - OPERADOR DEL SISTEMA CCTV (OPE-CCTV)", "NIVEL 5 - OFICIAL DE COMUNICACIONES Y PARTE INFORME/BASE ALFA/ BASE CHARLY/ BASE ECO)"]
               break

            case 27: //ASIPONA VERACRUZ
               this.puesto = ""
               this.selectPuesto = ""
               this.puesto = ["N1 - VIGILANTE", "N1 - RECEPCION VISITANTES", "N1 - OPERADOR DE EQUIPOS DE RAYOS X", "N1	- CUBRE DESCANSO", "N2	PATRULLERO", "N2 - PARAMEDICOS", "N2 - PATRON DE LANCHA", "N2 - RECEPCION TRIPULANTES", "N2 - AUXILIAR ADMINISTRATIVO", "N3 - BOMBERO", "N4 - COORDINADOR ADMINISTRATIVO", "N4 - OFICIAL BOMBERO", "N4 - COORDINADOR OPERATIVO"]
               break
            case 3:
            case 14:
            case 6:
            case 7:
            case 8:
            case 9:
            case 10:
            case 11:
            case 12:
            case 13:
            case 15:
            case 16:
            case 17:
            case 18:
            case 19:
            case 20:
            case 21:
            case 29:
            case 30: //INEGI VERACRUZ
               this.puesto = ""
               this.selectPuesto = ""
               this.puesto = ["OFICIAL DE SEGURIDAD"]
         }
      }
   },
   methods: {
      mostrarTotalEmpleados() {
         let ServiciosDisponibles = localStorage.getItem("serviciosAsignados");
         let self = this
         axios.post(this.entorno + 'general/listaServicios', {
            servicios: ServiciosDisponibles
         }).then(function (response) {
            self.ServiciosDisponibles = response.data
            self.ServiciosDisponibles.unshift(
               { idServicio: 0, nombre: "TODOS", zona: "GENERAL", contrato: "NA", estado: null })
         });
      },
      empleadosActivosBajas() {
         let self = this
         let ServiciosDisponibles = 0
         if (self.servicioSeleccionado == 0) {

            ServiciosDisponibles = localStorage.getItem("serviciosAsignados");
         } else {
            ServiciosDisponibles = this.servicioSeleccionado
         }
         axios.post(this.entorno + 'empleados/getTotalEmpleados', {
            servicios: ServiciosDisponibles
         }).then(function (response) {
            self.totalEmpleadosActivos = response.data[0].activos
            self.totalEmpleadosBaja = response.data[0].bajas
            self.totalRegistroPatronal = response.data[0].registroPatronal
         });
      },
      getPermisoArea() {
         let self = this
         axios.post(this.entorno + 'general/permisoUsuarioCH', {
            idEmpleado: localStorage.getItem("id")
         }).then(function (response) {

            if (response.data[0].nuevoEmpleado == "1") {
               self.nuevoEmpleado_dis = false
            } else {
               self.nuevoEmpleado_dis = true
            }

            if (response.data[0].verExpediente == "1") {
               self.verExpediente_dis = false
            } else {
               self.verExpediente_dis = true
            }
         });

      },
      limpiarCodigo() {
         localStorage.clear()
      },
      /*   actualizarTablaHistorial() {


      this.$refs.tablaBajas.getHistorial()
      this.dialog = true

   },
*/
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
      actualizarTablaBaja() {
         this.$refs.tablaBajas.getEmpleados(this.servicioSeleccionado)
      },
      actualizarTablaActivos() {
         this.$refs.tablaEmpleados.getEmpleados(this.servicioSeleccionado)
      },
      validarClaveCurp() {
         this.curp = this.curpInput;
         //console.log(this.$myGlobalVariable);
         if (this.curpInput == null || this.curpInput.trim() == '') {
            this.$notify({
               title: "Error",
               text: "El campo clave curp no puede estar vacío",
               type: 'warn'
            });

         } else {

            let self = this;

            if (this.curpInput.length >= 18) {

               let patron = /^[A-Z0-9\s]+$/g;
               let valor = this.curpInput;

               if (valor.match(patron)) {
                  axios.post(self.entorno + 'empleados/validarClave', { clave: this.curpInput }).then(function (response) {
                     if (response.data != [] && response.data != '') {
                        if (response.data[0].STATUS == '1') {

                           self.$notify({
                              title: "OK",
                              text: "Este empleado esta activo.",
                              type: 'success'
                           });
                           self.dialogUsuarioActivo = true
                           self.nombreUsuarioActivo = response.data[0].nombre
                           self.servicioUsuarioActivo = response.data[0].servicio
                           self.departamentoUsuarioActivo = response.data[0].departamento
                           self.puestoUsuarioActivo = response.data[0].puesto
                           self.tipoEmpleadoUsuarioActivo = response.data[0].tipoEmpleado
                           self.dialogClaveCurp = false

                        }
                        if (response.data[0].STATUS == '0') {

                           self.$notify({
                              title: "Error",
                              text: "Este empleado ya fue registrado en el sistema.",
                              type: 'warn'
                           });
                           self.getHistoriaCurp(self.curpInput);
                           self.actualizarTablaActivos();
                           self.dialogClaveCurp = false;
                           self.dialogHistorialBajas = true;
                           self.dialog = false;
                        }



                     } else {

                        // self.getHistoriaCurp(self.curpInput);
                        // self.actualizarTablaActivos();
                        self.dialogClaveCurp = false;
                        self.dialogHistorialBajas = false;
                        self.dialog = true;
                     }



                     // self.getHistoriaCurp(self.curpInput);
                     // self.actualizarTablaActivos();
                     // self.dialogClaveCurp = false;
                     // self.dialogHistorialBajas = true;

                     //self.dialog = true;





                  })

               } else {

                  //En caso de encontrar un caracter especial

                  self.$notify({
                     title: "Error",
                     text: "Caracteres especiales encontrados o mayusculas.",
                     type: 'warn'
                  });


               }


            } else {
               self.$notify({
                  title: "Error",
                  text: "La clave curp no puede contener menos de 18 caracteres",
                  type: 'warn'
               })

            }

         }
      },
      async registrarEmpleados() {
         let self = this;
         const { valid } = await this.$refs.formAltaEmpleados.validate()

         if (valid) {
            axios.post(self.entorno + 'empleados/registrar', {
               //usuario: this.email
               idServicio: this.selectServicio,
               nEmpleado: this.nEmpleado,
               fechaIngreso: this.fechaIngreso,
               selectTurno: this.selectTurno,
               selectDepartamento: this.selectDepartamento,
               selectPuesto: this.selectPuesto,
               sueldoDeseado: this.sueldoDeseado,
               selectZona: this.selectZona,
               numeroContrato: this.numContrato,
               fechaContrato1: this.fechaContrato1,
               selectNivelEstudios: this.selectNivelEstudios,
               selectInfonavit: this.selectInfonavit,
               fechaImms: this.fechaImms,
               aniosLaborados: this.aniosLaborados,
               nombre: this.nombre,
               apellidoPaterno: this.apellidoPaterno,
               apellidoMaterno: this.apellidoMaterno,
               selectSexo: this.selectSexo,
               selectEstadoNacimiento: this.selectEstadoNacimiento,
               fechaNacimiento: this.fechaNacimiento,
               lugarNacimiento: this.lugarNacimiento,
               municipioNacimiento: this.municipioNacimiento,
               paisNacimiento: this.paisNacimiento,
               nacionalidad: this.nacionalidad,
               estatura: this.estatura,
               peso: this.peso,
               selectEstadoCivil: this.selectEstadoCivil,
               selectComplexion: this.selectComplexion,
               selectFuma: this.selectFuma,
               selectToma: this.selectToma,
               calle: this.calle,
               nExterior: this.nExterior,
               nInterior: this.nInterior,
               FraccColonia: this.FraccColonia,
               codigoPostal: this.codigoPostal,
               entreCalle: this.entreCalle,
               yCalle: this.yCalle,
               ciudad: this.ciudad,
               telefono: this.telefono,
               celular: this.celular,
               correo: this.correo,
               nCartilla: this.nCartilla,
               curp: this.curp,
               nPasaporte: this.nPasaporte,
               rfc: this.rfc,
               afore: this.afore,
               nss: this.nss,
               claveElector: this.claveElector,
               selectTipoLicencia: this.selectTipoLicencia,
               fechaVigencia: this.fechaVigencia,
               selectTipoSangre: this.selectTipoSangre,
               banco: this.banco,
               cuenta: this.cuenta,
               clabe: this.clabe,
               libretaMar: this.libretaMar,
               selectOrganos: this.selectOrganos,
               selectAlergia: this.selectAlergia,
               alergias: this.alergias,
               alergiasMedicamento: this.alergiasMedicamento,
               selectTatuajes: this.selectTatuajes,
               selectPerforaciones: this.selectPerforaciones,
               selectLentes: this.selectLentes,
               colorCabello: this.colorCabello,
               colorOjos: this.colorOjos,
               notificarA: this.notificarA,
               parentescoEmergencia: this.parentescoEmergencia,
               numeroContacto: this.numeroContacto,
               beneficiario: this.beneficiario,
               parentescoBeneficiario: this.parentescoBeneficiario,
               //numeroContactoBene: this.numeroContactoBene,
               comentarios: this.comentarios,
               libretaMar: this.libretaMar,
               tipoEmpleado: this.tipoEmpleado,
               fechaContratoIndeterminado: this.fechaContratoIndeterminado,
               numCreditoInfonavit: this.numCreditoInfonavit,
               cpCIF: this.cpCIF,
               direccionCIF: this.direccionCIF,
               poblacionCIF: this.poblacionCIF,
               medicamentos: this.medicamentos,
               enfermedadCronica: this.enfCronicas,
               fechaContrato2: this.fechaContrato2,
               numeroLicitacion: this.numeroLicitacion,
               salario: this.salario,
               cuotaSalario: this.cuotaSalario,
               //  edadBeneficiario: this.edadBeneficiario,
               //  representanteBeneficiario: this.representanteBeneficiario,
               selectEquipoACargo: this.selectEquipoACargo,
            }).then(function (response) {
               var res = response.data.affectedRows;
               if (res == '1') {
                  self.$notify({
                     title: "OK",
                     text: "El empleado fue registrado con exito.",
                     type: 'success'
                  });
                  self.$refs.formAltaEmpleados.reset()
                  self.dialog = false;
                  self.$refs.tablaEmpleados.getEmpleados();
               } else {
                  self.$notify({
                     title: "Error de registro",
                     text: "Ocurrio un error al registrar el empleado.",
                     type: 'warn'
                  });
               }



            }
            )

         }
         else {
            this.$notify({
               title: "Error de registro",
               text: "Campos obligatorios.",
               type: 'warn'
            });
         }
         /* 
       
       
            */

      },
      diferencianios(fechaIngreso) {
         const fechaActual = new Date()
         const fechaIn = new Date(fechaIngreso);
         let diferencia = (fechaActual.getTime() - fechaIn.getTime()) / 1000
         diferencia /= (60 * 60 * 24)
         diferencia /= 365.25
         return Math.abs(Math.trunc(diferencia))
      },
      async obtenerServicio(zonaServicio) {
         let self = this;
         var servicios = localStorage.getItem('serviciosAsignados')

         this.servicios = []
         //axios.post('http://api-app.duxon.com.mx/general/servicios', { zona: zonaServicio }).then(function (response) {
         axios.post(self.entorno + 'general/servicios', { zona: zonaServicio, servicios: servicios }).then(function (response) {
            self.servicios = response.data
            console.log(response.data)

         })
      },
      getHistoriaCurp(curp) {

         let self = this;
         //self.$refs.formEditarEmpleados.reset()

         axios.post(self.entorno + 'empleados/getHistorialElector', {
            curp: curp.toString()
         }).then(function (response) {
            console.log(response);

            self.historialCurp = response.data[0]
            self.idEmpleadoClaveCurp = response.data[1][0].idEmpleado

         })
      },
      abrirEditarEmpleados(id) {
         let self = this;
         self.dialogHistorialBajas = false;
         self.$refs.tablaEmpleados.editarEmpleado(id)

      },
      // reIngresar(idEmpleadoGlobal) {

      //    //IF NORMAL DE FECHA INGRESO
      //    if (isEmpty(this.fechareIngreso) || isEmpty(this.selectDepartamento) || isEmpty(this.tipoEmpleado) || isEmpty(this.selectZona) || isEmpty(this.selectPuesto) ) {
      //       this.$notify({
      //       title: "Error",
      //       text: "Los campos no pueden ir vacíos.",
      //       type: 'warn'
      //       });
      //    } else {

      //       let self = this;
      //       axios.post('http://localhost:7005/empleados/reingreso', {
      //       id: id,
      //       fechareIngreso: this.fechareIngreso,
      //       selectDepartamento: this.selectDepartamento,
      //       tipoEmpleado: this.tipoEmpleado,
      //       selectZona: this.selectZona,
      //       selectServicio: this.selectServicio,
      //       selectPuesto: this.selectPuesto,
      //       }).then(function (response) {
      //       var res = response.data.affectedRows;
      //       if (res == '1') {
      //          self.$notify({
      //             title: "OK",
      //             text: "El empleado se reingreso con exito.",
      //             type: 'success'
      //          });
      //          self.getEmpleados()
      //          self.dialogReingreso = false
      //          //document.getElementById("dialogReingreso").reset();
      //          //document.getElementById("dialogReingreso").reset();
      //          //document.getElementById("fechareIngreso").reset();
      //          // self.document.getElementById('fechareIngreso').value = ''
      //       } else {
      //          this.$notify({
      //             title: "Error",
      //             text: "Ocurrio un error al reingresar el empleado.",
      //             type: 'warn'
      //          });
      //       }
      //       })
      //    }
      // },
   }
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

.v-text-field.v-text-field--solo .v-input__control {
   min-height: 10px;
}

.filasRegistro {
   margin: -20px;
   padding: 0px;
}
</style>

