import React from 'react';
import ReactDOM from 'react-dom';
import Dashboard from './assets/dashboard';
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import createHistory from 'history/createBrowserHistory'
import {canvas, noCanvas} from './assets/canvas/cavas_bg';
import { ConnectedRouter, routerReducer, routerMiddleware} from 'react-router-redux'
import {
    menuReducer, userProfileInfo, userInfoReducer, pageReducer, editableTabReducer,
    editableGameTabReducer,replayGame,gotoGameList,menuActive,lockerVideo,loginWithFb,getGameId,menuHideRestore,
    currentLesson,changedDiamonds,course_stars,priceTable,priceCoins,receivedCoins,courseName,currentLevel,unityLink,pageLanguage,gameInfo,
    upgrate_to_pro,adding_comment,akcia,courseCodes,clickedLevel,taskLink,lessonVideo,taskId,old_points, fighterData,getUnityDesktop
} from './assets/reducers/reducers';
//import registerServiceWorker from './registerServiceWorker';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { composeWithDevTools } from 'redux-devtools-extension';

const history = createHistory();
const middleware = routerMiddleware(history);
const store = createStore(
    combineReducers({
        menu:menuReducer,
        userInfo:userInfoReducer,
        pageNumber:pageReducer,
        tabs:editableTabReducer,
        router: routerReducer,
        userProfileData:userProfileInfo,
        gametabs:editableGameTabReducer,
        replayGame:replayGame,
        gamelist:gotoGameList,
        activemnu:menuActive,
        videolockercount:lockerVideo,
        fbimage:loginWithFb,
        getGame_Id:getGameId,
        menu_restored:menuHideRestore,
        GotoInsideTrainingmenu:currentLesson,
        currentDiamonds:changedDiamonds,
        Course_Stars:course_stars,
        show_priceTable:priceTable,
        open_CoinsModal:priceCoins,
        receivedCoins:receivedCoins,
        current_courseID:courseName,
        current_courseLevel:currentLevel,
        lang:pageLanguage,
        unityLink:unityLink,
        gameInfo:gameInfo,
        upgrate_to_pro:upgrate_to_pro,
        adding_comment:adding_comment,
        courseCodes:courseCodes,
        clickedLevel: clickedLevel,
        taskLink: taskLink,
        lessonVideo: lessonVideo,
        data_akcia:akcia,
        courseCodes:courseCodes,
        taskId:taskId,
        old_points:old_points,
        fighterData: fighterData,
        getUnityDesktop: getUnityDesktop

    }),
    composeWithDevTools(applyMiddleware(middleware))
);


//registerServiceWorker();


class App extends React.Component {
    state = {
        loading: true
    };



    componentDidMount() {
        setTimeout(() => this.setState({ loading: false }),1000); // simulates loading of data
        canvas();
    }

    render() {

        const { loading } = this.state;

        if(loading) { // if your app get render immediately, remove this block
            return null; // render null when app is not ready
        }

        return (
            <Provider store={store}>
                <ConnectedRouter history={history}>
                    <Dashboard history={history}/>
                </ConnectedRouter>
            </Provider>
        );
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
);
injectTapEventPlugin();