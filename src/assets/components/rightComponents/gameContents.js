
import React, {Component } from 'react';

const styles = {
    headline: {
        fontSize: 24,
        paddingTop: 16,
        marginBottom: 12,
        fontWeight: 400,
        color: 'rgb(0, 188, 212)'
    },
    slide: {
        padding: 10,
    },
};

class GameContent extends Component {
    constructor() {
        super();
        this.state = {
            slideIndex: 0,
        };
    }



    render(){
        let data=this.props.gameCount;
        console.log(data,"datan a");
        return(
            <div className="gameTabs" >
                <h2 style={styles.headline}>GAmes - {data}</h2>
                <div className="infoGame">
                    <div className="gamecontent">
                    </div>
                </div>
            </div>
        )
    }
};

export default GameContent;