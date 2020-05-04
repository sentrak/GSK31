import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "about" */ '../views/Home.vue')

  },
  {
    path: '/lobby_jefatura',
    name: 'Lobby_jefatura',
    component: () => import(/* webpackChunkName: "about" */ '../views/lobby_jefatura.vue')
  },
  {
    path: '/Integrantes_plan_de_adelantos',
    name: 'Integrantes_plan_de_adelantos',
    component: () => import(/* webpackChunkName: "about" */ '../views/Integrantes_plan_de_adelantos.vue')
  },
  {
    path: '/Integrantes',
    name: 'Integrantes',
    component: () => import(/* webpackChunkName: "about" */ '../views/Integrantes.vue')
  },
  {
    path: '/jefatura',
    name: 'Jefatura',
    component: () => import(/* webpackChunkName: "about" */ '../views/jefatura.vue')
  },
  {
    path: '/lobby_jefe_de_grupo',
    name: 'Lobby_jefe_de_grupo',
    component: () => import(/* webpackChunkName: "about" */ '../views/lobby_jefe_de_grupo.vue')
  },
  {
    path: '/plan_de_adelantos',
    name: 'Plan_de_adelantos',
    component: () => import(/* webpackChunkName: "about" */ '../views/plan_de_adelantos.vue')
  },
  {
    path: '/unidades',
    name: 'Unidades',
    component: () => import(/* webpackChunkName: "about" */ '../views/unidades.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
