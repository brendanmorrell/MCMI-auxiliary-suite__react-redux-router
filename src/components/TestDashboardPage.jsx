import React from 'react';

import TestList from './TestList';
import TestListFilters from './TestListFilters';
import TestListSummary from './TestListSummary';

export default () => (
  <div>
    <h1>dashboard page</h1>
    <TestListSummary total={12} />
    <TestListFilters />
    <TestList />
  </div>
);
