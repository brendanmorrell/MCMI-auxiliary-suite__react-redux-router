import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import TestListItem from './TestListItem';
import selectTests from '../selectors/tests';

const TestList = ({ tests }) => (
  <div>
    <h1>Test List</h1>
    {tests.map(test => <TestListItem key={test.id} {...test} />)}
  </div>
);


const mapStateToProps = ({ tests, filters }) => ({ tests: selectTests(tests, filters) });

export default connect(mapStateToProps)(TestList);
