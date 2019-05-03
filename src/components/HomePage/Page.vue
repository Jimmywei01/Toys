<template>
  <content class="context">
    <div class="container">
    <div class="hot_hero">
      <div class="hero">熱門英雄</div>
      <div class="hot_hero-toys">
        <div class="heros iron-man">
          <a href="#/shoppingdetail/-LcU96s7eEVeAh4G6_B0">
          <img src="../../assets/img/iron-man_marvel_feature.jpg" alt="">
          </a>
            <div class="text">
              <p>Iron-man</p>
            </div>
        </div>
        <div class="heros thanos">
          <a href="#/shoppingdetail/-LcUARRT0I_iE-ShYbAx">
          <img src="../../assets/img/thanos_marvel_feature.jpg" alt="">
          </a>
          <div class="text">
            <p>Thanos</p>
          </div>
        </div>
        <div class=" heros batman">
          <a href="#/shoppingdetail/-La_oJInsziEV7yjLrKq">
          <img src="../../assets/img/batman_dc-comics_feature.jpg" alt="">
          </a>
          <div class="text">
            <p>Batman</p>
          </div>
        </div>
        <div class=" heros joker">
          <a href="#/shoppingdetail/-LcThTF4brm4l-ZPCRES">
          <img src="../../assets/img/the-joker_dc-comics_feature.jpg" alt="">
          </a>
          <div class="text">
            <p>Joker</p>
          </div>
        </div>
      </div>
    </div>
  </div>
  <shoppinglist/>
  </content>
</template>

<script>
import shoppinglist from './ShoppingList'
export default {
  name: 'Page',
  components: {
    shoppinglist
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/_homepage.scss';

p {
  margin: 0;
}
.choose-camp {
  text-align: center;
}
.camp {
  display: flex;
  justify-content: center;
}
.camp-marvel li {
  background-color: #f4f4f4;
}

.carousel-caption {
  background-color: rgba(0, 0, 0, .2);
  height: 50px;
}

.hero{
    border-bottom: solid;
    border-top: solid;
    padding: 0.5rem;
    color: #f4f4f4;
    font-size: 35px;
    font-weight: 700;
    margin: 1.2rem 0 1.2rem 0;
    text-align: center;
}

.hero ::before {
  content: "";
  border: 1px solid black
}

.hot_hero-toys {
  position: relative;
  margin: 3rem 0;
  display: flex;
  cursor: pointer;
  flex-wrap: wrap;
}

.heros {
  padding: 0;
  height: 170px;
  width: 25%;
  min-width: 0;
  min-height: 0;
  overflow: hidden;
  img {
    max-width: 100%;
    transform:scale(1,1);
    transition: all .6s ease-out;
  }
  p{
    color: white;
    font-weight: 700;
    font-size: 20px;
  }
}

.heros img:hover {
    transform:scale(1.2,1.2);
}

.heros > .text {
    position: relative;
    text-align: center;
    transition: all .2s ease-in;
    opacity: 0;
}

.heros > a:hover +.text {
  transition: all .2s ease-out;
  transform: translateY(-90%);
  background-color: rgba(0, 0, 0, .2);
  opacity: 1;
}

@media (max-width: 1024px) {
  .heros {
    width: 50%;
  }
  .heros >  .text {
    bottom: 150px;
  }
  .heros > a:hover +.text {
    bottom: 125px;
  }
}

@media (max-width: 700px) {
  .heros {
    width: 100%;
  }
  .heros > a:hover +.text {
    bottom: 50%;
  }
}

</style>
