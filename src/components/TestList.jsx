import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import FlipMove from 'react-flip-move';

import TestListItem from './TestListItem';
import selectTests from '../selectors/tests';

const TestList = props => (
  <div className="content-container">
    <div className="list-header">
      <div>Examinee</div>
    </div>
    <div className="list-body">
      <FlipMove duration={550} easing="ease-in-out">
        {props.tests.map(test => <TestListItem history={props.history} key={test.id} {...test} />)}
        <div className="list-item list-item--message">
          {props.tests.length === 0 ? <span className="center">No tests</span> : <span className="center">© 2018</span>}
        </div>
      </FlipMove>
    </div>
  </div>
);


const mapStateToProps = ({ tests, filters }) => ({ tests: selectTests(tests, filters) });

export default connect(mapStateToProps)(TestList);
