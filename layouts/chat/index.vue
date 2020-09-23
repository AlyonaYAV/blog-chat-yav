<template>
    <v-app>
        <v-container fluid class="container-chat">
            <v-row>
                <v-col xs="12" md="12" lg="12" class="container-chat__cols">
                    <el-container>
                        <el-header height="70px" class="el-header-main-layout">
                            <Navigation />
                        </el-header>
                    </el-container>
                </v-col>
            </v-row>
            <v-row>
                <v-col xs="12" md="12" lg="12">
                    <v-container>
                        <Nuxt />
                    </v-container>
                </v-col>
            </v-row>
        </v-container>
        <v-footer app :padless="true" color="#cc6699" :height="50">
            <p>Footer</p>
        </v-footer>
    </v-app>
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
.container-chat {
  padding: 0px;
}
.container-chat__cols {
  padding: 0px;
  background-color:#cc6699;
  padding-left: 20px;
  padding-right: 20px;
}
</style>
