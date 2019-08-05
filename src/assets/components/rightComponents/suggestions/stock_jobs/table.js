import React, { Component } from 'react';
import { connect } from 'react-redux';
import {trans} from '../langs/strings';

let descObject = {};

class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jsonData: this.props.jsonData,
      spasiError : false,

    };
  }


  htmlDecoder = (html)=> {
  	var txt = document.createElement('textarea');
    txt.innerHTML = html;
    let txtValue = txt.value;
    let txtValue2 = txtValue.replace('/<br />/g','');
    let txtValue3 = txtValue2.replace('/<br>/g','');
    return txtValue3;
  	// return txt.value;
  };

  // htmlAdjacent=(htmlText)=> {
  //   var div = document.createElement('div');
  //   div.insertAdjacentHTML("afterend", htmlText);
  //   return div;
  // }

showDescription=(event)=>{
  let td = event.target;
  let item_id = td.getAttribute('data-item-id')

  let wrapDiv = document.getElementsByClassName('descr-wrap')[0];
  let contentDiv = document.getElementsByClassName('descr-content')[0];
  contentDiv.insertAdjacentHTML("beforeend", descObject[item_id]);
  wrapDiv.style.visibility = 'visible';
}
closeDescription=() => {
  let wrapDiv = document.getElementsByClassName('descr-wrap')[0];
  let contentDiv = document.getElementsByClassName('descr-content')[0];
  contentDiv.textContent = '';
  wrapDiv.style.visibility = 'hidden';
}

  render() {

    let { currentData, lang } = this.props;
    let translate = trans[lang];
    console.log('translate.table.JobOffersArePartlyClosed ---> ', translate.table.JobOffersArePartlyClosed)


    // console.log(currentData);
    let tBody = currentData.map((item, index)=> {

      var d = new Date(item['a10:updated']);
      var curr_date = d.getDate();
      var curr_month = d.getMonth() + 1; //Months are zero based
      var curr_year = d.getFullYear();
      var cdate = (curr_year + "-" + curr_month + "-" + curr_date);
      // console.log(cd);
      // console.log(this.htmlDecoder(item.description));
      // console.log(item['a10:author']['a10:name']);
      // <a href={item.link} target="_blank"> show </a>

      let descDecoded = this.htmlDecoder(item.description);
      descObject[item.id] = descDecoded;
      

      return (
        <tr key={item.guid}>
          <td>{item.id}</td>
          {/* <td>{item.guid}</td> */}
          <td>{item.location}</td>
          <td>{(this.props.pageNumber === 8 && this.props.current >1 )?'____________': `${item.category}`}</td>
          <td>{(this.props.pageNumber === 8 && this.props.current >1  )?'____________':item.title}</td>
          <td>{(this.props.pageNumber === 8 && this.props.current >1  )?'____________':item['a10:author']['a10:name']}</td>
          <td>{cdate}</td>
          <td>
            <span className='show-descr-btn' onClick={this.showDescription} data-item-id={item.id}>{ translate.table.details }</span>
          </td>
        </tr>
      )
    })


    //console.log(descObject);
    // <span className="close-descr-wrap" onClick={this.closeDescription}>+</span>
    // <button onClick={this.showDescription} >show description</button> 

    return (
      <div>
        {/*<span >Jobs Listing</span>*/}
          {this.props.pageNumber === 8?<div className="listing-headline_arm">
              {this.props.lang ==='eng'?'Job offers are partly closed. They will be fully accessible when you finish all the lessons (HTML, CSS, BootStrap) before Javascript.':'Աշխատանքի առաջարկները մասնակի փակ են: Դրանք լիարժեք հասանելի կլինեն, երբ Դուք ավարտեք բոլոր դասերը (HTML, CSS, BootStrap)` մինչև Javascript: '}
            {/* { translate.table.projOrdersAreClosed } */}
          </div>:null}
        <div className="descr-wrap">
          <span className="close-descr-wrap" onClick={this.closeDescription}>+</span>
          <div className='descr-content'></div>
        </div>

          <table className="table  table-bordered table-hover table-condensed table-responsive">
            <thead>
                <tr>
                    <th>No.</th>
                    {/* <th>{'guid'}</th> */}
                    <th>{translate.table.location}</th>
                    <th>{translate.table.category}</th>
                    <th>{translate.table.title}</th>
                    <th>{translate.table.author}</th>
                    <th>{translate.table.updated}</th>
                    <th>{translate.table.description}</th>
                </tr>
            </thead>
            <tbody className="table-body">
              {tBody}
            </tbody>
            <tfoot>
              { this.state.spasiError &&
                <tr className="no-results">
                  {/* <td colSpan='4'> Nobody here ... <br/> Become the first of your Country! </td> */}
                  <td colSpan='4'> {translate.table.noJobOffers} </td>
                </tr>
              }
            </tfoot>
          </table>
      </div>
    );
  }

}
const store = store =>({
    userProfile: store.userProfileData,
    lang:store.lang,
    pageNumber:store.pageNumber,
});
const dispatch = dispatch =>({})

export default connect(store,dispatch)(Table);

