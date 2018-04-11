import React from 'react';

import TestList from './TestList';
import TestListFilters from './TestListFilters';
import TestListSummary from './TestListSummary';

export default () => (
  <div>
    <TestListSummary total={12} />
    <TestListFilters />
    <TestList />
  </div>
);
