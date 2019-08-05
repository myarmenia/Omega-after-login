import React, { PureComponent } from 'react';
//import ReactCountdownClock from 'react-countdown-clock';
import Points from './pointsView';
import { connect } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import IconButton from 'material-ui/IconButton';
import '../../../styles/notepadGame/style.css';
import '../../../styles/notepadGame/animation.css';
import '../../../styles/notepadGame/lastPage.css'

import '../../../styles/codemirror.css';
require('codemirror/mode/javascript/javascript');


let browserImg = require('../../../images/notepadGameImages/1.png');
let starSmall = require('../../../images/notepadGameImages/star_small.png');
let starBig = require('../../../images/notepadGameImages/star_big.png');
let starSmallEmpty = require('../../../images/notepadGameImages/star_small_empty.png');
let starBigEmpty = require('../../../images/notepadGameImages/star_big_empty.png');


class NotepadGame extends PureComponent {
    constructor(){
        super();
        this.state = {
            isAnswered:false,
            questionNumber:0,
            tab:10,
            enter:0,
            alertText:'Correct',
            isRight:false,
            alert:false,
            question:'',
            gameId:'',
            answerIds:[],
            answerGroupIds:[],
            answers:[],
            answerVariants:[],
            isCorrect:'',
            time:10,
            points:0,
            amountOfRightsAnswers:0,
            gameFinished:false,
            numberOfStars:0,
            answerTimes:0,
            showAnswers:false,
            answerUi:[],
            code:'',
            rank:'',
           // code: "// Code"
        };
       this.tick();
    }

    componentWillMount(){
        setTimeout(() => {
            this.setState({
                showAnswers:true
            })
        },1000);
        let game = `level=${encodeURI(1)}&course_id=${encodeURI(1)}`;
        fetch(`https://omegacoding.com/android_test/index.php`,{
            method:'POST',
            headers:{"Content-type":"application/x-www-form-urlencoded",'Accept':'application/json'},
            body:game
        }).then(response => {
            if(response.ok){
                return response.json();
            }
        }).then(response => {
            let game_id = response.game1.game_id;
            let question = response.game1.question;
            this.setState({
                question:question,
                gameId:game_id
            });
        }).catch(error => {
            console.log(error,'error');
        });

        let answers_req = `game_id=${encodeURI(1)}`;
        fetch(`https://omegacoding.com/android_test/notepad_game.php`,{
            method:'POST',
            headers:{"Content-Type":"application/x-www-form-urlencoded",'Accept':'application/json'},
            body:answers_req
        }).then(response => {
            if(response.ok){
                return response.json();
            }
        }).then(response => {
            console.log(response,"skzbicccc")
            let answerVariants = Object.values(response);
            console.log(answerVariants,"AAAAAAAAAanswerVariants")
            let answerIds = [];
            answerVariants.shift();
            let spacing = [];
            let answers = [];
            for(let i = 0; i < answerVariants.length; ++i){
                spacing.push({
                    tab:answerVariants[i].tab,
                    enter:answerVariants[i].enter
                });
                answers.push(answerVariants[i]);
                answerIds = Object.keys(answers[i]);
                console.log(answerIds,"answerIdsanswerIdsanswerIds")
                answerIds.splice(answerIds.length-3,3);
                console.log(answerIds,"answerIdsanswerIdsanswerIds33333")

                this.setState({
                    answerUi:[...this.state.answerUi,{
                        tab:answers[i].tab,
                        enter:answers[i].enter
                    }],
                    answerIds:[...this.state.answerIds,answerIds],
                    answerGroupIds:[...this.state.answerGroupIds,answers[i].id],
                    answers:answers
                });
            }
            let newAnswers = [];
            let answer = '';
            let answerTypes = [];
            let answerVariant = null;
            answerVariant = Object.values(this.state.answers);
            for(let i = 0; i < this.state.answers.length; ++i){
                answerVariant = Object.values(this.state.answers[i]);
                answerVariant.splice(answerVariant.length-3,3);
                answerTypes.push(answerVariant);
                console.log(answerTypes,"Arrrrrrrrrrrr")
            }
            for(let i = 0; i < answerTypes.length; ++i){
                newAnswers.push([]);
                for(let j = 0; j < answerTypes[i].length; ++j){
                    if(answerTypes[i][j].split('')[0] === '-'){
                        answer = answerTypes[i][j].split('');
                        answer = answer.splice(1,answer.length);
                        answer = answer.join('');
                        newAnswers[i].push(`</${answer}>`);
                    }
                    else if(answerTypes[i][j].split('')[0] === '+'){
                        answer = answerTypes[i][j].split('');
                        answer = answer.splice(1,answer.length);
                        answer = answer.join('');
                        newAnswers[i].push(answer);
                    }
                    else{
                        answer = answerTypes[i][j];
                        newAnswers[i].push(`<${answer}>`);
                    }
                }
            }
            this.setState({answerVariants:[...newAnswers]})
        });
    }



    answer = (event) => {
        let element = event.target;
        console.log(element, "elementelement");

        if(!this.state.isAnswered){
            let checkAnswer = `game_id=${encodeURI(this.state.gameId)}
                &answers_id=${encodeURI(this.state.answerGroupIds[this.state.questionNumber])}
                &variant=${encodeURI(this.state.answerIds[this.state.questionNumber][event.target.id])}`;
            console.log(checkAnswer, "checkAnswercheckAnswercheckAnswercheckAnswercheckAnswer");
          fetch(`https://omegacoding.com/android_test/notepad_game.php`,{
                method:'POST',
                headers:{"Content-type":"application/x-www-form-urlencoded",'Accept':'application/json'},
                body:checkAnswer
            }).then(response => {
                if(response.ok){
                    return response.json();
                }
            }).then(response => {
                console.log(response.result, "resultresultresultresult");
                this.checkAnswer(element,(response.result === 'true'));
            });

        }
        setTimeout(() => {
            this.setState({alert:false});
        },1000);
    };

    checkAnswer = (element,isCorrect) =>{
        console.log(element,"element")
        if(!this.state.isAnswered) {
            if (isCorrect) {
                let tab = this.state.answerUi[this.state.questionNumber].tab;
                let enter = this.state.answerUi[this.state.questionNumber].enter;
                if(enter > 0){
                    for(let i = 0; i < enter; ++i){
                        this.setState({code:`${this.state.code}\n`});
                    }
                }
                if(tab > 0){
                    for(let i = 0; i < tab; ++i){
                        if(enter > 0){
                            console.log(i);
                            this.setState({code:`${this.state.code}\xa0\xa0`});
                        }
                    }
                }

                if(tab > 0){
                    for(let i = 0; i < tab; ++i){
                        if(enter > 0){
                            console.log(i);
                            this.setState({code:`${this.state.code}\xa0\xa0`});
                        }
                    }
                }
                let answerVariant = this.state.answerVariants[this.state.questionNumber][element.id];
                setTimeout(() => {
                    this.setState({code:`${this.state.code} ${answerVariant}`});
                },500);

                this.setState({isAnswered: true});
                element.style.transition = '1s';
                element.style.position = 'relative';

                if (element.id === '0') {
                    element.style.transform = 'translate(50px,-250px) rotate(360deg)';
                    element.style.opacity = '0';
                    element.style.width = '50px';
                }
                if (element.id === '1') {
                    element.style.transform = 'translate(-50px,-250px) rotate(360deg)';
                    element.style.opacity = '0';
                    element.style.width = '50px';
                }
                if (element.id === '2') {
                    element.style.transform = 'translate(-410px,-250px) rotate(360deg)';
                    element.style.opacity = '0';
                    element.style.width = '50px';
                }
                if (element.id === '3') {
                    element.style.transform = 'translate(-820px,-250px) rotate(360deg)';
                    element.style.opacity = '0';
                    element.style.width = '50px';
                }
                this.setState({
                    isRight: true,
                    alertText: 'Correct',
                    alert: true
                });
                let buttons = document.getElementsByClassName('buttons');
                setTimeout(() => {
                    for (let i = 0; i < buttons.length; ++i) {
                        buttons[i].style.position = 'initial';
                        buttons[i].style.transform = 'initial';
                        buttons[i].style.transition = 'initial';
                        buttons[i].style.opacity = 'initial';
                        buttons[i].style.width = 'calc(96%/4)';
                    }
                    console.log(this.state.answers.length,"this.state.answers.lengththis.state.answers.length")
                    if (this.state.questionNumber < this.state.answers.length - 1) {
                        this.setState({
                            isAnswered: false,
                            questionNumber: 1 + this.state.questionNumber,
                            amountOfRightsAnswers: this.state.answerTimes === 0 ? this.state.amountOfRightsAnswers + 1:this.state.amountOfRightsAnswers,
                            answerTimes: 0,
                            time: 10,
                            alert:false
                        });
                    }
                    else {
                        this.setState({gameFinished: true});
                        this.getAnswerPercent();
                    }
                }, 1000);

                if (this.state.answerTimes === 0) {
                    this.addPoints();
                }
            }
            else {
                this.setState({
                    isRight: false,
                    alertText: 'Your answer is incorrect',
                    alert: true,
                    answerTimes: this.state.answerTimes + 1,
                    time:0
                });
                setTimeout(() => {
                    element.style.transition = '1s';
                    element.style.position = 'relative';
                    element.style.opacity = '0';
                    this.setState({
                        alert: false,
                    });
                    setTimeout(() => {
                        this.setState({
                            isAnswered: false
                        });
                    }, 1000);
                }, 500)
            }
        }
    };

    tick = () => {
        setTimeout(() => {
            setInterval(() => {
                if(this.state.time >= 1){
                    this.setState({time:this.state.time -1 })
                }
            },1000)
        })

    };

    addPoints = () => {
        let bonusPoint = this.state.time;
        this.setState({points:this.state.points + 20 + bonusPoint});
    };
    getAnswerPercent = () => {
        let numberOfAnswers = this.state.answerVariants.length;
        let percentOfRightAnswers = (this.state.amountOfRightsAnswers/numberOfAnswers)*100;
        if(percentOfRightAnswers <= 40 ){
            this.setState({numberOfStars:1})
        }
        if(percentOfRightAnswers > 40 && percentOfRightAnswers <= 75){
            this.setState({numberOfStars:2})
        }
        if(percentOfRightAnswers > 75){
            this.setState({numberOfStars:3})
        }
        // let getRaiting = `unique_id=${encodeURI('596cc043380888.51716196')}
        //                     &level=${encodeURI(1)}
        //                     &course_name=${encodeURI('html')}
        //                     &mark=${encodeURI(this.state.numberOfStars)}
        //                     &points=${encodeURI(this.state.points)}
        //                     &operation=${encodeURI(5)}
        //                     &game_id=${encodeURI(1)}`; unique_id=596cc043380888.51716196

        let getRaiting = `unique_id=${encodeURI(this.props.userProfile.uid)}&level=1&course_name=html&mark=${this.state.numberOfStars}&points=${this.state.points}&operation=5&game_id=1`;
        fetch(`https://omegacoding.com/android_test/userProgressManager.php`,{
            method:'POST',
            headers:{"content-type": "application/x-www-form-urlencoded",'Accept':'application/json'},
            body:getRaiting
        }).then(response => {
            if(response.ok){
                return response.json();
            }
        }).then(response => {
            console.log(response,"respooooooooooooooooooooooooo");
            this.setState({rank:response.rank});
        });
    };
    replay = () =>{
        this.props.data(2)
    };
    goToGamelist = () =>{
        this.props.data(0);

    };

    render() {

        let light = require('../../../images/notepadGameImages/light.png');
        let url=`url(${light})`;
        let answers = null;
        let question = null;
        if(this.state.answerVariants.length){
            question = <h2>{this.state.question}</h2>;
            answers = this.state.answerVariants[this.state.questionNumber].map((item,index) => {
                return (
                    <a href="#answer" id={index} key={index}  className="btn btn-sm animated-button sandy-three buttons"   onClick={this.answer}>
                        {item}
                    </a>
                )
            })
        }
        if(this.state.gameFinished){
            return(
                <div className="container">
                    <div className="lightContainer">
                        <div className="light"  style={{backgroundImage:`${url}`,  backgroundRepeat: 'no-repeat',
                            backgroundPosition: 'center ', width: '100%', height: '100%' }}>

                        </div>
                    </div>
                    <div className="raitingContainer">
                        <div className="starsImage">
                            <div className="star1 stars"
                                 style={{
                                     backgroundImage:`url(${this.state.numberOfStars >= 1 ? starSmall:starSmallEmpty})`
                                 }}>
                            </div>
                            <div className="star2 stars"
                                 style={{
                                     backgroundImage:`url(${this.state.numberOfStars >= 2 ? starBig:starBigEmpty})`
                                 }}>
                            </div>
                            <div className="star3 stars"
                                 style={{
                                     backgroundImage:`url(${this.state.numberOfStars === 3 ? starSmall:starSmallEmpty})`
                                 }}/>
                        </div>
                        <div className="lent"/>
                    </div>
                    <div className="scoreContainer">
                        <span className="score"><Points points={this.state.points}/>&nbsp;&nbsp;Points</span>
                    </div>
                    <div className="scoreContainer">
                        <span className="score rank">Your Rank is: {this.state.rank}</span>
                    </div>

                    <div> <button className="button_green" style={{padding: '10px 32px 10px 32px'}} onClick={this.replay} > Retry</button> <button className="button_orange" onClick={this.goToGamelist}> Continue... </button></div>
                </div>
            )

        }
        return (
            <div className="container">
                <MuiThemeProvider>
                    <IconButton >
                        <i className="material-icons menuIcon" onClick={this.goToGamelist} title="Exit Game">exit_to_app</i>
                    </IconButton>
                </MuiThemeProvider>
                <span id="timer">
                {/* { this.state.answerVariants.length && this.state.showAnswers &&
                 <ReactCountdownClock
                 seconds={10}
                 color={this.state.time <= 2 ? 'red' : 'lightblue'}
                 size={100}
                 onComplete={this.timeEnd}
                 />
                 } */}
            </span>

                <p id="points" style={{height:'110px'}}>
                    {/*<CSSTransitionGroup*/}
                    {/*transitionName={"fade"}*/}
                    {/*transitionEnterTimeout={500}*/}
                    {/*transitionLeaveTimeout={300}>*/}
                    {this.state.showAnswers &&
                    <span>
                            {this.state.points}

                        </span>
                    }
                    {/*</CSSTransitionGroup>*/}
                </p>
                <div className={`alertContainer ${this.state.isRight?'green':'red'}`} style={{
                    display:this.state.alert?'flex':'none',
                }}>
                    <h1 className="alertText">{this.state.alertText}</h1>
                </div>
                <div className="row">
                    <div className="col-md-12 text-center">
                        {/*<CSSTransitionGroup*/}
                        {/*transitionName={"fade"}*/}
                        {/*transitionEnterTimeout={500}*/}
                        {/*transitionLeaveTimeout={300}>*/}
                        {question}
                        {/*</CSSTransitionGroup>*/}
                    </div>
                </div>
                {/*<CSSTransitionGroup*/}
                {/*transitionName={"fade"}*/}
                {/*transitionEnterTimeout={700}*/}
                {/*transitionLeaveTimeout={700}>*/}
                { this.state.question &&
                <div className="questionContianer">
                    <div className="leftBar" >
                       {/* <Code value={this.state.code}/>*/}
                       <div className="notepad" >
                            <div id="notepadContainer" ref="notepad">

                             <pre style={{fontWeight:'bold',marginTop:'16.5px',marginLeft:'8px'}}>{this.state.code}</pre>
                            </div>
                        </div>
                    </div>

                    <div className="rightBar"><img width="100%" src={browserImg} alt=""/></div>


                </div>
                }

                {/*</CSSTransitionGroup>*/}
                {/*<CSSTransitionGroup*/}
                {/*transitionName={"fade"}*/}
                {/*transitionEnterTimeout={500}*/}
                {/*transitionLeaveTimeout={300}>*/}
                { this.state.showAnswers &&
                <span>
                <div className="btnContainer" ref="btnContainer" style={{marginTop:'-85px'}}>
                         {answers}
                </div>
                <div>
                <button className="button_blue" onClick={this.goToGamelist} title="Exit Game"> Exit Game
                </button>
                </div>
            </span>
                }
                {/*</CSSTransitionGroup>*/}

            </div>
        );
    }
}


const store = state => ({
    gameList : state.gamelist,
    replay:state.replayGame,
    userProfile: state.userProfileData,


});

const dispatch = dispatch => ({
    replay: tabIndex => dispatch({type:'REPLAY_GAME', payload: tabIndex }),
    gotogamelist: tabIndex => dispatch({type:'GOTO_GAMELIST', payload: tabIndex }),
});

export default connect(
    store,
    dispatch
)(NotepadGame)
