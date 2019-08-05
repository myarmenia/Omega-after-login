import React, { Component } from 'react';
import Jobs from './stock_jobs/jobs';
import './index.css';
// import Homeworkpanel from '../homeworkpanel/homepanel';
// import Mirror from '../homeworkpanel/lesson_code/codemirror2/armmirror2';

const styles = {
  wrapper: {
    margin: '15px auto',
    width: '83%',
    textAlign: 'center',
    position: 'absolute',
    left: '5%',
    color: 'white',
    fontFamily: 'Monts-regular',
  },
  header: {
    fontFamily: 'Monts-black',
  }
};


class Suggestions extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }


  // <Homeworkpanel/>
  // <Mirror/>
  render() {
    return (
      <div style={styles.wrapper}>               
        <Jobs />
      </div>
    );
  }

}

export default Suggestions;
