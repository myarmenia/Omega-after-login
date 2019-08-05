import React, { Component } from 'react';
import {trans} from '../langs/strings';
import { connect } from 'react-redux';

class JobDescription extends Component {
    constructor(props) {
        super(props);
    }

    back=()=>{
      this.props.go_back();
    };

    render() {
        let arr = [];
        let obj={};
        let { lang } = this.props;
        let translate = trans[lang];

        for(let k in this.props.data){
            if(k !== 'id' && k !== 'part1' && k !== 'part2'){
                obj={key:k,value:this.props.data[k]}
                arr.push(obj)
            }
        }
        let job=arr.map((item,index)=>{
            return(
                <div key={index}  style={{textAlign:'left',margin:'5px 0'}}>
                    <span> {item.key} </span>:&nbsp;<span>{item.value}</span>
                </div>
            )
        })
       // console.log(arr, "arr_desrc_job");
        return (
            <div className="table"  style={{textAlign:'left',padding:'0 20px'}}>
                {job}
                <button  className="button_blue"  onClick={this.back}>{ translate.order.backText }</button>

            </div>
        );
    }
}

const store = store =>({
    lang:store.lang,
});

export default connect(store)(JobDescription);
