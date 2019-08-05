import React, { Component } from 'react';
import Precode from '../precodeviewer/precode';
import { connect } from 'react-redux';
import './codemanager.css';
import '../../../alphabetGame/styles/animate.css';

 
// import {lsource1} from './lesson';

 class codemanager extends Component {
  constructor(props) {
    super(props);
    this.state = {
      codeOpen: false
    };
  }

  componentWillMount = () => {
    document.addEventListener('click', this.handleClick)
  }

  componentWillUnmount = () => {
    document.removeEventListener('click', this.handleClick);
  }
  
  
  handleClick=(event)=>{
    let clickedOn = event.target;
    if (clickedOn.classList.contains('show-lesson-code-btn')) {
      // clicked on button "Lesson's Code"
      this.toggleCode();
    }else {
      // clicked on other space
      if (this.state.codeOpen) {
        let glistWrap = document.getElementsByClassName('glist-wrap')[0];
        if (clickedOn.classList.contains('show-lesson-tasks-btn') ||
            clickedOn.classList.contains('show-mirror-btn') ||
            clickedOn.classList.contains('bet-close')) {
              if (glistWrap) {
                glistWrap.style.display = 'block';
              }
              this.setState({codeOpen: false})
        }
        
      }
          
    }
    
  }

  toggleCode=()=>{
    this.setState({codeOpen: !this.state.codeOpen})
    let glistWrap = document.getElementsByClassName('glist-wrap')[0];
    if(this.state.codeOpen) {
      glistWrap.style.display = 'none';
    }else{
      glistWrap.style.display = 'block';
    }
  }


  


  render() {
    let {codeOpen} = this.state;
    let {courseCodes, clickedLevel} = this.props;

    
    let lessonParts = 'No code to show';
    let url = '#';
    
    if(courseCodes){

      if (typeof( courseCodes[clickedLevel]) ==='object') {
        let codesLine = courseCodes[clickedLevel];
        lessonParts =  codesLine.map((item, index) => {
          return (
            <Precode lessonCode={item} key={index}/>          
          );
        });
      }else{
          lessonParts = <Precode lessonCode={courseCodes[clickedLevel]} />;
      }

      let course_num = courseCodes['course_num'];
      let course_name = courseCodes['course_name'];
      url = `https://omegacoding.com/codes_from_courses/${course_num}/${clickedLevel}/${course_name}${clickedLevel}.zip`;

    }
    



    //console.log(lessonParts);
        
    
    let displayCode = 'none';
    if (codeOpen) {
      displayCode = 'block';
    }else{
      displayCode = 'none';
    }


    

    // console.log(url);
    // console.log('modes-codes',this.props.courseCodes);
    // console.log(' clicked level', this.props.clickedLevel)
    // onClick={this.toggleCode}
    return (
      <div className='codemanager-wrap'>        
        <span  className='show-lesson-code-btn'>Lesson's Code</span>
        <a href={url} className='download-lesson-code-btn' target='_self'>
          <i className='material-icons' style={{color: '#337ab7'}}>get_app</i>
        </a>
        <div style={{display:displayCode}} className='code-container'>        
          {lessonParts}        
        </div>
      </div>
    )
  }
}

const store = state => ({
  userProfile: state.userProfileData,
  lang:state.lang,
  courseCodes: state.courseCodes,
  clickedLevel: state.clickedLevel,
});


export default connect(
  store
)(codemanager)
