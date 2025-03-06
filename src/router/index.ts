import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AddNotesView from '@/views/add-notes/AddNotesView.vue'
import EditNotes from '@/views/edit-notes/EditNotes.vue'

export enum routesEnum {
  MAIN_PAGE = '/',
  ADD_NOTES_PAGE = '/add-notes',
  EDIT_NOTES_PAGE = '/edit-notes/:id',
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: routesEnum.MAIN_PAGE,
      name: 'home',
      component: HomeView,
    },
    {
      path: routesEnum.ADD_NOTES_PAGE,
      name: 'notes',
      component: AddNotesView,
    },
    {
      path: routesEnum.EDIT_NOTES_PAGE,
      name: 'editNotes',
      component: EditNotes,
    },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue'),
    // },
  ],
})

export default router
