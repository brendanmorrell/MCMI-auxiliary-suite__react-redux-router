import React from 'react';
import { connect } from 'react-redux';

import TestForm from './TestForm';
import { startAddTest } from '../actions/tests';

const AddTestPage = props => (
  <div className="site-background">
    <div className="page-header">
      <div className="content-container">
        <h1 className="page-header__title">Score New Test</h1>
      </div>
    </div>
    <div className="content-container">
      <TestForm
        onSubmit={(test) => {
          props.dispatch(startAddTest(test));
          props.history.push('/dashboard');
        }}
        trueValue={props.trueFalseValues.trueValue}
        falseValue={props.trueFalseValues.falseValue}
        onCancel={() => props.history.push('/dashboard')}
        history={props.history}
      />
    </div>
  </div>
);

const mapStateToProps = state => ({
  trueFalseValues: state.trueFalseValues,
});

export default connect(mapStateToProps)(AddTestPage);
