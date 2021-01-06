<template>
    <div class="user-space-auth">
        <el-menu
            router
            :default-active="$route.path"
            class="el-menu-auth-pets"
            mode="horizontal"
            background-color="#cc6699"
            text-color="#f7edf2">
            <el-menu-item index="/login" class="el-menu-pets__item">Sign in</el-menu-item>
            <el-menu-item index="/" class="el-menu-pets__item">Sign up</el-menu-item>
        </el-menu>
    </div>
</template>
<script>
export default {
    
}
</script>

<style lang="scss" scoped>
.user-space-auth{
  width: 100%;
}
.el-menu-auth-pets.el-menu--horizontal.el-menu{
  display: flex;
  height: 70px;
  .el-menu-item.el-menu-pets__item.is-active{
    border-bottom: 0px !important;
    color:rgb(247, 237, 242);
  }
  .el-menu-item.el-menu-pets__item{
    width:50%;
    color:rgb(247, 237, 242);
    text-align: center;
  }
}
</style>
