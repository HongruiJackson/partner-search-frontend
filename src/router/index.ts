import { createRouter, createWebHistory } from 'vue-router'
import HomeView from "@/views/HomeView.vue";
import TeamView from "@/views/TeamView.vue";
import UserView from "@/views/UserView.vue";
import SearchView from "@/views/SearchView.vue";
import UserEditView from "@/views/UserEditView.vue";
import SearchResultView from "@/views/SearchResultView.vue";
import UserLoginView from "@/views/UserLoginView.vue";
import {useUserStore} from "@/stores/user";
import MainPageView from "@/views/MainPageView.vue";
import UserRegisterView from "@/views/UserRegisterView.vue";



const mainPageChildren = [
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
  },
  {
    path: '/user/list',
    name: 'searchResult',
    component: SearchResultView
  },
]

const rootChildren = [
  {
    path: '/login',
    name: 'login',
    component: UserLoginView
  },
  {
    path: '/register',
    name: 'register',
    component: UserRegisterView
  },
  {
    path: '/main',
    name: 'main',
    component: MainPageView,
    redirect: '/user',
    children: mainPageChildren
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'root',
      redirect: '/main',
      children: rootChildren
    },


  ]
})

router.beforeEach((to) => {
  const userStore = useUserStore()
  // console.log(!userStore.user)
  if (!userStore.user && (to.path !== '/login' && to.path !== '/register')) {
    return { name: 'login' };
  }
})

export default router
