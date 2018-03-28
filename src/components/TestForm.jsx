import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { SingleDatePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';

import Question from './Question';

class TestForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: props.name ? props.name : '',
      scoreDate: props.scoreDate ? moment(props.scoreDate) : moment(),
      questions: props.questions ? props.questions : [null, null, null],
      trueValue: 't',
      falseValue: 'f',
      calendarFocused: false,
      nameError: '',
      qError: '',
    };
  }
  componentWillMount() {
    const convertTrueFalseToTFValues = this.state.questions.slice().map((q) => {
      if (q !== null) {
        if (q) {
          return this.state.trueValue;
        }
        return this.state.falseValue;
      }
      return null;
    });
    this.setState(() => ({ questions: convertTrueFalseToTFValues }));
  }
  onNameChange = (e) => {
    const name = e.target.value;
    this.setState(() => ({ name, nameError: '' }));
  }
  onDateChange = (scoreDate) => {
    if (scoreDate) {
      this.setState(() => ({ scoreDate }));
    }
  }
  onFocusChange = ({ focused }) => {
    this.setState(() => ({ calendarFocused: focused }));
  }
  onSubmit = (e) => {
    e.preventDefault();

    const allValuesTorF = this.state.questions.reduce((acc, x) => ((x === 't' || x === 'f') ? acc && true : false), true);

    if (allValuesTorF && this.state.name) {
      return this.props.onSubmit({
        name: this.state.name,
        scoreDate: this.state.scoreDate.valueOf(),
        questions: this.state.questions.map(x => x === 't'),
      });
    }
  };
  onHandleQuestionInput = (qAns, qNum, e) => {
    const questions = this.state.questions.slice();
    if (!qAns) {
      questions[qNum - 1] = null;
    } else {
      questions[qNum - 1] = (qAns === this.state.trueValue) ? 't' : 'f';
      this.handleJumpNextInput(e);
    }
    this.setState(() => ({ questions }));
  }
  handleJumpNextInput = (e) => {
    const { form } = e.target;
    const index = Array.prototype.indexOf.call(form, e.target);
    if (form.elements[index + 2]) {
      form.elements[index + 2].focus();
    }
  }
  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          {this.state.nameError && <p>{this.state.nameError}</p>}
          {this.state.qError && <p>{this.state.qError}</p>}

          <input
            type="text"
            placeholder="Name"
            autoFocus// eslint-disable-line
            value={this.state.name}
            onChange={this.onNameChange}
          />
          <SingleDatePicker
            date={this.state.scoreDate}
            onDateChange={this.onDateChange}
            focused={this.state.calendarFocused}
            onFocusChange={this.onFocusChange}
            numberOfMonths={1}
            isOutsideRange={() => false}
          />
          <ol>
            <li>
              <Question
                number={1}
                trueValue={this.state.trueValue}
                falseValue={this.state.falseValue}
                onHandleQuestionInput={this.onHandleQuestionInput}
                questionsArray={this.state.questions}
                answer={this.state.questions[0]}
              />
            </li>
            <li>
              <Question
                number={2}
                trueValue={this.state.trueValue}
                falseValue={this.state.falseValue}
                onHandleQuestionInput={this.onHandleQuestionInput}
                questionsArray={this.state.questions}
                answer={this.state.questions[1]}
              />
            </li>
            <li>
              <Question
                number={3}
                trueValue={this.state.trueValue}
                falseValue={this.state.falseValue}
                onHandleQuestionInput={this.onHandleQuestionInput}
                questionsArray={this.state.questions}
                answer={this.state.questions[2]}
              />
            </li>
          </ol>
          <button>Submit
          </button>
          {this.state.nameError && <span>{this.state.nameError}</span>}
          {this.state.qError && <p>{this.state.qError}</p>}
        </form>
      </div>
    );
  }
}

export default connect()(TestForm);
