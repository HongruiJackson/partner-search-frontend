import { createRouter, createWebHistory } from 'vue-router'
import HomeView from "@/views/HomeView.vue";
import TeamView from "@/views/TeamView.vue";
import UserView from "@/views/UserView.vue";
import SearchView from "@/views/SearchView.vue";
import UserEditView from "@/views/UserEditView.vue";

const rootChildren = [
  {
    path: '/home',
    name: 'home',
    component: HomeView
  },
  {
    path: '/team',
    name: 'team',
    component: TeamView
  },
  {
    path: '/user',
    name: 'user',
    component: UserView
  },
  {
    path: '/search',
    name: 'search',
    component: SearchView
  },
  {
    path: '/user/edit',
    name: 'edit',
    component: UserEditView
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'root',
      redirect: '/home',
      children: rootChildren
    },

  ]
})



export default router
