import React from 'react';
import { connect } from 'react-redux';

import TestForm from './TestForm';
import { startAddTest } from '../actions/tests';


const AddTestPage = props => (
  <div>
    <h1>scoring page</h1>
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
);


const mapStateToProps = state => ({
  trueFalseValues: state.trueFalseValues,
});

export default connect(mapStateToProps)(AddTestPage);
