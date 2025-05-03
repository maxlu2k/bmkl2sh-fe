<template>
  <div class="container homeview">
    <div class="row">
      <!-- Sidebar -->
      <aside class="col-2 sidebar">
        <div class="accordion" id="sidebarMenu">
          <!-- Chủ đề 1 -->
          <div v-for="(product, index) in products" :key="index" class="accordion-item">
            <h2 class="accordion-header" :id="'heading' + index">
              <button
                class="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                :data-bs-target="'#collapse' + index"
                :aria-expanded="false"
                :aria-controls="'collapse' + index"
              >
                {{ product.name }}
              </button>
            </h2>
            <div
              :id="'collapse' + index"
              class="accordion-collapse collapse"
              :aria-labelledby="'heading' + index"
              data-bs-parent="#sidebarMenu"
            >
              <div class="accordion-body p-2">
                <ul class="list-unstyled">
                  <li>
                    <a href="#" class="text-decoration-none">{{ product.price }}</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <!-- Chủ đề 2 -->
          <!-- <div class="accordion-item">
            <h2 class="accordion-header" id="headingTwo">
              <button
                class="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseTwo"
              >
                Chủ đề 2
              </button>
            </h2>
            <div id="collapseTwo" class="accordion-collapse collapse" data-bs-parent="#sidebarMenu">
              <div class="accordion-body p-2">
                <ul class="list-unstyled">
                  <li><a href="#" class="text-decoration-none">Mục con A</a></li>
                  <li><a href="#" class="text-decoration-none">Mục con B</a></li>
                </ul>
              </div>
            </div>
          </div> -->
        </div>
        <div class="card contactHeader mt-3">
          <a href="#" class="btn"><i class="bi bi-telephone"></i> 0123456789</a>
          <a href="#" class="btn"><i class="bi bi-facebook"></i> Facebook</a>
          <a href="#" class="btn"><i class="bi bi-youtube"></i> Youtube</a>
        </div>
        <img src="/img/orangeimg.gif" class="rounded img-fluid imgHeader mt-2" alt="..." />
      </aside>

      <!-- Main Content -->
      <div class="col-10 main-content">
        <!-- Banner -->
        <div class="banner-container">
          <img src="/img/casino.jpg" alt="" class="bannercasino" />
          <a href="/login" class="btn btn-success buynow">PLAY NOW &#10155;</a>
        </div>

        <hr />

        <!-- Danh sách sản phẩm -->
        <div><a href="">Sản phẩm</a> \ <a href="">laptop</a></div>
        <div class="product-grid">
          <div v-for="(product, index) in products" :key="index" class="product-card-container">
            <div class="card product-card">
              <img :src="product.image" class="card-img-top" alt="Sản phẩm" />
              <div class="card-body text-center">
                <h6 class="card-title">{{ product.name }}</h6>
                <p class="card-text">{{ product.price }} VND</p>
                <a href="#" class="btn btn-primary btn-sm">Mua ngay</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const products = ref(
  Array.from({ length: 25 }, (_, i) => ({
    name: `Sản phẩm ${i + 1}`,
    price: `${(i + 1) * 50}.000`,
    image: `/img/product${(i % 5) + 1}.jpg`,
  })),
)
</script>

<style scoped>
/* Định dạng tổng quát */
.homeview {
  margin-top: 15px;
}

/* Căn chỉnh sidebar và main content */
.row {
  display: flex;
  align-items: stretch;
}

/* Sidebar */
.sidebar {
  background-color: orangered;
  margin: 0px;
  padding: 0px;
  min-height: 100vh;
}
/* main_menu */
.main_menu {
  padding: 0px;
  margin: 0px;
}

/* Banner */
.banner-container {
  position: relative;
  width: 100%;
  height: 500px;
}

.bannercasino {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.buynow {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: none;
  cursor: pointer;
  color: white;
  background: orange;
  animation: changeColor 0.5s infinite alternate-reverse;
}

/* Danh sách sản phẩm dạng grid */
.product-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 20px;
  margin-top: 20px;
  margin-bottom: 20px;
}

.product-card-container {
  display: flex;
  justify-content: center;
}

.product-card {
  width: 100%;
  max-width: 180px;
  border: 1px solid #ddd;
  border-radius: 8px;
}

.product-card img {
  height: 150px;
  object-fit: cover;
}

.product-card .card-body {
  padding: 10px;
}

.contactHeader {
  border-style: solid;
  border-color: orangered;
}
</style>
