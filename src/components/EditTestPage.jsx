import React from 'react';
import { connect } from 'react-redux';

import TestForm from './TestForm';
import { editTest } from '../actions/tests';

const EditTestPage = (props) => {
  return (
    <div>
      <TestForm
        onSubmit={(test) => {
          props.dispatch(editTest(props.test.id, test));
          props.history.push('/');
        }}
        {...props.test}
      />
      <button
        onClick={() => props.history.push('/')}
      >Cancel Edits
      </button>
    </div>
  );
};


const mapStateToProps = (state, props) => ({
  test: state.tests.filter(test => test.id === props.match.params.id)[0],
});

export default connect(mapStateToProps)(EditTestPage)
