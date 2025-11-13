import {createRouter, createWebHistory} from 'vue-router'

import AuthorizationView from '@/views/AuthorizationView.vue'

import addShift from "@/components/AddShift.vue";
import EmployeesView from "@/views/EmployeesView.vue";
import ShiftsView from "@/views/ShiftsView.vue";
import OrdersView from "@/views/OrdersView.vue";
import authorizationView from "@/views/AuthorizationView.vue";
import HomeView from "@/views/HomeView.vue";
import ShiftDetailed from "@/components/ShiftDetailed.vue";

const routes = [
    {
        path: '/',
        name: 'authorization',
        component: HomeView, //authorizationView
    },
    {
      path: '/home',
      name: 'home',
      component: HomeView
    },
    {
        path: '/employees',
        name: 'employees',
        component: EmployeesView
    },
    {
        path: '/shifts',
        name: 'shifts',
        component: ShiftsView
    },
    {
        path: '/orders',
        name: 'orders',
        component: OrdersView
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router


