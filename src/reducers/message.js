//액션타입 정의
import update from 'react-addons-update';
import * as types from 'actions/actionTypes';

//모듈 초기상태 정의
const initialState = {
  msg: "",
  talk: []
};

export default function reducer(state= initialState, action){

const { msg } = state;

switch(action.type){
 case types.SOCKET_MSG:
  return update(state, {  msg : { $set: action.msg } });
case types.TALK_MSG:
  return update(state, {  talk : { $push: [action.msg] } });
 default:
   return state;
   }
 }
