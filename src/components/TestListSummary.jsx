import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import selectTests from '../selectors/tests';
import { clearAllFilters } from '../actions/filters';

export const TestListSummary = (props) => {
  const countWord = props.testsCount > 1 ? 'tests' : 'test';

  return (
    <div className="page-header">
      <div className="content-container">
        <h1 className="page-header__title ">
          {props.testsCount > 0 ?
            <div>Currently viewing
              {props.testsCount !== props.visibleTestsCount ?
                <span>
                  <strong> {props.visibleTestsCount}</strong> of
                  <strong> {props.testsCount}</strong> total {countWord}
                </span>
              :
                <span> all tests ({props.testsCount})</span>}
            </div>
          :
            <div>
              <span>No tests in database.</span>
              <p className="page-header__subtitle">Click &lsquo;New Test&rsquo; to get started</p>
            </div>
        }
        </h1>
        <div className="input-group__row">
          <div className="page-header__actions">
            <Link
              className="button"
              exact
              to="/scoring"
            >
              New Test
            </Link>
          </div>
          <div className="page-header__actions">
            <button
              className="button--secondary"
              onClick={() => props.dispatch(clearAllFilters())}
            >Reset Filters
            </button>
          </div>
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
