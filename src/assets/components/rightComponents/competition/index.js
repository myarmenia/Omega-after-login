import React, { Component } from 'react';
import {connect} from 'react-redux';
import './style/index.css';

class Competition extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fighter: null,
      toggleDeadline: false,
    }
  }
  componentWillMount = () => {
    document.addEventListener('keydown', this.disableF12);
  }
  componentWillUnmount = () => {
    document.removeEventListener('keydown', this.disableF12);
  }
  

  componentDidMount = () => {
    this.getFighter();    
  }

  getFighter=()=>{
    let {userProfile} = this.props;  
    let user_id = userProfile.uid; // '5c8b876d2e4579.71915304'
    //console.log('this.props.userProfile ========================================', userProfile);
    

    let token = '#ocf2019$';
    let body =`user_id=${user_id}&token=${token}`;
    fetch(`https://omegacoding.com/codefight2019/fightlogic.php`,{
        method:'POST',
        headers:{"Content-type":"application/x-www-form-urlencoded",'Accept':'application/json'},
        body: body
    }).then(response => response.json())
    .then(response => {
      //console.log(response);
      this.setState({fighter: response});
      this.props.setFighter(response);
    })
    .catch(error => console.error('Error:', error));
  
  }

  disableRightClick=()=> {
    window.oncontextmenu = function () {
      return false;
    }
  }

  disableF12 = (event) => {
    event = (event || window.event);
    let {fighter} = this.state;
    let {not_valid, not_expired} = fighter;
    if((fighter && not_valid) || (fighter && !not_expired)) {
        if (event.keyCode == 123) {
          event.preventDefault();
         // console.log('press F12')
        }
    }   
  }


  componentWillReceiveProps = (nextProps) => {
    let {fighterData} = nextProps;
  //  console.log('componentWillReceiveProps---> ',fighterData)
    this.setState({fighter: fighterData})
  }
  

  fixTotalPoints=()=>{
    let {userProfile} = this.props;
    let user_id = userProfile.uid; //  '5c8b876d2e4579.71915304';
    let token = '#ocf2019_finish$';
    let body =`user_id=${user_id}&token=${token}`;
    fetch(`https://omegacoding.com/codefight2019/fightlogic.php`,{
        method:'POST',
        headers:{"Content-type":"application/x-www-form-urlencoded",'Accept':'application/json'},
        body: body
    }).then(response => response.json())
    .then(response => {
      //console.log(response);
      this.setState({fighter: response});
      this.props.setFighter(response);
    })
    .catch(error => console.error('Error:', error));

  }

  toggleDeadline=()=>{
    this.setState({toggleDeadline: ! this.state.toggleDeadline})
  }


  render() {
    let {fighter} = this.state;
    let showContest = true;
    if (fighter && fighter.is_participant && showContest) {
      let {not_valid, not_expired} = fighter;
      
      //console.log('not_valid------------', not_valid);
      //console.log('not_expired------------', not_expired);

      let [displayNotValid , displayTimer , displayFinish] = Array(3).fill({display:'none'});      

      if (not_valid) {
        displayNotValid = {display:'block'}
        this.disableRightClick();        
      }else{
        if (not_expired) {          
          displayTimer = {display:'flex'}
        }else{
          displayFinish = {display:'block'}
          this.disableRightClick();
        }
      }

      let showDeadline = 'none'
      let {toggleDeadline} = this.state;
      if (toggleDeadline) {
        showDeadline = 'flex'
      }
      
      return (
        <div className="contest">
          
          <div className="ocf-not-valid" style={displayNotValid}>
            <div className="not-valid-txt">
              For participation, please validate your {fighter.fighter_info.email} email address then try again!
            </div>
          </div>
          
          <div className="ocf-timer-wrap" style={displayTimer}>
          <button onClick={this.toggleDeadline} className="deadline-btn">My Deadline</button>
            <div className="ocf-timer" style={{display:showDeadline}}>            
              <div className="dedline">
                <span className="cd-1"> Contest deadline </span> 
                <span className="cd-2">{fighter.fighter_info.stop_date}</span>
              </div>
              <div className="my-rating" title="Show My Position">
                <a href="https://omegacoding.com/codefight2019/ratings.php" target="_blank">
                  <i className="material-icons" id="3">star_half</i>
                </a>              
              </div>
            </div>
          </div>
          <div className="ocf-finish" style={displayFinish}>
            <div className="dear-fighter">Dear Fighter!</div>
            <div className="has-finised">OmegaCodeFight2019 has finished.</div>
            <div className="finish-thanks">
              We thank you for your participation and we hope that your results will satisfy you.
              A general list of competition results can be seen on 
              <a href="https://omegacoding.com/codefight2019/ratings.php" target="_blank"> Ratings </a> page.
            </div>
            <div className="ocf-finish-btn-wrap">
              However, if you want to continue learn with us, click the button below.
              <div className="ocf-finish-btn"  onClick={this.fixTotalPoints}>Finish</div>
            </div>
          </div>
        </div>
      )
      
    }
    else{
      return false;
      if (!fighter) {
        return <div>no fighter</div>
      }else if(!fighter.is_participant) {
        return <id>is_not_participant</id>
      }
    }
    
    
  }
}

const state = store => ({
  menuState: store.menu,
  userInfoState: store.userInfo,
  userProfile: store.userProfileData,
  mobileMenu: store.mobileMenu,
  mobileMenuActive: store.mobileMenuActive,
  lang:store.lang,
  akcia:store.data_akcia,
  fighterData: store.fighterData
});

const dispatch = dispatch => ({
  setFighter: action => dispatch({type: 'UPDATE_FIGHTER', payload:action})
});

export default connect(state, dispatch) (Competition);