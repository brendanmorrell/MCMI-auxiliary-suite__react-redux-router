import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';

import Modal from 'react-modal';
import { startRemoveTest } from '../actions/tests';

class TestListItem extends React.Component {
  constructor() {
    super();
    this.state = {
      modalIsOpen: false,
    };
    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }
  openModal = (e) => {
    this.setState({ modalIsOpen: true });
  }
  afterOpenModal = () => {
  }
  closeModal = () => {
    console.log('closeModal clicked');
    this.setState({ modalIsOpen: false });
  }
  deleteTest = () => {
    this.setState({ modalIsOpen: false });
    this.props.dispatch(startRemoveTest(this.props.id));
  }
  render() {
    return (
      <div className="list-item">
        <div>
          <Link to={`/results/${this.props.id}`}>
            <div className="list-item__main-data">
              <h3 className="list-item__title">{this.props.name}</h3>
              <span className="list-item__subtitle">{moment(this.props.scoreDate).format('MMMM Do, YYYY')}</span>
            </div>
          </Link>
        </div>
        <div className="show-for-desktop data-in-center">
          <p className="list-item__data"> regular amount of data</p>
        </div>
        <div className="edit-remove-button-container">
          <button
            className="button--secondary"
            onClick={e => this.openModal(e)}
          >X
          </button>
          <div>
            <Modal
              isOpen={this.state.modalIsOpen}
              onAfterOpen={this.afterOpenModal}
              onRequestClose={this.closeModal}
              contentLabel="Modal"
            >
              <div className="modal-div">
                <h3 className="modal__title">Are you sure you want to permanently delete this test?</h3>
                <p />
                <p />
                <h3 className="list-item__title">{this.props.name}</h3>
                <p />
                <div className="button-group-modal">
                  <button
                    className="button button--secondary"
                    onClick={this.deleteTest}
                  >
                    Delete
                  </button>
                  <button
                    className="button"
                    onClick={this.closeModal}
                  >
                    Close
                  </button>
                </div>
              </div>
            </Modal>
          </div>
          <Link
            className="button"
            to={`/edit/${this.props.id}`}
          >
            <span className="override-color">Edit</span>
          </Link>
        </div>
      </div>
    );
  }
}

export default connect()(TestListItem);
