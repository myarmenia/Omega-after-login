import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import ReactPlayer from 'react-player';
import GamesList from './gamesList';
import { connect } from 'react-redux';
import '../../styles/3Ddropdown.css';
import { push } from 'react-router-redux';
//import $ from 'jquery';
import PayForCoins from '../use_coins';
import Homeworkpanel from './homeworkpanel/homepanel';


let lock = require(`../../images/lock.png`);
let url_lessons = require(`../../images/html_points.png`);
let on_lesicon_over = require(`../../images/on_lesicon_over.png`);
let url_lessons_lock = require(`../../images/html_points_lock.png`);
let title_video=[];
let obj1={};
let obj2={};
let index;
let link;
let comment,add_comment;
class CurrentCourse extends Component {

    constructor(props){
        super(props);
        this.paths = ['/courses','/orders','/statistics','/settings'];
        this.state = {
            currentCourse:'',
            videoLink:'',
            openVideo: false,
            noLink:true,
            playGame: false,
            gametype:'',
            img:[],
            lessons:'',
            courseLevel:'',
            count:'',
            over_icon:false,
            show_Game_list:false,
            password:'',
            comment:'',
            send_btn:'',
            comment_status:'',
            display:false

        };
       this.formap=[];
     this. max_points_obj={};

    }

  /*  playGame = () => {
        this.setState({
            openVideo: false,playGame: true
        });
        this.props.gotogamelist(0)
    };*/

    changeState =(e)=>{
             this.setState({
            openVideo: e,
            playGame:e,
                 })
       //
         };
    takeVideoPass =()=>{

        this.props.toggleNavMenu(true);
        //this.props.navigateTo(this.paths[1] + '?' +this.props.userProfile.course_lift[`${this.props.current_courseID}`]+'&'+this.props.current_courseID);
        this.props.navigateTo(this.paths[1] + '?' +this.props.userProfile.course_lift[`${this.props.current_courseID}`]);
        this.setState({
            over_icon:false,
            openVideo: false,
            show_Game_list:false,
        });
        this.props.changePage(4);
    };

    replayVideo =(e)=>{
        this.setState({
            openVideo: e,
                noLink:e,
            playGame:!e

        })
       };
    play_curr_game =(e)=>{
        this.setState({
            openVideo: e,
            over_icon:!e,
            show_Game_list:e
       })
       };
    goBack = () =>{
        this.setState({
            openVideo: false,
            noLink:false,
       })
    };
    GetPreviousCourseInfo =(e)=>{
    // console.log(e,"ddddddddddddddddddd")
        let oper='get_info_previous_levels';
        let get_coins = `unique_id=${encodeURI(this.props.userProfile.uid)}&level=${encodeURI(1)}&operation=${encodeURI(oper)}&course_name=${encodeURI(e)}&course_id=${encodeURI(this.props.courseID)}`;
     //  console.log(get_coins, "-get_info_previous_levels");
        fetch(`https://omegacoding.com/android_test/userProgressManager.php`,{
            method:'POST',
            headers:{"Content-type":"application/x-www-form-urlencoded",'Accept':'application/json'},
            body: get_coins
        }).then(response => {
            if(response.ok){
                return response.json();
            }
        }).then(response => {
          //  console.log(response, "response lockLessons");
            if (!response.error){
                this.props.putCoins(response.coins);
                this.props.showCoinsModal('next_coins');
                /*if(this.props.courseID ==='2'){
                    this.props.showTrialText('After unlocking this level, your free trial will be activated');
                }
                */

                this.props.show_coins_blank('coins_blank');
            }
            else{
                this.props.showCoinsModal('other_coins');
                this.props.show_coins_blank('coins_blank');
            }
        }).catch(error => {
            console.log(error);
        });
    };
    getCoins =(e)=>{

        if (e===1){
            let oper='get_coins';
            let get_coins = `level=${encodeURI(e)}&operation=${encodeURI(oper)}&course_id=${encodeURI(this.props.courseID)}`;
           // console.log(get_coins, "-Unlock_NextLessons");
            fetch(`https://omegacoding.com/android_test/userProgressManager.php`,{
                method:'POST',
                headers:{"Content-type":"application/x-www-form-urlencoded",'Accept':'application/json'},
                body: get_coins
            }).then(response => {
                if(response.ok){
                    return response.json();
                }
            }).then(response => {

                //console.log(response, "response lockLessons");
                this.props.putCoins(response.coins);
                this.props.showCoinsModal('first_coins');
                this.props.show_coins_blank('coins_blank');



                //  console.log(count, "count lockLessons");
                // console.log(this.state.locker_count, "this.state.locker_countthis.state.locker_count");

            }).catch(error => {
                console.log(error);
            });

        }
        else{
            let oper='get_coins';
            let get_coins = `level=${encodeURI(e)}&operation=${encodeURI(oper)}&course_id=${encodeURI(this.props.courseID)}`;
           //console.log(get_coins, "-Unlock_NextLessons");
            fetch(`https://omegacoding.com/android_test/userProgressManager.php`,{
                method:'POST',
                headers:{"Content-type":"application/x-www-form-urlencoded",'Accept':'application/json'},
                body: get_coins
            }).then(response => {
                if(response.ok){
                    return response.json();
                }
            }).then(response => {

                //console.log(response, "response lockLessons");
                this.props.putCoins(response.coins);
                this.props.showCoinsModal('next_coins');
                this.props.show_coins_blank('coins_blank');

                //  console.log(count, "count lockLessons");
                // console.log(this.state.locker_count, "this.state.locker_countthis.state.locker_count");

            }).catch(error => {
                console.log(error);
            });
        }
               };

    goBackToLesson = (e,c) =>{
        let oper=2;
        let Unlock_NextLessons = `unique_id=${encodeURI(this.props.userProfile.uid)}&operation=${encodeURI(oper)}&course_name=${encodeURI(this.state.currentCourse)}`;
           // console.log(Unlock_NextLessons, "-info2");
        fetch(`https://omegacoding.com/android_test/userProgressManager.php`,{
            method:'POST',
            headers:{"Content-type":"application/x-www-form-urlencoded",'Accept':'application/json'},
            body: Unlock_NextLessons
        }).then(response => {
            if(response.ok){
                return response.json();
            }
        }).then(response => {
            let count=response.length*1;
         //console.log(response, "response lockLessons_taaazzzzzzzzzzzz");
            // console.log(count, "count lockLessons_taaazzzzzzzzzzzz");
           // console.log(this.state.locker_count, "this.state.locker_countthis.state.locker_count");
            if (count > this.props.lock) {
                this.props.countForlock(this.props.lock*1+1);
                this.props.countForlock(count);
            }
        }).catch(error => {
            console.log(error);
        });
        this.setState({
            openVideo: e,
            playGame:e,
            show_Game_list:e,
            videoLink:''
       });
        this.props.show_wonderTitle(true);
        this.props.change_background(c*1);
    };
    close=()=>{

        let elem = document.getElementById("noter-text-area");
        if(elem !== null){ elem.remove();}
        this.setState({
            over_icon:false,
            openVideo: false,
            show_Game_list:false,
            videoLink:'',


        });
        this.props.gotogamelist(999)

    };

    anim =(e)=>{
        this.setState({anim:e})
   /*  let down=document.getElementById("down_list");
        down.style.top='400px';
        down.style.opacity='1';
        down.style.transition='1s ease-in-out';*/
          };
    firstTime =(e) =>{
      let id=e.target.name*1;
      this.props.setLevel(id);
      this.props.setClickedLevel(id);

      let level= this.props.lock-id;

        if( this.props.courseID === '1'){

            if ( id === 1 ){
                this.getCoins(id);

            }
            else if( this.props.lock !== 0 && level=== -1 ){

                this.getCoins(id);
                //console.log("the next")
            }
            else if( this.props.lock === 0 && level=== -2){
              this.props.showCoinsModal('html_next_coins');
                this.props.show_coins_blank('coins_blank');
               // console.log("HTML next")
            }
            else if (level < -1){
                this.props.showCoinsModal('other_coins');
                this.props.show_coins_blank('coins_blank');
               // console.log("atherrr")
            }

        }
        else{

            if ( id === 1 ){
               this.GetPreviousCourseInfo(this.props.current_courseID)

            }
            else{

                if( this.props.lock !== 0 && level=== -1 ){
                    this.getCoins(id);
                    //console.log("the next")
                }

                else if (this.props.lock === 0){
                    this.props.showCoinsModal('other_coins');
                    this.props.show_coins_blank('coins_blank', this.props.courseID*1);
                   // console.log("atherrr")
                }
                else if (this.props.lock !== 0 && level < -1){
                    this.props.showCoinsModal('other_coins');
                    this.props.show_coins_blank('coins_blank', this.props.courseID*1);
                   // console.log("atherrr")
                }



            }


        }



    };

    addComment=()=>{
        let clos_elem =document.getElementById("com_close");
        if(this.props.lang ==='eng'){
           this.setState({
               send_btn:'Send Comment'
           })
          }
         else{
           this.setState({
               send_btn:'Ուղղարկել'
           })
       }

       this.setState({
            display:true
        });
        let commentInput= React.createElement('textarea', {
            id:"noter-text-area",
            className: 'textarea_com animated fadeIn',


        });
        ReactDOM.render(commentInput , document.getElementById("new_comment"));
        clos_elem.style.display='block';
    };

    alertt=()=>{
        this.props.showCoinsModal('you_cant_leave_comment');
        this.props.show_coins_blank('coins_blank');
    };

    closeTextarea =()=>{
        let clos_elem =document.getElementById("com_close");
        setTimeout(()=>{
            let elem = document.getElementById("noter-text-area");
            elem.className='textarea_com animated';
            elem.classList.add('animated','fadeOutUp');
            clos_elem.style.display='none';
                setTimeout(()=> {
                    this.setState({
                        send_btn:'',
                        display:false

                    })
                    elem.remove();
                    },400)
                }, 100)
    }

    sendComment=()=>{

         let val=document.getElementById("new_comment").childNodes[0];
         let p=val.value;
       let val1 = p.replace(/'/g, '"');

      //console.log(val1,"val.value");

      if(val.value!==''){

          let com =`comment=${encodeURI(val1)}&cat=${encodeURI(this.state.currentCourseID)}&level=${encodeURI(this.state.courseLevel)}&lng=${encodeURI(this.props.lang)}&uniq_id=${encodeURI(this.props.userProfile.uid)}`;
         // console.log(com,"ggggggggg");

          fetch(`https://omegacoding.com/android_test/login.php`,{
              method:'POST',
              headers:{"Content-type":"application/x-www-form-urlencoded",'Accept':'application/json'},
              body: com
          }).then(response => {
              if(response.ok){
                  return response.json();
              }
          }).then(response => {
         //  console.log(response,"response");
              if(!response.error){
                  if(this.props.lang ==='eng'){
                      this.setState({
                          send_btn:'',

                      })
                  }
                 // console.log("ayooooooooooo");
                  setTimeout(()=>{
                      let elem = document.getElementById("noter-text-area");
                      elem.className='textarea_com animated';
                      elem.classList.add('animated','fadeOutUp');
                      setTimeout(()=>{
                          this.setState({
                              comment_status:response.error_msg
                          });
                      setTimeout(()=> {
                          let elem2= React.createElement('div',{
                              id:"comment_status",
                              className: 'comment_status animated fadeIn',
                          },this.state.comment_status);
                          ReactDOM.render(elem2 , document.getElementById("back_status"));
                              elem.remove();
                              setTimeout(()=> {
                                 let elem3 = document.getElementById("comment_status");
                                  elem3.className='comment_status animated';
                                  elem3.classList.add('animated','fadeOutUp');
                                  setTimeout(()=> {elem3.remove()},1000)
                              },1500)
                          }, 1200)
                      },800)
                  },200);
                  let dateObj = new Date();
                  let month = dateObj.getUTCMonth() + 1; //months from 1-12

                  if(month <= 9){
                      month=`0${month}`;
                  }
                  let day =  dateObj.getUTCDate();
                  if(day <= 9){
                      day=`0${day}`;
                  }

                  let year = dateObj.getUTCFullYear();

                 let newdate = year + "-" + month + "-" + day;


                  this.props.add_comment({text:val.value,date:newdate,name:this.props.userProfile.profile,level_id:this.props.current_courseID})
              }
          }).catch( error => {
              console.log(error,"error");
          });



      }
      else {

          val.className='textarea_com animated';
          val.classList.add('bounce')
          val.style.border="2px solid red";
      }
    }


    passwordVideo =(e)=> {
        //console.log("response_passwordVideo-----------> ")
        let info= `cat=${encodeURI(this.state.currentCourse)}&level=${encodeURI(e)}`;
        fetch(`https://omegacoding.com/android_test/index.php`,{
            method:'POST',
            headers:{"Content-type":"application/x-www-form-urlencoded",'Accept':'application/json'},
            body: info
        }).then(response => {
            if(response.ok){
                return response.json();
            }
        }).then(
            response =>{
              // console.log(response,"response_passwordVideo ")
                this.setState({
                    password:response.pass
                })
            }
        ).catch(error=>{
            console.log(error)
        })
    }

  getVideoLink =(e)=> {

        if (typeof e.target !== 'undefined') {
            index=e.target.id*1;
        }else{
            // console.log('e -> ', e)
            index = e;
            // return false;
        }
      
      
        this.setState({
            courseLevel: index, //e.target.id,
            display:false,
            send_btn:'',

        });
        this.props.setClickedLevel(index);

        // let info1 = `level=${encodeURI(e.target.id)}&course_id=${encodeURI(this.state.currentCourseID)}&lang=${this.props.lang}`;
        let info1 = `level=${encodeURI(index)}&course_id=${encodeURI(this.state.currentCourseID)}&lang=${this.props.lang}`;
        //console.log(info1,"info1");
        fetch(`https://omegacoding.com/android_test/index.php`,{
            method:'POST',
            headers:{"Content-type":"application/x-www-form-urlencoded",'Accept':'application/json'},
            body: info1
        }).then(response => {
            if(response.ok){
                return response.json();
            }
        }).then(response => {
              obj1=response;
        //  console.log(obj1, "obj1"); // here are gamei[type, game_id]
        //  console.log(this.props.userProfile.course_lift[`${this.props.current_courseID}`] , "obj1");

           /*if (+this.props.userProfile.course_lift[`${this.props.current_courseID}`] >= index){
            let self=this;
            self.passwordVideo(index);
           }*/
            if (response.video_link){
                this.setState({videoLink:response.video_link});
                this.props.setLessonVideo(response.video_link);
                let fragFrame = document.getElementsByClassName('frag-frame')[0];
                fragFrame.gesture = "media";
                fragFrame.allow = "encrypted-media";
                fragFrame.webkitallowfullscreen = "true";
                fragFrame.mozallowfullscreen = "true";
                fragFrame.oallowfullscreen = "true";
                fragFrame.msallowfullscreen = "true";

                this.props.gotogamelist(0);
                if (this.props.adding_comment !== ''){
                            this.props.remove_current_comment('')
                }
              }
           else if (response.video_link === null ){
                this.setState({noLink: false, openVideo: true})
            }
            let self=this;
            self.passwordVideo(index);
        }).catch(error => {
                console.log(error);
            });
        let oper=4;
        let info2 = `unique_id=${encodeURI(this.props.userProfile.uid)}&level=${encodeURI(index)}&lang=${this.props.lang}&operation=${oper}&course_name=${this.state.currentCourse==='BootStrap'?'bootstrap':this.state.currentCourse==='JavaScript'?'java_script':this.state.currentCourse}`;
    //  console.log(info2, "-info2");
        fetch(`https://omegacoding.com/android_test/userProgressManager.php`,{
         method:'POST',
         headers:{"Content-type":"application/x-www-form-urlencoded",'Accept':'application/json'},
         body: info2
         }).then(response => {
         if(response.ok){
         return response.json();
         }
         }).then(response => {
           obj2=response;
    //  console.log(obj2, "obj2"); // here is game IDs, marks, points
        this.setState({comment:obj2.res_comment,
        over_icon:true, show_Game_list:true})


         }).catch(error => {
         console.log(error);
         });

        this.getFighter();
    };

    

    getFighter=()=>{
        let {userProfile} = this.props;
        let user_id = userProfile.uid; // '5c8b876d2e4579.71915304'
        let token = '#ocf2019$';
        let body =`user_id=${user_id}&token=${token}`;
        fetch(`https://omegacoding.com/codefight2019/fightlogic.php`,{
            method:'POST',
            headers:{"Content-type":"application/x-www-form-urlencoded",'Accept':'application/json'},
            body: body
        }).then(response => response.json())
        .then(response => {
        //  console.log('currentCourse - fighter--> ',response);
          this.props.setFighter(response);
        })
        .catch(error => console.error('Error-Fighter:', error));
    }

    componentWillMount() {
        this.setState({
            currentCourseID:this.props.courseID,
            lessons: this.props.obj,
            currentCourse:this.props.data,
            count:this.props.lock,
        });       
    }

    componentDidMount = () => {
        if (typeof this.props.getUnityDesktop === 'object') {              
            setTimeout(() => {                
                this.getVideoLink(this.props.getUnityDesktop.lid)
            }, 800);            
        }
    }
    

    componentWillReceiveProps(props) {
        this.setState({
            currentCourseID: props.courseID,
            lessons: props.obj,
            currentCourse:props.data,
            count:props.lock,
        });        
    }

    componentDidUpdate(oldProps) {
        const newProps = this.props
        if(oldProps.taskLink !== newProps.taskLink) {
            this.setState({ videoLink: newProps.taskLink })
        }

        
    }


    render(){
        //console.log(this.state.comment,"this.state.commentthis.state.comment");
        //console.log('taskLink --->>>>>> ', this.props.taskLink);
        if (this.state.comment){
          comment=this.state.comment.map((item,index)=>{

              return (
                        <span key={index}>
                            <div className="comment_text">
                                <i className="material-icons com_icon" >comment</i>
                                <span className="comment_span">
                                {item.comment}
                                </span>
                            <div className="comment_data">
                                <div>{item.data} </div>
                            <div>{item.name}&nbsp;{item.last_name}</div>
                            </div>
                        </div>
                             <hr width="90%"  style={{margin:'0 auto', borderTop: '1px solid rgba(66, 165, 21, 0.85)' }}/><br/>
                        </span>
                );
            });
        }
        else{

            comment=null
        }

        if (this.props.adding_comment !== ''){
            add_comment=this.props.adding_comment.map((item,index)=>{

                return (
                    <span key={index}>
                            <div className="comment_text">
                             <i className="material-icons com_icon" >comment</i>
                                <span className="comment_span">
                                {item.text}
                                </span>
                                <div className="comment_data">
                                <div>{item.date} </div>
                                <div>{item.name} </div>
                                </div>
                        </div>
                             <hr width="90%"  style={{margin:'0 auto', borderTop: '1px solid rgba(66, 165, 21, 0.85)' }}/><br/>
                        </span>
                );
            });
        }
        else{

            add_comment=null
        }
        let f=0;
        for( let i in obj1) {
            let obj_n;
            if (i ==='game1'|| i ==='game2'|| i ==='game3' || i ==='game4'){
                this.formap[f]=obj1[i];
                obj_n = obj1[i].game_id;
                this.max_points_obj[obj_n]=obj1[i].max_points;
                f++;

            }
        }


        for( let i in obj2) {
            if (i ==='game1'){
                this.formap[0].mark=obj2[i].mark;
                this.formap[0].points=obj2[i].points;
            }

            if (i ==='game2'){
                this.formap[1].mark=obj2[i].mark;
                this.formap[1].points=obj2[i].points;
            }
            if (i ==='game3'){
                this.formap[2].mark=obj2[i].mark;
                this.formap[2].points=obj2[i].points;
            }
            if (i ==='game4'){
                this.formap[3].mark=obj2[i].mark;
                this.formap[3].points=obj2[i].points;
            }
        }

        //console.log(this.props.obj,"this.props.obj")
       // console.log(this.state.videoLink,"videoLinkvideoLinkvideoLinkvideoLink")
       // console.log(formap,"formapformapformap111")

        let newArray={...this.state.lessons};
        let newArray1 = Object.keys(newArray).map(function (key) { return newArray[key]; });
        newArray1.shift();
        let i=0;

  let courses = newArray1.map((item, index) => {
      title_video[i]=(i+1)+'. '+item.description;
      i++;
  let img = this.props.courseID==='1'?'html':this.state.currentCourseID==='2'?'css':this.state.currentCourseID==='3'?'boot':
           this.state.currentCourseID==='4'?'j_script':this.state.currentCourseID==='5'?'jq':this.state.currentCourseID==='6'?'php':
           this.state.currentCourseID==='7'?'mysql':'boot';
      let icon_less;
      if (i%2 === 0){
           icon_less= require(`../../images/${img}_points.png`);
      }
      else{
          icon_less= require(`../../images/${img}_odd_points.png`);
      }

            return (
                    <div key={index}>
                        <a className={`les_fon class${i}`} style={{zIndex:i<=this.props.lock?'-1':'2'}} name={item.id}
                                onClick={(i>this.props.lock&&this.props.open_CoinsModal === "")?this.firstTime:''}>
                            {i>this.props.lock?<div  className="lock_icon" style={{backgroundImage:`url(${lock})`}}> </div>:''}
                                </a>

                        <a className={`les leftik class${i}`} href="#" id={item.id}
                            style={{ backgroundSize: this.props.courseID*1===3?'94%':'', margin: this.props.courseID*1===3?'9px 0px':'',
                                position:'absolute', backgroundImage:`url(${i<=this.props.lock?icon_less:icon_less})`}} title={i+'. '+item.description}
                            onClick={(i<=this.props.lock && this.props.open_CoinsModal === "")?this.getVideoLink:''}>
                            {i}
                            {/*<span  onClick={i<=this.props.lock?this.getVideoLink:''} style={{position:'absolute', zIndex:'99'}}>
                                {i} </span>*/}
                            </a>


            </div>
            );
        });

        let {lang} = this.props;
        let codeVisibility = 'hidden'
        if (lang !== 'eng') {
            codeVisibility = 'visible'
        }

		/* -- youtube -old-url ----
		<ReactPlayer url={`https://www.youtube.com/watch?v=${this.state.videoLink}`} playing  style={{padding:'23px'}} controls   /> */
        return(
            <div className="levelsContainer" style={{left:!this.state.openVideo ?"22%":""}}>
                <div className="on_les container" style={{height:'0',left:!this.state.openVideo ?"14px":"-104px"}}>

                    {!this.state.openVideo?
                        <div>
                            <div className="black_fix" style={{display:this.state.over_icon?'block':'none' }}/>
                            {courses}
                            <div className="on_les_over row" style={{display:this.state.over_icon?'block':'none',
                                backgroundColor: '#c7c7c51c', borderRadius: '31px',
                               }}>

                                {/*style={{display:this.state.over_icon?'block':'none',
                                backgroundColor: '#c7c7c51c', borderRadius: '31px',
                                border: '4px solid #e07c00'}}*/}
                                <span className="bet-close" onClick={this.close}>×</span>

                                {/*<p className='vid-pass-wrap' style={{visibility:codeVisibility}}>                                */}
                                    {/*<span className="vid-pass-hint">                                    */}
                                        {/*<span>Վիդեոդասի գաղտնաբառն է`*/}
                                          {/*<span className="vid-pass"> {this.state.password} </span>*/}
                                        {/*</span>*/}
                                    {/*</span>*/}


                                {/*/!*{ +this.props.userProfile.course_lift[`${this.props.current_courseID}`]  < +this.state.courseLevel ?*/}
                                    {/*<span style={{cursor:'pointer'}} onClick={this.takeVideoPass}>*/}
                                            {/*{this.props.lang === 'eng' ? '' :*/}
                                                {/*'Վիդեոդասի գաղտնաբառը ստանալու համար պետք է խաղալ այս խաղը:'}</span> :*/}
                                    {/*<span>*/}
                                            {/*{this.props.lang === 'eng' ? '' :*/}
                                                {/*`Վիդեոդասի գաղտնաբառն է  ${this.state.password}`}</span>*/}
                                {/*}*/}
{/**!/*/}
                            {/*</p>*/}
                            <div className="title_video"> {title_video[index-1]}</div>
                            <Homeworkpanel/>
                                <div className="video col-lg-6 col-md-6 col-sm-6 col-xs-6">

                                   <ReactPlayer url={this.props.lang === 'eng'?`https://www.youtube.com/watch?v=${this.state.videoLink}`:`https://www.youtube.com/watch?v=${this.state.videoLink}`}  width='88%'
                                                 height='100%' controls   className='frag-frame'   />
                                    {/*`https://player.vimeo.com/video/${this.state.videoLink}` vimeo link haykakan videoneri hamar*/}



                                    {/*
                                    <iframe frameborder="0" allowfullscreen="1" allow="autoplay;
                                    encrypted-media" title="YouTube video player" width="100%" height="100%"
                                            src={`https://www.youtube.com/embed/${this.state.videoLink}`} id="widget2"></iframe>*/}
                                </div>
                                
                                <div  className="comment"  style={{visibility:this.state.comment !== null || this.state.display ?'visible':'hidden'}}>
                                    {comment}
                                    {add_comment}
                                    <div id="com_close" className="comment-close" onClick={this.closeTextarea}>×</div>
                                        <div id="new_comment">

                                        </div>
                                </div>
                                
                                <div id="back_status"></div>
                                <button className="button_green_com" onClick={this.props.userProfile.status === 0 ?this.alertt:this.state.send_btn !==''?this.sendComment:this.addComment}>
                                    {this.props.lang === 'eng'?this.state.send_btn !==''? this.state.send_btn:'Ask a Question':this.state.send_btn !==''? this.state.send_btn:'Հարց տալ'}
                                </button>

                                
                            </div>


                        </div>:'' }
                        <div className="video-games col-lg-6 col-md-6 col-sm-6 col-xs-6" style={{height:'0', zIndex: '1000'}}>

                         {this.state.show_Game_list?
                                      <GamesList level_ID={this.state.courseLevel} course_Data={this.state.currentCourseID}
                                            courseName={this.state.currentCourse} img={this.formap}
                                            toShow={this.changeState} replVideo={this.replayVideo}
                                            backToLevel={this.goBackToLesson}
                                            videoLink={this.state.videoLink} reload_data={this.reload_data} play_curr_game={this.play_curr_game}
                                            max_points={this.max_points_obj} when_playing_game={this.props.when_playing_game} show_wonderTitle={this.props.show_wonderTitle}
                                            courseData ={this.props.courseData}  show_coins_blank={this.props.show_coins_blank} />
                                          :''


                            }

                        </div>


            </div>
            </div>
        )
    }


}


const store = state => ({
    gameList : state.gamelist,
    replay:state.replayGame,
    userProfile: state.userProfileData,
    lock: state.videolockercount,
    current_courseID:state.current_courseID,
    open_CoinsModal:state.open_CoinsModal,
    lang:state.lang,
    adding_comment:state.adding_comment,
    taskLink: state.taskLink,
    getUnityDesktop: state.getUnityDesktop
});

const dispatch = dispatch => ({
    gotogamelist: tabIndex => dispatch({type:'GOTO_GAMELIST', payload: tabIndex }),
    countForlock:  count => dispatch({type:'OPEN_CLOSE_LESSONS', payload: count }),
    showCoinsModal:  action => dispatch({type:'TOGGLE_COINS_FIRST_MODAL', payload: action }),
    showTrialText:  action => dispatch({type:'SHOW_TRIAL_TEXT', payload: action }),
    putCoins:  action => dispatch({type:'PUT_COINS', payload: action }),
    setLevel:  action => dispatch({type:'SET_COURSE_LEVEL', payload: action }),
    toggleNavMenu: newState => dispatch({type: 'TOGGLE_NAV_MENU', payload: newState}),
    navigateTo: location => dispatch(push(location)),
    changePage : newState => {
        dispatch({type:'CHANGE_PAGE',payload:newState});
    },
    add_comment: newState => dispatch({type: 'ADD_COMMENT', payload: newState}),
    remove_current_comment: newState => dispatch({type: 'REMOVE_CURRENT_COMMENT', payload: newState}),

    setClickedLevel:  action => dispatch({type:'SET_CLICKED_LEVEL', payload: action }),
    setLessonVideo: action => dispatch({type: 'SET_LESSON_VIDEO', payload: action}),
    setFighter: action => dispatch({type: 'UPDATE_FIGHTER', payload:action})

});

export default connect(
    store,
    dispatch
)(CurrentCourse)
