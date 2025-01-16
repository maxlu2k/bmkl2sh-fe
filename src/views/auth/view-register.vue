<template>
  <div class="login align-items-center">
    <h1>Register</h1>
    <hr>
    <form @submit.prevent="handleRegister">
      <label for="username" class="form-label">Your name</label>
      <div class="input-group mb-3">
        <input type="text" v-model="firstName" aria-label="First name" placeholder="first name" class="form-control">
        <input type="text" v-model="lastName" aria-label="Last name" placeholder="last name" class="form-control">
      </div>
      <div class="mb-3">
        <label for="username" class="form-label">Username</label>
        <input v-model="username" type="text" class="form-control" id="username" placeholder="username"
          aria-describedby="emailHelp">
      </div>
      <div class="mb-3">
        <label for="email" class="form-label">Email address</label>
        <input v-model="email" type="text" class="form-control" id="email" placeholder="your email"
          aria-describedby="emailHelp">
      </div>
      <div class="mb-3">
        <label for="phone" class="form-label">Phone number</label>
        <input v-model="phoneNumber" type="number" class="form-control" id="phone" placeholder="your phone number"
          aria-describedby="emailHelp">
      </div>
      <div class="mb-3">
        <label for="password" class="form-label">Password</label>
        <input class="form-control" :type="showPassword ? 'text' : 'password'" v-model="password" name="pwd"
          placeholder="your password">
      </div>
      <div class="mb-3">
        <label for="password" class="form-label">Re-Password</label>
        <input class="form-control" :type="showPassword ? 'text' : 'password'" v-model="password2" name="pwd"
          placeholder="re-enter password">
      </div>
      <div class="mb-3 form-check">
        <div class="row">
          <div class="col-8">
            <input type="checkbox" name="showpw" class="form-check-input showpw" id="showPass" v-model="showPassword">
            <label class="form-check-label" for="showPass">Check me out</label>
          </div>
          <div class="col-4">
            <a href="/login" class="text-end">Login?</a>
          </div>
        </div>
      </div>
      <button class="btn btn-success btnlogin" type="submit">Submit</button>
      <!-- <p v-if="errorMessage" class="error">{{ errorMessage }}</p> -->

    </form>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import Axios from '../../utils/axios'
// import Cookies from 'js-cookie'
import { useRouter } from 'vue-router'
const showPassword = ref(false)
const firstName = ref("")
const lastName = ref("")
const username = ref("")
const email = ref("")
const phoneNumber = ref("")
const password = ref("")
const password2 = ref("")
const router = useRouter()
//xử lý submit đăng ký
const handleRegister = async () => {
  try {
    const response = await Axios.post("/auth/register", {
      firstName: firstName.value,
      lastName: lastName.value,
      username: username.value,
      email: email.value,
      phoneNumber: phoneNumber.value,
      password: password.value,
    })
    const data = response.data;
    console.log(data);
    router.push("/login")
  } catch (error) {
    console.log(error);
  }

}

</script>
<style>
.login h1 {
  text-align: center;
}

.login {
  color: aliceblue;
  background-color: rgb(33, 37, 41);
  width: 350px;
  padding: 24px;
  border-radius: 20px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  margin: 5% auto 5% auto;
}

.error {
  color: red;
}
</style>
