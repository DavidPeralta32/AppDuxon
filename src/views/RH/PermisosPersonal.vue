<template>
     
     <v-navigation-drawer style="color: white; font-size: 1em; margin: 0;padding: 0px;border: 0;" color="rgba(43,49,61)"
      v-model="drawer" app>
      <v-sheet color="white" style="width:100%; " class="pa-2">
        <!--Icono de avatar-->

        <div style="width:200px;  text-align: center; ">
          <img style="width: 80%;" src="../fondos/LogoDuxon.svg">
        </div>

      </v-sheet>
      <v-divider></v-divider>

      <!--OTRA LISTA DE ITEMS EN NAVEGACIÓN-->



      <v-list   density="compact" nav style=" margin: 0;padding: 0px;">
        <v-list-item :to="{ name: 'dashboard' }" prepend-icon="mdi-home-city" title="Inicio" value="home">
        </v-list-item>




        <!--Capital Humano modulo-->
        <div>
          <v-list-group   class="v-list-item__content:hover" value="capitalHumanoMenu"
            style="position: relative; ">
            <template v-slot:activator="{ props }">
              <v-list-item v-bind="props" prepend-icon="mdi-human-greeting-proximity"
                title="Capital Humano"></v-list-item>
            </template>
            <v-list-item :to="{ name: 'Capital Humano' }" class="v-list-item__content" title="Empleados"
              value="Empleados">
            </v-list-item>

            <v-list-item :to="{ name: 'asistencia' }" class="v-list-item__content" title="Vacaciones"
              value="Asistencia y Vacaciones"></v-list-item>
            <v-list-item :to="{ name: 'requisicion' }" class="v-list-item__content" title="Requisicion Personal"
              value="Requisicion"></v-list-item>
            <v-list-item :to="{ name: 'permisos' }" class="v-list-item__content" title="Permisos Personal"
              value="Permisos Personal"></v-list-item>
          </v-list-group>

          <!-- Almacén-->
          <v-list-group v-if="almacen_show" class="v-list-item__content:hover" value="AlmacenMenu"
            style="position: relative; ">
            <template v-slot:activator="{ props }">
              <v-list-item v-bind="props" prepend-icon="mdi-human-greeting-proximity" title="Almacén"></v-list-item>
            </template>
            <v-list-item to="" class="v-list-item__content" title="Empleados" value="">
            </v-list-item>
          </v-list-group>

          <v-list-group v-if="Usuarios_show" class="v-list-item__content:hover" style="position: relative; ">
            <template v-slot:activator="{ props }">
              <v-list-item v-bind="props" prepend-icon="mdi-human-greeting-proximity"
                title="Admon. Usuarios"></v-list-item>
            </template>
            <v-list-item :to="{ name: 'usuarios' }" class="v-list-item__content" title="Usuarios" value="">
            </v-list-item>
          </v-list-group>
        </div>


        <!--FIN Capital Humano modulo-->

        <!-- Contabilidad modulos -->
        <div>
                <v-list-group class="v-list-item__content:hover" value="contabilidadMenu" style="position: relative; ">
                    <template v-slot:activator="{ props }">
                        <v-list-item v-bind="props" prepend-icon="mdi-human-greeting-proximity"
                            title="Contabilidad"></v-list-item>
                    </template>
                    <v-list-item :to="{ name: 'Contabilidad' }" class="v-list-item__content" title="Registro Patronal"
                        value="Registro Patronal">
                    </v-list-item>
                </v-list-group>
            </div>
        <!-- Fin modulos contabilidad -->



        <v-list-item :to="{ name: 'servicios' }" prepend-icon="mdi-home-city" title="Servicios" value="Servicios">
        </v-list-item>

        <v-list-item :to="{ name: 'usuarios' }" prepend-icon="mdi-home-city" title="Usuarios" value="Usuarios">
        </v-list-item>
      </v-list>
    </v-navigation-drawer>


    <v-app-bar style="background:#2890CD ;">
      <v-app-bar-nav-icon style="color: white;" @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title style="color: white;">Bienvenido</v-toolbar-title>
      <v-btn :to="{ name: 'login' }"  style="color: white;" title="Cerrar sesión">
          <v-icon left>
            mdi-exit-to-app
          </v-icon>
            Cerrar sesión
        </v-btn>
    </v-app-bar>
     <v-col cols="4">
          <H2>Permisos personal Proximamente...</H2>

        </v-col>
        <v-col cols="12">

          <v-img src="https://upload.wikimedia.org/wikipedia/commons/1/1e/SITIO-EN-CONSTRUCCION.jpg">

          </v-img>
        </v-col>


 
      <router-view> </router-view>
   
   

  


</template>

<script> 
import router from '@/main';

export default {
 
 
  data: () => ({
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