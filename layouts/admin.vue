<template>
    <el-container class="el-wrapper-main-layout">
        <el-header height="70px" class="el-header-main-layout">
            Header
        </el-header>
        <el-container>
            <el-aside class="el-aside-main-layout">Aside</el-aside>
            <el-main>
                <Nuxt />
            </el-main>
        </el-container>
        <el-footer class="el-footer-main-layout">Footer</el-footer>
    </el-container>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
.el-wrapper-main-layout{
  height: 100vh;
}
.el-header-main-layout{
  padding: 0;
  background-color:#cc6699;
}
.el-aside-main-layout{
  width: 250px;
  background-color: #F8E2EC;

}
.el-footer-main-layout{
  padding: 0;
  background-color:#cc6699;
}
</style>
