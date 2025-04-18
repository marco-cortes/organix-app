import { createRouter, createWebHistory } from 'vue-router';

import locales from '../plugins/locales';

import Dashboard from '../modules/dashboard/Dashboard.vue';
import Employees from '../modules/employees/Employees.vue';
import Projects from '../modules/projects/Projects.vue';

const t = locales.global.t;
const base = '/';
const build = (text: string) => `${base}${text.toLowerCase()}`; 

export const routes = [
    {
        path: base,
        name: `${t('routes_dashboard')}`,
        component: Dashboard
    },
    {
        path: build(t('routes_employees')),
        name: `${t('routes_employees')}`,
        component: Employees
    },
    {
        path: build(t('routes_attendance')),
        name: `${t('routes_attendance')}`,
        component: Projects
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
  })
  
  export default router;