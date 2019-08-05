import React, { PureComponent } from 'react';
import '../../styles/games.css';
import GameTabs from './gameTabs';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';



class Games extends PureComponent{
    constructor(){
        super();
        this.state = {
        gameData: []
        };

    }


    componentWillMount(){

        fetch('https://omegacoding.com/android_test/game.json')
            .then( response => response.ok ? response.json(): "Something went wrong")
            .then( response => {
               // console.log(response,"response");
                this.setState({
                    gameData:response
                })
            });
    }



    render(){
       // console.log( this.state.gameData,"this.state.gameData");
        return(
            <div className="gamesContainer">
                <MuiThemeProvider>
                <GameTabs />
                </MuiThemeProvider>
            </div>
        )
    }
}

export default Games;