import axios from 'axios';
import * as types from './actionTypes';
import Socket from  '../service/socket.js';


const activeRoomId = parseInt(location.pathname.substr(1)) || null;
console.log(location.pathname.substr(1));
const socket = new Socket('123');

export function layerRequest(arg) {
return (dispatch) => {
  console.log("레이어 리퀘스트~");
  if(arg.type===types.VIEW_CHAT){
    socket.enterRoom(arg.roomId, dispatch);
  }else if(arg.type==="BACK" && arg.past.view ===types.VIEW_LIST){
    socket.leaveRoom(arg);
  }
   dispatch({ type: arg.type
    })};
}

export function msgRequest(arg) {

return (dispatch) => {
  if(types.TALK_SEND==arg.type){
    console.log("msgRequest");
    console.log(arg);
    socket.messageToRoom(arg, dispatch);
  }else{
   dispatch({
          type: arg.type,
          msg: arg.data
    })};
  }
}

export function roomsRequest(arg) {
  console.log("roomRequest");
  console.log(arg);
    return (dispatch) => {
       dispatch({
         type: arg.type,
         rooms: arg.data
       });
    };
}

export function loginRequest(arg){

return (dispatch) => {

if(arg.type=="signin"){
return axios.post('/api/account/signin',{
        username: arg.param.username,
        password: arg.param.password
      }).then(response =>{
          sessionStorage.setItem('auth','true');
           socket.login(arg.param.username, dispatch).then(data => {
              dispatch(roomsRequest({type: types.ROOMS_LIST, data: data.rooms}));
              dispatch(layerRequest({type:"VIEW_LIST"}));
          })

     }).catch(response =>{dispatch(layerRequest({status:"ERROR", msg:"로그인에 실패하였습니다."}));
   });
}else if(arg.type=="signup"){
  return axios.post('/api/account/signup',{
          username: arg.param.username,
          password: arg.param.password
        }).then(response =>{
            dispatch(layerRequest({type:"VIEW_LIST"}));
            document.getElementById('idText').value ="";
            document.getElementById('pwText').value ="";
       }).catch(response =>{dispatch(layerRequest({status:"ERROR", msg:"계정생성실패"}));
     });
}
  };
}
