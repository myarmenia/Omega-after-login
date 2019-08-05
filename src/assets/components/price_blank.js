import React, {Component} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import IconButton from 'material-ui/IconButton';
import {connect} from 'react-redux';
import {css} from 'aphrodite/no-important';
import {lang_price_blank,lang_upgratePro_text} from './langs/lang';

let one_diamond = require(`../images/priceTable/onediamond.png`);
let one_coin = require(`../images/priceTable/coin.png`);
let brilliants_chest = require(`../images/priceTable/brilliants_chest.png`);
let brilliants = require(`../images/priceTable/brilliants.png`);
let brilliantss = require(`../images/priceTable/brilliantss.png`);
var last_n = '';
var first_n = '';
var icon= false;
    class PriceBlank extends Component {
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
            resize:''
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

    render() {
        const trans=lang_price_blank[this.props.lang];
        const trans1=lang_upgratePro_text[this.props.lang];
        return (
        <div className="container price">
            <div className="row">

                <div className="col-md-4 col-sm-4 col-xs-12">
                    <div className="pricingTable">
                        <div className="pricingTable-header">
                            <div>

                                <img src={brilliants} alt="diamonds"  style={{width:this.state.resize}} />

                            </div>
                        </div>
                        <div className="price-value">
                                             <span className="amount">
                                                 <img src={one_diamond} alt="diamonds" style={{verticalAlign: 'unset'}}/>
                                                 <span className="currency"/>
                                                  10
                                             <span className="month"> / {trans.coins1} </span>
                                                   </span>
                        </div>

                        {/* <ul className="pricing-content">
                         <li>70 GB Disk Space</li>
                         <li>70 Email Accounts</li>
                         <li>70 GB Monthly Bandwidth</li>
                         <li>20 Subdomains</li>
                         <li>25 Domains</li>
                         </ul>*/}
                     {/*   <a href={`https://test.paymentgate.ru/ipaytest/rest/register.do?orderNumber=N-${Math.floor((Math.random() * 100) + 1)}-${this.props.userProfile.uid}&userName=nver_test&password=fPpnStQg&amount=100&currency=051`} className="pricingTable-signup">Buy Now</a>
            */}

             <a href={`https://omegacoding.com/android_test/regular.php?orderNumber=N${Math.floor((Math.random() * 1000) + 1)}-${this.props.userProfile.uid}&clientID=${this.props.userProfile.uid}&dms=1`} className="pricingTable-signup">
                 <span className="currency">$ 1 </span> {trans.pay}</a>
                    </div>
                </div>
                <div className="col-md-4 col-sm-4 col-xs-12">
                    <div className="pricingTable">
                        <div className="pricingTable-header">
                            <div>
                                <img src={brilliantss} alt="diamonds"  style={{width:this.state.resize}}/>

                            </div>
                        </div>
                        <div className="price-value">
                                             <span className="amount">
                                                 <img src={one_diamond} alt="diamonds" style={{verticalAlign: 'unset'}}/>
                                             <span className="currency"/>
                                             30
                                             <span className="month"> / {trans.coins2}</span>
                                                   </span>
                        </div>
                        {/* <ul className="pricing-content">
                         <li>70 GB Disk Space</li>
                         <li>70 Email Accounts</li>
                         <li>70 GB Monthly Bandwidth</li>
                         <li>20 Subdomains</li>
                         <li>25 Domains</li>
                         </ul>*/}
                        <a href={`https://omegacoding.com/android_test/middle.php?orderNumber=N${Math.floor((Math.random() * 1000) + 1)}-${this.props.userProfile.uid}&clientID=${this.props.userProfile.uid}&dms=1`} className="pricingTable-signup">
                            <span className="currency">$ 10 </span> {trans.pay}</a>

                    </div>
                </div>
                            <div className="col-md-4 col-sm-4 col-xs-12">
                                <div className="pricingTable">
                                    <div className="pricingTable-header">

                                        <div>
                                        <img src={brilliants_chest} alt="diamonds"  style={{width:this.state.resize}}/>
                                           
                                        </div>

                                    </div>
                                    <div className="price-value">
                                             <span className="amount">
                                                 <img src={one_diamond} alt="diamonds" style={{verticalAlign: 'unset'}}/>
                                             <span className="currency"/>
                                           50
                                             <span className="month"> / {trans.coins3}</span>
                                             </span>
                                    </div>
                                   {/* <ul className="pricing-content">
                                        <li>70 GB Disk Space</li>
                                        <li>70 Email Accounts</li>
                                        <li>70 GB Monthly Bandwidth</li>
                                        <li>20 Subdomains</li>
                                        <li>25 Domains</li>
                                    </ul>*/}
                                    <a href={`https://omegacoding.com/android_test/premium.php?orderNumber=N${Math.floor((Math.random() * 1000) + 1)}-${this.props.userProfile.uid}&clientID=${this.props.userProfile.uid}&dms=1`} className="pricingTable-signup">
                                        <span className="currency">$ 30 </span> {trans.pay}</a>

                                </div>
                            </div>

                <div  className="col-md-12 col-sm-12 col-xs-12" style={{paddingTop: '48px'}}>
                    <a href="https://omegacoding.com/terms"  target="_blank" className="terms">{trans1.terms}</a>
                </div>
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
    }
});

export default connect(
    state,
    dispatch
)(PriceBlank);