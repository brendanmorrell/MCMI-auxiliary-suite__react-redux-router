import React from 'react';
import { NavLink } from 'react-router-dom';

export default () => (
  <div>
    <header>
      <h1>Expensify</h1>
      <NavLink exact to="/" activeClassName="is-active">Dashboard</NavLink>
      <NavLink exact to="/scoring" activeClassName="is-active" >New Test</NavLink>
      <NavLink exact to="/login" activeClassName="is-active" >Logout</NavLink>
    </header>
  </div>
);
