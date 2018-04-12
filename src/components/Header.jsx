import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { startLogout } from '../actions/auth';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      focused: undefined,
    }
  }
  onMouseEnter = (focused) => {
    this.setState(() => ({ focused }));
  }
  onMouseLeave = () => {
    this.setState(() => ({ focused: undefined }));
  }
  render () {
    return (
      <div>
        <header className="header">
          <div className="content-container">
            <div className="header__content">
              <Link
                className={this.state.focused === 'Link' ? 'header__title link-focused' : 'header__title'}
                onMouseEnter={() => this.onMouseEnter('Link')}
                onMouseLeave={() => this.onMouseLeave()}
                exact
                to="/dashboard"
              >
                <h1>
                  MCMI-IV
                </h1>
              </Link>
              <button
                className={this.state.focused === 'button' ? 'button button--link link-focused' : 'button button--link'}
                onMouseEnter={() => this.onMouseEnter('button')}
                onMouseLeave={() => this.onMouseLeave()}
                onClick={this.props.dispatch(startLogout)}
              >Logout
              </button>
            </div>
          </div>
        </header>
      </div>
    );
  }
}

export default connect()(Header);
