import React, { Component } from 'react';
import {trans} from '../langs/strings';
import { connect } from 'react-redux';

const styles={
    description:{
        textAlign:'left',
    },
    btn_style:{
        margin: '12px',
        color: 'black',
        padding: '0 2px'
    }
};
let arr=[];
class OrderJobs extends Component {
    constructor(){
        super();
        this.state={
            order:''
        }
    };

    more=(e)=>{
       let id = e.target.id;
        this.props.show_more(true, arr[id]);
    }
    componentWillMount(){
       // console.log( this.props.userProfile.job_order_id,"this.props.userProfile.job_order_id");
            let  job_order_id = JSON.stringify(this.props.userProfile.job_order_id);
            let info =`job_order_id=${job_order_id}`;
            //console.log(info,"infoinfoinfoinfo");
            fetch(`https://omegacoding.com/android_test/send_project_order.php`,{
                method:'POST',
                headers:{"Content-type":"application/x-www-form-urlencoded",'Accept':'application/json'},
                body: info
            }).then(response => {
                if(response.ok){
                    return response.json();
                }
            }).then(response => {

                 arr = Object.values(response);
                //console.log(arr,"responseinfo");

                 this.setState({
                     order:arr
                 })

            }).catch( error => {
                console.log(error,"error");
            });

    }


  render(){
        //console.log(arr,"arrrrrrrrrrrrr");
        let { lang } = this.props;
        let translate = trans[lang];


        let i=0;
        let orders=arr.map((item,index) =>{

            return(
                <div className="col-md-6" key={index}>
                     <p className="col-md-12" style={styles.description}> {item.site_description}
                </p>
                  <button  className="button_blue" id={i++}  onClick={this.more}>{ translate.order.moreText }</button>
                </div>
            )

        });

        return(
            <div className="container-my">
                <div className="row">
                {orders}
                </div>
            </div>

        )
    }
}

const store = store =>({
    userProfile: store.userProfileData,
    lang:store.lang,
});
const dispatch = dispatch =>({})

export default connect(store,dispatch)(OrderJobs);
