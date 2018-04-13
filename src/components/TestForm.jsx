import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { SingleDatePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import autosize from 'autosize';

import TrueFalseSelector from './TrueFalseSelector';

import Question from './Question';

const generateQuestionList = () => {
  const arr = [];
  for (let i = 0; i < 196; i += 1) {
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
      note: props.note ? props.note : null,
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
        note: this.state.note,
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
  onNoteChange = (e) => {
    const note = e.target.value;
    this.setState(() => ({ note }));
  };
  handleCancel = (e) => {
    e.preventDefault();
    this.setState(() => ({ formCancelled: true }));
  }
  handleJumpNextInput = (e) => {
    const { form } = e.target;
    const index = Array.prototype.indexOf.call(form, e.target);
    if (form.elements[index + 2]) {
      form.elements[index + 2].focus();
    }
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
  render() {
    autosize(document.querySelectorAll('textarea'));
    return (
      <div>
        <form
          className="form"
          onSubmit={this.onSubmit}
        >
          {this.state.nameError && <p className="form__error">{this.state.nameError}</p>}
          {this.state.qError && <p className="form__error">{this.state.qError}</p>}
          <div className="top-two-inputs-edit-page">
            <input
              className="text-input just-left-radius"
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
          </div>
          <div clasName="text-area-div">
            <textarea
              className="text-area"
              placeholder="Test notes (optional)"
              value={this.state.note}
              onChange={this.onNoteChange}
            />
          </div>
          <div className="form__content-container-two-items">
            <div>
              <div className="t-f-header">
                Current True False Values
              </div>
              <TrueFalseSelector
                trueValue={this.state.trueValue}
                falseValue={this.state.falseValue}
                onChangeTrue={this.onChangeTrue}
                onChangeFalse={this.onChangeFalse}
                formCancelled={this.state.formCancelled}
                history={this.props.history}
              />
              <div className="form-middle">
                <ol className="grid">
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
              </div>
            </div>
          </div>
          <div className="form__content-container-two-items form-middle">
            <button
              className="button button-margin"
            >
              {this.props.editTestPage ? <span>Save Changes</span> : <span>Save New Test</span> }
            </button>
            <button
              className="button--secondary button-margin"
              onClick={this.handleCancel}
            >
              {this.props.editTestPage ?
                <span>Cancel Changes</span> : <span>Cancel New Test</span> }
            </button>
          </div>
          {this.state.nameError && <span>{this.state.nameError}</span>}
          {this.state.qError && <p>{this.state.qError}</p>}
          <div className="list-item list-item--message">
             <span className="center">© 2018</span>
          </div>
        </form>
      </div>
    );
  }
}

export default connect()(TestForm);
