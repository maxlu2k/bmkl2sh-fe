<template>
  <div class="footer">
    <div class="contain">
      <div class="col">
        <h1>MaxLu$</h1>
        <ul>
          <li>About Me</li>
          <li>Technology</li>
          <li>Contact</li>
        </ul>
      </div>
      <div class="col">
        <h1>Contact</h1>
        <ul>
          <li>Address: Hà Nội</li>
          <li>Email: MaxLus@gmail.com</li>
          <li>Zalo: (+84)36 999 2515</li>
          <li>Phone number: (+84)36 999 2515</li>
        </ul>
      </div>
      <div class="col social">
        <h1>Social</h1>
        <ul>
          <li><a href="https://www.facebook.com/manhdung2711/">a</a></li>
          <li><img src="" width="32" style="width: 32px" /></li>
          <li><img src="" width="32" style="width: 32px" /></li>
        </ul>
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
  width: 390px;
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
  font-size: 12px;
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
