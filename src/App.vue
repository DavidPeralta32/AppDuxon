<template >
  <v-app style="background-color: white; padding-right: 0;">



    <v-main>

      <routerView>
      </routerView>

    </v-main>
  </v-app>
</template>
 
<script>
import router from '@/main';
import axios from 'axios';
import routerView from "./components/router-view";
import menu from '../src/components/menu.vue'

export default ({
  components: {
    routerView,
    Menu: menu
  },
  created() {
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
      Usuarios_show: false,
      ch_show: true,
      almacen_show: false,
      items: [
        { title: 'Home', icon: 'mdi-home-city' },
        { title: 'My Account', icon: 'mdi-account' },
        { title: 'Users', icon: 'mdi-account-group-outline' },
      ],
      rail: true,
      email: "",
      password: "",
      Rout: null,
      drawer: false,
      activator: false,
      //menu
      capitalHumanoMenu: false,

      //rules generals from inputs
      rulesInputClaveElector: [
        value => !!value || 'Campo requerido.',
        value => value.length <= 12 || 'Maximo 13 caracteres',
      ],

      inputsRegistroLN: [
        value => !!value || 'Campo requerido.',
        value => {
          const pattern = /^[A-Za-z0-9\s]+$/g
          return pattern.test(value) || 'Solo numeros y letras.'
        },
      ],

      inputsRegistroN: [
        value => !!value || 'Campo requerido.',
        value => {
          const pattern = /^[0-9\s]+$/g
          return pattern.test(value) || 'Solo numeros.'
        },
      ],

      inputsRegistroNNR: [
        value => {
          const pattern = /^[0-9\s]+$/g
          return pattern.test(value) || 'Solo numeros.'
        },
      ],

      nameRulesinputsTelefonos: [
        value => !!value || 'Campo requerido.',
        value => value.length <= 10 || 'Maximo 10 digitos',
        value => {
          const pattern = /^[0-9\s]+$/g
          return pattern.test(value) || 'Solo numeros.'
        },
      ],

      nameRulesinputsCorreos: [
        value => !!value || 'Campo requerido.',
        value => (value || '').length <= 20 || 'Max 20 characters',
        value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || 'Invalid e-mail.'
        },
      ],

      inputsRegistroLNNR: [
        value => {
          const pattern = /^\s[A-Za-z0-9\s]+$/g
          return pattern.test(value) || 'Solo numeros y letras.'
        },
      ],


    }
  },
  watch: {
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
          res = response.data[1]
          let permisos = response.data[0]
          if (res == true) {
            self.login_ventana = false
            self.menu_nav = true

            self.ch_show = false
            self.Usuarios_show = false


            //Se verifican permisos



            router.push("/dashboard")
          }
          if (res == false) {
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
      
 


 
