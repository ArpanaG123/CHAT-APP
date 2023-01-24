const express = require('express')

const app = express();

const http = require('http').createServer(app);

const PORT = process.env.PORT || 4500;

http.listen(PORT, () => {
    console.log(`Server is running on port number ${PORT}`);
})

app.use(express.static(__dirname + '/public'))

app.get('/',(req,res) => {
    res.sendFile(__dirname + '/index.html')
})

//socket setup
const io = require('socket.io')(http)

io.on("connection",(socket) => {
    console.log('Connected...')
    socket.on('message', (msg) => {
        socket.broadcast.emit('message', msg)
    })
})
