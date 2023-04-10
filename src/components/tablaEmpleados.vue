<template>
  <v-text-field variant="outlined" label="Buscar" density="compact" type="text" v-model="valorCampo"
    style="width: 100%;"></v-text-field>
  <notifications style="z-index:1001110 ;" />

  <EasyDataTable :headers="headers" :items="empleados" buttons-pagination :search-field="camposBusqueda"
    :search-value="valorCampo" table-class-name="customize-table">
    <!-- Fecha de ingreso, Fecha de baja, Motivo de baja, Servicio,Puesto -->
    <template #item-Opciones="{ idEmpleado, tipoEmpleado, fechaIngreso, idServicio, puesto, motivoBaja, fotoFrontal }">

      <v-menu>
        <template v-slot:activator="{ props }">
          <v-btn icon="mdi-dots-vertical" v-bind="props"></v-btn>
        </template>

        <v-list>
          <v-list-item @click="verExpediente(idEmpleado)" :disabled="verExpediente_dis">
            <v-list-item-title>Ver Expediente</v-list-item-title>
          </v-list-item>
          <v-list-item @click='editarEmpleado(idEmpleado)' :disabled="editarEmpleado_dis">
            <v-list-item-title>Editar Empleado</v-list-item-title>
          </v-list-item>
          <v-divider></v-divider>

          <v-list-item @click="getInfoHojaVida(idEmpleado, fotoFrontal)" :disabled="verHV_dis">
            <v-list-item-title>Ver hoja de vida</v-list-item-title>
          </v-list-item>
          <v-list-item @click="getGafete(idEmpleado, tipoEmpleado, fotoFrontal)" :disabled="verGafete_dis">
            <v-list-item-title>Ver gafete</v-list-item-title>
          </v-list-item>
          <v-divider></v-divider>

          <v-list-item :disabled="darBaja_dis"
            @click='bajaEmpleado(idEmpleado, tipoEmpleado, fechaIngreso, idServicio, puesto, motivoBaja)'>
            <v-list-item-title style="color: red;">Dar de baja </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>

    </template>

  </EasyDataTable>


  <v-dialog style="width: 90%; min-height: auto;" v-model="dialogEditarEmpleado" persistent="true">
    <v-card>
      <v-toolbar color="primary" dark style="position: fixed;z-index: 100; width: 100%;">
        <h2 style="margin-left: 20px"> Edición de empleado </h2>
      </v-toolbar>

      <v-container>
        <v-form ref="formEditarEmpleados" v-model="valid" lazy-validation>


          <h3 style="margin-top:5% ;">Datos personales</h3>

          <v-divider style="margin-bottom: 30px;"></v-divider>
          <v-row class="filasRegistro">
            <v-col cols="12" md="3">
              <v-text-field v-model="nombre" :rules="inputsRegistroLN" label="Nombre" density="compact" variant="outlined"
                required></v-text-field>

            </v-col>

            <v-col cols="12" md="3">
              <v-text-field v-model="apellidoPaterno" label="Apellido Paterno" variant="outlined"
                :rules="inputsRegistroLN" required density="compact"></v-text-field>
            </v-col>



            <v-col cols="12" md="3">
              <v-text-field v-model="apellidoMaterno" label="Apellido Materno" variant="outlined"
                :rules="inputsRegistroLN" required density="compact"></v-text-field>
            </v-col>

            <v-col cols="12" md="3">
              <v-select label="Sexo" v-model="selectSexo" :items="['Selecciona una opción', 'Masculino', 'Femenino']"
                variant="outlined" dense bg-color="white" density="compact">
              </v-select>
            </v-col>
          </v-row>

          <v-row class="filasRegistro">
            <v-col cols="12" md="3">
              <v-text-field v-model="fechaNacimiento" type="date" label="Fecha de nacimiento" variant="outlined" required
                density="compact"></v-text-field>

            </v-col>

            <v-col cols="12" md="3">
              <v-text-field v-model="lugarNacimiento" label="Lugar de nacimiento" :rules="inputsRegistroLN"
                variant="outlined" required density="compact"></v-text-field>
            </v-col>


            <v-col cols="12" md="3">
              <v-text-field v-model="municipioNacimiento" label="Municipio de Nacimiento" :rules="inputsRegistroLN"
                variant="outlined" required density="compact"></v-text-field>
            </v-col>

            <v-col cols="12" md="3">
              <v-autocomplete v-model="selectEstadoNacimiento" label="Estado de Nacimiento" :items="estados"
                variant="outlined" required :rules="nameRules" density="compact"></v-autocomplete>

            </v-col>
          </v-row>

          <v-row class="filasRegistro">
            <v-col cols="12" md="3">
              <v-text-field v-model="paisNacimiento" label="País de nacimiento" :rules="inputsRegistroLN"
                variant="outlined" required density="compact"></v-text-field>
            </v-col>

            <v-col cols="12" md="3">
              <v-text-field v-model="nacionalidad" label="Nacionalidad" :rules="inputsRegistroLN" variant="outlined"
                required density="compact"></v-text-field>
            </v-col>

            <v-col cols="12" md="3">
              <v-select label="Estado Civil" v-model="selectEstadoCivil"
                :items="['Selecciona una opción', 'Soltero', 'Casado', 'Viudo', 'Divorciado', 'Unión Libre']"
                variant="outlined" dense bg-color="white" density="compact">
              </v-select>
            </v-col>

            <v-col cols="12" md="3">
              <v-select v-model="selectNivelEstudios"
                :items="['Selecciona una opción', 'Primaria', 'Secundaria', 'Preparatoria', 'Técnica', 'Pasante', 'Licenciatura', 'Maestria', 'Doctorado']"
                label="Nivel de estudios" variant="outlined" dense bg-color="white" density="compact">
              </v-select>
            </v-col>
          </v-row>


          <h3>Información General</h3>
          <v-divider style="margin-bottom: 30px;"></v-divider>
          <v-row class="filasRegistro">
            <v-col cols="12" md="3">
              <v-text-field v-model="nEmpleado" label="Número de empleado" :rules="inputsRegistroNNR" density="compact"
                variant="outlined"></v-text-field>
            </v-col>

            <v-col cols="12" md="3">
              <v-text-field v-model="fechaIngreso" label="Fecha de ingreso" variant="outlined" type="date" required
                density="compact"></v-text-field>
            </v-col>

            <v-col cols="12" md="3">
              <v-select v-model="selectDepartamento" :items="departamentos" label="Departamento" variant="outlined" dense
                bg-color="white" density="compact">
              </v-select>
            </v-col>

            <v-col cols="12" md="3">
              <v-select v-model="tipoEmpleado" :items="['Selecciona una opción', 'Operativo', 'Administrativo']"
                :disabled="this.selectDepartamento != 'OPERACIONES'" variant="outlined" label="Tipo de empleado"
                bg-color="white" density="compact">
              </v-select>

            </v-col>


          </v-row>

          <v-row class="filasRegistro">
            <v-col cols="12" md="3">
              <v-select v-model="selectZona" :items="zona" label="Zona" :rules="nameRules" variant="outlined" dense
                bg-color="white" density="compact">
              </v-select>
            </v-col>
            <v-col cols="12" md="3">
              <v-select :items="servicios" item-title='nombre' item-value='idServicio'
                :disabled="this.selectDepartamento != 'OPERACIONES'" label="Servicio" v-model="selectServicio"
                variant="outlined" dense bg-color="white" density="compact">
              </v-select>
            </v-col>

            <v-col cols="12" md="6">
              <v-select v-model="selectPuesto" :items="puesto" label="Puesto" :rules="nameRules" variant="outlined" dense
                bg-color="white" density="compact">
              </v-select>
            </v-col>





          </v-row>


          <v-row class="filasRegistro">


            <v-col cols="12" md="3">
              <v-text-field v-model="fechaContrato1" type="date" label="Contrato determinado" :rules="nameRules"
                variant="outlined" required density="compact"></v-text-field>
            </v-col>

            <v-col cols="12" md="3">
              <v-text-field v-model="fechaContratoIndeterminado" type="date" label="Contrato indeterminado"
                variant="outlined" required density="compact"></v-text-field>
            </v-col>

            <v-col cols="12" md="3">
              <v-text-field v-model="aniosLaborados" label="Años laborados" :rules="inputsRegistroNNR" variant="outlined"
                required type="number" density="compact" min="0" max="100"></v-text-field>
            </v-col>
            <v-col cols="12" md="3">
              <v-select v-model="selectTurno" :items="turnos" label="Turno" :rules="nameRules" variant="outlined"
                return-object dense bg-color="white" density="compact">
              </v-select>
            </v-col>

          </v-row>

          <v-row class="filasRegistro">

            <v-col cols="12" md="3">
              <v-text-field v-model="sueldoDeseado" label="Sueldo deseado mensual" :rules="inputsRegistroN"
                variant="outlined" required type="number" density="compact" min="0"></v-text-field>
            </v-col>
          </v-row>


          <h3>Dirección</h3>

          <v-divider style="margin-bottom: 30px;"></v-divider>
          <v-row class="filasRegistro">
            <v-col cols="12" md="3">
              <v-text-field v-model="calle" label="Calle" density="compact" variant="outlined" :rules="inputsRegistroLN"
                required></v-text-field>

            </v-col>

            <v-col cols="12" md="2">
              <v-text-field v-model="nExterior" label="N° Exterior" :rules="inputsRegistroLN" variant="outlined" required
                density="compact"></v-text-field>
            </v-col>

            <v-col cols="12" md="2">
              <v-text-field v-model="nInterior" label="N° Interior" variant="outlined" required
                density="compact"></v-text-field>
            </v-col>

            <v-col cols="12" md="3">
              <v-text-field label="Fracc. o Colonia" v-model="FraccColonia" variant="outlined" dense bg-color="white"
                :rules="inputsRegistroLN" density="compact">
              </v-text-field>
            </v-col>

            <v-col cols="12" md="2">
              <v-text-field label="Código postal" v-model="codigoPostal" :rules="inputsRegistroN" variant="outlined" dense
                bg-color="white" density="compact">
              </v-text-field>
            </v-col>
          </v-row>

          <v-row class="filasRegistro">
            <v-col cols="12" md="3">
              <v-text-field v-model="entreCalle" label="Entre calle" variant="outlined" required
                density="compact"></v-text-field>

            </v-col>

            <v-col cols="12" md="3">
              <v-text-field v-model="yCalle" label="Y calle" variant="outlined" required density="compact"></v-text-field>
            </v-col>

            <v-col cols="12" md="3">
              <v-text-field v-model="ciudad" :rules="inputsRegistroLN" label="Ciudad" variant="outlined" required
                density="compact"></v-text-field>
            </v-col>
          </v-row>


          <h3 style="margin-top: 10px;">Contacto</h3>


          <v-divider style="margin-bottom: 30px;"></v-divider>
          <v-row class="filasRegistro">
            <v-col cols="12" md="3">
              <v-text-field v-model="telefono" label="Teléfono" :rules="nameRulesinputsTelefonos" density="compact"
                variant="outlined" maxlength="10" required></v-text-field>

            </v-col>

            <v-col cols="12" md="3">
              <v-text-field label="Celular" :rules="nameRulesinputsTelefonos" v-model="celular" variant="outlined" dense
                bg-color="white" density="compact" maxlength="10">
              </v-text-field>
            </v-col>

            <v-col cols="12" md="3">
              <v-text-field label="Correo eléctronico" :rules="nameRulesinputsCorreos" v-model="correo" variant="outlined"
                dense bg-color="white" density="compact">
              </v-text-field>
            </v-col>
          </v-row>



          <h3 style="margin-top: 10px;">Documentación</h3>

          <v-divider style="margin-bottom: 30px;"></v-divider>
          <v-row class="filasRegistro">
            <v-col cols="12" md="3">
              <v-text-field v-model="nCartilla" label="N°. Cartilla" :rules="inputsRegistroLNNR" density="compact"
                variant="outlined" required></v-text-field>
            </v-col>

            <v-col cols="12" md="3">
              <v-text-field label="N°. Pasaporte" :rules="inputsRegistroLNNR" v-model="nPasaporte" variant="outlined"
                dense bg-color="white" density="compact">
              </v-text-field>
            </v-col>

            <v-col cols="12" md="3">
              <v-text-field label="CURP" :rules="inputsRegistroLN" v-model="curp" variant="outlined" dense
                bg-color="white" maxlength="20" density="compact">
              </v-text-field>
            </v-col>
            <v-col cols="12" md="3">
              <v-text-field label="RFC" :rules="inputsRegistroLN" v-model="rfc" variant="outlined" dense bg-color="white"
                density="compact">
              </v-text-field>
            </v-col>
          </v-row>

          <v-row class="filasRegistro">
            <v-col cols="12" md="3">
              <v-text-field v-model="afore" label="Afore" density="compact" variant="outlined" required></v-text-field>
            </v-col>

            <v-col cols="12" md="3">
              <v-text-field label="NSS" v-model="nss" :rules="inputsRegistroNNR" variant="outlined" dense bg-color="white"
                density="compact" maxlength="11">
              </v-text-field>
            </v-col>


            <v-col cols="12" md="3">
              <v-text-field label="Clave de elector" v-model="claveElector" :rules="inputsRegistroLN" variant="outlined"
                dense bg-color="white" density="compact">
              </v-text-field>
            </v-col>
            <v-col cols="12" md="3">
              <v-select label="Tipo de licencia" v-model="selectTipoLicencia"
                :items="['Selecciona una opción', 'A', 'B', 'C', 'D']" variant="outlined" dense bg-color="white"
                density="compact">
              </v-select>
            </v-col>
          </v-row>

          <v-row class="filasRegistro">
            <v-col cols="12" md="3">
              <v-text-field v-model="fechaVigencia" label="Fecha Vigencia" type="date" density="compact"
                variant="outlined" required></v-text-field>
            </v-col>

            <v-col cols="12" md="3">
              <v-text-field label="Libreta de Mar" v-model="libretaMar" variant="outlined" dense bg-color="white"
                density="compact">
              </v-text-field>
            </v-col>


            <v-col cols="12" md="3">
              <v-text-field label="Banco" v-model="banco" :rules="inputsRegistroLN" variant="outlined" dense
                bg-color="white" density="compact">
              </v-text-field>
            </v-col>
            <v-col cols="12" md="3">
              <v-text-field label="Cuenta" v-model="cuenta" :rules="inputsRegistroN" variant="outlined" dense
                bg-color="white" density="compact" maxlength="10">
              </v-text-field>
            </v-col>
          </v-row>
          <v-row class="filasRegistro">
            <v-col cols="12" md="3">
              <v-text-field label="CLABE" v-model="clabe" :rules="inputsRegistroN" variant="outlined" dense
                bg-color="white" density="compact" maxlength="18">
              </v-text-field>
            </v-col>
            <v-col cols="12" md="3">
              <v-text-field label="Código postal de CIF" v-model="cpCIF" :rules="inputsRegistroLNNR" variant="outlined"
                dense bg-color="white" density="compact">
              </v-text-field>
            </v-col>
            <v-col cols="12" md="3">
              <v-text-field label="Dirección de CIF" v-model="direccionCIF" :rules="inputsRegistroLNNR" variant="outlined"
                dense bg-color="white" density="compact">
              </v-text-field>
            </v-col>
            <v-col cols="12" md="3">
              <v-text-field label="Población de la CIF" v-model="poblacionCIF" :rules="inputsRegistroLNNR"
                variant="outlined" dense bg-color="white" density="compact">
              </v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="3">
              <v-select v-model="selectInfonavit"
                :items="['Selecciona una opción', 'Si tiene infonavit', 'No tiene infonavit']" variant="outlined"
                label="Infonavit" bg-color="white" density="compact">
              </v-select>
            </v-col>

            <v-col cols="12" md="3">
              <v-text-field
                :disabled="(this.selectInfonavit == 'No tiene infonavit' || this.selectInfonavit == 'Selecciona una opción')"
                v-model="numCreditoInfonavit" label="Número de crédito" variant="outlined" required
                density="compact"></v-text-field>
            </v-col>
            <v-col cols="12" md="3">
              <v-text-field v-model="fechaImms" label="Fecha de alta IMMS" variant="outlined" required type="date"
                density="compact"></v-text-field>
            </v-col>
          </v-row>

          <h3 style="margin-top: 10px;">Análisis clínico</h3>

          <v-divider style="margin-bottom: 30px;"></v-divider>
          <v-row class="filasRegistro">
            <v-col cols="12" md="3">
              <v-select label="Tipo de Sangre" v-model="selectTipoSangre" :rules="nameRules" variant="outlined" dense
                bg-color="white" density="compact"
                :items="['Selecciona una opción', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']">
              </v-select>
            </v-col>

            <v-col cols="12" md="3">
              <v-text-field v-model="enfCronicas" :rules="nameRules" label="Enfermedades crónicas" density="compact"
                variant="outlined" required></v-text-field>
            </v-col>

            <v-col cols="12" md="3">
              <v-text-field label="Medicamentos que toma" v-model="medicamentos" :rules="nameRules" variant="outlined"
                dense bg-color="white" density="compact">
              </v-text-field>
            </v-col>
            <v-col cols="12" md="3">
              <v-select label="Es donador de organos" v-model="selectOrganos" :rules="nameRules" variant="outlined" dense
                :items="['Selecciona una opción', 'Si', 'No']" bg-color="white" density="compact">
              </v-select>
            </v-col>
          </v-row>

          <v-row class="filasRegistro">
            <v-col cols="12" md="3">
              <v-select label="Es alérgico a algún medicamento" v-model="selectAlergia" variant="outlined" dense
                bg-color="white" density="compact" :items="['Selecciona una opción', 'Si', 'No']">
              </v-select>
            </v-col>

            <v-col cols="12" md="3">
              <v-text-field v-model="alergiasMedicamento"
                :disabled="(this.selectAlergia == 'No' || this.selectAlergia == 'Selecciona una opción')"
                label="Alergias a medicamento" density="compact" variant="outlined" required></v-text-field>
            </v-col>


            <v-col cols="12" md="3">
              <v-text-field v-model="alergias" label="Alergias" density="compact" variant="outlined"
                required></v-text-field>
            </v-col>
            <v-col cols="12" md="3">
              <v-select label="Tiene tatuajes" v-model="selectTatuajes" :rules="nameRules" variant="outlined" dense
                :items="['Selecciona una opción', 'Si', 'No']" bg-color="white" density="compact">
              </v-select>
            </v-col>
          </v-row>

          <v-row class="filasRegistro">
            <v-col cols="12" md="3">
              <v-text-field v-model="estatura" label="Estatura" :rules="inputsRegistroN" variant="outlined" required
                density="compact"></v-text-field>
            </v-col>

            <v-col cols="12" md="3">
              <v-text-field v-model="peso" label="Peso" :rules="inputsRegistroN" variant="outlined" required
                density="compact"></v-text-field>
            </v-col>

            <v-col cols="12" md="3">
              <v-select label="Complexión" v-model="selectComplexion" :rules="nameRules"
                :items="['Selecciona una opción', 'Delgada', 'Regular', 'Robusta', 'Atlética', 'Obesa']"
                variant="outlined" dense bg-color="white" density="compact">
              </v-select>
            </v-col>
            <v-col cols="12" md="3">
              <v-select label="Fuma" v-model="selectFuma" :rules="nameRules"
                :items="['Selecciona una opción', 'Si', 'No']" variant="outlined" dense bg-color="white"
                density="compact">
              </v-select>
            </v-col>
          </v-row>

          <v-row class="filasRegistro">


            <v-col cols="12" md="3">
              <v-select label="Consume Alcohol" v-model="selectToma" :rules="nameRules"
                :items="['Selecciona una opción', 'Si', 'No']" variant="outlined" dense bg-color="white"
                density="compact">
              </v-select>
            </v-col>

            <v-col cols="12" md="3">
              <v-select label="Perforaciones" v-model="selectPerforaciones" :rules="nameRules"
                :items="['Selecciona una opción', 'Si', 'No']" variant="outlined" dense bg-color="white"
                density="compact">
              </v-select>
            </v-col>


            <v-col cols="12" md="3">
              <v-select label="Utiliza lentes" v-model="selectLentes" :rules="nameRules"
                :items="['Selecciona una opción', 'Si', 'No']" variant="outlined" dense bg-color="white"
                density="compact">
              </v-select>
            </v-col>

            <v-col cols="12" md="3">
              <v-text-field v-model="colorOjos" :rules="inputsRegistroLN" label="Color de ojos" variant="outlined"
                required density="compact"></v-text-field>
            </v-col>
          </v-row>
          <v-row class="filasRegistro">
            <v-col cols="12" md="3">
              <v-text-field v-model="colorCabello" :rules="inputsRegistroLN" label="Color de cabello" variant="outlined"
                required density="compact"></v-text-field>
            </v-col>
          </v-row>

          <h3 style="margin-top: 10px;">Contacto de emergencia</h3>

          <v-divider style="margin-bottom: 30px;"></v-divider>
          <v-row class="filasRegistro">

            <v-col cols="12" md="4">
              <v-text-field v-model="notificarA" :rules="inputsRegistroLN" label="Notificar a:" variant="outlined"
                required density="compact"></v-text-field>
            </v-col>

            <v-col cols="12" md="4">
              <v-text-field v-model="parentescoEmergencia" :rules="inputsRegistroLN" label="Parentesco" variant="outlined"
                required density="compact"></v-text-field>
            </v-col>

            <v-col cols="12" md="4">
              <v-text-field v-model="numeroContacto" :rules="inputsRegistroN" label="Número de contacto"
                variant="outlined" required density="compact"></v-text-field>
            </v-col>
          </v-row>

          <!--BENEFICIARIO-->
          <h3 style="margin-top: 10px;">Beneficiario</h3>

          <v-divider style="margin-bottom: 30px;"></v-divider>
          <v-row class="filasRegistro">
            <v-col cols="12" md="4">
              <v-text-field v-model="beneficiario" :rules="inputsRegistroLN" label="Beneficiario:" variant="outlined"
                required density="compact"></v-text-field>
            </v-col>
            <!-- <v-col cols="12" md="3">
               <v-text-field v-model="edadBeneficiario" :rules="inputsRegistroN" variant="outlined" dense bg-color="white"
                density="compact" label="Edad del beneficiario" type="number" min="0">
              </v-text-field>  
            </v-col> -->
            <!-- 
            <v-col cols="12" md="3">
              <v-text-field :disabled="(this.edadBeneficiario >= '18' || this.edadBeneficiario == '')"
                v-model="representanteBeneficiario" label="Representante" variant="outlined" required density="compact"
                min="0"></v-text-field>
            </v-col> -->

            <v-col cols="12" md="4">
              <v-text-field v-model="parentescoBeneficiario" :rules="inputsRegistroLN" label="Parentesco"
                variant="outlined" required density="compact"></v-text-field>
            </v-col>
            <!-- <v-col cols="12" md="4">
              <v-text-field v-model="numeroContactoBene" :rules="inputsRegistroN" label="Número de contacto"
                variant="outlined" required density="compact" maxlength="10"></v-text-field>
            </v-col> -->


          </v-row>




          <h3 style="margin-top: 10px;">Datos para contrato</h3>
          <v-divider style="margin-bottom: 30px;"></v-divider>
          <v-row class="filasRegistro">

            <v-col cols="12" md="3">
              <v-text-field label="N°. Licitación" v-model="numeroLicitacion" variant="outlined" dense bg-color="white"
                density="compact">
              </v-text-field>
            </v-col>

            <v-col cols="12" md="3">
              <v-text-field v-model="salario" label="Salario" density="compact" variant="outlined"></v-text-field>
            </v-col>

            <v-col cols="12" md="3">
              <v-text-field label="Cuota Diaria Salario" v-model="cuotaSalario" variant="outlined" dense bg-color="white"
                density="compact">
              </v-text-field>
            </v-col>

            <v-col cols="12" md="3">
              <v-select label="Equipo/Vehículo a cargo" v-model="selectEquipoACargo" variant="outlined" dense
                :items="['Si', 'No']" bg-color="white" density="compact">
              </v-select>
            </v-col>
          </v-row>


          <v-row class="filasRegistro" style="margin-top: 10px; width: 80%; margin-left: 10%;">
            <v-textarea solo name="input-7-4" v-model="comentarios" label="Comentarios" variant="outlined"></v-textarea>
          </v-row>

          <v-row>
            <v-col cols="12" md="6">
              <v-btn color="red" @click="(this.dialogEditarEmpleado = false)">Cancelar</v-btn>
            </v-col>
            <v-col cols="12" md="6" style="text-align:right">
              <v-btn color="primary" @click="actualizarEmpleados">Registrar</v-btn>

            </v-col>
          </v-row>
        </v-form>

      </v-container>
    </v-card>

  </v-dialog>
  <v-dialog style="width: 50%; min-height: auto;" v-model="dialog">
    <v-card>
      <v-card-text style="text-align: center;">
        <h3 style="font-size: 1.2em;"> ¿Estas seguro de dar de baja al empleado?</h3>
      </v-card-text>
      <div style="text-align: center;width: 100%;">
        <v-text-field type="date" style="width: 90%; margin-right: 5%; margin-left: 5%;" v-model="fechaBaja"
          label="Fecha de baja" variant="outlined" required density="compact"></v-text-field>
      </div>

      <v-row style="padding: 2%;">
        <v-col cols="6" md="6">
          <v-btn depressed color="error" @click="(this.dialog = false)">Cancelar</v-btn>
        </v-col>
        <v-col cols="6" md="6" style="text-align:right">
          <v-btn depressed color="primary" @click="darBajaEmpleado(this.idActual)">Aceptar</v-btn>
        </v-col>
      </v-row>

    </v-card>
  </v-dialog>
</template>
<script  >
//para generar docs
import Docxtemplater from "docxtemplater";
import PizZip from "pizzip";
import PizZipUtils from "pizzip/utils/index.js";
import { saveAs } from "file-saver";
import router from '@/main';
import ImageModule from "docxtemplater-image-module-free";


import axios from 'axios';
import { isEmpty } from 'lodash';
export default ({
  components: {
    EasyDataTable: window['vue3-easy-data-table'],
  },
  created() {
    this.getPermisoArea()
   // this.getEmpleados()

  },
  data() {
    return {
      //conexion
      //permisos
      verExpediente_dis: false,
      editarEmpleado_dis: false,
      verHV_dis: false,
      verGafete_dis: false,
      darBaja_dis: false,




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
      enfCronicas: '',
      nEmpleado: '',
      fechaIngreso: '',
      selectTurno: "Selecciona una opción",
      selectDepartamento: "Selecciona una opción",
      selectPuesto: '',
      sueldoDeseado: '',
      selectZona: "Selecciona una opción",
      numContrato: '',
      fechaContrato1: null,
      selectNivelEstudios: "Selecciona una opción",
      selectInfonavit: "Selecciona una opción",
      fechaImms: null,
      aniosLaborados: null,
      nombre: '',
      apellidoPaterno: null,
      apellidoMaterno: null,
      selectSexo: "Selecciona una opción",
      selectEstadoNacimiento: "",
      fechaNacimiento: null,
      lugarNacimiento: null,
      municipioNacimiento: null,
      paisNacimiento: null,
      nacionalidad: null,
      estatura: null,
      peso: null,
      selectEstadoCivil: "Selecciona una opción",
      selectComplexion: "Selecciona una opción",
      selectFuma: "Selecciona una opción",
      selectToma: "Selecciona una opción",
      calle: null,
      nExterior: null,
      nInterior: null,
      FraccColonia: null,
      codigoPostal: null,
      entreCalle: null,
      yCalle: null,
      ciudad: null,
      telefono: null,
      celular: null,
      correo: null,
      nCartilla: null,
      curp: null,
      nPasaporte: null,
      rfc: null,
      afore: null,
      nss: null,
      claveElector: null,
      selectTipoLicencia: "Selecciona una opción",
      fechaVigencia: null,
      selectTipoSangre: 'Selecciona una opción',
      banco: null,
      cuenta: null,
      libretaMar: null,
      selectOrganos: 'Selecciona una opción',
      selectAlergia: 'Selecciona una opción',
      alergias: null,
      alergiasMedicamento: null,
      selectTatuajes: 'Selecciona una opción',
      selectPerforaciones: 'Selecciona una opción',
      selectLentes: 'Selecciona una opción',
      colorCabello: null,
      colorOjos: null,
      notificarA: null,
      parentescoEmergencia: null,
      numeroContacto: null,
      valid: true,
      beneficiario: null,
      parentescoBeneficiario: null,
      numeroContactoBene: null,
      clabe: null,
      comentarios: null,
      fechaContratoIndeterminado: '',
      tipoEmpleado: "Selecciona una opción",
      numCreditoInfonavit: null,
      selectServicio: 0,
      servicios: [],
      cpCIF: null,
      direccionCIF: null,
      poblacionCIF: null,
      medicamentos: null,
      fechaContrato2: '',
      numeroLicitacion: null,
      salario: null,
      cuotaSalario: null,
      edadBeneficiario: null,
      representanteBeneficiario: null,
      selectEquipoACargo: "",



      estados: ["Extranjero", "Aguascalientes", "Baja California", "Baja California Sur", "Campeche", "Chiapas", "Chihuahua", "Coahuila de Zaragoza", "Colima", "Durango", "Estado de México", "Guanajuato", "Guerrero", "Hidalgo", "Jalisco", "Michoacán de Ocampo", "Morelos", "Nayarit", "Nuevo León", "Oaxaca", "Puebla", "Querétaro", "Quintana Roo", "San Luis Potosí", "Sinaloa", "Sonora", "Tabasco", "Tamaulipas", "Tlaxcala", "Veracruz de Ignacio de la Llave", "Yucatán", "Zacatecas"],
      //Items
      turnos: [
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

         ]
      ,
      puesto: [],
      zona: ["NOROESTE", "NORTE", "NORESTE", "CENTRO", "GOLFO-SUR"],
      dialogEditarEmpleado: false,
      fechaBaja: null,
      motivoBaja: null,
      dialog: false,
      idActual: null,
      valorCampo: '',
      headers: [
        { text: "#Empleado", value: "idEmpleado", width: 20, sortable: true },
        { text: "Nombre", value: "nombre" },
        { text: "Fecha de ingreso", value: "fechaIngreso", sortable: true },
        { text: "Servicio", value: "servicio" },
        { text: "Puesto", value: "puesto" },
        { text: "% Expediente", value: "% expediente" },
        { text: "Vacaciones", value: "vacaciones", width: 100 },
        { text: "Opciones", value: "Opciones" },
      ],
      empleados: [],
      searchField: ["idEmpleado", "nombre", "fechaIngreso", "servicio", "puesto", "expediente", "vacaciones"],
      idEmpleadoBaja: '',
      tipoEmpleadoBaja: '',
      fechaIngresoBaja: '',
      servicioBaja: '',
      puestoBaja: '',
      motivoBaja2: ''
    }
  },
  watch: {
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
            'idServicio': 0
          }];
          this.selectServicio = 0;


          break;
        case "GESTION DE CALIDAD Y CAPACITACIÓN":
          this.tipoEmpleado = "Administrativo"

          this.puesto = ["GERENCIA DE GESTION DE CALIDAD Y CAPACITACION ", "COORDINADOR DE CAPACITACIÓN", "INSTRUCTOR AVSEC", "CAPACITACIÓN (EVENTUAL)", "CAPACITACIÓN", "JEFATURA DE GESTIÓN DE CALIDAD", "CONTROL DOCUMENTAL", "RESPONSABLE DE GESTIÓN DE CALIDAD", "JEFATURA DE DESARROLLO", "PROGRAMACIÓN"]
          this.servicios = [{
            "nombre": "Administrativo",
            "idServicio": 0
          }]
          this.selectServicio = 0

          break;
        case "JURÍDICO Y LABORAL":
          this.puesto = ["GERENCIA JURIDICO/LABORAL", "JEFATURA JURIDICO", "RESPONSABLE DE JURÍDICO", "COORDINACIÓN LABORAL", "GESTORÍA LABORAL"]
          this.tipoEmpleado = "Administrativo"

          this.servicios = [{
            "nombre": "Administrativo",
            "idServicio": 0
          }]
          this.selectServicio = 0
          break;
        case "CONCURSOS Y PROCESOS TÉCNICOS":
          this.puesto = ["GERENCIA DE CONCURSOS Y PROCESOS TÉCNICOS", "ENLACE CDMX", "JEFATURA DE LICITACIONES", "RESPONSABLE DE LICITACIONES", "JEFATURA DE PROCESOS TÉNICOS", "RESPONSABLE DE PROCESOS TECNICOS", "GESTORÍA DE PERMISOS"]
          this.tipoEmpleado = "Administrativo"

          this.servicios = [{
            "nombre": "Administrativo",
            "idServicio": 0
          }]
          this.selectServicio = 0
          break;

        case "ADMINISTRACIÓN Y FINANZAS":
          this.puesto = ["GERENCIA DE ADMINISTRACION Y FINANZAS", "SUBGERENCIA DE ADMINISTRACION Y FINANZAS", "ANALISTA DE CONTROL PRESUPUESTAL", "ANALISTA DE PRESUPUESTO", "ANALISTA DE EGRESOS", "ANALISTA DE FACTURACIÓN Y TESORERÍA", "RESPONSABLE ADMÓN. DE FACTURACIÓN", "ANALISTA DE COBRANZA", "ENLACE DE PROYECTOS", "FISCALISTA", "ANALISTA SUA FISCAL ", "ANALISTA DE CONTABILIDAD (SEPIVER)"]
          this.tipoEmpleado = "Administrativo"

          this.servicios = [{
            "nombre": "Administrativo",
            "idServicio": 0
          }]
          this.selectServicio = 0
          break;
        case "RECURSOS MATERIALES":
          this.puesto = ["GERENCIA DE RECURSOS MATERIALES ", "SUBGERENCIA DE RECURSOS MATERIALES", "ANALISTA CONTABLE ZONA CENTRO NORTE", "ANALISTA DE COMPRAS ZONA CENTRO NORTE", "RESPONSABLE ADMINISTRATIVO ZONA CENTRO NORTE", "ANALISTA CONTABLE ZONA GOLFO SUR", "ANALISTA DE COMPRAS GOLFO SUR", "RESPONSABLE ADMON GOLFO SUR ", "JEFATURA DE ALMACEN ZONA CENTRO NORTE", "RESPONSABLE DE ALMACEN Y ENTREGAS ZONA TAMPICO ", "RESPONSABLE DE ALMACEN Y ENTREGAS ZONA TAMAULIPAS ", "RESPONSABLE DE ALMACEN Y ENTREGAS ZONA ENSENADA ", "JEFATURA DE ALMACEN ZONA GOLFO SUR", "RESPONSABLE DE ALMACEN Y ENTREGAS DOS BOCAS ", "RESPONSABLE DE ALMACEN Y ENTREGAS ZONA VERACRUZ", "COORDINACIÓN T.I.", "RESPONSABLE DE CCTV", "RESPONSABLE DE RADIOCOMUNICACIÓN", "RESPONSABLE DE SOPORTE TÉCNICO", "SUBGERENCIA DE FLOTILLA, TI Y MANTENIMIENTO", "JEFATURA DE FLOTILLA", "RESPONSABLE DE FLOTILLA ZONA CENTRO NORTE", "RESPONSABLE DE FLOTILLA ZONA GOLFO SUR", "COORDINACIÓN DE MANTENIMIENTO Y LIMPIEZA ", "PERSONAL DE LIMPIEZA OF. MATRIZ", "PERSONAL DE LIMPIEZA OF. TAMAULIPAS"]
          this.tipoEmpleado = "Administrativo"

          this.servicios = [{
            "nombre": "Administrativo",
            "idServicio": 0
          }]
          this.selectServicio = 0
          break;

        case "CAPITAL HUMANO":
          this.tipoEmpleado = "Administrativo"

          this.selectZona = ""
          this.puesto = []
          this.servicios = [{
            "nombre": "Administrativo",
            "idServicio": 0
          }]
          this.selectServicio = 0

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
    getGafete(id, tipo, fotoFrontal) {
      if (tipo == 'Operativo') {
        this.gafeteOperativo(id, fotoFrontal)
      } else if (tipo == 'Administrativo') {
        this.gafeteAdmin(id, fotoFrontal)
      }

    },
    async gafeteOperativo(id, fotoFrontal) {
      let self = this;
      let fotoBuffer = null;
      if (fotoFrontal != '' && fotoFrontal != null) {
        await axios.post(self.entorno + 'empleados/getGafeteInfoOperativo', {
          id: id
        }).then(function (response) {
          console.log(response)
          //alert(response.data[1])
          var documento = response.data[1] + ".docx"
          // Abrir nuevo tab
          var url = self.entorno + documento
          var win = window.open(url, '_blank');
          // Cambiar el foco al nuevo tab (punto opcional)
          win.focus();
        })
      } else {
        this.$notify({
          title: "Alerta",
          text: "El empleado no tiene fotografía frontal.",
          type: 'warn'
        });
      }

      //Generar formato
      //fotoBuffer
      // const response = await fetch('src\\templatesDoc\\Gafetes admin template.docx');


    },
    async gafeteAdmin(id, fotoFrontal) {
      let self = this;
      let fotoBuffer = null;
      if (fotoFrontal != '' && fotoFrontal != null) {
        await axios.post(self.entorno + 'empleados/getGafeteInfo', {
          id: id
        }).then(function (response) {
          console.log(response)
          //alert(response.data[1])
          var documento = response.data[1] + ".docx"
          // Abrir nuevo tab
          var url = self.entorno + documento
          var win = window.open(url, '_blank');
          // Cambiar el foco al nuevo tab (punto opcional)
          win.focus();
        })
      } else {
        this.$notify({
          title: "Alerta",
          text: "El empleado no tiene fotografía frontal.",
          type: 'warn'
        });
      }

      //Generar formato
      //fotoBuffer
      // const response = await fetch('src\\templatesDoc\\Gafetes admin template.docx');


    },
    loadFile(url, callback) {
      PizZipUtils.getBinaryContent(url, callback);

    },
    bajaEmpleado(idEmpleado, tipoEmpleado, fechaIngreso, idServicio, puesto, motivoBaja) {

      console.log(idEmpleado, tipoEmpleado, fechaIngreso, idServicio, puesto, motivoBaja)
      this.idActual = idEmpleado
      this.dialog = true
      this.fechaBaja = null
      this.idEmpleadoBaja = idEmpleado
      this.tipoEmpleadoBaja = tipoEmpleado
      this.fechaIngresoBaja = fechaIngreso
      this.servicioBaja = idServicio
      this.puestoBaja = puesto
      this.motivoBaja2 = motivoBaja
    },
    darBajaEmpleado(id) {
      if (!isEmpty(this.fechaBaja)) {
        //http://127.0.0.1:3050/empleados/baja

        let self = this
        axios.post(self.entorno + 'empleados/baja', {
          idEmpleado: id,
          fechaBaja: self.fechaBaja,
          fechaIngreso: self.fechaIngresoBaja,
          servicio: self.servicioBaja,
          puesto: self.puestoBaja,
          motivoBaja: self.motivoBaja2
        }).then(function (response) {
          var res = response.data.affectedRows;
          if (res == '1') {
            self.$notify({
              title: "OK",
              text: "El empleado fue dado de baja con exito.",
              type: 'success'
            });
            self.getEmpleados()
            self.dialog = false
          } else {
            this.$notify({
              title: "Error",
              text: "Ocurrio un error al dar de baja el empleado.",
              type: 'warn'
            });
          }
        })
      } else {
        this.$notify({
          title: "Error",
          text: "El campo fecha de baja NO pueden ir vacios",
          type: 'warn'
        });
      }
    },
    async getPermisoArea() {
      let self = this
      await axios.post(this.entorno + 'general/permisoUsuarioCH', {
        idEmpleado: localStorage.getItem("id")
      }).then(function (response) {


        if (response.data[0].verExpediente == 1) {
          self.verExpediente_dis = false
        } else {
          self.verExpediente_dis = true
        }

        if (response.data[0].generarGafete == "1") {
          self.verGafete_dis = false
        } else {
          self.verGafete_dis = true
        }

        if (response.data[0].edicionEmpleado == "1") {
          self.editarEmpleado_dis = false
        } else {
          self.editarEmpleado_dis = true
        }

        if (response.data[0].generarHojaVida == "1") {
          self.verHV_dis = false
        } else {
          self.verHV_dis = true
        }

        if (response.data[0].darBajaEmpleado == "1") {
          self.darBaja_dis = false
        } else {
          self.darBaja_dis = true
        }




      });

    },
    getEmpleados() {
      let idServicio=localStorage.getItem("servicioActual")
      let self = this;
      let serviciosSeleccionados=''
      if(idServicio==0){
        serviciosSeleccionados= localStorage.getItem('serviciosAsignados')
      }else{
        serviciosSeleccionados= idServicio
      }
      axios.post(self.entorno + 'empleados/getEmpleados', {
        servicios: serviciosSeleccionados
      }).then(function (response) {
        self.empleados = response.data
        console.log(self.empleados)


      })

    },
    async obtenerServicio(zonaServicio) {
      let self = this;
      var servicios = localStorage.getItem('serviciosAsignados')

      axios.post(self.entorno + 'general/servicios', { zona: zonaServicio, servicios: servicios }).then(function (response) {

        self.servicios = response.data

      })
    },
    diferencianios(fechaIngreso) {
      const fechaActual = new Date()
      const fechaIn = new Date(fechaIngreso);
      let diferencia = (fechaActual.getTime() - fechaIn.getTime()) / 1000
      diferencia /= (60 * 60 * 24)
      diferencia /= 365.25
      return Math.abs(Math.trunc(diferencia))
    },
    editarEmpleado(id) {
      this.valid = ''
      this.dialogEditarEmpleado = true
      //self.$refs.formAltaEmpleados.reset()
      this.idActual = id
      this.getInfoEmpleado(id)

    },
    getInfoEmpleado(id) {
      let self = this;
      //self.$refs.formEditarEmpleados.reset()
      axios.post(self.entorno + 'empleados/getEmpleadoxId', {
        id: id
      }).then(function (response) {
        //Campos de registro
        self.selectServicio = response.data[0][0].idServicio != 'null' || '' ? response.data[0][0].idServicio : 0,
          self.nEmpleado = response.data[0][0].numeroEmpleado != 'null' || '' ? response.data[0][0].numeroEmpleado : '',
          self.fechaIngreso = response.data[0][0].fechaIngreso != 'null' || '' ? response.data[0][0].fechaIngreso : '',
          self.selectTurno = response.data[0][0].turno != 'null' || response.data[0][0].turno == '' ? response.data[0][0].turno : '',
          self.selectDepartamento = response.data[0][0].departamento != 'null' || '' ? response.data[0][0].departamento : '',
          self.tipoEmpleado = response.data[0][0].tipoEmpleado != 'null' || '' ? response.data[0][0].tipoEmpleado : '',
          //self.selectPuesto=response.data[0].puesto,
          self.sueldoDeseado = response.data[0][0].sueldoDeseado != 'null' || '' ? response.data[0][0].sueldoDeseado : '',
          self.selectZona = response.data[0][0].zona != 'null' || '' ? response.data[0][0].zona : '',
          self.fechaContrato1 = response.data[0][0].fechaContrato1 != 'null' || '' ? response.data[0][0].fechaContrato1 : '',
          self.selectNivelEstudios = response.data[0][0].nivelEstudios != 'null' || '' ? response.data[0][0].nivelEstudios : '',
          self.selectInfonavit = response.data[0][0].infonavit != 'null' || '' ? response.data[0][0].infonavit : '',
          self.fechaImms = response.data[0][0].fechaAltaImms != 'null' || '' ? response.data[0][0].fechaAltaImms : '',
          self.aniosLaborados = response.data[0][0].aniosLaborados != 'null' || '' ? response.data[0][0].aniosLaborados : '',
          self.nombre = response.data[0][0].nombre != 'null' || '' ? response.data[0][0].nombre : '',
          self.apellidoPaterno = response.data[0][0].apellidoPaterno != null ? response.data[0][0].apellidoPaterno : '',
          self.apellidoMaterno = response.data[0][0].apellidoMaterno != 'null' || '' ? response.data[0][0].apellidoMaterno : '',
          self.selectSexo = response.data[0][0].sexo != 'null' || '' ? response.data[0][0].sexo : '',
          self.selectEstadoNacimiento = response.data[0][0].estadoNacimiento != 'null' || '' ? response.data[0][0].estadoNacimiento : '',
          self.fechaNacimiento = response.data[0][0].fechaNacimiento != 'null' || '' ? response.data[0][0].fechaNacimiento : '',
          self.lugarNacimiento = response.data[0][0].lugarNacimiento != 'null' || '' ? response.data[0][0].lugarNacimiento : '',
          self.municipioNacimiento = response.data[0][0].municipioNacimiento != 'null' || '' ? response.data[0][0].municipioNacimiento : '',
          self.paisNacimiento = response.data[0][0].paisNacimiento != null ? response.data[0][0].paisNacimiento : '',
          self.nacionalidad = response.data[0][0].nacionalidad != 'null' || '' ? response.data[0][0].nacionalidad : '',
          self.estatura = response.data[0][0].estatura != 'null' || '' ? response.data[0][0].estatura : '',
          self.peso = response.data[0][0].peso != 'null' || '' ? response.data[0][0].peso : '',
          self.selectEstadoCivil = response.data[0][0].estadoCivil != 'null' || '' ? response.data[0][0].estadoCivil : '',
          self.selectComplexion = response.data[0][0].complexion != 'null' || '' ? response.data[0][0].complexion : '',
          self.selectFuma = response.data[0][0].fuma != 'null' || '' ? response.data[0][0].fuma : '',
          self.selectToma = response.data[0][0].toma != 'null' || '' ? response.data[0][0].toma : '',
          self.calle = response.data[0][0].calle != 'null' || '' ? response.data[0][0].calle : '',
          self.nExterior = response.data[0][0].nExterior != 'null' || '' ? response.data[0][0].nExterior : '',
          self.nInterior = response.data[0][0].nInterior != 'null' || '' ? response.data[0][0].nInterior : '',
          self.FraccColonia = response.data[0][0].fraccColonia != 'null' || '' ? response.data[0][0].fraccColonia : '',
          self.codigoPostal = response.data[0][0].codigoPostal != 'null' || '' ? response.data[0][0].codigoPostal : '',
          self.entreCalle = response.data[0][0].entreCalle != 'null' || '' ? response.data[0][0].entreCalle : '',
          self.yCalle = response.data[0][0].yCalle != 'null' || '' ? response.data[0][0].yCalle : '',
          self.ciudad = response.data[0][0].ciudad != 'null' || '' ? response.data[0][0].ciudad : '',
          self.telefono = response.data[0][0].telefono != 'null' || '' ? response.data[0][0].telefono : '',
          self.celular = response.data[0][0].celular != 'null' || '' ? response.data[0][0].celular : '',
          self.correo = response.data[0][0].correo != 'null' || '' ? response.data[0][0].correo : '',
          self.nCartilla = response.data[0][0].nCartilla != 'null' || '' ? response.data[0][0].nCartilla : '',
          self.curp = response.data[0][0].CURP != 'null' || '' ? response.data[0][0].CURP : '',
          self.nPasaporte = response.data[0][0].nPasaporte != 'null' || '' ? response.data[0][0].nPasaporte : '',
          self.rfc = response.data[0][0].RFC != 'null' || '' ? response.data[0][0].RFC : '',
          self.afore = response.data[0][0].afore != 'null' || '' ? response.data[0][0].afore : '',
          self.nss = response.data[0][0].NSS != 'null' || '' ? response.data[0][0].NSS : '',
          self.claveElector = response.data[0][0].claveElector != 'null' || '' ? response.data[0][0].claveElector : '',
          self.selectTipoLicencia = response.data[0][0].tipoLicencia != 'null' || '' ? response.data[0][0].tipoLicencia : '',
          self.fechaVigencia = response.data[0][0].fechaVigencia != 'null' || '' ? response.data[0][0].fechaVigencia : '',
          self.selectTipoSangre = response.data[0][0].tipoSangre != 'null' || '' ? response.data[0][0].tipoSangre : '',
          self.banco = response.data[0][0].banco != 'null' || '' ? response.data[0][0].banco : '',
          self.cuenta = response.data[0][0].cuenta != 'null' || '' ? response.data[0][0].cuenta : '',
          self.libretaMar = response.data[0][0].libretaMar != 'null' || '' ? response.data[0][0].libretaMar : '',
          self.selectOrganos = response.data[0][0].donadorOrganos != 'null' || '' ? response.data[0][0].donadorOrganos : '',
          self.selectAlergia = response.data[0][0].tieneAlergia != 'null' || '' ? response.data[0][0].tieneAlergia : '',
          self.alergias = response.data[0][0].alergias != 'null' || '' ? response.data[0][0].alergias : '',
          self.alergiasMedicamento = response.data[0][0].alergiasMedicamento != 'null' || '' ? response.data[0][0].alergiasMedicamento : '',
          self.selectTatuajes = response.data[0][0].tieneTatuajes != 'null' || '' ? response.data[0][0].tieneTatuajes : '',
          self.selectPerforaciones = response.data[0][0].tienePerforaciones != 'null' || '' ? response.data[0][0].tienePerforaciones : '',
          self.selectLentes = response.data[0][0].usaLentes != 'null' || '' ? response.data[0][0].usaLentes : '',
          self.colorCabello = response.data[0][0].colorCabello != 'null' || '' ? response.data[0][0].colorCabello : '',
          self.colorOjos = response.data[0][0].colorOjos != 'null' || '' ? response.data[0][0].colorOjos : '',
          self.notificarA = response.data[0][0].contactoEmergencia != 'null' || '' ? response.data[0][0].contactoEmergencia : '',
          self.parentescoEmergencia = response.data[0][0].parentescoCE != 'null' || '' ? response.data[0][0].parentescoCE : '',
          self.numeroContacto = response.data[0][0].numeroCE != 'null' || '' ? response.data[0][0].numeroCE : '',
          self.numContrato = response.data[0][0].numeroContrato != 'null' || '' ? response.data[0][0].numeroContrato : '',
          self.beneficiario = response.data[0][0].beneficiario != 'null' || '' ? response.data[0][0].beneficiario : '',
          self.parentescoBeneficiario = response.data[0][0].parentescoBE != 'null' || '' ? response.data[0][0].parentescoBE : '',
          self.numeroContactoBene = response.data[0][0].numeroBE != 'null' || '' ? response.data[0][0].numeroBE : '',
          self.clabe = response.data[0][0].clabe != 'null' || '' ? response.data[0][0].clabe : '',
          self.comentarios = response.data[0][0].comentarios != 'null' || '' ? response.data[0][0].comentarios : '',
          self.fechaContratoIndeterminado = response.data[0][0].fechaContratoIndeterminado != 'null' || '' ? response.data[0][0].fechaContratoIndeterminado : '',
          self.numCreditoInfonavit = response.data[0][0].numCreditoInfonavit != 'null' || '' ? response.data[0][0].numCreditoInfonavit : '',
          //self.selectServicio= response.data[0].fraccColonia,
          //self.servicios= response.data[0].fraccColonia,
          self.cpCIF = response.data[0][0].cpCIF != 'null' || '' ? response.data[0][0].cpCIF : '',
          self.direccionCIF = response.data[0][0].direccionCIF != 'null' || '' ? response.data[0][0].direccionCIF : '',
          self.poblacionCIF = response.data[0][0].poblacionCIF != 'null' || '' ? response.data[0][0].poblacionCIF : '',
          self.medicamentos = response.data[0][0].medicamentoQueToma != 'null' || '' ? response.data[0][0].medicamentoQueToma : '',
          self.enfCronicas = response.data[0][0].enfermedadCronica != 'null' || '' ? response.data[0][0].enfermedadCronica : '',
          self.selectPuesto = response.data[0][0].puesto != 'null' || '' ? response.data[0][0].puesto : ''
        //let service_string = response.data[0].servicios
        //self.selectServicio= service_string.split(',')
        //self.selectServicio= ['CICESE']
        self.numeroLicitacion = response.data[0][0].numeroLicitacion != 'null' ? response.data[0][0].numeroLicitacion : '',
          self.salario = response.data[0][0].salario != 'null' ? response.data[0][0].salario : '',
          self.cuotaSalario = response.data[0][0].cuotaSalario != 'null' ? response.data[0][0].cuotaSalario : '',
          self.edadBeneficiario = response.data[0][0].edadBeneficiario != 'null' ? response.data[0][0].edadBeneficiario : '',
          self.representanteBeneficiario = response.data[0][0].representanteBeneficiario != 'null' ? response.data[0][0].representanteBeneficiario : '',
          self.selectEquipoACargo = response.data[0][0].equipoACargo != 'null' ? response.data[0][0].equipoACargo : ''

      })


    },
    async actualizarEmpleados() {
      let self = this;
      const { valid } = await this.$refs.formEditarEmpleados.validate()
      //  var idServicio= req.body.idServicio;
      // var fechaContrato2= req.body.fechaContrato2;
      if (valid) {
        axios.post(self.entorno + 'empleados/updateEmpleado', {
          //usuario: this.email
          fechaContrato2: this.fechaContrato2,
          idServicio: this.selectServicio,
          id: this.idActual,
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
          idServicio: this.selectServicio,
          cpCIF: this.cpCIF,
          direccionCIF: this.direccionCIF,
          poblacionCIF: this.poblacionCIF,
          medicamentos: this.medicamentos,
          enfermedadCronica: this.enfCronicas,
          numeroLicitacion: this.numeroLicitacion,
          salario: this.salario,
          cuotaSalario: this.cuotaSalario,
          //edadBeneficiario: this.edadBeneficiario,
          //representanteBeneficiario: this.representanteBeneficiario,
          selectEquipoACargo: this.selectEquipoACargo


        }).then(function (response) {
          var res = response.data.affectedRows;
          if (res == '1') {
            self.$notify({
              title: "OK",
              text: "El empleado fue actualizado con exito.",
              type: 'success'
            });

            self.dialogEditarEmpleado = false;
            self.getEmpleados();
          } else {
            self.$notify({
              title: "Error de actualización",
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
    async getInfoHojaVida(id, fotoFrontal) {
      let self = this;

      let fotoBuffer = null;
      //alert(fotoFrontal)
      if (fotoFrontal != '' && fotoFrontal != null) {
        await axios.post(self.entorno + 'empleados/getHojaVida', {
          id: id
        }).then(function (response) {
          var documento = response.data[1] + ".docx"
          // Abrir nuevo tab
          var url = self.entorno + documento
          var win = window.open(url, '_blank');
          // Cambiar el foco al nuevo tab (punto opcional)
          win.focus();

        })
      } else {
        this.$notify({
          title: "Alerta",
          text: "El empleado no tiene fotografía frontal.",
          type: 'warn'
        });
      }

    },
    calcularEdad(fecha) {
      var hoy = new Date();
      var cumpleanos = new Date(fecha);
      var edad = hoy.getFullYear() - cumpleanos.getFullYear();
      var m = hoy.getMonth() - cumpleanos.getMonth();

      if (m < 0 || (m === 0 && hoy.getDate() < cumpleanos.getDate())) {
        edad--;
      }

      return edad;
    },
    verExpediente(id) {
      router.push({ path: "/expediente/" + id })
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
        saveAs(out, "output.docx");
      });
    },
    loadFile(url, callback) {
      PizZipUtils.getBinaryContent(url, callback);
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