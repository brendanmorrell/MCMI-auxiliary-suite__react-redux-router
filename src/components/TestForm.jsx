import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { SingleDatePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';

import { addTest } from '../actions/tests';

class TestForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: props.name ? props.name : '',
      testingDate: props.testingDate ? moment(props.testingDate) : moment(),
      questions: props.questions ? props.questions : [],
      calendarFocused: false,
      nameError: '',
    }
  }
  componentWillMount() {
    for (let i = 0; i < 30; i += 1) {
      let n = i;
      this.setState(prevState => ({
        questions: prevState.questions.concat({ number: n, answer: true }),
      }));
      n += 1;
    }
  }
  onNameChange = (e) => {
    const name = e.target.value;
    this.setState(() => ({ name, nameError: '' }));
  }
  onDateChange = (testingDate) => {
    if (testingDate) {
      this.setState(() => ({ testingDate }));
    }
  }
  onFocusChange = ({ focused }) => {
    this.setState(() => ({ calendarFocused: focused }));
  }
  onSubmit = (e) => {
    e.preventDefault();
    if (!this.state.name) {
      return this.setState(() => ({ nameError: 'Please fill in \'name\' field' }));
    }
    return this.props.onSubmit({
      name: this.state.name,
      testingDate: this.state.testingDate.valueOf(),
      questions: this.state.questions,
    });
  };
  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          {this.state.nameError && <p>Please fill in &#39;name&#39; field</p>}
          <input
            type="text"
            placeholder="Name"
            autoFocus// eslint-disable-line
            value={this.state.name}
            onChange={this.onNameChange}
          />
          <SingleDatePicker
            date={this.state.testingDate}
            onDateChange={this.onDateChange}
            focused={this.state.calendarFocused}
            onFocusChange={this.onFocusChange}
            numberOfMonths={1}
            isOutsideRange={() => false}
          />
          <ol>
            {this.state.questions.map(question => (
              <li>
                <input placeholder={question.answer.toString()} />
              </li>
            ))}
          </ol>
          <button>Submit
          </button>
          {this.state.nameError && <span>Please fill in &#39;name&#39; field</span>}
        </form>
      </div>
    );
  }
}

export default connect()(TestForm);
