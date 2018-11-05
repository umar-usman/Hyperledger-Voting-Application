import React from 'react';
import { Client } from 'node-rest-client';
import { _ } from 'underscore';
import { animation } from "./animation.js";
import { URL, API } from "./const.js";
import TransactionDetailModal from "./Modal"
var client = new Client();
var Loader = require('react-loader');
/********************************************
  CandidateList compnent props came from logged user state
  <CandidateList data={this.state}/>
********************************************/
export class CandidateList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      candidates: [], // list of candidates
      votedFor: '',
      voted: false,
      candidatesLoaded: false,
      voteLoaded: true,
      transactionId: '',
      constituency: localStorage.getItem('constituency')
    };
  }
  componentDidMount() {
    animation();
  }
  /********************************************
    on compnent will mount
  ********************************************/
  componentWillMount() {
    const _this = this;
    // get list of candidates
    let constituency = this.props.data.constituency || this.state.constituency;

    // set constituency to local storage for refresh page
    localStorage.setItem('constituency', constituency);

    client.get(API + "/candidates?constituency=" + constituency, function (data, response) {
      _this.setState({ candidates: data, candidatesLoaded: true }); // set the state
    });
  }
  /********************************************
    on receive props set the current user voted
    for candidate
  ********************************************/
  componentWillReceiveProps(nextProps) {
    this.setState({
      votedFor: nextProps.data.votedFor
        ? (nextProps.data.votedFor).split('#')[1]
        : '',
      voted: nextProps.data.votedFor
        ? true
        : false
      , transactionId: nextProps.data.transactionId ? nextProps.data.transactionId : false
    });
  }
  /********************************************
    return true if current user voted for this
    candidate
  ********************************************/
  _votedFor(name) {
    if (this.state.votedFor === name) {
      return 'voted';
    }
    return '';
  }
  /********************************************
    make vote action
  ********************************************/
  _MakeVote(candidate) {
    const _this = this;
    let nic = this.props.data.session; // user id 'nic'
    // set content-type header and data as json in args parameter
    let args = {
      data: {
        "nic": nic,         // Voter`s NIC
        "candidateId": candidate.candidateId, // candidate ID
      },
      headers: {
        "Content-Type": "application/json"
      }
    };
    this.setState({ voteLoaded: false });
    // Post to the vote
    client.post(API + "/makevote", args, function (data, response) {
      _this.setState({ voteLoaded: true });
      if (!data.error) { // if not already voted
        // let candidateId = data.candidate.split('#')[1]; // get candidate name from data response
        _this.setState({ votedFor: candidate.name, voted: true, transactionId: data.transactionId }); // set state
        localStorage.setItem('voted', true); // local storage item
        localStorage.setItem('votedFor', candidate.name); // local storage item
        let allCandidates = _this.state.candidates; // candidates list from state
        let candidateIndex = _.findIndex(allCandidates, { name: candidate.name }); // find candidate index in the  list
        (allCandidates)[candidateIndex].votes += 1; // increment vote to avoid recall the app API
        _this.setState({ candidates: allCandidates }); // update the state with updated candidate list
      }
    });
  }
  /********************************************
    render the vote btn
  ********************************************/
  _renderVoteBtn(candidate) {
    if (this.props.data.session) { // if logged
      if (!this.state.votedFor) { // if not voted yet
        return (<div>
          <button className="vote-btn" onClick={(e) => this._MakeVote(candidate)}>
            <span className="fa fa-thumbs-up"></span>
          </button>
        </div>)
      } else { // if alredy voted
        return (<button className="vote-btn">
          <span className="fa fa-thumbs-up"></span>
        </button>)
      }
    }
    return false;
  }
  /********************************************
    render candidate
  ********************************************/
  _renderCandidate() {
    // option for the loader
    var options = {
      'lines': 13,
      'length': 5,
      'width': 3,
      'radius': 10,
      'scale': 1.00,
      'corners': 1,
      'color': '#fff',
      'opacity': 0.25,
      'rotate': 0,
      'direction': 1,
      'speed': 1,
      'trail': 60,
      'fps': 20,
      'zIndex': 2e9,
      'shadow': false,
      'hwaccel': false,
      'position': 'absolute'
    };
    const flexStyle = {
      'display': 'flex'
    }
    const imgStyle = {
      'width': '40px'
    }
    const nameStyle = {
      'width': '200px'
    }
    const voteStyle = {
      'width': '-webkit-fill-available',
      'text-align': 'right'
    }
    const _this = this;
    // map and render candidate with button , votes , name
    return _.map((this.state.candidates), function (v, k) {
      //debugger;
      let candidateImg = "url(./img/" + v.name + ".png)";
      v.name = v.name.replace('_', ' ');
      const symbolImg = "./img/" + v.symbol + ".png";
      return (<div className="col text-center candidate mb-4" key={k}>
        <div className={'img-block'} style={{
          'background-image': candidateImg
        }}>
          <div className={"hover " + _this._votedFor(v.name) + " " + _this.state.voted + " " + (!_this.state.voteLoaded ? 'loading' : '')}>
            <Loader loaded={_this.state.voteLoaded} options={options} className="spinner">{_this._renderVoteBtn(v)}</Loader>
          </div>
        </div>
        <div className="d-flex">
          <div className="mr-2"><img src={symbolImg} style={imgStyle} /></div>
          <h2 className="text-light mb-0">{v.name}
          </h2>
          <h2 className="text-light mt-0 ml-auto">{v.votes}</h2>
        </div>
        <hr className="bg-light py-1 mt-0" />
      </div>)
    })
  }
  /********************************************
    render candidate
  ********************************************/
  render() {
    // option for the loader
    var options = {
      lines: 13,
      length: 20,
      width: 10,
      radius: 30,
      scale: 1.00,
      corners: 1,
      color: '#fff',
      opacity: 0.25,
      rotate: 0,
      direction: 1,
      speed: 1,
      trail: 60,
      fps: 20,
      zIndex: 2e9,
      shadow: false,
      hwaccel: false,
      position: 'absolute'
    };
    const noCandidatesStyle = {
      'color': 'white',
      'font-weight': 'bold',
      'text-align': 'center',
      'font-family': 'monospace',
      'width': '-webkit-fill-available'
    }
    return (<div className="candidates-list my-4">
      <Loader loaded={this.state.candidatesLoaded} options={options} className="spinner">
        <div className="container">
          <div className="row">
            {this.state.candidates.length > 0 ? this._renderCandidate() : <h1 style={noCandidatesStyle}> NO CANDIDATES RUNNING IN YOUR CONSTITUENCY </h1>}
          </div>
          <div className="row justify-content-between text-light tx">
            <div className={(!this.state.transactionId) ? 'd-none' : 'col-sm'}>
              Your vote ID <small>(transaction ID)</small> : {(this.state.transactionId) ? this.state.transactionId : ''}
            </div>
            <div className="col-sm-auto">
              <TransactionDetailModal transactionId={this.state.transactionId} />
            </div>
          </div>
        </div>
      </Loader>
    </div>);
  }
}
