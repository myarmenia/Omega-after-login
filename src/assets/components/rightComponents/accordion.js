import React, { Component } from 'react';
import '../../styles/accordion.css';
import { chunk } from 'lodash';
import { connect } from 'react-redux';
import Notepad from './notepadGame/Notepad';
import '../../styles/notepadGame/style.css';
import '../../styles/notepadGame/animation.css';
import '../../styles/bounceIn.css';
import '../../styles/notepadGame/lastPage.css';
import {Message, Unity}  from 'react-unity-webgl';
import AlphabetGame from './alphabetGame/BetGame.js';
import PointsUnity from './UnityPointer';
import { push } from 'react-router-redux';
import { SendMessage } from 'react-unity-webgl'

let star = require('../../images/star.png');
let inter_start;
let inter_start_call;
let storage;
let starEmpty = require('../../images/starEmpty.png');
let obj1 = {};
let obj2;
let game = [];
let formap = [];
let formap1 = [{
    mark: "",
    points: ""
}, {
    mark: "",
    points: ""
}, {
    mark: "",
    points: ""
}, {
    mark: "",
    points: ""
}];
let lvl_ID = "c";
let levelID = 0;
let current_max_pnts;

class Accordion extends Component {
    constructor() {
        super();
        this.state = {
            open: true,
            class: 'section',
            invis: 'invis',
            openedClass: 'section open',
            courseData: [],
            id: 1,
            glist: [],
            hide: false,
            numberOfStarsUnity: '',
            currentCourse: [],
            gameID: '',
            unitypoints: '',
            is_openUnity: true,
            game_type: 1,
            renderPoints: false,
            renderPointsPuzzle: false,
            showFinalPointsPuzzle: true,
            showFinalPoints: true,
            data2: [],
            data3: [],
            videoLink: '',
            multi: false,
            tabIndex: "",
            current_max_points: "",
            multi_unity: false,
        }
        this.paths = ['/office', '/orders', '/statistics', '/settings'];
        this.count_mark = 0;
        this.self_mark = 0;
        this.ClearStorage();
    }

    getData = (e) => {
        if (lvl_ID !== e.target.id) {
            lvl_ID = e.target.id
            this.setState({
                id: lvl_ID.replace(/^[a-z]/g, "") * 1 + 1
            })
        } else {
            lvl_ID = ""
        }
        levelID = lvl_ID !== "" ? lvl_ID.replace(/^[a-z]/g, "") * 1 + 1 : this.state.id
        let info1 = `level=${encodeURI(levelID)}&course_id=${encodeURI(this.props.courseID)}`;
        // console.log(info1,"info1");
        fetch(`https://omegacoding.com/android_test/index.php`, {
            method: 'POST',
            headers: {
                "Content-type": "application/x-www-form-urlencoded",
                'Accept': 'application/json'
            },
            body: info1
        }).then(response => {
            if (response.ok) {
                return response.json();
            }
        }).then(response => {
            obj1 = response;
            let f = 0;
            for (let i in obj1) {
                if (i === 'game1' || i === 'game2' || i === 'game3' || i === 'game4') {
                    formap[f] = obj1[i];
                    f++;
                }
            }
            this.setState({
                data2: formap
            })
            if (response.video_link) {
                this.setState({
                    videoLink: response.video_link
                })
            }
        // console.log(obj1, "obj1");
        }).catch(error => {
            console.log(error);
        });
        let oper = 4;
        let info2 = `unique_id=${encodeURI(this.props.userProfile.uid)}&level=${encodeURI(levelID)}&operation=${oper}&course_name=${this.props.courseName}`;
        // console.log(info2, "-info2");
        fetch(`https://omegacoding.com/android_test/userProgressManager.php`, {
            method: 'POST',
            headers: {
                "Content-type": "application/x-www-form-urlencoded",
                'Accept': 'application/json'
            },
            body: info2
        }).then(response => {
            if (response.ok) {
                return response.json();
            }
        }).then(response => {
            obj2 = response;
            for (let i in obj2) {
                if (i === 'game1') {
                    formap1[0].mark = obj2[i].mark;
                    formap1[0].points = obj2[i].points;
                }
                if (i === 'game2') {
                    formap1[1].mark = obj2[i].mark;
                    formap1[1].points = obj2[i].points;
                }
                if (i === 'game3') {
                    formap1[2].mark = obj2[i].mark;
                    formap1[2].points = obj2[i].points;
                }
                if (i === 'game4') {
                    formap1[3].mark = obj2[i].mark;
                    formap1[3].points = obj2[i].points;
                }
            }
            // console.log(obj2, "obj2");
            this.setState({
                data3: formap1
            })
            if (response.video_link) {
                this.setState({
                    openVideo: true,
                    noLink: true,
                    videoLink: response.video_link
                });
            } else if (response.video_link === null) {
                this.setState({
                    noLink: false,
                    openVideo: true
                })
            }
        }).catch(error => {
            console.log(error);
        });
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

    whatdoDO = (e) => {
        this.props.gotogamelist(e)
    };

    close = (e) => {
        this.setState({
            hide: false
        })
        this.props.gotogamelist(e)
    }

    UnityPoints = (e) => {
        this.setState({
            unitypoints: e * 1
        });
        let k=e * 1;
        let c=current_max_pnts*1;
        let per = (k*100)/c
        if (this.state.game_type === 4) {
            clearInterval(inter_start_call);
            if ((e <= 600) && (e > 0)) {
                this.setState({
                    numberOfStarsUnity: 1
                })
            } else if (e > 600 && e <= 1400) {
                this.setState({
                    numberOfStarsUnity: 2
                })
            } else if (e > 1400) {
                this.setState({
                    numberOfStarsUnity: 3
                })
            } else {
                this.setState({
                    numberOfStarsUnity: 0
                })
            }
            this.setState({
                showFinalPointsPuzzle: false,
                renderPointsPuzzle: true
            })
        } else if (this.state.game_type === 3) {
            clearInterval(inter_start_call);
            if ((e <= 600) && (e > 0)) {
                this.setState({
                    numberOfStarsUnity: 1
                })
            } else if (e > 600 && e <= 1400) {
                this.setState({
                    numberOfStarsUnity: 2
                })
            } else if (e > 1400) {
                this.setState({
                    numberOfStarsUnity: 3
                })
            } else {
                this.setState({
                    numberOfStarsUnity: 0
                })
            }
            this.setState({
                showFinalPoints: false,
                renderPoints: true
            })
        } else if (this.state.game_type === 1) {
            if ((e <= 600) && (e > 0)) {
                this.setState({
                    numberOfStarsUnity: 1
                })
            } else if (e > 600 && e <= 1400) {
                this.setState({
                    numberOfStarsUnity: 2
                })
            } else if (e > 1400) {
                this.setState({
                    numberOfStarsUnity: 3
                })
            } else {
                this.setState({
                    numberOfStarsUnity: 0
                })
            }
            this.setState({
                showFinalPoints: false,
                renderPoints: true
            });
            this.setState({
                is_openUnity: true
            });
            this.props.gotogamelist(100);
        } else if (this.state.game_type === 2) {
            if ((e <= 600) && (e > 0)) {
                this.setState({
                    numberOfStarsUnity: 1
                })
            } else if (e > 600 && e <= 1400) {
                this.setState({
                    numberOfStarsUnity: 2
                })
            } else if (e > 1400) {
                this.setState({
                    numberOfStarsUnity: 3
                })
            } else {
                this.setState({
                    numberOfStarsUnity: 0
                })
            }
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
              if (localStorage.getItem("cc9869f7b35ec38acd2d394fac43cc75") === "b4b718717ff98450c77196d9808383a3") {
                this.useStorage();
              }
                // localStorage.getItem("cc9869f7b35ec38acd2d394fac43cc75") === "b4b718717ff98450c77196d9808383a3" ?
                //     this.useStorage() : '' // start
            }, 100)
        }
    };

    start1 = () => {
        if (this.state.showFinalPointsPuzzle) {
            inter_start = setInterval(() => {
              if (localStorage.getItem("cc9869f7b35ec38acd2d394fac43cc75") === "b4b718717ff98450c77196d9808383a3") {
                this.useStorage();
              }
                // localStorage.getItem("cc9869f7b35ec38acd2d394fac43cc75") === "b4b718717ff98450c77196d9808383a3" ?
                //     this.useStorage() : '' // start1
            }, 100)
        }
    };

    useStorage = () => {
        clearInterval(inter_start);
        inter_start_call = setInterval(() => {
            storage = localStorage.getItem("fb30df4632d7d3908952da6106296b6d");
            if (storage !== null && storage !== '') {
                this.UnityPoints(storage);
            }
        }, 200)
    };

    playGame = (e) => {
        this.setState({
            hide: true,
            gameID: e.target.name * 1
        })
        let gg = this.state.glist;
        for (let j = 0; j <= gg.length - 1; j++) {
            for (let i in gg[j]) {
                if (gg[j][i].game_id * 1 !== e.target.name * 1) {
                    if (gg[j][i].mark === '0') {
                        this.count_mark++;
                    }
                } else {
                    if (gg[j][i].mark === '0') {
                        this.self_mark++;
                    }
                }
            }
        }
        if (e.target.value * 1 === 0) {
            this.props.gotogamelist(4);
            this.props.getgameid(e.target.name * 1);
            this.props.navigateTo(this.paths[1] + '?' + e.target.name * 1)
            this.setState({
                game_type: 4
            })
        }
        current_max_pnts= this.state.current_max_points[e.target.name * 1]
        if (e.target.value * 1 === 1) {
            this.props.gotogamelist(e.target.value * 1);
            this.props.getgameid(e.target.name * 1);
            this.props.navigateTo(this.paths[1] + '?' + e.target.name * 1)
            this.setState({
                game_type: 3
            })
        current_max_pnts= this.state.current_max_points[e.target.name * 1]
        } else if (e.target.value * 1 === 3) {
            this.props.gotogamelist(e.target.value * 1);
            this.props.getgameid(e.target.name * 1);
            this.setState({
                game_type: 2
            })
        current_max_pnts= this.state.current_max_points[e.target.name * 1]
        } else if (e.target.value * 1 === 2) {
            this.props.gotogamelist(e.target.value * 1);
            this.props.getgameid(e.target.name * 1);
            this.setState({
                game_type: 1
            })
        }
    }

    count_func = (e) => {
        if (e) {
            this.count_mark--;
        }
        return this.count_mark;
    };

    gameContinue = (type, id) => {
        if (type * 1 === 1) {
            this.props.gotogamelist(2);
            this.props.getgameid(id * 1);
        } else {
            if (type * 1 === 2) {
                this.props.gotogamelist(3);
                this.props.getgameid(id * 1);
            } else if (type * 1 === 3) {
                this.props.gotogamelist(1);
                this.props.getgameid(id * 1);
                this.props.navigateTo(this.paths[1] + '?' + id * 1)
            } else if (type * 1 === 4) {
                this.props.gotogamelist(4);
                this.props.getgameid(id * 1);
                this.props.navigateTo(this.paths[1] + '?' + id * 1)
            }
        }
    };

    retryUnity = () => {
        Message('idle', 'GameStart')
    }

    retryUnity_puzzle = () => {
        Message('Table', 'GameStart')
    }

    replayGame = (e) => {
        this.ClearStorage();
        if (e * 1 === 4) {
            this.setState({
                showFinalPointsPuzzle: true,
                renderPointsPuzzle: false
            });
            this.retryUnity_puzzle();
        } else {
            if (e * 1 === 3) {
                this.setState({
                    showFinalPoints: true,
                    renderPoints: false
                });
                this.retryUnity();
            } else {
                if (e * 1 === 2) {
                    this.setState({
                        is_openUnity: false
                    });
                    this.props.gotogamelist(3);
                } else {
                    this.setState({
                        is_openUnity: false
                    });
                    this.props.gotogamelist(2);
                }
            }
        }
    };

    playMulti = (e) => {
        this.setState({
            multi: true
        });
        this.playGame(e);
    };

    playMulti_Unity = (e) => {
        this.setState({
            multi_unity: true
        });
        this.playGame(e);
    };

    componentWillMount() {
        let info1 = `level=${encodeURI(1)}&course_id=${encodeURI(this.props.courseID)}`;
        // console.log(info1,"info1");
        fetch(`https://omegacoding.com/android_test/index.php`, {
            method: 'POST',
            headers: {
                "Content-type": "application/x-www-form-urlencoded",
                'Accept': 'application/json'
            },
            body: info1
        }).then(response => {
            if (response.ok) {
                return response.json();
            }
        }).then(response => {
            obj1 = response;
            let f = 0;
            for (let i in obj1) {
                if (i === 'game1' || i === 'game2' || i === 'game3' || i === 'game4') {
                    formap[f] = obj1[i];
                    f++;
                }
            }
            this.setState({
                data2: formap
            })
            if (response.video_link) {
                this.setState({
                    videoLink: response.video_link
                })
            }
        // console.log(obj1, "obj1");
        }).catch(error => {
            console.log(error);
        });
        let oper = 4;
        let info2 = `unique_id=${encodeURI(this.props.userProfile.uid)}&level=${encodeURI(1)}&operation=${oper}&course_name=HTML`;
        // console.log(info2, "-info2");
        fetch(`https://omegacoding.com/android_test/userProgressManager.php`, {
            method: 'POST',
            headers: {
                "Content-type": "application/x-www-form-urlencoded",
                'Accept': 'application/json'
            },
            body: info2
        }).then(response => {
            if (response.ok) {
                return response.json();
            }
        }).then(response => {
            obj2 = response;
            for (let i in obj2) {
                if (i === 'game1') {
                    formap1[0].mark = obj2[i].mark;
                    formap1[0].points = obj2[i].points;
                }
                if (i === 'game2') {
                    formap1[1].mark = obj2[i].mark;
                    formap1[1].points = obj2[i].points;
                }
                if (i === 'game3') {
                    formap1[2].mark = obj2[i].mark;
                    formap1[2].points = obj2[i].points;
                }
                if (i === 'game4') {
                    formap1[3].mark = obj2[i].mark;
                    formap1[3].points = obj2[i].points;
                }
            }
            // console.log(obj2, "obj2");
            this.setState({
                data3: formap1
            })
            if (response.video_link) {
                this.setState({
                    openVideo: true,
                    noLink: true,
                    videoLink: response.video_link
                });
            } else if (response.video_link === null) {
                this.setState({
                    noLink: false,
                    openVideo: true
                })
            }
        }).catch(error => {
            console.log(error);
        });
        this.setState({
            glist: this.props.data
        });
        this.setState({
            tabIndex: this.props.index
        })
        if (this.state.tabIndex += 1) {
            lvl_ID = "c"
        }
        if (this.state.tabIndex -= 1) {
            lvl_ID = "c"
        }
    }

    render () {
        let lesnum = 0;
        let formap = this.state.data2 !== undefined ? this.state.data2 : this.props.data
        let formap1 = this.state.data3 !== undefined ? this.state.data3 : this.props.data
    if (this.props.data.length >= 6) {
        const chunked = chunk(this.props.data, Math.round(this.props.data.length / 2));
        const list0 = chunked[0].map((item, index) => {
        lesnum++;
        let i = 'a' + index
        let url1 = formap1[0] !== undefined && formap1[0].points !== "0" ?
            require(`../../images/gamesLogo/${formap[0] === undefined ? 0 : formap[0].type}.png`) :
            require(`../../images/gamesLogo/not${formap[0] === undefined ? 0 : formap[0].type}.png`);
        let url2 = formap1[1] !== undefined && formap1[1].points !== "0" ?
            require(`../../images/gamesLogo/${formap[1] === undefined ? 0 : formap[1].type}.png`) :
            require(`../../images/gamesLogo/not${formap[1] === undefined ? 0 : formap[1].type}.png`);
        let url3 = formap1[2] !== undefined && formap1[2].points !== "0" ?
            require(`../../images/gamesLogo/${formap[2] === undefined ? 0 : formap[2].type}.png`) :
            require(`../../images/gamesLogo/not${formap[2] === undefined ? 0 : formap[2].type}.png`);
        let url4 = formap1[3] !== undefined && formap1[3].points !== "0" ?
            require(`../../images/gamesLogo/${formap[3] === undefined ? 0 : formap[3].type}.png`) :
            require(`../../images/gamesLogo/not${formap[3] === undefined ? 0 : formap[3].type}.png`);
        let btnID1 = formap[0] !== undefined ?
            (formap[0].type === '1' ? 2 : formap[0].type === '3' ? 1 : formap[0].type === '2' ? 3 : 0) : 0
        let btnID2 = formap[1] !== undefined ?
            (formap[1].type === '1' ? 2 : formap[1].type === '3' ? 1 : formap[1].type === '2' ? 3 : 0) : 0
        let btnID3 = formap[2] !== undefined ?
            (formap[2].type === '1' ? 2 : formap[2].type === '3' ? 1 : formap[2].type === '2' ? 3 : 0) : 0
        let btnID4 = formap[3] !== undefined ?
            (formap[3].type === '1' ? 2 : formap[3].type === '3' ? 1 : formap[3].type === '2' ? 3 : 0) : 0
    return (
        <div className={lvl_ID === i ? this.state.openedClass : this.state.class}
            key={index}
            onClick={this.getData}
            >
            <button className="sec">toggle</button>
            <div className="sectionhead"
                id={i}
            >
            {'Lesson'+ lesnum +'. '+' '+' '+' '+item.description}
            </div>
            <div className="articlewrap">
            <div className="article">
                <div key={index} className={lvl_ID === i ? "cont" : this.state.invis}>
                    <div className="cont1">
                        <div>
                            <div className='gamescreenshot1'
                                style={{
                                    backgroundImage: `url(${url1})`,
                                    backgroundRepeat: 'no-repeat',
                                    backgroundSize: '100%'
                                }}
                            />
                            <div className="starsImg">
                                {formap1[0] !== undefined && formap1[0].mark === "3" &&
                                <span>
                                    <img width="30" src={`${star}`} alt="star" />
                                    <img width="30" src={`${star}`}  alt="star"  />
                                    <img width="30" src={`${star}`} alt="star"  />
                                </span>
                                }
                                {formap1[0] !== undefined && formap1[0].mark === "2" &&
                                <span>
                                    <img width="30" src={`${star}`} alt="star" />
                                    <img width="30" src={`${star}`} alt="star" />
                                    <img width="30" src={`${starEmpty}`} alt="star" />
                                </span>
                                }
                                {formap1[0] !== undefined && formap1[0].mark=== "1" &&
                                <span>
                                    <img width="30" src={`${star}`}  alt="star" />
                                    <img width="30" src={`${starEmpty}`}  alt="star" />
                                    <img width="30" src={`${starEmpty}`}  alt="star" />
                                </span>
                                }
                                {formap1[0] !== undefined && formap1[0].mark ===  "0" &&
                                <span>
                                    <img width="30" src={`${starEmpty}`}  alt="star" />
                                    <img width="30" src={`${starEmpty}`}  alt="star" />
                                    <img width="30" src={`${starEmpty}`}  alt="star" />
                                </span>
                                }
                            </div>
                                <p> Points :
                                    {formap1[0] !== undefined ? ' ' + formap1[0].points : ' ' + 0}
                                    /{formap[0] !== undefined ? ' ' + formap[0].max_points : ' ' + 0}
                                </p>
                                <button className="button_green_small"
                                        onClick={this.playGame}
                                        name={formap[0] === undefined ?
                                                item.game1.game_id : formap[0].game_id
                                            }
                                        value={formap !== undefined ? btnID1 : 0}
                                >Play Game</button>
                                {formap[0] !== undefined &&  formap[0].type === '2'&&
                                <button className="button_green_small"
                                        onClick={this.playMulti}
                                        value={formap !== undefined ? btnID1 : 0}
                                        name={formap[0] === undefined ?
                                            item.game1.game_id : formap[0].game_id
                                        }
                                >Multiplayer</button>
                                }
                                {formap[0] !== undefined &&  formap[0].type === '3' &&
                                <button className="button_green_small"
                                        onClick={this.playMulti_Unity}
                                        value={formap !== undefined ? btnID1 : 0}
                                        name={formap[0] === undefined ?
                                            item.game1.game_id : formap[0].game_id
                                        }
                                >Multiplayer</button>
                                }
                        </div>
                        <div>
                            <div className='gamescreenshot1'
                                style={{
                                    backgroundImage: `url(${url2})`,
                                    backgroundRepeat: 'no-repeat',
                                    backgroundSize: '100%'
                                }}
                            />
                            <div className="starsImg">
                                {formap1[1] !== undefined && formap1[1].mark=== "3" &&
                                <span>
                                    <img width="30" src={`${star}`}  alt="star" />
                                    <img width="30" src={`${star}`}  alt="star" />
                                    <img width="30" src={`${star}`}  alt="star" />
                                </span>
                                }
                                {formap1[1] !== undefined && formap1[1].mark === "2" &&
                                <span>
                                    <img width="30" src={`${star}`}  alt="star" />
                                    <img width="30" src={`${star}`}  alt="star" />
                                    <img width="30" src={`${starEmpty}`} alt="star" />
                                </span>
                                }
                                {formap1[1] !== undefined && formap1[1].mark=== "1" &&
                                <span>
                                    <img width="30" src={`${star}`}  alt="star" />
                                    <img width="30" src={`${starEmpty}`}  alt="star"/>
                                    <img width="30" src={`${starEmpty}`}  alt="star" />
                                </span>
                                }
                                {formap1[1] !== undefined && formap1[1].mark === "0" &&
                                <span>
                                    <img width="30" src={`${starEmpty}`}  alt="star" />
                                    <img width="30" src={`${starEmpty}`}  alt="star" />
                                    <img width="30" src={`${starEmpty}`} alt="star" />
                                </span>
                                }
                            </div>
                                <p> Points :
                                    {formap1[1] !== undefined ? ' ' + formap1[1].points : ' ' + 0}
                                    /{formap[1] !== undefined ? ' ' + formap[1].max_points : ' ' + 0}
                                </p>
                                <button className="button_green_small"
                                        onClick={this.playGame}
                                        name={formap[1] === undefined ?
                                                item.game2.game_id : formap[1].game_id
                                            }
                                        value={formap !== undefined ? btnID2 : 0}>Play Game</button>
                                {formap[1] !== undefined && formap[1].type === '2' &&
                                    <button className="button_green_small"
                                            onClick={this.playMulti}
                                            value={formap !== undefined ? btnID2 : 0}
                                            name={formap[1] === undefined ?
                                                item.game2.game_id : formap[1].game_id
                                            }
                                    >Multiplayer</button>
                                }
                                {formap[1] !== undefined && formap[1].type === '3' &&
                                    <button className="button_green_small"
                                            onClick={this.playMulti_Unity}
                                            value={formap !== undefined ? btnID2 : 0}
                                            name={formap[1] === undefined ?
                                                item.game2.game_id : formap[1].game_id
                                            }
                                    >Multiplayer</button>
                                }
                            </div>
                        </div>
                    <div className="cont1">
                        <div>
                            <div className='gamescreenshot1'
                                style={{
                                    backgroundImage: `url(${url3})`,
                                    backgroundRepeat: 'no-repeat',
                                    backgroundSize: '100%'
                                }}
                            />
                            <div className="starsImg">
                                {formap1[2] !== undefined && formap1[2].mark=== "3" &&
                                <span>
                                    <img width="30" src={`${star}`}  alt="star" />
                                    <img width="30" src={`${star}`}  alt="star"/>
                                    <img width="30" src={`${star}`}  alt="star" />
                                </span>
                                }
                                {formap1[2] !== undefined && formap1[2].mark === "2" &&
                                <span>
                                    <img width="30" src={`${star}`} alt="star" />
                                    <img width="30" src={`${star}`}  alt="star" />
                                    <img width="30" src={`${starEmpty}`} alt="star" />
                                </span>
                                }
                                {formap1[2] !== undefined && formap1[2].mark=== "1" &&
                                <span>
                                    <img width="30" src={`${star}`} alt="star" />
                                    <img width="30" src={`${starEmpty}`}  alt="star" />
                                    <img width="30" src={`${starEmpty}`} alt="star" />
                                </span>
                                }
                                {formap1[2] !== undefined && formap1[2].mark === "0" &&
                                <span>
                                    <img width="30" src={`${starEmpty}`}  alt="star" />
                                    <img width="30" src={`${starEmpty}`}  alt="star" />
                                    <img width="30" src={`${starEmpty}`} alt="star" />
                                </span>
                                }
                            </div>
                                <p> Points :
                                    {formap1[2] !== undefined ? ' ' + formap1[2].points : ' ' + 0}
                                    /{formap[2] !== undefined ? ' ' + formap[2].max_points : ' ' + 0}
                                </p>
                                <button className="button_green_small"
                                        onClick={this.playGame}
                                        name={formap[2] === undefined ?
                                                item.game3.game_id : formap[2].game_id
                                            }
                                        value={formap !== undefined ? btnID3 : 0}>Play Game</button>
                                {formap[2] !== undefined && formap[2].type === '2' &&
                                <button className="button_green_small"
                                        onClick={this.playMulti}
                                        value={formap !== undefined ? btnID3 : 0}
                                        name={formap[2] === undefined ?
                                            item.game3.game_id : formap[2].game_id
                                        }
                                >Multiplayer</button>
                                }
                                {formap[2] !== undefined && formap[2].type === '3' &&
                                <button className="button_green_small"
                                        onClick={this.playMulti_Unity}
                                        value={formap !== undefined ? btnID3 : 0}
                                        name={formap[2] === undefined ?
                                            item.game3.game_id : formap[2].game_id
                                        }
                                >Multiplayer</button>
                                }
                            </div>
                        <div>
                            <div className='gamescreenshot1'
                                style={{
                                    backgroundImage: `url(${url4})`,
                                    backgroundRepeat: 'no-repeat',
                                    backgroundSize: '100%'
                                }}
                            />
                            <div className="starsImg">
                                {formap1[3] !== undefined && formap1[3].mark=== "3" &&
                                <span>
                                    <img width="30" src={`${star}`}  alt="star" />
                                    <img width="30" src={`${star}`}  alt="star" />
                                    <img width="30" src={`${star}`} alt="star" />
                                </span>
                                }
                                {formap1[3] !== undefined && formap1[3].mark === "2" &&
                                <span>
                                    <img width="30" src={`${star}`}  alt="star" />
                                    <img width="30" src={`${star}`}  alt="star" />
                                    <img width="30" src={`${starEmpty}`}  alt="star" />
                                </span>
                                }
                                {formap1[3] !== undefined && formap1[3].mark=== "1" &&
                                <span>
                                    <img width="30" src={`${star}`} alt="star" />
                                    <img width="30" src={`${starEmpty}`}  alt="star" />
                                    <img width="30" src={`${starEmpty}`} alt="star" />
                                </span>
                                }
                                {formap1[3] !== undefined && formap1[3].mark ===  "0" &&
                                <span>
                                    <img width="30" src={`${starEmpty}`} alt="star" />
                                    <img width="30" src={`${starEmpty}`}  alt="star"/>
                                    <img width="30" src={`${starEmpty}`} alt="star" />
                                </span>
                                }
                            </div>
                            <p> Points :
                                {formap1[3] !== undefined ? ' ' + formap1[3].points : ' ' + 0}
                                /{formap[3] !== undefined ? ' ' + formap[3].max_points : ' ' + 0}
                            </p>
                            <button className="button_green_small"
                                    onClick={this.playGame}
                                    name={formap[3] === undefined ?
                                            item.game4.game_id : formap[3].game_id
                                        }
                                    value={formap !== undefined ? btnID4 : 0}>Play Game</button>
                            {formap[3] !== undefined && formap[3].type === '2' &&
                            <button className="button_green_small"
                                    onClick={this.playMulti}
                                    value={formap !== undefined ? btnID4 : 0}
                                    name={formap[3] === undefined ?
                                        item.game4.game_id : formap[3].game_id
                                    }
                            >Multiplayer</button>
                            }
                            {formap[3] !== undefined && formap[3].type === '3' &&
                            <button className="button_green_small"
                                    onClick={this.playMulti_Unity}
                                    value={formap !== undefined ? btnID4 : 0}
                                    name={formap[3] === undefined ?
                                        item.game4.game_id : formap[3].game_id
                                    }
                            >Multiplayer</button>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>)})
        const list1 = chunked[1].map((item, index) => {
        let formap = this.state.data2 !== undefined ? this.state.data2 : this.props.data
        let formap1 = this.state.data3 !== undefined ? this.state.data3 : this.props.data
        lesnum++;
        let i = "b" + (Math.round(this.props.data.length / 2) + index) * 1
        let url1 = formap1[0] !== undefined && formap1[0].points !== "0" ?
            require(`../../images/gamesLogo/${formap[0] === undefined ? 0 : formap[0].type}.png`) :
            require(`../../images/gamesLogo/not${formap[0] === undefined ? 0 : formap[0].type}.png`);
        let url2 = formap1[1] !== undefined && formap1[1].points !== "0" ?
            require(`../../images/gamesLogo/${formap[1] === undefined ? 0 : formap[1].type}.png`) :
            require(`../../images/gamesLogo/not${formap[1] === undefined ? 0 : formap[1].type}.png`);
        let url3 = formap1[2] !== undefined && formap1[2].points !== "0" ?
            require(`../../images/gamesLogo/${formap[2] === undefined ? 0 : formap[2].type}.png`) :
            require(`../../images/gamesLogo/not${formap[2] === undefined ? 0 : formap[2].type}.png`);
        let url4 = formap1[3] !== undefined && formap1[3].points !== "0" ?
            require(`../../images/gamesLogo/${formap[3] === undefined ? 0 : formap[3].type}.png`) :
            require(`../../images/gamesLogo/not${formap[3] === undefined ? 0 : formap[3].type}.png`);
        let btnID1 = formap[0] !== undefined ?
            (formap[0].type === '1' ? 2 : formap[0].type === '3' ? 1 : formap[0].type === '2' ? 3 : 0) : 0
        let btnID2 = formap[1] !== undefined ?
            (formap[1].type === '1' ? 2 : formap[1].type === '3' ? 1 : formap[1].type === '2' ? 3 : 0) : 0
        let btnID3 = formap[2] !== undefined ?
            (formap[2].type === '1' ? 2 : formap[2].type === '3' ? 1 : formap[2].type === '2' ? 3 : 0) : 0
        let btnID4 = formap[3] !== undefined ?
            (formap[3].type === '1' ? 2 : formap[3].type === '3' ? 1 : formap[3].type === '2' ? 3 : 0) : 0
        return (
            <div className={lvl_ID === i ? this.state.openedClass : this.state.class}
                key={index}
                onClick={this.getData}
                >
                <button className="sec">toggle</button>
                <div className="sectionhead"
                    id={i}
                >
                {'Lesson'+ lesnum +'. '+' '+' '+' '+item.description}
                </div>
                <div className="articlewrap">
                <div className="article">
                    <div key={index} className={lvl_ID === i ? "cont" : this.state.invis}>
                        <div className="cont1">
                            <div>
                                <div className='gamescreenshot1'
                                    style={{
                                        backgroundImage: `url(${url1})`,
                                        backgroundRepeat: 'no-repeat',
                                        backgroundSize: '100%'
                                    }}
                                />
                                <div className="starsImg">
                                    {formap1[0] !== undefined && formap1[0].mark === "3" &&
                                    <span>
                                        <img width="30" src={`${star}`} alt="star" />
                                        <img width="30" src={`${star}`}  alt="star"  />
                                        <img width="30" src={`${star}`} alt="star"  />
                                    </span>
                                    }
                                    {formap1[0] !== undefined && formap1[0].mark === "2" &&
                                    <span>
                                        <img width="30" src={`${star}`} alt="star" />
                                        <img width="30" src={`${star}`} alt="star" />
                                        <img width="30" src={`${starEmpty}`} alt="star" />
                                    </span>
                                    }
                                    {formap1[0] !== undefined && formap1[0].mark=== "1" &&
                                    <span>
                                        <img width="30" src={`${star}`}  alt="star" />
                                        <img width="30" src={`${starEmpty}`}  alt="star" />
                                        <img width="30" src={`${starEmpty}`}  alt="star" />
                                    </span>
                                    }
                                    {formap1[0] !== undefined && formap1[0].mark ===  "0" &&
                                    <span>
                                        <img width="30" src={`${starEmpty}`}  alt="star" />
                                        <img width="30" src={`${starEmpty}`}  alt="star" />
                                        <img width="30" src={`${starEmpty}`}  alt="star" />
                                    </span>
                                    }
                                </div>
                                    <p> Points :
                                        {formap1[0] !== undefined ? ' ' + formap1[0].points : ' ' + 0}
                                        /{formap[0] !== undefined ? ' ' + formap[0].max_points : ' ' + 0}
                                    </p>
                                    <button className="button_green_small"
                                            onClick={this.playGame}
                                            name={formap[0] === undefined ?
                                                    item.game1.game_id : formap[0].game_id
                                                }
                                            value={formap !== undefined ? btnID1 : 0}
                                    >Play Game</button>
                                    {formap[0] !== undefined &&  formap[0].type === '2' &&
                                    <button className="button_green_small"
                                            onClick={this.playMulti}
                                            value={formap !== undefined ? btnID1 : 0}
                                            name={formap[0] === undefined ?
                                                item.game1.game_id : formap[0].game_id}
                                    >Multiplayer</button>
                                    }
                                    {formap[0] !== undefined &&  formap[0].type === '3' &&
                                    <button className="button_green_small"
                                            onClick={this.playMulti_Unity}
                                            value={formap !== undefined ? btnID1 : 0}
                                            name={formap[0] === undefined ?
                                                item.game1.game_id : formap[0].game_id}
                                    >Multiplayer</button>
                                    }
                            </div>
                            <div>
                                <div className='gamescreenshot1'
                                    style={{
                                        backgroundImage: `url(${url2})`,
                                        backgroundRepeat: 'no-repeat',
                                        backgroundSize: '100%'
                                    }}
                                />
                                <div className="starsImg">
                                    {formap1[1] !== undefined && formap1[1].mark=== "3" &&
                                    <span>
                                        <img width="30" src={`${star}`}  alt="star" />
                                        <img width="30" src={`${star}`}  alt="star" />
                                        <img width="30" src={`${star}`}  alt="star" />
                                    </span>
                                    }
                                    {formap1[1] !== undefined && formap1[1].mark === "2" &&
                                    <span>
                                        <img width="30" src={`${star}`}  alt="star" />
                                        <img width="30" src={`${star}`}  alt="star" />
                                        <img width="30" src={`${starEmpty}`} alt="star" />
                                    </span>
                                    }
                                    {formap1[1] !== undefined && formap1[1].mark=== "1" &&
                                    <span>
                                        <img width="30" src={`${star}`}  alt="star" />
                                        <img width="30" src={`${starEmpty}`}  alt="star"/>
                                        <img width="30" src={`${starEmpty}`}  alt="star" />
                                    </span>
                                    }
                                    {formap1[1] !== undefined && formap1[1].mark === "0" &&
                                    <span>
                                        <img width="30" src={`${starEmpty}`}  alt="star" />
                                        <img width="30" src={`${starEmpty}`}  alt="star" />
                                        <img width="30" src={`${starEmpty}`} alt="star" />
                                    </span>
                                    }
                                </div>
                                    <p> Points :
                                        {formap1[1] !== undefined ? ' ' + formap1[1].points : ' ' + 0}
                                        /{formap[1] !== undefined ? ' ' + formap[1].max_points : ' ' + 0}
                                    </p>
                                    <button className="button_green_small"
                                            onClick={this.playGame}
                                            name={formap[1] === undefined ?
                                                    item.game2.game_id : formap[1].game_id
                                                }
                                            value={formap !== undefined ? btnID2 : 0}>Play Game</button>
                                    {formap[1] !== undefined && formap[1].type === '2' &&
                                        <button className="button_green_small"
                                                onClick={this.playMulti}
                                                value={formap !== undefined ? btnID2 : 0}
                                                name={formap[1] === undefined ?
                                                    item.game2.game_id : formap[1].game_id
                                                }
                                        >Multiplayer</button>
                                    }
                                    {formap[1] !== undefined && formap[1].type === '3' &&
                                        <button className="button_green_small"
                                                onClick={this.playMulti_Unity}
                                                value={formap !== undefined ? btnID2 : 0}
                                                name={formap[1] === undefined ?
                                                    item.game2.game_id : formap[1].game_id
                                                }
                                        >Multiplayer</button>
                                    }
                                </div>
                            </div>
                        <div className="cont1">
                            <div>
                                <div className='gamescreenshot1'
                                    style={{
                                        backgroundImage: `url(${url3})`,
                                        backgroundRepeat: 'no-repeat',
                                        backgroundSize: '100%'
                                    }}
                                />
                                <div className="starsImg">
                                    {formap1[2] !== undefined && formap1[2].mark=== "3" &&
                                    <span>
                                        <img width="30" src={`${star}`}  alt="star" />
                                        <img width="30" src={`${star}`}  alt="star"/>
                                        <img width="30" src={`${star}`}  alt="star" />
                                    </span>
                                    }
                                    {formap1[2] !== undefined && formap1[2].mark === "2" &&
                                    <span>
                                        <img width="30" src={`${star}`} alt="star" />
                                        <img width="30" src={`${star}`}  alt="star" />
                                        <img width="30" src={`${starEmpty}`} alt="star" />
                                    </span>
                                    }
                                    {formap1[2] !== undefined && formap1[2].mark=== "1" &&
                                    <span>
                                        <img width="30" src={`${star}`} alt="star" />
                                        <img width="30" src={`${starEmpty}`}  alt="star" />
                                        <img width="30" src={`${starEmpty}`} alt="star" />
                                    </span>
                                    }
                                    {formap1[2] !== undefined && formap1[2].mark === "0" &&
                                    <span>
                                        <img width="30" src={`${starEmpty}`}  alt="star" />
                                        <img width="30" src={`${starEmpty}`}  alt="star" />
                                        <img width="30" src={`${starEmpty}`} alt="star" />
                                    </span>
                                    }
                                </div>
                                    <p> Points :
                                        {formap1[2] !== undefined ? ' ' + formap1[2].points : ' ' + 0}
                                        /{formap[2] !== undefined ? ' ' + formap[2].max_points : ' ' + 0}
                                    </p>
                                    <button className="button_green_small"
                                            onClick={this.playGame}
                                            name={formap[2] === undefined ?
                                                    item.game3.game_id : formap[2].game_id
                                                }
                                            value={formap !== undefined ? btnID3 : 0}>Play Game</button>
                                    {formap[2] !== undefined && formap[2].type === '2' &&
                                    <button className="button_green_small"
                                            onClick={this.playMulti}
                                            value={formap !== undefined ? btnID3 : 0}
                                            name={formap[2] === undefined ?
                                                item.game3.game_id : formap[2].game_id
                                            }
                                    >Multiplayer</button>
                                    }
                                    {formap[2] !== undefined && formap[2].type === '3' &&
                                    <button className="button_green_small"
                                            onClick={this.playMulti_Unity}
                                            value={formap !== undefined ? btnID3 : 0}
                                            name={formap[2] === undefined ?
                                                item.game3.game_id : formap[2].game_id
                                            }
                                    >Multiplayer</button>
                                    }
                                </div>
                            <div>
                                <div className='gamescreenshot1'
                                    style={{
                                        backgroundImage: `url(${url4})`,
                                        backgroundRepeat: 'no-repeat',
                                        backgroundSize: '100%'
                                    }}
                                />
                                <div className="starsImg">
                                    {formap1[3] !== undefined && formap1[3].mark=== "3" &&
                                    <span>
                                        <img width="30" src={`${star}`}  alt="star" />
                                        <img width="30" src={`${star}`}  alt="star" />
                                        <img width="30" src={`${star}`} alt="star" />
                                    </span>
                                    }
                                    {formap1[3] !== undefined && formap1[3].mark === "2" &&
                                    <span>
                                        <img width="30" src={`${star}`}  alt="star" />
                                        <img width="30" src={`${star}`}  alt="star" />
                                        <img width="30" src={`${starEmpty}`}  alt="star" />
                                    </span>
                                    }
                                    {formap1[3] !== undefined && formap1[3].mark=== "1" &&
                                    <span>
                                        <img width="30" src={`${star}`} alt="star" />
                                        <img width="30" src={`${starEmpty}`}  alt="star" />
                                        <img width="30" src={`${starEmpty}`} alt="star" />
                                    </span>
                                    }
                                    {formap1[3] !== undefined && formap1[3].mark ===  "0" &&
                                    <span>
                                        <img width="30" src={`${starEmpty}`} alt="star" />
                                        <img width="30" src={`${starEmpty}`}  alt="star"/>
                                        <img width="30" src={`${starEmpty}`} alt="star" />
                                    </span>
                                    }
                                </div>
                                <p> Points :
                                    {formap1[3] !== undefined ? ' ' + formap1[3].points : ' ' + 0}
                                    /{formap[3] !== undefined ? ' ' + formap[3].max_points : ' ' + 0}
                                </p>
                                <button className="button_green_small"
                                        onClick={this.playGame}
                                        name={formap[3] === undefined ?
                                                item.game4.game_id : formap[3].game_id
                                            }
                                        value={formap !== undefined ? btnID4 : 0}>Play Game</button>
                                {formap[3] !== undefined && formap[3].type === '2' &&
                                <button className="button_green_small"
                                        onClick={this.playMulti}
                                        value={formap !== undefined ? btnID4 : 0}
                                        name={formap[3] === undefined ?
                                            item.game4.game_id : formap[3].game_id
                                        }
                                >Multiplayer</button>
                                }
                                {formap[3] !== undefined && formap[3].type === '3' &&
                                <button className="button_green_small"
                                        onClick={this.playMulti_Unity}
                                        value={formap !== undefined ? btnID4 : 0}
                                        name={formap[3] === undefined ?
                                            item.game4.game_id : formap[3].game_id
                                        }
                                >Multiplayer</button>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>)})
    return (
        <div>
            <div style={{display: this.state.hide === true ? 'none' : 'block'}}>
                <div className="main">
                    <div className="title_gameStat">
                        <h1 style={{fontSize: '28px',
                            color: 'azure',
                            fontStyle: 'oblique'}}>{`Game Satistics For ${this.props.courseName}`}</h1>
                    </div>
                    <div style={{float:'left',width: '50%'}}>{list0}</div>
                    <div style={{float:'left',width: '50%'}}>{list1}</div>
                </div>
            </div>
            <div className="cont_game" style={{display: this.state.hide === true ? 'block' : 'none'}}>
            {this.props.gameList === 1 &&
                <span>
                    <div style={{margin:'0 auto'}}>
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
                    <div style={{display:this.state.showFinalPoints?'none':'block'}}>
                    {this.state.renderPoints &&
                        <PointsUnity game={game}
                                    count_mark={this.count_mark}
                                    self_mark={this.self_mark}
                                    data={this.close}
                                    backTo={this.close}
                                    replayAgain={this.replayGame}
                                    gameID={this.state.gameID}
                                    game_type={this.state.game_type}
                                    points={this.state.unitypoints}
                                    stars={this.state.numberOfStarsUnity}
                                    level={levelID}
                                    course_Data={this.props.courseID}
                                    course={this.props.courseName}
                        />
                    }
                    </div>
                    <div style={{display:!this.state.showFinalPoints?'none':'block'}}>
                        <Unity src={!this.state.multi_unity?"Build/WebGl.json":"Build/MultiGl.json"}
                        />
                        {this.start()}
                    </div>
                </span>
                }
                {this.props.gameList === 2  &&
                    <Notepad game={game}
                            count_mark={this.count_mark}
                            self_mark={this.self_mark}
                            data={this.close}
                            backTo={this.close}
                            replayAgain={this.replayGame}
                            gameID={this.state.gameID}
                            game_type={this.state.game_type}
                            level={levelID}
                            course_Data={this.props.courseID}
                            course_Name={this.props.courseName}
                            game_over={this.UnityPoints}
                    />
                }
                {this.props.gameList === 3 &&
                    <AlphabetGame game={game}
                                count_mark={this.count_mark}
                                self_mark={this.self_mark}
                                data={this.close}
                                gameId={this.state.gameID}
                                multi={this.state.multi}
                                level={levelID}
                                userId={this.props.userProfile.uid}
                                backTo={this.close}
                                course_Name={this.props.courseName}
                                lessonLink = {this.state.videoLink}
                                g_over={this.UnityPoints}
                    />
                }
                {this.props.gameList === 100 && this.state.is_openUnity &&
                    <PointsUnity game={game}
                                count_mark={this.count_mark}
                                self_mark={this.self_mark}
                                self_mark_func={this.self_func}
                                count_mark_func={this.count_func}
                                data={this.close}
                                backTo={this.close}
                                replayAgain={this.replayGame}
                                gameID={this.state.gameID}
                                game_type={this.state.game_type}
                                points={this.state.unitypoints}
                                stars={this.state.numberOfStarsUnity}
                                level ={levelID}
                                course_Data={this.props.courseID}
                                course={this.props.courseName}
                    />
                }
                {this.props.gameList === 4 &&
                    <span>
                        <div style={{margin:'0 auto'}}>
                            <div style={{margin:'0 auto'}}>
                                <div id="page-loader" className="page-loader">
                                    <div>
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
                    <div style={{display:this.state.showFinalPointsPuzzle?'none':'block'}}>
                        {this.state.renderPointsPuzzle &&
                            <PointsUnity game={game}
                                        count_mark={this.count_mark}
                                        self_mark={this.self_mark}
                                        data={this.close}
                                        backTo={this.close}
                                        replayAgain={this.replayGame}
                                        gameID={this.state.gameID}
                                        game_type={this.state.game_type}
                                        points={this.state.unitypoints}
                                        stars={this.state.numberOfStarsUnity}
                                        level ={levelID}
                                        course_Data={this.props.courseID}
                                        course={this.props.courseName}
                            />
                        }
                    </div>
                    <div style={{display:!this.state.showFinalPointsPuzzle?'none':'block'}}>
                        <Unity src={"Build/Web2DTag.json"}/>
                            {this.start1()}
                    </div>
                    </span>
                    }
                </div>
            </div>);}
    else {
        const statistika = this.props.data.map((item, index) => {
        lesnum++;
        let i = 'a' + index
        let formap = this.state.data2 !== undefined ? this.state.data2 : this.props.data
        let formap1 = this.state.data3 !== undefined ? this.state.data3 : this.props.data
        let url1 = formap1[0] !== undefined && formap1[0].points !== "0"  ?
            require(`../../images/gamesLogo/${formap[0] === undefined ? 0 : formap[0].type}.png`) :
            require(`../../images/gamesLogo/not${formap[0] === undefined ? 0 : formap[0].type}.png`);
        let url2 = formap1[1] !== undefined && formap1[1].points !== "0" ?
            require(`../../images/gamesLogo/${formap[1] === undefined ? 0 : formap[1].type}.png`) :
            require(`../../images/gamesLogo/not${formap[1] === undefined ? 0 : formap[1].type}.png`);
        let url3 = formap1[2] !== undefined && formap1[2].points !== "0" ?
            require(`../../images/gamesLogo/${formap[2] === undefined ? 0 : formap[2].type}.png`) :
            require(`../../images/gamesLogo/not${formap[2] === undefined ? 0 : formap[2].type}.png`);
        let url4 = formap1[3] !== undefined && formap1[3].points !== "0" ?
            require(`../../images/gamesLogo/${formap[3] === undefined ? 0 : formap[3].type}.png`) :
            require(`../../images/gamesLogo/not${formap[3] === undefined ? 0 : formap[3].type}.png`);
        let btnID1 = formap[0] !== undefined ?
            (formap[0].type === '1' ? 2 : formap[0].type === '3' ? 1 : formap[0].type === '2' ? 3 : 0) : 0
        let btnID2 = formap[1] !== undefined ?
            (formap[1].type === '1' ? 2 : formap[1].type === '3' ? 1 : formap[1].type === '2' ? 3 : 0) : 0
        let btnID3 = formap[2] !== undefined ?
            (formap[2].type === '1' ? 2 : formap[2].type === '3' ? 1 : formap[2].type === '2' ? 3 : 0) : 0
        let btnID4 = formap[3] !== undefined ?
            (formap[3].type === '1' ? 2 : formap[3].type === '3' ? 1 : formap[3].type === '2' ? 3 : 0) : 0
        return (
            <div className={lvl_ID === i ? this.state.openedClass : this.state.class}
                key={index}
                onClick={this.getData}
                >
                <button className="sec">toggle</button>
                <div className="sectionhead"
                    id={i}
                >
                {'Lesson'+ lesnum +'. '+' '+' '+' '+item.description}
                </div>
                <div className="articlewrap">
                <div className="article">
                    <div key={index} className={lvl_ID === i ? "cont" : this.state.invis}>
                        <div className="cont1">
                            <div>
                                <div className='gamescreenshot1'
                                    style={{
                                        backgroundImage: `url(${url1})`,
                                        backgroundRepeat: 'no-repeat',
                                        backgroundSize: '100%'
                                    }}
                                />
                                <div className="starsImg">
                                    {formap1[0] !== undefined && formap1[0].mark === "3" &&
                                    <span>
                                        <img width="30" src={`${star}`} alt="star" />
                                        <img width="30" src={`${star}`}  alt="star"  />
                                        <img width="30" src={`${star}`} alt="star"  />
                                    </span>
                                    }
                                    {formap1[0] !== undefined && formap1[0].mark === "2" &&
                                    <span>
                                        <img width="30" src={`${star}`} alt="star" />
                                        <img width="30" src={`${star}`} alt="star" />
                                        <img width="30" src={`${starEmpty}`} alt="star" />
                                    </span>
                                    }
                                    {formap1[0] !== undefined && formap1[0].mark=== "1" &&
                                    <span>
                                        <img width="30" src={`${star}`}  alt="star" />
                                        <img width="30" src={`${starEmpty}`}  alt="star" />
                                        <img width="30" src={`${starEmpty}`}  alt="star" />
                                    </span>
                                    }
                                    {formap1[0] !== undefined && formap1[0].mark ===  "0" &&
                                    <span>
                                        <img width="30" src={`${starEmpty}`}  alt="star" />
                                        <img width="30" src={`${starEmpty}`}  alt="star" />
                                        <img width="30" src={`${starEmpty}`}  alt="star" />
                                    </span>
                                    }
                                </div>
                                    <p> Points :
                                        {formap1[0] !== undefined ? ' ' + formap1[0].points : ' ' + 0}
                                        /{formap[0] !== undefined ? ' ' + formap[0].max_points : ' ' + 0}
                                    </p>
                                    <button className="button_green_small"
                                            onClick={this.playGame}
                                            name={formap[0] === undefined ?
                                                    item.game1.game_id : formap[0].game_id
                                                }
                                            value={formap !== undefined ? btnID1 : 0}
                                    >Play Game</button>
                                    {formap[0] !== undefined &&  formap[0].type === '2' &&
                                    <button className="button_green_small"
                                            onClick={this.playMulti}
                                            value={formap !== undefined ? btnID1 : 0}
                                            name={formap[0] === undefined ?
                                                item.game1.game_id : formap[0].game_id
                                            }
                                    >Multiplayer</button>
                                    }
                                    {formap[0] !== undefined && formap[0].type === '3' &&
                                    <button className="button_green_small"
                                            onClick={this.playMulti_Unity}
                                            value={formap !== undefined ? btnID1 : 0}
                                            name={formap[0] === undefined ?
                                                item.game1.game_id : formap[0].game_id
                                            }
                                    >Multiplayer</button>
                                    }
                            </div>
                            <div>
                                <div className='gamescreenshot1'
                                    style={{
                                        backgroundImage: `url(${url2})`,
                                        backgroundRepeat: 'no-repeat',
                                        backgroundSize: '100%'
                                    }}
                                />
                                <div className="starsImg">
                                    {formap1[1] !== undefined && formap1[1].mark=== "3" &&
                                    <span>
                                        <img width="30" src={`${star}`}  alt="star" />
                                        <img width="30" src={`${star}`}  alt="star" />
                                        <img width="30" src={`${star}`}  alt="star" />
                                    </span>
                                    }
                                    {formap1[1] !== undefined && formap1[1].mark === "2" &&
                                    <span>
                                        <img width="30" src={`${star}`}  alt="star" />
                                        <img width="30" src={`${star}`}  alt="star" />
                                        <img width="30" src={`${starEmpty}`} alt="star" />
                                    </span>
                                    }
                                    {formap1[1] !== undefined && formap1[1].mark=== "1" &&
                                    <span>
                                        <img width="30" src={`${star}`}  alt="star" />
                                        <img width="30" src={`${starEmpty}`}  alt="star"/>
                                        <img width="30" src={`${starEmpty}`}  alt="star" />
                                    </span>
                                    }
                                    {formap1[1] !== undefined && formap1[1].mark === "0" &&
                                    <span>
                                        <img width="30" src={`${starEmpty}`}  alt="star" />
                                        <img width="30" src={`${starEmpty}`}  alt="star" />
                                        <img width="30" src={`${starEmpty}`} alt="star" />
                                    </span>
                                    }
                                </div>
                                    <p> Points :
                                        {formap1[1] !== undefined ? ' ' + formap1[1].points : ' ' + 0}
                                        /{formap[1] !== undefined ? ' ' + formap[1].max_points : ' ' + 0}
                                    </p>
                                    <button className="button_green_small"
                                            onClick={this.playGame}
                                            name={formap[1] === undefined ?
                                                    item.game2.game_id : formap[1].game_id
                                                }
                                            value={formap !== undefined ? btnID2 : 0}>Play Game</button>
                                    {formap[1] !== undefined && formap[1].type === '2' &&
                                        <button className="button_green_small"
                                                onClick={this.playMulti}
                                                value={formap !== undefined ? btnID2 : 0}
                                                name={formap[1] === undefined ?
                                                    item.game2.game_id : formap[1].game_id
                                                }
                                        >Multiplayer</button>
                                    }
                                    {formap[1] !== undefined && formap[1].type === '3' &&
                                        <button className="button_green_small"
                                                onClick={this.playMulti_Unity}
                                                value={formap !== undefined ? btnID2 : 0}
                                                name={formap[1] === undefined ?
                                                    item.game2.game_id : formap[1].game_id
                                                }
                                        >Multiplayer</button>
                                    }
                                </div>
                            </div>
                        <div className="cont1">
                            <div>
                                <div className='gamescreenshot1'
                                    style={{
                                        backgroundImage: `url(${url3})`,
                                        backgroundRepeat: 'no-repeat',
                                        backgroundSize: '100%'
                                    }}
                                />
                                <div className="starsImg">
                                    {formap1[2] !== undefined && formap1[2].mark=== "3" &&
                                    <span>
                                        <img width="30" src={`${star}`}  alt="star" />
                                        <img width="30" src={`${star}`}  alt="star"/>
                                        <img width="30" src={`${star}`}  alt="star" />
                                    </span>
                                    }
                                    {formap1[2] !== undefined && formap1[2].mark === "2" &&
                                    <span>
                                        <img width="30" src={`${star}`} alt="star" />
                                        <img width="30" src={`${star}`}  alt="star" />
                                        <img width="30" src={`${starEmpty}`} alt="star" />
                                    </span>
                                    }
                                    {formap1[2] !== undefined && formap1[2].mark=== "1" &&
                                    <span>
                                        <img width="30" src={`${star}`} alt="star" />
                                        <img width="30" src={`${starEmpty}`}  alt="star" />
                                        <img width="30" src={`${starEmpty}`} alt="star" />
                                    </span>
                                    }
                                    {formap1[2] !== undefined && formap1[2].mark === "0" &&
                                    <span>
                                        <img width="30" src={`${starEmpty}`}  alt="star" />
                                        <img width="30" src={`${starEmpty}`}  alt="star" />
                                        <img width="30" src={`${starEmpty}`} alt="star" />
                                    </span>
                                    }
                                </div>
                                    <p> Points :
                                        {formap1[2] !== undefined ? ' ' + formap1[2].points : ' ' + 0}
                                        /{formap[2] !== undefined ? ' ' + formap[2].max_points : ' ' + 0}
                                    </p>
                                    <button className="button_green_small"
                                            onClick={this.playGame}
                                            name={formap[2] === undefined ?
                                                    item.game3.game_id : formap[2].game_id
                                                }
                                            value={formap !== undefined ? btnID3 : 0}>Play Game</button>
                                    {formap[2] !== undefined && formap[2].type === '2' &&
                                    <button className="button_green_small"
                                            onClick={this.playMulti}
                                            value={formap !== undefined ? btnID3 : 0}
                                            name={formap[2] === undefined ?
                                                item.game3.game_id : formap[2].game_id
                                            }
                                    >Multiplayer</button>
                                    }
                                    {formap[2] !== undefined && formap[2].type === '3' &&
                                    <button className="button_green_small"
                                            onClick={this.playMulti_Unity}
                                            value={formap !== undefined ? btnID3 : 0}
                                            name={formap[2] === undefined ?
                                                item.game3.game_id : formap[2].game_id
                                            }
                                    >Multiplayer</button>
                                    }
                                </div>
                            <div>
                                <div className='gamescreenshot1'
                                    style={{
                                        backgroundImage: `url(${url4})`,
                                        backgroundRepeat: 'no-repeat',
                                        backgroundSize: '100%'
                                    }}
                                />
                                <div className="starsImg">
                                    {formap1[3] !== undefined && formap1[3].mark=== "3" &&
                                    <span>
                                        <img width="30" src={`${star}`}  alt="star" />
                                        <img width="30" src={`${star}`}  alt="star" />
                                        <img width="30" src={`${star}`} alt="star" />
                                    </span>
                                    }
                                    {formap1[3] !== undefined && formap1[3].mark === "2" &&
                                    <span>
                                        <img width="30" src={`${star}`}  alt="star" />
                                        <img width="30" src={`${star}`}  alt="star" />
                                        <img width="30" src={`${starEmpty}`}  alt="star" />
                                    </span>
                                    }
                                    {formap1[3] !== undefined && formap1[3].mark=== "1" &&
                                    <span>
                                        <img width="30" src={`${star}`} alt="star" />
                                        <img width="30" src={`${starEmpty}`}  alt="star" />
                                        <img width="30" src={`${starEmpty}`} alt="star" />
                                    </span>
                                    }
                                    {formap1[3] !== undefined && formap1[3].mark ===  "0" &&
                                    <span>
                                        <img width="30" src={`${starEmpty}`} alt="star" />
                                        <img width="30" src={`${starEmpty}`}  alt="star"/>
                                        <img width="30" src={`${starEmpty}`} alt="star" />
                                    </span>
                                    }
                                </div>
                                <p> Points :
                                    {formap1[3] !== undefined ? ' ' + formap1[3].points : ' ' + 0}
                                    /{formap[3] !== undefined ? ' ' + formap[3].max_points : ' ' + 0}
                                </p>
                                <button className="button_green_small"
                                        onClick={this.playGame}
                                        name={formap[3] === undefined ?
                                                item.game4.game_id : formap[3].game_id
                                            }
                                        value={formap !== undefined ? btnID4 : 0}>Play Game</button>
                                {formap[3] !== undefined && formap[3].type === '2' &&
                                <button className="button_green_small"
                                        onClick={this.playMulti}
                                        value={formap !== undefined ? btnID4 : 0}
                                        name={formap[3] === undefined ?
                                            item.game4.game_id : formap[3].game_id
                                        }
                                >Multiplayer</button>
                                }
                                {formap[3] !== undefined && formap[3].type === '3' &&
                                <button className="button_green_small"
                                        onClick={this.playMulti_Unity}
                                        value={formap !== undefined ? btnID4 : 0}
                                        name={formap[3] === undefined ?
                                            item.game4.game_id : formap[3].game_id
                                        }
                                >Multiplayer</button>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>)})
    return (
        <div>
            <div style={{display: this.state.hide === true ? 'none' : 'block'}}>
                <div className="main">
                    <div className="title_gameStat">
                        <h1>{`Game Satistics For ${this.props.courseName}`}</h1>
                    </div>
                    <div style={{float:'left',width: '50%'}}>{statistika}</div>
                </div>
            </div>
            <div className="cont_game" style={{display: this.state.hide === true ? 'block' : 'none'}}>
            {this.props.gameList === 1 &&
                <span>
                    <div style={{margin:'0 auto'}}>
                        <div id="page-loader" className="page-loader">
                            <div>
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
                    <div style={{display:this.state.showFinalPoints?'none':'block'}}>
                    {this.state.renderPoints &&
                        <PointsUnity game={game}
                                    count_mark={this.count_mark}
                                    self_mark={this.self_mark}
                                    data={this.close}
                                    backTo={this.close}
                                    replayAgain={this.replayGame}
                                    gameID={this.state.gameID}
                                    game_type={this.state.game_type}
                                    points={this.state.unitypoints}
                                    stars={this.state.numberOfStarsUnity}
                                    level={levelID}
                                    course_Data={this.props.courseID}
                                    course={this.props.courseName}
                        />
                    }
                    </div>
                    <div style={{display:!this.state.showFinalPoints?'none':'block'}}>
                        <Unity src={!this.state.multi_unity?"Build/WebGl.json":"Build/MultiGl.json"}
                        />
                        {this.start()}
                    </div>
                </span>
                }
                {this.props.gameList === 2  &&
                    <Notepad game={game}
                            count_mark={this.count_mark}
                            self_mark={this.self_mark}
                            data={this.close}
                            backTo={this.close}
                            replayAgain={this.replayGame}
                            gameID={this.state.gameID}
                            game_type={this.state.game_type}
                            level={levelID}
                            course_Data={this.props.courseID}
                            course_Name={this.props.courseName}
                            game_over={this.UnityPoints}
                    />
                }
                {this.props.gameList === 3 &&
                    <AlphabetGame game={game}
                                count_mark={this.count_mark}
                                self_mark={this.self_mark}
                                data={this.close}
                                gameId={this.state.gameID}
                                multi={this.state.multi}
                                level={levelID}
                                userId={this.props.userProfile.uid}
                                backTo={this.close}
                                course_Name={this.props.courseName}
                                lessonLink={this.state.videoLink}
                                g_over={this.UnityPoints}
                    />
                }
                {this.props.gameList === 100 && this.state.is_openUnity &&
                    <PointsUnity game={game}
                                count_mark={this.count_mark}
                                self_mark={this.self_mark}
                                data={this.close}
                                backTo={this.close}
                                replayAgain={this.replayGame}
                                gameID={this.state.gameID}
                                game_type={this.state.game_type}
                                points={this.state.unitypoints}
                                stars={this.state.numberOfStarsUnity}
                                level ={levelID}
                                course_Data={this.props.courseID}
                                course={this.props.courseName}
                    />
                }
                {this.props.gameList === 4 &&
                    <span>
                        <div style={{margin:'0 auto'}}>
                            <div style={{margin:'0 auto'}}>
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
                    <div style={{display:this.state.showFinalPointsPuzzle?'none':'block'}}>
                        {this.state.renderPointsPuzzle &&
                            <PointsUnity game={game}
                                        count_mark={this.count_mark}
                                        self_mark={this.self_mark}
                                        data={this.close}
                                        backTo={this.close}
                                        replayAgain={this.replayGame}
                                        gameID={this.state.gameID}
                                        game_type={this.state.game_type}
                                        points={this.state.unitypoints}
                                        stars={this.state.numberOfStarsUnity}
                                        level ={levelID}
                                        course_Data={this.props.courseID}
                                        course={this.props.courseName}
                            />
                        }
                    </div>
                    <div style={{display:!this.state.showFinalPointsPuzzle?'none':'block'}}>
                        <Unity src={"Build/Web2DTag.json"}
                        />
                            {this.start1()}
                    </div>
                    </span>
                    }
                </div>
            </div>);
        }
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
    navigateTo: location => dispatch(push(location)),
    countForlock: count => dispatch({
        type: 'OPEN_CLOSE_LESSONS',
        payload: count
    }),
});


export default connect(
    store,
    dispatch
)(Accordion)
