<template>
    <div class="sticky-top  shadow-sm">
        <nav class="navBar">
            <router-link class="navBar-indexImage" to="/page"></router-link>
            <div class="nav-right">
                <router-link class="navBar-shopping" to="/shoppinglist" style="text-decoration:none;">Shop</router-link>
                <router-link class="navBar-cart" to="/cart" style="text-decoration:none;">Cart
                <i class="fas fa-shopping-cart"></i>
                <span class="badge badge-pill  badge-danger shopcart-icon-counter">{{carts.length}}</span>
                </router-link>
                <router-link class="navBar-loging" to="/login">
                <i class="fas fa-user-cog"></i>
                </router-link>
            </div>
        </nav>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  methods: {
    ...mapActions(['getCart'])
  },
  computed: {
    ...mapGetters(['carts'])
  },
  created () {
    this.getCart()
  }
}
</script>

<style lang="scss" scoped>
@import './src/assets/_homepage.scss';

.navBar-indexImage {
    display: inline-block;
    background-image: url('./../../assets/img/toy4.png');
    background-repeat: no-repeat;
    width: 120px;
    height: 100px;
}
.navBar {
    position: sticky;
    display: flex;
    justify-content: space-between;
    line-height: 40px;
    background-color: #f4f4f4;
    width: 100%;
    height: 50px;
    padding: 0.5rem;
    top: 0px;
}

.navBar-loging,.navBar-cart,.navBar-shopping {
    font-size: 1rem;
    color: black;
    font-weight: 500;
}
.navBar-cart::before{
    content: "|";
    padding:0 10px;
}

.navBar-loging::before{
    content: "|";
    padding:0 10px;
}

.shopcart-icon-counter {
    position: absolute;
    padding: 4px;
    top: 5px;
    right: 40px;
    width: 22px;
}
</style>
