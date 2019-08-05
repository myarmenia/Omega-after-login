import React, {Component} from 'react';
import './Game_demo_styles/animate.css';
import './Game_demo_styles/demoFragments.css';
import {connect} from 'react-redux';
import '../../../styles/notepadGame/style.css';
import '../../../styles/notepadGame/animation.css';
import '../../../styles/notepadGame/lastPage.css';

let array = [];
class Demo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text_for_demo: 'Welcome to NPad smart game for learning coding!'
        };

    }
componentDidMount() {
        let Modal = document.getElementsByClassName('demo-modal-fragment-content')[0];
        setTimeout(
            () => {
                Modal.style.display = "block";
            }, 200
        )

    }
    close_hello_moadl = () => {
        let self=this;
        let uid =`uid=${encodeURI(this.props.userProfile.uid)}&diamonds=${encodeURI(this.props.daily_diamonds)}
        &coins=${encodeURI(this.props.daily_coins)}&login_date=${encodeURI(this.props.userProfile.login_date)}`;
        console.log(uid,"close_hello_moadl")
        fetch(`https://omegacoding.com/android_test/userProgressManager.php`,{
            method:'POST',
            headers:{"Content-type":"application/x-www-form-urlencoded",'Accept':'application/json'},
            body: uid
        }).then(response => {
            if(response.ok){
                return response.json();
            }
        }).then(response => {
            console.log(response,"response");
            if(!response.error){
                self.props.changeUserDiamonds(this.props.userProfile.diamonds*1 + this.props.daily_diamonds*1);
                self.props.addUserNewCoins(this.props.userProfile.coins*1 + this.props.daily_coins*1);
            }
        }).catch( error => {
            console.log(error,"error");
        });


        let modal=document.getElementById('demo-modal');
        modal.classList.add("animated","bounceOut")
        setTimeout(()=>{
            modal.style.display='none'
            },1000 )
    };

    render() {
  return (
            <div className="container">
                <div   id="demo-modal" className="demo-modal-fragment" style={{display: "block",zIndex:'148'}}  onClick={this.close_hello_moadl}>
                    <div  className="demo-modal-fragment-content demo-modal d-modal" >

                       {/*<span className="bet-fragment-close" >×</span>*/}
                        <div className="demo-fragment-modal-header ">
                           <h5  style={{fontSize: '25px',color: 'crimson',fontWeight: '800'}}>Daily bonus! </h5>

                        </div>
                        <div className="bet-fragment-modal-body" style={{color: 'grey'}}>
                            <span className="bet-frag-frame grey" >
                                <img src={require('../../../images/diamond.png')} className="scoreImg" width="26px" height="25px" style={{position:'relative',
                                left: '-2px', top: '-1px'}} alt="diamond"/>
                                {this.props.daily_diamonds} diamonds, <img src={require('../../../images/coin.png')} className="scoreImg" width="25px" height="25px" style={{position:'relative',
                                left: '0', top: '-1px'}} alt="coin"/> {this.props.daily_coins} coins</span><br/>
                            <span className="bet-frag-frame grey">Don't miss out your daily coins and diamonds! </span>

                        </div>
                    </div>
                </div>


            </div>
        );
    }
}
const store = state => ({
    userProfile: state.userProfileData,

});
const dispatch = dispatch => ({


    changeUserDiamonds: newState => {
        dispatch({type: 'ADD_USER_DIAMONDS', payload: newState});
    },
    addUserNewCoins : newState => {
        dispatch({type:'ADD_USER_COINS',payload:newState});
    },
});
export default connect(
    store,
    dispatch
)(Demo)
