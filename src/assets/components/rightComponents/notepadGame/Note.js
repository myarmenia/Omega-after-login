import React, {Component} from 'react';
import ReactCountdownClock from 'react-countdown-clock';
import {canvas, noCanvas} from '../../../canvas/cavas_bg';
import {connect} from 'react-redux';
import '../../../styles/notepadGame/style.css';
import '../../../styles/notepadGame/animation.css';
import '../../../styles/notepadGame/lastPage.css';
import {Controlled as CodeMirror} from 'react-codemirror2';
import '../../../styles/codemirror.css';
import PayForCoins from '../../use_coins';

require('codemirror/mode/javascript/javascript');
require('codemirror/mode/xml/xml');
require('codemirror/mode/markdown/markdown');


const options = {
    lineNumbers: true,
    readOnly: false,
    mode: 'markdown',
};
let buttn = [];
let answerVariants = [];
let timeOut, timeOut1, timeOut2, timeOut3, timeOut4;
let inter;
let k3 = 0;
let k4 = 0;
let i = 0;
let timeOverpng = require(`../../../images/notepadGameImages/over.png`);
class Note_html extends Component {
    constructor(props) {
        super(props);
        this.state = {
            takeDiamond:false,
            time_out: true,
            trueID: '',
            Total_time: 20,
            allTrueId: [],
            trueAnswer: '',
            count: false,
            isAnswered: false,
            questionNumber: 0,
            tab: 10,
            enter: 0,
            alertText: 'Correct',
            isRight: true,
            alert: false,
            question: true,
            gameId: '',
            answerIds: [],
            answerGroupIds: [],
            answers: [],
            answerVariants: [],
            isCorrect: '',
            time: 20,
            points: 0,
            amountOfRightsAnswers: 0,
            gameFinished: false,
            numberOfStars: 0,
            answerTimes: 0,
            showAnswers: true,
            loaded: false,
            answerUi: [],
            code: '',
            rank: '',
            true_Answer: false,
            forAttributeTag: '',
            yntacikk: '',
            forAttribute: '',
            attr: false,
            pauseTimer: false,
            showTimer: true,
            TimeOver: true,
            level: '',
            course_name: '',
            forNextAttribute: '',
            gameContinue: [],
            fifty: false,
            show_info: false
        };
        this.tick();
        canvas();
    }

    componentWillUnmount() {
        clearInterval(inter);
        clearTimeout(timeOut1);
        clearTimeout(timeOut2);
        clearTimeout(timeOut3);
        i=0;

    }

    componentWillMount() {

        this.setState({
            gameContinue: this.props.game,
            level: this.props.level_id,
            course_name: this.props.course_Name,
        });
        setTimeout(() => {
            this.setState({
                //       showAnswers: true
            })
        }, 1000);

        let answers_req = `game_id=${this.props.gameID}`;
       // console.log(answers_req,"answers_reqanswers_reqanswers_reqHTMLLLL--componentWillMount")
        fetch(`https://omegacoding.com/android_test/notepad_game.php`, {
            method: 'POST',
            headers: {"Content-Type": "application/x-www-form-urlencoded", 'Accept': 'application/json'},
            body: answers_req
        }).then(response => {
            if (response.ok) {
                return response.json();
            }
        }).then(response => {
         // console.log(response, "noteeee ")
            let q = 0;
            answerVariants=[];
            for (let n in response) {
                if (n !== 'count' && n !== 'header' && n !== 'footer') {
                    answerVariants[q] = response[n];
                    q++;
                }
            }

            let allTrueId = [];
            for (let p = 0; p < answerVariants.length; ++p) {
                allTrueId[p] = answerVariants[p].true_id
            }
            this.setState({
                answerVariants: answerVariants,
                allTrueId: allTrueId,
                loaded: true

            });

        });
    }

    componentWillReceiveProps(props) {

        this.setState({
            level: props.level_id,
            course_name: props.course_Name,
        });
        setTimeout(() => {
            this.setState({
                showAnswers: true
            })
        }, 1000);
        let answers_req = `game_id=${this.props.gameID}`;
       // console.log(answers_req,"answers_reqanswers_reqanswers_req____componentWillReceiveProps")
        fetch(`https://omegacoding.com/android_test/notepad_game.php`, {
            method: 'POST',
            headers: {"Content-Type": "application/x-www-form-urlencoded", 'Accept': 'application/json'},
            body: answers_req
        }).then(response => {
            if (response.ok) {
                return response.json();
            }
        }).then(response => {
            let q = 0;
            answerVariants=[];
            for (let n in response) {
                if (n !== 'count' && n !== 'header' && n !== 'footer') {
                    answerVariants[q] = response[n];
                    q++;
                }
            }
            let allTrueId = [];
            for (let p = 0; p < answerVariants.length; ++p) {
                allTrueId[p] = answerVariants[p].true_id
            }
            this.setState({
                answerVariants: answerVariants,
                allTrueId: allTrueId,
                loaded: true
            });
        });
    }

    closeBlackBackground = (e) => {
        if (e === 'close') {
            let it = this;
            setTimeout(() => {
                    let coins_blank = document.getElementById('blank_coins');
                    coins_blank.classList.add("animated", "fadeOut");
                    setTimeout(() => {
                        it.props.showCoinsModalForHelp('');
                        this.setState({
                            show_info: false
                        });
                    }, 200)
                }, 200
            )
        }
    };

    show=(e)=>{
        this.setState({
            show_info:false
        });

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
    };



    // freezHelp button comment for some time
  /*  timeHelper = () => {
        this.setState({
            show_info: true
        });
        this.props.showCoinsModalForHelp('FreezeTime')
        // this.fetchDiamonds(this.timeCallBack);
    };
*/
    Help5050 = () => {
        this.setState({
            show_info: true,

        });
        this.props.showCoinsModalForHelp('Help5050')
    };
    PayDiamondForHelp5050 = () => {
        let help = document.getElementsByClassName('helpb')[0];
        help.setAttribute('disabled', 'true');
        help.style.cursor = 'no-drop';
        this.fetchDiamonds(this.removeWrongAswers);
        this.setState({
            show_info: false,
            takeDiamond:true
        });
        this.props.showCoinsModalForHelp('');
    };

    fetchDiamonds = (funcName) => {
        let userId = this.props.userProfile.uid;
        let url = 'https://omegacoding.com/android_test/manageDiamonds.php';
        let method = 'post';
        let headers = {
            "Content-type": "application/x-www-form-urlencoded",
            'Accept': 'application/json'
        };
        let body = "user_id=" + userId + "&operation=8";
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
                    return funcName();
                }
            })
            .catch(function (error) {
                console.log('Request failed', error);
            });
    };

    /* timeCallBack = () => {
     // freez timer ----
     this.stopClock();
     let timeBtn = document.getElementsByClassName('time-freezer')[0];
     timeBtn.setAttribute('disabled', 'true');
     timeBtn.style.cursor = 'no-drop';
     clearTimeout(timeOut);
     clearInterval(inter)
     // freeze timer ----*!/
     };
     */
    stopClock = () => {
        this.setState({
            pauseTimer: true,
            time: 0
        });
        //clearInterval(this.state.timer_id);
    };

    answer = (e) => {
        let enable = document.getElementsByClassName('helpb')[0];
        if (this.props.userProfile.diamonds * 1 > 0) {
            enable.removeAttribute('disabled');
            enable.style.cursor = 'pointer';
        }
        let button = document.getElementsByClassName('buttons');
        for (let j = 0; j < button.length; ++j) {
            {
                button[j].style.display = 'block'
            }
        }
        let getAnswer = e.target.id;
        if (!this.state.pauseTimer) {
            this.setState({
                pauseTimer: false,
                showTimer: true,
                TimeOver: true
            });
        }
        this.setState({time: 20});
        if (this.state.answerVariants[i].true_id === getAnswer) {
            this.setState({pauseTimer: true});
            let tab = this.state.answerVariants[i].tab * 1;
            let enter = this.state.answerVariants[i].enter * 1;
            if (enter > 0) {
                for (let ind = 0; ind < enter; ++ind) {
                    this.setState({code: `${this.state.code}\n`});
                }
            }
            if (tab > 0) {
                for (let ind = 0; ind < tab; ++ind) {
                    if (enter > 0) {
                        this.setState({code: `${this.state.code}\t`});
                    }
                }
            }
            let answerVariant;
            let id = 'a' + getAnswer;
            let sis = this.state.answerVariants[i][id];
            switch (sis.type) {
                case '1':
                    answerVariant = '<' + sis.text + '>\n';
                    this.setState({attr: false});
                    break;
                case '2':
                    this.setState({
                        yntacikk: this.state.code,
                        attr: true
                    });
                    answerVariant = this.state.code + '<' + sis.text + ' ' + '______="_____"';
                    this.setState({forAttributeTag: sis.text});
                    k3 = 0;
                    break;

                case '3':
                    if (k3 === 0) {
                        answerVariant = this.state.yntacikk + '<' + this.state.forAttributeTag + ' ' + sis.text + '="_____"';
                        this.setState({forAttribute: sis.text});
                    }
                    else if (k3 === 1) {
                        answerVariant = this.state.yntacikk + ' ' + sis.text + '="_____"';
                        this.setState({forNextAttribute: sis.text});
                        k4 = 1
                    }
                    break;
                case '4':
                    if (k4 === 0) {
                        answerVariant = this.state.yntacikk + '<' + this.state.forAttributeTag + ' ' + this.state.forAttribute + '="' + sis.text + '"';
                        this.setState({
                            yntacikk: answerVariant
                        });
                        k3 = 1;
                    }
                    else if (k4 === 1) {
                        answerVariant = this.state.yntacikk + ' ' + this.state.forNextAttribute + '="' + sis.text + '"';
                        k3 = 1;
                        this.setState({
                            yntacikk: answerVariant
                        });
                    }
                    break;
                case '5':
                    if (k3 === 0) {
                        answerVariant = this.state.yntacikk + '<' + this.state.forAttributeTag + ' ' + this.state.forAttribute + '="' + sis.text + '">\n';
                        k3 = 0;
                        k4 = 0;
                    }
                    else if (k3 === 1) {
                        answerVariant = this.state.yntacikk + ' ' + this.state.forNextAttribute + '="' + sis.text + '">\n';
                        k3 = 0;
                        k4 = 0;
                    }
                    break;
                case '6':
                    answerVariant = '</' + sis.text + '>\n';
                    this.setState({attr: false});
                    break;
                case '7':
                    answerVariant = '\xa0\xa0' + sis.text;
                    this.setState({attr: false});
                    break;
                case '8':
                    answerVariant = '<' + sis.text + ' /> \n';
                    this.setState({attr: false});
                    break;
                case '9':
                    answerVariant = this.state.code + ' ' + sis.text;
                    this.setState({
                        yntacikk: answerVariant,
                        attr: true
                    });
                    break;
                default:
                    answerVariant = this.state.yntacikk + ' ' + sis.text + "/>\n";
            }
            setTimeout(() => {
                if (!this.state.attr) {
                    this.setState({
                        code: `${this.state.code} ${answerVariant}`,
                    });
                }
                else {
                    this.setState({
                        code: `${answerVariant}`,
                    });
                }

            }, 500);
            this.setState({
                isAnswered: true,
            });
            this.setState({
                isRight: true,
                alertText: 'Correct',
                alert: true,
                true_Answer: true
            });
            let element = document.getElementsByClassName('checkmark')[0];
            element.classList.remove('error');
            element.classList.add('draw');
            timeOut1 = setTimeout(() => {
                if (i <= this.state.answerVariants.length - 1) {
                    this.setState({
                        isAnswered: false,
                        questionNumber: 1 + this.state.questionNumber,
                        amountOfRightsAnswers: this.state.answerTimes === 0 ? this.state.amountOfRightsAnswers + 1 : this.state.amountOfRightsAnswers,
                        answerTimes: 0,
                        time: 20,
                        alert: false
                    });
                    element.classList.remove('draw');
                }
                else {
                    this.props.game_over(this.state.points);
                    i = 0;
                    k3 = 0;
                    k4 = 0;
                    // this.getAnswerPercent();
                }
            }, 1000);
            timeOut2 = setTimeout(() => {
                this.setState({
                    showTimer: false,
                    TimeOver: true
                });
            }, 1000);
            this.addPoints();
            i++;
            this.setState({
                trueID: i
            });
            if (i < this.state.answerVariants.length - 1) {
                this.clock()

            }

        }
        else {
            this.setState({
                pauseTimer: true,
                isRight: false,
                alertText: 'Your answer is incorrect',
                alert: true,
                answerTimes: this.state.answerTimes + 1,
                Total_time: 20,
                true_Answer: false
            });
            let element1 = document.getElementsByClassName('checkmark')[0];
            element1.classList.remove('draw');
            element1.classList.add('error');
            timeOut3 = setTimeout(() => {
                this.setState({
                    alert: false,
                    time: 20,

                });
                timeOut4 = setTimeout(() => {
                    this.setState({
                        isAnswered: false
                    });
                }, 1000);
                element1.classList.remove('error');
            }, 500)
        }
    };
    addPoints = () => {
        let bonusPoint;
        if (this.state.isRight) {
            // timer is not zero
            if (this.state.time_out) {
                bonusPoint = this.state.time;
                if (bonusPoint >= 15) {
                    this.setState({
                        points: this.state.points + 40,
                    });
                }
                else {
                    this.setState({
                        points: this.state.points + 20 + bonusPoint,
                    });
                }
            }
            else {
                this.setState({
                    points: this.state.points,
                });
            }
        }
        else {

            this.setState({
                points: this.state.points
            });
        }
    };
    tick = () => {
        setTimeout(() => {
            inter = setInterval(() => {
                if (this.state.time >= 1) {
                    this.setState({time: this.state.time - 1})
                }
                else {
                    this.setState({showTimer: true});
                    clearInterval(inter)
                }

            }, 1000)
        })
    };
    goToLevelList = () => {

        this.props.backTo(false, this.props.course_Data);
        this.props.gotogamelist(0);
        clearInterval(inter);
        i = 0;
        /*noCanvas();*/
    };
    clock = () => {
        timeOut = setTimeout(() => {
            this.setState({
                showTimer: true,
                time: 20,
                Total_time: 20,
                pauseTimer: false,
                time_out: true,
            })
            // this.tick()
        }, 1000);

    };

    onEnd = () => {
        this.setState({
            time_out: false,
            Total_time: 0,
            pauseTimer: true,
            TimeOver: false,
            time: 20
        });
        clearTimeout(timeOut);
    };
    getRandomInt = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };
    removeWrongAswers = () => {
        let p = i;
        let k = 0;
        let buttons = document.getElementsByClassName('buttons');
        for (let j = 0; j < buttons.length; j++) {
            if (k < 2) {
                if (buttons[j].getAttribute("id") * 1 !== this.state.answerVariants[p].true_id * 1) {
                    buttons[j].style.display = 'none';
                    buttn[j] = buttons[j].getAttribute("id") * 1;
                    k++;
                }
            }

        }
        setTimeout(() => {
            this.setState({
                showAnswers: true,

            })
        }, 1000);

    };

    render() {
        let rightImg = require(`../../../images/notepadGameImages/${this.props.course_Name}/${this.props.gameID}.png`);
        let rightImg_url = `url(${rightImg})`;
        let answers;
        if (i < this.state.answerVariants.length) {
            let mas = this.state.answerVariants;
            let mor = mas.slice(i, i + 1);
            answers = mor.map((item, index) => {
                return (
                    <span className="btnContainer"  key={index}>
                <a href="#answer" id="1" className="btn btn-sm animated-button sandy-three buttons"
                   onClick={this.answer}> 1. &nbsp;
                    { item.a1.type === '1' ? '<' + item.a1.text + '>' : item.a1.type === '2' ? '<' + item.a1.text :
                        item.a1.type === '3' ? item.a1.text : item.a1.type === '4' ? item.a1.text : item.a1.type === '5' ? item.a1.text
                            : item.a1.type === '6' ? '</' + item.a1.text + '>' : item.a1.type === '7' ? item.a1.text : item.a1.type === '8' ? '<' + item.a1.text + '/>' : item.a1.type === '9' ? item.a1.text : item.a1.text}

                </a>
                <a href="#answer" id="2" className="btn btn-sm animated-button sandy-three buttons"
                   onClick={this.answer}> 2. &nbsp;
                    { item.a2.type === '1' ? '<' + item.a2.text + '>' : item.a2.type === '2' ? '<' + item.a2.text :
                        item.a2.type === '3' ? item.a2.text : item.a2.type === '4' ? item.a2.text : item.a2.type === '5' ? item.a2.text : item.a2.type === '6' ?
                            '</' + item.a2.text + '>' : item.a2.type === '7' ? item.a2.text : item.a2.type === '8' ? '<' + item.a2.text + '/>' : item.a2.type === '9' ? item.a2.text : item.a2.text}

                </a>
                    <a href="#answer" id="3" className="btn btn-sm animated-button sandy-three buttons"
                       onClick={this.answer}> 3. &nbsp;
                        { item.a3.type === '1' ? '<' + item.a3.text + '>' : item.a3.type === '2' ? '<' + item.a3.text :
                            item.a3.type === '3' ? item.a3.text : item.a3.type === '4' ? item.a3.text : item.a3.type === '5' ? item.a3.text
                                : item.a3.type === '6' ? '</' + item.a3.text + '>' : item.a3.type === '7' ? item.a3.text : item.a3.type === '8' ? '<' + item.a3.text + '/>' : item.a3.type === '9' ? item.a3.text : item.a3.text}

                </a>
                    <a href="#answer" id="4" className="btn btn-sm animated-button sandy-three buttons"
                       onClick={this.answer}> 4. &nbsp;
                        { item.a4.type === '1' ? '<' + item.a4.text + '>' : item.a4.type === '2' ? '<' + item.a4.text :
                            item.a4.type === '3' ? item.a4.text : item.a4.type === '4' ? item.a4.text : item.a4.type === '5' ? item.a4.text : item.a4.type === '6' ?
                                '</' + item.a4.text + '>' : item.a4.type === '7' ? item.a4.text : item.a4.type === '8' ? '<' + item.a4.text + '/>' : item.a4.type === '9' ? item.a4.text : item.a4.text}

                </a>
             </span>
                )
            })
        }


        return (
            <div className="container aa">
                {this.state.loaded ?
                    <span>
                        {this.state.takeDiamond ?
                        <div style={{margin: '0 auto'}}>
                        <div id="page-loader" className="page-loader" style={{background:'rgba(255, 255, 255, 0.4)'}}>
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
                    </div>:''
                    }

                <div className="bet-helpers-note">
                <button className="helper-btn helpb" onClick={
                     this.Help5050 }
                        style={{cursor: 'pointer'}}>
                50/50
                </button>
                    {/*
                     <button className="helper-btn helpb" onClick={
                     this.props.diamonds === false ? this.props.userProfile.diamonds === '0' ? '' : this.Help5050 : this.props.diamonds === '0' ? '' : this.Help5050}
                     style={{cursor: this.props.diamonds === false ? this.props.userProfile.diamonds === '0' ? 'no-drop' : 'pointer' : this.props.diamonds === '0' ? 'no-drop' : 'pointer'}}>
                     50/50
                     </button>

                       <button className="time-freezer helper-btn "
                     onClick={this.props.diamonds === false ? this.props.userProfile.diamonds === '0' ? ''
                     : this.timeHelper : this.props.diamonds === '0' ? '' : this.timeHelper}
                     style={{
                     cursor: !this.state.TimeOver ? 'no-drop' : this.props.diamonds === false ?
                     this.props.userProfile.diamonds === '0' ? 'no-drop' : 'pointer' : this.props.diamonds === '0' ? 'no-drop' : 'pointer'
                     }}> Freeze Time
                     </button>
                     <button className="helper-btn">
                     <MuiThemeProvider>
                     <ModalDialog userId={this.props.userProfile.uid}/>
                     </MuiThemeProvider>
                     </button>*/}

                </div>

                <span id="points">
                    {this.props.lang==='eng'?'Score':'Միավորներ'} <img src={require('../../../images/coin.png')} className="scoreImg" alt="coin" style={{
                    width: '35px',
                    marginTop: '-7px'
                }}/>   : {this.state.points}
                </span>



                <div className={`alertContainer ${this.state.isRight ? 'green' : 'red'}`} style={{
                    display: this.state.alert ? 'flex' : 'none',
                }}>
                <h1 className="alertText">
                <div className="checkmark"></div>
                </h1>
                    {/*<h1 className="alertText">{this.state.alertText}</h1>*/}
                </div>

           <div id="timer" style={{ right:'23%', top: '12px', position:'absolute' }}>
                  {this.state.answerVariants.length && this.state.showAnswers && this.state.showTimer &&
                       <div>
                      <span style={{position:'absolute', display: this.state.TimeOver ? 'block' : 'none'}}>

                      <ReactCountdownClock
                          seconds={this.state.Total_time}
                          color={(this.state.time <= 4 || this.state.pauseTimer) ? '#f5820f' : 'lightblue'}
                          size={70}
                          onComplete={this.onEnd}
                          paused={this.state.pauseTimer}

                      />
                      </span>
                          <span style={{ display: !this.state.TimeOver ? 'block' : 'none', position:'absolute'}}>
                      <img src={timeOverpng} width="70px" alt="Time Over" />
                      </span>

                         </div>
                  }
           </div>

                        {/*<div className="row">
                         <div className="col-md-12 text-center">
                         {question}
                         </div>
                         </div>*/}
                        { this.state.question &&
                        <div className="questionContianer">
                            <div className="container">
                                <div className="leftBar">
                                    <div id="notepadContainer" ref="notepad" style={{
                                            zIndex: '0',
                                            position: 'relative'
                                        }}>
                                            <CodeMirror
                                                value={this.state.code}
                                                options={options}
                                                onBeforeChange={(editor, data, value) => {
                                                    this.setState({value});
                                                }}
                                                onChange={(editor, metadata, value) => {
                                                }}
                                            />
                                     </div>
                                </div>
                                <div className="rightBar"
                                     style={{backgroundImage: `${rightImg_url}`}}>{/*<img  src={browserImg} alt=""/>*/}</div>
                            </div>
                        </div>
                        }
                        {this.state.showAnswers &&
                        <span>
                <div  ref="btnContainer">
                {answers === 0 ? '' : answers}
                </div>
                <div>
                <button className="button_blue" onClick={this.goToLevelList} title="Exit Game"> Exit Game
                </button>
                </div>
                </span>
                        }
                        {this.state.show_info ?
                            <span className="animated fadeIn">
                <PayForCoins close={this.closeBlackBackground} show_price_blank ={this.show}
                             PayDiamondForHelp5050={this.PayDiamondForHelp5050}/>
                <div className="price_back" id="blank_coins" style={{top: '0', left: '0'}}></div></span> : ''


                        }</span> : <div style={{margin: '0 auto'}}>
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
                    </div>}


            </div>
        );
    }
}
const store = state => ({
    gameList: state.gamelist,
    replay: state.replayGame,
    userProfile: state.userProfileData,
    diamonds: state.currentDiamonds,
    lang:state.lang
});
const dispatch = dispatch => ({
    replay: tabIndex => dispatch({type: 'REPLAY_GAME', payload: tabIndex}),
    gotogamelist: tabIndex => dispatch({type: 'GOTO_GAMELIST', payload: tabIndex}),
    addUserDiamonds: newState => {
        dispatch({type: 'CHANGE_DIAMONDS', payload: newState});
    },
    changeUserDiamonds: newState => {
        dispatch({type: 'ADD_USER_DIAMONDS', payload: newState});
    },
    showCoinsModalForHelp: newState => {
        dispatch({type: 'TOGGLE_COINS_FIRST_MODAL', payload: newState});
    },
    showCoinsModal:  newState =>{
        dispatch({type:'TOGGLE_COINS_FIRST_MODAL', payload: newState });
    },
    togglePriceTable: newState => {
        dispatch({type: 'TOGGLE_PRICE_TABLE', payload: newState});
    },
});
export default connect(
    store,
    dispatch
)(Note_html)