<template>
    <el-card shadow="always" :style="{width: '400px', marginLeft:'25%'}">
        <admin-login />
        <div class="pets-login__forgot-password">
          <NuxtLink to="/forgot-password">Forgot your password?</NuxtLink>
        </div>
    </el-card>
</template>

<script>
import AdminLogin from '@/components/site/AdminLogin';
export default {
  /*async asyncData ({ $http }) {
    // const dbState = await $http.$post('/api/auth/login/isAdmin')
    return { isAdmin: true } // dbState.isAdmin
  },*/
  name: 'login',
  components: { AdminLogin },
  mounted(){
    const { message } = this.$route.query;
    if(message === 'session'){
      this.$message.warning('Your session has been interrupted');
    }
  }
}
</script>

<style lang="scss" scoped>
.pets-login__forgot-password{
  position: relative;
  top: -45px;
  left: 55%;
  a{
    color: #da2fb5;
    font-size: 0.9em;
  }
}
</style>
