<template>
  <el-container class="el-wrapper-main-layout">
    <el-header height="70px" class="el-header-main-layout">
      <Navigation />
    </el-header>
    <el-container>
      <el-main>
        <Nuxt />
      </el-main>
    </el-container>
    <el-footer class="el-footer-main-layout">Footer</el-footer>
  </el-container>
</template>

<script>
import Navigation from './../components/site/Navigation'
export default {
  components: {
    Navigation
  }
}
</script>

<style lang="scss" scoped>
.el-wrapper-main-layout{
  height: 100vh;
}
.el-header-main-layout{
  padding: 0;
}
.el-footer-main-layout{
  padding: 0;
  background-color: #cc6699;
}
</style>
