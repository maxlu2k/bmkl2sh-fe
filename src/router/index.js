import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import viewLogin from '../views/auth/view_login.vue'
import viewAdminDashboard from '../views/admin/view_admin_dashboard.vue'
import viewAdminAllUser from '../views/admin/view_admin_alluser.vue'
import viewUserProfile from '../views/user/view_user_profile.vue'
// import { jwtDecode } from 'jwt-decode'
import Cookies from 'js-cookie'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/login',
      name: 'login',
      component: viewLogin,
      meta: { title: 'Login' },
    },
    {
      path: '/admin',
      name: 'viewAdmin',
      component: viewAdminDashboard,
      meta: { title: 'ADMIN', requiresAuth: true, role: 'ADMIN' },
    },
    {
      path: '/admin/alluser',
      name: 'viewAllUser',
      component: viewAdminAllUser,
      meta: { title: 'Quản lý user', requiresAuth: true, role: 'ADMIN' },
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
      next({ name: 'login', query: { redirect: to.fullPath } })
    } else {
      const userRole = Cookies.get('role')
      if (to.meta.role && to.meta.role !== userRole) {
        next({ name: 'viewUserProfile' }) // Nếu không có quyền, chuyển về trang user profile
      } else {
        next() // Nếu đủ quyền, tiếp tục
      }
    }
  } else {
    next() // Nếu route không yêu cầu xác thực, tiếp tục
  }
})

export default router
