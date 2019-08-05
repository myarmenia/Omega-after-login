import React, { Component } from 'react';
import Mirror from './editor/armmirror2';
import { connect } from 'react-redux';
import trans from '../langs/strings';
import './mirrormanager.css';

import Mirror2 from './editor/lessmirror2';

 class Mirrormanager extends Component {
   constructor(props) {
     super(props);
     this.state = {
      isOpen: false,
      isOpen2: false,
      lessonCode: ''
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
    if (clickedOn.classList.contains('show-mirror-btn') || 
        clickedOn.classList.contains('close-mirror-btn') ) {
      this.toggleMirror();
    }
    else {
      if (this.state.isOpen) {
        if (clickedOn.classList.contains('show-lesson-code-btn')
            || clickedOn.classList.contains('show-lesson-tasks-btn')
            || clickedOn.classList.contains('bet-close')
            || clickedOn.classList.contains('task-item')) {
              this.setState({isOpen: false});
              let videoGames = document.getElementsByClassName('video-games')[0];
              
              videoGames.style.zIndex = '-1';
              if (clickedOn.classList.contains('bet-close')) {
                videoGames.style.zIndex = '1000';
              }
              // console.log(videoGames)
        }        
      }
    }

    if (clickedOn.classList.contains('show-mirror2-btn') ||
        clickedOn.classList.contains('close-mirror2-btn')) {
      this.toggleMirror2();
    }else{
      if (this.state.isOpen2) {
        if (clickedOn.classList.contains('show-lesson-code-btn')
            || clickedOn.classList.contains('show-lesson-tasks-btn')
            || clickedOn.classList.contains('bet-close')
            || clickedOn.classList.contains('task-item')) {
              this.setState({isOpen2: false});
              let videoGames = document.getElementsByClassName('video-games')[0];
              
              videoGames.style.zIndex = '-1';
              if (clickedOn.classList.contains('bet-close')) {
                videoGames.style.zIndex = '1000';
              }
              // console.log(videoGames)
        }    
      }
    }
  }

  toggleMirror =()=> {
    this.setState({isOpen: !this.state.isOpen});
    let videoGames = document.getElementsByClassName('video-games')[0];
    
    if(this.state.isOpen) {
      videoGames.style.zIndex = '-1';
    }else {
      if(!this.state.isOpen2) {
      videoGames.style.zIndex = '1000';
      }
    }
  }

  toggleMirror2=()=>{
    //m2 - openlesscode()
    /* եթե պետքա ամեն բացելուց սկզբնական ամբողջական կոդը ցույց տալ,
    Mirror2-ին ուղաչկել isOpen2-state-ը */
    this.setState({isOpen2: !this.state.isOpen2});
    
    /* եթե պետքա բացել֊փոխել֊փակելուց մնա փոփոխածը, Mirror2-ին ուղարկել
    lessonCode-state-ը ու բացել 2-րդ if-ը, փոկելով վերևի setState()-ը */
    let lessonCode = '';
    let {courseCodes, clickedLevel} = this.props;
    if (courseCodes) {
      if (typeof( courseCodes[clickedLevel]) ==='object') {
        lessonCode = courseCodes[clickedLevel][0];
      } else {
        lessonCode = courseCodes[clickedLevel];
      }
      this.setState({lessonCode: lessonCode})
    }

    let videoGames = document.getElementsByClassName('video-games')[0];
    if(this.state.isOpen2) {
      videoGames.style.zIndex = '-1';
    }else {
      if(!this.state.isOpen) {
      videoGames.style.zIndex = '1000';
      }
    }
  }

  render() {
    let translate = trans[this.props.lang].homepanel;
    let { isOpen, isOpen2 } = this.state;
    
    let status = translate.editorOpen // 'Open';
    let displayMirror = 'none';
    if (isOpen) {
      status = translate.editorClose // 'Close';
      displayMirror = 'block';
    }

    let status2 = translate.showLessonsCode
    let displayMirror2 = 'none';
    if (isOpen2) {
      status2 = translate.hideLessonsCode
      displayMirror2 = 'block';
    }

   // console.log('lang in mirror ---> ', this.props.lang)
   // console.log('status in mirror ---> ', trans[this.props.lang].homepanel.editorOpen )




    return (
      <span className='mirrormanager-wrap'>
        <span className='show-mirror-btn'>{status}</span>
        <span className='show-mirror2-btn'>{status2}</span>      
        <span className='mirror-container' style={{display: displayMirror}}>
          <Mirror />
        </span>

        <span className='mirror2-container' style={{display: displayMirror2}}>
          <Mirror2 lessonCode={this.state.lessonCode}/>
        </span>
      </span>
    )
  }
}

const store = state => ({
  lang:state.lang, // arm-emg
  // m2
  courseCodes: state.courseCodes,
  clickedLevel: state.clickedLevel,
});

export default connect(
  store
) (Mirrormanager);
