import React from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import SwipeableViews from 'react-swipeable-views';
import {TabsContainer} from 'react-tabs-container';
import { connect } from 'react-redux';
import '../../styles/games.css';
import Accordion   from './accordion';
import GoogleAdsense from './alphabetGame/GoogleAdsense';

const styles = {
    headline: {
        fontSize: 24,
        paddingTop: 16,
        marginBottom: 12,
        fontWeight: 400,
    },
    slide: {
        padding: 10,
    },
};

let index = 0;
let maxPoints = 0;
let obj1 = [];


class TabsExampleSwipeable extends React.Component {
        constructor() {
            super();
            this.state = {
                slideIndex: 0,
                numberOfCourses: 0,
                gameStars: [],
                gameStars1: '',
                coursesOrLevels: false,
                description: [],
                game_datata: [],
                leng: '',
                windowWidth: window.innerWidth,
                courseName: "HTML",
                courseID: 1,
                data1: [],
            };
            this.images = {
                filledStar: require('../../images/star.png'),
                emptyStar: require('../../images/starEmpty.png')
            };
            this.logos = {
                html: require('../../images/course_logo/html.png'),
                css: require('../../images/course_logo/css.png'),
                boot: require('../../images/course_logo/boot.png'),
                js: require('../../images/course_logo/js.png'),
                react: require('../../images/course_logo/react.png'),
                jQuery: require('../../images/course_logo/jQuery.png'),
                php: require('../../images/course_logo/php.png'),
                sql: require('../../images/course_logo/sql.png'),
            }
            window.onresize = () => this.setState({
                windowWidth: window.innerWidth
            })
        }
        openLevels = (e) => {
            this.props.changeSubMenu('current_level')
            let slice_arr = this.state.gameStars;
            let dt = slice_arr.slice(0, this.state.leng);
            // console.log(' ------------------------------ slice_arr -------------------------');
            // console.log(slice_arr);
            /* this.setState({coursesOrLevels:true,
             game_datata: dt
             })*/
            this.setState({
                game_datata: dt
            })
        };


        Games =(item, id) => {
          // console.log('-----------------item-----------------');
          // console.log(item);
        let lesName = this.state.courseName
        let maxPoints = lesName === "HTML" ? "32000" : lesName === "CSS" ? "40000" : lesName === "BootStrap" ? "23500" : "30000"
        let averageMark = item/10000;
        //console.log(this.state.description,"this.state.description");
        let descr=this.state.description[id];
        return (
            <div  style={{width:'100%', margin:'5% 0'}}>
                <span className="points">
                    <div className="gameStarContainer">
                        <div className="starsImg">
                        {averageMark < 1 &&
                            <span>
                                <img width="30" src={`${this.images.emptyStar}`}  alt="star"/>
                                <img width="30" src={`${this.images.emptyStar}`} alt="star"/>
                                <img width="30" src={`${this.images.emptyStar}`} alt="star" />
                            </span>
                        }
                        {averageMark >= 1&& averageMark < 2  &&
                            <span>
                                <img width="30" src={`${this.images.filledStar}`} alt="star"/>
                                <img width="30" src={`${this.images.emptyStar}`} alt="star"/>
                                <img width="30" src={`${this.images.emptyStar}`} alt="star"/>
                            </span>
                        }
                        {averageMark >= 2&& averageMark < 3  &&
                            <span>
                                <img width="30" src={`${this.images.filledStar}`} alt="star"/>
                                <img width="30" src={`${this.images.filledStar}`} alt="star"/>
                                <img width="30" src={`${this.images.emptyStar}`} alt="star"/>
                            </span>
                        }
                        {averageMark >= 3&& averageMark < 4  &&
                            <span>
                                <img width="30" src={`${this.images.filledStar}`} alt="star"/>
                                <img width="30" src={`${this.images.filledStar}`} alt="star"/>
                                <img width="30" src={`${this.images.filledStar}`} alt="star"/>
                            </span>
                        }
                        </div>
                    </div>
                    <span className="gamePoints ">{item}/{maxPoints}</span>
                        <p  className="bgg" style={{position: 'absolute',
                                fontSize:'1.8vw',
                                maxFontSize: '2.5vw',
                                marginLeft: '40%',
                                width: '40%',
                                top: '30%',
                            color: 'azure',
                            backgroundColor: 'rgba(94, 105, 111, 0.69);',
                            boxShadow: '0 2px 3px #000000'
                        }}
                        >
                            {descr}
                        </p>
                    </span>
                <button className="button_green"
                        onClick={this.openLevels}
                >
                    See Statistics
                </button>
                
            </div>
        )
    };

    handleChange = (value) => {
        index = value
        if (this.state.coursesOrLevels) {
            this.setState({
                coursesOrLevels: false
            })
        }
        fetch(`https://omegacoding.com/android_test/config.json`,{
            method:'POST',
            headers:{
                "Content-type": "application/x-www-form-urlencoded",
                'Accept': 'application/json'
            }
        }).then( response => response.ok ? response.json(): "Something went wrong")
            .then( response => {


                this.setState({
                    lessonsCount: response[value].courses
                })
            });
            // JavaScript
        let name = value === 0 ? "HTML" : value === 1 ? "CSS" : value === 2 ? "BootStrap" : value === 3 ? "java_script" : value === 4 ? "react" : value === 5 ? "jquery" : value === 6 ? "php" : "mysql";
        let oper = 6
        let info = `unique_id=${encodeURI(this.props.userProfile.uid)}&course_name=${encodeURI(name)}&operation=${encodeURI(oper)}`;
        //  console.log(info, "info")
        fetch(`https://omegacoding.com/android_test/userProgressManager.php`, {
            method: 'POST',
            headers: {
                "Content-type": "application/x-www-form-urlencoded",
                'Accept': 'application/json'
            },
            body: info
        }).then(response => {
            if (response.ok) {
                return response.json();
            }
        }).then(response => {
             // console.log(response,"ssssssssssssssss");
            this.setState({
                gameStars1: response
            });
            let array = Object.keys(response).map(function (key) {
                return response[key];
            });
            this.setState({
                gameStars: array
            });
        }).catch(error => {
            console.log(error);
        });
        this.props.changegameActiveTab(value)
        let oper1 = 2;
        let lockLessons1 = `unique_id=${encodeURI(this.props.userProfile.uid)}&operation=${encodeURI(oper1)}&course_name=${encodeURI(name)}`;
        // console.log(lockLessons1, "-info2");
        fetch(`https://omegacoding.com/android_test/userProgressManager.php`, {
            method: 'POST',
            headers: {
                "Content-type": "application/x-www-form-urlencoded",
                'Accept': 'application/json'
            },
            body: lockLessons1
        }).then(response => {
            if (response.ok) {
                return response.json();
            }
        }).then(response => {
         // console.log(response)
            let obj2 = response.length;
            this.setState({
                leng: obj2
            });
            this.props.countForlock(obj2);
        }).catch(error => {
            console.log(error);
        });
    };

    componentWillMount() {
        this.props.changegameActiveTab(0)
        fetch('https://omegacoding.com/android_test/descrip.json',{
            method:'POST',
            headers:{"Content-type":"application/x-www-form-urlencoded",'Accept':'application/json'},

        }).then(response => {
                if (response.ok) {
                    return response.json();
                }
            })
            .then(response => {
                this.setState({
                    description: response
                })
            });

        fetch(`https://omegacoding.com/android_test/config.json`,{
            method:'POST',
            headers:{
                "Content-type": "application/x-www-form-urlencoded",
                'Accept': 'application/json'
            }
        }).then( response => response.ok ? response.json(): "Something went wrong")
            .then( response => {
               this.setState({
                   lessonsCount: response[0].courses
               })

            });

        let uid = this.props.userProfile.uid;
        let oper = 6;
        let info = `unique_id=${encodeURI(this.props.userProfile.uid)}&course_name=${encodeURI("HTML")}&operation=${encodeURI(oper)}`;
        // console.log(info, "info")
        fetch(`https://omegacoding.com/android_test/userProgressManager.php`,{
            method: 'POST',
            headers: {
                "Content-type": "application/x-www-form-urlencoded",
                'Accept': 'application/json'
            },
            body: info
        }).then(response => {
            if (response.ok) {
                return response.json();
            }
        }).then(response => {
            // console.log(response,"ssssssssssssssss");
            let array1 = Object.keys(response).map(function (key) {
                return response[key];
            });
            this.setState({
                gameStars: array1
            });
        }).catch(error => {
            console.log(error);
        });
        let oper1 = 2;
        let lockLessons1 = `unique_id=${encodeURI(this.props.userProfile.uid)}&operation=${encodeURI(oper1)}&course_name=${encodeURI("HTML")}`;
        // console.log(lockLessons1, "-info2");
        fetch(`https://omegacoding.com/android_test/userProgressManager.php`, {
            method: 'POST',
            headers: {
                "Content-type": "application/x-www-form-urlencoded",
                'Accept': 'application/json'
            },
            body: lockLessons1
        }).then(response => {
            if (response.ok) {
                return response.json();
            }
        }).then(response => {
        // console.log(response)
            let obj2 = response.length;
            this.setState({
                leng: obj2
            })
        }).catch(error => {
            console.log(error);
        });
    }

    componentWillReceiveProps (nextProps) {
        let value = nextProps.gametabIndex
        let name = value === 0 ? "HTML" : value === 1 ? "CSS" : value === 2 ? "BootStrap" : value === 3 ? "java_script" : value === 4 ? "react" : value === 5 ? "jquery" : value === 6 ? "php" : "mysql";
        this.setState({
            courseName: name,
            courseID: value + 1
        })
        fetch('https://omegacoding.com/android_test/descrip.json')
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
            })
            .then(response => {
                this.setState({
                    description: response
                })
            });

        let uid = this.props.userProfile.uid;
        let oper = 6
        let info = `unique_id=${encodeURI(this.props.userProfile.uid)}&course_name=${encodeURI(name)}&operation=${encodeURI(oper)}`;
        // console.log(info, "info")
        fetch(`https://omegacoding.com/android_test/userProgressManager.php`, {
            method: 'POST',
            headers: {
                "Content-type": "application/x-www-form-urlencoded",
                'Accept': 'application/json'
            },
            body: info
        }).then(response => {
            if (response.ok) {
                return response.json();
            }
        }).then(response => {
            // console.log(response,"ssssssssssssssss");
            let array1 = Object.keys(response).map(function (key) {
                return response[key];
            });
            this.setState({
                gameStars: array1
            });
        }).catch(error => {
            console.log(error);
        });
        let oper1 = 2;
        let lockLessons1 = `unique_id=${encodeURI(this.props.userProfile.uid)}&operation=${encodeURI(oper1)}&course_name=${encodeURI(name)}`;
        // console.log(lockLessons1, "-info2");
        fetch(`https://omegacoding.com/android_test/userProgressManager.php`, {
            method: 'POST',
            headers: {
                "Content-type": "application/x-www-form-urlencoded",
                'Accept': 'application/json'
            },
            body: lockLessons1
        }).then(response => {
            if (response.ok) {
                return response.json();
            }
        }).then(response => {
        // console.log(response)
            let obj2 = response.length;
            this.setState({
                leng: obj2
            })
        }).catch(error => {
            console.log(error);
        });
    }

    clickDetector=(clicked)=>{
        console.log(clicked)
    }

    render() {
     // console.log('---------------this.state.gameStars--------------');
      //console.log(this.state.gameStars);
        const status_text= (<h3 style={{margin: '0', padding: '52px 0 0 0'}}>Diligence is the guarantee of success</h3>);
        let countPoints = [];
        let allpoints = 0;
        let allmarks = 0;
        let x = 0,
            y = 0,
            i = 1,
            j = 1;
        countPoints[0] = this.state.gameStars.map((item) => {
            let allpoints = item.game1.points * 1 + item.game2.points * 1 + item.game3.points * 1 + item.game4.points * 1;
            if (i-1 === this.state.gameStars.length) {
                return (x)
            } else {
                i++;
                return x = x + allpoints;
            }
        });
        countPoints[1] = this.state.gameStars.map((item) => {
            let allmarks = item.game1.mark * 1 + item.game2.mark * 1 + item.game3.mark * 1 + item.game4.mark * 1;;
            if (j === this.state.gameStars.length) {
                return (y)
            } else {
                j++;
                return y = y + allmarks;
            }
        });
        let tabText = this.state.windowWidth <= 800 ? "1.5vw" : "1.25vw";
        let m = 0
        while (m <= 8) {
            m++
        }

        let showIns = 'hidden';
        if (this.props.userProfile.status < 1) {
            showIns = 'visible';
        }

        return (
            <div className="tabsContent">
                {this.props.currentSubMenu === 'levels'  &&
                    <span>
                        <Tabs
                            onChange={this.handleChange}
                            value={this.props.gametabIndex}>
                            <Tab label="HTML"
                                style={{height: '50px', fontSize: tabText, maxFontSize: '1.75vw', background: '#025a98'}}
                                value={0}/>
                            <Tab label="CSS"
                                style={{height: '50px', fontSize: tabText, maxFontSize: '1.75vw',background: '#025a98'}}
                                value={1}/>
                            <Tab label="Bootsrtap"
                                style={{height: '50px', fontSize: tabText, maxFontSize: '1.75vw',background: '#025a98'}}
                                value={2}/>
                              <Tab label="JavaScript"
                                style={{height: '50px', fontSize: tabText, maxFontSize: '1.75vw',background: '#025a98'}}
                                value={3}/>
                            <Tab label="ReactJS"
                                style={{height: '50px', fontSize: tabText, maxFontSize: '1.75vw',background: '#025a98'}}
                                value={4}/>
                            <Tab label="jQuery"
                                style={{height: '50px', fontSize: tabText, maxFontSize: '1.75vw',background: '#025a98'}}
                                value={5}/>
                            <Tab label="PHP"
                                style={{height: '50px', fontSize: tabText, maxFontSize: '1.75vw',background: '#025a98'}}
                                value={6}/>
                            <Tab label="MySQL"
                                style={{height: '50px', fontSize: tabText, maxFontSize: '1.75vw',background: '#025a98'}}
                                value={7}/>
                        </Tabs>
                    {!this.state.coursesOrLevels && this.props.currentSubMenu === 'levels' &&
                    <SwipeableViews
                        index={this.props.gametabIndex}
                        onChangeIndex={this.handleChange}
                    >
                        <div>
                            {this.props.gametabIndex === 0 &&
                            <div style={styles.slide}>
                                <div className="games">
                                    <div className="item-hover circle effect3 left_to_right">
                                        <a href="#">
                                            <div className="img">
                                                <img src={this.logos.html} alt="img"/>
                                            </div>
                                            <div className="info ">
                                                <div className="info-back static_text" >
                                                    {status_text}
                                                    <p>{`${this.state.lessonsCount} lessons.`} </p>
                                                </div>
                                            </div>
                                        </a>
                                    </div>
                                    {this.Games(x, this.props.gametabIndex)}
                                </div>
                            </div>
                            }
                        </div>
                        <div>
                            {this.props.gametabIndex === 1 &&
                            <div style={styles.slide}>
                                <div className="games">
                                    <div className="item-hover circle effect3 left_to_right">
                                        <a href="#">
                                            <div className="img">
                                                <img src={this.logos.css} alt="img"/>
                                            </div>
                                            <div className="info ">
                                                <div className="info-back static_text">
                                                    {status_text}
                                                    <p>{`${this.state.lessonsCount} lessons.`} </p>
                                                </div>
                                            </div>
                                        </a></div>
                                    {this.Games(x, this.props.gametabIndex)}
                                </div>
                            </div>
                            }
                        </div>
                        <div>
                            {this.props.gametabIndex === 2 &&
                            <div style={styles.slide}>
                                <div className="games">
                                    <div className="item-hover circle effect3 left_to_right">
                                        <a href="#">
                                            <div className="img">
                                                <img src={this.logos.boot} alt="img"/>
                                            </div>
                                            <div className="info ">
                                                <div className="info-back static_text">
                                                    {status_text}
                                                    <p>{`${this.state.lessonsCount} lessons.`} </p>
                                                </div>
                                            </div>
                                        </a></div>
                                    {this.Games(x, this.props.gametabIndex)}
                                </div>
                            </div>
                            }
                        </div>
                        <div>
                            {this.props.gametabIndex === 3 &&
                            <div style={styles.slide}>
                                <div className="games">
                                    <div className="item-hover circle effect3 left_to_right">
                                        <a href="#">
                                            <div className="img">
                                                <img src={this.logos.js} alt="img"/>
                                            </div>
                                            <div className="info ">
                                                <div className="info-back static_text">
                                                    {status_text}
                                                    <p>{`${this.state.lessonsCount} lessons.`} </p>
                                                </div>
                                            </div>
                                        </a></div>
                                    {this.Games(x, this.props.gametabIndex)}
                                </div>
                            </div>
                            }
                        </div>
                        <div>
                            {this.props.gametabIndex === 4 &&
                            <div style={styles.slide}>
                                <div className="games">
                                    <div className="item-hover circle effect3 left_to_right">
                                        <a href="#">
                                            <div className="img">
                                                <img src={this.logos.react} alt="img"/>
                                            </div>
                                            <div className="info ">
                                                <div className="info-back static_text">
                                                    {status_text}
                                                    <p>{`${this.state.lessonsCount} lessons.`} </p>
                                                </div>
                                            </div>
                                        </a></div>
                                    {this.Games(x, this.props.gametabIndex)}
                                </div>
                            </div>
                            }
                        </div>
                        <div>
                            {this.props.gametabIndex === 5 &&
                            <div style={styles.slide}>
                                <div className="games">
                                    <div className="item-hover circle effect3 left_to_right">
                                        <a href="#">
                                            <div className="img">
                                                <img src={this.logos.jQuery} alt="img"/>
                                            </div>
                                            <div className="info">
                                                <div className="info-back static_text">
                                                    {status_text}
                                                    <p>{`${this.state.lessonsCount} lessons.`} </p>
                                                </div>
                                            </div>
                                        </a></div>
                                    {this.Games(x, this.props.gametabIndex)}
                                </div>
                            </div>
                            }
                        </div>
                        <div>
                            {this.props.gametabIndex === 6 &&
                            <div style={styles.slide}>
                                <div className="games">
                                    <div className="item-hover circle effect3 left_to_right">
                                        <a href="#">
                                            <div className="img">
                                                <img src={this.logos.php} alt="img"/>
                                            </div>
                                            <div className="info">
                                                <div className="info-back static_text">
                                                    {status_text}
                                                    <p>{`${this.state.lessonsCount} lessons.`} </p>
                                                </div>
                                            </div>
                                        </a></div>
                                    {this.Games(x, this.props.gametabIndex)}
                                </div>
                            </div>
                            }
                        </div>
                        <div>
                            {this.props.gametabIndex === 7 &&
                            <div style={styles.slide}>
                                <div className="games">
                                    <div className="item-hover circle effect3 left_to_right">
                                        <a href="#">
                                            <div className="img">
                                                <img src={this.logos.sql} alt="img"/>
                                            </div>
                                            <div className="info ">
                                                <div className="info-back static_text">
                                                    {status_text}
                                                    <p>{`${this.state.lessonsCount} lessons.`} </p>
                                                </div>
                                            </div>
                                        </a></div>
                                    {this.Games(x, this.props.gametabIndex)}
                                </div>
                            </div>
                            }
                        </div>
                    </SwipeableViews>
                    }
                    </span>
                }
                { this.props.currentSubMenu === 'current_level' &&
                <div id="accordian">
                    <Accordion data={this.state.game_datata}
                            games={this.state.gameStars}
                            courseName={this.state.courseName}
                            courseID={this.state.courseID}
                            index={index+1}
                    />
                </div>
                }
                <div className='gugo-ads-wrap' style={{width:'80%', position:'relative', left:'45%', transform:'translate(-50%)', visibility:showIns}}>
                    <GoogleAdsense 
                        dataAdClient='ca-pub-7306442307639605' 
                        dataAdSlot='5592332219' 
                        dataAdFormat = "auto"
                        dataFullWidthResponsive="true"
                        getClicks = {this.clickDetector}
                    />
                </div>
            </div>
        )
    }
}
const store = state => ({
    gametabIndex: state.gametabs,
    userProfile: state.userProfileData,
    count: state.videolockercount,
    currentSubMenu: state.GotoInsideTrainingmenu,
});
const dispatch = dispatch => ({
    changegameActiveTab: tabIndex => dispatch({
        type: 'CHANGEGAME_TABS',
        payload: tabIndex
    }),
    changeSubMenu: newState => dispatch({
        type: 'CURRENT_SUB_MENUE',
        payload: newState
    }),
    countForlock: count => dispatch({
        type: 'OPEN_CLOSE_LESSONS',
        payload: count
    }),
});
export default connect(
    store, dispatch
)(TabsExampleSwipeable)
