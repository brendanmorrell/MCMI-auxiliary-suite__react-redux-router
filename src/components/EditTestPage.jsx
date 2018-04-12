import React from 'react';
import { connect } from 'react-redux';

import TestForm from './TestForm';
import { startEditTest } from '../actions/tests';

const EditTestPage = props => (
  <div className="site-background">
    <div className="page-header">
      <div className="content-container">
        <h1 className="page-header__title">
          Edit Test: <strong>{props.test.name}</strong>
        </h1>
      </div>
    </div>
    <div className="content-container">
      <TestForm
        onSubmit={(test) => {
          props.dispatch(startEditTest(props.test.id, test));
          props.history.push('/dashboard');
        }}
        history={props.history}
        {...props.test}
        {...props.trueFalseValues}
        editTestPage
      />
    </div>
  </div>
);

const mapStateToProps = (state, props) => ({
  test: state.tests.filter(test => test.id === props.match.params.id)[0],
  trueFalseValues: state.trueFalseValues,
});

export default connect(mapStateToProps)(EditTestPage)
