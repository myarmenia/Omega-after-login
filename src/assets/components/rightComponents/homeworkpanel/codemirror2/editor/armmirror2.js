import React from "react";
import { connect } from 'react-redux';
import { Controlled as CodeMirror } from "react-codemirror2";
import trans from '../../langs/strings';

import { 
  dragElement ,
  htmlTemplate,
  bootstrapTemplate,
  jqueryTemplate } from "./helpers";
import './armmirror2.css';

import "codemirror/lib/codemirror.css"; // codemirror.css - default style.
import "codemirror/theme/ambiance.css"; // editor theme
import "codemirror/addon/hint/show-hint.css"; // 
import { stat } from "fs";
import { setTimeout } from "timers";


// typing modes - languages
require("codemirror/mode/gfm/gfm");
require("codemirror/mode/htmlmixed/htmlmixed");
require("codemirror/mode/javascript/javascript");
require("codemirror/mode/css/css");


// settings - Autoclosing
require("codemirror/addon/edit/closetag");
require("codemirror/addon/edit/closebrackets");

// settings - hinting on CTRL+Space  
require("codemirror/addon/hint/show-hint");
require("codemirror/addon/hint/anyword-hint");

require("codemirror/addon/display/autorefresh");

let tasksList = '';

class Armmirror2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: htmlTemplate,
      mailerMsg: '',
      mailerOk: null,
      showTaskList: false,
      taskOption: '0'
    };
  }

  componentDidMount() {
    let armmirrot2 = document.getElementById("armmirrot2");
    dragElement(armmirrot2);

    setTimeout(()=>{
      this.updatePreview();
    },250)
  }


  updatePreview=()=> {
    var previewFrame = document.getElementById('preview');
    var preview = previewFrame.contentDocument ||  previewFrame.contentWindow.document;
    preview.open();
    preview.write(this.state.value);
    preview.close();
  }

  getLib=()=>{
    let sel = document.getElementsByClassName('select-template')[0];
    let lib = sel.options[sel.selectedIndex].value

    if (lib !== 'false') {
      console.log(lib); // jqueryTemplate
      

      switch (lib) {
        case 'html':
        this.setState({ value: htmlTemplate })
          break;

        case 'boot':
        this.setState({ value: bootstrapTemplate })
          break;

        case 'jquery':
        this.setState({ value: jqueryTemplate })
          break;
      
        default:
        this.setState({ value: htmlTemplate })
          break;
      }
    }
  }

  importLessonCode=()=>{
    // change selected to default
    let selectTemplate = document.getElementsByClassName('select-template')[0]
    selectTemplate.value = 'false'

    let {courseCodes, clickedLevel} = this.props;
    let lessonCode = '';
    if (courseCodes) {
      if (typeof( courseCodes[clickedLevel]) ==='object') {
        lessonCode = courseCodes[clickedLevel][0];
      } else {
        lessonCode = courseCodes[clickedLevel];
      }
      this.setState({value: lessonCode})
    }    
  }

  SendToCheck=()=> {

    // let task_code = this.state.value;
    let {
      userProfile,
      courseCodes,
      clickedLevel,
      taskId
    } = this.props;

    let profile = userProfile.profile;
    let uid = userProfile.uid; // for gettitng email //
    let course_name = 'XML';
    if (courseCodes) {
      course_name = courseCodes.course_name;
    }
    

    var url = 'https://omegacoding.com/task_sender/bindex.php';
    let headers = {"Content-type": "application/x-www-form-urlencoded; charset=UTF-8"};
    let tasktoken = 'de#13516@sd';
    var data = {
      user_name: profile,
      user_id: uid,
      course_name: course_name,
      level: clickedLevel,
      task_id: taskId,
      task_code: this.state.value,
    };
    
    if (taskId !== '0' || this.state.taskOption !== '0') {
      if (taskId === '0') {
        data.task_id = this.state.taskOption;
      }
        fetch(url, {
          method: 'POST', // or 'PUT'
          body: `tasktoken=${tasktoken}&taskinfo = ${JSON.stringify(data)}`, // data can be `string` or {object}!
          headers:headers
        }).then(res => res.json())
        // .then(response => console.log('Success:', JSON.stringify(response)))
        .then(response => {
          console.log(response)
          if (response.OK) {
            console.log('is true')
            this.setState({ mailerOk: response.OK, mailerMsg: response.Mailer_Success})
          }else{
            console.log('is false')
            this.setState({ mailerOk: response.OK, mailerMsg: response.Mailer_Error})
          }
        })
        .catch(error => console.error('Error:', error));
    }else {
      console.log('props task id is -> ', taskId)
      console.log('state task-option is ->', this.state.taskOption)
      let translate = trans[this.props.lang].homepanel;

      if (courseCodes && courseCodes.tasks) {
        let tasks = courseCodes.tasks;
        if (clickedLevel && tasks && tasks[clickedLevel]) {

          this.setState({ 
            mailerOk: 'select', 
            mailerMsg:'Please, select task from list and click on "Send to check" again.',
            showTaskList: true 
          })

          tasksList = tasks[clickedLevel].map((item, index)=> {            
            let newtaskId = `${translate.task} - #${index + 1}`;
            return(
              <option key={index} value={newtaskId}>
                {`${translate.task} - №${index + 1}`}
              </option>
            );
          });

        }
        else {
          console.log('This level does not have any tasks')
          this.setState({ 
            mailerOk: 'level_no_tasks',
            mailerMsg: translate.levelNoTaskMsg
          })
        }

      }
      else{
        console.log('This course does not have nay tasks')
        this.setState({ 
          mailerOk: 'course_no_tasks',
          mailerMsg: translate.courseNoTaskMsg
        })
      } 
      

    }

  } // SendToCheck()

  getTask=()=> {
    let sel = document.getElementsByClassName('select-task')[0];
    let selected = sel.options[sel.selectedIndex].value;
    this.setState({taskOption: selected});
    console.log(selected);
  }

  closeMailerResponse=()=> {
    this.setState({ mailerOk: null, mailerMsg:'' })
  }

  render() {
    let options = {
      mode: "htmlmixed",//"htmlmixed", "javascript"
      theme: "ambiance",
      lineNumbers: true,
      autoCloseTags: true,
      autoCloseBrackets: true,
      autoRefresh: true,
      extraKeys: {
        "Ctrl-Space": "autocomplete",
      },
    };

    let translate = trans[this.props.lang].homepanel;
    let selectedTask = '';
    let {taskId} =this.props;
    if (taskId !== '0') {
      selectedTask = taskId
    }

    let { mailerOk, mailerMsg, showTaskList } = this.state;
    let displayMsg = ''
    if(mailerOk === null && typeof mailerOk === "object") {
      displayMsg = 'none'
    } else {
      displayMsg = 'block'
    }

    let displayTaskList = '';
    if (showTaskList) {
      displayTaskList = 'block';
    }else{
      displayTaskList = 'none';
    }

    // <span onClick={this.importLessonCode} className='editor-btn'>{ translate.importLessonsCode }</span>
    return (
      <div className="armmirror2" id="armmirrot2">
        <h4 className="armmirror2-header" id="armmirrot2-header">
          <span className='selected-task'>{selectedTask}</span>
          Omega Editor
          <span className='close-mirror-btn'>×</span>
        </h4>
        <div className='editor-btn-group'>          
          <select onChange={this.getLib} className='select-template'>
            <option value='false'>{ translate.selectTemplate }</option>
            <option value='html'>HTML5</option>
            <option value='boot'>Bootstrap</option>
            <option value='jquery'>JQuery</option>
          </select>
          <span className='editor-btn' onClick={this.SendToCheck}>{translate.sendToCheck}</span>
          <span style={{display:displayTaskList}} className='task-wrap'>
            <select onChange={this.getTask} className='select-task'>
              <option value='0'>{ translate.selectTask }</option>
              {tasksList}
            </select>
          </span>

          <span className='mailer-response' style={{display:displayMsg}}>
            {mailerMsg} <span className='close-message-btn' onClick={this.closeMailerResponse}>×</span>
          </span>
        </div>
        <span className='edit-and-preview'>
          <div className='edit'>
            <CodeMirror
              value={this.state.value}
              options={options}
              onBeforeChange={(editor, data, value) => {
                this.setState({ value });
              }}
              onChange={(editor, data, value) => {
                this.updatePreview();
              }}
              className="cdmr222"
            />
          </div>
          <iframe id='preview'></iframe>
        </span>
      </div>
    );
  }
}

const store = (state) => ({
  courseCodes: state.courseCodes,
  clickedLevel: state.clickedLevel,
  userProfile: state.userProfileData,
  lang:state.lang,
  taskId: state.taskId,
});

export default connect(
  store
) (Armmirror2);

