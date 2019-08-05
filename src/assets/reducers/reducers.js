import { stat } from "fs";


const gameInfo = (state={}, action) =>{

    if(action.type === 'SET_GAME_INFO'){
        state = action.payload;
        return state;
    }
    return state;
}
export {gameInfo};
const pageLanguage = (state='eng', action) =>{

    if(action.type === 'CHANGE_PAGE_LANGUAGE'){
        state = action.payload;
        return state;
    }
    return state;
}
export {pageLanguage};
const old_points = (state=0, action) =>{

    if(action.type === 'GET_USER_OLD_POINTS'){
        state = action.payload;
        return state;
    }
    return state;
}
export {old_points};
const adding_comment = (state='', action) =>{

    if(action.type === 'ADD_COMMENT'){
        state = [...state, action.payload];
        return state;
    }
    if(action.type === 'REMOVE_CURRENT_COMMENT'){
        state = action.payload;
        return state;
    }
    return state;
}
export {adding_comment};


let akcia_info = {
   active:false
};

const akcia = (state = akcia_info, action) =>{

    if(action.type === 'ADD_AKCIA_INFO'){
        state = {... action.payload};
        return state;
    }

    if(action.type === 'CHANGE_AKCIA_INFO'){
        state = {...state, error: action.payload.error, active: action.payload.active};
        return state;
    }


    return state;
}
export {akcia};
const menuReducer = (state = false,action) =>{
    if(action.type === 'TOGGLE_NAV_MENU'){
        state = action.payload;
        return state;
    }
    return state;
};

export {menuReducer};

const userInfoReducer = (state = false,action) =>{
     if(action.type === 'TOGGLE_USER_INFO'){
         state = action.payload;
         return state;
     }
     return state;
};
export {userInfoReducer};
const priceTable = (state = false,action) =>{
     if(action.type === 'TOGGLE_PRICE_TABLE'){
         state = action.payload;
         return state;
     }
     return state;
};
export {priceTable};
const upgrate_to_pro = (state = false,action) =>{
    if(action.type === 'TOGGLE_UPGRATE_PRO'){
        state = action.payload;
        return state;
    }
    return state;
};
export {upgrate_to_pro};
const priceCoins = (state = '',action) =>{
     if(action.type === 'TOGGLE_COINS_FIRST_MODAL'){
         state = action.payload;
         return state;
     }
     return state;
};
export {priceCoins};
const receivedCoins = (state = '',action) =>{
     if(action.type === 'PUT_COINS'){
         state = action.payload;
         return state;
     }
     return state;
};
export {receivedCoins};
const course_stars = (state = [],action) =>{
     if(action.type === 'CHNAGE_COURSE_STARTS'){
         state =action.payload;
         return state;
     }
     return state;
};

export {course_stars};

const lockerVideo = (state = 0, action) =>{
    if(action.type === 'OPEN_CLOSE_LESSONS'){
        state = action.payload;
        return state;
    }
    return state;
};

export {lockerVideo};
const courseName = (state = 'html', action) =>{
    if(action.type === 'SET_COURSE_NAME'){
        state = action.payload;
        return state;
    }
    return state;
};

export {courseName};


const currentLevel = (state = '', action) =>{
    if(action.type === 'SET_COURSE_LEVEL'){
        state = action.payload;
        return state;
    }
    return state;
};

export {currentLevel};

/* <<<--- for home-panel */
const courseCodes = (state = {}, action) =>{
    if(action.type === 'SET_CODES'){
        state = action.payload;
        return state;
    }
    return state;
};
export {courseCodes};

const clickedLevel = (state='', action) => {
    if(action.type === 'SET_CLICKED_LEVEL') {
        state = action.payload;
        return state;
    }
    return state;
}
export {clickedLevel};

const taskLink = (state = '', action) => {
    if(action.type === 'SET_TASK_LINK') {
        state = action.payload;
        return state;
    }
    return state;
}
export {taskLink};

const taskId = (state = '0', action) => {
    if(action.type === 'SET_TASK_ID') {
        state = action.payload;
        return state;
    }
    return state;
}
export {taskId};


const lessonVideo = (state = '', action) => {
    if(action.type === 'SET_LESSON_VIDEO') {
        state = action.payload;
        return state;
    }
    return state;
}
export {lessonVideo};

/* for home-panel -->>> */

/* for competition -->>> */
const fighterData = (state = '', action) => {
    if(action.type === 'UPDATE_FIGHTER') {
        state = action.payload;
        return state;
    }
    return state;
}
export {fighterData};


/* for play from unity-menu -->>>> */
const getUnityDesktop = (state = '', action) => {
    if (action.type === 'GET_UNITY_DESKTOP') {
        state = action.payload;
        return state;
    }
    return state;
}
export {getUnityDesktop};


const userProfileInfo = (state = {trial_over:false, trial_days:'', trial_text:''  },action) =>{

    if(action.type === 'ADD_USER_INFO'){
        state.profile = action.payload.name+' '+action.payload.last_name;
        state.firstname = action.payload.name;
        state.lastname = action.payload.last_name;
        state.uid =action.payload.uid;
        state.userImg =action.payload.picture;
        state.coins =action.payload.coins;
        state.diamonds =action.payload.diamonds;
        state.demo_alph =action.payload.demo_alph;
        state.demo_mario =action.payload.demo_mario;
        state.demo_note =action.payload.demo_note;
        state.demo_puzzle =action.payload.demo_puzzle;
        state.off_level =action.payload.officelevel;
        state.curse_name =action.payload.cname;
        state.course_lift =action.payload.course_lift;
        state.status =action.payload.status;
        state.pro_date =action.payload.pro_date;
        state.login_date =action.payload.login_date;
        state.ipay_date =action.payload.ipay_date;
        state.country_data =action.payload.country_data;
        state.created_at=action.payload.created_at;
        state.job_order_id=action.payload.project_order_id;
        state.html_trial=action.payload.html_trial;
        state.have_promo=action.payload.have_prom_code;
        state.have_prom_code=action.payload.have_prom_code;
        state.created_at_full=action.payload.created_at_full;

        return state;
    }
    if(action.type === 'TRIAL_DAYS_OVER'){

        return {...state, trial_days:action.payload};
    }
    if(action.type === 'SET_PROMO_STATUS'){

        return {...state, have_promo:action.payload};
    }
    if(action.type === 'SHOW_TRIAL_TEXT'){

        return {...state, trial_text:action.payload};
    }
    if(action.type === 'CHANGE_TRIAL_DAYS'){

        return {...state, trial_over:action.payload};
    }
    if(action.type === 'HTML_TRIAL_DAYS'){

        return {...state, html_trial:action.payload};
    }
    if(action.type === 'ADD_USER_DIAMONDS'){

      return {...state, diamonds:action.payload};
    }
    if(action.type === 'ADD_USER_COINS'){

        return {...state, coins:action.payload};
    }
    if(action.type === 'PLAY_DEMO_NOTEP'){
        return {...state, demo_note:action.payload};
    }
    if(action.type === 'CHANGE_USER_STATUS'){
        return {...state, status:action.payload.status};
    }
    if(action.type === 'CHANGE_USER_OFFICE_LEVEL'){
         // state.course_lift =action.payload.course_lift;
          state.off_level =action.payload.off;
          state.curse_name =action.payload.course;
        return state;
    }
    if(action.type === 'CHANGE_DIAMONDS'){

        return {...state, diamonds:action.payload};
    }
    if(action.type === 'CHANGE_CREATED_AT_DATE'){

        return {...state, created_at:action.payload};
    }
    return state;
};

export {userProfileInfo};

const pageReducer = (state = '', action) =>{
    if(action.type === 'CHANGE_PAGE'){
        state = action.payload;
        return state;
    }
    return state;
};
export {pageReducer};



const changedDiamonds = (state = false, action) =>{
    // if(action.type === 'CHANGE_DIAMONDS'){
    //     state = action.payload;
    //     return state;
    // }
   return state;
};

export {changedDiamonds};
const menuActive = (state = false,action) =>{
    if(action.type === 'ACTIVE_MENU'){
        state = action.payload;
        return state;
    }
    return state;
};

export {menuActive};
const menuHideRestore = (state = false,action) =>{
    if(action.type === 'ACTIVE_MENU'){
        state = action.payload;
        return state;
    }
    return state;
};

export {menuHideRestore};
const currentLesson = (state = 'levels',action) =>{
    if(action.type === 'CURRENT_SUB_MENUE'){
        state = action.payload;
        return state;
    }
    return state;
};

export {currentLesson};
const unityLink = (state = '',action) =>{
    if(action.type === 'GET_UNITY_LINK'){
        state = action.payload;
        return state;
    }
    return state;
};

export {unityLink};

const editableTabReducer = (state = 0,action) =>{
    if(action.type === 'CHANGE_TABS'){
        state = action.payload;
        return state;
    }
    return state;
};
export {editableTabReducer};

const editableGameTabReducer = (state = 0 ,action) =>{
    if(action.type === 'CHANGEGAME_TABS'){
        state = action.payload;
        return state;
    }
    return state;
};
export {editableGameTabReducer};

const  replayGame =(state = false, action) =>{
    if(action.type === 'REPLAY_GAME'){
        state = action.payload;
        return state;
    }
    return state;
};
export {replayGame};

const  gotoGameList =(state = '1000', action) =>{
    if(action.type === 'GOTO_GAMELIST'){
        state = action.payload;
        return state;
    }
    return state;
};
export {gotoGameList};

const  getGameId =(state = 0, action) =>{
    if(action.type === 'GET_GAMELID'){
        state = action.payload;
        return state;
    }
    return state;
};
export {getGameId};


const data = {
    login:false,
    imgUrl:''
};

const loginWithFb = (state = data, action) => {
    if(action.type === 'LOGIN_WITH_FB'){
        state = {...state,login:action.payload};
        return state;
    }
    if(action.type === 'GET_FB_IMG_URL'){
        state = {...state,imgUrl:action.payload};
        return state;
    }

    return state;
};

export {loginWithFb}
