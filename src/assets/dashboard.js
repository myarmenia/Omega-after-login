import React, { Component } from 'react';
import './styles/main.css';
import LeftSide from './components/leftSide';
import RightSide from './components/rightSide';
import { connect } from 'react-redux';
import LeftSideArm  from './components/leftSide_arm'
import Popupwindow from './components/rightComponents/notepadGame/Popupwindow';
import Competition from './components/rightComponents/competition';
import OneDayPopUp from './components/oneDayTrialPopUp';

import Cookies from 'universal-cookie';
let cookies = new Cookies();

let diamonds=0, coins=0;
let one_day=1000*60*60*24;
class App extends Component {
    constructor(){
        super();
        this.state={
            show:true,

  //cooke:'5b616f25d78135.29486123',
    // cooke:"5c13899cd8e5c2.99580371",
    // cooke:"5c1e18e5581cc1.91327825",
   //cooke:"5bd414c1d433d1.73142038",
   // cooke:"5d0ce92214c2d4.30596734",
    // cooke:"5c8b876d2e4579.71915304",
   //cooke:"5c99d6403fe329.47629418",
  cooke:'',

        user:'',
            demo:false,
            daily_dia:'',
            daily_coins:'',

        }
    }

    show_24_hours_board =(e)=>{
        this.setState({
            show:e
        })

    }

    redirect =()=>{
        window.location.href = "https://omegacoding.com";

    }

    getCookie = (name) => {
        if ( name === 'logon'){
            let matches = document.cookie.match(new RegExp(
                "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
            ));
            const cook = matches ? decodeURIComponent(matches[1]) : undefined;
            return this.setState({cooke: cook})
        }
        else if(name === 'lang'){

            let matches = document.cookie.match(new RegExp(
                "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
            ));
            const lang = matches ? decodeURIComponent(matches[1]) : 'eng';
            this.props.changePageLang(lang);

        }

    };
    popUpWindow=(data)=>{

        let login_date=this.props.userProfile.login_date;
        let today=new Date(login_date);
        let ipay_date=data.ipay_date;

        if (ipay_date !==  null){
            let  d = new Date(ipay_date);
             if(((today.getTime()-d.getTime())/one_day) >= 1){
                        //console.log(Math.ceil((today.getTime()-d.getTime())/(one_day)),"popUp_YES")
                        //console.log(this.props.userProfile.status, "user_status")
                        this.setState({
                            daily_dia:data.diamonds,
                            daily_coins:data.coins,
                            demo:true,
                        });
                    }
                    else{


                       //  console.log(Math.ceil((today.getTime()-d.getTime())/(one_day)),"popUp_NO")
                    }
          }



    };
    getDailydiamonAndCoins =(data)=>{
            let info =`package=${encodeURI(data)}`;
            fetch(`https://omegacoding.com/android_test/userProgressManager.php`,{
                method:'POST',
                headers:{"Content-type":"application/x-www-form-urlencoded",'Accept':'application/json'},
                body: info
            }).then(response => {
                if(response.ok){
                    return response.json();
                }
            }).then(response => {
               // console.log(response,"responseinfo");
                if(!response.error){
                    let daily_obj ={
                        diamonds:response.diamonds,
                        coins:response.coins,
                        ipay_date:this.props.userProfile.ipay_date
                    };
                    setTimeout(()=>{
                        this.popUpWindow(daily_obj)
                    },500)
                }
            }).catch( error => {
                console.log(error,"error");
            });
    };
  parseMillisecondsIntoReadableTime =(milliseconds)=>{
    //Get hours from milliseconds
      let hours = milliseconds / (1000*60*60);
      let absoluteHours = Math.floor(hours);
      let h = absoluteHours > 9 ? absoluteHours : '0' + absoluteHours;

    //Get remainder from hours and convert to minutes
      let minutes = (hours - absoluteHours) * 60;
      let absoluteMinutes = Math.floor(minutes);
      let m = absoluteMinutes > 9 ? absoluteMinutes : '0' +  absoluteMinutes;

    //Get remainder from minutes and convert to seconds
      let seconds = (minutes - absoluteMinutes) * 60;
      let absoluteSeconds = Math.floor(seconds);
      let s = absoluteSeconds > 9 ? absoluteSeconds : '0' + absoluteSeconds;

    //return h + ':' + m + ':' + s;
    return 24*3600-(h*3600 + m*60 +s/60);
    }
    Timer=(duration, display)=>
        {

            let timer = duration, hours, minutes, seconds;
            let time_inter = setInterval(function () {
               // console.log (timer)
                if (timer < 0){

                    clearInterval(time_inter);
                    setTimeout(()=>{window.location.reload()},100)
                }
                hours = parseInt((timer /3600)%24, 10)
                minutes = parseInt((timer / 60)%60, 10)
                seconds = parseInt(timer % 60, 10);

                hours = hours < 10 ? "0" + hours : hours;
                minutes = minutes < 10 ? "0" + minutes : minutes;
                seconds = seconds < 10 ? "0" + seconds : seconds;

                display.textContent= hours +":"+minutes + ":" + seconds;

                --timer;
            }, 1000);
        }
    getInfoforUser =(data)=>{
            let uid =`unique_id=${encodeURI(data)}`;
            fetch(`https://omegacoding.com/android_test/login.php`,{
                method:'POST',
                headers:{"Content-type":"application/x-www-form-urlencoded",'Accept':'application/json'},
                body: uid
            }).then(response => {
                if(response.ok){
                    return response.json();
                }
            }).then(response => {
             // console.log(response,"response"); // user-info, akcia, coutry-data, project_order_id
                if(!response.error){

                    this.props.addUserData(response.user);
                    this.props.addAkciaInfo(response.akcia);
                    this.props.setCourseName(response.user.cname);
                    if(response.user.status){
                        this.props.setPromoStatus('have')
                    }
                    this.setState({
                        user:response.user
                    });
                    localStorage.setItem('logon', response.user.uid);
                    if (this.props.userProfile.status !== 0 &&  response.user.login_date !== response.user.ipay_date){
                        let today=new Date();
                        let  d = new Date(response.user.pro_date);
                        let one_day=1000*60*60*24;
                      if((d.getTime()-today.getTime())/one_day >= 1) {
                          this.getDailydiamonAndCoins(this.props.userProfile.status);
                      }
                     else {

                           let u_id =`uid_expired=${encodeURI(data)}`;
                         //  console.log(u_id,"uiduiduiduiduiduiduiduiduiduid1111")
                           fetch(`https://omegacoding.com/android_test/login.php`,{
                           method:'POST',
                           headers:{"Content-type":"application/x-www-form-urlencoded",'Accept':'application/json'},
                           body: u_id
                           }).then(response => {
                              // console.log(response,"AAAAAAAAAAaaresponse_ggggggggggggggggg");
                           if(response.ok){
                           return response.json();
                           }
                           }).then(response => {

                           if (!response.error){
                          // console.log(response,"response_ggggggggggggggggg");
                           this.props.changeUserStatus(0);
                         // window.location.replace("https://omegacoding.com/dashboard")
                           }}).catch( error => {
                           console.log(error,"error");
                           });

                      }
                    }
                    else if(this.props.userProfile.status === 0 && response.user.html_trial === '1'  ) {
                       //
                       //  if(this.props.userProfile.have_promo){
                       //      this.setState({
                       //          show:true
                       //      })
                       //  }
                       //  else{
                       //      this.setState({
                       //          show:false
                       //      })
                       //  }
                       //  let  login_date = new Date(response.user.login_date);
                       //  let  crated_at = new Date(response.user.created_at);
                       //  let  crated_at_full = new Date(response.user.created_at_full);
                       // // console.log(crated_at_full,"crated_at_full")
                       //  let  now = new Date(response.user.time);
                       // //console.log(now,"now")
                       //  //console.log(now - crated_at, " login_date - crated_at login_date - crated_at")
                       //  let time = this.parseMillisecondsIntoReadableTime(now - crated_at_full);
                       //
                       //
                       //
                       // // var twentyFourHours = 24 * 60 * 60;
                       //
                       //
                       //  let days=(login_date - crated_at)/one_day;
                       //  //days > 1 if-i paymanna
                       //  if( time <0){
                       //
                       //      this.props.toggleUpgrateTable(true);
                       //      this.props.trial_over(true);
                       //
                       //      }
                       //      else{
                       //      let twentyFourHours =time;
                       //      let display = document.getElementById('remainingTime');
                       //      this.Timer(twentyFourHours, display);
                       //
                       //      if(days <= 1){
                       //          if( days === 1){
                       //
                       //                  this.props.changeUserTrialDays(0);
                       //
                       //
                       //
                       //          }
                       //          else{
                       //              //let p = 3 - days;
                       //              let p = 0;
                       //
                       //                 this.props.changeUserTrialDays(p);
                       //          }
                       //
                       //
                       //      }
                       //
                       //
                       //  }
                    }

                }
            }).catch(error => {
                console.log(error,"error");
            });

        }



    componentWillMount() {
       this.props.changePage(0);
        this.getCookie('logon');
        this.getCookie('lang');
        if (this.state.cooke){
            //console.log(this.state.cooke,"cooke");
            this.getInfoforUser(this.state.cooke);
        }
      document.body.style.overflowX = 'hidden';
    }

    componentDidMount() {
        this.getCookie('logon');
        if (this.state.cooke){
            //  console.log(this.state.cooke,"cooke");
            this.getInfoforUser(this.state.cooke);
        }
       this. getQueryString();


    }



    getQueryString=()=>{
        let Purl = new URL(window.location.href);
        // console.log(Purl);

        let path = Purl.pathname; // dashboard
        let cid = Purl.searchParams.get('cid'); // course id
        let lid = Purl.searchParams.get('lid');
        let gameType = Purl.searchParams.get('gt'); // (type)
        let gameId = Purl.searchParams.get('gid'); // (id)
        let mode = Purl.searchParams.get('mode'); // single - multi
            mode = this.setMode(mode);
        let tmp = Purl.searchParams.get('tmp'); // uid
        let purlString = Purl.toString(); // pull url as string

        // console.log(purlString);
        // console.log('path ->',path);
        // console.log('gameType-> ',gameType);
        // console.log('path ->',gameId);
        // console.log('mode-> ', mode);
        // https://omegacoding.com/dashboard/?cid=1&lid=1&gt=3&gid=3&tmp=5bd414c1d433d1.73142038

          if (localStorage.getItem('purlObj')) {
           // console.log(JSON.parse( localStorage.getItem('purlObj') ));
            this.props.getUnityDesktop(JSON.parse( localStorage.getItem('purlObj') ));
            setTimeout(()=>{
              localStorage.removeItem('purlObj');
            },1000);
          }

          if (path === '/dashboard/' && this.notEmpltyIsNumber(cid) && this.notEmpltyIsNumber(lid)
              && this.notEmpltyIsNumber(gameType) && this.notEmpltyIsNumber(gameId) && tmp) {

              let d = new Date();
              d.setTime(d.getTime() + (43200 * 60 * 1000));
              cookies.set('logon', tmp, { path: '/' , expires: d, domain: '.omegacoding.com',})

              let purlObj = new Object();
              purlObj.cid = cid;
              purlObj.lid= lid;
              purlObj.gameType = gameType;
              purlObj.gameId = gameId;
              purlObj.mode = mode;

              localStorage.setItem('purlObj', JSON.stringify(purlObj) );
              // console.log('ancav an-cav')
              // this.props.getUnityDesktop(purlObj);
          }
    }

    notEmpltyIsNumber =(num)=> {
        num = parseInt(num)
        if(!isNaN(num) && num !== null) {
          return true
        }else{
          return false
        }
    }

    setMode=(mode)=> {
        if(mode==='true') return true;
        return false;
    }
    close_price_board=(e)=>{

          this.show_24_hours_board(true)
          let it=this;
          setTimeout(()=>
              {
                  let coins_blank=document.getElementById('upgrate_blank');
                  coins_blank.addEventListener('click',function(){
                      coins_blank.classList.add("animated", "fadeOut");
                      setTimeout(()=>{
                          it.props.toggleUpgrateTable(false);

                      }, 100)
                  })
              },300
          )



    };

    render() {
//     console.log(this.props.userProfile.have_promo ,"this.props.userProfile.have_prom")
        return (
            <div>

            {
                this.state.demo &&
                <Popupwindow  daily_diamonds={this.state.daily_dia} daily_coins={this.state.daily_coins} />
            }

                { this.state.cooke &&
                <div className="wrap-mainContainer">
                    <div className="mainContainer">
                        {this.state.show ? null :
                            <OneDayPopUp show={this.show_24_hours_board} close_price_blank={this.close_price_board}/>}
                        <div className="left mainItems" style={{width: this.props.menuState ? '5%' : '17%'}}>
                            <LeftSide langProps={this.props.lang}/>
                        </div>
                        <div className="right mainItems" style={{width: this.props.menuState ? '95%' : '83%'}}>

                            <RightSide history={this.props.history} show={this.show_24_hours_board}
                                       userInfo={this.state.user}/>
                        </div>
                    </div>
                </div>
                }


                {  (this.state.cooke === undefined) &&
                <div>
                    {
                        this.redirect()
                    }
                </div>

                }

         </div>
        )
    }
}


const state = store => ({
    menuState:store.menu,
    lang:store.lang,
    userProfile: store.userProfileData,

});

const dispatch = dispatch => ({
    addUserData : newState => {
        dispatch({type:'ADD_USER_INFO',payload:newState});
    },
    addAkciaInfo : newState => {
        dispatch({type:'ADD_AKCIA_INFO',payload:newState});
    },
    toggleUpgrateTable:newState =>{
        dispatch({type:'TOGGLE_UPGRATE_PRO', payload: newState})
    },
    trial_over:newState =>{
        dispatch({type:'CHANGE_TRIAL_DAYS', payload: newState})
    },
    getFbImage : newState => {
        dispatch({type:'GET_FB_IMG_URL',payload:newState});
    },
    changePage : newState => {
        dispatch({type:'CHANGE_PAGE',payload:newState});
    },
    changePageLang : newPage => { dispatch({type : 'CHANGE_PAGE_LANGUAGE', payload : newPage})},
    setCourseName:  newState =>{
        dispatch({type:'SET_COURSE_NAME', payload: newState });
    },
    changeUserStatus: newState => {
        dispatch({type: 'CHANGE_USER_STATUS', payload: newState});

    },
    changeUserTrialDays: newState => {
        dispatch({type: 'TRIAL_DAYS_OVER', payload: newState});
    },
    getUnityDesktop: newState => {
        dispatch({ type: 'GET_UNITY_DESKTOP', payload: newState});
    },
    setPromoStatus : newState => {
        dispatch({type:'SET_PROMO_STATUS',payload:newState});
    },

});

export default connect(
    state,
    dispatch
)(App);
