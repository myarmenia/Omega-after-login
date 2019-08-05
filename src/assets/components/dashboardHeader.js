import React, {Component} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import IconButton from 'material-ui/IconButton';
import {connect} from 'react-redux';
import {css} from 'aphrodite/no-important';
import '../styles/price_style.css';

import Competition from '../components/rightComponents/competition';
import {lang}from './langs/lang';

let trial=require(`../images/trial.png`);
let last_n = '';
let first_n = '';
let icon= false;

    class Header extends Component {
    constructor(props) {
        super();
        this.state = {
            mainScore: 0,
            requestIsDone: false,
            currentDiamonds: null,
            diamonds: null,
            coins: null,
            userr: props.user,
            lastname: '0',
            firstname: '0',
            show_price_blanck:false,
            date:'',
            uid: null,

                   }
    }

    /*calcTrialDays=(e)=>{
        let today=new Date();
        let  d = new Date(e);
        let one_day=1000*60*60*24;
        if(Math.ceil((today.getTime()-d.getTime())/(one_day))<=3){
            if(Math.ceil((today.getTime()-d.getTime())/(one_day)) === 3){

                return 'today';
            }
          else{

                return 'after'+ 3 - Math.ceil((today.getTime() - d.getTime()) / one_day) + ' days'
            }
        }

        console.log(Math.ceil((today.getTime() - d.getTime()) / one_day),"eeeeeeeeeeeee")

    }*/
    calculateDays =(a,uid)=>{
      //  console.log(uid,"uidddddddddddddddd")

        let today=new Date();
        let  d = new Date(a);
        let one_day=1000*60*60*24;
       // console.log(Math.ceil((d.getTime()-today.getTime())/(one_day),"Math.ceil((d.getTime()-today.getTime())/(one_day)"))
        if(Math.ceil((d.getTime()-today.getTime())/(one_day))>0){
            return Math.ceil((d.getTime()-today.getTime())/(one_day))
         }
         else{


                if (this.props.userProfile.status !== 0 && uid !== undefined){
                   /* let u_id =`uid_expired=${encodeURI(uid)}`;
                    console.log(u_id,"uiduiduiduiduiduiduiduiduiduid1111")
                    fetch(`https://omegacoding.com/android_test/login.php`,{
                        method:'POST',
                        headers:{"Content-type":"application/x-www-form-urlencoded",'Accept':'application/json'},
                        body: u_id
                    }).then(response => {
                        if(response.ok){
                            return response.json();
                        }
                    }).then(response => {

                        if (response){
                            console.log(response,"response");
                            this.props.changeUserStatus(0);
                            window.location.replace("https://omegacoding.com/dashboard")
                        }


                    }).catch( error => {
                        console.log(error,"error");
                    });*/


                }


        }
    };
        componentWillMount() {

       //console.log(this.props.user, "will");
        this.setState({
            requestIsDone: true,
            userr: this.props.user,
            lastname: this.props.user.last_name,
            firstname: this.props.user.name,

        });

        this.setState({currentDiamonds: this.props.getDiamonds});
        if (window.innerWidth <= 498) {
            this.props.changeMenuType(true);
        }
        else {
            this.props.changeMenuType(false);
        }
        window.onresize = () => {
            // console.log(window.innerWidth)
            if (window.innerWidth <= 498) {
                this.props.changeMenuType(true);
            }
            else {
                this.props.changeMenuType(false);
            }
        }


    }
    toggleMenu = () => {
        this.props.toggleNavMenu(!this.props.menuState);

    };

    showInfo = () => {
        this.props.toggleUserInfo(!this.props.userInfoState);
    };

    buy_diamonds = () => {

      this.props.show_price_blank('price_blank');
      this.props.togglePriceTable(true)

    };
        open_trial_info =()=>{
            this.props.show(false)
        }

    mobileMenuToggle = () => {
        //console.log('alo eghav ?')
        this.props.toggleMobileMenu(!this.props.mobileMenuActive)
    };
        openUpgrateWindow=()=>{
            let conf =  window.confirm('Your free trial has expired, please reload the page and purchase one of the packages.');
            if (conf){
                window.location.reload();
            }
            else {
                window.location.reload();
            }
        };

        OpenUpgrateTable=()=>{
            this.props.show_price_blank('update_blank');
            this.props.toggleUpgrateTable(true);
            //if (this.props.akcia.active){
            //    this.props.changeAkciaInfo({error:false, active:false})
           /// }


        };


        componentWillReceiveProps(nextProps) {

        this.setState({
            currentDiamonds: nextProps.getDiamonds,
            userr: nextProps.user,
            lastname: nextProps.user.last_name,
            firstname: nextProps.user.name,

        });


    }

    checkUserIdIsLoaded=()=> {
        let {uid} = this.props.userProfile;
        if (uid) {
            return <Competition />;
        }
        // {this.props.userProfile.uid&&
        //     <Competition/>
        // }
    };



        render() {
//            console.log(this.props.userProfile.have_promo ,"ww.props.userProfile.statusthis.props.userProfile.status")
            const trans = lang[this.props.lang];
        //console.log(this.props.userProfile.created_at,"this.props.userProfile.created_atthis.props.userProfile.created_atthis.props.userProfile.created_at")
       // console.log(this.props.userProfile.coins,"this.props.userProfile.coins")
       // console.log(this.props.userProfile.diamonds,"this.props.userProfile.diamonds")
        if (this.props.userProfile.firstname !== undefined) {
            last_n= this.props.userProfile.lastname.slice(0, 1);
            first_n= this.props.userProfile.firstname.slice(0, 1);
            icon=false;
        }
        else {
            icon=true;
        }

        return (


            <div className="header">                
                <MuiThemeProvider>
                    <IconButton onClick={this.props.mobileMenu ? this.mobileMenuToggle : this.toggleMenu}>
                        <i className="material-icons menuIcon">menu</i>

                    </IconButton>
                </MuiThemeProvider>

                {/*<div style={{display:this.props.userProfile.status === 0 && !this.props.userProfile.trial_over && this.props.userProfile.html_trial === '1' ?'block':'none'}}>*/}

                    {/*{this.props.lang==='eng'?'Trial Time Remaining':'Դեմո տարբերակի ավարտին մնացել է'} <span id="remainingTime"></span>*/}
                    {/*</div>*/}
                {/*<i className="material-icons" style={{marginLeft:'12px',fontSize:'30px', cursor:'pointer', display:this.props.userProfile.have_promo   ?'none':'block' }} onClick={this.props.userProfile.have_promo?'':this.open_trial_info} title="To activate the promo-code ">info</i>*/}
                {/*{this.checkUserIdIsLoaded()}    */}
                <MuiThemeProvider>
                    <div className="headerButtons">

                        <div className="flex">


                            {/*<div className="trial_icon" style={{display:this.props.userProfile.status === 0 && !this.props.userProfile.trial_over && this.props.userProfile.html_trial === '1' ?'block':'none', left:this.props.lang==='eng'?'83%':'88%' }}>*/}
                                {/*<img src={trial} width="48" title={this.props.lang === 'eng'?`Your trail period will be expire after ${this.props.userProfile.trial_days} days`:*/}
                                    {/*`Ձեր փորձաշրջանը կավարտվի ${this.props.userProfile.trial_days} օրից`} /></div>*/}

                        <div className="day-count" style={{display:this.props.userProfile.status === 0?'none':'block',left:this.props.userProfile.status === 0?'33%':'78%',
                            backgroundColor:this.props.userProfile.status === '1'?'#ffd400':this.props.userProfile.status === '2'?'#fa6e6f':'#05AEA7'}}
                             title={this.props.userProfile.status === '1'?'BASIC':this.props.userProfile.status === '2'?'STANDARD':'PREMIUM'}>

                                   <span className="padding-5px-3px"> {this.props.userProfile.status === 0?null:this.calculateDays(this.props.userProfile.pro_date, this.state.userr.uid)} </span></div>
                        <div className="margin-19px">
                            <button className="button_blue width" title={this.props.userProfile.status === 0 ? trans.upg_btn:`${trans.paks_day_info} ${this.calculateDays(this.props.userProfile.pro_date, this.state.userr.uid )} ${trans.days} `}
                                    onClick={!this.props.userProfile.trial_over?this.OpenUpgrateTable:this.openUpgrateWindow}>
                     {this.props.userProfile.status === '1'?'BASIC':this.props.userProfile.status === '2'?'STANDARD':this.props.userProfile.status === '3'?'PREMIUM':trans.upg_btn} </button>
                        </div>

                        </div>
                        <p className="mainScore new_d" title={this.props.lang === 'eng'?'your diamonds':'ձեր ադամանդները'} >
                            <img src={require('../images/plus_button.png')}  onClick={!this.props.userProfile.trial_over?this.buy_diamonds:this.openUpgrateWindow} className="scoreImg" width="23px" height="23px"
                                 alt="plus_button" title = {this.props.lang === 'eng'?'add Diamonds':'ավելացնել ադամանդներ'} style={{top: '-11px',position: 'relative',cursor:'pointer', left: '90%'}}  />
                            <img src={require('../images/diamond.png')} className="scoreImg" width="28px" height="27px" style={{position:'relative',
                                left: '-20px', top: '-1px'}} alt="diamond"/> <span className="span_d" >{ this.state.currentDiamonds === false ? this.props.userProfile.diamonds+' ' : this.props.userProfile.diamonds+' '} </span>
                         </p>
                        <p className="mainScore new_c"  title={this.props.lang === 'eng'?'your coins':'ձեր մետաղադրամները'} >
                            <img src={require('../images/coin.png')} className="scoreImg" width="27px" height="27px" style={{position:'relative',
                                left: '-4px', top: '-1px'}} alt="coin"/> <span className="span_c" >{this.props.userProfile.coins === undefined?this.props.userProfile.coins+' ':this.props.userProfile.coins+' '}</span>
                        </p>

                        {/*<IconButton>
                            <i className="material-icons menuIcon">mail_outline</i>
                        </IconButton>
                        <IconButton >
                            <i className="material-icons menuIcon">notifications_none</i>
                        </IconButton>*/}
                        {icon?
                            <span>
                                  <div className="info_letters_Icon"  > <span style={{width:'100%',position:'relative', potextTransform: 'uppercase'}}> </span></div>
                                {/* <IconButton>
                            <i className="material-icons menuIcon" onClick={this.showInfo}>account_circle</i>
                            </IconButton>*/}
                        </span>:
                            <div className="info_letters_Icon"  onClick={!this.props.userProfile.trial_over?this.showInfo:this.openUpgrateWindow}> <span style={{width:'100%',position:'relative', potextTransform: 'uppercase'}} >{first_n}{last_n}</span></div>
                        }


                    </div>
                </MuiThemeProvider>
            </div>
        );
    }
}

const state = store => ({
    menuState: store.menu,
    userInfoState: store.userInfo,
    userProfile: store.userProfileData,
    mobileMenu: store.mobileMenu,
    mobileMenuActive: store.mobileMenuActive,
    lang:store.lang,
    akcia:store.data_akcia
});
const dispatch = dispatch => ({
    toggleNavMenu: newState => {
        dispatch({type: 'TOGGLE_NAV_MENU', payload: newState});
    },
    togglePriceTable: newState => {
        dispatch({type: 'TOGGLE_PRICE_TABLE', payload: newState});
    },
    toggleUserInfo: newState => {
        dispatch({type: 'TOGGLE_USER_INFO', payload: newState});
    },
    changeMenuType: newState => {
        dispatch({type: 'CHANGE_MENU_TYPE', payload: newState});
    },
    activeMenu: newState => {
        dispatch({type: 'ACTIVE_MENU', payload: newState});

    },
    changeUserStatus: newState => {
        dispatch({type: 'CHANGE_USER_STATUS', payload: newState});

    },
    toggleMobileMenu: newState => {
        dispatch({type: 'TOGGLE_MOBILE_MENU', payload: newState});
    },
    toggleUpgrateTable:newState =>{
        dispatch({type:'TOGGLE_UPGRATE_PRO', payload: newState})
    },
    changeAkciaInfo : newState => {
        dispatch({type:'CHANGE_AKCIA_INFO',payload:newState});
    },
});

export default connect(
    state,
    dispatch
)(Header);