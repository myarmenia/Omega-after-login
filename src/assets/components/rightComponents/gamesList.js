import React, {Component} from 'react';
import {connect} from 'react-redux';
import FlatButton from 'material-ui/FlatButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Notepad from './notepadGame/Notepad';
import '../../styles/notepadGame/style.css';
import '../../styles/notepadGame/animation.css';
import '../../styles/bounceIn.css';
import '../../styles/notepadGame/lastPage.css';
//import {Message, Unity}  from 'react-unity-webgl';
import AlphabetGame from './alphabetGame/BetGame.js';
import PointsUnity from './UnityPointer';
import {push} from 'react-router-redux';
import Fill_game from './fillgame/fill_game';

let url2 = require(`../../images/down.png`);
let star = require('../../images/star.png');
let question = require('../../images/gamesLogo/mejtex.png');
let url = `url(${question})`;
let inter_start;
let inter_start_call;
let storage;
let current_max_pnts;
let code = [];
let max_points = [];
let eachGameStars = {};
let starEmpty = require('../../images/starEmpty.png');
let p=0,r=0;

class CurrentCourse extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalUnity:false,
            renderPoints: false,
            renderPointsPuzzle: false,
            showFinalPointsPuzzle: true,
            showFinalPoints: true,
            gameList: 0,
            gotoList: false,
            courseData: [],
            courseName: '',
            uid: '',
            glist: [],
            redBorder: false,
            replay: false,
            multi: false,
            unitypoints: '',
            numberOfStarsUnity: '',
            locker_count: null,
            is_openUnity: true,
            game_type: '',
            current_max_points: '',
            multi_unity: false,
            this_game: false,
            anim: false,
            code: [],
            max_points: [],
            class: true,
            iframe_game_id: '',
            checkForLoadUnity: true,
            current_stars: '',
            showStart: false,
            showButton: '',
            fill_game:null,
            r:0


        };
        this.paths = ['/office', '/orders', '/statistics', '/settings'];
        this.count_mark = 0;
        this.self_mark = 0;
        this.ClearStorage();
    }

    componentWillUnmount() {
        this.setState({
            showFinalPoints: false,
            showFinalPointsPuzzle: false
        });
        clearInterval(inter_start_call);
        clearInterval(inter_start);
    }

    ClearStorage = () => {
        localStorage.removeItem("fb30df4632d7d3908952da6106296b6d");
        localStorage.removeItem("cc9869f7b35ec38acd2d394fac43cc75");
        localStorage.removeItem("fb30df463");
        localStorage.removeItem("buy_diamond_fb30df463");
    };
    goToNextLesson = () => {
        let oper = 2;
        let Unlock_NextLessons = `unique_id=${encodeURI(this.props.userProfile.uid)}&operation=${encodeURI(oper)}
        &course_name=${encodeURI(this.props.courseName)}`;
        // console.log(Unlock_NextLessons, "-info2");
        fetch(`https://omegacoding.com/android_test/userProgressManager.php`, {
            method: 'POST',
            headers: {"Content-type": "application/x-www-form-urlencoded", 'Accept': 'application/json'},
            body: Unlock_NextLessons
        }).then(response => {
            if (response.ok) {
                return response.json();
            }
        }).then(response => {
            let count = response.length * 1;
            // console.log(response, "response lockLessons");
            //  console.log(count, "count lockLessons");
            // console.log(this.state.locker_count, "this.state.locker_countthis.state.locker_count");

            if (count > this.state.locker_count) {
                this.props.countForlock(count);
            }


        }).catch(error => {
            console.log(error);
        });

        this.props.toShow(false);

    };

    retryUnity = () => {
        localStorage.setItem('retry', "doit");

       // Message('idle', 'GameStart')
    };
    retryUnity_puzzle = (e) => {
        if (e === 5) {
            localStorage.setItem('retry', "doit_p_new")
            //Message('Editor', 'Retry')
        }
        else {
            localStorage.setItem('retry', "doit_p")
                // Message('Table', 'GameStart')
        }

    };

    replayGame = (e) => {
        this.ClearStorage();
        // alert(e);
        //  alert(typeof e);
        if (e * 1 === 4) {
            this.setState({
                showFinalPoints: true,
                renderPoints: false
                //showFinalPointsPuzzle: true,
                //renderPointsPuzzle: false
            });
            this.retryUnity_puzzle();
            // this.props.gotogamelist(4);

        }

        else {
            if (e * 1 === 3) {
                this.setState({
                    showFinalPoints: true,
                    renderPoints: false
                });
                this.retryUnity();
                // this.props.gotogamelist(1);

            }
            else {
                if (e * 1 === 2) {
                    this.setState({
                        is_openUnity: false
                    });
                    this.props.gotogamelist(3);
                }
                else {
                    if (e * 1 === 5) {
                        this.setState({
                            showFinalPoints: true,
                            renderPoints: false
                            //showFinalPointsPuzzle: true,
                           // renderPointsPuzzle: false
                        });
                        this.retryUnity_puzzle(5);
                        // this.props.gotogamelist(5);
                    }
                    else {
                        this.setState({
                            is_openUnity: false
                        });
                        this.props.gotogamelist(2);
                    }

                }
            }
        }
        // this.props.replay(true);
    };

    replay = () => {
        this.props.replVideo(true);
    };
    nextQ = () => {
        this.props.gotogamelist(1);
        this.props.gotogamelist('fill_game');

    };
    UnityPoints = (e) => {
       // console.log("Aloooooooooooooooooooo UnityPoints")
        this.setState({
            unitypoints: e * 1
        });
        let k = e * 1;
        let c = current_max_pnts * 1;
        let per = (k * 100) / c;

        if ((per > 0 ) && (per < 30 )) {
            this.setState({numberOfStarsUnity: 0})
        }
        else if (per >= 30 && per <= 60) {
            this.setState({numberOfStarsUnity: 1})
        }
        else if (per > 60 && per <= 90) {
            this.setState({numberOfStarsUnity: 2})
        }
        else if (per > 90 ) {
            this.setState({numberOfStarsUnity: 3})
        }
        else {
            this.setState({numberOfStarsUnity: 0})
        }


        if (this.state.game_type === 4) {
            clearInterval(inter_start_call);
            clearInterval(inter_start);

            this.setState({
                showFinalPoints: false,
                renderPoints: true
            })
           /* this.setState({
                showFinalPointsPuzzle: false,
                renderPointsPuzzle: true
            })*/
        }
        else if (this.state.game_type === 5) {
            clearInterval(inter_start_call);
            clearInterval(inter_start);
            this.setState({
                showFinalPoints: false,
                renderPoints: true
            })
           /* this.setState({
                showFinalPointsPuzzle: false,
                renderPointsPuzzle: true
            })*/
        }
        else if (this.state.game_type === 3) {
            clearInterval(inter_start_call);
            clearInterval(inter_start);
            this.setState({
                showFinalPoints: false,
                renderPoints: true
            })
        }
        else if (this.state.game_type === 1) {

            this.setState({
                showFinalPoints: false,
                renderPoints: true
            });
            this.setState({
                is_openUnity: true
            });
            this.props.gotogamelist(100);
        }
        else if (this.state.game_type === 2 || this.state.game_type === 41) {

           setTimeout(()=>{
               this.setState({
                   showFinalPoints: false,
                   renderPoints: true
               });
               this.setState({
                   is_openUnity: true
               });
               this.props.gotogamelist(100);

           }, 10)
        }
    };

    buy_diamonds = () => {
        //console.log("buy_diamonds_unity")
        localStorage.removeItem("buy_diamond_fb30df463");
        this.props.show_coins_blank('price_blank');
        this.props.togglePriceTable(true);

    };
    start = () => {

    let self= this;
       window.addEventListener("storage", function () {
         let p=localStorage.getItem("cc9869f7b35ec38acd2d394fac43cc75");
           let storage1=localStorage.getItem("fb30df463");
           let storage2=localStorage.getItem("buy_diamond_fb30df463");
         if (p === "b4b718717ff98450c77196d9808383a3") {
            // console.log("STRARAR startstartstart")
           self.useStorage();
         }
           if(storage1 ==='diam'){
               self.minus_diamond();
           }
           if(storage2 ==='d_f463_iam'){
               self.buy_diamonds();
           }
            /* (p === "b4b718717ff98450c77196d9808383a3") ? self.useStorage() : '';*/
      }, false);
    };

    minus_diamond = () => {
      // this.props.showCoinsModalForHelp('unityDiamond')
         // console.log("minus_diamond");
        localStorage.removeItem("fb30df463");
        let userId = this.props.userProfile.uid;
        let url = 'https://omegacoding.com/android_test/manageDiamonds.php';
        let method = 'post';
        let headers = {
            "Content-type": "application/x-www-form-urlencoded",
            'Accept': 'application/json'
        };
        let body = "user_id=" + userId + "&operation=8";
      //  console.log(body,"body_minus_diamond");
        fetch(url, {
            method: method,
            headers: headers,
            body: body
        })
            .then(res => res.json())
            .then((data) => {
                this.setState({
                    diamonds: data,
                    takeDiamond:false,
                });
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


    useStorage = () =>{
        //console.log("STRARAR useStorageuseStorage")
      let self= this;
      document.querySelector("#demo_tetr").src="";
        /*  let Modal = document.getElementsByClassName('demo-modal-fragment-content')[0];
        setTimeout(
            () => {
                Modal.style.display = "block";
            }, 200
        );
        this.setState({

            modalUnity:true
        });
        */
        this.setState({
            checkForLoadUnity: false
        });
        window.addEventListener("storage", function () {
            // do your checks to detect

            let storage = localStorage.getItem("fb30df4632d7d3908952da6106296b6d");// unity

          //  console.log(storage,"storageeee");

            if (storage !== null && storage !== '') {
                self.UnityPoints(storage);
            }


        }, false);

    };

    selectBorderColor = () => {
        this.setState({
            redBorder: true
        });
        setTimeout(
            () => {
                this.setState({
                    redBorder: false
                });
            }, 1000
        )
    };

    hasClass = (element, className) => {
        return element.className && new RegExp("(^|\\s)" + className + "(\\s|$)").test(element.className);
    };


    gameChosen_new = (e) => {

        let grow_btn = document.getElementsByClassName('grow');
        for (let i = 0; i < grow_btn.length; i++) {

            if (grow_btn[i].id * 1 === e.target.id * 1) {

                if (!this.hasClass(grow_btn[i], 'growed')) {
                    //console.log(code,"codecodecode")
                    grow_btn[i].className += " growed";
                    this.setState({
                        this_game: true,
                        anim: !this.state.anim,
                        currrent_game_type: e.target.id * 1,
                        currrent_game_id: e.target.name * 1,

                    });
                    setTimeout(() => {
                        this.setState({
                            code: code[i],
                            max_points: max_points[i],
                        })
                    }, 200)
                    setTimeout(() => {
                        this.setState({
                            anim: true,
                        })
                    }, 600)
                }
            }
            else {
                grow_btn[i].classList.remove("growed");
            }
        }
        setTimeout(
            () => {
                this.setState({
                    showStart: eachGameStars[`"${this.state.currrent_game_id}"`],
                    showButton: this.state.currrent_game_type
                })
            }, 400
        )

    };
    gameChosen = (e,multi) => {
      // console.log(e.target.name, "e.target.id gameChosen")

        this.props.when_playing_game('play_game');
        this.props.show_wonderTitle(false);
        let el = document.getElementById('cont');
        el.classList.add('cont_play_game');
        let gg = this.state.glist;
        this.setState({
            class: false
        });
        this.setState({
            anim: false,

        });
            //console.log(gg[0].points, "gggggggggggggggggggggggggggggg")
        for (let j = 0; j <= gg.length - 1; j++) {
            if (gg[j].game_id * 1 !== e.target.name * 1) {
                if (gg[j].mark === '0') {
                    this.count_mark++;
                }
            }
            else {
              let old_poins= gg[j].points || 0;
                this.props.getOldpoints(old_poins);
                if (gg[j].mark === '0') {
                    this.self_mark++;
                }
            }
        }

       // console.log(this.count_mark, "this.count_mark")
       // console.log(this.old_points, "this.old_points")
       // console.log(this.self_mark, "this.self_mark")
        if (e.target.id * 1 === 0) {
            this.setState({
                game_type: 4,
                           });

            this.props.toggleNavMenu(true);
            this.props.gotogamelist(1);
            this.props.getgameid(e.target.name * 1);

            if(this.props.course_name === 'java_script'){
                this.setState({
                    game_type: 41,
                });

                this.props.getgameid(e.target.name * 1);
                this.props.gotogamelist('fill_game');


               // this.props.setUnityLink(`JsPuzzle/index.html?${e.target.name * 1}&${this.props.userProfile.diamonds}`);
            }
            else{
                this.props.navigateTo(this.paths[1] + '?' + e.target.name * 1);
                this.props.setUnityLink(`Web2DTag/index.html?${e.target.name * 1}&${this.props.userProfile.diamonds}`);
            }


            current_max_pnts = this.state.current_max_points[e.target.name * 1]
            // console.log(current_max_pnts,"444444444444")
        }
        else if (e.target.id * 1 === 1) {

            this.props.gotogamelist(1);
            //this.props.gotogamelist(e.target.id * 1);
            this.props.getgameid(e.target.name * 1);

            if( multi ){
                this.props.toggleNavMenu(true);
                this.props.navigateTo(this.paths[1] + '?' + e.target.name * 1);
                this.props.setUnityLink(`MultiGl/index.html?${e.target.name * 1}`);
            }
            else{
                this.props.toggleNavMenu(true);
                this.props.navigateTo(this.paths[1] + '?' + e.target.name * 1+ '&'+ this.props.lang);
                this.props.setUnityLink(`WebGl/index.html?${e.target.name * 1}&${this.props.lang}`);
            }

            this.setState({
                game_type: 3,
            });

            current_max_pnts = this.state.current_max_points[e.target.name * 1]
            // console.log(current_max_pnts,"33333333333333")
        } else if (e.target.id * 1 === 5) {

            this.setState({
                game_type: 5,
                         });
            this.props.gotogamelist(1);
           // this.props.gotogamelist(e.target.id * 1);
            this.props.getgameid(e.target.name * 1);
            this.props.toggleNavMenu(true);
            this.props.navigateTo(this.paths[1] + '?' + e.target.name * 1);
            this.props.setUnityLink(`Game/index.html?${e.target.name * 1}`);
            current_max_pnts = this.state.current_max_points[e.target.name * 1]
            // console.log(current_max_pnts,"33333333333333")
        }
        else if (e.target.id * 1 === 3) {
            this.props.gotogamelist(e.target.id * 1);
            this.props.getgameid(e.target.name * 1);
            this.setState({
                game_type: 2,
            });
            current_max_pnts = this.state.current_max_points[e.target.name * 1];
            //console.log(current_max_pnts,"current_max_pnts2222222222");
            // console.log(e.target.name*1,"gameID2222222222");
            // console.log(this.state.multi,"multii");
            //  console.log(this.state.multi_unity,"this.state.multythis.state.multy");
            // console.log(current_max_pnts,"222222222222")
        }
        else if (e.target.id * 1 === 2) {

            this.props.gotogamelist(e.target.id * 1);
            this.props.getgameid(e.target.name * 1);
            this.setState({
                game_type: 1
            });
            current_max_pnts = this.state.current_max_points[e.target.name * 1]
            // console.log(current_max_pnts,"1111111111111111111")
            this.props.toggleNavMenu(true);
        }
        this.props.play_curr_game(true);
    };

    count_func = (e) => {
        if (e) {
            this.count_mark--;
        }
        return this.count_mark;
    };
    gameContinue = (type, id) => {
        //alert (type );
        //   alert (id );
        this.ClearStorage();
        this.setState({
            iframe_game_id: id,
            is_openUnity: false,
            renderPoints: false,
            renderPointsPuzzle: false,
            showFinalPointsPuzzle: true,
            showFinalPoints: true,
            game_type: type * 1
        });
        if (type * 1 === 1) {
            this.props.gotogamelist(2);
            this.props.getgameid(id * 1);
        }
        else {
            if (type * 1 === 2) {
                this.props.gotogamelist(3);
                this.props.getgameid(id * 1);

            }
            else if (type * 1 === 3) {
                this.props.gotogamelist(1);
                this.props.getgameid(id * 1);
                this.props.navigateTo(this.paths[1] + '?' + id* 1+ '&'+ this.props.lang);
                this.props.setUnityLink(`WebGl/index.html?${id * 1}&${this.props.lang}`);

            } else if (type * 1 === 5) {
                this.props.gotogamelist(5);
                this.props.getgameid(id * 1);
                this.props.navigateTo(this.paths[1] + '?' + id * 1);
                this.props.setUnityLink(`Game/index.html?${id * 1}`);

            }
            else if (type * 1 === 4) {
                this.props.gotogamelist(1);
                this.props.getgameid(id * 1);
                this.props.navigateTo(this.paths[1] + '?' + id * 1);
                this.props.setUnityLink(`Web2DTag/index.html?${id * 1}&${this.props.userProfile.diamonds}`);
            }
        }
    };

    playMulti = (e) => {


        if (e.target.id * 1 === 0) {
           /* this.setState({
                multi_unity: true
            });*/
            // console.log(e.target.id,"e.target.id")
            this.gameChosen(e,true);
        }
        else {
            if (e.target.id * 1 === 1) {
               /* this.setState({
                    multi_unity: true
                });*/
                //console.log(e.target.id,"e.target.id")
                this.gameChosen(e,true);
            }

            else {
                if (e.target.id * 1 === 3) {
                    // console.log(e.target.id,"e.target.id")
                    this.setState({
                        multi: true,
                        class: false
                    });
                    this.gameChosen(e);
                    /*  this.props.play_curr_game(true);
                     this.props.gotogamelist(e.target.id * 1);
                     this.props.getgameid(e.target.name * 1);*/

                }

            }

        }

    };

 /*   close_hello_moadl = () => {
        let Modal = document.querySelector('.demo-modal-fragment-content');
        Modal.style.display = "none";
         this.setState({
         checkForLoadUnity: false
         });
   };*/
    /*playMulti_Unity = (e) => {
     this.setState({
     multi_unity: true
     });
     this.gameChosen(e);
     // this.props.gotogamelist(e.target.id * 1);
     // this.props.getgameid(e.target.name * 1);
     };*/


    componentWillMount() {
        this.setState({
            gameList: this.props.gameList,
            courseData: this.props.courseData,
            courseName: this.props.courseName,
            uid: this.props.userProfile.uid,
            glist: this.props.img,
            locker_count: this.props.lock,
            current_max_points: this.props.max_points,

        });
        this.props.setGemaInfo(this.props.img);        
    }

    componentWillReceiveProps(props) {
        this.setState({
            gameList: props.gameList,
            courseData: props.courseData,
            courseName: props.courseName,
            uid: props.userProfile.uid,
            glist: props.img,
            locker_count: props.lock,
            current_max_points: props.max_points,
        })
        this.props.setGemaInfo(props.img);
    }

    componentDidMount() {
        /*setTimeout(()=>{ this.setState({
         gotoList:!this.state.gotoList
         });
         },500)*/
        this.setState({
            gameList: this.props.gameList,
            courseData: this.props.courseData,
            courseName: this.props.courseName,
            uid: this.props.userProfile.uid,
            glist: this.props.img,
            locker_count: this.props.lock,
            current_max_points: this.props.max_points,
            gotoList: true
        });

        // console.log('xxxxxxxxxxxxxxxxxxxxx-> ',this.props.getUnityDesktop)
        
        if (this.props.getUnityDesktop && this.props.getUnityDesktop.gameId) {
            let Eva = new Object;
            Eva.target = new Object;
            Eva.target.id = this.props.getUnityDesktop.gameType;
            Eva.target.name = this.props.getUnityDesktop.gameId;
            
            
            // console.log('Eva->', Eva)
            setTimeout(() => {
                // console.log(this.state.gameList)
                // console.log('glist timeout-> ',this.state.glist)
                let glist = this.state.glist
                for (const key in glist) {
                    if (glist.hasOwnProperty(key)) {
                        const element = glist[key];
                        if (element.game_id === this.props.getUnityDesktop.gameId &&
                            (0<= this.props.getUnityDesktop.gameType  <= 5)) {
                            /*
                            գեյմ թայթերից բան չհասկացա ֊ Արմիներ հետ չշտել։
                            */                            
                            this.gameChosen_new(Eva);
                            setTimeout(() => {
                                let kanach_kochak =  document.querySelectorAll('.game_details  .button_green');
                                // console.log(kanach_kochak, kanach_kochak.length)
                                if (kanach_kochak.length === 2 && !this.props.getUnityDesktop.mode) {
                                    kanach_kochak[1].click(); //  singleplayer
                                }
                                else{
                                    kanach_kochak[0].click(); // multiplayer
                                }
                                this.props.changeUnityDesktop("");
                                               
                            }, 1400);

                            break;
                        }
                    }
                }
            }, 700);

            
            
                
            
        }
        
    }


    render() {
        let game = this.state.glist;
      //  console.log(game, "gamegamegamegame");
        //console.log(this.old_points, "this.old_points");
    //   console.log(this.props.linkForUnity, "linkForUnity")
        //    console.log(this.state.game_type,"game_type")
        //    console.log(this.state.multi,"multi renderr")
        // console.log(this.state.renderPointsPuzzle,"renderPointsPuzzlerenderPointsPuzzle")
        //  console.log(game,"gamegamegamegame");
        //  console.log(this.state.numberOfStarsUnity,"numberOfStarsUnity")
        /*let arr1 = game.slice(0, 2);
         let arr2 = game.slice(2, 4);*/

        let k1 = 0;
        let data;
        let k = 0;

        data = game.map((item, index) => {
          if (item.mark >= 1) {
            k1++
          }
            // item.mark >= 1 ? k1++ : '';
            eachGameStars[`"${item.game_id}"`] = item.mark;
            let url = require(`../../images/gamesLogo/${item.mark === undefined || item.mark === '0' ? 'not' +
                item.type + '.png' : item.type + '.png'}`);
            code[k] = item.points !== undefined ? ' ' + item.points : ' ' + 0;
            max_points[k] = item.max_points;
            k++;

            return (
                <div key={index} style={{ margin:'0 4px',
                    position: 'relative', display: 'flex',
                     zIndex: '80'
                }}>

                    <div className="starsImg1">
                        {item.mark === "3" &&
                        <span style={{
                            zIndex: '8',
                            position: 'relative'
                        }}>
                          <img width="20" src={`${star}`} alt="star"/>
                            <img width="20" src={`${star}`} alt="star"/>
                            <img width="20" src={`${star}`} alt="star"/>
                        </span>
                        }
                        {item.mark === "2" &&
                        <span style={{
                            zIndex: '8',
                            position: 'relative'
                        }}>
                            <img width="20" src={`${star}`} alt="star"/>
                            <img width="20" src={`${star}`} alt="star"/>
                            <img width="20" src={`${starEmpty}`} alt="star"/></span>
                        }
                        {item.mark === "1" &&
                        <span style={{
                            zIndex: '8',
                            position: 'relative'
                        }}>
                            <img width="20" src={`${star}`} alt="star"/>
                            <img width="20" src={`${starEmpty}`} alt="star"/>
                            <img width="20" src={`${starEmpty}`} alt="star"/></span>
                        }
                        {(item.mark === undefined || item.mark === '0') &&
                        <span style={{
                            zIndex: '8',
                            position: 'relative'
                        }}>
                            <img width="20" src={`${starEmpty}`} alt="star"/>
                            <img width="20" src={`${starEmpty}`} alt="star"/>
                            <img width="20" src={`${starEmpty}`} alt="star"/></span>
                        }
                    </div>
                   {/* <div className="play_butn"  id={item.type === '1' ? 2 : item.type === '3' ? 1 : item.type === '2' ? 3 : item.type === '5' ? 5 : 0 }
                         name={item.game_id} alt={k} onClick={this.gameChosen_new}/>*/}
                    <div id="coins" style={{display: 'none'}}>

                        {item.points !== undefined ? ' ' + item.points : ' ' + 0 }/ {item.max_points}</div>

                    <button className={(!this.state.redBorder || !(item.mark === undefined || item.mark === '0')) ?
                        'gamescreenshot grow' : 'gamescreenshot grow animated bounceIn'} style={{
                        backgroundImage: `url(${url})`, backgroundRepeat: 'no-repeat',
                        backgroundSize: '127%', backgroundPosition: 'center', outline: 'none'
                    }}
              id={item.type === '1' ? 2 : item.type === '3' ? 1 : item.type === '2' ? 3 : item.type === '5' ? 5 : 0 }
                            name={item.game_id} alt={k} onClick={this.gameChosen_new}/>
                    <div className="game_background"/>
                </div>
            )

        });


        return (


            <div id="cont" className="cont_game"
                 /*style={{padding: this.state.game_type === 1 ? '0px 146px 0px 0px' : ''}}*/>
              {/*//  <input style={{color:'black', width:'100%'}} /> */}


                { this.props.gameList === 0 &&
                <div style={{position:'absolute',top:'130px', right:'12%'}} className='glist-wrap'>
                    <div className="glist">
                        {data}
                     {/*   <button onClick={this.fill_game}>fill</button>*/}
                    </div>


                    <div className="game_details" style={{
                        display: 'block',
                        top: this.state.anim ? '80px' : '12px',
                        opacity: this.state.anim ? '1' : '0',
                        transition: this.state.anim ? '0.5s ease-in-out' : '0.3s ease-in-out'
                    }}>
                        <p className="coins">
                            <img src={require(`../../images/coin.png`)} className="scoreImg_coin" width="25" height="25"
                                 alt="coin"/>
                            {this.state.code} / { this.state.max_points}</p>

                        <div className="starsImg">
                            {this.state.showStart === "3" &&
                            <span style={{
                                zIndex: '8',
                                position: 'relative'
                            }}>
                          <img width="20" src={`${star}`} alt="star"/>
                            <img width="20" src={`${star}`} alt="star"/>
                            <img width="20" src={`${star}`} alt="star"/>
                        </span>
                            }
                            {this.state.showStart === "2" &&
                            <span style={{
                                zIndex: '8',
                                position: 'relative'
                            }}>
                            <img width="20" src={`${star}`} alt="star"/>
                            <img width="20" src={`${star}`} alt="star"/>
                            <img width="20" src={`${starEmpty}`} alt="star"/></span>
                            }
                            {this.state.showStart === "1" &&
                            <span style={{
                                zIndex: '8',
                                position: 'relative'
                            }}>
                            <img width="20" src={`${star}`} alt="star"/>
                            <img width="20" src={`${starEmpty}`} alt="star"/>
                            <img width="20" src={`${starEmpty}`} alt="star"/></span>
                            }
                            {(eachGameStars[`"${this.state.currrent_game_id}"`] === undefined || eachGameStars[`"${this.state.currrent_game_id}"`] === '0') &&
                            <span style={{
                                zIndex: '8',
                                position: 'relative'
                            }}>
                            <img width="20" src={`${starEmpty}`} alt="star"/>
                            <img width="20" src={`${starEmpty}`} alt="star"/>
                            <img width="20" src={`${starEmpty}`} alt="star"/></span>
                            }
                        </div>

                        

                        {
                            this.state.showButton === 3 ?
                                <div>
                                <button className="button_green" onClick={this.playMulti}
                                        style={{display: this.state.this_game ? '' : 'none'}}
                                        id={this.state.currrent_game_type}
                                        name={this.state.currrent_game_id}> {this.props.lang === 'eng'?'MultiPlayer':'Խաղալ Զույգով'}
                                </button> 
                                <button className="button_green" onClick={this.gameChosen}
                                        style={{display: this.state.this_game ? '' : 'none'}}
                                        id={this.state.currrent_game_type}
                                        name={this.state.currrent_game_id}> {this.props.lang === 'eng'?'Play game':'Խաղալ'}
                                </button>
                                </div>
                                :
                                <button className="button_green" onClick={this.gameChosen}
                                        style={{display: this.state.this_game ? '' : 'none'}}
                                        id={this.state.currrent_game_type}
                                        name={this.state.currrent_game_id}> {this.props.lang === 'eng'?'Play game':'Խաղալ'}
                                </button>
                                


                        }


                    </div>

                    {/* <div>
                     <button className="button_green" style={{margin: ' 0 30% 0 0 ', padding: '10px',display:'none'}}
                     onClick={this.replay}> Replay Video
                     </button>
                     <button className="button_orange1"
                     style={{
                     margin: ' 0  0 0 30% ',
                     opacity: k1 >= 4 ? '1' : '0.3',
                     cursor: k1 >= 4 ? '' : 'no-drop',
                     display:'none'
                     }}
                     onClick={k1 >= 4 ? this.goToNextLesson : this.selectBorderColor}>Next Lesson
                     </button>
                     </div>*/}
                </div>
                }
                { this.props.gameList === 'fill_game' ?
                    <Fill_game   g_over={this.UnityPoints} nextQuiz={this.nextQ} gameID={this.props.game_id}/>  :null


                }
                {this.props.gameList === 1 &&
                <div>
                    <div style={{margin: '0 auto' }}>
                        <div id="page-loader" className="page-loader" style={{ display: this.state.checkForLoadUnity ? 'block' : 'none'}}>
                            <iframe id="demo_tetr"  src='https://omegacoding.com/before_loading_unity/tetris.php' frameBorder={0} style={{width: '100vw',
                                height: '100vh'}}></iframe>

                         {/*   <div className="demo-modal-fragment" style={{ display: this.state.modalUnity ? 'block' : 'none'}}>
                                <div className="demo-modal-fragment-content demo-modal" style={{padding: p === 0 ?'0px 32px':''}}>
                                    {p > 0 && <span className="bet-fragment-close" onClick={this.fragCloseX}>×</span>}
                                    <div className="demo-fragment-modal-header ">
                                        <h2  style={{fontSize: '25px'}}>Loading Complete</h2>
                                    </div>
                                    <div className="bet-fragment-modal-body">
                                        <span className="bet-frag-frame">Now you can play the main game!</span>
                                    </div>
                                    {p === 0 &&
                                    <div className="bet-fragment-modal-footer">
                            <span className="bet-fragment-close-btn " style={{left:0}}>
                              <MuiThemeProvider>
                                  <FlatButton
                                      label="Ok"
                                      style={{border: '1px dotted grey',color: 'white',
                                          margin: '0 auto',  backgroundColor: '#00BCD4'}}
                                      primary={true}
                                      onClick={this.close_hello_moadl}
                                  />
                              </MuiThemeProvider>
                            </span>
                                    </div>
                                    }
                                </div>
                            </div>*/}

{/*
                            <div style={{textAlign: 'center'}}>
                                <div className="page-loader-body">
                                    <div className="cssload-loader">
                                        <div className="cssload-inner cssload-one"></div>
                                        <div className="cssload-inner cssload-two"></div>
                                        <div className="cssload-inner cssload-three"></div>
                                    </div>
                                </div>
                            </div>
*/}
                        </div>
                    </div>

                     <div style={{display: this.state.showFinalPoints ? 'none' : 'block'}}>
                     {this.state.renderPoints &&
                     <PointsUnity game={game} count_mark={this.count_mark}
                     self_mark={this.self_mark}
                     count_mark_func={this.count_func}
                     data={this.gameContinue}
                     backTo={this.props.backToLevel} replayAgain={this.replayGame}
                     gameID={this.props.game_id} game_type={(this.state.game_type)}
                     points={this.state.unitypoints}
                     stars={this.state.numberOfStarsUnity}
                     level={this.props.level_ID} course_Data={this.props.course_Data}
                     course={this.props.courseName}/>
                     }
                     </div>
                     <div style={{display: !this.state.showFinalPoints ? 'none' : 'block'}}>
                         <iframe id="unity_iframe" src={this.props.linkForUnity} onLoad={this.start()}
                                 frameBorder="0" style={{width: '100vw', height: '100vh'}}></iframe>



                     </div>
                </div>
                }
                { this.props.gameList === 2 &&
                <Notepad game={game} count_mark={this.count_mark} self_mark={this.self_mark}
                         backTo={this.props.backToLevel} replayAgain={this.replayGame} gameID={this.props.game_id}
                         level_id={this.props.level_ID} course_Data={this.props.course_Data}
                         course_Name={this.props.courseName} game_over={this.UnityPoints}
                         show_wonderTitle={this.props.show_wonderTitle}
                />
                }

                { this.props.gameList === 3 &&
                <AlphabetGame game={game} count_mark={this.count_mark} self_mark={this.self_mark}
                              data={this.gameContinue} gameId={this.props.game_id} multi={this.state.multi}
                              level={this.props.level_ID} userId={this.props.userProfile.uid}
                              userProfile={this.props.userProfile}
                              backTo={this.props.backToLevel}
                              course_Data={this.props.course_Data}
                              course_Name={this.props.courseName} lessonLink={this.props.videoLink}
                              g_over={this.UnityPoints}
                />

                }
                { this.props.gameList === 100 && this.state.is_openUnity &&
                <PointsUnity game={game} count_mark={this.count_mark} self_mark={this.self_mark}
                             data={this.gameContinue}
                             count_mark_func={this.count_func}
                             backTo={this.props.backToLevel} replayAgain={this.replayGame} gameID={this.props.game_id}
                             game_type={(this.state.game_type)} points={this.state.unitypoints}
                             stars={this.state.numberOfStarsUnity} level={this.props.level_ID}
                             course_Data={this.props.course_Data} course={this.props.courseName}
                             courseData={this.props.courseData}/>
                }


            </div>
        )

    }
}

const store = state => ({
    gameList: state.gamelist,
    replay: state.replayGame,
    userProfile: state.userProfileData,
    game_id: state.getGame_Id,
    lock: state.videolockercount,
    linkForUnity: state.unityLink,
    lang:state.lang,
    course_name:state.current_courseID,
    getUnityDesktop: state.getUnityDesktop
});

const dispatch = dispatch => ({
    replay: tabIndex => dispatch({type: 'REPLAY_GAME', payload: tabIndex}),
    getOldpoints: tabIndex => dispatch({type: 'GET_USER_OLD_POINTS', payload: tabIndex}),
    gotogamelist: tabIndex => dispatch({type: 'GOTO_GAMELIST', payload: tabIndex}),
    getgameid: tabIndex => dispatch({type: 'GET_GAMELID', payload: tabIndex}),
    navigateTo: location => dispatch(push(location)),
    countForlock: count => dispatch({type: 'OPEN_CLOSE_LESSONS', payload: count}),
    setUnityLink: count => dispatch({type: 'GET_UNITY_LINK', payload: count}),
    setGemaInfo: data => dispatch({type: 'SET_GAME_INFO', payload: data}),
    toggleNavMenu: newState => {
        dispatch({type: 'TOGGLE_NAV_MENU', payload: newState});
    },
    addUserDiamonds: newState => {
        dispatch({type: 'CHANGE_DIAMONDS', payload: newState});
    },
    changeUserDiamonds: newState => {
        dispatch({type: 'ADD_USER_DIAMONDS', payload: newState});
    },
    showCoinsModalForHelp: newState => {
        dispatch({type: 'TOGGLE_COINS_FIRST_MODAL', payload: newState});
    },
    togglePriceTable: newState => {
        dispatch({type: 'TOGGLE_PRICE_TABLE', payload: newState});
    },
    changeUnityDesktop: newState => {
        dispatch({ type: 'GET_UNITY_DESKTOP', payload: newState});
    }
});

export default connect(
    store,
    dispatch
)(CurrentCourse)
