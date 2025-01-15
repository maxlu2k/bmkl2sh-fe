import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import viewLogin from '../views/auth/view_login.vue'
import viewRegister from '../views/auth/view_register.vue'
import viewAdminDashboard from '../views/admin/view_admin_dashboard.vue'
import viewAdminAllUser from '../views/admin/view_admin_alluser.vue'
import viewUserProfile from '../views/user/view_user_profile.vue'
import Cookies from 'js-cookie'
import { jwtDecode } from 'jwt-decode'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'shopbm',
      component: HomeView,
      meta: { title: 'Bình Minh' },
    },
    {
      path: '/login',
      name: 'login',
      component: viewLogin,
      meta: { title: 'Đăng Nhập' },
    },
    {
      path: '/register',
      name: 'register',
      component: viewRegister,
      meta: { title: 'Đăng Ký' },
    },
    {
      path: '/admin',
      name: 'viewAdmin',
      component: viewAdminDashboard,
      meta: { title: 'ADMIN', requiresAuth: true, role: 'ADMIN' },
      children: [
        {
          path: 'alluser',
          name: 'viewAllUser',
          component: viewAdminAllUser,
          meta: { title: 'Quản lý user', requiresAuth: true, role: 'ADMIN' },
        },
      ],
    },
    // {
    //   path: '/admin/alluser',
    //   name: 'viewAllUser',
    //   component: viewAdminAllUser,
    //   meta: { title: 'Quản lý user', requiresAuth: true, role: 'ADMIN' },
    // },

    {
      path: '/user',
      name: 'viewUserProfile',
      component: viewUserProfile,
      meta: { title: 'User profile', requiresAuth: true },
    },

    {
      path: '/user-profile',
      name: 'viewUserProfile',
      component: viewUserProfile,
      meta: { title: 'User', requiresAuth: true },
    },
  ],
})

// Middleware kiểm tra quyền
router.beforeEach(async (to, from, next) => {
  document.title = to.meta.title || 'Bình Minh'
  const token = Cookies.get('accessToken')

  if (to.meta.requiresAuth) {
    if (!token) {
      next({ name: 'login' })
    } else {
      const decoded = jwtDecode(token)
      const roles = decoded.scope || []
      if (to.meta.role && !roles.includes(to.meta.role)) {
        next({ name: 'shopbm' })
      } else {
        next()
      }
    }
  } else {
    next()
  }
})

export default router
