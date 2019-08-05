import React, {Component} from 'react';
import {connect} from 'react-redux';
import OverallPointsUnity from './notepadGame/points_for_ unity';
import {canvas, noCanvas} from '../../canvas/cavas_bg';
import GoogleAdsense from './alphabetGame/GoogleAdsense';

import CertModal from './sertificate/CertModal';


let data = [];
const customBodyStyle = {
    maxWidth: '80%',
    margin: '0 auto'
};

// for certificate
let levelsOfCourse = 0;
let passedLevels = 0;


class PointsUnity extends Component {
    constructor(props) {
        super(props);
        this.state = {
            numberOfStars: 0,
            rank: 0,
            level: 0,
            points: 0,
            course_name: '',
            gameContinue: [],
            type: '',
            gameID: '',
            count_mark: '',
            self_mark: '',
            old_points: 0,
            showMessageAboutCert:false,


        };
        this.c=0;
        canvas();
    }

    goToLevelList = () => {
        let course_id = this.props.current_courseID ==='html'?'1':
            this.props.current_courseID==='css'?'2':this.props.current_courseID==='bootstrap'?'3':
            this.props.current_courseID==='java_script'?'4':this.props.current_courseID==='jquery'?'5':this.props.current_courseID==='php'?'6':this.props.current_courseID==='mysql'?'7':'boot';

                this.props.backTo(false, course_id);
    };


    goToGamelist = () => {
         //console.log(this.state.gameID, "gameIDgameIDgameID");
         //console.log(data, "datadata");
        let gg = this.state.gameContinue;
        // console.log(gg, "gggggameIDgameIDgameID")
        for (let j = 0; j <= gg.length - 1; j++) {
            if (gg[j].mark * 1 === 0) {
                if (gg[j].game_id * 1 !== this.state.gameID * 1) {
                    //console.log(this.state.numberOfStars,"norrr")
                    if (this.state.numberOfStars > 0) {
                        this.props.count_mark_func(true);
                        if (data.indexOf(gg[j].game_id * 1) === -1) {
                            this.props.data(gg[j].type, gg[j].game_id);
                            j = gg.length
                        }
                    }
                    else {
                        this.props.data(gg[j].type, gg[j].game_id);
                        j = gg.length
                    }

                }
            }
        }

    };

    getAnswerPercent = () => {
        let self =this;
 //console.log("assssssssssssssssssssss")
        if (this.state.numberOfStars!==0 && this.state.points !== 0) {
            data.push(this.state.gameID);
            let getRaiting = `unique_id=${encodeURI(this.props.userProfile.uid)}&level=${this.state.level}&course_name=${this.state.course_name === 'JavaScript'?'java_script':
                this.state.course_name}&mark=${this.state.numberOfStars}&points=${this.state.points}&operation=5&game_id=${this.props.gameID}`;
       // console.log(getRaiting,"getRaitinggetRaiting");
            fetch(`https://omegacoding.com/android_test/userProgressManager.php`, {
                method: 'POST',
                headers: {"content-type": "application/x-www-form-urlencoded", 'Accept': 'application/json'},
                body: getRaiting
            }).then(response => {
                if (response.ok) {
                    return response.json()
                }
            }).then(response => {
              //console.log(response,"responseresponseresponse2018");
                this.setState({rank: response.rank});
                 if (response.new_coins!==0){
                 this.props.addUserNewCoins(response.new_coins)
                     self.checkShowCertMessage();
                 }

            });

        }

    };


    componentWillMount() {
        this.setState({
            numberOfStars: this.props.stars,
            points: this.props.points,
            level: this.props.level,
            course_name: this.props.course,
            gameContinue: this.props.game,
            type: this.props.game_type,
            gameID: this.props.gameID,
            count_mark: this.props.count_mark,
            self_mark: this.props.self_mark,
            old_points: this.props.old_point

        })
    }
    componentWillReceiveProps(props) {
        this.setState({
            numberOfStars: props.stars,
            level: props.level,
            course_name: props.course,
            gameContinue: props.game,
            points: props.points,
            type: props.game_type,
            gameID: props.gameID,
            count_mark: props.count_mark,
            self_mark: props.self_mark,
            old_points: props.old_point
        })
      // this.getAnswerPercent()
    }
    componentDidMount() {
        this.getAnswerPercent();
        this.setState({
            old_points: this.props.old_point
        })
    }

    // last game of last level //
    checkShowCertMessage=()=>{
      // courseData comes from
      // training.js->currentCourse.js->gameList.js->UnityPoints.js (here)
     // console.log('<<---- | checkShowCertMessage | ---->>');
      let userId = this.props.userProfile.uid;
      let course_name = this.props.course;
      let current_level = this.props.level;
      let allCourses = this.props.courseData;

      /* տեղափոխի use_coins.js, ստեղ այդ խնդիրը չի լինելու, ստեղ հակառակը պիտի արվի */
      // let c_name = '';
      // let course_name_arr = course_name.split("");
      // if (course_name.indexOf("_") !== -1) {
      //     console.log('exists _ ');
      //     c_name = course_name.replace("_","");
      // }else{
      //   console.log('not exists _ ');
      //   c_name = course_name;
      // }
      //
      // console.log(c_name); // used for rexep for filtering numberOfLevels
      // console.log(course_name); // for sending request to get passed-levels

      	if (allCourses) {
	      var regex = new RegExp(course_name, 'i');
	      for (let k = 0; k < allCourses.length; k++) {
	        if (allCourses[k].courseName.match(regex)) {
	          levelsOfCourse = Number(allCourses[k].courses);
	          break;
	        }
	      }

	     // console.log(levelsOfCourse);
	     // console.log(course_name);

	      let dashed_course_name = 'zaven';
	      switch (course_name.toLowerCase()) {
	        case 'javascript':
	          dashed_course_name = 'java_script';
	          break;
	        case 'angularjs':
	          dashed_course_name = 'angular_js';
	          break;

	        default:
	          dashed_course_name = course_name;
	          break;
	      }

	      //console.log(dashed_course_name);
	      let query_string = '?unique_id='+userId+'&'+'course_name='+dashed_course_name+'';
	      //let url = `https://omegacoding.com/qualification/getComplatedLevelsOfCourse.php?unique_id=${userId}&course_name=${course_name}`;
	      let url = 'https://omegacoding.com/qualification/gmailSMTP_parts/getComplatedLevelsOfCourse.php'+query_string;
	      fetch(url)
	      .then((resp) => resp.json())
	      .then((data)=> {
	         // console.log(data);
	          passedLevels = Number(data.passedLevels);
	          if (passedLevels === levelsOfCourse) {
	            this.setState({
	              showMessageAboutCert:true,
	            });
	          }
	      })
	      .catch(function(error) {
	        console.log(error);
	      });
	    }
    }

// Request to get-certificate -----
    getMyCertificate=()=>{
      let procMsg = document.getElementsByClassName('proccess-msg');
      for(let i=0; i < procMsg.length; i++) {
        procMsg[i].textContent = `Loading ...`
      }

      // this.setState({ certTxt: 'Loading ...'});
      let userId = this.props.userProfile.uid;
      let course_name = this.props.course;

        let dashed_course_name = 'zaven';
        switch (course_name.toLowerCase()) {
            case 'javascript':
              dashed_course_name = 'java_script';
              break;
            case 'angularjs':
              dashed_course_name = 'angular_js';
              break;

            default:
              dashed_course_name = course_name;
              break;
        }
       // console.log(dashed_course_name);
        let query_string = '?unique_id='+userId+'&'+'course_name='+dashed_course_name+'';
        let url = 'https://omegacoding.com/qualification/gmailSMTP.php'+query_string;
        //console.log(url);
        fetch(url)
        .then((resp) => resp.json())
        .then((data)=> {
            //console.log(data);
            if (data.saved_into_important && data.sql_query) {
             // console.log(data);
              for(let i=0; i < procMsg.length; i++) {
                procMsg[i].textContent = `Your ${course_name} certificate was sent`
              }
              // this.setState({
              //   certTxt: `Your ${course_name} certificate was sent`,
              // });
            }
        })
        .catch(function(error) {
          console.log(error);
        });
    }


    render() {
        //console.log(this.props.old_point,"this.state.old_points");
      // console.log(this.props.self_mark,"self_markself_markself_mark");
        //console.log(this.state.type,"this.state.typethis.state.type");
        //  console.log(this.state.numberOfStars,"this.state.numberOfStars");
        //  console.log(data,"data_render");
        let replay = () => {
            //console.log("replayUNITY");
            let type = this.state.type;
            this.props.replayAgain(type);
        };

        // count_mark = քանի խաղ տվյալ լեվելում ունի աստղ  games_progress-ում 2823-progress_id
        // երբ մնումա 1 խաղ, count_mark-ը հավասար է = 1
        // 3-րդ խաղից հետո բազայում user_progress աղ-ում նոր գրվում է mark-ի միջինացված արժեք:
        // 4-րդ խաղի ժամանակ, երբ այն վեջինն է, self_mark-ը ստանում է 1 արժեքը:  << self_mark = 1 >>
        // 4-րդ խաղի վերջում, numberOfStars-ը, որը ընթացիկ խաղի աստղերի քանակն է, և եթե մեծ կամ հավասար է 1-ի,
        // այսինք հավաքվել է գոնե 40% coins, ապա ցույց է տրվում data-case="level-passed" կամ
        // this.state.self_mark > 0 ? this.state.numberOfStars >= 1 ? դեպքը:

        let showCertMessBlock = {display: 'none'};
        if(this.state.showMessageAboutCert) {
          showCertMessBlock = {display: 'block'};
        }


        return (
            <div>
                <OverallPointsUnity starNum={this.state.numberOfStars} points={this.state.points} old_points={this.props.old_points}
                                    ranks={this.state.rank}/>
                <div>
                  {/*  <button className="button_green" style={{padding: '10px 32px 10px 32px', top: '0'}} onClick={replay}> Retry
                    </button>*/}
                    {this.state.count_mark > 0 ?
                        <div className="sameLevel">
                          <button className="button_orange" onClick={this.goToGamelist}> Continue /next game/ </button>
                        </div> :
                        this.state.self_mark > 0 ? this.state.numberOfStars >= 1 ?

                        <div className="levelCompleted finishLastGame">
                            <button className="button_orange" onClick={this.goToLevelList} style={{margin: 0}} >
                              Continue /next lesson/
                            </button>
                             
                            <div className="get-cert-wrap" style={showCertMessBlock}>
                              <CertModal courseName={this.props.course} uid={this.props.userProfile.uid} />
                            </div>
                            
                            
                            
                        </div> :
                            <button className="button_orange"
                                    style={{margin: ' 0  0 0 30% ', opacity: '0.3', cursor: 'no-drop'}}>
                                Continue... </button> :
                            this.state.numberOfStars < 1 ? <button className="button_orange" style={{
                                margin: ' 0  0 0 30% ',
                                opacity: '0.3',
                                cursor: 'no-drop'
                            }}> Continue... </button> :

                            <div className="levelCompleted CourseComplet veradarz">
                                <button className="button_orange" onClick={this.goToLevelList} style={{margin: 0}}>
                                    Continue /next lesson/next-course
                                </button>
                                
                                <div className="get-cert-wrap">
                                  <CertModal courseName={this.props.course} uid={this.props.userProfile.uid} />
                                </div>
                                
                                
                                
                            </div>
                    }
                    <div  style={customBodyStyle}>
                      <GoogleAdsense
                        dataAdClient = "ca-pub-7306442307639605"
                        dataAdSlot = "5592332219"
                        dataAdFormat = "auto"
                        getClicks = {this.clickDetector} />
                    </div>
                </div>
            </div>
        )
    }
}

const store = state => ({
    userProfile: state.userProfileData,
    current_courseID:state.current_courseID,
    game:state.gameInfo,
    old_points:state.old_points
});
const dispatch = dispatch => ({
    addUserNewCoins : newState => {
        dispatch({type:'ADD_USER_COINS',payload:newState});
    },
});
export default connect(
    store,
    dispatch
)(PointsUnity)
