<template>
  <div class="chat-pets-content__main">
    <message-system :systemMessage="systemMessage"></message-system>
    <div class="chat-pets-content__messages" ref="blockScroll">
      <Message
      v-for="(message,ind) of messages"
      :key="ind"
      :owner="message.id === user.id"
      :name="message.name"
      :text="message.text"
      :avatar="message.avatar"
      :divider="false"
      :inset="false"
      />
    </div>
    <div class="chat-pets-content__control">
      <div class="chat-pets-content__msg">
        <message-form></message-form>
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
  layout: 'chat/main-chat',
  middleware: ['chat'],
  components: { Message, MessageForm, MessageButton, MessageSystem },
  computed: mapState(['user', 'messages', 'systemMessage']),
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
