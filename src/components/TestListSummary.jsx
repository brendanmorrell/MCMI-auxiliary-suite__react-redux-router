import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import selectTests from '../selectors/tests';

export const TestListSummary = ({ testsCount, visibleTestsCount }) => {
  const countWord = testsCount > 1 ? 'tests' : 'test';

  return (
    <div className="page-header">
      <div className="content-container">
        <h1 className="page-header__title ">
          {testsCount > 0 ?
            <div>Currently viewing
              {testsCount !== visibleTestsCount ?
                <span>
                  <strong> {visibleTestsCount}</strong> of
                  <strong> {testsCount}</strong> total {countWord}
                </span>
              :
                <span> all tests</span>}
            </div>
          :
            <div>
              <span>No tests in database.</span>
              <p className="page-header__subtitle">Click &lsquo;New Test&rsquo; to get started</p>
            </div>
        }
        </h1>
        <div className="page-header__actions">
          <Link
            className="button"
            exact
            to="/scoring"
          >
            New Test
          </Link>
        </div>
      </div>
    </div>
  );
};


const mapStateToProps = ({ tests, filters }) => ({
  testsCount: tests.length,
  visibleTestsCount: selectTests(tests, filters).length,
});


export default connect(mapStateToProps)(TestListSummary);
