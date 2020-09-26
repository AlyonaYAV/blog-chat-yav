<template>
  <el-container class="el-wrapper-main-layout">
    <el-header height="70px" class="el-header-main-layout">
      <Navigation />
    </el-header>
    <el-container>
      <el-aside width="200px">Aside</el-aside>
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

<style>
html {
  font-family:
    'Source Sans Pro',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    'Helvetica Neue',
    Arial,
    sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}
.el-wrapper-main-layout{
  height: 100vh;
}
.el-header-main-layout{
  padding: 0;
}
.el-footer-main-layout{
  padding: 0;
  background-color:#cc6699;
}
</style>
