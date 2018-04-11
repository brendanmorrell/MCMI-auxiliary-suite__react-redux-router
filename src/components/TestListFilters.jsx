import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import Helmet from 'react-helmet';

import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';

import { formatDate, parseDate } from 'react-day-picker/moment';

import { setTextFilter, sortByScoreDate, sortByFirstName, sortByLastName, setRvsFilter, setStartDate, setEndDate, clearAllFilters } from '../actions/filters';

class TestListFilters extends React.Component {
  constructor(props) {
    super(props);
    this.handleFromChange = this.handleFromChange.bind(this);
    this.handleToChange = this.handleToChange.bind(this);
    this.state = {
      from: undefined,
      to: undefined,
    };
  }componentWillUnmount() {
    clearTimeout(this.timeout);
  }
  focusTo() {
    // Focus to `to` field. A timeout is required here because the overlays
    // already set timeouts to work well with input fields
    this.timeout = setTimeout(() => this.to.getInput().focus(), 0);
  }
  onDropdownChange = () => {

  }
  showFromMonth() {
    const { from, to } = this.state;
    if (!from) {
      return;
    }
    if (moment(to).diff(moment(from), 'months') < 2) {
      this.to.getDayPicker().showMonth(from);
    }
  }
  handleFromChange(from) {
    this.props.dispatch(setStartDate(from ? from.valueOf() : undefined));
    // Change the from date and focus the "to" input field
    this.setState({ from }, () => {
      if (!this.state.to) {
        this.focusTo();
      }
    });
  }
  handleToChange(to) {
    this.props.dispatch(setEndDate(to ? to.valueOf() : undefined));
    this.setState({ to }, this.showFromMonth);
  }
  render() {
    const { from, to } = this.state;
    const modifiers = { start: from, end: to };
    return (
      <div className="content-container">
        <div className="input-group">
          <div className="input-group__row">
            <p>
              <button
                onClick={() => {
                  this.setState(() => ({ to: undefined, from: undefined }));
                  this.props.dispatch(clearAllFilters());
                }}
              >Clear All Filters
              </button>
            </p>
          </div>
          <div className="input-group__row">
            <div className="input-group__row-item">
              <input
                className="text-input"
                placeholder="Search tests"
                type="text"
                value={this.props.text}
                onChange={(e) => {
                  this.props.dispatch(setTextFilter(e.target.value));
                }}
              />
            </div>
            <div className="input-group__row-item">
              <select
                className="select"
                value={this.props.sortBy}
                onChange={(e) => {
                  if (e.target.value === 'scoreDate') {
                    console.log('switched to scoreDate');
                    this.props.dispatch(sortByScoreDate());
                  }
                  if (e.target.value === 'firstName') {
                    console.log('switched to firstName');
                    this.props.dispatch(sortByFirstName());
                  }
                  // if (e.target.value === 'lastName') {
                  //   console.log('switched to lastName');
                  //   this.props.dispatch(sortByLastName());
                  // }
                }}
              >
                <option value="scoreDate">Score Date</option>
                <option value="firstName">Name</option>
                {/* <option value="lastName">Last Name</option> */}
              </select>
            </div>
            <div className="input-group__row-item">
              <button
                onClick={() => {
                  this.props.dispatch(setRvsFilter());
                }}
              >Reverse
              </button>
            </div>
          </div>
          <div className="input-group__row">
            <div className="InputFromTo">
              <DayPickerInput
                value={from}
                placeholder="From"
                format="LL"
                formatDate={formatDate}
                parseDate={parseDate}
                dayPickerProps={{
                  selectedDays: [from, { from, to }],
                  disabledDays: { after: to },
                  toMonth: to,
                  modifiers,
                  numberOfMonths: 2,
                }}
                onDayChange={this.handleFromChange}
              />{' '}
            —>{' '}
              <span className="InputFromTo-to">
                <DayPickerInput
                  ref={el => (this.to = el)}
                  value={to}
                  placeholder="To"
                  format="LL"
                  formatDate={formatDate}
                  parseDate={parseDate}
                  dayPickerProps={{
                    selectedDays: [from, { from, to }],
                    disabledDays: { before: from },
                    modifiers,
                    month: from,
                    fromMonth: from,
                    numberOfMonths: 2,
                  }}
                  onDayChange={this.handleToChange}
                />
              </span>
              <Helmet>
                <style>{`
      .InputFromTo .DayPicker-Day--selected:not(.DayPicker-Day--start):not(.DayPicker-Day--end):not(.DayPicker-Day--outside) {
        background-color: #f0f8ff !important;
        color: #4a90e2;
      }
      .InputFromTo .DayPicker-Day {
        border-radius: 0 !important;
      }
      .InputFromTo .DayPicker-Day--start {
        border-top-left-radius: 50% !important;
        border-bottom-left-radius: 50% !important;
      }
      .InputFromTo .DayPicker-Day--end {
        border-top-right-radius: 50% !important;
        border-bottom-right-radius: 50% !important;
      }
      .InputFromTo .DayPickerInput-Overlay {
        width: 550px;
      }
      .InputFromTo-to .DayPickerInput-Overlay {
        margin-left: -198px;
      }
    `}
                </style>
              </Helmet>
            </div>
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
});
export default connect(mapStateToProps)(TestListFilters);
