<template>
  <div class="homeview">
    <div>
      <div class="row">
        <div class="col col-2" style="background-color: orangered">
          <div class="menusub">
            <ul class="menu">
              <li><a href="#"><i class="bi bi-cpu"></i> CẢM BIẾN </a>
                <div class="megadrop">
                  <div class="col">
                    <h3>Cảm biến</h3>
                    <ul>
                      <li><a href="#">Sub-menu 1</a>
                      </li>
                      <li><a href="#">Sub-menu 2</a>
                      </li>
                      <li><a href="#">Sub-menu 3</a>
                      </li>
                    </ul>
                  </div>
                  <div class="col">
                    <h3>Title</h3>
                    <ul>
                      <li><a href="#">Sub-menu 1</a>
                      </li>
                      <li><a href="#">Sub-menu 2</a>
                      </li>
                      <li><a href="#">Sub-menu 3</a>
                      </li>
                    </ul>
                  </div>
                  <div class="col">
                    <h3>Title</h3>
                    <ul>
                      <li><a href="#">Sub-menu 1</a>
                      </li>
                      <li><a href="#">Sub-menu 2</a>
                      </li>
                      <li><a href="#">Sub-menu 3</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </li>
              <li> <a href="#"><i class="bi bi-tools"></i> DỤNG CỤ, LINH KIỆN CƠ KHÍ</a>
                <div class="megadrop">
                </div>
              </li>
              <li> <a href="#"><i class="bi bi-boxes"></i> NÁY CẦM TAY</a>
                <div class="megadrop">
                </div>
              </li>
              <li> <a href="#"><i class="bi bi-lightbulb"></i> MÁY PIN</a>
                <div class="megadrop">
                </div>
              </li>
              <li> <a href="#"><i class="bi bi-egg-fried"></i> LINH KIỆN</a>
                <div class="megadrop">
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div class="col col-7">
          <img src="/img/casino.jpg" alt="" class="bannercasino">
          <a href="/login" class="btn btn-success buynow">PLAY NOW &#10155;</a>
        </div>
        <div class="col col-2">
          <div class="card contactHeader">
            <a href="#" class="btn"><i class="bi bi-telephone"></i> 0123456789</a>
            <a href="#" class="btn"><i class="bi bi-facebook"></i> Facebook</a>
            <a href="#" class="btn"><i class="bi bi-youtube"></i> Youtube</a>
          </div>
          <img src="/img/orangeimg.gif" class="rounded img-fluid imgHeader" alt="...">
        </div>
      </div>
      <div>

      </div>
    </div>
  </div>
</template>
<script setup>
</script>
<style scoped>
.homeview {
  margin-top: 15px;
}

.bannercasino {
  height: auto;
  width: 750px;
  position: absolute;
  margin-left: 9px;

}

.contactHeader {
  border-style: solid;
  border-color: orangered;
}

.imgHeader {
  margin-top: 5px;
}

.buynow {
  position: absolute;
  margin: 14rem 0 0 5rem;
  border: none;
  cursor: pointer;
  color: white;
  background: orange;
  animation: changeColor 0.5s infinite alternate-reverse;
}

.menu {
  font-family: Verdana, Geneva, sans-serif;
  font-weight: 400;
  font-size: 11px;
  line-height: 15px;
  position: relative;
  padding: 0 0 0 4px;
  margin: 0;
  background-color: orangered;
}

.menu a,
.menu a:link,
.menu a:visited,
.menu a:focus,
span {
  color: #fff;
  text-decoration: none;
}

.menu a:hover {
  color: orange;
  text-decoration: none;
}

.menu>li {
  display: block;
  margin-left: -4px;
  border-left: 1px solid rgba(255, 255, 255, 0.11);
  box-shadow: -1px 0 0 rgba(0, 0, 0, 0.1);
}

.menu>li>a {
  padding: 5px 18px;
  display: block;
}

.menu>li:hover>a {
  color: orange;
}

.menu>li:hover {
  background-color: #fff;
}

/* Megadrop width dropdown */
.menu>li>.megadrop {
  opacity: 0;
  visibility: hidden;
  position: absolute;
  list-style: none;
  top: 0px;
  left: 220px;
  width: 760px;
  min-height: 100%;
  text-align: left;
  margin-top: 30px;
  padding: 0;
  z-index: 99;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  overflow: hidden;
  border-top: 2px solid orange;
  border-right: 2px solid orange;
  border-bottom: 2px solid orange;
  background-color: #eee;
}

.menu>li:hover .megadrop {
  opacity: 1;
  visibility: visible;
  margin-top: 0px;
}

.menu ul li:hover:after {
  color: #227087;
}

.menu .col {
  width: 14.1%;
  float: left;
  color: white;
  margin: 0 0 0 2.2%;
}

.menu .col ul {
  padding: 0;
  margin: 0;
}

.menu .col ul li {
  padding: 0;
  list-style: none;
  font-size: 11px;
}

.menu .col h3 {
  font-size: 11px;
  padding: 10px 0;
  font-weight: bold;
  margin: 5px 0 5px 0;
  color: orangered;
  background: #eee;
}

.menu .col ul li a {
  display: block;
  padding: 0 0 15px 0;
  color: orangered;
}

.menu .col ul li a:hover {
  color: #111;
  text-decoration: underline;
}

.menu>li>ul li ul,
.menu li>ul li,
.menu>li>.megadrop,
.menu>li>ul,
.menu>li {
  transition: all 0.2s ease-in-out;
  -moz-transition: all 0.2s ease-in-out;
  -webkit-transition: all 0.2s ease-in-out;
  -ms-transition: all 0.2s ease-in-out;
  -o-transition: all 0.2s ease-in-outs;
}

.col {
  margin: 0px;
  padding: 0;
}

@keyframes changeColor {
  0% {
    color: black;
    background-color: yellow;
    box-shadow: rgba(255, 215, 0, 0.8) 0px 0px 20px, rgba(255, 223, 0, 0.6) 0px 0px 40px;
  }

  100% {
    background-color: orangered;
    box-shadow: rgba(255, 165, 0, 0.8) 0px 0px 20px, rgba(255, 140, 0, 0.6) 0px 0px 40px;
  }
}
</style>
