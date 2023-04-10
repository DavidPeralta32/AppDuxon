<template>
  <v-app id="inspire">
    <v-navigation-drawer color=#ECEFF1 v-model="drawer" app>
      <v-sheet color=#9E9E9E class="pa-2">
        <!--Icono de avatar-->
        <v-avatar class="mb-5" color="black" size="85"></v-avatar>
        <div>Duxon@gmail.com</div>
      </v-sheet>
      <v-divider></v-divider>

      <!--OTRA LISTA DE ITEMS EN NAVEGACIÓN-->
      <v-card class="mx-auto" width="" image="">
        <v-list v-model:opened="open">
          <div id="nav">
            <router-link to="/empleados">Home</router-link> |
        
          </div>

        </v-list>
      </v-card>


      <!-- <v-list >    LISTA DE ITEMS DE NAV BAR
        <v-list-item 
        v-for="[icon, text] in links" :key="icon" link>
          <template v-slot:prepend>
            <v-icon>{{ icon }}</v-icon>
          </template>

          <v-list-item-title>{{ text }}</v-list-item-title>
        </v-list-item>
      </v-list>-->
    </v-navigation-drawer>



    <!--intento de footer-->
    <v-app-bar>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Duxon</v-toolbar-title>
    </v-app-bar>

    <v-main>
      <v-row :align="align" no-gutters style="height: 150px;margin-top: 10px; margin: 0px 10 px 20px 30px;">
        <v-col cols="4">
          <H2>dashboard</H2>

        </v-col>
        <v-col cols="4">

          <v-card class="pa-2" outlined tile>
            One of three columns
          </v-card>
        </v-col>

        <v-col cols="4">

          <v-card class="pa-2" outlined tile>
            One of three columns
          </v-card>
        </v-col>



      </v-row>

      <v-footer style="position:fixed;bottom: 0; width: 100%;" class="bg-grey-lighten-1">
        <v-row justify="center" no-gutters>
          <v-btn v-for="link in links" :key="link" color="white" variant="text" class="mx-" rounded="xl">
            {{ link }}
          </v-btn>
          <v-col class="text-center mt-4" cols="12">
            {{ new Date().getFullYear() }} — <strong>Ivan Landeros</strong>
          </v-col>
        </v-row>
      </v-footer>
      <router-view></router-view>
    </v-main>
  </v-app>





</template>

<script>
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