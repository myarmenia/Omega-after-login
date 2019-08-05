import React, { Component } from 'react';
//import Points from './pointsView';
import AnimatedNumber from 'react-animated-number';


let starSmall = require('../../../images/notepadGameImages/star_small.png');
let starBig = require('../../../images/notepadGameImages/star_big.png');
let starSmallEmpty = require('../../../images/notepadGameImages/star_small_empty.png');
let starBigEmpty = require('../../../images/notepadGameImages/star_big_empty.png');
let light = require('../../../images/notepadGameImages/light.png');
let url=`url(${light})`;

class OverallPointsUnity extends Component{
    constructor(props) {
        super(props);
        this.state={
            numberOfStars:0,
            rank: 0,
            point:0,
            old_points:0


        }
   }
    componentWillUnmount () {
        this.setState({
            showFinalPoints:false,
            showFinalPointsPuzzle:false

        })
       // console.log("unmount")
    }
    componentWillMount(){
        this.setState({
            numberOfStars:this.props.starNum,
            rank:this.props.ranks,
            point:this.props.points,
            old_points:this.props.old_points

        })
    }

    componentWillReceiveProps(props){
        this.setState({
            numberOfStars:props.starNum,
            rank:props.ranks,
            point:props.points,
            old_points:props.old_points
        })

    }


    render(){
       // console.log(this.state.point,"this.state.point,minchev pits")
        return(
            <div className="containerr">
                <div className="lightContainer">
                    <div className="light"  style={{backgroundImage:`${url}`,  backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center ', width: '100%', height: '100%', backgroundSize: 'contain' }}>

                    </div>
                </div>
                <div className="raitingContainer">
                    <div className="starsImage">
                        <div className="star1 stars"
                             style={{
                                 backgroundImage:`url(${this.state.numberOfStars >= 1 ? starSmall:starSmallEmpty})`
                             }}>
                        </div>
                        <div className="star2 stars"
                             style={{
                                 backgroundImage:`url(${this.state.numberOfStars >= 2 ? starBig:starBigEmpty})`
                             }}>
                        </div>
                        <div className="star3 stars"
                             style={{
                                 backgroundImage:`url(${this.state.numberOfStars === 3 ? starSmall:starSmallEmpty})`
                             }}/>
                    </div>
                    <div className="lent"/>
                </div>
                <div className="scoreContainer">
                    <span className="score">
                        <AnimatedNumber
                            duration={1000}
                            stepPrecision={0}
                            value={this.state.point}
                        /> &nbsp;&nbsp;Points</span>
                </div>
                <div className="scoreContainer">
                    <span className="score rank">Your Rank : {this.state.rank}</span> <span style={{color:'red'}}>{this.state.point < this.state.old_points?`(Your best points :${this.state.old_points})`:null}</span>
                </div>

            </div>
        )
    }
}

export default  OverallPointsUnity;
