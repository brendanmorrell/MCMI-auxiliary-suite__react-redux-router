import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';

import { startRemoveTest } from '../actions/tests';

class TestListItem extends React.Component {
  constructor() {
    super();
    console.log();
  }
  render() {
    return (
      <div className="list-item">
        <div>
          <Link to={`/results/${this.props.id}`}>
            <div>
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
            onClick={(e) => {
            e.preventDefault();
            this.props.dispatch(startRemoveTest(this.props.id));
          }}
          >X
          </button>
          <Link
            className="button"
            to={`/edit/${this.props.id}`}><span className="override-color">Edit</span></Link>
        </div>
      </div>
    );
  }
}

export default connect()(TestListItem);
