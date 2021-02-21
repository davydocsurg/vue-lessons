import Vue from 'vue'
import VueRouter from 'vue-router'
import MonsterGame from '../views/MonsterGame.vue'
import Quiz from '../views/quiz/Quiz.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'MonsterGame',
    component: MonsterGame
  },
  {
    path: '/quiz',
    name: 'Quiz',
    component: Quiz
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
