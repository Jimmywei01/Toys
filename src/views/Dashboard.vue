<template>
  <div>
    <Navbar/>
    <Alert/>
    <div class="container-fluid">
      <div class="row">
        <Sidebar/>
        <main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-4">
          <router-view></router-view>
        </main>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '../components/dashboard/Navbar'
import Sidebar from '../components/dashboard/Sidebar'
import Alert from '../components/Alertmessage'

export default {
  components: {
    Navbar,
    Sidebar,
    Alert
  }
}
</script>

<style>
@import '../assets/_dashboard.scss'
</style>
