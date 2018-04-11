import React from 'react';
import { connect } from 'react-redux';

import { startLogin } from '../actions/auth';

const LoginPage = props => (
  <div className="box-layout">
    <div className="box-layout__box">
      <h1 className="box-layout__title">MCMI-IV</h1>
      <h5>Millon Clinical Multiaxial Inventory Scoring System, 4th Ed.</h5>

      <button
        className="button"
        onClick={() => props.dispatch(startLogin())}
      >
        Login with Google
      </button>
    </div>
  </div>
);

export default connect()(LoginPage);
