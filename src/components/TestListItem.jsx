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
      clickedItemIsButton: false,
    };
    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }
  onClickDiv = () => {
    this.setState(prevState => ({}), () => {
      if (!this.state.clickedItemIsButton) {
        return this.props.history.push(`/results/${this.props.id}`);
      }
      return undefined;
    });
  }
  openModal = (e) => {
    this.setState({ modalIsOpen: true, clickedItemIsButton: true });
  }
  afterOpenModal = () => {
  }
  closeModal = () => {
    this.setState({ modalIsOpen: false });
    setTimeout(() => {
      return this.setState({ clickedItemIsButton: false });
    });
  }
  deleteTest = () => {
    this.setState({ modalIsOpen: false });
    this.props.dispatch(startRemoveTest(this.props.id));
  }
  render() {
    return (
      <div// eslint-disable-line
        className="list-item"
        onClick={this.onClickDiv}
      >
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
            className="button--secondary flat"
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
            className="button flat"
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
