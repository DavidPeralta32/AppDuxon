<template>
  <v-text-field variant="outlined" label="Buscar" density="compact" type="text" v-model="valorCampo"
    style="width: 100%;"></v-text-field>
  <notifications style="z-index:1001110 ;" />


  <EasyDataTable :headers="headers" :items="empleados" buttons-pagination :search-field="camposBusqueda"
    :search-value="valorCampo" table-class-name="customize-table">

    <template #item-Opciones="{ idEmpleado }">

      <v-menu>
        <template v-slot:activator="{ props }">
          <v-btn icon="mdi-dots-vertical" v-bind="props"></v-btn>
        </template>

        <v-list>
          <v-list-item @click="encuestaSalida(idEmpleado)">
            <v-list-item-title>Encuesta de salida</v-list-item-title>
          </v-list-item>
          <v-list-item @click="reingresarBaja(idEmpleado)">
            <v-list-item-title>Reingreso</v-list-item-title>
          </v-list-item>
          <v-list-item @click="funcionMotivoBaja(idEmpleado)">
            <v-list-item-title>Motivo de baja</v-list-item-title>
          </v-list-item>
          <v-divider></v-divider>



          <!-- 
            <v-list-item @click='bajaEmpleado(idEmpleado)'>
              <v-list-item-title style="color: red;">Dar de baja </v-list-item-title>
            </v-list-item>
            -->
        </v-list>

      </v-menu>

    </template>

    <template #item-Estado="{ urlEncuestaSalida }">

      <v-btn title="Encuesta de salida completa" v-if="urlEncuestaSalida != null && urlEncuestaSalida != ''" color="green"
        icon="mdi-checkbox-marked-circle" v-bind="props"></v-btn>


      <v-btn title="Pendiente registrar encuesta de salida" v-if="urlEncuestaSalida == null || urlEncuestaSalida == ''"
        color="red" icon="mdi-checkbox-marked-circle" v-bind="props"></v-btn>
    </template>

  </EasyDataTable>

  <v-dialog style="width: 75%; min-height: auto;" v-model="dialogReingreso">

    <v-card>
      <v-card-text style="text-align: center;">
        <h3 style="font-size: 1.2em;"> ¿Estas seguro de reingresar al empleado?</h3>
      </v-card-text>
      <v-row>
        <v-col cols="12" md="3">
          <v-text-field type="date" style="width: 90%; margin-right: 5%; margin-left: 5%;" v-model="fechareIngreso"
            label="Fecha de re ingreso" variant="outlined" required density="compact"></v-text-field>
        </v-col>
        <v-col cols="12" md="4">
          <v-select v-model="selectDepartamento" :items="departamentos" :rules="nameRules" label="Departamento"
            variant="outlined" required dense bg-color="white" density="compact">
          </v-select>

        </v-col>
        <v-col cols="12" md="4"> <v-select v-model="tipoEmpleado" :rules="nameRules"
            :items="['Operativo', 'Administrativo']" :disabled="this.selectDepartamento != 'OPERACIONES'"
            variant="outlined" label="Tipo de empleado" bg-color="white" density="compact">
          </v-select>
        </v-col>
      </v-row>
      <div>

        <v-row style="margin-left:5px;margin-right:5px;margin-top:5px; padding: 0px;">

          <v-col cols="12" md="3"> <v-select v-model="selectZona" :items="zona" label="Zona" variant="outlined"
              :rules="nameRules" dense bg-color="white" density="compact">
            </v-select>


          </v-col>


          <v-col cols="12" md="3"><v-select :items="servicios" item-title='nombre' item-value='idServicio'
              :disabled="this.selectDepartamento != 'OPERACIONES'" label="Servicio" v-model="selectServicio"
              variant="outlined" dense bg-color="white" density="compact">
            </v-select>

          </v-col>
          <v-col cols="12" md="3"><v-select v-model="selectPuesto" :items="puesto" label="Puesto" :rules="nameRules"
              variant="outlined" required dense bg-color="white" density="compact">
            </v-select>

          </v-col>

        </v-row>
      </div>

      <v-row style="padding: 2%;">
        <v-col cols="6" md="6">
          <v-btn depressed color="error" @click="(this.dialogReingreso = false)">Cancelar</v-btn>
        </v-col>
        <v-col cols="6" md="6" style="text-align:right">
          <v-btn depressed color="primary" @click="reIngresar(this.idBajaActual)">Aceptar</v-btn>
        </v-col>
      </v-row>

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

        <v-text-field style="width: 90%; margin-right: 5%; margin-left: 5%;" v-model="motivoBaja" label="Motivo de baja"
          variant="outlined" required density="compact"></v-text-field>
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
  <v-row justify="center">
    <v-dialog v-model="dialogEncuestaSalida" persistent max-width="550">

      <v-card>
        <v-card-title class="text-h5">
          Encuesta de salida
        </v-card-title>
        <v-card-text>
          <v-row style="vertical-align: top; ">

            <v-text-field style="width: 70%;" v-model="urlEncuesta" label="URL" density="compact" variant="outlined">
            </v-text-field>
            <v-btn :loading="loading3" :disabled="loading3" color="blue" style="width: 26%; top: 0;"
              class="ma-2 white--text" @click="verDocumento()">
              Ver
              <v-icon right dark>
                mdi-eye
              </v-icon>
            </v-btn>
          </v-row>

        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="dialogEncuestaSalida = false">
            Cancelar
          </v-btn>
          <v-btn color="green darken-1" text @click="añadirEncuesta()">
            Agregar URL
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog style="width: 50%; min-height: auto;" v-model="dialogMotivoBaja">
      <v-card>
        <v-card-title class="text-h5" style="background-color: #2596be; color: white;">
          Motivo de Baja
        </v-card-title>
        <v-card-text style="text-align: center;">

        </v-card-text>
        <div style="text-align: center;width: 100%;">
          <v-text-field style="width: 90%; margin-right: 5%; margin-left: 5%;" v-model="motivoBajaInput"
            label="Motivo de baja" variant="outlined" required density="compact"></v-text-field>
        </div>


        <v-row style="padding: 2%;">
          <v-col cols="6" md="6">
            <v-btn depressed color="error" @click="(this.dialogMotivoBaja = false)">Cancelar</v-btn>
          </v-col>
          <v-col cols="6" md="6" style="text-align:right">
            <v-btn depressed color="primary" @click="añadirMotivoBaja(this.idActual)">Aceptar</v-btn>
          </v-col>
        </v-row>

      </v-card>
    </v-dialog>
  </v-row>
</template>
<script  >
import axios from 'axios';
import { isEmpty } from 'lodash';
import router from '@/main';

export default ({
  components: {
    EasyDataTable: window['vue3-easy-data-table'],
  },
  created() {
    this.getEmpleados()
  },
  data() {



    return {
      //entorno: 'http://api-app.duxon.com.mx/',
      entorno: 'http://localhost:7005/',
      selectZona: "",
      selectPuesto: '',
      tipoEmpleado: "",
      selectDepartamento: "",
      motivoBajaInput: '',
      dialogMotivoBaja: false,
      dialogEncuestaSalida: false,
      idBajaActual: null,
      fechareIngreso: '',
      dialogReingreso: false,
      fechaBaja: null,
      motivoBaja: null,
      dialog: false,
      idActual: null,
      valorCampo: '',
      urlEncuesta: '',
      headers: [
        { text: "#Empleado", value: "idEmpleado", width: 20, sortable: true },
        { text: "Estado", value: "Estado" },
        { text: "Nombre", value: "nombre" },
        { text: "Fecha de baja", value: "fechaBaja", sortable: true },
        { text: "Antiguedad", value: "aniosLaborados" },
        { text: "Motivo de baja", value: "motivoBaja" },
        { text: "Servicio", value: "servicio" },
        { text: "Opciones", value: "Opciones" },
      ],
      selectDepartamento: '',
      tipoEmpleado: "Selecciona una opción",
      selectZona: "",
      selectPuesto: null,
      selectServicio: 0,
      puesto: [],
      empleados: [],
      searchField: ["idEmpleado", "nombre", "fechaBaja", "servicio"],
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
      servicios: []
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
    reIngresar(id) {

      //IF NORMAL DE FECHA INGRESO
      if (isEmpty(this.fechareIngreso) || isEmpty(this.selectDepartamento) || isEmpty(this.tipoEmpleado) || isEmpty(this.selectZona) || isEmpty(this.selectPuesto)) {
        this.$notify({
          title: "Error",
          text: "Los campos no pueden ir vacíos.",
          type: 'warn'
        });
      } else {
        let self = this;
        axios.post(self.entorno + 'empleados/reingreso', {
          id: id,
          fechareIngreso: this.fechareIngreso,
          selectDepartamento: this.selectDepartamento,
          tipoEmpleado: this.tipoEmpleado,
          selectZona: this.selectZona,
          selectServicio: this.selectServicio,
          selectPuesto: this.selectPuesto,
        }).then(function (response) {
          var res = response.data.affectedRows;
          if (res == '1') {
            self.$notify({
              title: "OK",
              text: "El empleado se reingreso con exito.",
              type: 'success'
            });
            self.getEmpleados()
            self.dialogReingreso = false
            //document.getElementById("dialogReingreso").reset();
            //document.getElementById("dialogReingreso").reset();
            //document.getElementById("fechareIngreso").reset();
            // self.document.getElementById('fechareIngreso').value = ''
          } else {
            this.$notify({
              title: "Error",
              text: "Ocurrio un error al reingresar el empleado.",
              type: 'warn'
            });
          }
        })
      }
    },
    añadirMotivoBaja(id) {
      let self = this;
      if (this.motivoBajaInput == null || this.motivoBajaInput == '') {
        this.$notify({
          title: "Error",
          text: "El motivo de baja no puede ir vacio.",
          type: 'warn'
        });
      } else {
        axios.post(self.entorno + 'empleados/agregarMotivoBaja', {
          id: id,
          motivoBaja: this.motivoBajaInput
        }).then(function (response) {
          var res = response.data.affectedRows;
          if (res == '1') {
            self.$notify({
              title: "Ok",
              text: "Se añadio motivo de baja",
              type: 'success'
            });
            self.getEmpleados()
            self.dialogMotivoBaja = false
            self.motivoBajaInput = ''
          } else {
            self.$notify({
              title: "Error",
              text: "Ocurrio un error al agregar motivo de baja.",
              type: 'warn'
            });
          }
        });
      }
    },
    funcionMotivoBaja(id) {
      this.idActual = id
      this.dialogMotivoBaja = true
    },
    mostrarEnc(encuestaURL) {
      alert(encuestaURL)
    },
    encuestaSalida(id) {
      this.dialogEncuestaSalida = true
      this.idActual = id
      this.getEncuestaSalida()

    },

    reingresarBaja(id) {
      this.dialogReingreso = true
      this.idBajaActual = id
    },
    bajaEmpleado(id) {
      this.idActual = id
      this.dialog = true
      this.fechaBaja = null
      this.motivoBaja = null

    },
    getEmpleados() {
      let idServicio = localStorage.getItem("servicioActual")
      let serviciosSeleccionados = ''
      if (idServicio == 0) {
        serviciosSeleccionados = localStorage.getItem('serviciosAsignados')
      } else {
        serviciosSeleccionados = idServicio
      }
      let self = this;
      axios.post(self.entorno + 'empleados/getEmpleadosBaja', {
        servicios: serviciosSeleccionados
      }).then(function (response) {
        self.empleados = response.data

      })

    },
    añadirEncuesta() {
      let self = this;
      axios.post(self.entorno + 'empleados/actualizarEncuestaSalida', {
        id: this.idActual,
        url: this.urlEncuesta
      }).then(function (response) {
        var res = response.data.affectedRows;
        if (res == '1') {
          self.$notify({
            title: "OK",
            text: "La URL se ha ingresado con exito.",
            type: 'success'
          });
          self.getEmpleados()

          self.dialogEncuestaSalida = false;

        } else {
          self.$notify({
            title: "Error de registro",
            text: "Ocurrio un error al ingresar el URL para el documento.",
            type: 'warn'
          });
        }
      })
    },
    getEncuestaSalida() {
      let self = this;
      axios.post(self.entorno + 'empleados/encuestaSalidaxEmpleado', {
        id: this.idActual
      }).then(function (response) {
        //console.log(response.data[0].urlEncuestaSalida)
        self.urlEncuesta = response.data[0].urlEncuestaSalida
      })
    },
    verDocumento() {
      if (this.urlEncuesta != '' && this.urlEncuesta != null) {
        var win = window.open(this.urlEncuesta, '_blank');
        win.focus();
      } else {
        this.$notify({
          title: "Error",
          text: "No hay un archivo para ver.",
          type: 'warn'
        });

      }
    },
    async obtenerServicio(zonaServicio) {
      let self = this;
      this.servicios = []
      //axios.post('http://localhost:7005/general/servicios', { zona: zonaServicio }).then(function (response) {
      axios.post(self.entorno + 'general/servicios', { zona: zonaServicio }).then(function (response) {
        self.servicios = response.data


      })
    }

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