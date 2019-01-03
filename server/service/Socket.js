module.exports = (io) => {

  let socketInfo=[];
  let loginedMem=[];
  let rooms=[{_id:1, roomNm: "a"},{_id:2, roomNm: "b"},{_id:3, roomNm: "c"}];
  let count= 0;

  io.on('connection', (socket) => { // 웹소켓 연결 시
    console.log('Socket initiated!');
    // socket.on('newScoreToServer', (data) => { // 클라이언트에서 newScoreToServer 이벤트 요청 시
    //   io.emit('newScoreToClient', data);
    // });
    // Join Room
   socket.on('logined', function(data){
     count += 1;
     io.emit('logined', {msg:data.name +"님이 로그인했습니다."+count, rooms: rooms});
   });

   socket.on('rooms', function(data){
      io.emit('rooms', roomInfo);
   });

   socket.on('enterRoom', function(data) {
     console.log("enterRoom");
     console.log(data);
        socket.join('room' + data.roomId);
        io.sockets.in('room' + data.roomId).emit('enterRoom', "신규 접속");
        io.emit('enterRoom',  data);
    });

    socket.on('leaveRoom', function(data) {
      console.log("leaveRoom");
      console.log(data);
         socket.leave('room' + data.roomId);

     });



    // Broadcast to room
    socket.on('sendMessage', function(data) {
      console.log("sendMessage");
      console.log(data);
       socket.join('room' + data.roomId);
       // io.sockets.in('room' + data.roomId).emit('sendMessage', data.content);
      io.to('room' + data.roomId).emit('sendMessage',  data.content);
    });


  });
};
