import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Главная страница',
    component: () => import('../views/Home')
  },
  {
    path: '/task-create',
    name: 'Создание задачи',
    component: () => import('../views/TaskCreate')
  },
  {
    path: '/tasks-list',
    name: 'Список задач',
    component: () => import('../views/TasksList')
  },
  {
    path: '/task-page/:id',
    name: 'Задача',
    component: () => import('../views/TaskPage')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
