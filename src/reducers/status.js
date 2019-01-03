//액션타입 정의
import update from 'react-addons-update';
import * as types from 'actions/actionTypes';

//모듈 초기상태 정의
const initialState = {
  status: "ALL",
  view: "VIEW_LOGIN",
  past: {}
};

export default function reducer(state= initialState, action){

const { past, status, view} = state;


switch(action.type){
 case types.VIEW_LOGIN:
  return update(state, {  status: { $set: "ALL"}, view:{ $set: "VIEW_LOGIN"}, past: { $set: {status:status, view: view}}  });
case types.VIEW_LIST:
    return  update(state, {
            status: { $set: "ALL"}, view:{ $set: "VIEW_LIST"},  past: { $set:  {status:status, view: view}}
    });
 case types.VIEW_CHAT:
   return  update(state, {
           status: { $set: "ALL"}, view:{ $set: "VIEW_CHAT"},  past: { $set:  {status:status, view: view}}
   });
 case types.BACK:
     return  update(state, {
             status: { $set: "ALL"}, view:{ $set: past.view },  past: { $set:  {status:status, view: view}}
 });

 default:
   return state;
   }
 }
