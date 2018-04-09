import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import { startLogout } from '../actions/auth';

const Header = props => (
  <div>
    <header>
      <h1>Expensify</h1>
      <NavLink exact to="/dashboard" activeClassName="is-active">Dashboard</NavLink>
      <NavLink exact to="/scoring" activeClassName="is-active" >New Test</NavLink>
      <button
        onClick={props.dispatch(startLogout)}
      >Logout
      </button>
    </header>
  </div>
);

export default connect()(Header);
