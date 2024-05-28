import { io } from "socket.io-client"

// const socket = io('https://group.kufaii.xyz',{
//     autoConnect: false
// })
const socket = io('http://localhost:3000/',{
    autoConnect: false
})

export default socket