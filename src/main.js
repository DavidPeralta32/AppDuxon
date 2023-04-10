import Vue3EasyDataTable from '../node_modules/vue3-easy-data-table/dist/vue3-easy-data-table.es';
import 'vue3-easy-data-table/dist/style.css';
// Components
import inicio from './App.vue'

// Composables
import { createApp } from 'vue'

// Plugins
import { registerPlugins } from '@/plugins'

//notificaciones
import Notifications from '@kyvg/vue3-notification'
 

//routes
import empleados from './views/RH/Empleados.vue'
import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
import login from './views/auth/login.vue'
import dashboard from './views/general/dashboard.vue'
import asistenciaVac from './views/RH/AsistenciaVacaciones.vue'
import requisicionPersonal from './views/RH/requisicionPersonal.vue'
import permisosPersonal from './views/RH/PermisosPersonal.vue'
import expediente from './views/expediente.vue'
import usuarios from './views/usuarios/usuarios.vue'
import modulos from './views/usuarios/permisosModulos.vue'
import servicios from './views/servicios/servicios.vue'
import registroPatronal from './views/contabilidad/registroPatronal.vue'

const routes = [
    { 
    path:'/',
    redirect:'/login',
    },
    {   
        name: 'login',
        path:'/login',
        component: login
    },
    {
       
        path: '/Capital_Humano',
        name: 'Capital Humano',
        component: empleados
    },
    {
        name: 'dashboard',
        path:'/dashboard',
        component: dashboard
    },
    {
        name: 'asistencia',
        path:'/asistencia',
        component: asistenciaVac
    },
    {
        name: 'requisicion',
        path:'/requisicion',
        component: requisicionPersonal
    },
    {
        name: 'permisos',
        path:'/permisos',
        component: permisosPersonal
    },
    {
        path:'/expediente/:id?',
        component: expediente
    },
    {
        name:'usuarios',
        path:'/usuarios',
        component: usuarios
    }
    ,
    {
        name:'permisosModulos',
        path:'/permisosModulos/:id?',
        component: modulos
    }
    ,
    {
        name:'servicios',
        path:'/servicios',
        component: servicios
    },
    {
       
        path: '/Contabilidad',
        name: 'Contabilidad',
        component: registroPatronal
    }
]
const router=createRouter(
    {
        history: createWebHashHistory(process.env.BASE_URL),
        routes: routes,
        linkActiveClass:'active'
    }
);


const app = createApp(inicio)
app.component('EasyDataTable', Vue3EasyDataTable);
app.config.globalProperties.$myGlobalVariable = "globalVariable"; //Para declarar una variable global
//app.config.globalProperties.$idEmpleadoGlobal; 

//app.use(BootstrapVue)
app.use(router)
app.use(Notifications) 
//app.use(BootstrapVue)
registerPlugins(app)

app.mount('#app')
/*import "bootstrap/dist/js/bootstrap.js"
*/

export default router;