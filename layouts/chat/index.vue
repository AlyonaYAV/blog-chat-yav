<template>
    <v-app>
      <v-container fluid class="container-chat">
          <header-chat></header-chat>
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
import HeaderChat from './../../components/site/chat/Header-Chat';
export default {
  components: {
    HeaderChat
  }
}
</script>

<style lang="scss">

.el-footer-main-layout{
  padding: 0;
  background-color:#cc6699;
}
</style>
