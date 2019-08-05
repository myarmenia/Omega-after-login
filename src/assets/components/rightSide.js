import React, { Component } from 'react';
import Header from "./dashboardHeader";
import UserInfo from './userInfo';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import { connect } from 'react-redux';
import Training from './rightComponents/training';
import Games from './rightComponents/games';
import {Message, Unity}  from 'react-unity-webgl';
import Edit from './rightComponents/editProfile';
import '../styles/canvas.css';
import '../styles/animation.css';
import '../styles/price_style.css';
import '../styles/upgrate_to_pro.css';
import PriceBlank from './price_blank';
import PayForCoins from './use_coins';
import Upgrate_to_pro from './upgrate_to_pro';
import ReactPlayer from 'react-player';


import Ratings from './rightComponents/ratings/rating.js';
import Suggest from './rightComponents/suggestions/index.js';
import GoogleAdsense from './rightComponents/alphabetGame/GoogleAdsense';

let countPoints=[];
let courseData=[];
let url_current_course='';
//let url_current_course = require(`../images/right_content_map.png`);

class RightSide extends Component{
    constructor(){
        super();
        this.paths = ['/office','/orders','/statistics','/settings', '', '','/ratings', '/suggestions'];
        this.state = {
            fon:'',
            price_show:false,
            courseId:'',
            courseData:null,
            unity_office_load:false
        }

    }

    func_getstars_for_course=(e,d)=>{

             fetch('https://omegacoding.com/android_test/lessons.json', {
                     method:'POST',
                     headers:{"Content-type":"application/x-www-form-urlencoded",'Accept':'application/json'},
                 }
             ).then( response => response.ok ? response.json(): "Something went wrong")
            .then( response => {
                 courseData=response;
                            });
        let oper = 6;
        for (let i=0; i<courseData.length; i++){
            let name=courseData[i].courseName;

            let info = `unique_id=${encodeURI(e)}&course_name=${encodeURI(name)}&operation=${encodeURI(oper)}`;
          //console.log(info, "info")
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
              // console.log(data,"ssssssssssssssssfuncccccccc");
                let arr = Object.keys(data).map(function (key) {
                    return data[key];
                });
                let x=0;
                let j=1;
                arr.map((item) => {
                    let allpoints = item.game1.points * 1 + item.game2.points * 1 + item.game3.points * 1 + item.game4.points * 1;
                    if (j === arr.length) {
                        return (x)
                    } else {
                        j++;
                        return x = x + allpoints;
                    }
                });
                countPoints[i]=x;

            }).catch(error => {
                console.log(error);
            });
        }


    };

    componentDidMount(props) {
        this.props.addCourseStars(countPoints);


    }
    background_pic =(value)=>{

        let name = value === 1 ? "html": value === 2 ? "css" : value === 3 ? "boot": value === 4 ? "js" : value === 5 ? "jquery" : value === 6 ? "php" :value === 7 ? "mysql":value === 8 ? "react":value === 9 ? "word": "ang";

            this.setState({
                fon:require(`../images/${name}_background.png`)
            })
    };
    load_canvas_forGame=(e)=>{
        this.setState({
            fon:e
        })
    };
    show=(e)=>{
        if(e==='price_blank'){
            let it=this;
            setTimeout(()=>
                {
                    let price_blank=document.getElementById('blank');
                    price_blank.addEventListener('click',function(){
                        price_blank.classList.add("animated", "fadeOut");
                        setTimeout(()=>{
                            it.props.togglePriceTable(false)
                        }, 200)
                    })
                },300
            )
                }
        else if(e ==='coins_blank' ){
            let it=this;
            setTimeout(()=>
                {
                    let coins_blank=document.getElementById('blank_coins');
                    coins_blank.addEventListener('click',function(){
                        coins_blank.classList.add("animated", "fadeOut");
                        setTimeout(()=>{
                            it.props.showCoinsModal('');

                        }, 200)
                    })
                },300
            )

        }
        else if(e ==='update_blank' ){
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

        }
    };

    closeBlackBackground =(e)=>{
        if(e ==='close' ){
            let it=this;
            setTimeout(()=>
                {
                    let coins_blank=document.getElementById('blank_coins');

                    coins_blank.classList.add("animated", "fadeOut");
                    setTimeout(()=>{
                        it.props.showCoinsModal('');

                    }, 200)

                },200
            )

        }
        if(e ==='buy_diamonds' ){
            let it=this;
            setTimeout(()=>
                {
                    let coins_blank=document.getElementById('blank_coins');

                    coins_blank.classList.add("animated", "fadeOut");

                        it.props.showCoinsModal('');



                },100)


        }


    };
    add_diamond = () => {
        // this.props.showCoinsModalForHelp('unityDiamond')
       // console.log("add_diamond");
        localStorage.removeItem("add_fb30df463");
        let userId = this.props.userProfile.uid;
        let url = 'https://omegacoding.com/android_test/manageDiamonds.php';
        let method = 'post';
        let headers = {
            "Content-type": "application/x-www-form-urlencoded",
            'Accept': 'application/json'
        };
        let body = "user_id=" + userId + "&operation=7";
        //console.log(body,"body_minus_diamond");
        fetch(url, {
            method: method,
            headers: headers,
            body: body
        })
            .then(res => res.json())
            .then((data) => {
           // console.log(data,"add_diamond_office")

                if (data !== '0') {
                    if (data === 'comes_zero') {
                        data = 0;
                    }
                    this.props.addUserDiamonds(data);
                    this.props.changeUserDiamonds(data);


                }
            })
            .catch((error)=>{
                console.log('Request failed', error);
            });
    };

    start = (e) =>{
        let self= this;
      window.addEventListener("storage", function () {
          let storage1=localStorage.getItem("add_fb30df463");
          if (localStorage.getItem("fb30d3908952daoffice") === "offb4b718717ff98450c7" ){
            //  const op= document.querySelector("#page-loader");
             //op.style.display="none";
              const my_iframe= document.querySelector("#unity_iframe");
              my_iframe.focus();
          }
          if(storage1 ==='diam_f463'){
              self.add_diamond();
          }
         let  storage = localStorage.getItem("fb30df4632d7d3908952daoffice");
          //console.log(storage ,"storage_unity_Changess");
            if (storage){

                //let stor=[storage.split(",")[0],storage.split(",")[1]];
                //console.log(stor ,"unity_Changess");
                let course='html';
           let  data =`data_level_office=${storage}&unique_id=${e}&course_name=${course}`;
               // console.log(data,"liftliftliftliftliftliftlift");
                fetch(`https://omegacoding.com/android_test/userProgressManager.php`,{
                    method:'POST',
                    headers:{"Content-type":"application/x-www-form-urlencoded",'Accept':'application/json'},
                    body: data
                }).then(response => {
                    if(response.ok){
                        return response.json();
                    }
                }).then(
                    response =>{
                      //  console.log(response,"response_liftlift");
                        localStorage.removeItem("add_fb30df463");

                     self.props.changeUserOfficeLevel(response.level);

                    })

            }
            else{
                return false
            }
        }, false);
    };

    // for use_coins sert-Message: get from training.js
    // and send to use_coins.js
    getCourseData=(data)=>{
      this.setState({ courseData:data });
     // console.log('rightside ---> ',data);
    }

    clickDetector=(clicked)=>{
        console.log(clicked)
    }

   render(){

        let showIns = 'hidden';
        if (this.props.userProfile.status < 1) {
            showIns = 'visible';
        }


       this.func_getstars_for_course(this.props.userProfile.uid );
        return(
            <div className="rightSideContainer"  style={{backgroundImage:`url(${this.state.fon ===''?this.state.fon ==='play_game'?'':url_current_course:(this.props.currentSubMenu === 'levels')?url_current_course:this.state.fon})`}} >

                {this.props.priceTable?<span className="animated fadeIn"   style={{ zIndex:this.props.priceTable?99:''}} >
                     <PriceBlank />
                   <div className="price_back" id="blank" ></div>
                </span>:''}
                {this.props.upgradeTable?
                    <span className=" animated fadeIn"   style={{ zIndex:this.props.upgradeTable?99:''}} >
                    <div className="price_back" id="upgrate_blank"   style={{ zIndex:'-1'}} ></div>
                      <Upgrate_to_pro  />
                </span>:''}

                {this.props.open_CoinsModal==='first_coins'|| this.props.open_CoinsModal==='html_next_coins' || this.props.open_CoinsModal==='you_cant_leave_comment' || this.props.open_CoinsModal==='next_coins' || this.props.open_CoinsModal==='other_coins'?
                    <span className="animated fadeIn "
                                                            style={{ zIndex:this.props.open_CoinsModal==='first_coins'||this.props.open_CoinsModal==='html_next_coins'||
                                                            this.props.open_CoinsModal==='next_coins' || this.props.open_CoinsModal==='other_coins'|| this.props.open_CoinsModal==='you_cant_leave_comment'?99:''}} >

                    <PayForCoins  close={this.closeBlackBackground} show_price_blank={this.show}  courseData={this.state.courseData}/>



                    <div className="price_back" id="blank_coins" ></div>



                </span>:''}



                {this.props.pageNumber>= 0  &&
                <Header getDiamonds = {this.props.getDiamonds} user={this.props.userInfo} show={this.props.show} pro_date={{date:this.props.userProfile}} show_price_blank={this.show}  close={this.closeBlackBackground} />
                }
                <CSSTransitionGroup
                    transitionName="fade"
                    transitionEnterTimeout={100}
                    transitionLeaveTimeout={100}
                >
                    { this.props.userInfoState &&

                        <UserInfo/>
                    }
                </CSSTransitionGroup>
                <div className="rightContent">                   

                   {
                       this.props.pageNumber === 1 &&
                       <div className="cont_game office">

                         {/*
                           <div id="page-loader" className="page-loader" >
                           <div style={{textAlign: 'center'}}>
                               <div className="page-loader-body">
                                   <div className="cssload-loader">
                                       <div className="cssload-inner cssload-one"></div>
                                       <div className="cssload-inner cssload-two"></div>
                                       <div className="cssload-inner cssload-three"></div>
                                   </div>
                               </div>
                           </div>
                           </div>*/}
                           <iframe id="unity_iframe" src={`../Off/index.html?${this.props.userProfile.off_level}`} onLoad={this.start(this.props.userProfile.uid)}
                                   frameBorder="0" style={{width: '100vw', height: '100vh'}}  >
                          </iframe>
                       </div>
                    }

                    {
                       this.props.pageNumber === 4 &&
                       <div className="cont_game office"  >
                             <iframe id="unity_iframe" src={`../Off/index.html?${this.props.userProfile.course_lift[`${this.props.current_courseID}`]}&${this.props.current_courseID}`} onLoad={this.start(this.props.userProfile.uid)}
                                       frameBorder="0" style={{width: '100vw', height: '100vh'}}  >
                             </iframe>
                       </div>
                    }
                    {
                      this.props.pageNumber === 0  &&

                         <Training change_background={this.background_pic} when_playing_game={this.load_canvas_forGame}  show_coins_blank={this.show} getCourseData={this.getCourseData}/>
                    }

                    {
                        this.props.pageNumber === 2 &&
                            <Games/>
                    }
                    {
                        this.props.pageNumber === 3  &&
                        <Edit />
                    }
                    {
                        this.props.pageNumber === 5  &&
                        
                        <div className="container price">
                            <div className="row">
                                <p className="bgg_unlock col-md-8 col-sm-8">
                                  <h4>{this.props.lang === 'eng'?'To unlock this game, please finish all levels (HTML, CSS, BootStrap)  before starting JavaScript.':
                                      this.props.lang === 'arm'?'Այս խաղը բացելու համար խնդրում ենք ավարտել բոլոր դասերը (HTML, CSS, BootStrap)` մինչև Javascript:':''}</h4>
                                </p>
                                <div className="bgg_unlock col-md-8 col-sm-8" style={{height:'340px'}}>
                                    <ReactPlayer url={this.props.lang === 'eng'?`https://www.youtube.com/watch?v=zojmPU7nXb4`:`https://www.youtube.com/watch?v=zojmPU7nXb4`}  width='100%'
                                                 height='100%' controls   className='frag-frame col-md-8 col-sm-8'   />

                                    

                                </div>                           
                                <div className='gugo-ads-wrap' style={{width:'100%', position:'absolute', bottom:'-90px', visibility:showIns}}>
                                    <GoogleAdsense 
                                        dataAdClient='ca-pub-7306442307639605' 
                                        dataAdSlot='5592332219' 
                                        dataAdFormat = "auto"
                                        dataFullWidthResponsive="true"
                                        getClicks = {this.clickDetector}
                                    />
                                </div>
                            </div>
                        </div>
                        
                       
                    }
                {/*    {
                        this.props.pageNumber === 8  &&
                        <div className="container price">
                            <div className="row">
                                <p className="bgg_unlock col-md-8 col-sm-8">
                                    <h4>{this.props.lang === 'eng'?'To see the job\'s suggestions you should finish all levels (HTML, CSS, BootStrap)  before starting JavaScript.':
                                        this.props.lang === 'arm'?'Աշխատանքների առաջարկերը տեսնելու համար, խնդրում ենք ավարտել բոլոր դասերը (HTML, CSS, BootStrap)` մինչև Javascript:':''}</h4>
                                </p>

                            </div>
                        </div>
                    }*/}
                    {
                      this.props.pageNumber === 6  &&
                      <div>
                        <Ratings />
                      </div>
                    }
                    {
                      this.props.pageNumber === 7 || this.props.pageNumber === 8 ?
                      <div>
                        <Suggest />
                      </div>:null
                    }
                </div>
            </div>
        );
    }
}
const state = store => ({
    userInfoState:store.userInfo,
    pageNumber:store.pageNumber,
    menu_restore:store.menu_restored,
    getDiamonds:store.currentDiamonds,
    userProfile: store.userProfileData,
    menuState : store.menu,
    currentSubMenu: store.GotoInsideTrainingmenu,
    priceTable:store.show_priceTable,
    upgradeTable:store.upgrate_to_pro,
    open_CoinsModal:store.open_CoinsModal,
    current_courseID:store.current_courseID,
    lang:store.lang
});

const dispatch = dispatch => ({
    addUserDiamonds : newState => {
        dispatch({type:'CHANGE_DIAMONDS',payload:newState});
    },
    toggleUpgrateTable:newState =>{
        dispatch({type:'TOGGLE_UPGRATE_PRO', payload: newState})
    },
    addCourseStars : newState => {
        dispatch({type:'CHNAGE_COURSE_STARTS',payload:newState});
    },
    togglePriceTable: newState => {
        dispatch({type: 'TOGGLE_PRICE_TABLE', payload: newState});
    },
    showCoinsModal:  newState =>{
        dispatch({type:'TOGGLE_COINS_FIRST_MODAL', payload: newState });
    },
 changeUserOfficeLevel:  newState =>{
        dispatch({type:'CHANGE_USER_OFFICE_LEVEL', payload: newState });
    },

});

export default connect(
    state,
    dispatch
)(RightSide);
