export const state = () => ({
  user: {},
  messages: [],
  systemMessage: {
    title: '',
    text: ''
  }
})

export const mutations = {
  addUser (state, user) {
    state.user = user
  },
  clearData (state) {
    state.user = {}
    state.messages = []
  },
  SOCKET_systemMessage (state, syatemMessage) {
    state.systemMessage = syatemMessage
  },
  // It will be called automatically by installed package 'vue-socket.io'
  SOCKET_newMessage (state, message) {
    message.avatar = 'https://cdn.vuetifyjs.com/images/lists/1.jpg'
    message.divider = true
    message.inset = true
    state.messages.push(message)
  }
}
/* export const actions = {
  SOCKET_newMessage (ctx, data) {
    console.log('Message receved', data)
  }
} */
