import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FlatButton from 'material-ui/FlatButton';
import '../styles/userInfo.css';
import { connect } from 'react-redux';
import Cookies from 'universal-cookie';
import { push } from 'react-router-redux';
import { css } from 'aphrodite/no-important';
//import styles from '../styles/styles';

const cookies = new Cookies();


class UserInfo extends Component{
    constructor(){
        super();
        // this.paths = ['/training','/games','/edit','/notifications'];
        this.paths = ['/office','/orders','/statistics','/settings', '', '','/ratings', '/suggestions'];
    }

    editProf = (event) => {

        this.props.changePage(3);
        this.props.navigateTo(this.paths[3]);
        this.props.toggleUserInfo(false);
        this.props.activeMenu(3);

        let menuItems = document.getElementsByClassName('menuItem');
        console.log(menuItems);
        for (var item in menuItems) {
          if (menuItems.hasOwnProperty(item)) {
            // console.log(item, typeof item);
            if (Number(item)  === 3) {
              menuItems[item].style.backgroundColor = 'rgba(33, 139, 154, 0.6)';
            }else {
              menuItems[item].style.backgroundColor = 'rgba(0, 0, 0, 0)';
            }
          }
        }

    };


    logOut = () =>{
        let d = new Date();
        d.setTime(d.getTime() - (43200*60*1000));
        cookies.set( 'logon', '', { path: '/', expires: d, domain: '.omegacoding.com', });

        if(!cookies.get('logon')){
            setTimeout( function(){
                window.location.href = "https://omegacoding.com";
            },1000)

        }
    };

    render(){


        return(
            <div className="userInfoContainer">
                <div className="infoTop">
                    <div className="avatar" style={{backgroundImage:`url(https://omegacoding.com/android_test/tmp/${this.props.userProfile.userImg})`, backgroundRepeat: 'no-repeat',
                        backgroundSize: '100%'}}>
                    </div>
                </div>

                <div className="infoBottom">
                    <MuiThemeProvider>
                        <div className="buttonsContainer">
                            <FlatButton label={this.props.userProfile.profile} ref="item_3" id="3" primary={true} hoverColor="#025a98" labelStyle={{color:'azure',fontSize:'12px'}} style={{ height:'100%', width: '50%'}} onClick={this.editProf}  />
                            <FlatButton label={this.props.lang === 'eng'?'Log Out':'Ելք'} primary={true} hoverColor="#025a98" labelStyle={{color:'azure'}} style={{ height:'100%', width: '50%'}}  onClick={this.logOut} />
                        </div>
                    </MuiThemeProvider>
                </div>
            </div>
        );
    }
}

const state = store => ({
    userInfoState:store.userInfo,
    userProfile: store.userProfileData,
    lang:store.lang
});

const dispatch = dispatch => ({
    changePage : newState => {
        dispatch({type:'CHANGE_PAGE',payload:newState});
    },
    navigateTo: location => dispatch(push(location)),
    toggleNavMenu : newState => {
        dispatch({type:'TOGGLE_NAV_MENU',payload:newState});

    },
    activeMenu : newState => {
        dispatch({type:'ACTIVE_MENU',payload:newState});

    },
    toggleUserInfo : newState => {
        dispatch({type:'TOGGLE_USER_INFO',payload:newState});
    }
});

export default connect(
    state,
    dispatch
)(UserInfo);
