import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import FlipMove from 'react-flip-move';

import TestListItem from './TestListItem';
import selectTests from '../selectors/tests';

const TestList = ({ tests }) => (
  <div className="content-container">
    <div className="list-header">
      <div>Examinee</div>
    </div>
    <div className="list-body">
      <FlipMove duration={550} easing="ease-in-out">
        {tests.map(test => <TestListItem key={test.id} {...test} />)}
        <div className="list-item list-item--message">
          {tests.length === 0 ? <span>No tests</span> : <span>© 2018</span>}
        </div>
      </FlipMove>
    </div>
  </div>
);


const mapStateToProps = ({ tests, filters }) => ({ tests: selectTests(tests, filters) });

export default connect(mapStateToProps)(TestList);
