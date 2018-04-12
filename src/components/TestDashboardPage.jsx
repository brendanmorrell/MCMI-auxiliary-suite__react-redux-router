import React from 'react';

import TestList from './TestList';
import TestListFilters from './TestListFilters';
import TestListSummary from './TestListSummary';

export default () => (
  <div>
    <div className="site-background">
      <div>
        <TestListSummary total={12} />
      </div>
      <TestListFilters />
      <TestList />
    </div>
  </div>
);
