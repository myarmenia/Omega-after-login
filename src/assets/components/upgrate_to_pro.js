import React, {Component} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import IconButton from 'material-ui/IconButton';
import {connect} from 'react-redux';
import {css} from 'aphrodite/no-important';
import ReactDOM from 'react-dom';
import {lang_upgratePro_text} from './langs/lang';


let m_back = require(`../images/m_back.png`);


    class Upgrate_to_pro extends Component {
    constructor(props) {
        super();
        this.state = {
            mainScore: 0,
            requestIsDone: false,
            currentDiamonds: null,
            diamonds: null,
            coins: null,
            userr: props.user,
            lastname: '0',
            firstname: '0',
            show_price_blanck:false,
            resize:'',
            input_code:'',
            package:[19.99,16.99,13.99]

                   }
    }


    componentWillMount() {
        if (window.innerWidth <= 498) {
            this.setState({resize:'145px'})
        }
        else if (window.innerWidth >498 && window.innerWidth < 767 ) {
            this.setState({resize:'224px'})
        }
        else if (window.innerWidth <=1200 && window.innerWidth >= 767 ) {
            this.setState({resize:'130px'})
        }
        else if ( window.innerWidth >1200 ) {
            this.setState({resize:'240px'})
        }

        window.onresize = () => {
            if (window.innerWidth <= 498) {
                this.setState({resize:'145px'})
            }
            else if (window.innerWidth >498 && window.innerWidth < 767 ) {
                this.setState({resize:'224px'})
            }
            else if (window.innerWidth <=1200 && window.innerWidth >= 767 ) {
                this.setState({resize:'130px'})
            }
            else if ( window.innerWidth >1200 ) {
                this.setState({resize:'240px'})
            }
        }
    }


     keyDownEnter=(e)=>{
         if(e.keyCode === 13) {
             this.blur()}
     };
        get_input = (e)=>{
        this.setState({input_code:e.target.value})
        };

        blur = ()=>{
            let e=document.getElementsByClassName("price");
            let elem=document.getElementsByClassName("input2")[0];
            let error_code=document.getElementById("wrong");

            if(elem.value !=='' ){
            if(elem.value === this.props.akcia.code ){

                let info = `uid_promo_code=${encodeURI(this.props.userProfile.uid)}&code=${encodeURI(elem.value )}`;
              //  console.log( info ,"enter_promocodeenter_promocodeenter_promocode")
                fetch(`https://omegacoding.com/android_test/index.php`,{
                    method: 'POST',
                    headers: {"Content-Type": "application/x-www-form-urlencoded", 'Accept': 'application/json'},
                    body: info

                }).then(response => {
                    if (response.ok) {
                        return response.json();
                    }
                }).then(response => {
                    console.log(response, "enter_promocode");
                    if(!response.error){
                        error_code.textContent = '';
                        for (let i=0; i< e.length; i++){
                            let price=<span><span className="throuth">${this.state.package[i]}</span><span style={{color:'red'}}>$ {Number(this.state.package[i]-(this.state.package[i]*+this.props.akcia.percents[i])/100).toFixed(2)} </span> <lable>{ i===0?'/ month':'/ monthly'}</lable></span>;
                            ReactDOM.render(price ,e[i]);
                        }
                        this.props.changeAkciaInfo({error:true, active:true});
                        this.props.setPromoStatus(this.props.akcia.id)

                      }
                    else{
                        if(this.props.lang === "eng"){
                            error_code.textContent = 'Something went wrong, please try again!';
                        }
                        else{
                            error_code.textContent = 'Ինչ-որ սխալ տեղի ունեցավ, կրկին փորձեք';
                        }

                        this.setState({ package:[19.99,16.99,13.99]})
                    }


                }).catch(error => {
                    console.log(error,"enter_promocode");
                });

           }
                   else{
                  //console.log(error_code,"error_codeerror_codeerror_code")
                if(this.props.lang === "eng") {
                    error_code.textContent = 'Wrong promo-code';
                }
                else{
                    error_code.textContent = 'Սխալ Պրոմո Կոդ';
                }

                /* for (let i=0; i< e.length; i++) {
                            let price = <span><span>$ {this.state.package[i]}</span>
                                <lable>{ i===0?'/ month':'/ monthly'}</lable>
                            </span>;
                            ReactDOM.render(price, e[i]);
                        }*/
                      this.setState({ package:[19.99,16.99,13.99]})
                    }
            }
            else {
                if(this.props.lang === "eng") {
                    error_code.textContent = 'Please import the promo-code';
                }
                else{
                    error_code.textContent = 'Խնդրում ենք մուտքագրել Պրոմո Կոդը';
                }

                this.setState({ package:[19.99,16.99,13.99]})
            }
        };



    render() {

        const trans=lang_upgratePro_text[this.props.lang];
        return (
                <div className="pricing-grids" style={{width:'70vw', margin:this.props.menuState?'3%':'3% 0'}}>
                <div style={{textAlign: 'center',paddingBottom:'10px'}}>
                        <h4 style={{color:'white'}}>
                    {!this.props.userProfile.trial_over?this.props.userProfile.status !== 0?trans.trial_text1:'':trans.expired}
                    </h4>

                </div>
              <div className="row" style={{marginLeft: '17px'}}>
                 <div className="pricing-grid1">
                        <div className="price-value">
                            <h2 style={{fontSize:'16px'}}><a href="#" style={{padding:'0'}}> BASIC </a></h2>
                            (1 {trans.month})
                            {this.props.userProfile.have_promo === this.props.akcia.id?
                                <h5 className="price"><span><span className="throuth">${this.state.package[0]}</span><span style={{color:'red'}}>$ {Number(((this.state.package[0]-this.state.package[0]*+this.props.akcia.percents[0]/100)*100).toString().match(/^\d+/)/100)} </span> <lable>/ month</lable></span></h5>
                                :<h5 className="price"><span >$ {this.state.package[0]}</span><lable> / {trans.monthly}</lable></h5>

                            }  <div className="sale-box">
                                <span className="on_sale title_shop"/>
                            </div>

                        </div>
                        <div className="price-bg">
                            <ul>
                                <li><a href="#">{trans.basic.line1}</a></li>
                                <li className="whyt"><a href="#">{trans.basic.line2}</a></li>
                                <li><a href="#">{trans.basic.line3}</a></li>
                                <li className="whyt"><a href="#"> {trans.basic.line4} </a></li>
                                {this.props.userProfile.have_prom_code ?
                                    <li><a
                                        href="#">$ {Number(((this.state.package[0] - this.state.package[0] * +this.props.akcia.percents[0] / 100) * 100).toString().match(/^\d+/) / 100)} {trans.basic.line5}</a>
                                    </li>
                                    :<li><a href="#">$ {Number(this.state.package[0]).toFixed(2)} {trans.basic.line5}</a></li>
                                }<li className="whyt"><a href="#">{trans.basic.line6}</a></li>
                                <li className="#"><a href="#">{trans.basic.line7}</a></li>
                                <li>  <img src={m_back} width="55" alt="money back guarantee"/></li>
                            </ul>
                            <div className="cart1">
                                <a className="popup-with-zoom-anim" href={this.props.userProfile.status === '3'||this.props.userProfile.status === '2'||this.props.userProfile.status === '1' ?'javascript:void(0)':`https://omegacoding.com/android_test/pro_basic.php?orderNumber=N${Math.floor((Math.random() * 1000) + 1)}-${this.props.userProfile.uid}&clientID=${this.props.userProfile.uid}`}
                                   title={this.props.userProfile.status === '1' ?trans.title_active:'BASIC'}style={{width: '40%'}} >
                                    {
                                        this.props.userProfile.status === '1' ?trans.active_text:this.props.userProfile.status === 0?trans.purchase:'-'
                                    }
                                    </a>
                            </div>
                        </div>
                    </div>
                    <div className="pricing-grid2">
                        <div className="price-value">
                            <h2 style={{fontSize:'16px'}}><a href="#" style={{padding:'0'}}>STANDARD</a></h2>
                             (6 {trans.months})


                            {this.props.userProfile.have_promo === this.props.akcia.id?
                                <h5 className="price"><span><span className="throuth">${this.state.package[1]}</span><span style={{color:'red'}}>$ {Number(((this.state.package[1]-this.state.package[1]*+this.props.akcia.percents[1]/100)*100).toString().match(/^\d+/)/100)} </span> <lable>/ monthly</lable></span></h5>
                           :<h5 className="price"><span >$ {this.state.package[1]}</span><lable> / {trans.monthly}</lable></h5>

                            }

                            <div className="sale-box two">
                                <span className="on_sale title_shop">POPULAR</span>
                            </div>

                        </div>
                        <div className="price-bg">
                            <ul>
                                <li><a href="#">{trans.standard.line1}</a></li>
                                <li className="whyt"><a href="#">{trans.standard.line2}</a></li>
                                <li><a href="#">{trans.standard.line3}</a></li>
                                <li className="whyt"><a href="#">{trans.standard.line4}</a></li>
                                {this.props.userProfile.have_prom_code?
                                <li><a href="#">$ {Number(6*Number(((this.state.package[1]-this.state.package[1]*+this.props.akcia.percents[1]/100)*100).toString().match(/^\d+/)/100)).toFixed(2)} {trans.standard.line5}</a></li>
                                    :  <li><a href="#">$ {Number(this.state.package[1]*6).toFixed(2)} {trans.standard.line5}</a></li>
                                }
                                 <li className="whyt"><a href="#">{trans.standard.line6}</a></li>
                                <li className="#"><a href="#">{trans.standard.line7}</a></li>
                                <li>  <img src={m_back} width="55" alt="money back guarantee"/></li>
                            </ul>
                            <div className="cart2">
                                <a className="popup-with-zoom-anim" href={this.props.userProfile.status === '3'||this.props.userProfile.status === '2'||this.props.userProfile.status === '1' ?'javascript:void(0)':`https://omegacoding.com/android_test/pro_standard.php?orderNumber=N${Math.floor((Math.random() * 1000) + 1)}-${this.props.userProfile.uid}&clientID=${this.props.userProfile.uid}`}
                                   title={this.props.userProfile.status === '2' ?trans.title_active:'STANDARD'} style={{width: '40%'}}>
                                    {
                                        this.props.userProfile.status === '2' ?trans.active_text:this.props.userProfile.status === 0?trans.purchase:'-'
                                    }
                                  </a>
                            </div>
                        </div>
                    </div>
                    <div className="pricing-grid3">
                        <div className="price-value">
                            <h2 style={{fontSize:'16px'}}><a href="#" style={{padding:'0'}}>PREMIUM</a></h2>
                           (12 {trans.months})
                            {this.props.userProfile.have_promo === this.props.akcia.id?
                                <h5 className="price"><span><span className="throuth">${this.state.package[2]}</span><span style={{color:'red'}}>$ {Number(((this.state.package[2]-this.state.package[2]*+this.props.akcia.percents[2]/100)*100).toString().match(/^\d+/)/100)} </span> <lable>/ monthly</lable></span></h5>
                                :<h5 className="price"><span >$ {this.state.package[2]}</span><lable> / {trans.monthly}</lable></h5>

                            }
                            <div className="sale-box three">
                                <span className="on_sale title_shop"/>
                            </div>

                        </div>
                        <div className="price-bg">
                            <ul>
                                <li><a href="#">{trans.premium.line1}</a></li>
                                <li className="whyt"><a href="#">{trans.premium.line2}</a></li>
                                <li><a href="#">{trans.premium.line3}</a></li>
                                <li className="whyt"><a href="#">{trans.premium.line4}</a></li>
                                {this.props.userProfile.have_prom_code?
                                    <li><a href="#">$  {Number(12*Number(((this.state.package[2]-this.state.package[2]*+this.props.akcia.percents[2]/100)*100).toString().match(/^\d+/)/100)).toFixed(2)} {trans.premium.line5}</a></li>
                                    :  <li><a href="#">$ {Number(this.state.package[1]*12).toFixed(2)} {trans.premium.line5}</a></li>
                                }
                             <li className="whyt"> <a href="#">{trans.premium.line6}</a></li>
                                <li className="#"><a href="#">{trans.premium.line7}</a></li>
                                <li>  <img src={m_back} width="55" alt="money back guarantee"/></li>
                            </ul>
                            <div className="cart3">
                                <a className="popup-with-zoom-anim" href={this.props.userProfile.status === '3'||this.props.userProfile.status === '2'||this.props.userProfile.status === '1'?'javascript:void(0)':`https://omegacoding.com/android_test/pro_premium.php?orderNumber=N${Math.floor((Math.random() * 1000) + 1)}-${this.props.userProfile.uid}&clientID=${this.props.userProfile.uid}`}
                                   title={this.props.userProfile.status === '3' ?trans.title_active:'PREMIUM'}style={{width: '40%'}} >
                                    {
                                        this.props.userProfile.status === '3'?trans.active_text:this.props.userProfile.status === 0?trans.purchase:'-'
                                    }
                                    </a>
                            </div>
                        </div>
                    </div>
                </div>

                    {!this.props.akcia.error && this.props.userProfile.status === 0 && this.props.userProfile.have_promo === null ?
                        <div   className="promo-code">
                            <div  className="pro_code_style"> {trans.promo}</div>
                        <div  style={{display:'flex',textAlign: 'center',padding:'10px',left:'63%'}}>

                        <div> <input className="input2" type="text" value={this.state.input_code} placeholder={trans.promo}
                                     onKeyDown={this.keyDownEnter} onChange={this.get_input} onBlur={this.blur}/></div>

                        <button className="button_green" style={{padding:'0px 7px',margin:'0',top:'0',borderRadius:'inherit'}} onClick={this.blur}><i className="material-icons"  style={{verticalAlign: 'middle',fonSize:'13px',fontWeight:'900'}}>arrow_right_alt</i></button>
                        </div>
                            <div id="wrong" style={{color:'#fd1900',fontSize: '12px'}}/>
                    </div>:this.props.akcia.active? <div  className="pro_code_style_ok">{trans.thanks} </div>:null
                       }

                    <div  style={{paddingTop: '70px'}}>
                        <a href="https://omegacoding.com/terms"  target="_blank" className="terms">{trans.terms}</a>
                    </div>
                </div>
        )
    }
}

const state = store => ({
    menuState: store.menu,
    userInfoState: store.userInfo,
    userProfile: store.userProfileData,
    mobileMenu: store.mobileMenu,
    mobileMenuActive: store.mobileMenuActive,
    akcia:store.data_akcia,
    lang:store.lang,

});
const dispatch = dispatch => ({
    toggleNavMenu: newState => {
        dispatch({type: 'TOGGLE_NAV_MENU', payload: newState});
    },
    toggleUserInfo: newState => {
        dispatch({type: 'TOGGLE_USER_INFO', payload: newState});
    },
    changeMenuType: newState => {
        dispatch({type: 'CHANGE_MENU_TYPE', payload: newState});
    },
    activeMenu: newState => {
        dispatch({type: 'ACTIVE_MENU', payload: newState});

    },
    toggleMobileMenu: newState => {
        dispatch({type: 'TOGGLE_MOBILE_MENU', payload: newState});
    },
    changeAkciaInfo : newState => {
        dispatch({type:'CHANGE_AKCIA_INFO',payload:newState});
    },
    setPromoStatus : newState => {
        dispatch({type:'SET_PROMO_STATUS',payload:newState});
    },
});

export default connect(
    state,
    dispatch
)(Upgrate_to_pro);