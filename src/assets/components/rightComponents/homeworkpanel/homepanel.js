import React, { Component } from 'react';
import './homepanel.css';
// import CodeManager from './lesson_code/codemanager/codemanager';
import TaskManager from './home_tasks/taskmanager';
import MirrorManager from './codemirror2/mirrormanager';

export default class hpanel extends Component {
  render() {
    // <CodeManager/>

    return (
      <div className='homework_panel'>
        <h4 className='homework_panel_heading'></h4>
        <div className='home-navigation'>

        <TaskManager/>
        <MirrorManager/>
        </div>
      </div>
    )
  }
}
