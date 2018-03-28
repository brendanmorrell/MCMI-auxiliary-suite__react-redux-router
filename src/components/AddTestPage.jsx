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
    />
    <button
      onClick={() => props.history.push('/')}
    >Cancel
    </button>
  </div>
);


export default connect()(AddTestPage);
