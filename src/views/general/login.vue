<template >
  <v-container  v-if="login_ventana" id="fondo">
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





              <v-img src="/public/LogoDuxon.svg" cover style="width: 100%;text-align: center;display: block;">
              </v-img>





              <v-text-field style="color: white ;  " v-model="email" :readonly="loading" :rules="[required]"
                class="mb-2" clearable label="Correo" placeholder="Ingresa tu correo"></v-text-field>

              <v-text-field style="color: white ;" v-model="password" :readonly="loading" :rules="[required]" clearable
                label="Contraseña" type="password" placeholder="Ingresa tu contraseña"></v-text-field>

              <br>


              <v-btn :loading="loading" block style="color: white;" color="rgb(99, 101, 105)" size="large"
                variant="elevated" @click="login()">
                Ingresar
              </v-btn>
            </v-card>
          </v-col>
        </v-row>
      </v-sheet>
    </v-responsive>
  </v-container>
</template>
  
<script>
import router from '@/main';
import axios from 'axios';
import routerView from "../../components/router-view.vue";

 
export default ({
  components: {
    routerView 
  },
  created() {

 
  },
  name: 'empleados',
  data() {
    return {
      ch_show: false,
      almacen_show:false,
      drawer: true,
      items: [
        { title: 'Home', icon: 'mdi-home-city' },
        { title: 'My Account', icon: 'mdi-account' },
        { title: 'Users', icon: 'mdi-account-group-outline' },
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
    }
  },
  watch: {
  },
  methods: {
    login() {
      var res = 5
      let self = this;
      if (this.email != '' && this.password != '' && this.email != null && this.password != null) {

        axios.post('http://api-app.duxon.com.mx/general/login', {
          usuario: this.email,
          password: this.password
        }).then(function (response) {
          res = response.data[0].total
          if (res == 1) {
            self.login_ventana = false
            self.menu_nav = true

            
            self.Roles(self.email);
            self.$notify({
              title: "Bienvenido",
              text: "Inicio de sesión exitoso.",
              type: 'success'
            });

            router.push("/dashboard")


          }
          if (res == 0) {
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
    Roles(correo){
      let self = this;
      axios.post('http://http://api-app.duxon.com.mx/general/Rol', {
          email: correo
        }).then(function (response) {
          let departamento=response.data[0].departamento
          let rol=response.data[0].idRol
          switch (departamento) {
            case "CH":
                self.ch_show=true;
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
  background-image: url('fondo.png');
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