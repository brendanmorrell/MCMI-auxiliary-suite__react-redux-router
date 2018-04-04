import React from 'react';
import { connect } from 'react-redux';

import TestForm from './TestForm';
import { addTest } from '../actions/tests';


const AddTestPage = props => (
  <div>
    <h1>scoring page</h1>
    <TestForm
      onSubmit={(test) => {
        props.dispatch(addTest(test));
        props.history.push('/');
      }}
      trueValue={props.trueFalseValues.trueValue}
      falseValue={props.trueFalseValues.falseValue}
      onCancel={() => props.history.push('/')}
      history={props.history}
    />
  </div>
);


const mapStateToProps = state => ({
  trueFalseValues: state.trueFalseValues,
});

export default connect(mapStateToProps)(AddTestPage);
