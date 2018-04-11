import React from 'react';
import { connect } from 'react-redux';


import { setTextFilter, sortByScoreDate, sortByFirstName, sortByLastName, setRvsFilter, setStartDate, setEndDate, clearAllFilters } from '../actions/filters';

class TestListFilters extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isDate: this.props.sortBy === 'scoreDate',
      isName: this.props.sortBy === 'firstName',
    };
  }
  componentWillUnmount() {
    clearTimeout(this.timeout);
  }
  handleNameDateSortChange = () => {
    if (this.state.isName) {
      this.setState(() => ({ isName: false, isDate: true }));
      return this.props.dispatch(sortByScoreDate());
    }
    if (this.state.isDate) {
      this.setState(() => ({ isName: true, isDate: false }))
      return this.props.dispatch(sortByFirstName());
    }
  }
  render() {
    const { from, to } = this.state;
    const modifiers = { start: from, end: to };
    return (
      <div className="content-container">
        <div className="input-group__row">
          <input
            className="text-input"
            placeholder="Search tests"
            type="text"
            value={this.props.text}
            onChange={(e) => {
              this.props.dispatch(setTextFilter(e.target.value));
            }}
          />
          <div className="input-filter-combo">
            <button
              className="select select-moziila"
              onClick={this.handleNameDateSortChange}
            >{this.props.sortBy === 'scoreDate' ? 'Date' : 'Name'}
            </button>
            <button
              className={this.props.rvsFilter ? "filters-reversed input-filter-button" : "filters-normal input-filter-button"}
              onClick={() => {
                this.props.dispatch(setRvsFilter());
              }}
            />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ dispatch, filters: { text, sortBy, rvsFilter, startDate, endDate } }) => ({
  text,
  sortBy,
  rvsFilter,
  dispatch,
  startDate,
  endDate,
});
export default connect(mapStateToProps)(TestListFilters);
