import React, { Component } from 'react';
import ModalDialog from '../alphabetGame/ModalDialog';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { connect } from 'react-redux';

class Leftbuttons extends Component {
    constructor() {
        super();
        this.state = {

        }
    }

    timeHelper=(event)=> {
        // button
        this.fetchDiamonds(this.timeCallBack);
    }

    Help5050 =(event)=> {
        // button
        let help=document.getElementsByClassName('helpb')[0];

        help.setAttribute('disabled','true');
        help.style.cursor = 'no-drop';
        this.fetchDiamonds(this.removeWrongAswers);
    }

    fetchDiamonds =(funcName)=> {
        let userId = this.props.userProfile.uid;
        let url = 'https://omegacoding.com/android_test/manageDiamonds.php';
        let method = 'post';
        let headers = {"Content-type": "application/x-www-form-urlencoded; charset=UTF-8"};
        let body = "user_id="+userId+"&operation=8";

        fetch(url, {
            method: method,
            headers: headers,
            body: body
        })
            .then(res=>res.json())
            .then((data)=>{
                // console.log(data);
                this.setState({ diamonds:data });
                if(data !== '0') {
                    if (data === 'comes_zero'){
                        data=0;
                    }
                    this.props.addUserDiamonds(data);
                    this.props.changeUserDiamonds(data);
                    return funcName();
                }


            })
            .catch(function (error) {
                console.log('Request failed', error);
            });
    }

    timeCallBack=()=> {
        // freez timer ----
        this.stopClock();
        let timeBtn = document.getElementsByClassName('time-freezer')[0];
        timeBtn.setAttribute('disabled','true');
        timeBtn.style.cursor = 'no-drop';
       this.props.freez(true);
        // freeze timer ----*/
    }
    removeWrongAswers =()=>{
        let p=i;
        let k= 0;

        //  console.log(p,"ppppppppppppp");

        // let buttons = document.getElementsByClassName('buttons');
        // console.log(buttons[0].getAttribute("id"),"0000000000");

        // let random= this.getRandomInt(1,4);
        //console.log(random,"randomrandomrandomrandom");

        let buttons = document.getElementsByClassName('buttons');
        //console.log(buttons,"buttonsbuttonsbuttons");
        for (let j = 0; j < buttons.length; j++) {
            if (k<2){
                if (buttons[j].getAttribute("id")*1 !== this.state.answerVariants[p].true_id*1){
                    buttons[j].style.display='none'
                    //console.log(j,"jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj");

                }
                // console.log(k,"kkkkkkkkkkkkkkaraj");
                k++;
                // console.log(k,"kkkkkkkkkkkkkkHetoo");
            }
            /* buttons[i].style.position = 'initial';
             buttons[i].style.transform = 'initial';
             buttons[i].style.transition = 'initial';
             buttons[i].style.opacity = 'initial';
             buttons[i].style.width = 'calc(96%/4)';*/
        }
        setTimeout(() => {
            this.setState({
                showAnswers:true

            })
        },1000);
        // console.log(this.state.answers.length,"this.state.answers.lengththis.state.answers.length")
    }

    componentWillMount(){

    }

    componentWillReceiveProps (props)  {

    }


    render() {

        return (
            <div>

                <button className="helper-btn helpb" onClick={!(this.props.diamonds===false)?this.props.userProfile.diamonds==='0'?'':
                    this.Help5050:this.props.diamonds=== '0'?'': this.Help5050}
                        style={{cursor:!(this.props.diamonds===false)?this.props.userProfile.diamonds==='0'?'no-drop':'':this.props.diamonds=== '0'?'no-drop':''}}> 50/50
                </button>
                <button className="time-freezer helper-btn " onClick={!(this.props.diamonds===false)?this.props.userProfile.diamonds==='0'?''
                    :this.timeHelper:this.props.diamonds=== '0'?'':this.timeHelper}
                        style={{cursor:!(this.props.diamonds===false)?this.props.userProfile.diamonds==='0'?'no-drop':!this.state.TimeOver?'no-drop':'':''}} > Freeze Time
                </button>
                <button className="helper-btn" >
                    <MuiThemeProvider>
                        <ModalDialog userId = {this.props.userProfile.uid}/>
                    </MuiThemeProvider>
                </button>
        </div>

        )
    };
}


const store = state => ({
    gameList : state.gamelist,
    replay:state.replayGame,
    userProfile: state.userProfileData,
    diamonds:state.currentDiamonds,
});

const dispatch = dispatch => ({
    replay: tabIndex => dispatch({type:'REPLAY_GAME', payload: tabIndex }),
    gotogamelist: tabIndex => dispatch({type:'GOTO_GAMELIST', payload: tabIndex }),
    addUserDiamonds : newState => {
        dispatch({type:'CHANGE_DIAMONDS',payload:newState});
    },
    changeUserDiamonds : newState => {
        dispatch({type:'ADD_USER_DIAMONDS',payload:newState});
    },

});

export default connect(
    store,
    dispatch
)(Leftbuttons)