import io from 'socket.io-client';
import { msgRequest, roomsRequest } from '../actions/action';
import * as types from '../actions/actionTypes'

class Socket {
  constructor() {
    this.io = io('http://172.22.34.128:3000');
    this.room="";
  }

  login( nickname, dispatch ){
    return new Promise((resolve, reject) => {
      this.io.emit('enterLobby');
      this.io.emit("logined",{ name: nickname });
      this.io.on('logined', (roomsData) => {
        dispatch(msgRequest({type: types.SOCKET_MSG, data: roomsData.msg}));
        resolve(roomsData);
      })
    })
  }



  createRoom({ title }){
    return new Promise((resolve, reject) => {
      console.log('createRoom', { title })
      this.io.emit('createRoom', { title })

      this.io.once('room', (roomData) => {
        console.log('createRoom -> room', roomData);
        this.state.createRoom(roomData);
        resolve(this.state.activeRoom)

        this.io.on('room', (roomData) => {
          console.log('room', roomData);
          this.state.updateActiveRoom(roomData);
        })
      })
    })
  }

  enterRoom(id, dispatch ){
    return new Promise((resolve, reject) => {
      console.log('enterRoom',  id );
      this.io.emit('enterRoom',  id );

     //  this.io.once('enterRoom', (roomData) => {
     //    console.log('enterRoom -> room', roomData);
     //    dispatch(msgRequest({type: types.SOCKET_MSG, data: roomData}));
     //
     //
     // })

     this.io.on('enterRoom', (roomData) => {
       console.log('enterRoom', roomData);
       dispatch(msgRequest({type: types.SOCKET_MSG, data: roomData}));
       dispatch(roomsRequest({type: types.ROOMS_ENTER, data: roomData}));
     });
     this.io.on('sendMessage', (roomData) => {
       console.log(roomData);
         dispatch(msgRequest({type: types.ROOMS_WORDS, data: roomData}));
     });
    })
  }

  leaveRoom(arg){
    return new Promise((resolve, reject) => {
      console.log('leaveRoom')
      this.io.emit('leaveRoom', arg);
      this.io.off('sendMessage');
      // this.state.setActiveRoomId(null);
      resolve();
    })
  }

  messageToRoom(arg, dispatch){
    return new Promise((resolve, reject) => {
      console.log("메시지투룸");
      console.log(arg);
      console.log('sendMessage', arg)
      this.io.emit('sendMessage',  arg.data);
    })
  }
}

export default Socket;
