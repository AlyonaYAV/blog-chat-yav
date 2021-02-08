<template>
  <v-row>
    <v-col xs="12" md="12" lg="12" class="container-chat__cols">
      <el-container>
        <el-header height="70px" class="el-header-main-layout">
          <Navigation />
        </el-header>
      </el-container>
    </v-col>
  </v-row>
</template>

<script>
import Navigation from './../Navigation';
export default {
   components: {
    Navigation
  } 
}
</script>

<style lang="scss">
.el-header-main-layout {
  .el-menu-pets.el-menu--horizontal.el-menu{
    padding: 0;
  }
}
.container-chat {
  padding: 0px;
  .el-menu-cab-chat-pets{
    padding: 0px;
  }
}
.container-chat__cols {
  padding: 0px;
  background-color:#cc6699;
  padding-left: 12px;
  padding-right: 12px;
  .user-spase-cab-chat__text{
    padding-top: .2rem;
  }
}
</style>