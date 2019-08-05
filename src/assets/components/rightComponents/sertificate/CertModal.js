import React from "react";
import "./CertModal.css";
import { FacebookShareButton, FacebookShareCount, FacebookIcon} from 'react-share';


let dgTitle = "";
let dgBody = "";
let DgButton = "";
let DgCloseButton = "";
let modal = "";
let FbShare = "";
let testfast = "";


class CertModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      sendBy: false,
      togglehandleMail : false,
      cert_url: '',
    };
  }


  componentWillMount() {

    console.log('--------------------- certModal Will-Mount ---------------------------');
    const NonButton = () => <span />;

    const MailButton = () => {
      let togglehandleMail = this.state.togglehandleMail;
      if(togglehandleMail) {
        return (
          <button className="modal-btn action-btn" onClick={this.handleMail}>
            Send
          </button>
        );
      }else {
        return (
          <button className="modal-btn action-btn" disabled>
            Send
          </button>
        );
      }

    };

    const FbButton = () => {
      // {shareUrl, title}
      // let shareUrl = 'https://omegacoding.com/qualification/forshow/5bd414c1d433d1.73142038.png';
      let shareUrl = this.state.cert_url;
      const title = 'Omegacoding.com';
      console.log(shareUrl);
      console.log(title);
      // <button className="modal-btn share-btn" onClick={this.handleShare}>
      //   Share
      // </button>
      return (
        <span className="share-container" onClick={this.handleShare}>
          <FacebookShareButton
            url={shareUrl}
            quote={title}
            className="Demo__some-network__share-button">
            <FacebookIcon
              size={37}
              rect />
          </FacebookShareButton>
          <FacebookShareCount
            url={shareUrl}
            className="Demo__some-network__share-count">
            {count => count}
          </FacebookShareCount>
        </span>
      );
    }

    const PostButton = () => {
      return (
        <button className="modal-btn action-btn" onClick={this.handlePost}>
          Get Certificate
        </button>
      );
    };

    DgCloseButton = () => {
      return (
        <button className="modal-btn close-btn" onClick={this.handleClose}>
          Close
        </button>
      );
    };
    const courseName = this.props.courseName;
    console.log(courseName);

    switch (courseName.toLowerCase()) {
      case "html":
        dgTitle = "HTML Certificate";
        dgBody = "To get Your certificate, please share on Facebook, after that click on the 'Send' button then check your email.";
        FbShare = FbButton;
        DgButton = MailButton;
        break;
      case "css":
        dgTitle = "CSS Certificate";
        dgBody = "CSS Body textContent. sending By Mail";
        DgButton = MailButton;
        break;
      case "bootstrap":
        dgTitle = "Bootstrap Certificate";
        dgBody = "Bootstrap Body textContent. seinding by Mail";
        DgButton = MailButton;
        break;
      case "javascript":
        dgTitle = "Javascript Congrads!";
        dgBody =
          "Javascript Body textContent. After JQuery, you will be able to get FRONT-END Certificate";
        DgButton = NonButton;
        break;
      case "jquery":
        dgTitle = "Front-End Ceritficate";
        dgBody =
          'JQuery Body textContent. Push the "get Certificate" button to get FRONT-END cert';
        DgButton = PostButton;
        break;
      case "php":
        dgTitle = "PHP Congrads!";
        dgBody =
          "PHP Body textContent. After MySQL you will be able to get BACK-END Certificate";
        DgButton = NonButton;
        break;
      case "mysql":
        dgTitle = "BACK-END Certificate";
        dgBody =
          'MySQL Body textContent. Push the "get Certificate" button to get BACK-END Certificate';
        DgButton = PostButton;
        break;
      case "reactjs":
        dgTitle = "ReactJS Certificate";
        dgBody =
          'React Body textContent. Push the "get Certificate" button to get ReactJS certificate';
        DgButton = PostButton;
      default:
        dgTitle = "Default title";
        dgBody = "Default Body textContent";
        DgButton = "";
        break;
    }
  }


  handleShare=()=> {
    console.log('user pushed button share on FacebookShareButton');
    this.setState({
      togglehandleMail: true,
    });

  }


  handleMail = () => {
    this.setState({ sendBy: "mail" });
    var procMsg = document.getElementsByClassName('modal-proccess-msg')[0];
    console.log(procMsg);
        procMsg.textContent = `Loading ...`;

    var course_name = this.props.courseName;
    var userId = this.props.uid;

    var dashed_course_name = 'zaven';
    switch (course_name.toLowerCase()) {
        case 'javascript':
          dashed_course_name = 'java_script';
          break;
        case 'angularjs':
          dashed_course_name = 'angular_js';
          break;

        default:
          dashed_course_name = course_name;
          break;
    }
    // console.log('dashed_course_name: ', dashed_course_name);
    // console.log('course_name: ', course_name);
    // console.log('userId: ', userId);
    let query_string = '?unique_id='+userId+'&'+'course_name='+dashed_course_name+'';
    let url = 'https://omegacoding.com/qualification/gmailSMTP.php'+query_string;
    console.log(url);
    fetch(url)
    .then((resp) => resp.json())
    .then((data)=> {
        //console.log(data);
        if (data.saved_into_important && data.sql_query)
        {
            console.log(data);
            procMsg.textContent = `Your ${course_name} certificate was sent`;
        }
    })
    .catch(function(error) {
      console.log(error);
    });

  };

  handlePost = () => {
    this.setState({ sendBy: "post" });
  };

  handleClickOpen = () => {
    //this.setState({ open: true });
    // get certificate-image-link for sharing on Facebook
    modal = document.getElementsByClassName("modal-wrap")[0];
    modal.classList.toggle("visible");

    var course_name = this.props.courseName;
    var userId = this.props.uid;
    let query_string = '?unique_id='+userId+'&'+'course_name='+course_name+'';
    let url = 'https://omegacoding.com/qualification/prepare_to_share.php'+query_string;
    console.log(url);
    fetch(url)
    .then((resp) => resp.json())
    .then((data)=> {
        //console.log(data);
        if (data.cert_url)
        {
            console.log(data);
            // Cert_URL = data.cert_url;
            this.setState({
              cert_url: data.cert_url,
            });
        }
    })
    .catch(function(error) {
      console.log(error);
    });

  };

  handleClose = () => {
    modal = document.getElementsByClassName("modal-wrap")[0];
    modal.classList.remove("visible");
  };

  render() {
    // console.log(this.state.open);
    console.log('sendBy: ', this.state.sendBy);
    /*

    <div className="modal-wrap">
      <div className="modal-container">
        <div className="modal-header">
          <h3 className="modal-title">{dgTitle}</h3>
          <button className="close-modal" onClick={this.handleClose}>
            &times;
          </button>
        </div>
        <div className="modal-content">
          <h3>Certificate info</h3>
          <p>{dgBody}</p>
        </div>
        <div className="modal-footer">
          <p>
            <DgButton />
            <DgCloseButton />
          </p>
          <p>Omegacoding.com</p>
        </div>
      </div>
    </div>

    */

    // shareUrl={shareUrl} title={title}

    return (
      <div className="cert-dialog-container">
        <span onClick={this.handleClickOpen} className="open-modal-msg">
          See your achievements on this course!
        </span>

        <div className="modal-wrap">
          <div className="modal-container">
            <div className="modal-header">
              <h2 className="modal-title-cert">{dgTitle}</h2>
              <button className="close-modal" onClick={this.handleClose}>
                &times;
              </button>
            </div>
            <div className="modal-content-cert">
              <h3>Congratulations!</h3>
              <p>{dgBody}</p>
            </div>
            <div className="modal-footer">
              <p className="modal-proccess-msg"></p>
              <div>
                <FbShare />
                <DgButton />
                <DgCloseButton />
              </div>
              <p>Omegacoding.com</p>
            </div>
          </div>
        </div>

      </div>
    );
  }
}

export default CertModal;
