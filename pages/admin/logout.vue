<template>
  <div>
    <h1>If you click on this button you will leave the blog and also the chat if you are in it</h1>
    <el-button :class="'logout-blog-chat'" @click="LogoutFromBlogAndChat" size="mini">
      Leave blog and chat
    </el-button>
  </div>
</template>
<script>
import { mapState } from 'vuex';
export default {
  async asyncData(context){
    let jwt = context.store.getters['auth/isUserAuthenticated'].jwtToken;
    // '$isAllowedByRole' is a function from Plugin
    let userData = await context.app.$isAllowedByRole(jwt);
    if(userData.role === 'guest'){
      context.redirect('/cabinet');
    }
    if(userData.role === '' && !userData.sessionEnd){
      if(context.store.getters['auth/isUserAuthenticated'].role !== ''){
        context.store.dispatch('auth/logout');
      }
      context.redirect('/');
    }
    return {
      userLogoutRefresh: userData.sessionEnd ? true : false
    };
  },
  layout: 'admin',
  computed: {
    ...mapState('chat', ['user']),
  },
  methods: {
    LogoutFromBlogAndChat(){
      this.$socket.emit('userLeft', this.user.userId, async (data)=> {
        //
        if(typeof data === 'string'){
          console.error(data);
        }else{
          await this.$store.dispatch('auth/logout');
          // console.log("Data");
          this.$router.push('/?message=loggetOut');
        }
      })
    }
  },
  //beforeCreate () {
    //this.$store.dispatch('auth/logout')
    //this.$router.push('/login?message=admin-logout')
  //}
  mounted(){
    // Displaying the model window to inform user about the end of the session
    if(this.userLogoutRefresh){
      this.$alert('Your session is up!', 'Session state', {
        confirmButtonText: 'Sign in again',
        showClose: false,
        callback: action => {
          this.$store.dispatch('auth/logout');
          this.$router.push('/login?message=unauthenticated');
        }
      });
    }
  }
}
</script>

<style lang="scss">
.logout-blog-chat{
        background-color: #f5cae0;
        border-color: #f3d3f3;
        color: #000;
        &:hover{
          background-color: #e2a8c5;
          color: white;
        }
      }
</style>
