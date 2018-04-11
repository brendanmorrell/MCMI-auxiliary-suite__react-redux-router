import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import FlipMove from 'react-flip-move';

import TestListItem from './TestListItem';
import selectTests from '../selectors/tests';

const TestList = ({ tests }) => (
  <div className="content-container">
    <div className="list-header">
      <div className="show-for-mobile">Tests</div>
      <div className="show-for-desktop">Tests</div>
      <div className="show-for-desktop">Date</div>
    </div>
    <div className="list-body">
      <FlipMove duration={750} easing="ease-out">
        {
          tests.length === 0 ? (
            <div className="list-item list-item--message">
              <span>No expenses</span>
            </div>
          ) : (
            tests.map(test => <TestListItem key={test.id} {...test} />)
          )
        }
      </FlipMove>
    </div>
  </div>
);


const mapStateToProps = ({ tests, filters }) => ({ tests: selectTests(tests, filters) });

export default connect(mapStateToProps)(TestList);
