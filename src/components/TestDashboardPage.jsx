import React from 'react';

import TestList from './TestList';
import TestListFilters from './TestListFilters';
import TestListSummary from './TestListSummary';

export default props => (
  <div>
    <div className="site-background">
      <div>
        <TestListSummary total={12} />
      </div>
      <TestListFilters />
      <TestList
        history={props.history}
      />
    </div>
  </div>
);
