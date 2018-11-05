import React from 'react';
import Modal from 'react-modal';
import { Client } from 'node-rest-client';
import { URL, API } from "./const.js";

var client = new Client();

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: 600
    }
};

class TransactionDetailModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalIsOpen: false,
            transactionId: this.props.transactionId,
            transactionObj: {},
            voter: {},
            candidate: {}
        };

        this.openModal = this.openModal.bind(this);
        this.afterOpenModal = this.afterOpenModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    openModal(transactionId) {

        this.setState({ modalIsOpen: true });
        client.get(API + "/VoteDetails/" + transactionId, (data, response) => {
            this.setState({ transactionObj: data }, () => {
                client.get(API + "/Candidate/" + this.state.transactionObj.candidate.split("#")[1], (data, response) => {
                    this.setState({ candidate: data }, () => {
                        client.get(API + "/voter/" + this.state.transactionObj.voter.split("#")[1], (data, response) => {
                            this.setState({ voter: data });
                        });
                    });
                });
            });
        });
    }

    afterOpenModal() {
        // references are now sync'd and can be accessed.
        //this.subtitle.style.color = '#f00';
    }

    closeModal() {
        this.setState({ modalIsOpen: false });
    }

    render() {
        return (
            <div>
                {this.props.transactionId ? <button className="btn btn-primary" onClick={() => {
                    this.openModal(this.props.transactionId)
                }}>Vote Details</button> : ''}
                <Modal
                    isOpen={this.state.modalIsOpen}
                    onAfterOpen={this.afterOpenModal}
                    onRequestClose={this.closeModal}
                    style={customStyles}
                    contentLabel="Example Modal"
                >
                    <div className="modal-header">
                        <h5 className="modal-title" ref={subtitle => this.subtitle = subtitle}>Vote Details</h5>
                        <button type="button" className="close" onClick={this.closeModal}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <div className="row">
                            <div className="col-4">Voter Name:</div>
                            <div className="col-8">{this.state.voter.name}</div>
                            <div className="col-4">Candidate Name: </div>
                            <div className="col-8">{this.state.candidate.name}</div>
                            <div className="col-4">Vote Casting Time:</div>
                            <div className="col-8">{this.state.transactionObj.timestamp}</div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={this.closeModal}>Close</button>
                    </div>
                </Modal>
            </div>
        );
    }
}

export default TransactionDetailModal;