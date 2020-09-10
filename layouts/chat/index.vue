<template>
    <div>
        <el-container>
            <el-header height="70px" class="el-header-main-layout">
                <Navigation />
            </el-header>
        </el-container>
        <v-app>
            <v-main>
                <v-container fluid>
                    <Nuxt />
                </v-container>
            </v-main>
        </v-app>
        <el-container>
            <el-footer class="el-footer-main-layout">Footer</el-footer>
        </el-container>
    </div>
</template>

<script>
import Navigation from './../../components/site/Navigation'
export default {
  components: {
    Navigation
  }
}
</script>

<style lang="scss">
.el-footer-main-layout{
  padding: 0;
  background-color:#cc6699;
}
</style>
