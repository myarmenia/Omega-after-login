import React, {Component} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import IconButton from 'material-ui/IconButton';
import {connect} from 'react-redux';
import {css} from 'aphrodite/no-important';
import {lang_use_coins, lang} from './langs/lang';

import SertBlock from './rightComponents/sertificate/SertBlock';




let url2 = require(`../images/down.png`);
class PayForCoins extends Component {
    constructor(props) {
        super();
        this.state = {
            changeButton:false,
            unlockWithCoins:false,

            not_passed_levels:0,
            course_levels:0
        }
    }


    payFirstCoins = () =>{

        let oper='unlock_first_level';
        let coins= this.props.receivedCoins;
        let info = `unique_id=${encodeURI(this.props.userProfile.uid)}&operation=${encodeURI(oper)}&coins=${encodeURI(coins)}`;
         //console.log(info, "info_firsttttttttttt")
        fetch(`https://omegacoding.com/android_test/userProgressManager.php`, {
            method: 'POST',
            headers: {
                "Content-type": "application/x-www-form-urlencoded",
                'Accept': 'application/json'
            },
            body: info
        }).then(data => {
            if (data.ok) {
                return data.json();
            }
        }).then(data => {
           // console.log(data,"unlock_first_level");
            if(!data.error){


                this.props.changeUserDCoins(data.coins);
                this.props.close('close');
                this.props.countForlock(this.props.lock*1+1);
                // window.location.reload();
            }



        }).catch(error => {
            console.log(error);
        });
    };

    OpenPriceTable=()=>{
        this.props.show_price_blank('price_blank');
        this.props.togglePriceTable(true);
        this.props.close('buy_diamonds');

    }
    OpenUpgrateTable=()=>{
        this.props.show_price_blank('update_blank');
        this.props.toggleUpgrateTable(true);
        this.props.close('buy_diamonds');

    }

    payForUnlockLevel  = () => {
            let self=this;
            let curr_coins=this.props.userProfile.coins;
            let pay_coins=this.props.receivedCoins;
            let userId = this.props.userProfile.uid;
            let courseId = this.props.current_courseID;
            let level=this.props.current_Level;
            let url = 'https://omegacoding.com/android_test/manageDiamonds.php';
            let url1 = 'https://omegacoding.com/android_test/trial.php';
            let method = 'POST';

        if(courseId ==='css' && level=== 1 && this.props.userProfile.status === 0 ){
            let  trial_date = new Date().toISOString().split('T')[0];
          //  console.log("start----------TRIAL");
            let oper='html_trial';
            let body = "user_id=" + userId + "&operation=" + oper +"&date=" + trial_date;
            fetch(url1, {
                method: method,
                headers: {
                    "Content-type": "application/x-www-form-urlencoded",
                    'Accept': 'application/json'
                },
                body: body
            }).then(res => res.json())
                .then((data) => {
                  //  console.log(data,"html_trial");
                    if(!data.error) {
                        this.props.html_trial('1');
                        this.props.changeUserCreateDate(trial_date);
                        this.props.changeUserTrialDays(3);
                        setTimeout(()=>{
                           self.props.showTrialText('')},1000)

                                           }
                }).catch(error => {
                console.log(error);
            });



        }
        if (+curr_coins >= +pay_coins){
         // console.log("mecaaa")
            let oper='pay_with_coins';
            let body = "user_id=" + userId + "&operation=" + oper + "&count="+pay_coins+"&course_name="+courseId+"&level="+level;

            //console.log(body,"bodybodybody")
            fetch(url, {
                method: method,
                headers: {
                    "Content-type": "application/x-www-form-urlencoded",
                    'Accept': 'application/json'
                },
                body: body
            }).then(res => res.json())
                .then((data) => {

                   // console.log(data);
                    if(!data.error) {
                   setTimeout(()=>{
                       this.props.changeUserDCoins(data.coins);
                       },800

                   );
                   // this.props.changeUserDiamonds(data);
                    this.props.countForlock(this.props.lock*1+1);
                    this.GoBack_forPass();
                    // window.location.reload();
                   }
                }).catch(error => {
                console.log(error);
            });

        }


    };
    payForUnlockNextLevel  = () => {


        let dia = this.props.userProfile.diamonds;
        let need_diamonds = Math.round(this.props.receivedCoins / 300);
        let userId = this.props.userProfile.uid;
        let courseId = this.props.current_courseID;
        let level=this.props.current_Level;
        let url = 'https://omegacoding.com/android_test/manageDiamonds.php';
        let method = 'POST';
           // console.log("poqr");
         //   this.setState({unlockWithCoins:true,changeButton:false})
            if (dia >= need_diamonds) {
                let change = need_diamonds;
                let oper='0';
                let body = "user_id=" + userId + "&operation=" +  oper + "&count="+change+"&course_name="+courseId+"&level="+level;

              //  console.log(body,"bodybodybody")
                fetch(url, {
                    method: method,
                    headers: {
                        "Content-type": "application/x-www-form-urlencoded",
                        'Accept': 'application/json'
                    },
                    body: body
                }).then(data=>{
                  //  console.log(data);
                    if (data.ok) {
                        return data.json();
                    }}
               )
                    .then((data) => {
                 //   console.log(data);
                        if(!data.error) {
                            this.props.addUserDiamonds(data.diamonds);
                            this.props.changeUserDiamonds(data.diamonds);
                            this.props.countForlock(this.props.lock * 1 + 1);
                            this.GoBack_forPass();
                            // window.location.reload();
                        }
                    }).catch(error => {
                    console.log(error);
                });

            }

            else{

                this.setState({changeButton:true})
            }
    };

    GoBack_forPass =()=>{
        this.props.close('close');
    };
    payDiamond =()=>{
        this.props.PayDiamondForHelp5050();
    };

    componentDidMount() {

      if (this.props.courseData !== undefined) {
       // console.log('did mount');
       // console.log('use_coins---->',this.props.courseData);
        // console.log(this.props.current_courseID);
        // console.log(this.props.current_Level);

        // պատրաստում ենք առկա և անցած կարգերի տերբերությունը որ դեռ պետք է անցնի,
        // պահում state-ում (not_passed_levels) փոխանցում SertBlock-կոմպոնենտին
        let allCourses = this.props.courseData;
        let thisCurseName = this.props.current_courseID;
        var regex = new RegExp(thisCurseName, 'i');
        let courseLevels = 0;

        if (thisCurseName !== 'java_script') {
            for (let i = 0; i < allCourses.length; i++) {
                if (allCourses[i].courseName.match(regex)) {
              //    console.log('true-true');
                  courseLevels = allCourses[i].courses;
                }
            }
            if (courseLevels) {
                let not_passed_levels = courseLevels - this.props.lock;
                this.setState({
                  not_passed_levels: not_passed_levels,
                      course_levels: courseLevels
                 });
            }
        }else {
          // հատուկ java_script-ի համար
          this.setState({
                course_levels: 8,
            not_passed_levels: (8-this.props.lock)
          });

        }
      }
    /////// CDM END.
    }




    render() {
        //console.log(this.props.userProfile.diamonds,"this.props.userProfile.uidthis.props.userProfile.uidthis.props.userProfile.uid")

        //let levelsDif = this.state.hasLevels - this.props.lock;
        //console.log(levelsDif);
        // console.log(this.state.hasLevels);
        // console.log(this.state.not_passed_levels);

        // style={{backgroundImage:`url(${url2})` }}
        const trans=lang_use_coins[this.props.lang];
        const trans1=lang[this.props.lang];

        return (

            <div className="container price">
                <div className="row">
                    <div className="col-md-12 col-sm-12">
                        {this.props.open_CoinsModal === 'first_coins'?
                            <div className="coins_details">
                                    <p className="coins">
                                        {trans.unlock_text}
                                        <img src={require(`../images/coin.png`)} className="scoreImg_coin" width="25px" height="25px"
                                             alt="coin" /><span style={{fontSize:'30px', marginLeft:'12px'}}>{this.props.receivedCoins} </span> {trans.coins}  </p>
                                    <button className="button_green" onClick={this.payFirstCoins}> {trans.unlock_btn}
                                    </button>
                        </div>:'' }
                        {this.props.open_CoinsModal==='next_coins'?
                            <div className="coins_details"  >
                                <p className="trial_text">{this.props.userProfile.trial_text}</p>
                                    <p className="coins">
                                        {trans.unlock_text}
                                        <img src={require(`../images/coin.png`)} className="scoreImg_coin" width="25px" height="25px"
                                             alt="coin" /><span style={{fontSize:'30px', marginLeft:'12px'}}>{this.props.receivedCoins} </span> {trans.coins} </p>

                                {+this.props.receivedCoins > +this.props.userProfile.coins?<span>
                                <p style={{fontSize:'14px', letterSpacing: '2px', paddingTop: '12px'}}>
                                    {trans.num_diamonds}</p>

                                {!this.state.changeButton?<button className="button_green"
                                          onClick={this.payForUnlockNextLevel}>  {Math.round(this.props.receivedCoins/300)} {trans.diamond}
                                    <img src={require(`../images/diamond.png`)} className="scoreImg_coin" width="20px" height="20px"
                                         alt="diamond" />
                                </button>:
                                    <button className="button_green" onClick={this.OpenPriceTable}> {trans.store}
                                        <img src={require(`../images/diamond.png`)} className="scoreImg_coin" width="20px" height="20px"
                                             alt="diamond" />
                                    </button>}
                                </span>
                            :''}
                                {+this.props.receivedCoins <= +this.props.userProfile.coins?
                                    <button className="button_green" onClick={this.payForUnlockLevel }> {trans.unlock_btn}
                                    </button>:''}
                                    <SertBlock
                                    not_passed_levels={this.state.not_passed_levels}
                                    passed_levels={this.props.lock}
                                    course_levels={this.state.course_levels}
                                    course_name={this.props.current_courseID}/>

                        </div>:'' }
                        {this.props.open_CoinsModal==='other_coins'?
                            <div className="coins_details" >
                                    <p className="coins">
                                        {trans.pass_prev_levels}
                                    </p>
                                    <button className="button_green" onClick={this.GoBack_forPass}> {trans.close}
                                    </button>
                        </div>:'' }
                        {this.props.open_CoinsModal==='html_next_coins'?
                            <div className="coins_details" >
                                    <p className="coins">
                                        {trans.first_level}
                                    </p>
                                    <button className="button_green" onClick={this.GoBack_forPass}> {trans.close}
                                    </button>
                        </div>:'' }
                        {this.props.open_CoinsModal==='you_cant_leave_comment'?
                            <div className="coins_details" >
                                <p className="coins">
                                    {trans.ask_quest_text}
                                </p>
                                <button className="button_green" onClick={this.OpenUpgrateTable}> {trans1.upg_btn}
                                </button>
                            </div>: '' }
                        {this.props.open_CoinsModal==='Help5050'?
                        <div className="coins_details" >
                            <p className="coins">
                                {this.props.userProfile.diamonds > 0? trans.help:
                                    <span> {trans.have_no_diamonds}</span>
                                }
                            </p>
                            {this.props.userProfile.diamonds > 0 ?
                                <button className="button_green" onClick={this.payDiamond}>
                                    <img src={require(`../images/diamond.png`)} className="scoreImg_coin"
                                         width="20px" height="20px"
                                         alt="diamond"/> 1 {trans.diamond}
                                </button> :
                                <button className="button_green" onClick={this.OpenPriceTable}>
                                    {trans.store}
                                </button>
                            }

                            <button className="button_green" onClick={this.GoBack_forPass}>
                                {trans.close}
                            </button>
                        </div>:'' }
                         {this.props.open_CoinsModal==='FreezeTime'?
                            <div className="coins_details">
                                    <p className="coins">
                                        {trans.freeze_time}
                                    </p>
                                    <button className="button_green" onClick={this.payDiamond}>
                                        <img src={require(`../images/diamond.png`)} className="scoreImg_coin" width="20px" height="20px"
                                             alt="diamond" /> 1 {trans.diamond}
                                    </button>
                                <button className="button_green" onClick={this.GoBack_forPass}>
                                    {trans.close}
                                    </button>
                        </div>:'' }
                        {this.props.open_CoinsModal==='unityDiamond'?
                            <div className="coins_details" >
                                <p className="coins">
                                    {this.props.userProfile.diamonds>0? trans.help:
                                        <span> {trans.have_no_diamonds}</span>
                                    }
                                </p>
                                {this.props.userProfile.diamonds > 0 ?
                                    <button className="button_green" onClick={this.payDiamond}>
                                        <img src={require(`../images/diamond.png`)} className="scoreImg_coin"
                                             width="20px" height="20px"
                                             alt="diamond"/> 1 {trans.diamond}
                                    </button> :
                                    <button className="button_green" onClick={this.OpenPriceTable}>
                                        {trans.store}
                                    </button>
                                }

                                <button className="button_green" onClick={this.GoBack_forPass}>
                                    {trans.close}
                                </button>
                            </div>:'' }

                    </div>






                </div>

            </div>
        )
    }
}

const state = store => ({

    menuState: store.menu,
    userInfoState: store.userInfo,
    userProfile: store.userProfileData,
    mobileMenu: store.mobileMenu,
    mobileMenuActive: store.mobileMenuActive,
    open_CoinsModal:store.open_CoinsModal,
    receivedCoins:store.receivedCoins,
    lock:store.videolockercount,
    current_courseID:store.current_courseID,
    current_Level:store.current_courseLevel,
    game:store.gameInfo,
    lang:store.lang,

});
const dispatch = dispatch => ({
    togglePriceTable: newState => {
        dispatch({type: 'TOGGLE_PRICE_TABLE', payload: newState});
    },
    toggleUpgrateTable:newState =>{
        dispatch({type:'TOGGLE_UPGRATE_PRO', payload: newState})
    },
    toggleNavMenu: newState => {
        dispatch({type: 'TOGGLE_NAV_MENU', payload: newState});
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
    toggleMobileMenu: newState => {
        dispatch({type: 'TOGGLE_MOBILE_MENU', payload: newState});
    },
    addUserDiamonds: newState => {
        dispatch({type: 'CHANGE_DIAMONDS', payload: newState});
    },
    changeUserDiamonds: newState => {
        dispatch({type: 'ADD_USER_DIAMONDS', payload: newState});
    },
    changeUserDCoins: newState => {
        dispatch({type: 'ADD_USER_COINS', payload: newState});
    },
   html_trial:newState =>{
        dispatch({type:'HTML_TRIAL_DAYS', payload: newState})
    },
    changeUserCreateDate:newState =>{
        dispatch({type:'CHANGE_CREATED_AT_DATE', payload: newState})

    },
    changeUserTrialDays: newState => {
        dispatch({type: 'TRIAL_DAYS_OVER', payload: newState});

    },
    showTrialText:  action => dispatch({type:'SHOW_TRIAL_TEXT', payload: action }),
    countForlock:  count => dispatch({type:'OPEN_CLOSE_LESSONS', payload: count }),

});

export default connect(
    state,
    dispatch
)(PayForCoins);
