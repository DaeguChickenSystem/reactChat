import React from 'react';
import { connect } from 'react-redux';
import { layerRequest, msgRequest } from '../actions/action';
import * as types from 'actions/actionTypes';


class CHATROOM extends React.Component {

    constructor(props) {
        super(props);
        this.frndlistView=this.frndlistView.bind(this);
        this.showDetail=this.showDetail.bind(this);
        this.sendMsg=this.sendMsg.bind(this);
        this.sendMsgClick=this.sendMsgClick.bind(this);
    }

    componentDidMount() {

    }

    sendMsg(event){
      console.log(this.props.roomId);
      if(event.which=='13'){
         this.props.msgRequest({type:types.TALK_SEND, data: {roomId: this.props.roomId, content:event.target.value }});
         event.target.value='';
         document.getElementById("chat-container").scrollTop=document.getElementById("chat-container").scrollHeight
      }
    }

    sendMsgClick(event){
         this.props.msgRequest({type:types.TALK_SEND, data:  {roomId: this.props.roomId, content:  document.getElementById('chatMsg').value }});
         document.getElementById('chatMsg').value ='';
         document.getElementById("chat-container").scrollTop=document.getElementById("chat-container").scrollHeight

    }

    frndlistView(){
      const view= [{name: "a", state: "n", word: "a1"}, {name: "b", state: "s", word: "a2"}, {name: "c", state: "h", word: "a3"}];

      var ttt=this.props.roomWords.map((a, i) => {

              return (<div className="chat-content-right">
                            <div className="chat-avatar-right" >  </div>
                              <div className="cntBody" >
                               <div className="cnt">{a}</div>
                             </div>
                      </div>     )

      })
         return ttt;

   }

   showDetail(arg){
     this.props.layerRequest({type:"VIEW_LIST"});
   }

    render() {
    return (
    <div>
        <div className="main-container">
          <div className="chat-output-container" id="chat-container">
           {this.frndlistView()}
          </div>
          <div className="chat-input-container" >
             <div className="chat-type">
              <input className="input-area" id="chatMsg" onKeyPress={this.sendMsg}></input>
             </div>
             <div className="chat-button" onClick={this.sendMsgClick} ></div>
         </div>
        </div>
    </div>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        view: state.status.view,
        talk: state.message.talk,
        roomId: state.rooms.roomId,
        roomWords: state.rooms.roomWords
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        layerRequest: (arg) => {
            return dispatch(layerRequest(arg));
        },
        msgRequest: (arg) => {
            return dispatch(msgRequest(arg));
        }
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(CHATROOM);
