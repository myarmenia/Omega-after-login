import 'rc-progress/assets/index.css';
import React, { Component } from 'react';
import { Line } from 'rc-progress';

class Progress extends Component {
    constructor() {
        super();
        this.state = {
            percent: 0,
        };
    }

    componentWillRecieveProps (){


}
    componentDidMount() {
        this.increase();
    }

    increase = () => {
        const percent = this.state.percent + 1;
        if (percent >= 100) {
            clearTimeout(this.tm);
            return;
        }
        if(percent >= 70){

        }
        this.setState({ percent });
        this.tm = setTimeout(this.increase, 1000);
    }

    render() {
        return (
                <Line strokeWidth="0.9" percent={this.state.percent} style={{color:'red'}} />
        );
    }
}

export default Progress;