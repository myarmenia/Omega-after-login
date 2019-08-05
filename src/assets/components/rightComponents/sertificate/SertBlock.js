import React, { Component } from 'react';
import RCprogressLeft from '../alphabetGame/RCprogressLeft';
import './sertBlock.css';
import {connect} from 'react-redux';

class SertBlock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // not_passed_levels: this.props.not_passed_levels,
      // passed_levels: this.props.passed_levels,
      // course_levels: this.props.course_levels,
      // course_name: this.props.course_name,
    };
  }


  render() {
    // console.log('sert-block--------------------STATRT');
    // console.log(this.props.not_passed_levels);
    // console.log(this.props.passed_levels);
    // console.log(this.props.course_levels);
    // console.log(this.props.course_name);
    // console.log('sert-block--------------------END');

    /*
    toUpperCase()-ը բոլոր կուրսերի համար
    replace(/_/g,"")-ն միայն java_script-ի համար
    */

    /*
    {this.props.lang === 'eng'?`After ${this.props.not_passed_levels} levels You can get "${(this.props.course_name).toUpperCase().replace(/_/g, "")}" course certificate.`:
    `${this.props.not_passed_levels} դասից հետո Դուք կստանաք "${(this.props.course_name).toUpperCase().replace(/_/g, "")}" -ի վկայական`}
    */

    let language = this.props.lang;
    let afterMessage = '';
    if (language === 'eng') {
      afterMessage = `After ${this.props.not_passed_levels} levels You can get "${(this.props.course_name).toUpperCase().replace(/_/g, "")}" course certificate.`
    } else if(language === 'arm') {
      afterMessage = `${this.props.not_passed_levels} դասից հետո Դուք կստանաք "${(this.props.course_name).toUpperCase().replace(/_/g, "")}" -ի վկայական`
    }

     

    return (
      <div className="sert-message-wrap">
        <span className="sert-message-block">
          <span className="sert-message">
           {afterMessage}
          </span>

          <RCprogressLeft course_levels={this.props.course_levels} not_passed_levels={this.props.not_passed_levels}/>
        </span>
      </div>
    );
  }

}

const state = store => {
    return ({
        lang: store.lang
    });
};
const dispatch = dispatch => {
    return ({});
};

export default connect(state,dispatch)(SertBlock);
