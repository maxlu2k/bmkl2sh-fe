<template>
  <div class="my_infor">
    <div class="ms-3 mt-4">
      <h5>Hồ Sơ Của Tôi</h5>
      <p>Quản lý thông tin hồ sơ cá nhân</p>
    </div>
    <div class="row">
      <div class="col-9 form_infor">
        <form @submit.prevent="updateUser">
          <div class="row">
            <div class="col-4 text-end">
              <label for="myusername">Tên Đăng Nhập</label>
            </div>
            <div class="col-8">
              <p>{{ user.username }}</p>
            </div>
          </div>
          <div class="row">
            <div class="col-4 text-end">
              <label for="myname">Tên</label>
            </div>
            <div class="col-8">
              <p class="input-group">
                <input type="text" class="form-control" placeholder="first name" v-model="user.firstName">
                <input type="text" class="form-control" placeholder="last name" v-model="user.lastName">
              </p>
            </div>
          </div>
          <div class="row">
            <div class="col-4 text-end">
              <label for="myemail">Email</label>
            </div>
            <div class="col-8">
              <p><input type="text" class="form-control" v-model="user.email"></p>
            </div>
          </div>
          <div class="row">
            <div class="col-4 text-end">
              <label for="mydescription">Số Điện Thoại</label>
            </div>
            <div class="col-8">
              <p><input type="text" class="form-control" v-model="user.phoneNumber"></p>
            </div>
          </div>
          <div class="row">
            <div class="col-4 text-end">
              <label for="mydescription">Giới Tính</label>
            </div>
            <div class="col-8">
              <p><input type="radio" v-model="user.gender" :value="true"><span> Nam</span>
                <input type="radio" v-model="user.gender" :value="false"><span> Nữ</span>
              </p>
            </div>
          </div>
          <div class="row">
            <div class="col-4 text-end">
              <label for="mydescription">Ngày Sinh</label>
            </div>
            <div class="col-8">
              <!-- <p>{{ user.dateOfBirth || "null" }} <span><a href="">Thay Đổi</a></span></p> -->
              <p>
                <input type="text" class="form-control" v-model="user.dateOfBirth" @input="validateDate"
                  placeholder="dd/MM/yyyy" />
              </p>
            </div>
          </div>
          <div class="row">
            <div class="col-5 text-end">
              <button class="btn btn-warning">Lưu</button>
            </div>
            <AlertMessage v-if="alertMessage" :message="alertMessage" :type="alertType" :duration="3000" />
          </div>
        </form>
      </div>
      <div class="col-3 mt-5 d-flex flex-column align-items-center">
        <img src="/img/avar/avartar-default.png" class="change-img" alt="">
        <div class="d-flex justify-content-center mt-2">
          <button class="btn btn-sm btn-outline-warning edit-btn">
            <i class="bi bi-pen me-2"></i>Edit Image
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import Axios from "@/utils/axios";
import Cookies from "js-cookie";
import AlertMessage from "@/components/AlertMessage.vue";
import { format } from "date-fns";
const alertMessage = ref("");
const alertType = ref("success"); // success, danger, warning, info
const user = ref({
  username: "",
  roles: [],
  description: "",
});
const token = Cookies.get("accessToken");
async function fetchUserData() {
  try {
    const response = await Axios.get("/api/users/myInfo", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const result = response.data.result;
    // Format ngày từ server
    if (result.dateOfBirth) {
      result.dateOfBirth = format(new Date(result.dateOfBirth), "dd/MM/yyyy");
    }
    user.value = result;
  } catch (error) {
    console.error(error);
  }
}

async function updateUser() {
  try {
    const updatedUser = { ...user.value };

    // Chuyển đổi dateOfBirth từ dd/MM/yyyy sang yyyy-MM-dd
    if (updatedUser.dateOfBirth) {
      const [day, month, year] = updatedUser.dateOfBirth.split("/");
      updatedUser.dateOfBirth = `${year}-${month}-${day}`;
    }

    // eslint-disable-next-line no-unused-vars
    const response = await Axios.put(`/api/users/update/${user.value.id}`, updatedUser, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    alertMessage.value = "";
    setTimeout(() => {
      alertMessage.value = "Cập nhật người dùng thành công!";
      alertType.value = "success";
    }, 0);
  } catch (error) {
    console.error("Cập nhật thất bại:", error);
    alertMessage.value = "";
    setTimeout(() => {
      alertMessage.value = `Đã xảy ra lỗi khi cập nhật! \n ${error.response.data}`;
      alertType.value = "danger";
    }, 0);
  }
}

function validateDate(event) {
  const input = event.target.value;

  // Kiểm tra định dạng: dd/MM/yyyy
  const regex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
  if (!regex.test(input)) {
    alertMessage.value = "";
    setTimeout(() => {
      alertMessage.value = "Ngày không hợp lệ. Vui lòng nhập theo định dạng dd/MM/yyyy.";
      alertType.value = "danger";
    }, 0)
  } else {
    alertMessage.value = "";
  }
}

onMounted(() => {
  fetchUserData();
});
</script>
<!-- margin: 6em auto 10px auto; -->
<style scoped>
.my_infor {
  height: 100%;
  padding-bottom: 30px;
  padding-top: 1px;
  background-color: white;
  border-radius: 10px;
}

.form_infor {
  margin-top: 8em;
}

.col {
  margin-top: 6px;
}

.form_infor p {
  margin: 4px auto 4px auto;
  padding: 0;
}

.btn-warning {
  color: white;
  background-color: orangered;
  border: 1px solid orangered;
  margin: 10px auto auto 10%;
}

.btn-warning:hover {
  color: orangered;
  background-color: white;
}

.change-img {
  margin-top: 5em;
  max-width: 7em;
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
