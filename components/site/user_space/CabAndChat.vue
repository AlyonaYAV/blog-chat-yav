<template>
    <div class="user-space-cab-chat">
      <div class="user-spase-cab-chat__text">
        User name:
        <span class="user-space-cab-chat__login">{{ userLogin }}</span>
      </div>
      <el-menu
          router
          class="el-menu-cab-chat-pets"
          mode="horizontal"
          background-color="#cc6699"
          text-color="#fff"
      >
        <el-menu-item index="/cabinet" class="pats-item__cabinet el-icon-user-solid"></el-menu-item>
        <el-menu-item index="/chat" class="pets-item-chat">Chat</el-menu-item>
        <el-menu-item class="pets-item__log-out" @click.native="userLogOutHandler">Log out</el-menu-item>
      </el-menu>
    </div>
</template>

<script>
import { mapMutations } from 'vuex';
export default {
  props: { userLogin: String },
  methods: {
    userLogOutHandler(){
      this.userLogOutMethod();
      this.$router.push('/');
    },
    ...mapMutations('auth', {
      userLogOutMethod: 'userLogOut'
    })
  }
}
</script>

<style lang="scss" scoped>
.user-space-cab-chat{
    display: flex;
    flex-direction: column;
}
.user-spase-cab-chat__text{
  height: 25px;
  font-size: 0.9em;
  font-weight: bold;
  padding-left: 1.5em;
  padding-top: 0.3em;
  border-left: 1px solid #fff;
  border-bottom: 1px solid #fff;
  color: #6d0456;
  .user-space-cab-chat__login{
    text-shadow: 1px 1px 4px #240b0b;
    color: #fcfafb;
    padding-left: 1em;
  }
}
.el-menu-cab-chat-pets{
  height: 45px;
}
.el-icon-user-solid::before{
  color: #fff;
}
  %item-cab-chat{
    padding: 0px 0px 0px 0px;
    text-align: center;
    height: 44px;
    &.is-active{
      border-bottom: none;
      color: transparent;
    }
  }
.pats-item__cabinet{
  width: 23%;
  @extend %item-cab-chat;
}
.pets-item-chat{
  width: 43%;
  @extend %item-cab-chat;
}
.pets-item__log-out{
  width: 34%;
  @extend %item-cab-chat;
}
</style>

