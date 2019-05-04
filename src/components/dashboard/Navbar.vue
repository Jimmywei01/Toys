<template>
  <div>
    <nav class="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow context">
      <router-link to="/" class="navbar-brand col-sm-3 col-md-2 mr-0">CLAY TOYS</router-link>
      <ul class="navbar-nav px-3">
        <li class="nav-item text-nowrap">
          <a class="nav-link" href="#" @click.prevent="logout">Sign out</a>
        </li>
      </ul>
    </nav>
  </div>
</template>
<script>
export default {
  methods: {
    logout () {
      let api = `${process.env.VUE_APP_APIPATH}/logout`
      let vm = this
      vm.$http.post(api, vm.user).then((response) => {
        if (response.data.success) {
          vm.$router.push('/login')
        }
      })
    }
  }
}
</script>
