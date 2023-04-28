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


        <v-list density="compact" nav style=" margin: 0;padding: 0px;">
            <v-list-item :to="{ name: 'dashboard' }" prepend-icon="mdi-home-city" title="Inicio" value="home">
            </v-list-item>




            <!--Capital Humano modulo-->
            <div>
                <v-list-group class="v-list-item__content:hover" value="capitalHumanoMenu" style="position: relative; ">
                    <template v-slot:activator="{ props }">
                        <v-list-item v-bind="props" prepend-icon="mdi-human-greeting-proximity"
                            title="Capital Humano"></v-list-item>
                    </template>

                    <!--Empleados-->
                    <v-list-item :to="{ name: 'Empleados' }" class="v-list-item__content" title="Empleados"
                        value="Empleados">
                    </v-list-item>

                     <!--Departamentos-->
                     <v-list-item :to="{ name: 'Departamentos' }" class="v-list-item__content" title="Departamentos"
                        value="Departamentos">
                    </v-list-item>

                    <!--Departamentos-->
                    <v-list-item :to="{ name: 'Puestos' }" class="v-list-item__content" title="Puestos"
                        value="Puestos">
                    </v-list-item>

                </v-list-group>

                <!-- Almacén-->
                <v-list-group v-if="almacen_show" class="v-list-item__content:hover" value="AlmacenMenu"
                    style="position: relative; ">
                    <template v-slot:activator="{ props }">
                        <v-list-item v-bind="props" prepend-icon="mdi-human-greeting-proximity"
                            title="Almacén"></v-list-item>
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
                    <v-list-item :to="{ name: 'Registro_Patronal' }" class="v-list-item__content" title="Registro Patronal"
                        value="Registro Patronal">
                    </v-list-item>

                    <!--IMSS-->
                    <v-list-group class="v-list-item__content:hover" value="imssMenu" style="position: relative; ">
                    <template v-slot:activator="{ props }">
                        <v-list-item v-bind="props"
                            title="Afiliaciones"></v-list-item>
                    </template>
                    <!--IMSS-->
                    <v-list-item :to="{ name: 'AltasIMSS' }" class="v-list-item__content" title="AltasIMSS"
                        value="AltasImss">
                    </v-list-item>
                </v-list-group>
                </v-list-group>
            </div>
        </v-list>
        <!-- Fin modulos contabilidad -->


        <v-list-item :to="{ name: 'servicios' }" v-show="permisoUsuario" prepend-icon="mdi-home-city" title="Servicios"
            value="Servicios">
        </v-list-item>

        <v-list-item :to="{ name: 'usuarios' }" v-show="permisoUsuario" prepend-icon="mdi-home-city" title="Usuarios"
            value="Usuarios">
        </v-list-item>
    </v-navigation-drawer>


    <v-app-bar style="background:#2890CD ;">
        <v-app-bar-nav-icon style="color: white;" @click="drawer = !drawer"></v-app-bar-nav-icon>
        <v-toolbar-title style="color: white;">Bienvenido</v-toolbar-title>
        <v-btn @click="limpiarCodigo()" :to="{ name: 'login' }" style="color: white;" title="Cerrar sesión">
            <v-icon left>
                mdi-exit-to-app
            </v-icon>
            Cerrar sesión
        </v-btn>
    </v-app-bar>
    <router-view></router-view>

</template>

<script >
import router from '@/main';
import { isNull } from 'lodash';

export default {


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