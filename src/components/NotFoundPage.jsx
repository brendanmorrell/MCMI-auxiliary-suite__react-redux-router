import React from 'react';
import { Link } from 'react-router-dom';

export default () => (
  <div className="box-layout">
    <div>
      <h1>404 Page Not found--<Link to="/dashboard">Go Home</Link></h1>
    </div>
  </div>
);
