import React, {Component} from 'react';
import ReactCountdownClock from 'react-countdown-clock';
import FlatButton from 'material-ui/FlatButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import './Game_demo_styles/animate.css';
import './Game_demo_styles/demoFragments.css';
import {connect} from 'react-redux';
import '../../../styles/notepadGame/style.css';
import '../../../styles/notepadGame/animation.css';
import '../../../styles/notepadGame/lastPage.css';
import {Controlled as CodeMirror} from 'react-codemirror2';
import '../../../styles/codemirror.css';

require('codemirror/mode/javascript/javascript');
require('codemirror/mode/xml/xml');
require('codemirror/mode/markdown/markdown');


let i = 0;
let p = 0;
let num=0;

let timeout1, timeout2, timeout3;
let modal_texts=[];
//let modal_texts = [" Welcome to NPad smart game for learning coding!", "text2", "text3", "text4"];
let timeOverpng = require(`../../../images/notepadGameImages/pointer.png`);
let array = [];
let say_hello="Introduction";
let arrow_classes=[ ' jpeg',' code_mir',' answers',' help_btnns']

class Demo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text_for_demo: 'Welcome to NPad smart game for learning coding!'
        };
    this.get_demo_text();
    }

        get_demo_text=()=> {
            //console.log("1111demoooooooooooooooo___response")
        fetch('https://omegacoding.com/android_test/demo_notepad_text.json')
            .then(response => response.ok ? response.json() : "Something went wrong")
            .then(response => {
                //console.log(response,"demoooooooooooooooo___response")

                modal_texts=[...response]
                this.setState({
                    text_for_demo: modal_texts[0].text
                });
               // console.log(modal_texts,"modal_textsmodal_textsmodal_textsmodal_texts")
            }).catch(error => {
            console.log(error);
        });
    };
    close_hello_moadl = () => {

        let arrow_div=document.getElementById('arrow');

        let Modal = document.getElementsByClassName('demo-modal-fragment-content')[0];
        Modal.style.display = "none";

        setTimeout(
            () => {
                array[0].style.zIndex = "50";


            }, 300
        );
        p++;
        this.setState({
            text_for_demo: modal_texts[0]
        });
        setTimeout(
            () => {
                Modal.style.display = "block";
                arrow_div.classList.add("jpeg", "animated", "fadeIn");

            }, 600
        )

    };
    fragCloseX = () => {

        let arrow_div=document.getElementById('arrow');
        let black_fon = document.getElementsByClassName('demo-modal-fragment')[0];
        let fragModal = document.getElementsByClassName('demo-modal-fragment-content')[0];
        let leftBar = array;
        arrow_div.classList.remove("animated", "fadeIn");

      setTimeout(
            () => {
                num++;
                arrow_div.className += arrow_classes[i];
                arrow_div.classList.add("animated", "fadeIn");
            }, 300)
        if (i < modal_texts.length - 1) {

            timeout1 = setTimeout(
                () => {
                    leftBar[i - 1].style.zIndex = "11"

                }, 200
            );
            fragModal.style.display = "none";
            i++;
            timeout2 = setTimeout(
                () => {
                    leftBar[i].classList.add("animated", "fadeIn");
                    leftBar[i].style.zIndex = "50"
                }, 400
            );
            this.setState({
                text_for_demo: modal_texts[i]
            });
            timeout3 = setTimeout(
                () => {
                    fragModal.style.display = "block"
                }, 1100
            );

        }
        else {

            i = 0; p = 0;
            clearTimeout(timeout2);
            black_fon.style.display = "none";
            this.props.for_demo(false)


        }

    };

    componentDidMount() {

        let leftBar = document.getElementsByClassName('demo');
        array[0] = leftBar[2];
        array[1] = leftBar[1];
        array[2] = leftBar[3];
        array[3] = leftBar[0];


        let Modal = document.getElementsByClassName('demo-modal-fragment-content')[0];
        setTimeout(
            () => {
                Modal.style.display = "block";
            }, 200
        )

    }

    render() {
   //console.log(num,"demooooooo")
        let rightImg = require(`../../../images/notepadGameImages/HTML/1.png`);
        let rightImg_url = `url(${rightImg})`;



        return (
            <div className="container aa">

                <div className="demo bet-helpers-note">
                    <button className="helper-btn helpb">
                        50/50
                    </button>
                   {/* <button className="time-freezer helper-btn "> Freeze Time
                    </button>
                    <button className="helper-btn">
                        <MuiThemeProvider>
                            <ModalDialog />
                        </MuiThemeProvider>
                    </button>*/}
                </div>

                <span id="points" style={{height: '110px'}}>

                    <span>
                     Your <img src={require('../../../images/coin.png')} className="scoreImg" alt="coin" style={{
                        width: '50px',
                        marginTop: '12px'
                    }}/>   : 1000
                        </span>

                </span>


                <div id="timer" style={{
                    display: 'block', paddingRight: '4%', right: '11%',
                    top: '5px', position: 'absolute'
                }}>

                    <ReactCountdownClock
                        seconds={20}
                        color={ '#f5820f' }
                        size={70}
                        paused={true}

                    />
                </div>
                <div className="questionContianer" style={{marginTop: '87px'}}>
                    <div className="container">
                        <div className="demo leftBar">
                            <div>
                                <div id="notepadContainer" ref="notepad">
                                    <CodeMirror
                                        value={'<html>'}

                                        onBeforeChange={(editor, data, value) => {
                                            this.setState({value});
                                        }}
                                        onChange={(editor, metadata, value) => {
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="demo rightBar"
                             style={{backgroundImage: `${rightImg_url}`}}></div>
                    </div>
                </div>

                <span>
                <div  className="btnContainer"ref="btnContainer">
              <span className="demo btnContainer">
              <a href="#answer" id="1" className="btn btn-sm animated-button sandy-three buttons"> Answer:1
                </a>
              <a href="#answer" id="1" className="btn btn-sm animated-button sandy-three buttons"> Answer:2
                </a>
              <a href="#answer" id="1" className="btn btn-sm animated-button sandy-three buttons"> Answer:3
                </a>
              <a href="#answer" id="1" className="btn btn-sm animated-button sandy-three buttons"> Answer:4
                </a>
                 </span>
                </div>
                <div>
                <button className="button_blue" title="Exit Game"> Exit Game
                </button>
                </div>
            </span>

                <div id="arrow" className="jpe"  style={{transform: num === 2? 'rotate(-141deg)':null}} >
                    {p === 0?'':<img className="arrow_anim " src={timeOverpng}  width="34"/>}
                </div>
                <div className="demo-modal-fragment" style={{display: "block"}}>
                    <div className="demo-modal-fragment-content demo-modal" style={{padding: p === 0 ?'0px 32px':''}}>

                        {p > 0 && <span className="bet-fragment-close" onClick={this.fragCloseX}>×</span>}
                        <div className="demo-fragment-modal-header">
                           <h2  style={{fontSize: '25px'}}>{p === 0 ? say_hello: this.state.text_for_demo.title}</h2>

                        </div>
                        <div className="bet-fragment-modal-body">
                            <span className="bet-frag-frame">{p === 0 ? "Welcome to NPad smart game for learning coding!": this.state.text_for_demo.text}</span>
                        </div>
                        {p === 0 &&
                        <div className="bet-fragment-modal-footer">
                            <span className="bet-fragment-close-btn ">
                              <MuiThemeProvider>
                                  <FlatButton
                                      label="Close"
                                      style={{border: '1px dotted grey'}}
                                      primary={true}
                                      onClick={this.close_hello_moadl}
                                  />
                              </MuiThemeProvider>
                            </span>
                        </div>


                        }
                    </div>
                </div>


            </div>
        );
    }
}
const store = state => ({});
const dispatch = dispatch => ({});
export default connect(
    store,
    dispatch
)(Demo)
