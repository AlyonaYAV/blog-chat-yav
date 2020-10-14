<template>
    <nav>
        <el-menu
            router
            :default-active="$route.path"
            class="el-menu-pets"
            mode="horizontal"
            background-color="#cc6699"
            text-color="#f7edf2"
            active-text-color="#33041b">
            <el-menu-item index="/" class="el-menu-pets__item">Funy Pets</el-menu-item>
            <el-submenu index="2" class="el-menu-pets__item_sub">
                <template slot="title">My home pets</template>
                <el-submenu index="2-1">
                    <template slot="title">Cats</template>
                    <el-menu-item index="2-1-1">Milly</el-menu-item>
                    <el-menu-item index="2-1-2">Rozy</el-menu-item>
                </el-submenu>
                <el-submenu index="2-2">
                    <template slot="title">Dogs</template>
                    <el-menu-item index="2-2-1">Rex</el-menu-item>
                    <el-menu-item index="2-2-2">Bim</el-menu-item>
                </el-submenu>
                <el-submenu index="2-3">
                        <template slot="title">Featherds</template>
                        <el-menu-item index="2-3-1">Robby</el-menu-item>
                    </el-submenu>
            </el-submenu>
            <el-menu-item index="/about" class="el-menu-pets__item">About</el-menu-item>
            <el-menu-item index="/contacts" class="el-menu-pets__item">Contacts</el-menu-item>
            <el-menu-item index="/chat" class="el-menu-pets__item">Chat</el-menu-item>
        </el-menu>
    </nav>
</template>

<script>
/* eslint-disable */
  export default {
    data() {
      return {
        activeIndex1: '2'
      };
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>

<style lang="scss">
  .el-menu-pets{
    background: #cc6699 url("/paws.png") 0 0/140px 70px no-repeat padding-box border-box scroll !important;
    height:70px;
    display:flex;
    flex-direction: row;
    justify-content: space-between;
  }
  .el-menu-pets__item{
    height:100% !important;
    font-size: 1rem;
    font-weight: bold;
  }
  /*.el-menu-pets__item{
    height:100% !important;
    font-size: 1rem;
    margin-left: 10% !important;
  }
   .el-menu-pets__item_sub{
     margin-left:10%;
   }*/
  .el-menu-pets__item_sub div.el-submenu__title{
    height:68px !important;
    font-size: 1rem;
    font-weight: bold;
  }
</style>