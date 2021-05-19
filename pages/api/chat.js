//import the server from socket.io
import { Server } from "socket.io";

const ioHandler = (req, res) => {
    //start socket server if it has not already
    if(!res.socket.server.io) {
        console.log("First use, starting socket.io");

        //create new server
        const io = new Server(res.socket.server);

        io.on("connection", (socket) => {
            //when message is submitted, broadcast it

            //socket.join(roomName);
            //console.log("joined" + roomName);

            socket.on("message-submitted", (msg) => {
                //echo the message back to the user
                socket.emit("message", msg);
                
                //broadcast message to everyone else
                socket.broadcast.emit("message", msg);
                
            });
            /*
            socket.on("room", function(roomName) {
                socket.join(roomName);
            });

            socket.on("message-submitted", (msg) => {
                //echo the message back to the user
                socket.in(roomName).emit("message", msg);
                
            });*/
        });

        // make that socket available externally
        res.socket.server.io = io;
    }
    //if server is already started, do nothing but log it
    else {
        console.log("server already started");
    }

    //return empty 200
    res.end();
};

export default ioHandler;

      //const newSocket = io("https://54.167.252.232:8008");
      //const newSocket = io("https://chatapps.supergamebros.com:8008");