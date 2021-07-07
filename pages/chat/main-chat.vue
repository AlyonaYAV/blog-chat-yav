<template>
  <div class="chat-pets-content__main">
    <message-system :systemMessage="systemMessage"></message-system>
    <div class="chat-pets-content__messages" ref="blockScroll">
      <Message
      v-for="(message,ind) of messages"
      :key="ind"
      :owner="message.userSocketId === user.userSocketId"
      :name="message.name"
      :text="message.text"
      :avatar="avatar"
      :divider="false"
      :inset="false"
      />
    </div>
    <div class="chat-pets-content__control">
      <div class="chat-pets-content__msg">
        <message-form :userId="id" :roomId="currentRoom"></message-form>
      </div>
      <div class="chat-pets-content__btn">
        <message-button></message-button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import MessageSystem from '@/components/site/chat/Message-System'
import Message from '@/components/site/chat/Message'
import MessageForm from '@/components/site/chat/Message-Form'
import MessageButton from '@/components/site/chat/Message-Button'
export default {
  async asyncData(context){
    let jwt = context.store.getters['auth/isUserAuthenticated'].jwtToken;
    //'$isAllowedByRole' is a function from Plugin
    const { role, sessionEnd, avatar, id } = await context.app.$isAllowedByRole(jwt);
    let access = false;
    if(role === 'guest' || role === 'moderator' || role === 'admin'){
      access = true;
    }
    if((!access || role === '') && !sessionEnd){
      if(context.store.getters['auth/isUserAuthenticated'].role !== ''){
        context.store.dispatch('auth/logout');
      }
      context.redirect('/');
    }
      return {
        userLogoutRefresh: sessionEnd ? true : false,
        avatar,
        id
      };
  },
  layout: 'chat/main-chat',
  components: { Message, MessageForm, MessageButton, MessageSystem },
  computed: mapState('chat', ['user', 'messages', 'systemMessage', 'currentRoom']),
  head () {
    return {
      title: `the room name is ${this.user.room}`
    }
  },
  watch: {
    messages () {
      // setTimeout is needed to make a little pause before message will be inserted
      // setTimeout(() => {
      this.$nextTick(() => {
        // scrollTop - amount of pixeles from the top of the element
        // scrollHeight - all scrolled contented the element
        this.$refs.blockScroll.scrollTop = this.$refs.blockScroll.scrollHeight
      })
      // })
    }
  },
  mounted () {
    //Displaying the modal window to inform user about the end of the session
    if(this.userLogoutRefresh){
      this.$alert('Your session is up!', 'Session state', {
        confirmButtonText: 'Sign in again',
        showClose:false,
        callback: action => {
          this.$store.dispatch('auth/logout');
          this.$router.push('/login?message=unauthenticated');
        }
      });
    }else{
      //Get User name from store
      //this.currentName = this.isUserAuthenticated.login;
    }
  }
}
</script>
<style lang="scss" scoped>
.chat-pets-content__main{
  height:100%;
  background-color: #F7E7F5;
}
.chat-pets-content__messages{
  height:75%;
  overflow-y: auto;
}
.chat-pets-content__control{
  display:flex;
  flex-direction: row;
  height:25%;
  .chat-pets-content__msg{
    width:75%;
    padding-left: 2%;
  }
  .chat-pets-content__btn{
    width:25%;
    display: flex;
    justify-content: center;
    padding-top: 1%;
  }
}
</style>
