import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';

import { startRemoveTest } from '../actions/tests';

const TestListItem = props => (
  <div>
    <p>
      <Link to={`/results/${props.id}`}>{props.name}</Link>
      -
      {moment(props.scoreDate).format('MMMM Do, YYYY')}
    </p>
    <button onClick={(e) => {
      e.preventDefault();
      props.dispatch(startRemoveTest(props.id));
    }}
    >X
    </button>
    <Link to={`/edit/${props.id}`}>Edit</Link>
  </div>
);

export default connect()(TestListItem);
