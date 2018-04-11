import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';

import { startRemoveTest } from '../actions/tests';

const TestListItem = props => (
  <div className="list-item">
    <div>
      <Link to={`/results/${props.id}`}>
        <div>
          <h3 className="list-item__title">{props.name}</h3>
          <span className="list-item__subtitle">{moment(props.scoreDate).format('MMMM Do, YYYY')}</span>
          <p className="list-item__data">This is a bunch of data</p>
        </div>
      </Link>
    </div>
    <div>
      <h3>
        <button onClick={(e) => {
          e.preventDefault();
          props.dispatch(startRemoveTest(props.id));
        }}
        >X
        </button>
      </h3>
      <Link to={`/edit/${props.id}`}>Edit</Link>
    </div>
  </div>
);

export default connect()(TestListItem);
