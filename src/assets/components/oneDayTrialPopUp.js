import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactDOM from 'react-dom';


class OneDayPopUp extends Component{
    constructor(){
        super();
        this.state = {
            open:false,
            input_code:'',
        }
    }


    close=()=>{
        this.props.show(true)
        // this.setState({
        //     open:false
        // })
    }
    keyDownEnter=(e)=>{
        if(e.keyCode === 13) {
            this.blur()}
    };
    get_input = (e)=>{
        this.setState({input_code:e.target.value})
    };

    blur = ()=>{
        let e=document.getElementsByClassName("price");
        let elem=document.getElementsByClassName("input2_n")[0];
        let error_code=document.getElementById("wrong_t");

        if(elem.value !=='' ){
            if(elem.value === this.props.akcia.code ){

                let info = `uid_promo_code=${encodeURI(this.props.userProfile.uid)}&code=${encodeURI(elem.value )}`;
                //  console.log( info ,"enter_promocodeenter_promocodeenter_promocode")
                fetch(`https://omegacoding.com/android_test/index.php`,{
                    method: 'POST',
                    headers: {"Content-Type": "application/x-www-form-urlencoded", 'Accept': 'application/json'},
                    body: info

                }).then(response => {
                    if (response.ok) {
                        return response.json();
                    }
                }).then(response => {
                 //   console.log(response, "enter_promocode");
                    if(!response.error){
                        error_code.textContent = '';
                        this.props.changeAkciaInfo({error:true, active:true});
                        this.props.setPromoStatus(this.props.akcia.id)
                        this.props.close_price_blank();
                        this.props.toggleUpgrateTable(true);
                                                  }
                    else{
                        if(this.props.lang === "eng"){
                            error_code.textContent = 'Something went wrong, please try again!';
                        }
                        else{
                            error_code.textContent = 'Ինչ-որ սխալ տեղի ունեցավ, կրկին փորձեք';
                        }
                    }


                }).catch(error => {
                    console.log(error,"enter_promocode");
                });

            }
            else{
                if(this.props.lang === "eng") {
                    error_code.textContent = 'Wrong promo-code';
                }
                else{
                    error_code.textContent = 'Սխալ Պրոմո Կոդ';
                }
            }
        }
        else {
            if(this.props.lang === "eng") {
                error_code.textContent = 'Please import the promo-code';
            }
            else{
                error_code.textContent = 'Խնդրում ենք մուտքագրել Պրոմո Կոդը';
            }


        }
    };


    render_board =()=>{
        return (

            <div className="container price">
                <div className="row">

                    <div className="col-md-8 col-sm-8 col-lg-8 col-xs-12 col-md-offset-4  col-xs-offset-2 col-lg-offset-4 col-sm-offset-4">
                        <div style={{display: 'flex',
                            justifyContent: 'flex-end'}}>
                            <i className="material-icons"  style={{verticalAlign: 'middle',fonSize:'13px',fontWeight:'900',cursor:'pointer'}} onClick={this.close}>close</i>
                        </div>
                        <div className="col-md-12 col-sm-12">
                            {
                            this.props.lang === 'eng'?<span>
                                <p className="p_title_one">
                                    Dear {this.props.userProfile.firstname}  {this.props.userProfile.lastname}  </p>
                                <hr className="one_day_trial"/>

                                <p className="p_title_two">

                                Welcome to OmegaCoding.<br/> Now 24-hour demo version has begun for you. As you are a new user, we give a 20% discount to you which will be available only during the demo version.<br/> You can activate the promo-code <span className="code">{this.props.akcia.code} </span> <br/>by writing it down below.

                                Learn with us, play our games and get hired!
                                </p></span>:<span>
                                <p className="p_title_one">
                                    Հարգելի  {this.props.userProfile.firstname}  {this.props.userProfile.lastname}  </p>
                                <hr className="one_day_trial"/>
                                 <p className="p_title_two">
                                Բարի գալուստ OmegaCoding:<br/>
                                Այժմ սկսվել է 24-ժամյա դեմո տարբերակը:<br/>
                                Որպես նոր օգտատեր, մենք ձեզ տալիս ենք 20% զեղչ, որը հասանելի կլինի միայն դեմո տարբերակի ժամանակ:
                                Դուք կարող եք ակտիվացնել պրոմո-կոդը՝<br/>
                                    <span className="code">{this.props.akcia.code} </span> <br/>
                                     ստորեւ գրելով այն:
                                    Սովորեք մեզ հետ, խաղացեք մեր խաղերը և դարձեք պահանջված մասնագետ:
                                       </p>
                            </span>
                              }



                        </div>


                        <div  className="col-md-12 col-sm-12" style={{display:'flex',justifyContent: 'center',padding:'10px'}}>

                            <div>
                                <input className="input2_n" type="text" value={this.state.input_code} placeholder='Enter your Promo-code'
                                       onKeyDown={this.keyDownEnter} onChange={this.get_input} onBlur={this.blur}/>

                            <button className="button_green" style={{padding:'0px 7px',margin:'0',top:'0',borderRadius:'inherit'}} onClick={this.blur}><i className="material-icons"  style={{verticalAlign: 'middle',fonSize:'13px',fontWeight:'900'}}>arrow_right_alt</i></button>
                        </div>

                        </div>
                        <div  className="col-md-12 col-sm-12 col-xs-12" id="wrong_t" style={{color:'#fd1900',fontSize: '12px'}}></div>
                    </div>

                </div>

                <div className="price_back" style={{zIndex:'-1',top:'0'}}/>

            </div>
            )
    }
    render(){
        return(
            <span>
                 {this.render_board()
                 }
            </span>


        )
    }

}

const store = state => ({
    gameList: state.gamelist,
    replay: state.replayGame,
    userProfile: state.userProfileData,
    game_id: state.getGame_Id,
    lock: state.videolockercount,
    akcia:state.data_akcia,
    lang:state.lang,
});

const dispatch = dispatch => ({
    replay: tabIndex => dispatch({
        type: 'REPLAY_GAME',
        payload: tabIndex
    }),
    gotogamelist: tabIndex => dispatch({
        type: 'GOTO_GAMELIST',
        payload: tabIndex
    }),
    getgameid: tabIndex => dispatch({
        type: 'GET_GAMELID',
        payload: tabIndex
    }),
    toggleUpgrateTable:newState =>{
        dispatch({type:'TOGGLE_UPGRATE_PRO', payload: newState})
    },
    changeAkciaInfo : newState => {
        dispatch({type:'CHANGE_AKCIA_INFO',payload:newState});
    },
    countForlock: count => dispatch({
        type: 'OPEN_CLOSE_LESSONS',
        payload: count
    }),
    setPromoStatus : newState => {
        dispatch({type:'SET_PROMO_STATUS',payload:newState});
    },
});


export default connect(
    store,
    dispatch
)(OneDayPopUp)
