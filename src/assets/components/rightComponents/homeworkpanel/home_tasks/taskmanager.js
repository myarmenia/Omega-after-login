import React, { Component } from 'react';
import { connect } from 'react-redux';
import trans from '../langs/strings';
import './taskmanager.css';

let tasksList = '';

 class taskmanager extends Component {

  constructor(props) {
    super(props);
    this.state = {
      taskOpen: false,
      translate : trans[this.props.lang].homepanel,
    };
  }

  componentWillMount = () => {
    document.addEventListener('click', this.handleClick);
  }

  componentWillUnmount = () => {
    document.removeEventListener('click', this.handleClick);
  }

  handleClick =(event)=> {
    let clickedOn = event.target;
    if (clickedOn.classList.contains('show-lesson-tasks-btn')) {
      this.toggleTasks();
    }else {
      if (this.state.taskOpen) {
        if (clickedOn.classList.contains('show-lesson-code-btn') 
            || clickedOn.classList.contains('bet-close')
            || clickedOn.classList.contains('task-item-name')
            || clickedOn.classList.contains('show-mirror-btn')) {
              this.toggleTasks();
              let videoGames = document.getElementsByClassName('video-games')[0];
              // console.log(videoGames)
        }        
      }
    }
  }

  toggleTasks =()=> {
    this.setState({taskOpen: !this.state.taskOpen});
    let videoGames = document.getElementsByClassName('video-games')[0];

    if(this.state.taskOpen) {
      videoGames.style.zIndex = '-1';
    }else {
      videoGames.style.zIndex = '1000';
    }
  }


  selectItem =(event)=> {
    let taskLink = event.target.getAttribute('data-task-link')
    let taskId = event.target.getAttribute('data-task-id')
   // console.log('selected-> ', taskLink);
    this.props.setTaskLink(taskLink);
    this.props.setTaskId(taskId);
  }
  

  render() {

    let { taskOpen, translate } = this.state;
    let { courseCodes, clickedLevel, lessonVideo, lang } = this.props;

    let lessonUrl = '';
    if(courseCodes) {
      let course_num = courseCodes['course_num'];
      let course_name = courseCodes['course_name'];
      lessonUrl = `https://omegacoding.com/codes_from_courses/${lang}/${course_num}/${clickedLevel}/${course_name}${clickedLevel}.zip`;

    }
    

    // we need default tasks-array, to avoid mistakes.
    // default here is video of current-lesson.
    let currentTasks = [lessonVideo]; // 'PI7u4K-I3MM'
    let defaultTaskList = currentTasks.map((item, index)=> {
        return(
          <li key={`lesson-${clickedLevel}`} className='task-item'>
            <span onClick={this.selectItem} data-task-link={item} data-task-id={index} className='task-item-name'>
                {`${translate.lesson} - ${clickedLevel}`}
            </span>

            <a href={lessonUrl} className='task-item-code' target='_self'>
                <i className='material-icons' style={{color: '#337ab7'}}>get_app</i>
            </a>           
          </li>
        );
      });

    


    // logic when user clicked on course() in training.js  and tasks are loaded.
    let backToLesson ='';
    if (courseCodes && courseCodes.tasks) {
      let tasks = courseCodes.tasks;
      if (clickedLevel && tasks && tasks[clickedLevel]) {

        currentTasks = tasks[clickedLevel];
        tasksList = currentTasks.map((item, index)=> {
          let taskId = `${translate.task} - #${index + 1}`
          return(
            <li key={index} className='task-item'>
              <span onClick={this.selectItem} data-task-link={item} data-task-id={taskId} className='task-item-name'>
                {`${translate.task} - №${index + 1}`}
              </span>
            </li>
          );
        });
  
      //   backToLesson = <li key={`back-${clickedLevel}`} className='task-item' data-task-link={lessonVideo} onClick={this.selectItem}>
      //  {`Back to lesson`}
      //  </li>;
        backToLesson = defaultTaskList;
      }else {
        tasksList = defaultTaskList;
      }
      
    } else {
      tasksList = defaultTaskList;
    }

    // console.log('currentTasks -> ',currentTasks);
   // console.log('tasksList ---#### ----', tasksList)
    
    

    let displayTasks = 'none';
    if(taskOpen) {
      displayTasks = 'block';
    } else {
      displayTasks = 'none';
    }

    return (
      <div className='taskmanager-wrap'>
        <span  className='show-lesson-tasks-btn'>{translate.tasksBtn}</span>
        <ul className='task-container' style={{display:displayTasks}}>
        {backToLesson}
          {tasksList}  
        </ul>
      </div>
    )
  }
}


const store = state => ({
  userProfile: state.userProfileData,
  lang:state.lang,
  courseCodes: state.courseCodes,
  clickedLevel: state.clickedLevel,
  lessonVideo: state.lessonVideo,
});

const dispatch = dispatch => ({
  setTaskLink:  action => dispatch({type:'SET_TASK_LINK', payload: action }),
  setTaskId:  action => dispatch({type:'SET_TASK_ID', payload: action }),
});


export default connect(
  store,
  dispatch
)(taskmanager);

