import React, { Component } from 'react';
import { connect } from 'react-redux';
import { css } from 'aphrodite/no-important';
import styles from '../styles/styles';
import { push } from 'react-router-redux';
//import Training from './rightComponents/training';
//import {Message, Unity}  from 'react-unity-webgl';


import GoogleAdsense from './rightComponents/alphabetGame/GoogleAdsense';



let Menu_text;
let obj2;


class LeftSide extends Component{
    constructor(){
        super();
        this.paths = ['/courses','/orders','/statistics','/settings', '', '','/ratings', '/suggestions'];
    }

    openUpgrateWindow=()=>{
      let conf =  window.confirm('Your free trial has expired, please reload the page and purchase one of the packages.')
        if (conf){
            window.location.reload();
        }
        else {
            window.location.reload();
        }
    };


    changePage = (event) => {
           let page = event.target.id*1;
         //  console.log(page,"pageeeeeeee");
           let menu_key = 'item_' + page;

           if(page == 1 || page == 7){
               let oper=2;
               let lockLessons = `unique_id=${encodeURI(this.props.userProfile.uid)}&operation=${encodeURI(oper)}&course_name=${encodeURI('java_script')}`;
               //console.log(lockLessons, "-info2_leftside");
               fetch(`https://omegacoding.com/android_test/userProgressManager.php`,{
                   method:'POST',
                   headers:{"Content-type":"application/x-www-form-urlencoded",'Accept':'application/json'},
                   body: lockLessons
               }).then(response => {
                   if(response.ok){
                       return response.json();
                   }
               }).then(response => {
                  // console.log(response, "response lockLessons");
                   obj2=response.length *1;

                   //console.log(obj2,"2019_obj")
                   if(obj2>0){
                       this.props.toggleNavMenu(true);
                       //this.props.navigateTo(this.paths[1] + '?' +this.props.userProfile.course_lift[`${this.props.current_courseID}`]+'&'+this.props.current_courseID);
                       this.props.navigateTo(this.paths[1] + '?' +this.props.userProfile.off_level);

                       this.props.togglePriceTable(false);
                       this.props.showCoinsModal('');
                       this.props.changeSubMenu('levels');
                       this.props.toggleUserInfo(false);
                       this.props.gotogamelist(event);
                       this.props.changegameActiveTab(0);
                       this.props.activeMenu(false);
                       this.props.changePage(page);

                   }
                   else if(obj2 === 0){
                       if(page ==7){
                           this.props.changePage(8);

                       }
                       else{
                           this.props.changePage(5);

                       }
                       this.props.changeSubMenu('levels');
                       this.props.toggleNavMenu(true);
                   }
               }).catch(error => {
                   console.log(error);
               });


           }
           // else if (page == 6) {
           //   this.props.navigateTo(this.paths[page]);
           //   this.props.changePage(6);
           // }
           else{
               this.props.navigateTo(this.paths[page]);
               this.props.togglePriceTable(false);
               this.props.showCoinsModal('');
               this.props.changeSubMenu('levels');
               this.props.toggleUserInfo(false);
               this.props.gotogamelist(event);
               this.props.changegameActiveTab(0);
               this.props.activeMenu(false);
               this.props.changePage(page);
           }

           // console.log(page);
           // let menuItems = Object.values(this.refs);
           // // console.log(menuItems); // arm
           // menuItems[event.target.id].style.backgroundColor = 'rgba(33, 139, 154, 0.6)';
           // for(let i = 0; i < menuItems.length; ++i){
           //     // console.log(menuItems[i]);
           //     if(page !== i){
           //         menuItems[i].style.backgroundColor = 'rgba(0, 0, 0, 0)';
           //     }
           // }

           // console.log('page = ',page);
           // console.log('menu_key = ',menu_key);
           let menuUL = this.refs;
           for (var variable in menuUL) {
             if (menuUL.hasOwnProperty(variable)) {
               if (variable === menu_key) {

                 //menuUL[menu_key].style.backgroundColor = 'rgba(33, 139, 154, 0.6)';
                 menuUL[menu_key].style.backgroundColor = 'rgba(0, 72, 121, 0.79)';
                 // console.log(menuUL[menu_key],' - this is');
               }else{
                 menuUL[variable].style.backgroundColor = 'rgba(0, 0, 0, 0)';
                 // console.log(variable);
               }
             }
           }

    };
    goHome = () => {
        this.props.toggleUserInfo(false);
        this.props.changePage(0);
        this.props.navigateTo(this.paths[0]);
        this.props.changeSubMenu('levels');
       // console.log("go home---->")
    };
    changeUnity = (event) => {
        let page = event.target.id*1
     // console.log(page,"changeUnitychangeUnitychangeUnitychangeUnity");

        //let self=this;
      //self.changePage();
    };
//css(styles.smallLogo)

    componentWillMount(){
        this.setState({lang:this.props.langProps});
        if (this.props.langProps=== 'arm'){
            fetch('https://omegacoding.com/android_test/json_am/after_login_text_am.json', {
                    method:'POST',
                    headers:{"Content-type":"application/x-www-form-urlencoded",'Accept':'application/json'},
                }

            )   .then( response => response.ok ? response.json(): "Something went wrong")
                .then( response => {
                   // console.log(response.menu,"menu_am");
                    Menu_text=response.menu;
                    this.setState({
                        homeText:response.menu
                    })

                }).catch(error => {
               console.log(error,"navigationIconsText_am");
            })
        }
        else if (this.props.langProps === 'eng' || this.props.langProps === ''){
            fetch('https://omegacoding.com/android_test/json_am/after_login_text_en.json', {
                    method:'POST',
                    headers:{"Content-type":"application/x-www-form-urlencoded",'Accept':'application/json'},
                }
            )   .then( response => response.ok ? response.json(): "Something went wrong")
                .then( response => {
                   //console.log(response.menu,"menu");
                    Menu_text=response.menu;
                    this.setState({
                        homeText:response.menu
                    })
                }).catch(error => {
                console.log(error,"navigationIconsText_eng");
            })
        }
    }

    componentWillReceiveProps(props){
        this.setState({lang:props.langProps});
        if (props.langProps=== 'arm'){
            fetch('https://omegacoding.com/android_test/json_am/after_login_text_am.json', {
                    method:'POST',
                    headers:{"Content-type":"application/x-www-form-urlencoded",'Accept':'application/json'},
                }

            )   .then( response => response.ok ? response.json(): "Something went wrong")
                .then( response => {
                   // console.log(response.menu,"menu_am");
                    Menu_text=response.menu;
                    this.setState({
                        homeText:response.menu
                    })

                }).catch(error => {
                console.log(error,"navigationIconsText_am");
            })
        }
        else if (props.langProps === 'eng' || props.langProps === ''){
            fetch('https://omegacoding.com/android_test/json_am/after_login_text_en.json', {
                    method:'POST',
                    headers:{"Content-type":"application/x-www-form-urlencoded",'Accept':'application/json'},
                }
            )   .then( response => response.ok ? response.json(): "Something went wrong")
                .then( response => {
                    //console.log(response.menu,"menu");
                    Menu_text=response.menu;
                    this.setState({
                        homeText:response.menu
                    })
                }).catch(error => {
                console.log(error,"navigationIconsText_eng");
            })
        }
    }

    render(){
        // console.log(Menu_text,"Menu_text");

        const windowHeight = () => {
            return window.innerHeight;
        };

        // , backgroundColor: this.props.active?'rgb(5, 49, 96)': ''


        return(
          <div className="leftSideContainer" style={{height:windowHeight()}}>
              <div className={this.props.menuState  ? ' logo logo_small': 'logo'}  style={{cursor:'pointer',marginBottom: '4px'}}  onClick={this.goHome} />
              <div className="menuContainer">
                <ul className="menuList">

                     <li className="menuItem" ref="item_0" id="0" style={{justifyContent:this.props.menuState ? 'center' : '' }}
                         onClick={!this.props.userProfile.trial_over?this.changePage:this.openUpgrateWindow}>
                          <span className="menuItemIcon" id="0">
                              <i className="material-icons" id="0">class</i>
                          </span>
                          <span className={`menuItemText ${this.props.menuState ? css(styles.menuItems): ''}`} id="0" >
                              {Menu_text!==undefined?Menu_text[0].text:''}
                          </span>
                      </li>
                      <li className="menuItem" ref="item_1" id="1" style={{justifyContent:this.props.menuState ? 'center' : '' }}
                          onClick={!this.props.userProfile.trial_over?this.changePage:this.openUpgrateWindow}>
                          <span className="menuItemIcon" id="1">
                             <i className="material-icons" id="1">videogame_asset</i>
                          </span>
                          <span className={`menuItemText ${this.props.menuState ? css(styles.menuItems): ''}`} id="1" >
                          {Menu_text!==undefined?Menu_text[1].text:''}
                          </span>
                      </li>
                      <li className="menuItem" ref="item_2" id="2" style={{justifyContent:this.props.menuState ? 'center' : '' }}
                          onClick={!this.props.userProfile.trial_over?this.changePage:this.openUpgrateWindow}>
                          <span className="menuItemIcon" id="2">
                             <i className="material-icons" id="2">trending_up</i>
                          </span>
                          <span className={`menuItemText ${this.props.menuState ? css(styles.menuItems): ''}`} id="2" >
                             {Menu_text!==undefined?Menu_text[2].text:''}
                          </span>
                      </li>


                      <li className="menuItem" ref="item_6" id="6" style={{justifyContent:this.props.menuState ? 'center' : ''}}
                          onClick={!this.props.userProfile.trial_over?this.changePage:this.openUpgrateWindow} >
                          <span className="menuItemIcon" id="6">
                            <i className="material-icons" id="6">stars</i>
                          </span>
                          <span className={`menuItemText ${this.props.menuState ? css(styles.menuItems): ''}`} id="6" >
                       {Menu_text!==undefined?Menu_text[4].text:''}
                          </span>
                      </li>

                      <li className="menuItem" ref="item_7" id="7" style={{justifyContent:this.props.menuState ? 'center' : ''}}
                          onClick={!this.props.userProfile.trial_over?this.changePage:this.openUpgrateWindow} >
                          <span className="menuItemIcon" id="7">
                            <i className="material-icons" id="7">work_outline</i>
                          </span>
                          <span className={`menuItemText ${this.props.menuState ? css(styles.menuItems): ''}`} id="7" >
                       {Menu_text!==undefined?Menu_text[5].text:''}
                          </span>
                      </li>

                    <li className="menuItem" ref="item_3" id="3" style={{justifyContent:this.props.menuState ? 'center' : ''}}
                        onClick={!this.props.userProfile.trial_over?this.changePage:this.openUpgrateWindow} >
                          <span className="menuItemIcon" id="3">
                            <i className="material-icons" id="3">edit</i>
                          </span>
                        <span className={`menuItemText ${this.props.menuState ? css(styles.menuItems): ''}`} id="3" >
                       {Menu_text!==undefined?Menu_text[3].text:''}
                          </span>
                    </li>
                </ul>
                
              </div>             
          </div>
        );
    }
}


const state = store => ({
    gameList : store.gamelist,
    menuState : store.menu,
    active: store.activemnu,
    pageNumber:store.pageNumber,
    currentSubMenu: store.GotoInsideTrainingmenu,
    userProfile: store.userProfileData,
    current_courseID:store.current_courseID,
});

const dispatch = dispatch => ({
    gotogamelist: tabIndex => {
        dispatch({type:'GOTO_GAMELIST', payload: tabIndex });
    },
    changePage : newState => {
        dispatch({type:'CHANGE_PAGE',payload:newState});
    },
    toggleUserInfo : newState => {
        dispatch({type:'TOGGLE_USER_INFO',payload:newState});
    },
    toggleUpgrateTable:newState =>{
        dispatch({type:'TOGGLE_UPGRATE_PRO', payload: newState})
    },
    activeMenu : newState => {
        dispatch({type:'ACTIVE_MENU',payload:newState});

    },
    navigateTo: location => dispatch(push(location)),

    changeSubMenu : newState => {
        dispatch({type:'CURRENT_SUB_MENUE',payload:newState});
    },
    changegameActiveTab: tabIndex => dispatch({
        type: 'CHANGEGAME_TABS',
        payload: tabIndex
    }),
    togglePriceTable: newState => {
        dispatch({type: 'TOGGLE_PRICE_TABLE', payload: newState});
    },
    showCoinsModal:  action => dispatch({type:'TOGGLE_COINS_FIRST_MODAL', payload: action }),
    toggleNavMenu: newState => {
        dispatch({type: 'TOGGLE_NAV_MENU', payload: newState});
    },
});

export default connect(
    state,
    dispatch
)(LeftSide);
