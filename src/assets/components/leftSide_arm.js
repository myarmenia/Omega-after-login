import React, { Component } from 'react';
import { connect } from 'react-redux';
import { css } from 'aphrodite/no-important';
import styles from '../styles/styles';
import { push } from 'react-router-redux';
import {Message, Unity}  from 'react-unity-webgl';



class LeftSideArm extends Component{
    constructor(){
        super();
        this.paths = ['/office','/orders','/statistics','/settings'];

    }

    changePage = (event) => {
        let page = event.target.id*1;
        this.props.togglePriceTable(false);
        this.props.showCoinsModal('');
        this.props.changeSubMenu('levels');
           this.props.toggleUserInfo(false);
           this.props.gotogamelist(event);
           this.props.changegameActiveTab(0);
           //console.log(page);
           let menuItems = Object.values(this.refs);
           menuItems[event.target.id].style.backgroundColor = 'rgba(33, 139, 154, 0.6)';
           for(let i = 0; i < menuItems.length; ++i){
               // console.log(menuItems[i]);
               if(page !== i){
                   menuItems[i].style.backgroundColor = 'rgba(0, 0, 0, 0)';
               }
           }
           this.props.activeMenu(false);
           this.props.changePage(page);
           this.props.navigateTo(this.paths[page]);
           
    };
    goHome = () => {
        this.props.toggleUserInfo(false);
        this.props.changePage(0);
        this.props.navigateTo(this.paths[0]);
    };

    render(){
        const windowHeight = () => {
            return window.innerHeight;
        };
        return(
          <div className="leftSideContainer" style={{height:windowHeight()}}>
              <div className={`logo ${this.props.menuState ? css(styles.smallLogo): ''}`}  style={{cursor:'pointer'}}  onClick={this.goHome} />
              <div className="menuContainer">
                  <ul className="menuList">
                      <li className="menuItem" ref="item_0" id="0" style={{justifyContent:this.props.menuState ? 'center' : '', backgroundColor: this.props.active?'rgb(5, 49, 96)': ''  }} onClick={this.changePage}>
                          <span className="menuItemIcon" id="0">
                              <i className="material-icons" id="0">class</i>
                          </span>
                          <span className={`menuItemText ${this.props.menuState ? css(styles.menuItems): ''}`} id="0" >
                           Լեզուներ
                          </span>
                      </li>
                      <li className="menuItem" ref="item_1" id="1" style={{justifyContent:this.props.menuState ? 'center' : '', backgroundColor: this.props.active?'rgb(5, 49, 96)': ''  }} onClick={this.changePage}>
                          <span className="menuItemIcon" id="1">
                             <i className="material-icons" id="1">notifications_none</i>
                          </span>
                          <span className={`menuItemText ${this.props.menuState ? css(styles.menuItems): ''}`} id="1" >
                          Գրասենյակ
                          </span>
                      </li>
                      <li className="menuItem" ref="item_2" id="2" style={{justifyContent:this.props.menuState ? 'center' : '', backgroundColor: this.props.active?'rgb(5, 49, 96)': '' }}  onClick={this.changePage}>
                          <span className="menuItemIcon" id="2">
                             <i className="material-icons" id="2">videogame_asset</i>
                          </span>
                          <span className={`menuItemText ${this.props.menuState ? css(styles.menuItems): ''}`} id="2" >
                             Ստատիստիկա
                          </span>
                      </li>
                      <li className="menuItem" ref="item_3" id="3" style={{justifyContent:this.props.menuState ? 'center' : '', backgroundColor: this.props.active?'rgba(33, 139, 154, 0.6)': ''}} onClick={this.changePage} >
                          <span className="menuItemIcon" id="3">
                            <i className="material-icons" id="3">edit</i>
                          </span>
                          <span className={`menuItemText ${this.props.menuState ? css(styles.menuItems): ''}`} id="3" >
                      Կարգավորումներ
                          </span>
                      </li>

                  </ul>
              </div>
          </div>
        );
    }
}

const state = store => ({
    gameList : state.gamelist,
    menuState : store.menu,
    active: store.activemnu,
    pageNumber:store.pageNumber,
    currentSubMenu: state.GotoInsideTrainingmenu,
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
});

export default connect(
    state,
    dispatch
)(LeftSideArm);