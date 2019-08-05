import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { connect } from 'react-redux';
import '../../styles/editProfile.css';
import AvatarCropper from "react-avatar-cropper";
import Cookies from 'universal-cookie';
import Refund_form from './refund_form';

const cookies = new Cookies();
let refund=require(`../../images/refund.png`);

class Edit extends Component {
    constructor(){
        super();
        this.state = {
            firstName:'',
            lastName:'',
            email:'',
            oldPassword:'',
            newPassword:'',
            confirmPassword:'',
            firstNameError:'',
            lastNameError:'',
            emailError:'',
            oldPasswordError: '',
            newPasswordError: '',
            confirmPasswordError: '',
            cropperOpen: false,
            img: '',
            newImg:'',
            img1:'',
            name:'',
            croppedImg: '',
            show_refund:false,
            days:'',
            percent:''
        }
    }

    hide_black=()=>{
        this.setState({show_refund:false})
    }
    getFirstName = (event) => {
        this.setState({firstName:event.target.value});

    };
    getLastName = (event) => {
        this.setState({lastName:event.target.value});
    };
    getEmail = (event) => {
        this.setState({email:event.target.value});
    };
    getOldPassword = (event) => {
        this.setState({newPasswordError:'',confirmPassword:''});
        this.setState({oldPassword:event.target.value});
    };
    getNewPassword = (event) => {
        this.setState({newPasswordError:'',confirmPassword:''});
        this.setState({newPassword:event.target.value});
    };
    confirmPassword = (event) => {
        this.setState({newPasswordError:'',confirmPassword:''});
        this.setState({confirmPassword:event.target.value});
    };

    changeTabs = () => {
        if(this.props.editableTab === 0){
            console.log("000");
            this.props.changeEditableTab(1)
        }
        else{
            console.log("1");
            this.props.changeEditableTab(0)
        }
    };
    blurName = () =>{
        if(this.state.firstName === ''){
            this.setState({
                firstNameError:"* This field can't be an empty"

            })
        }

    };
    blurLastName = () =>{
        if(this.state.lastName === ''){
            this.setState({
                lastNameError:"* This field can't be an empty"

            })
        }

    };

    blurOldPassword = () =>{
        let uId = this.props.userProfile.uid;
        let oldpassword = `id=${encodeURI(uId)}&old_password=${encodeURI(this.state.oldPassword)}`;
        console.log(oldpassword);
        fetch(`https://omegacoding.com/android_test/updateUser.php`,{
            method:'POST',
            headers:{"Content-type":"application/x-www-form-urlencoded",'Accept':'text/html'},
            body:oldpassword
        }).then(response =>
        { if(response.ok){
            return response.json();
        }}).then(response => {
            if (!response){
                //console.log(response,"response");
                this.setState({
                    oldPasswordError: this.props.lang === 'eng'?'* The old password is wrong.Try again.':
                        '* Հին գաղտնաբառը սխալ է: Կրկին փորձեք:'
                })
            }


        }).catch(error => {
            console.log(error,'error');
        })

    };

    saveChanges = () => {
        let uId = this.props.userProfile.uid;
        let user = '';
        if (this.props.editableTab === 0) {
            if (this.state.firstName.length) {
                if (this.state.lastName.length) {
                    let user;
                    if (this.state.newImg !== ''){

                        user = `name=${encodeURI(this.state.firstName)}&last_name=${encodeURI(this.state.lastName)}&id=${encodeURI(uId)}&img=${encodeURI(this.state.newImg)}`;

                    }
                    else{
                        user = `name=${encodeURI(this.state.firstName)}&last_name=${encodeURI(this.state.lastName)}&id=${encodeURI(uId)}`;
                    }



                    console.log(user, "user");
                    fetch(`https://omegacoding.com/android_test/updateUser.php`,{
                        method:'POST',
                        headers:{"Content-type":"application/x-www-form-urlencoded",'Accept':'text/html'},
                        body:user
                    }).then(response =>
                    { if(response.ok){
                        return response.json();
                    }}).then(response => {
                        if (response){
                          window.location.href = "https://omegacoding.com/dashboard";

                        }


                    }).catch(error => {
                        console.log(error,'error');
                    })

                }
                else {
                    this.setState({lastNameError:'Fill this field'});
                }
            }
            else {
                this.setState({firstNameError:'Fill this field'});
            }
        }
        else{
            if(this.state.oldPassword !== '' ){

                if(this.state.newPassword.length > 5){
                    if(this.state.confirmPassword === this.state.newPassword){
                        user = `id=${uId}&new_password=${encodeURI(this.state.newPassword)}`;
                        console.log(user);

                        fetch(`https://omegacoding.com/android_test/updateUser.php`,{
                            method:'POST',
                            headers:{"Content-type":"application/x-www-form-urlencoded",'Accept':'text/html'},
                            body:user
                        }).then(response =>{
                            //  console.log(response,'!json');


                            if(response.ok){
                                return response.json();

                            }}).then(response => {
                            if (!response.error){
                                window.location.href = "https://omegacoding.com/dashboard";
                            }
                        }).catch(error => {
                            console.log(error,'error 1111');
                        })
                    }
                    else {
                        this.setState({confirmPasswordError: this.props.lang === 'eng'?'Please confirm your new password':
                            'Խնդրում ենք հաստատել ձեր նոր գաղտնաբառը'});
                    }
                }
                else {
                    this.setState({newPasswordError: this.props.lang === 'eng'?'Password is too short(Min. 6 symbols)':
                        'Գաղտնաբառը չափազանց կարճ է (նվազագույնը 6 նիշ)'});
                }

            }
            else{
                this.setState({oldPasswordError: this.props.lang === 'eng'?'Please enter your old password':
                    'Խնդրում ենք մուտքագրել ձեր հին գաղտնաբառը'});
            }

        }

    };



    handleRequestHide =()=> {
        this.setState({
            cropperOpen: false
        });
    };
    changeLang = (e) => {
        this.props.changePageLang(e.target.id);
        let d = new Date();
        d.setTime(d.getTime() + (43200*60*1000));
        let value=e.target.id;
        cookies.set( 'lang', value, { path: '/', expires: d, domain: '.omegacoding.com', });


    };

    refund =()=>{

        let uId = this.props.userProfile.uid;
        let data = `uid=${encodeURI(uId)}`;
       console.log(data,"datarefundrefundrefund");
        fetch(`https://omegacoding.com/android_test/index.php`,{
            method:'POST',
            headers:{"Content-type":"application/x-www-form-urlencoded",'Accept':'text/html'},
            body:data
        }).then(response =>
        { if(response.ok){

            return response.json();
        }}).then(response => {
            console.log(response,'refundrefundrefund');
            if(!response.error){
                let today=new Date();
                let  d = new Date(response.refund_date);
                let one_day=1000*60*60*24;
                console.log(Math.ceil((today.getTime()-d.getTime())/(one_day)),'Math.ceil((today.getTime()-d.getTime())/(one_day))refundrefundrefund');
                if(Math.ceil((today.getTime()-d.getTime())/(one_day))<=3){
                        this.setState({
                            days:3,
                            percent:'100%'
                        })
                }
                else if(Math.ceil((today.getTime()-d.getTime())/(one_day))<=7){
                    this.setState({
                        days:7,
                        percent:'70%'})
                }
                else{

                    this.setState({
                        days:0,
                        percent:0})

                }

                this.setState({show_refund:true})
            }
        }).catch(error => {
            console.log(error,'error');
        })



    }
    handleCrop =(dataURI)=>{
        this.setState({
            cropperOpen: false,
            img: null,
            croppedImg: dataURI
        });
        console.log(dataURI,"data");
        let uId = this.props.userProfile.uid;
        let imgData = `tmp_url=${dataURI} &type=${encodeURI(this.state.name)} &id=${encodeURI(uId)}`;
        // console.log(imgData,"imgData");
        fetch(`https://omegacoding.com/android_test/uploadpicture.php`,{
            method:'POST',
            headers:{"Content-type":"application/x-www-form-urlencoded",'Accept':'text/html'},
            body:imgData
        }).then(response =>
        { if(response.ok){
            // console.log(response,'rooooooooooonse');
            return response.json();
        }}).then(response => {
            if(!response.error){
               // console.log(response.url,'   response');
                this.setState({
                    newImg: response.url
                })
            }

        }).catch(error => {
            console.log(error,'error');
        })

    };


    handleFileChange =(dataURI, name, value)=>{
        this.setState({
            name:name,
            img:dataURI,
            croppedImg: this.state.croppedImg,
            cropperOpen: true
        });

    };

    componentDidMount() {
        this.setState({
            lastName: this.props.userProfile.lastname,
            firstName: this.props.userProfile.firstname,
            img1: this.props.userProfile.userImg,

        })

    }


    render() {
      // console.log(country_id);
      // console.log(country_svg);


        // console.log(this.props.userProfile.country_data);
        let userCountry = '';
        if(this.props.userProfile.country_data) {
        let country_id =(this.props.userProfile.country_data.country_code).toLowerCase();
        let country_svg = `${country_id}.svg`;
        let country_source = `https://omegacoding.com/android_test/images/flags/4x3/${country_svg}`;

            userCountry = (
                <div className="user-country">
                    <img className="user-country-image" src={country_source} />
                    <span className="user-country-name">{this.props.userProfile.country_data.country_name}</span>
                </div>
            );
        }

        let {fighterData } = this.props;
        let {is_participant} = fighterData;
        let showLangs = 'block';
        if (is_participant) {
            showLangs = 'block'; // none
        }
        console.log('is_participant editprofile -->', is_participant);



        return (
            <div className="editContainer">
                <div className="formContainer">
                    {this.state.show_refund?<span className="animated fadeIn"   style={{ zIndex:this.state.show_refund?99:'', margin: '2vh -10vw',
                        position: 'absolute'}} >
                    <Refund_form days={this.state.days} percent={this.state.percent}/>
                   <div className="price_back" id="blank" style={{top:'0'}} onClick={this.hide_black} ></div>
                </span>:''}
                    <MuiThemeProvider>
                        <div className="uiContainer">
                        <div className='wrap-lang-part'>
                        <div style={{color:'#047294', fontSize:'20px', display:showLangs }} title=""> <span className="header_sprite-global"></span> <span id="arm"  style={{ cursor:'pointer'}} onClick={this.changeLang}> Arm </span> | <span id="eng" style={{ cursor:'pointer'}} onClick={this.changeLang}> Eng </span></div>
                        </div>
                            { this.props.editableTab === 0 &&
                            <span>
                                    <TextField

                                        floatingLabelText={this.props.lang === 'eng'?'First Name':'Անուն'}
                                        type="text"
                                        errorText={this.state.firstNameError}
                                        errorStyle={{color:'darkred'}}
                                        fullWidth={true}
                                        onChange={this.getFirstName}
                                        floatingLabelStyle={{color: 'black'}}
                                        inputStyle={{color: 'black'}}
                                        onBlur={this.blurName}
                                        onFocus={()=>{this.setState({firstNameError:''})}}
                                        value={this.state.firstName}

                                    />
                                    <TextField

                                        floatingLabelText= {this.props.lang === 'eng'?'Last Name':'Ազգանուն'}
                                        type="text"
                                        errorText={this.state.lastNameError}
                                        fullWidth={true}
                                        onChange={this.getLastName}
                                        floatingLabelStyle={{color:'black'}}
                                        inputStyle={{color:'black'}}
                                        value={this.state.lastName}
                                        onFocus={()=>{this.setState({lastNameError:''})}}
                                        onBlur={this.blurLastName}

                                    />

                                </span>
                            }
                            { this.props.editableTab === 1 &&
                            <span>
                                    <TextField
                                        floatingLabelText={this.props.lang === 'eng'?'Old Password':'Հին գաղտնաբառ'}
                                        type="password"
                                        errorText={this.state.oldPasswordError}
                                        fullWidth={true}
                                        onChange={this.getOldPassword}
                                        floatingLabelStyle={{color:'black'}}
                                        inputStyle={{color:'black'}}
                                        onBlur={this.blurOldPassword}
                                        onFocus={()=>{this.setState({oldPasswordError:''})}}

                                    />
                                     <TextField
                                         floatingLabelText= {this.props.lang === 'eng'?'New Password':'Նոր գաղտնաբառ'}
                                         type="password"
                                         errorText={this.state.newPasswordError}
                                         fullWidth={true}
                                         onChange={this.getNewPassword}
                                         onBlur={this.blurNewPassword}
                                         floatingLabelStyle={{color:'black'}}
                                         inputStyle={{color:'black'}}
                                     />
                                    <TextField
                                        floatingLabelText= {this.props.lang === 'eng'?'Confirm Password':'Կրկնել'}
                                        type="password"
                                        errorText={this.state.confirmPasswordError}
                                        fullWidth={true}
                                        onChange={this.confirmPassword}
                                        floatingLabelStyle={{color: 'black'}}
                                        inputStyle={{color: 'black'}}
                                    />
                                </span>
                            }
                            <p onClick={this.changeTabs} className="changeTab">
                                {this.props.editableTab === 0  ?  this.props.lang === 'eng'? 'Edit Password' : 'Խմբագրել գաղտնաբառը':
                                    this.props.lang === 'eng'? 'Edit Public Profile': 'Խմբագրել պրոֆիլը' }
                            </p>

                            <RaisedButton
                                label={this.props.lang === 'eng'?'Save':'Հիշել'}
                                backgroundColor="#0b9bc7"
                                onClick={this.saveChanges}
                                labelStyle={{color:'black'}}
                            />

                        </div>
                    </MuiThemeProvider>
                    <div className='wrap-photo'>                    
                    <div className="avatar-photo">
                    
                        <img src={this.state.croppedImg===''?`https://omegacoding.com/android_test/tmp/${this.state.img1}`: this.state.croppedImg } width="185" alt="avatar" />
                        <FileUpload handleFileChange={this.handleFileChange} />
                        <div className="avatar-edit">
                            <span>Upload new avatar</span>
                            <i className="fa fa-camera"> </i>
                        </div>
                        {userCountry}
                    </div>
                    </div>
                    {this.state.cropperOpen &&

                    <AvatarCropper
                        onRequestHide={this.handleRequestHide}
                        cropperOpen={this.state.cropperOpen}
                        onCrop={this.handleCrop}
                        image={this.state.img}
                        width={185}
                        height={185}
                    />
                    }
                </div>
                {/*
                <div style={{color:'white', fontSize:'20px' }} title=""> <span className="header_sprite-global"></span> <span id="arm"  style={{ cursor:'pointer'}} onClick={this.changeLang}> Arm </span> | <span id="eng" style={{ cursor:'pointer'}} onClick={this.changeLang}> Eng </span></div>
                */}
                <div style={{display:this.props.userProfile.status !== 0 ?'block':'none' }}>
                    <span style={{color:'black',fontSize:'15px'}}>Request refund:</span>
                    <img className="refund-image" src={refund} width="38" title="Request refund"  onClick={this.refund}/>
                </div>
            </div>

       );
    }
}


class FileUpload extends Component {

    handleFile =(e)=> {
        let reader = new FileReader();

        let file = e.target.files[0];

        if (!file) return;

        reader.onload = function(img) {
            ReactDOM.findDOMNode(this.refs.in).value = '';
            this.props.handleFileChange(img.target.result, file.name);
        }.bind(this);
        // console.log(this.refs.in.value,"value");
       // console.log(this.refs.in.name,"namee");
       // console.log(file,"file");

        reader.readAsDataURL(file);


    };

    render() {
        return (
            <input ref="in" type="file"   name="fayl1" accept="image/*" style={{
                position: 'absolute',
                top:'0',
                bottom: '0',
                left: '0',
                right: '0',
                width: '100%',
                height: '100%',
                cursor: 'pointer',
                opacity: '0',
                zIndex: '9'}} onChange={this.handleFile} />
        );
    }
}




const state = store => ({
    editableTab:store.tabs,
    userProfile: store.userProfileData,
    userInfoState:store.userInfo,
    lang:store.lang,
    fighterData: store.fighterData
});


const dispatch = dispatch => ({
    changeEditableTab: newState => dispatch({type:'CHANGE_TABS',payload:newState}),
    changePageLang : newPage => { dispatch({type : 'CHANGE_PAGE_LANGUAGE', payload : newPage})},
});

export default connect(
    state,
    dispatch,
)(Edit);
