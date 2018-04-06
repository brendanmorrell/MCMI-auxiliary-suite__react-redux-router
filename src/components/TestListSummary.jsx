import React from 'react';
import { connect } from 'react-redux';

import selectTests from '../selectors/tests';

export const TestListSummary = ({ testsCount, visibleTestsCount }) => {
  const countWord = testsCount > 1 ? 'tests' : 'test';

  return (
    <div>
      <h1>
        Currently viewing <strong>{visibleTestsCount}</strong> of {testsCount} {countWord}
      </h1>
    </div>
  );
};


const mapStateToProps = ({ tests, filters }) => ({
  testsCount: tests.length,
  visibleTestsCount: selectTests(tests, filters).length,
});


export default connect(mapStateToProps)(TestListSummary);
