<template>
  <div>
    <div class="row">
      <div class="col-3 pt-3 sidebar-container">
        <div class="card profile-card">
          <img :src="user.avartar || '/img/avar/avartar-default.png'" class="card-img-top" alt="User Avatar" />
          <div class="d-flex justify-content-center mt-2">
            <button class="btn btn-sm btn-outline-warning edit-btn">
              <i class="bi bi-pen me-2"></i>Edit Image
            </button>
          </div>
          <ul class="nav flex-column mb-auto menu-list">
            <li class="mb-2">
              <button class="btn btn-toggle align-items-center text-dark w-100 text-start" data-bs-toggle="collapse"
                data-bs-target="#this-notifications" aria-expanded="false">
                <i class="bi bi-bell-fill me-2" style="color: orangered;"></i>Thông Báo
              </button>
              <div class="collapse" id="this-notifications">
                <ul class="btn-toggle-nav list-unstyled ps-4">
                  <li>
                    <router-link to="/admin/profile/editProfile" class="text-decoration-none dropdown-item">
                      Cập Nhật Đơn Hàng
                    </router-link>
                  </li>
                  <li>
                    <router-link to="/admin/profile/editProfile" class="text-decoration-none dropdown-item">
                      Khuyến Mãi
                    </router-link>
                  </li>
                </ul>
              </div>
            </li>
            <li class="mb-2">
              <button class="btn btn-toggle align-items-center text-dark w-100 text-start" data-bs-toggle="collapse"
                data-bs-target="#this-user" aria-expanded="false">
                <i class="bi bi-person-circle me-2" style="color: orangered;"></i> Tài Khoản Của Tôi
              </button>
              <div class="collapse" id="this-user">
                <ul class="btn-toggle-nav list-unstyled ps-4">
                  <li>
                    <router-link to="/admin/profile/editProfile" class="text-decoration-none dropdown-item">
                      Hồ Sơ
                    </router-link>
                  </li>
                  <li>
                    <router-link to="/admin/profile/editProfile" class="text-decoration-none dropdown-item">
                      Ngân Hàng
                    </router-link>
                  </li>
                  <li>
                    <router-link to="/admin/profile/editProfile" class="text-decoration-none dropdown-item">
                      Địa Chỉ
                    </router-link>
                  </li>
                  <li>
                    <router-link to="/admin/profile/editProfile" class="text-decoration-none dropdown-item">
                      Đổi Mật Khẩu
                    </router-link>
                  </li>
                  <li>
                    <router-link to="/admin/profile/editProfile" class="text-decoration-none dropdown-item">
                      Cài Đặt Thông Báo
                    </router-link>
                  </li>
                  <li>
                    <router-link to="/admin/profile/editProfile" class="text-decoration-none dropdown-item">
                      Thiết Lập Khác
                    </router-link>
                  </li>
                </ul>
              </div>
            </li>
            <li>
              <button class="btn btn-toggle align-items-center text-dark w-100 text-start" data-bs-toggle="collapse"
                data-bs-target="#this-bill" aria-expanded="false">
                <i class="bi bi-receipt me-2" style="color: orangered;"></i> Đơn Mua
              </button>
              <div class="collapse" id="this-bill">
                <ul class="btn-toggle-nav list-unstyled ps-4">
                  <li>
                    <router-link to="/admin/profile/editProfile" class="text-decoration-none dropdown-item">
                      Tất Cả
                    </router-link>
                  </li>
                  <li>
                    <router-link to="/admin/profile/editProfile" class="text-decoration-none dropdown-item">
                      Chờ Thanh Toán
                    </router-link>
                  </li>
                  <li>
                    <router-link to="/admin/profile/editProfile" class="text-decoration-none dropdown-item">
                      Vận Chuyển
                    </router-link>
                  </li>
                  <li>
                    <router-link to="/admin/profile/editProfile" class="text-decoration-none dropdown-item">
                      Chờ Giao Hàng
                    </router-link>
                  </li>
                  <li>
                    <router-link to="/admin/profile/editProfile" class="text-decoration-none dropdown-item">
                      Hoàn Thành
                    </router-link>
                  </li>
                  <li>
                    <router-link to="/admin/profile/editProfile" class="text-decoration-none dropdown-item">
                      Đã Huỷ
                    </router-link>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="col-9" style="border: 1px solid black;">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import Axios from "../../../utils/axios";
import Cookies from "js-cookie";

const user = ref({
  username: "",
  roles: [],
  description: "",
});

async function fetchUserData() {
  const token = Cookies.get("accessToken");
  try {
    const response = await Axios.get("/api/users/myInfo", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    user.value = response.data.result;
  } catch (error) {
    console.error(error);
  }
}

onMounted(() => {
  fetchUserData();
});
</script>

<style scoped>
.sidebar-container {
  /* background-color: chocolate; */
  height: 100vh;
  overflow-y: auto;
}

.profile-card {
  margin: 0 auto;
  max-width: 18rem;
  border: 0;
}

.card-img-top {
  border-radius: 50%;
  margin-bottom: 15px;
  width: 150px;
  height: 150px;
  object-fit: cover;
  margin: 10px auto;
}

.edit-btn {
  width: 60%;
  font-size: 0.8rem;
  padding: 5px 10px;
}

.menu-list {
  margin-top: 20px;
}

.list-unstyled li a {
  margin: 3px auto 3px auto;
}

.list-unstyled li:hover {
  color: orangered;
}

.btn-toggle-nav a:hover {
  color: orangered;
}

.btn-outline-warning {
  color: orangered;
  border: 1px solid orangered;
}

.btn-outline-warning:hover {
  background-color: orangered;
  color: white;
}
</style>
