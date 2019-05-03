<template>
<div>
  <HomeNavBar/>
  <Slider/>
  <router-view></router-view>
  <footer class="footer">
    <ul class="footer-copyright">
      <li>© Copyright 2019 Clay Toys 練習用版型 無商業用途</li>
      <li>圖片版權屬於 SideShow、Hot Toys、Quora、POPBEE、io9 所有</li>
    </ul>
    <div class="goTop" style="font-size: 1.5rem">
      <a href="#" class="upTop">
        <i class="fas fa-arrow-alt-circle-up"></i>
      </a>
    </div>
  </footer>
</div>
</template>

<script type='text/javascript'>
import $ from 'jquery'
import HomeNavBar from '../components/HomePage/HomeNavBar'
import Slider from '../components/HomePage/Slider'

$(function () {
  $('.upTop').click(function () {
    $('html, body').animate({ scrollTop: $('.container').offset().top }, 2000)
  })
})

export default {
  components: {
    HomeNavBar,
    Slider
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/_homepage.scss';
.context {
  max-width: 1200px;
  margin: 0 auto;
}

div {
  background-color: black;
}

p {
  margin: 0;
}

.footer {
  display: flex;
  background-color: #f4f4f4;
  width: 100%;
  height: 100%;
  padding: 0.5rem;
  top: 0px;
}

.footer-copyright {
    margin: 0 auto;
    text-align: center;
    line-height: 32px;
}

.goTop {
  position: fixed;
  right: 20px;
  bottom: 35px;
  transition: all 5s linear;
  i {
    padding: 0.5rem;
    background-color: black;
    color: #f4f4f4;
  }
}
</style>
