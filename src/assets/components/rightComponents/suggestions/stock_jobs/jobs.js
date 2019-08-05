import "rc-pagination/assets/index.css";
import React, { Component } from 'react';
import parser from 'fast-xml-parser';
import Table from './table';
import './jobs.css';
import OrderJobs from '../order_jobs/order_jobs';
import JobDescription from '../order_jobs/job_description';
import { trans } from '../langs/strings';
import { connect } from 'react-redux';
import GoogleAdsense from '../../alphabetGame/GoogleAdsense';


// var Pagination = require("rc-pagination");
import Pagination from 'rc-pagination';

const styles = {
  wrapper: {
    margin: '0 auto',
    width: '98%',
    textAlign: 'center',
  },
  p:{
      color: 'black'
  },
  pagination: {
    wrapper: {
      margin: '0 auto',
      textAlign: 'center',
      display: 'flex',
      justifyContent: 'center',
    }
  },
    header: {
        fontFamily: 'Monts-black',
        color: '#2d84b3'
    }
};


class Jobs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      xmlData: null,
      jsonData: null,
      show_more:false,
      currentPage: 1,
      totalRecords: 0,
      pageLimit: 5,
      totalPages: 0,
      currentData: [],
      job_details:''
    };
  }

  componentDidMount() {
    // https://omegacoding.com/terms/feed.xml
    // https://omegacoding.com/stack_jobs/getFeed.php

    fetch("https://omegacoding.com/stack_jobs/getFeed.php")
    .then(resp => resp.text())
    // .then((data) => console.log(data))
    .then(xmlData => {
        if (xmlData) {
          if( parser.validate(xmlData) === true) {
            var jsonData = [];
            var jsonObj = parser.parse(xmlData);
            var jsonItems = jsonObj.rss.channel.item;
            for(var index in jsonItems)  {

               jsonData[index] = jsonItems[index]
               jsonData[index].id = Number(index) + 1;
            }

            var totalRecords = jsonData.length;
            var pageLimit = this.state.pageLimit;
            var totalPages = Math.ceil(totalRecords / pageLimit);
            var currentData = jsonData.slice(0, pageLimit);
            this.setState({ jsonData, totalRecords, totalPages, currentData });
          }
        }else{
          console.log('nop');
        }
    });
  }

  show_more =(e,arr)=>{
    let elem_h2=document.getElementsByClassName("h2")[0];
      elem_h2.innerHTML= trans[this.props.lang].jobs.jobDescription; //"Job Description";
      this.setState({
        show_more:e,
        job_details:arr
      });
  };

  go_back =()=> {
    let elem_h2=document.getElementsByClassName("h2")[0];
      elem_h2.innerHTML= trans[this.props.lang].jobs.jobsAndOrders; //"Jobs and Orders";
      this.setState({
          show_more:false
      });
  };

  onChange = page => {
  console.log(page);
    let pageLimit = this.state.pageLimit;
    let jsonData = this.state.jsonData;
    let currentPage = page;
    let offset = (currentPage - 1) * pageLimit;
    let currentData = jsonData.slice(offset, offset + pageLimit);
   //console.log(currentData,"currentData");
   console.log('jsonData-', jsonData);

    this.setState({
      currentPage,
      currentData
    });
  };

  clickDetector=(clicked)=> {
    console.log(clicked)
  }

  render() {
    let {lang} = this.props;
    let translate = trans[lang];
    console.log(translate);
    
    let {
      jsonData,
       totalRecords,
         currentPage,
          pageLimit,
           currentData
          } = this.state;

    if (jsonData === null) {
      
      return (
        <div style={styles.wrapper}>
          <h2 className="h2" style={styles.header}>{ translate.jobs.jobsAndOrders }</h2>
          <p style={styles.p}>{ translate.jobs.loading }</p>
        </div>
      );
    }
    // console.log('totalPages', totalPages);
    // className="ant-pagination"

    let showIns = 'hidden';
    if (this.props.userProfile.status < 1) {
      showIns = 'visible';
    }

    return (
      <div style={styles.wrapper}>
        <h2 className="h2" style={styles.header}>{ translate.jobs.jobsAndOrders }</h2>
          {
            !this.state.show_more?
            <span>
              <Table currentData = { currentData } current={currentPage} />
              <div style={styles.pagination.wrapper}>
                  <Pagination
                  className="ant-pagination"
                  current={currentPage}
                  total={totalRecords}
                  onChange={this.onChange}
                  showTitle = {false}
                  pageSize = {pageLimit}
                  />          
              </div>

              <div className='gugo-ads-wrap' style={{width:'100%', visibility:showIns}}>
                <GoogleAdsense 
                    dataAdClient='ca-pub-7306442307639605' 
                    dataAdSlot='5592332219' 
                    dataAdFormat = "auto"
                    dataFullWidthResponsive="true"
                    getClicks = {this.clickDetector}
                  />
              </div>

              {  this.props.userProfile.job_order_id !== null?
                  <span>
                  <h2 style={styles.header} >{ translate.jobs.projOrders }</h2>
                      {this.props.pageNumber === 8?<div className="listing-headline_arm">
                          {/*this.props.lang ==='eng'?'Project orders are closed. They will be fully accessible when you finish all the lessons (HTML, CSS, BootStrap) before Javascript.':'Աշխատանքային պրոեկտների առաջարկները  փակ են: Դրանք  հասանելի կլինեն, երբ Դուք ավարտեք բոլոր դասերը (HTML, CSS, BootStrap)` մինչև Javascript: '*/}
                        {translate.jobs.projOrdersAreClosed}
                      </div>: <OrderJobs  show_more={this.show_more}/>}
                  </span>:null
              }
            </span>:
            <JobDescription data={this.state.job_details} go_back={this.go_back} />              
          }
      </div>
    )
  }

}

const  store = state =>({
    userProfile: state.userProfileData,
    lang:state.lang,
    pageNumber:state.pageNumber,
});
const dispatch = dispatch => ({});



export default connect(store,dispatch)(Jobs);
