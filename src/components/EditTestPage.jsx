import React from 'react';
import { connect } from 'react-redux';

import TestForm from './TestForm';
import { startEditTest } from '../actions/tests';

const EditTestPage = props => (
  <div>
    <TestForm
      onSubmit={(test) => {
        props.dispatch(startEditTest(props.test.id, test));
        props.history.push('/');
      }}
      history={props.history}
      {...props.test}
      {...props.trueFalseValues}
    />
  </div>
);

const mapStateToProps = (state, props) => ({
  test: state.tests.filter(test => test.id === props.match.params.id)[0],
  trueFalseValues: state.trueFalseValues,
});

export default connect(mapStateToProps)(EditTestPage)
