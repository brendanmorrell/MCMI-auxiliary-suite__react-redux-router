import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { startRemoveTest } from '../actions/tests';

const TestListItem = ({
  dispatch,
  name,
  id,
  scoreDate,
}) => (
  <div>
    <p>
      <Link to={`/results/${id}`}>{name}</Link>
      -
      {scoreDate}
    </p>
    <button onClick={(e) => {
      e.preventDefault();
      dispatch(startRemoveTest(id));
    }}
    >X
    </button>
    <Link to={`/edit/${id}`}>Edit</Link>
  </div>
);

export default connect()(TestListItem);
