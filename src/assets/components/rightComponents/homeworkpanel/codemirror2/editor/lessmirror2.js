import React from "react";
import { connect } from 'react-redux';
import { Controlled as CodeMirror } from "react-codemirror2";
import trans from '../../langs/strings';

import { dragElement2 } from "./helpers";
import './armmirror2.css';

import "codemirror/lib/codemirror.css"; // codemirror.css - default style.
import "codemirror/theme/ambiance.css"; // editor theme
import "codemirror/addon/hint/show-hint.css"; // 


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

class Lessmirror2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ''
    };
  }

  componentDidMount() {
    let lessmirrot2 = document.getElementById("lessmirrot2");
    dragElement2(lessmirrot2);
    setTimeout(()=>{
      this.updatePreview();
    },250)
  }

  // https://hackernoon.com/replacing-componentwillreceiveprops-with-getderivedstatefromprops-c3956f7ce607
  componentDidUpdate(prevProps, prevState) {
    if(prevProps.lessonCode !== this.props.lessonCode){
      this.setState({value: this.props.lessonCode});
      // if (this.props.isOpen2) {
      //   this.importLessonCode()
      // }else{
      //   // this.setState({value: ''})
      // }
      
    }
  }

  updatePreview=()=> {
    var previewFrame = document.getElementById('preview2');
    var preview = previewFrame.contentDocument ||  previewFrame.contentWindow.document;
    preview.open();
    preview.write(this.state.value);
    preview.close();
  }


  importLessonCode=()=>{
    // if you want to update lesson-code each time when opened -> componentDidUpdate
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

  refreshEditor=()=>{
    this.setState({value: this.props.lessonCode});
  }

  render() {
    let options = {
      mode: "htmlmixed",
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


    return (
      <div className="lessmirror2" id="lessmirrot2">
        <h4 className="lessmirror2-header" id="lessmirrot2-header">
          Lesson's Code
          <span className='close-mirror2-btn'>×</span>
        </h4>
        <div className='editor-btn-group'>
          <span onClick={this.refreshEditor} className='editor-btn'>{ translate.refresh }</span>                 
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
              className="cdmr333"
            />
          </div>
          <iframe id='preview2'></iframe>
          
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
});

export default connect(
  store
) (Lessmirror2);

