<template >
  <v-container
    style="background-image: url('../fondos/login.png'); min-width: 100%;min-height: 100%;position: fixed;background-size: 100%, 100vh;"
    id="fondo">
    <notifications />
    <v-responsive style="" class="d-flex align-center text-center fill-height">
      <v-sheet style="background: none ;" class="pa-12 " rounded>
        <v-row>
          <v-col col="1" sm="1">

          </v-col>
          <v-col col="4" sm="4">
            <v-card id="card-logo" style="background-color:rgba(0, 0, 0, 0.8) ; width: 100%;"
              class="logo mx-auto px-6 py-8">

              <!-- <v-card-title>Inicio de sesión</v-card-title> -->





              <v-img src="../../public/LogoDuxon.svg" cover style="width: 100%;text-align: center;display: block;">
              </v-img>





              <v-text-field style="color: white ;  " v-model="email" :readonly="loading" :rules="[required]" class="mb-2"
                clearable label="Correo" placeholder="Ingresa tu correo"></v-text-field>

              <v-text-field style="color: white ;" v-model="password" :readonly="loading" :rules="[required]" clearable
                label="Contraseña" type="password" placeholder="Ingresa tu contraseña"></v-text-field>

              <br>


              <v-btn :loading="loading" block style="color: white;" color="rgb(99, 101, 105)" size="large"
                variant="elevated" @click="login()">
                Ingresar
              </v-btn>

              <v-btn :loading="loading" block style="color: white; margin-top: 10%;" color="rgb(99, 101, 105)"
                size="large" variant="elevated" @click="registrar()">
                Registrar
              </v-btn>

              <v-btn
                style="width: 100%; background-color: rgba(0, 0, 0, 0.8); opacity: 9; background: #ECEFF1; margin-top: 10%;"
                @click="reeestablecer()" white>
                Olvide mi contraseña!
              </v-btn>


            </v-card>
          </v-col>
        </v-row>
      </v-sheet>
    </v-responsive>
  </v-container>

  <v-dialog style="width: 50%; min-height: auto;" v-model="dialogMotivoBaja">
    <v-card>
      <v-container>
        <v-form ref="dialogoMotivoBaja" v-model="valid" lazy-validation>
          <v-card-title class="text-h5" style="background-color: #2596be; color: white;">
            Motivo de Baja
          </v-card-title>
          <v-card-text style="text-align: center;">

          </v-card-text>
          <div style="text-align: center;width: 100%;">
            <v-text-field style="width: 90%; margin-right: 5%; margin-left: 5%;" v-model="motivoBajaInput"
              label="Motivo de baja" variant="outlined" required density="compact"
              :rules="rulesInputClaveCurp"></v-text-field>
          </div>


          <v-row style="padding: 2%;">
            <v-col cols="6" md="6">
              <v-btn depressed color="error" @click="(this.dialogMotivoBaja = false)">Cancelar</v-btn>
            </v-col>
            <v-col cols="6" md="6" style="text-align:right">
              <v-btn depressed color="primary" @click="añadirMotivoBaja(this.idActual)">Aceptar</v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-container>
    </v-card>
  </v-dialog>

  <v-dialog v-model="dialogRegistrar" width="85%" persistent="true">
    <template v-slot:default="dialog">
      <v-card>
        <v-toolbar color="primary" dark style="position: fixed;z-index: 100; width: 100%;">
          <h2 style="margin-left: 20px"> Registro de usuarios </h2>
        </v-toolbar>

        <v-container>
          <v-form ref="formRegistroNuevoUsuario" v-model="valid" lazy-validation>
            <h3 style="margin-top:05% ;">Datos para registro:</h3>

            <v-divider style="margin-bottom: 30px;"></v-divider>
            <v-row class="filasRegistro">
              <v-col cols="12" md="6">
                <v-text-field v-model="inputCorreoInstitucional" :rules="rulesInputCorreoInstitucional"
                  label="Correo Institucional" density="compact" variant="outlined" required></v-text-field>

              </v-col>

              <v-col cols="12" md="6">
                <v-text-field v-model="inputClaveCurp" label="Clave Curp" variant="outlined" :rules="rulesInputClaveCurp"
                  required density="compact" maxlength="18"></v-text-field>
              </v-col>

            </v-row>

            <v-row>
              <v-col cols="12" md="6">
                <v-btn color="red" @click="(this.dialogRegistrar = false)">Cancelar</v-btn>
              </v-col>
              <v-col cols="12" md="6" style="text-align:right">
                <v-btn color="primary" @click="registrarEmpleados()">Registrar</v-btn>

              </v-col>
            </v-row>
          </v-form>

        </v-container>
      </v-card>


    </template>
  </v-dialog>

  <v-dialog v-model="dialogReestablecer" width="85%" persistent="true">
    <template v-slot:default="dialog">
      <v-card>
        <v-toolbar color="primary" dark style="position: fixed;z-index: 100; width: 100%;">
          <h2 style="margin-left: 20px"> Reestablecer contraseñas </h2>
        </v-toolbar>

        <v-container>
          <v-form ref="formReestablecer" v-model="valid" lazy-validation>
            <h3 style="margin-top:05% ;">Datos para reestablecer:</h3>

            <v-divider style="margin-bottom: 30px;"></v-divider>
            <v-row class="filasRegistro">
              <v-col cols="12" md="6">
                <v-text-field v-model="inputCorreoInstitucionalR" :rules="rulesInputCorreoInstitucional"
                  label="Correo Institucional" density="compact" variant="outlined" required></v-text-field>

              </v-col>

              <v-col cols="12" md="6">
                <v-text-field v-model="inputClaveCurpR" label="Clave Curp" variant="outlined" :rules="rulesInputClaveCurp"
                  required density="compact" maxlength="18"></v-text-field>
              </v-col>

            </v-row>

            <v-row>
              <v-col cols="12" md="6">
                <v-btn color="red" @click="(this.dialogReestablecer = false)">Cancelar</v-btn>
              </v-col>
              <v-col cols="12" md="6" style="text-align:right">
                <v-btn color="primary" @click="reeestablecerContrasena()">Reenviar</v-btn>

              </v-col>
            </v-row>
          </v-form>

        </v-container>
      </v-card>


    </template>
  </v-dialog>
</template>
<script>
import router from '@/main';
import axios from 'axios';
//import routerView from "./components/router-view";
//import menu from '../src/components/menu.vue'

export default ({
  components: {

  },
  limpiarCodigo() {
    localStorage.clear()
  },
  created() {
    localStorage.clear()
    // if (window.location.href == 'http://127.0.0.1:3000/#/' || window.location.href == 'http://localhost:3000/#/' || window.location.href == 'http://pruebas.duxon.com.mx/#/') {

    // } else {
    //   this.login_ventana = false
    //   this.menu_nav = true


    // }
  },
  name: 'empleados',
  data() {
    return {
      //conexion
      //pruebas:'http://localhost:7005/',
      //produccion:'http://api-app.duxon.com.mx/',
      //entorno: 'http://api-app.duxon.com.mx/',
      entorno: 'http://localhost:7005/',

      drawer: true,
      items: [
        { title: 'Home', icon: 'mdi-home-city' },
        { title: 'My Account', icon: 'mdi-account' },
        { title: 'Users', icon: 'mdi-account-group-outline' },
      ],
      //rules generals from inputs
      rulesInputClaveCurp: [
        value => !!value || 'Campo requerido.',
        value => {
          const pattern = /^[A-Z0-9]+$/g
          return pattern.test(value) || 'Solo numeros y letras mayusculas.'
        },
      ],
      rulesInputCorreoInstitucional: [
        value => !!value || 'Campo requerido.',
        //value => (value || '').length <= 20 || 'Max 20 characters',
        value => {
          const pattern = /^[A-Za-z0-9-_.]+\@duxon\.com\.mx$/
          return pattern.test(value) || 'Correo invalido.'
        },
      ],

      rail: true,
      email: "",
      password: "",
      Rout: null,
      login_ventana: true,
      menu_nav: false,
      drawer: null,
      activator: false,
      //menu
      capitalHumanoMenu: false,
      dialogRegistrar: false,
      dialogReestablecer: false,
      inputCorreoInstitucional: "",
      inputClaveCurp: "",
      inputCorreoInstitucionalR: "",
      inputClaveCurpR: "",

    }
  },
  watch: {
    dialogRegistrar() {
      if (
        this.dialogRegistrar == false) {
        this.inputCorreoInstitucional = ""
        this.inputClaveCurp = ""
      }

    },
    dialogReestablecer() {
      if (
        this.dialogReestablecer == false) {
        this.inputCorreoInstitucionalR = ""
        this.inputClaveCurpR = ""
      }

    }
  },
  methods: {
    login() {
      var res = 5
      let self = this;
      if (this.email != '' && this.password != '' && this.email != null && this.password != null) {

        axios.post(self.entorno + 'general/login', {
          usuario: this.email,
          password: this.password
        }).then(function (response) {
          res = response.data[0]
          let permisos = response.data[1]

          if (res == 'true') {

            localStorage.setItem("departamento", response.data[1][0].departamento);
            localStorage.setItem("puesto", response.data[1][0].puesto);
            localStorage.setItem("tipoUsuario", response.data[1][0].tipoUsuario);
            localStorage.setItem("serviciosAsignados", response.data[1][0].serviciosAsignados);
            localStorage.setItem("id", response.data[1][0].idEmpleado);
            //self.getPermisoArea(response.data[1][0].idEmpleado,response.data[1][0].departamento)
            router.push("/dashboard")
          }
          if (res == 'false') {
            self.$notify({
              title: "Error",
              text: "Error al iniciar sesión. El correo o la contraseña son incorrectas.",
              type: 'error'
            });
          }
        })


      } else {
        this.$notify({
          title: "Error",
          text: "Ingresa el usuario y la contraseña",
          type: 'error'
        });

      }
    },


    registrar() {
      this.dialogRegistrar = true
    },
    async registrarEmpleados() {

      if (this.inputClaveCurp == null || this.inputClaveCurp.trim() == '' || this.inputCorreoInstitucional.trim() == '' || this.inputCorreoInstitucional.trim() == '') {

        this.$notify({
          title: "Error",
          text: "El campo correo instituacional y clave curp no puede estar vacío ni contener caracteres en blanco",
          type: 'warn'
        });

      } else {

        let self = this;
        const { valid } = await this.$refs.formRegistroNuevoUsuario.validate()

        if (valid) {

          if (this.inputClaveCurp.length < 18) {

            self.$notify({
              title: "Error de registro",
              text: "El curp no puede contener menos de 18 caracteres.",
              type: 'warn'
            });

          } else {

            axios.post(self.entorno + 'general/registrarNuevoUsuario', {
              //usuario: this.email
              inputCorreoInstitucional: this.inputCorreoInstitucional,
              inputClaveCurp: this.inputClaveCurp,

            }).then(function (response) {
              //Si existe la cuenta = true
              console.log(response.data)
              if (response.data[0] == 0) {

                if (response.data[1] == 1) {
                  self.$notify({
                    title: "Error de registro",
                    text: "El CURP introducido ya esta registrado con una cuenta de correo.",
                    type: 'warn'
                  })
                } else {
                  self.$notify({
                    title: "Error de registro",
                    text: "La clave CURP aun no esta registrada, contacta con RH.",
                    type: 'warn'
                  })
                }

              } else {

                if (response.data[1] == 0) {
                  self.$notify({
                    title: "Exito",
                    text: "Usuario registrado con exito, la contraseña asignada sera enviada al correo: " + self.inputCorreoInstitucional + " ",
                    type: 'success'
                  });

                  self.dialogRegistrar = false

                } else {
                  self.$notify({
                    title: "Error de registro",
                    text: "El correo introducido ya esta en uso por un usuario.",
                    type: 'warn'
                  });

                }

              }

            }).catch(function (error) {

              this.$notify({
                title: "Ocurrio un error",
                text: "Ocurrio un error porfavor contacta con sistemas para validar que tu usario se haya creado correctamente.",
                type: 'warn'
              });
              self.dialogRegistrar = false

            })
          }

        } else {
          this.$notify({
            title: "Error de registro",
            text: "Corrige los campos marcados en rojo.",
            type: 'warn'
          });
        }
      }
    },

    async reeestablecer() {
      this.dialogReestablecer = true
    },


    async reeestablecerContrasena() {

      if (this.inputClaveCurpR == null || this.inputClaveCurpR.trim() == '' || this.inputCorreoInstitucionalR.trim() == '' || this.inputCorreoInstitucionalR.trim() == '') {

        this.$notify({
          title: "Error",
          text: "El campo correo instituacional y clave curp no puede estar vacío ni contener caracteres en blanco",
          type: 'warn'
        });

      } else {

        let self = this;
        const { valid } = await this.$refs.formReestablecer.validate()

        if (valid) {

          if (this.inputClaveCurpR.length < 18) {

            self.$notify({
              title: "Error de registro",
              text: "El curp no puede contener menos de 18 caracteres.",
              type: 'warn'
            });

          } else {

            axios.post(self.entorno + 'general/reestablecerContrasena', {
              //usuario: this.email
              inputCorreoInstitucionalR: this.inputCorreoInstitucionalR,
              inputClaveCurpR: this.inputClaveCurpR,

            }).then(function (response) {

              if (response.data[0] == 0) {

                self.$notify({
                  title: "Error de registro",
                  text: "El CURP o el correo introducido son incorrectos.",
                  type: 'warn'
                })

              } else {

                if (response.data[1] == 1) {
                  self.$notify({
                    title: "Exito",
                    text: "La nueva contraseña asignada sera enviada al correo: " + self.inputCorreoInstitucionalR + " ",
                    type: 'success'
                  });
                  self.dialogReestablecer = false

                } else {
                  self.$notify({
                    title: "Error de registro",
                    text: "Ocurrio un error al enviar el correo, contacta con sistemas.",
                    type: 'warn'
                  });
                  self.dialogReestablecer = false

                }

              }

            }).catch(function (error) {

              self.$notify({
                title: "Ocurrio un error",
                text: "Ocurrio un error porfavor contacta con sistemas para reestablecer correctamente tu contraseña.",
                type: 'warn'
              });
              self.dialogReestablecer = false

            })
          }

        } else {
          this.$notify({
            title: "Error de registro",
            text: "Corrige los campos marcados en rojo.",
            type: 'warn'
          });
        }
      }
    },

    Roles(correo) {
      let self = this;
      axios.post(self.entorno + 'general/Rol', {
        email: correo
      }).then(function (response) {
        let departamento = response.data[0].departamento
        let rol = response.data[0].idRol
        switch (departamento) {
          case "CH":
            self.ch_show = true;
            //self.almacen_show=true;
            break;

          default:
            break;
        }
      });
    }
  }

}

);
</script>
<style>
#fondo {
  background-image: url('../../empleadosapp/public/login.png');
  min-width: 100%;
  min-height: 100vh;

  position: fixed;
  background-size: 100%, 100vh;

}

.border {
  border: 2px dashed orange;
}

.v-list-item__content {
  width: 100%;
  justify-content: left;
  text-align: center;
  display: grid;
  margin: 0;
  padding: 0;

}

.v-list-item:hover {
  background: rgb(0, 123, 196);
  color: white;

}

.v-list-item--active:not(.v-list-group__header) {
  background-color: rgb(0, 123, 196);
  color: white;
}
</style>
          