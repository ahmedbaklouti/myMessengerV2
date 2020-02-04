//appel express
const express = require('express');
const app = express();
//declaration socket
var server = require("http").createServer(app);
var io = require("socket.io").listen(server);

const connectDB = require('./config/db');
const user = require('./routes/users')
const profile = require('./routes/profile');

//Échappez les caractères dangereux dans str avec des entités html.
//Par défaut, les entités sont codées avec des codes décimaux numériques.
var ent = require("ent");
var messages = [];
var clients = {};



// Init middleware
app.use(express.json());

//connect database
connectDB();
//Define routes
app.use('/', user);
app.use('/auth', require('./routes/auth'));
// app.use('/', profile)
app.use('/profile', require('./routes/profile'));
/************************************************/

//declaration pour jquery et bootstrap
app.use("/assets", [
  express.static(__dirname + "/node_modules/jquery/dist/"),
  express.static(__dirname + "/node_modules/bootstrap/dist/")
]);

//ouverture connection
io.sockets.on("connection", function(socket) {
  console.log("sockets connection");

  //sauvegarde l'object user avec son socket
  socket.on("saveSocket", function(user) {
    clients[user] = { socket };
    //console.log(clients)
    socket.emit("message", `user saved `);
  });

//Liaison du user avec room et envois msg vers tout les user dans le room
  socket.on("addUserToRoom", function(user, room) {
    if (clients[user]){
      clients[user].socket.join(room);
      
      if(clients[user].rooms) {
        clients[user].rooms.push(room)
      }else{
        clients[user].rooms = []
        clients[user].rooms.push(room)
      }
      //console.log(clients)
      socket.to(room).broadcast.emit("message", `nouveau user ${user} `);
      socket.emit("message", `nouveau user ${user} `);
    }
  });

  socket.on("newMsg", function(msg, room, pseudo) {
    console.log(room);
    if (messages[room] === undefined) {
      messages[room] = Array();
    }
    
    //verifier les carateres speciaux
    msg = ent.encode(msg);
    messages[room].push([msg, pseudo, Date.now() ]);
    console.log(messages[room]);
    console.log(room);
    //update view pour user lui meme
    socket.emit("updateMsg", messages[room], room);

    //diffuser le view pour les autres users
    socket.to(room).broadcast.emit("updateMsg", messages[room], room);
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, err =>
  err ? console.error(err) : console.log(`🚀 is running on ${PORT}`)
);