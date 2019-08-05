import React, {Component} from 'react';
import {connect} from 'react-redux';
import Notepad from './notepadGame/Notepad';
import '../../styles/notepadGame/style.css';
import '../../styles/notepadGame/animation.css';
import '../../styles/bounceIn.css';
import '../../styles/notepadGame/lastPage.css';
import {Message, Unity}  from 'react-unity-webgl';
import AlphabetGame from './alphabetGame/BetGame.js';
import PointsUnity from './UnityPointer';
import {push} from 'react-router-redux';

let star = require('../../images/star.png');
let question = require('../../images/gamesLogo/mejtex.png');
let url = `url(${question})`;
let inter_start;
let inter_start_call;
let storage;
let current_max_pnts;

let starEmpty = require('../../images/starEmpty.png');

class CurrentCourse extends Component {
    constructor() {
        super();
        this.state = {
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
            current_max_points:'',
            multi_unity:false,


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
        Message('idle', 'GameStart')
    };
    retryUnity_puzzle = () => {
        Message('Table', 'GameStart')
    };

    replayGame = (e) => {
        this.ClearStorage();
       // alert(e);
      //  alert(typeof e);
        if (e * 1 === 4) {
            this.setState({
                showFinalPointsPuzzle: true,
                renderPointsPuzzle: false
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
                    this.setState({
                        is_openUnity: false
                    });
                    this.props.gotogamelist(2);
                }
            }
        }
        // this.props.replay(true);
    };

    replay = () => {
        this.props.replVideo(true);
    };
    UnityPoints = (e) => {
        this.setState({
            unitypoints: e * 1
        });
        let k=e * 1;
        let c=current_max_pnts*1;
        let per = (k*100)/c;

          if ((per >0 ) && (per <=30 )) {
            this.setState({numberOfStarsUnity: 1})
        }
        else if (per >30&& per <=65) {
            this.setState({numberOfStarsUnity: 2})
        }
          else if (per >65) {
              this.setState({numberOfStarsUnity:3})
          }
          else  {
              this.setState({numberOfStarsUnity: 0})
          }

       /*   if ((per >=0 ) && (per <30 )) {
            this.setState({numberOfStarsUnity: 0})
        }
        else if (per >=30&& per <55) {
            this.setState({numberOfStarsUnity: 1})
        }
          else if (per >=55&& per <80) {
              this.setState({numberOfStarsUnity: 2})
          }

          else if (per >=80) {
              this.setState({numberOfStarsUnity: 3})
          }
*/
        if (this.state.game_type === 4) {
            clearInterval(inter_start_call);
                this.setState({
                showFinalPointsPuzzle: false,
                renderPointsPuzzle: true
            })
        }
        else if (this.state.game_type === 3) {
            clearInterval(inter_start_call);

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
        else if (this.state.game_type === 2) {
            this.setState({
                showFinalPoints: false,
                renderPoints: true
            });
            this.setState({
                is_openUnity: true
            });
            this.props.gotogamelist(100);
        }
    };

    start = () => {
        if (this.state.showFinalPoints) {
            inter_start = setInterval(() => {
                localStorage.getItem("cc9869f7b35ec38acd2d394fac43cc75") === "b4b718717ff98450c77196d9808383a3" ?
                    this.useStorage() : ''  // start
            }, 100)
        }
    };
    start1 = () => {
        if (this.state.showFinalPointsPuzzle) {
            inter_start = setInterval(() => {
                localStorage.getItem("cc9869f7b35ec38acd2d394fac43cc75") === "b4b718717ff98450c77196d9808383a3" ?
                    this.useStorage() : ''  // start1
            }, 100)
        }
    };

    useStorage = () => {
        clearInterval(inter_start);
        inter_start_call = setInterval(() => {
            storage = localStorage.getItem("fb30df4632d7d3908952da6106296b6d"); // unity
            if (storage !== null && storage !== '') {
                this.UnityPoints(storage);
            }
        }, 200)
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
    gameChosen = (e) => {

        let gg = this.state.glist;

        // console.log(gg, "gggggggggggggggggggggggggggggg")
        for (let j = 0; j <= gg.length - 1; j++) {
            if (gg[j].game_id * 1 !== e.target.name * 1) {
                if (gg[j].mark === '0') {
                    this.count_mark++;
                }
            }
            else {
                if (gg[j].mark === '0') {
                    this.self_mark++;
                }
            }
        }
        //  console.log(this.count_mark, "this.count_mark")
        // console.log(this.self_mark, "this.self_mark")
        if (e.target.id * 1 === 0) {
            this.props.gotogamelist(4);
            this.props.getgameid(e.target.name * 1);
            this.props.navigateTo(this.paths[1] + '?' + e.target.name * 1);
            this.setState({
                game_type: 4
                           })
            current_max_pnts= this.state.current_max_points[e.target.name * 1]
           // console.log(current_max_pnts,"444444444444")
        }
        if (e.target.id * 1 === 1) {
            this.props.gotogamelist(e.target.id * 1);
            this.props.getgameid(e.target.name * 1);
            this.props.navigateTo(this.paths[1] + '?' + e.target.name * 1);
            this.setState({
                game_type: 3
            })
            current_max_pnts= this.state.current_max_points[e.target.name * 1]
           // console.log(current_max_pnts,"33333333333333")
        }
        else if (e.target.id * 1 === 3) {
            this.props.gotogamelist(e.target.id * 1);
            this.props.getgameid(e.target.name * 1);
            this.setState({
                game_type: 2
            })
            current_max_pnts= this.state.current_max_points[e.target.name * 1]
           // console.log(current_max_pnts,"222222222222")
        }
        else if (e.target.id * 1 === 2) {
            this.props.gotogamelist(e.target.id * 1);
            this.props.getgameid(e.target.name * 1);
            this.setState({
                game_type: 1
            })
            current_max_pnts= this.state.current_max_points[e.target.name * 1]
           // console.log(current_max_pnts,"1111111111111111111")
        }
    };
    count_func = (e) => {
        if (e) {
            this.count_mark--;
        }
        return this.count_mark;
    };
    gameContinue = (type, id) => {
        //alert (type );
        //  alert (id );
        this.ClearStorage();
        this.setState({
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
                this.props.navigateTo(this.paths[1] + '?' + id * 1)

            }
            else if (type * 1 === 4) {
                this.props.gotogamelist(4);
                this.props.getgameid(id * 1);
                this.props.navigateTo(this.paths[1] + '?' + id * 1)
            }
        }
    };

    playMulti = (e) => {
        this.setState({
            multi: true
        });
        this.props.gotogamelist(e.target.id * 1);
        this.props.getgameid(e.target.name * 1);
    };

    playMulti_Unity = (e) => {
        this.setState({
            multi_unity: true
        });
        this.gameChosen(e);
       // this.props.gotogamelist(e.target.id * 1);
      // this.props.getgameid(e.target.name * 1);
    };


    componentWillMount() {
        this.setState({
            gameList: this.props.gameList,
            courseData: this.props.courseData,
            courseName: this.props.courseName,
            uid: this.props.userProfile.uid,
            glist: this.props.img,
            locker_count: this.props.lock,
            current_max_points:this.props.max_points,
        })
    }

    componentWillReceiveProps(props) {
        this.setState({
            gameList: props.gameList,
            courseData: props.courseData,
            courseName: props.courseName,
            uid: props.userProfile.uid,
            glist: props.img,
            locker_count: props.lock,
            current_max_points:props.max_points,
        })
    }

    render() {
        let game = this.state.glist;
               //console.log(this.state.showFinalPointsPuzzle,"this.state.showFinalPointsPuzzle");
        //  console.log(this.state.showFinalPoints,"this.state.showFinalPoints")
        // console.log(this.state.renderPointsPuzzle,"renderPointsPuzzlerenderPointsPuzzle")
     // console.log(game,"gamegamegamegame");
        //  console.log(this.state.numberOfStarsUnity,"numberOfStarsUnity")
        let arr1 = game.slice(0, 2);
        let arr2 = game.slice(2, 4);
        let k1 = 0;
        let data;
        data = arr1.map((item, index) => {
            item.mark >= 1 ? k1++ : '';
            let url = require(`../../images/gamesLogo/${item.mark === undefined || item.mark === '0' ? 'not' +
                item.type + '.png' : item.type + '.png'}`);
            return (
                <div key={index} style={{width: '35%', height: 'auto'}}>
                    <div className={(!this.state.redBorder || !(item.mark === undefined || item.mark === '0')) ?
                        'gamescreenshot' : 'gamescreenshot  animated bounceIn' } style={{
                        backgroundImage: `url(${url})`, backgroundRepeat: 'no-repeat',
                        backgroundSize: '100%'
                    }}/>
                    <div className="starsImg">
                        {item.mark === "3" &&
                        <span>
                            <img width="30" src={`${star}`} alt="star"/>
                            <img width="30" src={`${star}`} alt="star"/>
                            <img width="30" src={`${star}`} alt="star"/>
                        </span>
                        }
                        {item.mark === "2" &&
                        <span>
                            <img width="30" src={`${star}`} alt="star"/>
                            <img width="30" src={`${starEmpty}`} alt="star"/>
                            <img width="30" src={`${starEmpty}`} alt="star"/>
                        </span>
                        }
                        {item.mark === "1" &&
                        <span>
                            <img width="30" src={`${star}`} alt="star"/>
                            <img width="30" src={`${starEmpty}`} alt="star"/>
                            <img width="30" src={`${starEmpty}`} alt="star"/>
                        </span>
                        }
                        {(item.mark === undefined || item.mark === '0') &&
                        <span>
                            <img width="30" src={`${starEmpty}`} alt="star"/>
                            <img width="30" src={`${starEmpty}`} alt="star"/>
                            <img width="30" src={`${starEmpty}`} alt="star"/>
                        </span>
                        }
                    </div>
                    <p><img src={require(`../../images/coin.png`)} className="scoreImg" width="22px" height="22px"
                            alt="coin"/>
                        {item.points !== undefined ? ' ' + item.points : ' ' + 0 }/ {item.max_points}</p>
                    <button className="button_green" onClick={this.gameChosen}
                            id={item.type === '1' ? 2 : item.type === '3' ? 1 :
                                item.type === '2' ? 3 : 0 }
                            name={item.game_id}> { item.type === '2' ? 'Single Player' : 'Play game'}
                    </button>
                    {item.type === '2' &&
                    <button className="button_green" onClick={this.playMulti}
                            id={3}
                            name={item.game_id}> Multiplayer
                    </button>

                    }
                    {item.type === '3' &&
                    <button className="button_green" onClick={this.playMulti_Unity}
                            id={1} name={item.game_id}> MultiPlayer
                    </button>
                    }
                </div>

            )
        })
        let data1;
        data1 = arr2.map((item, index) => {
            item.mark >= 1 ? k1++ : '';
            let url = require(`../../images/gamesLogo/${item.mark === undefined || item.mark === '0' ?
                'not' + item.type + '.png' : item.type + '.png'}`);
            return (

                <div key={index} style={{width: '35%', height: 'auto'}}>
                    <div className={(!this.state.redBorder || !(item.mark === undefined || item.mark === '0')) ?
                        'gamescreenshot' : 'gamescreenshot  animated bounceIn' } style={{
                        backgroundImage: `url(${url})`, backgroundRepeat: 'no-repeat',
                        backgroundSize: '100%'
                    }}/>
                    <div className="starsImg">
                        {item.mark === "3" &&
                        <span>
                          <img width="30" src={`${star}`} alt="star"/>
                            <img width="30" src={`${star}`} alt="star"/>
                            <img width="30" src={`${star}`} alt="star"/>
                        </span>
                        }
                        {item.mark === "2" &&
                        <span>
                            <img width="30" src={`${star}`} alt="star"/>
                            <img width="30" src={`${starEmpty}`} alt="star"/>
                            <img width="30" src={`${starEmpty}`} alt="star"/></span>
                        }
                        {item.mark === "1" &&
                        <span>
                            <img width="30" src={`${star}`} alt="star"/>
                            <img width="30" src={`${starEmpty}`} alt="star"/>
                            <img width="30" src={`${starEmpty}`} alt="star"/></span>
                        }
                        {(item.mark === undefined || item.mark === '0') &&
                        <span>
                            <img width="30" src={`${starEmpty}`} alt="star"/>
                            <img width="30" src={`${starEmpty}`} alt="star"/>
                            <img width="30" src={`${starEmpty}`} alt="star"/></span>
                        }
                    </div>
                    <p><img src={require(`../../images/coin.png`)} className="scoreImg" width="22px"
                            height="22px" alt="coin"/> {item.points !== undefined ?
                        ' ' + item.points : ' ' + 0} / {item.max_points} </p>
                    <button className="button_green" onClick={this.gameChosen}
                            id={item.type === '1' ? 2 : item.type === '3' ? 1 : item.type === '2' ? 3 : 0 }
                            name={item.game_id}> { item.type === '2' ? 'Single Player' : 'Play game'}
                    </button>
                    {item.type === '2' &&
                    <button className="button_green" onClick={this.playMulti}
                            id={3} name={item.game_id}> MultiPlayer
                    </button>
                    }
                    {item.type === '3' &&
                    <button className="button_green" onClick={this.playMulti_Unity}
                            id={1} name={item.game_id}> MultiPlayer
                    </button>
                    }
                </div>
            )
        })
        return (
            <div className="cont_game">
                { this.props.gameList === 0 &&
                <div style={{
                    backgroundImage: `${url}`, backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center 36%', width: '100%', height: '80%', marginTop: '2%'
                }}>
                    <div className="glist">
                        {data}
                    </div>
                    <div className="glist">
                        {data1}
                    </div>
                    <div>
                        <button className="button_green" style={{margin: ' 0 30% 0 0 ', padding: '10px'}}
                                onClick={this.replay}> Replay Video
                        </button>
                        <button className="button_orange1"
                                style={{
                                    margin: ' 0  0 0 30% ',
                                    opacity: k1 >= 4 ? '1' : '0.3',
                                    cursor: k1 >= 4 ? '' : 'no-drop'
                                }}
                                onClick={k1 >= 4 ? this.goToNextLesson : this.selectBorderColor}>Next Lesson
                        </button>
                    </div>
                </div>
                }
                {this.props.gameList === 1 &&
                <span>
                                 <div style={{margin: '0 auto'}}>
                                  <div id="page-loader" className="page-loader">
                                    <div style={{textAlign: 'center'}}>
                                      <div className="page-loader-body">
                                        <div className="cssload-loader">
                                          <div className="cssload-inner cssload-one"></div>
                                          <div className="cssload-inner cssload-two"></div>
                                          <div className="cssload-inner cssload-three"></div>
                                        </div>
                                      </div>
                                    </div>
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
                             <Unity src={!this.state.multi_unity?"Build/WebGl.json":"Build/MultiGl.json"} />
                                           {this.start()}
                                       </div>
                                </span>
                }
                { this.props.gameList === 2 &&
                <Notepad game={game} count_mark={this.count_mark} self_mark={this.self_mark}
                         backTo={this.props.backToLevel} replayAgain={this.replayGame} gameID={this.props.game_id}
                         level_id={this.props.level_ID} course_Data={this.props.course_Data}
                         course_Name={this.props.courseName} game_over={this.UnityPoints}
                />
                }

                { this.props.gameList === 3 &&
                <AlphabetGame game={game} count_mark={this.count_mark} self_mark={this.self_mark}
                              data={this.gameContinue} gameId={this.props.game_id} multi={this.state.multi}
                              level={this.props.level_ID} userId={this.props.userProfile.uid}
                              backTo={this.props.backToLevel}
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
                             course_Data={this.props.course_Data} course={this.props.courseName} />
                }

                {this.props.gameList === 4 &&
                <span>
                                  <div style={{margin: '0 auto'}}>
                                  <div style={{margin: '0 auto'}}>
                                  <div id="page-loader" className="page-loader">
                                    <div style={{textAlign: 'center'}}>
                                      <div className="page-loader-body">
                                        <div className="cssload-loader">
                                          <div className="cssload-inner cssload-one"></div>
                                          <div className="cssload-inner cssload-two"></div>
                                          <div className="cssload-inner cssload-three"></div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                </div>
                                 <div style={{display: this.state.showFinalPointsPuzzle ? 'none' : 'block'}}>
                                        {this.state.renderPointsPuzzle &&
                                        <PointsUnity game={game} count_mark={this.count_mark} self_mark={this.self_mark}
                                                     count_mark_func={this.count_func}
                                                     data={this.gameContinue}
                                                     backTo={this.props.backToLevel} replayAgain={this.replayGame}
                                                     gameID={this.props.game_id} game_type={this.state.game_type}
                                                     points={this.state.unitypoints}
                                                     stars={this.state.numberOfStarsUnity}
                                                     level={this.props.level_ID} course_Data={this.props.course_Data}
                                                     course={this.props.courseName}/>
                                        }
                                     </div>
                                       <div style={{display: !this.state.showFinalPointsPuzzle ? 'none' : 'block'}}>
                             <Unity src={"Build/Web2DTag.json"}/>
                                           {this.start1()}
                                       </div>
                                </span>
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
});

const dispatch = dispatch => ({
    replay: tabIndex => dispatch({type: 'REPLAY_GAME', payload: tabIndex}),
    gotogamelist: tabIndex => dispatch({type: 'GOTO_GAMELIST', payload: tabIndex}),
    getgameid: tabIndex => dispatch({type: 'GET_GAMELID', payload: tabIndex}),
    navigateTo: location => dispatch(push(location)),
    countForlock: count => dispatch({type: 'OPEN_CLOSE_LESSONS', payload: count}),

});

export default connect(
    store,
    dispatch
)(CurrentCourse)
