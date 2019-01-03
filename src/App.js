import React, { Component } from 'react';
import { connect } from 'react-redux';
import { layerRequest } from './actions/action';
import {FRNDLIST, LOGIN, CHATROOM} from './containers'
import './App.css';



class App extends Component {

 constructor(props){
   super(props);
   this.view = this.view.bind(this);
   this.backButton = this.backButton.bind(this);
 }


 view(){
   const view = this.props.view;
   const login = sessionStorage.getItem('auth');
   console.log(login);
   if(login === "true"){
     if(view==="VIEW_LOGIN"){
       if(this.props.past.view === "VIEW_LIST"){
        return (<FRNDLIST />)
        }else{
        return (<CHATROOM />)
        }
     }else if(view ==="VIEW_LIST"){
       return (
         <FRNDLIST />
       )
     }else{
         return (<CHATROOM />)
     }
   }else{
     return (
       <LOGIN />
     )
   }
 }

 backButton(arg){
  this.props.layerRequest({type:"BACK", view: this.props.view, past: this.props.past, roomId: this.props.roomId});
 }

  render() {
    return (
    <div>
      <div>
          {this.view()}
      </div>
      <div className="back-button" onClick={this.backButton} >B</div>

    </div>
    );
  }
}


const mapStateToProps = (state) => {
    return {
      view: state.status.view,
      past: state.status.past,
      roomId: state.rooms.roomId
    };
};


const mapDispatchToProps = (dispatch) => {
    return {
        layerRequest: (arg) => {
            return dispatch(layerRequest(arg));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
