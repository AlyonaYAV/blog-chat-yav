<template>
    <v-app>
        <v-container fluid style="padding:0px !important;">
            <header-chat></header-chat>
            <v-row v-bind:no-gutters="true" style="position:relative;">
                <v-col xs="3" sm="3" md="3" lg="3" xl="3">
                    <v-navigation-drawer absolute v-model="drawer" :width="330" :height="400" style="top:0px;">
                        <v-alert
                            border="bottom"
                            color="#B34591"
                            dark
                            class="pets-text-center"
                        >
                            All people in the chat room
                        </v-alert>
                        <v-list>
                            <v-list-item
                                v-for="u in users"
                                :key="u.userId"
                                @click.prevent=""
                                :style="u.userId === user.userId ? {backgroundColor:'#ffd9fc'} : {backgroundColor:'#fff'}"
                            >
                                <v-list-item-content>
                                    <v-list-item-title v-text="u.name"></v-list-item-title>
                                </v-list-item-content>

                                <v-list-item-avatar>
                                    <v-img src=""></v-img>
                                </v-list-item-avatar>

                                <v-list-item-icon>
                                    <v-icon :color="u.userId === user.userId ? '#b34591' : 'grey'">mdi-comment-processing-outline</v-icon>
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
                                <v-toolbar style="top:-12px !important;">
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
                                                    style="right:25px;top:5px;background:#F7E7F5;"
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
                                                    style="cursor:auto;bottom:18%;left:10%;"
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
                                                    style="cursor:auto;bottom:18%;right:10%;"
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
import { mapState, mapMutations } from 'vuex';
import HeaderChat from './../../components/site/chat/Header-Chat';
export default {
  components: {
    HeaderChat
  },
  computed: {
    ...mapState('chat', ['user', 'users']),
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
    ...mapMutations('chat', ['clearData']),
    exit () {
      this.$socket.emit('userLeft', this.user.userId, () => {
        // Use mutation to reset state.user
        //this.clearData()
        this.$router.push('/chat/?message=leftChat')
      })
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
  height: 65vh;
  border: 1px solid #D3C4D1;
  background-color: #F7E7F5;
  padding-bottom: 0px !important;
 }
 .pets-text-center{
    text-align: center;
 }
</style>
