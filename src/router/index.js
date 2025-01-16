import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import viewLogin from '@/views/auth/view-login.vue'
import viewRegister from '@/views/auth/view-register.vue'
import viewAdminDashboard from '@/views/admin/view-admin-dashboard.vue'
import viewAdminStatistical from '@/views/admin/content/view-admin-statistical.vue'
import viewAdminAllUser from '@/views/admin/content/view-admin-alluser.vue'
import viewAdminAllBills from '@/views/admin/content/view-admin-bills.vue'
import viewAdminAuthorize from '@/views/admin/content/view-admin-authorize.vue'
import viewEditProfile from '@/views/user/content/edit-profile-user.vue'
import viewProfile from '@/views/user/layout/slidebar-user-profile.vue'
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
          path: 'statics',
          name: 'viewStatics',
          component: viewAdminStatistical,
          meta: { title: 'Báo Cáo & Thồng kê', requiresAuth: true, role: 'ADMIN' },
        },
        {
          path: 'allusers',
          name: 'viewAllUser',
          component: viewAdminAllUser,
          meta: { title: 'Quản Lý Người Dùng', requiresAuth: true, role: 'ADMIN' },
        },
        {
          path: 'authorize',
          name: 'viewAuthorizeManage',
          component: viewAdminAuthorize,
          meta: { title: 'Quản Lý Phân Quyền', requiresAuth: true, role: 'ADMIN' },
        },
        {
          path: 'allBills',
          name: 'viewAllBills',
          component: viewAdminAllBills,
          meta: { title: 'Quản Lý Hoá Đơn', requiresAuth: true, role: 'ADMIN' },
        },
        {
          path: 'profile',
          name: 'viewProfile',
          component: viewProfile,
          meta: { title: 'Thông Tin Cá Nhân', requiresAuth: true, role: 'ADMIN' },
          children: [
            {
              path: 'editProfile',
              name: 'viewEditProfile',
              component: viewEditProfile,
            },
          ],
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
      component: viewProfile,
      meta: { title: 'User profile', requiresAuth: true },
    },

    {
      path: '/user-profile',
      name: 'viewUserProfile',
      component: viewProfile,
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
