<template>
    <nav class="el-menu-pets-nav">
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
        </el-menu>
        <div class="el-menu-pets__user-space">
          <Authentication v-if="!isAuth" />
          <CabAndChat v-else :userLogin="userLogin" />
        </div>
    </nav>
</template>

<script>
/* eslint-disable */
import Authentication from '@/components/site/user_space/Authentication';
import CabAndChat from '@/components/site/user_space/CabAndChat';
import { mapState } from 'vuex';
  export default {
    components: {
      Authentication,
      CabAndChat
    },
    data() {
      return {
        activeIndex1: '2',
        isAuth: false
      };
    },
    computed: {
      authUser(){
        return this.$store.getters['auth/isUserAuthenticated'];
      },
      ...mapState('auth',{
        userLogin: (state)=>{ return state.user.login; }
      })
    },
    watch:{
      authUser(val){
        this.isAuth = val.login === '' ? false : true;
      }
    },
    methods: {
      handleSelect(key, keyPath) {
        //console.log(this.$router.name);
      }
    },
    created(){
      if(this.$store.state.auth.user){
        if(this.$store.state.auth.user.login === ''){
          this.isAuth = false;
        }else{
          this.isAuth = true;
        }
      }else{
        this.isAuth = false;
      };
    }
  }
</script>

<style lang="scss">
  .el-menu-pets-nav::after{
    content: '';
    display: block;
    clear: both;
  }
  $menu-height: 70px;
  .el-menu-pets{
    background: #cc6699 url("/paws.png") 0 0/140px 70px no-repeat padding-box border-box scroll !important;
    height: $menu-height;
    width: 80%;
    float: left;
    display:flex;
    flex-direction: row;
    justify-content: space-between;
    .el-menu-pets__item:first-child{
      margin-left: 1%
    }
  }
  .el-menu-pets__item{
    height:100% !important;
    font-size: 1rem;
    font-weight: bold;
  }
  .el-menu-pets__item_sub div.el-submenu__title{
    height:68px !important;
    font-size: 1rem;
    font-weight: bold;
  }
  .el-menu-pets__user-space{
    background-color:  #f886c5;
    background-image: radial-gradient(#f7e5ef, #cc6699);
    width: 20%;
    height: $menu-height;
    float: right;
  }
</style>
