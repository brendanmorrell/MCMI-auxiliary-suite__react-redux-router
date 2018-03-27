import React from 'react';
import { connect } from 'react-redux';

import TestForm from './TestForm';
import { addTest } from '../actions/tests';


const AddTestPage = props => (
  <div>
    <h1>scoring page</h1>
    <TestForm
      onSubmit={(test) => {
        console.log('added test', test);
        props.dispatch(addTest(test));
        props.history.push('/');
      }}
    />
  </div>
);


export default connect()(AddTestPage);
