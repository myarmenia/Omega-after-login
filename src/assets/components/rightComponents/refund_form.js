import React, { Component } from 'react';
import '../../styles/refund.css';
import Tilt from 'react-tilt'
import { connect } from 'react-redux';
import Recaptcha from 'react-recaptcha';

let refund=require(`../../images/img-01.png`);

class Refund_form extends Component{
    constructor(){
         super();
         this.state={
             val_text:'',
             card:'',
             error_message:'start',
             captcha:false,
             reloadCapthcs:true
         }
    }
    take_card_number=(e)=>{
        let numbers = /^[0-9]+$/;
        let p=e.target.value;
        if (p.match(numbers)){
            this.setState({
                card:e.target.value
            })
        }

    }

    focus=(e)=>{
        let pr_elem=e.target.parentElement;
        if(pr_elem.classList.contains('alert-validate')){
            pr_elem.classList.remove('alert-validate')
        }
        if (this.state.error_message !== ''){
            this.setState({
                error_message:'start',
                reloadCapthcs:true
            })
        }


    }
    take_value=(e)=>{

        this.setState({
            val_text:e.target.value
        })
    }
    defualt=(event)=>{
        event.preventDefault();
    }
    send_mail=(event)=>{
        event.preventDefault();

        if(this.state.card ===''){
            let elem=document.getElementById('card');
            elem.classList.add("alert-validate");
           // console.log(elem,"elem")
        }

        if(this.state.val_text ===''){
            let elem=document.getElementById('message');
            elem.classList.add("alert-validate");
            //console.log(elem,"elem")
        }
        if(!this.state.captcha){
            let elem=document.getElementById('captcha');
            elem.classList.add("alert-validate");

        }
        if(this.state.val_text !=='' && this.state.card !=='' && this.state.captcha){
            let operation="refund";
            let info =`uid=${encodeURI(this.props.userProfile.uid)}&oper=${encodeURI(operation)}&message=${encodeURI(this.state.val_text)}&card=${encodeURI(this.state.card)}&days=${encodeURI(this.props.days)}`;
          //  console.log(info,"info_refund")
            fetch(`https://omegacoding.com/android_test/userProgressManager.php`,{
                method:'POST',
                headers:{"Content-type":"application/x-www-form-urlencoded",'Accept':'application/json'},
                body: info
            }).then(response => {
                if(response.ok){
                    return response.json();
                }
            }).then(response => {
               // console.log(response,"response_refund");
                if(!response.error){
                    this.setState({
                        error_message:response.mess,
                        val_text:'',
                        card:'',
                        captcha:false,
                        reloadCapthcs:false
                    });

                    }
            }).catch( error => {
                console.log(error,"error");
            });
        }
        };
    callback=()=>{
        console.log('Done!!!!');
    };
    verifyCallback=(e)=>{
        if(e){
            let pr_elem=document.getElementById('captcha');
            if(pr_elem.classList.contains('alert-validate')){
                pr_elem.classList.remove('alert-validate')
            }
            this.setState({
                captcha:true,

            })
        }
    };

    render(){

        return(
            <div className="contact1">

                    {this.props.days!== 0?
                        <div className="container-contact1">
                             <div className="contact1-pic">
                                <Tilt className="Tilt" options={{ max : 25 }}  >
                                <img className="Tilt-inner" src={refund} alt="refund"/>
                                </Tilt>

                            </div>

                            <form className="contact1-form validate-form">
                                <div>
                        <span className="contact1-form-title">
                            Due to the consideration that the free trial <span className="trial" >{this.props.days} days </span>hasn't expired yet, Omega Coding will return you {this.props.percent} from the paid amount.
                        </span>
                                <span className="contact1-form-title">
                            OmegaCoding would like to know the reason for requesting the refund:
                        </span>
                                </div>

                                <div id="card" className="wrap-input1 validate-input" data-validate="Card number is required">
                                    <input className="input1" type="text"   onFocus={this.focus} value={this.state.card} placeholder="Your card number" onChange={this.take_card_number}/>
                                        <span className="shadow-input1"></span>
                                </div>


                                <div id="message" className="wrap-input1 validate-input" data-validate="Message is required">
                                    <textarea className="input1" value={this.state.val_text}  placeholder="Message" onFocus={this.focus} onChange={this.take_value}></textarea>
                                    <span className="shadow-input1"></span>
                                </div>
                                <div id="captcha" className="wrap-input1 validate-input" data-validate="Recaptcha is required">
                                    {this.state.reloadCapthcs?
                                    <Recaptcha
                                    sitekey="6Lfx94oUAAAAAP4gaMhrOo7TGbr1vRgJdJCHbu60"
                                    render="explicit"
                                    onloadCallback={this.callback}
                                    verifyCallback={this.verifyCallback} />:''}
                               </div>
                                <div className="container-contact1-form-btn">
                                    <div id='err' className="no-error" style={{display: this.state.error_message ==='start'?'none':'block'}}>{this.state.error_message}</div>
                                    <button className=" button_green_com" onClick={this.state.error_message ==='start'?this.send_mail:this.defualt}>
                                <span> Send Email
                                </span>
                                    </button>
                                </div>
                            </form>
                        </div>
                    :
                     <div className="container-contact1">
                      <div style={{margin: '0 auto'}}>
                        <span className="contact1-form-title">
                            Sorry, we can’t refund you.<br/> Your seven days for requesting the refund has expired..
                        </span>

                          <div className="row" style={{paddingTop: '48px'}}>
                             <a href="https://omegacoding.com/terms"  target="_blank" className="terms">Terms and conditions</a>
                          </div>


                      </div>
                     </div>

                }
            </div>

       )
}}

const state = store => ({
    userProfile: store.userProfileData,
    lang:store.lang

});


const dispatch = dispatch => ({

});

export default connect(
    state,
    dispatch,
)(Refund_form);

