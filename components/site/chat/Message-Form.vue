<template>
    <v-text-field
        label="Message text"
        outlined
        v-model="formText"
        @keydown.enter="addMessage"
        background-color="#D3C4D1"
    ></v-text-field>
</template>

<script>
export default {
  data () {
    return {
      formText: ''
    }
  },
  methods: {
    addMessage () {
      // console.log('Result is: ', this.formText)
      this.$socket.emit('createMessage', {
        id: this.$store.state.user.id,
        name: 'admin',
        text: this.formText
      }, (data) => {
        if (typeof data === 'string') {
          console.error(data)
        } else {
          this.formText = ''
        }
      })
    }
  },
  created () {
    // this listener is not needed in SSR-mode - if (process.client) } {}
    this.$eventBus.$on('addMessage', () => {
      // Add a message by button's click
      this.addMessage()
    })
  },
  beforeDestroy () {
    // Make sure to always unsubscribee from events when longer needad
    this.$eventBus.$off('addMessage')
  }
}
</script>
