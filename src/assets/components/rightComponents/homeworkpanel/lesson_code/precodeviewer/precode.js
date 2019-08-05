import React, { Component } from 'react';
import { connect } from 'react-redux';
import Highlight from 'react-highlight';
import "highlight.js/styles/agate.css";
import './precode.css';

class Precode extends Component {



  render() {
    let {lessonCode} = this.props;

    return (
      <div className='code-high-lighter'>
        <Highlight >
          {lessonCode}
        </Highlight>
      </div>
    )
  }
}


export default Precode;
