<template>
  <div class="footer">
    <div class="container">
      <div class="col col-4">
        <h1>Thông tin liên hệ</h1>
        <ul>
          <li>Dụng cụ cơ khí</li>
          <li>Địa chỉ: 123 Phố Nhổn Hà Nội</li>
          <li>Điện thoại: 09472727345</li>
          <li>Email: MaxLus@gmail.com</li>
        </ul>
      </div>
      <div class="col col-4">
        <h1>Giới thiệu công ty</h1>
        <ul>
          <li>Điện Máy Bình Minh</li>
          <li>Chính sách nhận hàng</li>
          <li>Chính sách mua hàng</li>
          <li>Hướng dẫn mua hàng</li>
          <li>Hướng dẫn thanh toán</li>
        </ul>
      </div>
      <div class="col col-4 social">
        <h1>Facebook</h1>
        <iframe
          src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fnguyendinhmanhdung&tabs=timeline&width=400&height=200&small_header=true&adapt_container_width=true&hide_cover=true&show_facepile=false&appId=336285204533915"
          width="400" height="200" style="border:none;overflow:hidden" scrolling="no" frameborder="0"
          allowfullscreen="true"
          allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"></iframe>
      </div>
      <div class="clearfix"></div>
    </div>
  </div>
</template>
<style scoped>
.footer {
  width: 100%;
  position: relative;
  height: auto;
  background-color: orangered;
  display: flex;
  flex-direction: column;
}

.footer .col {
  height: auto;
  float: left;
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  padding: 0px 20px 20px 20px;
}

.footer .col h1 {
  margin: 0;
  padding: 0;
  font-family: inherit;
  font-size: 15px;
  line-height: 17px;
  padding: 20px 0px 5px 0px;
  color: white;
  font-weight: normal;
  text-transform: uppercase;
  letter-spacing: 0.25em;
}

.footer .col ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
}

.footer .col ul li {
  color: #999999;
  font-size: 14px;
  font-family: inherit;
  font-weight: bold;
  padding: 5px 0px 5px 0px;
  cursor: pointer;
  transition: 0.2s;
  -webkit-transition: 0.2s;
  -moz-transition: 0.2s;
}

.social ul li {
  display: inline-block;
  padding-right: 5px !important;
}

.footer .col ul li:hover {
  color: #ffffff;
  transition: 0.1s;
  -webkit-transition: 0.1s;
  -moz-transition: 0.1s;
}

.clearfix {
  clear: both;
}

@media only screen and (min-width: 1280px) {
  .contain {
    width: 1200px;
    margin: 0 auto;
  }
}

@media only screen and (max-width: 1139px) {
  .contain .social {
    width: 1000px;
    display: block;
  }

  .social h1 {
    margin: 0px;
  }
}

@media only screen and (max-width: 950px) {
  .footer .col {
    width: 33%;
  }

  .footer .col h1 {
    font-size: 14px;
  }

  .footer .col ul li {
    font-size: 13px;
  }
}

@media only screen and (max-width: 500px) {
  .footer .col {
    width: 50%;
  }

  .footer .col h1 {
    font-size: 14px;
  }

  .footer .col ul li {
    font-size: 13px;
  }
}

@media only screen and (max-width: 340px) {
  .footer .col {
    width: 100%;
  }
}
</style>
