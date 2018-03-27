import React from 'react';
import { connect } from 'react-redux';

import { setTextFilter, sortByScoreDate, sortByTestDate, setRvsFilter, setStartDate, setEndDate } from '../actions/filters';

class TestListFilters extends React.Component {
  render() {
    return (
      <div>
        <input
          type="text"
          value={this.props.text}
          onChange={(e) => {
            this.props.dispatch(setTextFilter(e.target.value));
          }}
        />
        <select
          value={this.props.sortBy}
          onChange={(e) => {
            const sortByValue = e.target.value === 'scoreDate' ? sortByScoreDate : sortByTestDate;
            this.props.dispatch(sortByValue());
          }}
        >
          <option value="scoreDate">Score Date</option>
          <option value="testDate">Test Date</option>
        </select>
        <button
          onClick={() => {
            this.props.dispatch(setRvsFilter());
          }}
        >Reverse
        </button>
      </div>
    );
  }
}

const mapStateToProps = ({ dispatch, filters: { text, sortBy, rvsFilter, startDate, endDate } }) => ({
  text,
  sortBy,
  rvsFilter,
  dispatch,
});
export default connect(mapStateToProps)(TestListFilters);
