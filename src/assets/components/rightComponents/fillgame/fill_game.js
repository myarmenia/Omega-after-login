import React, {Component} from 'react';
import ReactCountdownClock from 'react-countdown-clock';
import {connect} from 'react-redux';
const style={
    container:{
        /*backgroundColor: 'rgba(204, 204, 204, 0.76)',*/
        height: '100%',
        width: '100vw',
        color: 'black',
       /* position: 'relative',*/
        display: 'flex',
        justifyContent: 'center'

    },
    font:{
        fontSize:'20px'
    },

    underline:{
        bottom: '0',
        height: '2px',
        background: '#4059a9',
        transform: 'scale(0,1)',
        transition: 'all ease-in 150ms',
        transitionProperty: '-webkit-transform,transform'
    },

};
let answers=[];
let quiz_answer,drag_answ;

let code, p;
let drag_elem, start, mas, mor, longest;
let inter;
let timeOverpng = require(`../../../images/notepadGameImages/time_over.png`);

class Fill_game extends Component {
    constructor(props) {
        super(props);
        this.state={
          game_fill:[],
            input:'',
            message:'',
            quiz_code:[],
            points:0,
            loaded:true,
            time:0,
            pauseTimer:false,
            showTimer:true,
            timeover:true,
            isRight:false
        };
       this.bonus=60;
       this.w=0;
       this.first=1;
       this.tick();
       this.count_press=0;

    }

    tick = () => {
        setTimeout(() => {
            inter = setInterval(() => {
                if (this.bonus >= 1) {
                    this.bonus--;
                   // console.log(this.bonus,"bonusbonusbonusbonus")
                }
                else {

                    clearInterval(inter)
                }

            }, 1000)
        })
    };
    allowDrop=(ev)=> {
    ev.preventDefault();
      // console.log("allowDrop")
    };

   drag=(ev) =>{
       start='';
       drag_elem='';
        ev.dataTransfer.setData("text", ev.target.id);
         start=ev.target.id;
       let element = document.getElementById(ev.target.id);
      // console.log("dragggg")
      setTimeout(
           ()=>{
               element.style.display="none";
           },10
       )

    };

    drop=(ev)=> {
    ev.preventDefault();
    let data = ev.dataTransfer.getData("text");
        drag_elem = data;
        let element = document.getElementById(data);
      // console.log(element.parentElement.className,"droppp");
        if(ev.target.className !== 'used_answ' && ev.target.className!== 'answer' ) {
            ev.target.append(document.getElementById(data));
        }
            if (element.parentElement.className !=='answ_fill'){

                element.style.display='block';
                element.classList='';
                element.classList='used_answ';
                element.parentNode.style.width='auto';
            }
        let code = document.getElementsByClassName('code');
        for (let i = 0; i < code.length; i++) {
            if (code[i].style.width === 'auto' && code[i].innerHTML === '') {
                code[i].style.width = '100px';
            }
        }
    };
   dragend =(ev)=> {
   // console.log(start, "dragEnd");
       if(start === drag_elem){
          // console.log("dragEnd_okkkkkkkkkkkk");
       }
       else{
           let element = document.getElementById(start);
           setTimeout(
               ()=>{
                   element.style.display="";
                   start='';
                   drag_elem='';

               },10
           )
         //  console.log("dragEnd_nooooooooooo");
       }

};
    drop_div=(ev)=> {
    ev.preventDefault();
    let data = ev.dataTransfer.getData("text");
    let element = document.getElementById(data);
      if(ev.target.className !== 'used_answ' && ev.target.className!== 'answer'){
          ev.target.append(document.getElementById(data));
      }
        //console.log(ev.target.className, "ev.target")
        if (element.parentElement.className !=='code'){
            element.classList = '';
            element.classList = 'answer grow-rotate';
            element.style.display='';}
            let code = document.getElementsByClassName('code');
            for (let i = 0; i < code.length; i++) {
                if (code[i].style.width === 'auto' && code[i].innerHTML === '') {
                    code[i].style.width = '100px';
                }
            }
         //  console.log("drop_div")

};


    componentWillMount(){

           let fill_game = `fill_game_id=${encodeURI(this.props.gameID)}`;
            fetch(`https://omegacoding.com/android_test/fill_game.php`, {
                method: 'POST',
                headers: {"Content-type": "application/x-www-form-urlencoded", 'Accept': 'application/json'},
                body: fill_game
            }).then(response => {
                if (response.ok) {
                    return response.json();
                }
            }).then(response => {
                if (!response.error){
                   // console.log(response.fill_game,"response.fill_game['game'];")
                    let arr = [];
                    let gg=response.fill_game['game'];
                    for (let i=0; i< gg.length; i++ ){
                        arr.push(gg[i]);
                    }
                this.setState({
                         game_fill:arr,
                         loaded:false
                       })
                  }
            }).catch(error => {
                console.log(error);
            });
    }
    componentWillReceiveProps(props){

       //console.log("mtavvvv--componentWillReceiveProps");
        let fill_game = `fill_game_id=${encodeURI(props.gameID)}`;
        fetch(`https://omegacoding.com/android_test/fill_game.php`, {
            method: 'POST',
            headers: {"Content-type": "application/x-www-form-urlencoded", 'Accept': 'application/json'},
            body: fill_game
        }).then(response => {
            if (response.ok) {
                return response.json();
            }
        }).then(response => {
            if (!response.error){
                let arr = [];
                let gg=response.fill_game['game'];
                for (let i=0; i< gg.length; i++ ){
                    arr.push(gg[i]);
                }
                this.setState({
                    game_fill:arr,
                    loaded:false
                })
            }
        }).catch(error => {
            console.log(error);
        });

    }

   componentWillUnmount(){
        clearInterval(inter);
    }


    shuffle =(a)=> {
        let j, x, i;
        for (i = a.length - 1; i > 0; i--) {
            j = Math.floor(Math.random() * (i + 1));
            x = a[i];
            a[i] = a[j];
            a[j] = x;
        }
        return a;
    }


    nextQiuz =()=>{

        this.bonus=60;
        let correct = document.getElementsByClassName("answ_back")[0];
        correct.style.display="flex";
        correct.style.left="-100px";
        correct.style.opacity="0";
        correct.style.visibility="hidden";
        correct.style.transition='all .10s ease-in';
        let coins_correct= document.getElementById("coins_correct");
        coins_correct.style.opacity="0";
        coins_correct.style.top="18px";
        coins_correct.style.fontSize="12px";
        coins_correct.style.visibility="hidden";
        coins_correct.style.transition='all .10s  .20s ease-in';
        coins_correct.style.transition='top .20s  .50s ease-out';
        let answ_fill = document.getElementsByClassName("answ_fill")[0];
        let code = document.getElementsByClassName("code");

        for(let i=0; i< code.length-1; i++){
            code[i].firstChild.style.display='';
            code[i].firstChild.classList.remove('used_answ');
            code[i].firstChild.classList.add("answer");
            code[i].firstChild.classList.add("grow-rotate");
            let ff=code[i].firstChild;
             answ_fill.append(ff);
             code[i].style.width='100px';
        }
        answers.length=0;
        this.w++;
        if (this.w < this.state.game_fill.length) {
        mas = this.state.game_fill;
        mor = mas.slice(this.w, this.w + 1);
            quiz_answer=[];
            for (let i=0; i<mor[0].answer.length; i++){
                quiz_answer.push(mor[0].answer[i])
            }
            longest = quiz_answer.reduce((a, b) => a.length > b.length ? a : b, '');
            mor[0].answer=this.shuffle(mor[0].answer);

        }

        if (this.w > this.state.game_fill.length-1) {
            this.w=0;
            this.bonus=0;
            this.props.g_over(this.state.points);
        }

        this.setState({
                alert:false,
                showTimer:false,
                pauseTimer:false,
                timeover:true,

            });
        setTimeout(()=>{
            this.setState({
            showTimer: true});
            this.tick();
            }, 5);




    };

    tryAgain =()=>{
        this.setState({
         id:this.state.id,
            alert:false,
        });
        let correct = document.getElementsByClassName("answ_back")[0];
        correct.style.display="flex";
        correct.style.left="-100px";
        correct.style.opacity="0";
        correct.style.visibility="hidden";
        correct.style.transition='all .10s ease-in';

         answers.length=0;
         let inp = document.getElementsByClassName("inp_fill");
         for(let i=0 ; i<inp.length; i++ ){
         inp[i].value="";
         }
    };

    chekQiuz = () =>{

        this.count_press=0;
           this.first=0;
           let code = document.getElementsByClassName('code');
           // console.log(code[0].firstChild.textContent);
           for (let i = 0; i < code.length; i++) {
               if (code[i].style.width === 'auto') {
                   answers.push(code[i].firstChild.textContent)
               }
           }
           let db_answ=quiz_answer.join("");

           let user_answ=answers.join("");

           //  console.log(db_answ,"db_answdb_answdb_answ");
           //  console.log(user_answ,"user_answuser_answuser_answuser_answ");

           let correct = document.getElementsByClassName("answ_back")[0];
           correct.style.display="flex";
           correct.style.left="33%";
           correct.style.opacity="1";
           correct.style.visibility="visible";
           correct.style.transition='all .20s ease-in';

           if (db_answ === user_answ){
               clearInterval(inter);
               this.setState({
                   pauseTimer:true,

               });
               let wrong = document.getElementsByClassName("correct_img")[0];
               let correct_text = document.getElementsByClassName("correct")[0];
               correct_text.style.color= '#5daa05';
               wrong.style.backgroundPosition='-56px';

               this.setState({
                   isRight:true,
                   alert:true,
                   message:'Correct!',
               });
               let coins_correct= document.getElementById("coins_correct");
               coins_correct.style.opacity="1";
               coins_correct.style.fontSize="22px";
               coins_correct.style.visibility="visible";
               coins_correct.style.top="10px";
               coins_correct.style.transition='all .10s  .20s ease-in';
               setTimeout(()=>{
                   this.setState({
                       time:this.bonus,
                       points: this.state.points + 100 + this.bonus

                   });
               },200)
           }
           else{
               let wrong = document.getElementsByClassName("correct_img")[0];
               let correct_text = document.getElementsByClassName("correct")[0];
               correct_text.style.color= '#e8393d';
               wrong.style.backgroundPosition='0px';
               this.setState({
                   isRight:false,
                   alert:true,
                   message:'Wrong!',

               });
           }



    };

    onEnd = () => {
        this.setState({
            timeover:true,
            showTimer: false
        });

    };

    componentDidMount() {
        window.document.addEventListener('keydown',
         (e)=> {
               let key = e.which || e.keyCode;

                if((e.which === 13 || e.which === 32) && this.state.isRight) {
                    this.count_press++;
               if(this.count_press<=1){
                        this.nextQiuz();
                    }
                }
        })
    }


    render(){
    // console.log(this.state.game_fill.length ,"this.state.game_fill");
            if (this.first){
               mas = this.state.game_fill;
               mor = mas.slice(this.w, this.w + 1);
                if (mor[0]) {
               quiz_answer=[];
                for (let i=0; i<mor[0].answer.length; i++){
                    quiz_answer.push(mor[0].answer[i])
                }
               longest = quiz_answer.reduce((a, b) => a.length > b.length ? a : b, '');
                    mor[0].answer=this.shuffle(mor[0].answer);
                }
            }

            if (mor[0]) {
              //  console.log(mor[0], "morrrrrrrrr");
                p = mor[0].question;
                let i = 0;

                code = mor[0].code.map((item, index) => {
                    i++;
                    return (
                        <span key={index}>
                 <span style={style.font}>
                     {item}
                 </span>
                    <span id={`div${i}`} style={{
                        borderBottom: '1px solid #656363',
                        display: i > mor[0].code.length - 1 ? 'none' : 'inline-block',
                        height: '30px',
                        width: `${longest.length*12}px`
                    }} onDrop={this.drop} onDragOver={this.allowDrop}
                          className="code"/>
                    </span>
                    )
                });


                drag_answ = mor[0].answer.map((item, index) => {
                    i++;
                    return (
                        <span key={index}>
                             <span id={`div${i}`} draggable="true" onDragStart={this.drag} className="answer grow-rotate"  onDragEnd={this.dragend} >
                                 {item}
                             </span>
                        </span>
                    )
                });
            }


        return(
            <div className="container-fluid fill" style={style.container}>
                {this.state.loaded ?
                            <div style={{margin: '0 auto'}}>
                                <div id="page-loader" className="page-loader" style={{background:'rgba(255, 255, 255, 0.4)'}}>
                                    <div style={{textAlign: 'center'}}>
                                        <div className="page-loader-body">
                                            <div className="cssload-loader">
                                                <div className="cssload-inner cssload-one"/>
                                                <div className="cssload-inner cssload-two"/>
                                                <div className="cssload-inner cssload-three"/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>:
                <div className="row">
                 <div id="points_fill_game">
                     <div id="timer" style={{ left:'10px', top: '4px', position:'absolute'}}>
                         {this.state.showTimer ?
                      <ReactCountdownClock
                          seconds={60}
                          color={'#9a64ab'}
                          size={70}
                          onComplete={this.onEnd}
                          paused={this.state.pauseTimer}
                          pausedText={`${this.bonus}`}
                      />: this.state.timeover ? <img src={timeOverpng} width="70px" alt="Time Over" />:null
                            }
                     </div>
                    {this.props.lang==='eng'?'Score':'Միավորներ'}
                    <img src={require('../../../images/coin.png')} className="scoreImg" alt="coin" style={{
                     width: '27px',
                        verticalAlign: 'unset',
                        marginLeft:'3px'
                 }}/>   : {this.state.points}
                </div>

                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                    <h3 className="fill_quest">{p}</h3>
                    <pre className="paper">
                      {code}
                      </pre>
                    <div  className="answ_fill" onDrop={this.drop_div} onDragOver={this.allowDrop}>{drag_answ} </div>

                    <div className="fill_next hvr-float-shadow" onClick={this.chekQiuz}>Check</div>
                </div>
                <div className="answ_back">
                    <div id="coins_correct" style={{visibility:this.state.isRight?'vissilible':'hidden'}}> <span style={{color:'#5daa05'}}>100 + </span>  {this.state.time} Bonus!!! </div>

                    <div style={{display: 'flex', margin: '0 auto'}}>
                        <div className="correct_img" width="40" />
                        <div className="correct">{this.state.message}</div>
                    </div>

                    <div className="round">
                    {this.state.isRight?
                            <a href="#" name="next" className="button" onClick={this.nextQiuz} >Next</a>:
                        <a href="#" name="again" className="button_wrong" onClick={this.tryAgain} >Again</a>}</div>
                </div>
                <div className={`alertContainer ${this.state.isRight?'green':'red'}`} style={{
                    display:this.state.alert?'flex':'none'}} />
                </div>
                        }
            </div>
        )
    }
}

const state = store =>({
    lang:store.lang,
})
const dispatch =()=>({

})
export default  connect(state,dispatch)( Fill_game);