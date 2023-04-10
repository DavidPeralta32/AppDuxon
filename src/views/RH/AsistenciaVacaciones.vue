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
          <H2>ASISTENCIA Y VACACIONES PROXIMAMENTE...</H2>

        </v-col>
        <v-col cols="12">

          <v-img src="https://upload.wikimedia.org/wikipedia/commons/1/1e/SITIO-EN-CONSTRUCCION.jpg">

          </v-img>
        </v-col>

</template>

<script>
  export default {
    data () {
      return {
        tab: null,
        items: [
          { tab: 'One', content: 'Tab 1 Content' },
          { tab: 'Two', content: 'Tab 2 Content' },
          { tab: 'Three', content: 'Tab 3 Content' },
          { tab: 'Four', content: 'Tab 4 Content' },
          { tab: 'Five', content: 'Tab 5 Content' },
          { tab: 'Six', content: 'Tab 6 Content' },
          { tab: 'Seven', content: 'Tab 7 Content' },
          { tab: 'Eight', content: 'Tab 8 Content' },
          { tab: 'Nine', content: 'Tab 9 Content' },
          { tab: 'Ten', content: 'Tab 10 Content' },
        ],
      }
    },
  }
</script>
 