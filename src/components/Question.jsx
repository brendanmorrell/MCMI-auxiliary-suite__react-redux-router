import React from 'react';
import keycode from 'keycode';
import RaisedButton from 'material-ui/RaisedButton';

export default class Question extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      answer: props.answer,
      focused: false,
    };
  }
  componentWillReceiveProps(nextProps) {
    this.setState({ answer: nextProps.answer });
  }
  onBlur = () => {
    this.setState({ focused: false });
  };
  onFocus = () => {
    this.setState({ focused: true });
  };
  returnLabelValue = () => {
    if (this.state.answer === '' && !this.state.focused) {
      return '________';
    }
    if (this.state.focused) {
      setTimeout(() => {
        this.setState();
      }, 500);
      return '\xa0\xa0\xa0\xa0\xa0\xa0__\xa0\xa0\xa0\xa0\xa0\xa0';
    }
    return this.state.answer === this.props.trueValue
      ? `true \xa0(${this.state.answer})`
      : `false (${this.state.answer})`;
  };
  handleClickRemove = (e) => {
    e.preventDefault();
    this.setState(() => ({ answer: '' }));
    this.props.onHandleQuestionInput('', this.props.number);
  };
  handleClickFocused = () => {
    this.setState({ focused: true });
  };
  handleInput = (e) => {
    if (e.keyCode === 8) {
      this.props.onHandleQuestionInput('', this.props.number);
      return this.setState(() => ({ answer: '' }));
    }
    const eChar = keycode(e.keyCode);
    let answer = e.target.value;
    if (eChar === this.props.trueValue || eChar === this.props.falseValue) {
      if (keycode(e.keyCode) === this.props.trueValue) {
        answer = this.props.trueValue;
      } else {
        answer = this.props.falseValue;
      }
    }
    if (eChar === this.props.trueValue || eChar === this.props.falseValue) {
      this.props.onHandleQuestionInput(answer, this.props.number, e);
      return this.setState(() => ({ answer, focused: false }));
    }
    return undefined;
  };
  returnBackgroundColor = () => {
    if (this.state.focused) {
      return 'gainsboro';
    }
    return false;
  };
  render() {
    return (
      <div className="div-around-questions">
        <RaisedButton
          onFocus={this.onFocus}
          backgroundColor={this.returnBackgroundColor()}
          label={this.returnLabelValue()}
          onKeyDown={this.handleInput}
          onBlur={this.onBlur}
          onClick={this.handleClickFocused}
          primary={this.state.answer === this.props.trueValue && !this.state.focused}
          secondary={this.state.answer === this.props.falseValue && !this.state.focused}
        />
        <button className="button_clear--small" onClick={e => this.handleClickRemove(e)}>
          X
        </button>
        <div>{this.props.isUnansweredOnSubmit && <div className="error-pointer" />}</div>
      </div>
    );
  }
}
