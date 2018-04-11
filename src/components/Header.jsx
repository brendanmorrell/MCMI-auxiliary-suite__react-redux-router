import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { startLogout } from '../actions/auth';

const Header = props => (
  <div>
    <header className="header">
      <div className="content-container">
        <div className="header__content">
          <Link
            className="header__title"
            exact
            to="/dashboard"
          >
            <h1>MCMI-IV</h1>
          </Link>
          <button
            className="button button--link"
            onClick={props.dispatch(startLogout)}
          >Logout
          </button>
        </div>
      </div>
    </header>
  </div>
);

export default connect()(Header);
