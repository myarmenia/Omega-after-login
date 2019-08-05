import React, { Component } from 'react';
import { connect } from 'react-redux';
import './taskmanager.css';

let tasksList = '';

 class taskmanager extends Component {

  constructor(props) {
    super(props);
    this.state = {
      taskOpen: false,
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
            || clickedOn.classList.contains('task-item')
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
    console.log('selected-> ', taskLink);
    this.props.setTaskLink(taskLink);
  }
  

  render() {

    let { taskOpen } = this.state;
    let { courseCodes, clickedLevel, lessonVideo } = this.props;
    

    // we need default tasks-array, to avoid mistakes.
    let currentTasks = [`L${clickedLevel}_default_link`];
    let defaultTaskList = currentTasks.map((item, index)=> {
        return(
          <li key={index} className='task-item' data-task-link={item}>
          {`No asignment`}
          </li>
        );
      });
    let backToLesson ='';

    if (courseCodes && courseCodes.tasks) {
      let tasks = courseCodes.tasks;
      if (clickedLevel && tasks && tasks[clickedLevel]) {

        currentTasks = tasks[clickedLevel];
        tasksList = currentTasks.map((item, index)=> {
          return(
            <li key={index} className='task-item' data-task-link={item} onClick={this.selectItem}>
            {`Task - ${index + 1}`}
            </li>
          );
        });
  
        backToLesson = <li key={`back-${clickedLevel}`} className='task-item' data-task-link={lessonVideo} onClick={this.selectItem}>
       {`Back to lesson`}
       </li>;
      }else {
        tasksList = defaultTaskList
      }
      
    } else {
      tasksList = defaultTaskList
    }

    // console.log('currentTasks -> ',currentTasks);
    
    

    let displayTasks = 'none';
    if(taskOpen) {
      displayTasks = 'block';
    } else {
      displayTasks = 'none';
    }

    return (
      <div className='taskmanager-wrap'>
        <span  className='show-lesson-tasks-btn'>Lesson's Tasks</span>
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
});


export default connect(
  store,
  dispatch
)(taskmanager);

