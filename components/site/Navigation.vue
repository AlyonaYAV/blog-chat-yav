<template>
    <nav class="el-menu-pets-nav">
        <el-menu
            router
            :default-active="$route.path"
            class="el-menu-pets"
            :style="{ backgroundImage: siteLogo ? `url(/logo/${siteLogo})`: '' }"
            mode="horizontal"
            background-color="#cc6699"
            text-color="#f7edf2"
            active-text-color="#33041b">
            <el-menu-item index="/" class="el-menu-pets__item">Funy Pets</el-menu-item>
            <el-submenu index="2" class="el-menu-pets__item_sub">
                <template slot="title">My home pets</template>
                <parent-item :parentData="createdPagesStructure" />
            </el-submenu>
            <!--<el-menu-item index="/about" class="el-menu-pets__item">About</el-menu-item>-->
            <el-menu-item v-for="staticPage in staticPages" :key="staticPage.name"
              :index="`/${staticPage.name.toLowerCase()}`" class="el-menu-pets__item">
              {{ staticPage.name }}
            </el-menu-item>
        </el-menu>
        <div class="el-menu-pets__user-space">
          <Authentication v-if="!isAuth" />
          <CabAndChat v-else :userLogin="userLogin" />
        </div>
    </nav>
</template>

<script>
import Authentication from '@/components/site/user_space/Authentication';
import CabAndChat from '@/components/site/user_space/CabAndChat';
import ParentItem from '@/components/site/navigation_recursion/ParentItem';
import { mapState } from 'vuex';
  export default {
    components: {
      Authentication,
      CabAndChat,
      ParentItem
    },
    data() {
      return {
        activeIndex1: '2',
        isAuth: false,
        createdPagesStructure: null,
        siteLogo: '',
        staticPages: []
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
      },
      async getMenuPages(){
        try{
          const result = await this.$axios.get('/api/menu_page/page');
          if(result.data.pages){
            return result.data.pages;
          }
          throw new Error(result.data.message);
        }catch(e){
          throw e;
        }
      },
      async getSiteLogo(){
        try{
          const result = await this.$axios.$get('/api/settings/logo');
          if(result){
            return result.logo;
          }
        }catch(e){
          throw e;
        }
      },
      async getStaticPages(){
        try{
          const result = await this.$axios.$get('/api/static_page/pages');
          if(result){
            return result.static;
          }
        }catch(e){
          throw e;
        }
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
    },
    mounted(){
      this.getMenuPages().then(result =>{
        if(Array.isArray(result)){
          return result;
        }
      }).then( data =>{
        //The 'createNestedMenuStucture' function is taken from 'plugin'
        this.createdPagesStructure = this.createNestedMenuStructure(data);
      }).catch(e =>{
        //console.log(e);
      });
      //Get site logo
      this.getSiteLogo().then(data =>{
        //Set the site logo
        this.siteLogo =  data;
      }).catch(e => {
        //console.log(e);
      });
      this.getStaticPages().then(data =>{
        //All static pages
        this.staticPages = data
      }).catch(e => {
        console.log(e);
      });
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
    /*url("/paws.png")*/
    background: #cc6699 0 0/140px 70px no-repeat padding-box border-box scroll;
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