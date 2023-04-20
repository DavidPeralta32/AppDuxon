<template>
    <v-navigation-drawer v-model="drawer" app class="navbar">
        <v-sheet class="pa-2">
            <!--Icono de avatar-->
            <div class="contendor-menu-img">
                <img style="width: 80%;" src="../fondos/LogoDuxon.svg">
            </div>
        </v-sheet>
        <v-divider></v-divider>

        <!--OTRA LISTA DE ITEMS EN NAVEGACIÓN-->
        <div class="navbar-contenedor">
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

                        <!--IMSS-->
                        <v-list-item :to="{ name: 'IMSS' }" class="v-list-item__content" title="IMSS" value="Imss">
                        </v-list-item>

                        <!--Departamentos-->
                        <v-list-item :to="{ name: 'Departamentos' }" class="v-list-item__content" title="Departamentos"
                            value="Departamentos">
                        </v-list-item>

                        <!--Departamentos-->
                        <v-list-item :to="{ name: 'Puestos' }" class="v-list-item__content" title="Puestos" value="Puestos">
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
                        <v-list-item :to="{ name: 'Registro_Patronal' }" class="v-list-item__content"
                            title="Registro Patronal" value="Registro Patronal">
                        </v-list-item>
                    </v-list-group>
                </div>
                <!-- Fin modulos contabilidad -->

                <div>
                    <v-list-item :to="{ name: 'servicios' }" v-show="permisoUsuario" prepend-icon="mdi-home-city"
                        title="Servicios" value="Servicios">
                    </v-list-item>
                </div>

                <div>
                    <v-list-item :to="{ name: 'usuarios' }" v-show="permisoUsuario" prepend-icon="mdi-home-city"
                        title="Usuarios" value="Usuarios">
                    </v-list-item>
                </div>
            </v-list>
        </div>


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

//background-color: rgba(43, 49, 61);
//background-image: url("../fondos/backprueba.jpg");
</script>

<style>
.navbar {
    color: white;
    font-size: 1em;
    margin: 0;
    padding: 0px;
    border: 0;
    background-image: url("../fondos/fondo_negro.png");
}

.pa-2 {
    height: 100px;
    width: 100%;
    align-items: center;
    display: flex;

}

.contendor-menu-img {
    width: 200px;
    text-align: center;
    height: 100%;
    align-items: center;
    display: flex;
    justify-content: center;
}

.contendor-menu-img img {
    height: 50px;
}

.navbar-contenedor .v-list,
.navbar-contenedor .v-list-item {
    margin: 10px !important;
    border-radius: 18px;
    width: auto;
    color: black;
}



.navbar-contenedor .v-list-item-title {
    color: black;
    font-weight: bold;
}


.navbar-contenedor .v-list,
.navbar-contenedor .v-list--nav {
    background-color: white !important;
    opacity: 0.8;
    border: 2px solid white;
}

</style>