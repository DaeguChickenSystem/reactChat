import React from 'react';
import { connect } from 'react-redux';
import { layerRequest } from '../actions/action';



class FRNDLIST extends React.Component {

    constructor(props) {
        super(props);
        this.frndlistView=this.frndlistView.bind(this);
        this.showDetail=this.showDetail.bind(this);
    }

   componentDidMount() {

    }

    frndlistView(){
         return this.props.rooms.map((a, i) => {
         return (<div className="content" onClick={this.showDetail.bind(this, a._id)} >
                           <div className="cntTitleCheck" > {a.roomNm} </div>
                             <div className="cntBody" >
                              <div className="cnt">{a.word}</div>
                            </div>
                     </div>     )
         });
   }

   showDetail(arg){
    this.props.layerRequest({type:"VIEW_CHAT", roomId: arg});
   }


    render() {
    return (
        <div>

        <div className="main-container">
          <div className="leftArea"></div>
          <div className="rightArea">
             <div className="right-wrapper">
             <div className="search"></div>
             <div className="frndlist">
             {this.frndlistView()}
             </div>
             <div className="socketMsg">{this.props.socket}</div>
           </div>
          </div>
        </div>

    </div>
        );
    }
}



const mapStateToProps = (state) => {
    return {
        view: state.status.view,
        rooms: state.rooms.rooms,
        socket: state.message.msg,
        talk: state.message.talk
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        layerRequest: (arg) => {
            return dispatch(layerRequest(arg));
        }
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(FRNDLIST);
