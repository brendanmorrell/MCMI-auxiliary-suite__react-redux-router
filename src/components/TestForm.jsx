import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { SingleDatePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import TrueFalseSelector from './TrueFalseSelector';

import Question from './Question';

const generateQuestionList = () => {
  const arr = [];
  for (let i = 0; i < 195; i += 1) {
    arr.push(null);
  }
  return arr;
};

class TestForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: props.name ? props.name : '',
      scoreDate: props.scoreDate ? moment(props.scoreDate) : moment(),
      questions: props.questions ? props.questions : generateQuestionList(),
      trueValue: props.trueValue,
      falseValue: props.falseValue,
      calendarFocused: false,
      nameError: '',
      qError: '',
      formCancelled: false,
    };
  }
  componentWillMount() {
    const convertTrueFalseToKeyValues = this.state.questions.slice().map((q) => {
      if (q !== null) {
        if (q) {
          return this.state.trueValue;
        }
        return this.state.falseValue;
      }
      return null;
    });
    this.setState(() => ({ questions: convertTrueFalseToKeyValues }));
  }
  onChangeTrue = (trueValue) => {
    const prevTrue = this.state.trueValue;
    this.setState(() => ({ trueValue }), () => this.convertQAnswersToNewTFValues(prevTrue));
  }
  onChangeFalse = (falseValue) => {
    const prevTrue = this.state.trueValue;
    this.setState(() => ({ falseValue }), () => this.convertQAnswersToNewTFValues(prevTrue));
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

    const allValuesTorF = this.state.questions.reduce((acc, x) => (
      (x === this.state.trueValue || x === this.state.falseValue) ? acc && true : false), true);

    if (allValuesTorF && this.state.name) {
      return this.props.onSubmit({
        name: this.state.name,
        scoreDate: this.state.scoreDate.valueOf(),
        questions: this.state.questions.map(x => x === this.state.trueValue),
      });
    }
    return undefined;
  };
  onHandleQuestionInput = (qAns, qNum, e) => {
    const questions = this.state.questions.slice();
    if (!qAns) {
      questions[qNum - 1] = null;
    } else {
      questions[qNum - 1] = (qAns === this.state.trueValue) ?
        this.state.trueValue : this.state.falseValue;
      this.handleJumpNextInput(e);
    }
    this.setState(() => ({ questions }));
  }
  convertQAnswersToNewTFValues = (prevTrue) => {
    const convertQAnswersToNewTFValues = this.state.questions.slice().map((q) => {
      if (q !== null) {
        if (q === prevTrue) {
          return this.state.trueValue;
        }
        return this.state.falseValue;
      }
      return null;
    });
    this.setState(() => ({ questions: convertQAnswersToNewTFValues }));
  }
  handleJumpNextInput = (e) => {
    const { form } = e.target;
    const index = Array.prototype.indexOf.call(form, e.target);
    if (form.elements[index + 2]) {
      form.elements[index + 2].focus();
    }
  }
  handleCancel = (e) => {
    e.preventDefault();
    this.setState(() => ({ formCancelled: true }));
  }
  render() {
    return (
      <div>
        <TrueFalseSelector
          trueValue={this.state.trueValue}
          falseValue={this.state.falseValue}
          onChangeTrue={this.onChangeTrue}
          onChangeFalse={this.onChangeFalse}
          formCancelled={this.state.formCancelled}
          history={this.props.history}
        />
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
            {this.state.questions.map((q, idx) => (
              <li>
                <Question
                  number={idx + 1}
                  trueValue={this.state.trueValue}
                  falseValue={this.state.falseValue}
                  onHandleQuestionInput={this.onHandleQuestionInput}
                  questionsArray={this.state.questions}
                  answer={q}
                />
              </li>
            ))}
          </ol>
          <button>Submit
          </button>
          {this.state.nameError && <span>{this.state.nameError}</span>}
          {this.state.qError && <p>{this.state.qError}</p>}
        </form>
        <button
          onClick={this.handleCancel}
        >Cancel EDIIIIIIIIIITS
        </button>
      </div>
    );
  }
}

export default connect()(TestForm);
