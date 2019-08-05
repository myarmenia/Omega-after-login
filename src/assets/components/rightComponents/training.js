import React, { PureComponent } from 'react';
import '../../styles/training.css';
import  CurrentCourse from './currentCourse';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';


let obj1={};
let obj2;
let url2 = require(`../../images/compas.png`);
let url3 = require(`../../images/lypa.png`);
let url4 = require(`../../images/mini_star.png`);
let url5 = require(`../../images/mini_start_empty.png`);

class Training extends PureComponent{
    constructor(){
        super();
        this.state = {
            courseData:[],
            currentLesson:false,
            currentCourseData:[],
            courseID:'',
            name:'',
            usr:'',
            course_points:'',
            show_wonder_title:true,

        };
        this.paths = ['/office','/orders/course','/statistics','/settings'];

    }


    showWonderTitle=(e)=>{
        this.setState({
            show_wonder_title:e
        })
    }
    openUpgrateWindow=()=>{
        let conf =  window.confirm('Your free trial has expired, please reload the page and purchase one of the packages.')
        if (conf){
            window.location.reload();
        }
        else {
            window.location.reload();
        }
    }
    course =(e)=> {

        // console.log(typeof this.props.getUnityDesktop)
        
        let id = 0; // can not be zero
        if (typeof e === 'object') {
            id = e.target.id;
            // console.log('it is event')
        }
        else{
            id = e;
            // console.log('it is redux')
        }

        // console.log( id)
        this.props.change_background(id*1);

        // this.props.change_background(e.target.id*1);
        //// this.props.addUserDiamonds(this.props.userProfile.diamonds);
        // const id = e.target.id;

        this.setState({
            courseID: id,
            name: this.state.courseData[id-1].courseName
        });
        let getLessons = `course_id=${encodeURI(id)}&lang=${this.props.lang}`;
            //console.log(getLessons,"info1")
        fetch(`https://omegacoding.com/android_test/index.php`,{
            method:'POST',
            headers:{"Content-type":"application/x-www-form-urlencoded",'Accept':'application/json','Origin': 'omegacoding.com'},
            body: getLessons
        }).then(response => {
            if(response.ok){
                return response.json();
            }
        }).then(response => {
            obj1=response;
            this.setState({
                currentLesson: true,
                       });
            this.props.changeSubMenu('current_level')
        	// console.log(obj1, "obj1 getLessons");

        }).catch(error => {
            console.log(error);
        });
        let crs_name= (this.state.courseData[id-1].courseName === 'JavaScript')?'java_script':this.state.courseData[id-1].courseName;
         let curse_name =crs_name.toLowerCase();
        this.props.setCourseName(curse_name);
        let oper=2;
        let lockLessons = `unique_id=${encodeURI(this.props.userProfile.uid)}&operation=${encodeURI(oper)}&course_name=${encodeURI(curse_name)}`;
   // console.log(lockLessons, "-info2");
        fetch(`https://omegacoding.com/android_test/userProgressManager.php`,{
            method:'POST',
            headers:{"Content-type":"application/x-www-form-urlencoded",'Accept':'application/json'},

            body: lockLessons
        }).then(response => {
            if(response.ok){
                return response.json();
            }
        }).then(response => {
     //console.log(response, "response lockLessons");
            obj2=response.length *1;
              this.props.countForlock(obj2);
        }).catch(error => {
            console.log(error);
        });


        /* ============== getting codes for each course by it's ID ==== Let's GO !!! */
        //console.log(' --- Arm course id ---- ',  id)
        let my_token = 'efe5r455__DGHVH';
        let course_id = id;
        let { lang } = this.props;
        let url = `https://omegacoding.com/codes_from_courses/${lang}/training.php?my_token=${my_token}&course_id=${id}`;
        fetch(url)
        .then(response => response.json())
        .then(response => {

         //  console.log(response, 'codes-modes');

            this.props.setCourseCodes(response);
        })

        /* ======= end of getting course-codes for each course ======= */

    };




    componentWillMount(){
        this.setState({
            course_points:this.props.course_points

        });

        fetch(`https://omegacoding.com/android_test/${this.props.lang==='eng'?'config.json':this.props.lang==='arm'?'config_arm.json':'config.json'}`,{
            method:'POST',
            headers:{"Content-type":"application/x-www-form-urlencoded",'Accept':'application/json'},

        }).then( response => response.ok ? response.json(): "Something went wrong")
        .then( response => {
            // console.log(response,"dddddddddddddd");
            this.props.getCourseData(response);
            this.setState({
                courseData:response,
            })
        });

    }


    componentWillReceiveProps(nextProps) {
        if (this.props.getUnityDesktop !== nextProps.getUnityDesktop) {           
            setTimeout(() => { // timeout needed for pulling courseData      
                // console.log('eeeeee',this.state.courseData)
                const Cses_n_Lvls = this.state.courseData;
                for (const key in Cses_n_Lvls) {
                    if (Cses_n_Lvls.hasOwnProperty(key)) {
                        const element = Cses_n_Lvls[key];
                        if (element.id == nextProps.getUnityDesktop.cid) { // course-id true                                
                            if (nextProps.getUnityDesktop.lid <= element.courses) { // level-id true
                                
                                this.course(nextProps.getUnityDesktop.cid);
                                break;
                            }
                        }
                        
                    }
                }
            }, 2000); 
        }

        /* this.setState({
        course_points:props.course_points
        })*/
    }

    componentDidMount() {
      setTimeout(()=>{
        this.setState({
          currentLesson: true,
          course_points:this.props.course_points
        });
      },1500)
    }

    render(){
            let per=0;
            let p=0 ;
            // console.log(this.props.course_points,"newwwwwwwww course_points");
            let courses = this.state.courseData.map( (item, index) => {
              // if (index < 8) {}
              // 8 and 9 = wordpress and Angular //




                let url1 = require(`../../images/course_logo/${item.imgUrl}_map.png`);
                    let url = require(`../../images/course_logo/${item.imgUrl}`);
                     per = (this.state.course_points[p]*100)/item.max_course_point;
                     p++;

                    return (
                        <div className="courses" key={index}>
                                {(per >0) && (per <=30)?
                                        <div className="courseStars">
                                            <img width="30" src={url4} alt="star" /><img width="30" src={url5} alt="star" /><img width="30" src={url5} alt="star" />
                                        </div>:
                                    (per >30) && (per <=65)?
                                        <div className="courseStars">
                                            <img width="30" src={url4} alt="star" /><img width="30" src={url4} alt="star" /><img width="30" src={url5} alt="star" />
                                        </div>:
                                        (per > 65)?
                                            <div className="courseStars">
                                                <img width="30" src={url4} alt="star" /><img width="30" src={url4} alt="star" /><img width="30" src={url4} alt="star" />
                                            </div>:
                                            <div className="courseStars">
                                                <img width="30" src={url5} alt="star" /><img width="30" src={url5} alt="star" /><img width="30" src={url5} alt="star" />
                                            </div>
                                }
                           <div className="map_and_logo"> <div className="courseLogo" style={{backgroundImage:`url(${url})`}} />
                            <div className="courseMap" onClick={!this.props.userProfile.trial_over?this.course:this.openUpgrateWindow} id ={item.id}  style={{backgroundImage:`url(${url1})`}} />

                             </div>
                            <div className="bar-anchor">
                                <span onClick={!this.props.userProfile.trial_over?this.course:this.openUpgrateWindow} id ={item.id}  className="textItem">{item.courseName}</span>
                                <div className="transition-bar"/>
                            </div>
                        </div>
                    );

            });
            return(

                <div className="trainingContainer">                    
                    {this.props.currentSubMenu === 'levels' &&
                        <div className="trainingCourse" >
                     <div className="compas" style={{backgroundImage:`url(${url2})`}} />
                    {courses}
                    <div className="zoom_tool" style={{backgroundImage:`url(${url3})`}} />
                        </div>}
                    {!this.state.currentLesson && this.props.currentSubMenu === 'levels'  &&
                    <div className="trainingCourse" >
                        <div className="compas" style={{backgroundImage:`url(${url2})`}} />
                        {courses}
                        <div className="zoom_tool" style={{backgroundImage:`url(${url3})`}} />
                        
                    </div>}
                    {this.state.currentLesson && this.props.currentSubMenu === 'current_level'  &&
                        <div>
                            <div className="bgg" style={{display:this.state.show_wonder_title?'block':'none',fontWeight: '600',fontFamily: 'sans-serif', position: 'absolute',
                                left: '50%', top: '17%', textTransform: 'none', textAlign: 'center', textAlign: '-webkit-center',
                               textShadow: 'rgb(0, 0, 0) 3px 2px 1px'}}><h2 style={{fontSize: '19px'}}>{this.state.courseData[this.state.courseID-1].desc}</h2><hr
                                style={{marginTop: '1px', marginBottom: '1px', width: '67%'}}/><h5>{this.state.courseData[this.state.courseID-1].tiltle}</h5></div>
                    <CurrentCourse courseID ={this.state.courseID}  obj={obj1}   data={this.state.name} show_coins_blank={this.props.show_coins_blank}
                                   when_playing_game={this.props.when_playing_game} show_wonderTitle={this.showWonderTitle}
                                   change_background={this.props.change_background}
                                   courseData={this.state.courseData}
                      />

                        </div>
                    }                    
                </div>
            )
        }


}



const store = state => ({
    userProfile: state.userProfileData,
    currentSubMenu: state.GotoInsideTrainingmenu,
    pageNumber:state.pageNumber,
    lock:state.videolockercount,
    course_points:state.Course_Stars,
    lang:state.lang,
    getUnityDesktop: state.getUnityDesktop
});

const dispatch = dispatch => ({
    countForlock:  count => dispatch({type:'OPEN_CLOSE_LESSONS', payload: count }),
    changePage : newState => {
        dispatch({type:'CHANGE_PAGE',payload:newState});
    },
    navigateTo: location => dispatch(push(location)),
    changeSubMenu : newState => {
        dispatch({type:'CURRENT_SUB_MENUE',payload:newState});

    },
    addUserDiamonds : newState => {
        dispatch({type:'CHANGE_DIAMONDS',payload:newState});
    },
    setCourseName:  newState =>{
        dispatch({type:'SET_COURSE_NAME', payload: newState });
    },
    setCourseCodes: newState => {
        dispatch({type:'SET_CODES', payload: newState});
    }
});

export default connect(
    store,
    dispatch
)(Training)
