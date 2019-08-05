import React, { PureComponent } from 'react';
import Count from './pointsView - Copy';

let random_num1;
let random_num2;
let random_num3;
class Timer extends PureComponent {
  constructor (props) {
    super(props);
    this.state = {
        count: '',
        points:'',
          };
        //this.count();
  }
  /*count = () =>{
      let p=0;
     for(let i=0; i <= this.state.points[0]*1; i++){
         this.setState({
             count:p++,
         })
        setInterval(this.count(),1000)

      }


  }
  rand =()=>{
       setTimeout(this.count(),1000)
     }*/
    componentWillMount(){
        this.setState({
            points:this.props.points,
       })

    }

    componentWillReceiveProps(props){
        this.setState({
            points:props.points,
        })

    }

    render () {
      /*Math.floor(Math.random() * 10)
      b = String(а).split("");*/
  console.log(typeof this.props.points,"this.props.pointsthis.props.points");
  console.log(this.state.points[0],"this.state.pointsthis.state.points");
    return (
        <span>
        <Count points={8} />
        </span>
        )

  }
}
 export default Timer;