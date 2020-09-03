// Application from Express
const app = require('express')()
// Create server based on Application
const httpServer = require('http').createServer(app)
// SocketIO based on HTTP server
const io = require('socket.io')(httpServer)

io.on('connection', socket => {
    // console.log("ID Connected");
    socket.emit('newMessage', { text: 'Bear' })
    //
    socket.on('createMessage', (data)=>{
        setTimeout(()=>{
            socket.emit('newMessage', { test: data.text + 'SERVER' } )
        },1000 )
    })
})

module.exports = {
    app,
    http: httpServer
}
