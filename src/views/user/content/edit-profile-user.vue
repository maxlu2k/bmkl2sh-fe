<template>
  <div class="my_infor">
    <div>
      <h5>Hồ Sơ Của Tôi</h5>
    </div>
    <div class="form_infor">
      <form>
        <div class="row">
          <div class="col-2 text-end">
            <label for="myusername">Tên Đăng Nhập</label>
          </div>
          <div class="col-10">
            <p>Admin</p>
          </div>
        </div>
        <div class="row">
          <div class="col-2 text-end">
            <label for="myemail">Email</label>
          </div>
          <div class="col-10">
            <p>alv****uyen@gmail.com.vn <span><a href="">Thay Đổi</a></span></p>
          </div>
        </div>
        <div class="row">
          <div class="col-2 text-end">
            <label for="mydescription">Số Điện Thoại</label>
          </div>
          <div class="col-10">
            <p>03457****62 <span><a href="">Thay Đổi</a></span></p>
          </div>
        </div>
        <div class="row">
          <div class="col-2 text-end">
            <label for="mydescription">Giới Tính</label>
          </div>
          <div class="col-10">
            <input type="radio"><span> Nam</span> <input type="radio"><span> Nữ</span>
          </div>
        </div>
        <div class="row">
          <div class="col-2 text-end">
            <label for="mydescription">Ngày Sinh</label>
          </div>
          <div class="col-10">
            <p>**/11/20** <span><a href="">Thay Đổi</a></span></p>
          </div>
        </div>
        <button class="btn btn-warning">Lưu</button>
      </form>
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
.my_infor {
  margin: 6em auto 10px auto;
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
</style>
