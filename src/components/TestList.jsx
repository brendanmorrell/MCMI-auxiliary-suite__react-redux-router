import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import FlipMove from 'react-flip-move';

import TestListItem from './TestListItem';
import selectTests from '../selectors/tests';

const TestList = ({ tests }) => (
  <div>
    <h1>Test List</h1>
    <FlipMove duration={750} easing="ease-out">
      {tests.map(test => <TestListItem key={test.id} {...test} />)}
    </FlipMove>
  </div>
);


const mapStateToProps = ({ tests, filters }) => ({ tests: selectTests(tests, filters) });

export default connect(mapStateToProps)(TestList);
