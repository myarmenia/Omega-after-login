import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import NoteHtml from './Note';
import NoteCss from './Note_css';
import NoteBoot from './Note_boot';
import NotejQuery from './Note_jquery'

import Demo from './GameDemo_Note';


class Notepad extends PureComponent {
    constructor(props) {
        super();
        this.state = {
            demo:true,
            demo_note:''

        };

    }

    start_game =(e)=>{
        if(!e){
            let oper=7;
            let demo_over = `unique_id=${encodeURI(this.props.userProfile.uid)}&operation=${encodeURI(oper)}&game_type=${encodeURI(1)}`;
            fetch(`https://omegacoding.com/android_test/userProgressManager.php`,{
                method:'POST',
                headers:{"Content-type":"application/x-www-form-urlencoded",'Accept':'application/json'},
                body: demo_over
            }).then(response => {
                if(response.ok){
                  //  console.log(response,"responseresponseresponseresponse");
                 return response.json();
                }
            }).then(response => {
                if(response){
                  this.props.playNoteDemo('1');
                    this.setState({demo:e,
                    });

                }
            }).catch( error => {
                console.log(error,"error");
            });

        }

    };

    render() {

        if(!this.state.demo){
                switch (this.props.course_Name) {
                    case 'HTML':
                        return (
                            <NoteHtml game={this.props.game} count_mark={this.props.count_mark}
                                      self_mark={this.props.self_mark} data={this.props.data}
                                      backTo={this.props.backTo} replayAgain={this.props.replayAgain}
                                      gameID={this.props.gameID}
                                      level_id={this.props.level_id} course_Data={this.props.course_Data}
                                      course_Name={this.props.course_Name} game_over={this.props.game_over}/>
                        )
                        break;
                    case 'CSS':
                        return <NoteCss game={this.props.game} count_mark={this.props.count_mark}
                                        self_mark={this.props.self_mark} data={this.props.data}
                                        backTo={this.props.backTo} replayAgain={this.props.replayAgain}
                                        gameID={this.props.gameID}
                                        level_id={this.props.level_id} course_Data={this.props.course_Data}
                                        course_Name={this.props.course_Name} game_over={this.props.game_over}/>
                        break;
                    case 'BootStrap':
                        return <NoteBoot game={this.props.game} count_mark={this.props.count_mark}
                                         self_mark={this.props.self_mark} data={this.props.data}
                                         backTo={this.props.backTo} replayAgain={this.props.replayAgain}
                                         gameID={this.props.gameID}
                                         level_id={this.props.level_id} course_Data={this.props.course_Data}
                                         course_Name={this.props.course_Name} game_over={this.props.game_over}/>
                        break;
                    case 'jQuery':
                        return <NotejQuery game={this.props.game} count_mark={this.props.count_mark}
                                           self_mark={this.props.self_mark} data={this.props.data}
                                           backTo={this.props.backTo} replayAgain={this.props.replayAgain}
                                           gameID={this.props.gameID}
                                           level_id={this.props.level_id} course_Data={this.props.course_Data}
                                           course_Name={this.props.course_Name} game_over={this.props.game_over}/>
                        break;
                    default:
                        return (<div>
                            <h1>noooooooooooo</h1>
                        </div>)

            }



        }
        else {

            if(this.props.userProfile.demo_note === '1') {

                switch (this.props.course_Name) {
                    case 'HTML':
                        return (
                            <NoteHtml game={this.props.game} count_mark={this.props.count_mark}
                                      self_mark={this.props.self_mark} data={this.props.data}
                                      backTo={this.props.backTo} replayAgain={this.props.replayAgain}
                                      gameID={this.props.gameID}
                                      level_id={this.props.level_id} course_Data={this.props.course_Data}
                                      course_Name={this.props.course_Name} game_over={this.props.game_over}/>
                        )
                        break;
                    case 'CSS':
                        return <NoteCss game={this.props.game} count_mark={this.props.count_mark}
                                        self_mark={this.props.self_mark} data={this.props.data}
                                        backTo={this.props.backTo} replayAgain={this.props.replayAgain}
                                        gameID={this.props.gameID}
                                        level_id={this.props.level_id} course_Data={this.props.course_Data}
                                        course_Name={this.props.course_Name} game_over={this.props.game_over}/>
                        break;
                    case 'BootStrap':
                        return <NoteBoot game={this.props.game} count_mark={this.props.count_mark}
                                         self_mark={this.props.self_mark} data={this.props.data}
                                         backTo={this.props.backTo} replayAgain={this.props.replayAgain}
                                         gameID={this.props.gameID}
                                         level_id={this.props.level_id} course_Data={this.props.course_Data}
                                         course_Name={this.props.course_Name} game_over={this.props.game_over}/>
                        break;
                    case 'jQuery':
                        return <NotejQuery game={this.props.game} count_mark={this.props.count_mark}
                                         self_mark={this.props.self_mark} data={this.props.data}
                                         backTo={this.props.backTo} replayAgain={this.props.replayAgain}
                                         gameID={this.props.gameID}
                                         level_id={this.props.level_id} course_Data={this.props.course_Data}
                                         course_Name={this.props.course_Name} game_over={this.props.game_over}/>
                        break;
                    default:
                        return (<div>
                            <h1>no info</h1>
                        </div>)

                }


            }
            else{
                return(
                    <Demo  for_demo={this.start_game} />
                )
            }

        }
      }
}


const store = state => ({
    gameList: state.gamelist,
    replay: state.replayGame,
    userProfile: state.userProfileData,


});

const dispatch = dispatch => ({
    replay: tabIndex => dispatch({type: 'REPLAY_GAME', payload: tabIndex}),
    playNoteDemo : newState => dispatch({type:'PLAY_DEMO_NOTEP',payload:newState}),
    gotogamelist: tabIndex => dispatch({type: 'GOTO_GAMELIST', payload: tabIndex}),
});

export default connect(
    store,
    dispatch
)(Notepad)
