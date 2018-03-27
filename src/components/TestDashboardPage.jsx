import React from 'react';

import TestList from './TestList';
import TestListFilters from './TestListFilters';

export default () => (
  <div>
    <h1>dashboard page</h1>
    <TestListFilters />
    <TestList />
  </div>
);
