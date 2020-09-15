<template>
    <v-app>
        <v-container fluid style="padding:0px !important;">
            <v-row v-bind:no-gutters="true">
                <v-col xs="12" sm="12" md="12" lg="12" xl="12">
                    <el-container>
                        <el-header height="80px" class="el-header-main-layout">
                            <Navigation />
                        </el-header>
                    </el-container>
                </v-col>
            </v-row>
            <v-row v-bind:no-gutters="true" style="position:relative;">
                <v-col xs="3" sm="3" md="3" lg="3" xl="3">
                    <v-navigation-drawer absolute v-model="drawer" :width="330" :height="400" style="top:-10px;">
                        <v-alert
                            border="bottom"
                            color="#B34591"
                            dark
                        >
                            All people in the chat room
                        </v-alert>
                        <v-list>
                            <v-list-item
                                v-for="u in users"
                                :key="u.id"
                                @click.prevent=""
                            >
                                <v-list-item-icon>
                                    <v-icon v-if="u.icon" color="pink">mdi-star</v-icon>
                                </v-list-item-icon>

                                <v-list-item-content>
                                    <v-list-item-title v-text="u.name"></v-list-item-title>
                                </v-list-item-content>

                                <v-list-item-avatar>
                                    <v-img src=""></v-img>
                                </v-list-item-avatar>

                                <v-list-item-icon>
                                    <v-icon >mdi-comment-processing-outline</v-icon>
                                </v-list-item-icon>
                            </v-list-item>
                        </v-list>
                    </v-navigation-drawer>
                </v-col>
                <v-col xs="9" sm="9" md="9" :lg="cols" :xl="cols">
                    <v-container fluid style="padding:0px;padding-right:6px;">
                        <v-row
                            :style="withSidebar"
                        >
                            <v-col class="chat-pets-cols-bottom">
                                <v-toolbar style="top:-20px !important;">
                                    <v-container>
                                        <v-row v-bind:no-gutters="true">
                                            <v-col xs="6" sm="6" md="6" lg="6" xl="6">
                                                <v-app-bar-nav-icon
                                                    style="top:0px;"
                                                    @click="()=>{
                                                        drawer = !drawer
                                                        drawer ? cols = 9 : cols = 12
                                                    }"
                                                ></v-app-bar-nav-icon>
                                            </v-col>
                                            <v-col xs="6" sm="6" md="6" lg="6" xl="6">
                                                <v-btn
                                                    :tile="true"
                                                    :outlined="true"
                                                    icon
                                                    :absolute="true"
                                                    style="right:25px;top:5px;background:antiquewhite;"
                                                    @click="exit"
                                                    class="hidden-xs-only">
                                                    <v-icon>mdi-home</v-icon>
                                                </v-btn>
                                            </v-col>
                                        </v-row>
                                        <v-row :no-gutters="true">
                                            <v-col xs="6" sm="6" md="6" lg="6" xl="6">
                                                <v-btn
                                                    class="ma-2"
                                                    color="primary"
                                                    dark
                                                    :height="20"
                                                    :absolute="true"
                                                    style="cursor:auto;bottom:1%;left:10%;"
                                                >
                                                    <v-icon dark :left="true">mdi-human-greeting</v-icon>
                                                    Visitor name is: {{ user.name }}
                                                </v-btn>
                                            </v-col>
                                            <v-col xs="6" sm="6" md="6" lg="6" xl="6">
                                                <v-btn
                                                    class="ma-2"
                                                    color="primary"
                                                    dark
                                                    :height="20"
                                                    :absolute="true"
                                                    style="cursor:auto;bottom:1%;right:10%;"
                                                >
                                                    <v-icon dark :left="true">mdi-door-open</v-icon>
                                                    Chat room name is: {{ user.room }}
                                                </v-btn>
                                            </v-col>
                                        </v-row>
                                    </v-container>
                                </v-toolbar>
                            </v-col>
                        </v-row>
                        <v-row justify="center" align="center">
                            <v-col
                                xs="10"
                                sm="10"
                                md="10"
                                lg="10"
                                xl="10"
                                class="chat-pets-cols-top">
                                <v-main class="chat-pets-content">
                                    <Nuxt />
                                </v-main>
                            </v-col>
                        </v-row>
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
import { mapState, mapMutations } from 'vuex'
import Navigation from './../../components/site/Navigation'
export default {
  components: {
    Navigation
  },
  computed: {
    ...mapState(['user']),
    withSidebar () {
      return this.drawer ? 'margin-left:-12px' : 'margin-left:-6px'
    }
  },
  data () {
    return {
      drawer: true,
      cols: 9
    }
  },
  methods: {
    ...mapMutations(['clearData']),
    exit () {
      // Use mutation to reset state.user
      this.clearData()
      this.$router.push('/?message=leftChat')
    }
  }
}
</script>

<style lang="scss">
.chat-pets-cols-top{
  padding-top: 0px;
}
.chat-pets-cols-bottom{
  padding-bottom: 0px;
}
.chat-pets-content{
  height: 50vh;
  border: 1px solid blue;
  background-color:#cc6699;
  padding-bottom: 0px !important;
 }
</style>
