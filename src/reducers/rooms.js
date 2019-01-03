//액션타입 정의
import update from 'react-addons-update';
import * as types from 'actions/actionTypes';

//모듈 초기상태 정의
const initialState = {
 rooms: [],
 roomId: "",
 roomWords: []
};

export default function reducer(state= initialState, action){

const { rooms} = state;

console.log(action);
switch(action.type){
 case types.ROOMS_LIST:
  return update(state, {  rooms: { $set: action.rooms} });
case types.ROOMS_ENTER:
  return update(state, {  roomId: { $set: action.rooms} });
case types.ROOMS_WORDS:
  return update(state, {  roomWords: { $push: [action.msg]}  });
default:
   return state;
   }
 }
