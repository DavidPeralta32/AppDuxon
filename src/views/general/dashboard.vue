<template>
  
  <!-- Navbar de opciones de navegacion -->
  <navBar></navBar>
    <!-- Fin navBar-->

  <v-col cols="4">
    <H2>DASHBOARD Proximamente...</H2>
  </v-col>

  <v-col cols="12">
    <v-img src="https://upload.wikimedia.org/wikipedia/commons/1/1e/SITIO-EN-CONSTRUCCION.jpg">
    </v-img>
  </v-col>

  <router-view> </router-view>
</template>

<script>
import router from '@/main';
import { isNull } from 'lodash';
import navBar from './navBar.vue'

export default {
  components:{
    navBar
  },
  data: () => ({
    permisoUsuario: false,
    open: ['Users'],
    admins: [
      ['Management', 'mdi-account-multiple-outline'],
      ['Settings', 'mdi-cog-outline'],
    ],
    /*cruds: [
      ['Create', 'mdi-plus-outline'],
      ['Read', 'mdi-file-outline'],
      ['Update', 'mdi-update'],
      ['Delete', 'mdi-delete'],
    ],*/
    drawer: null,
    links: [
      ['mdi-account-group', 'Capital Humano'],
      //['mdi-send', 'Jurídico'],
      ['mdi-chart-bar', 'Contabilidad'],
      // ['mdi-alert-octagon', 'Spam'],
    ]
  }),

  created() {
    this.validarPermisos()
  },
  methods: {
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
  }
}

</script>


<!--<template>  //Código por default creado por el router
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </nav>
  <router-view/>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
-->