import React from 'react';
import keycode from 'keycode';

export default class Question extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      answer: props.answer,
    };
  }
  componentWillReceiveProps(nextProps) {
    this.setState({ answer: nextProps.answer });
  }
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
      return this.setState(() => ({ answer }));
    }
    return undefined;
  }
  handleClickRemove = (e) => {
    e.preventDefault();
    this.setState(() => ({ answer: '' }));
    this.props.onHandleQuestionInput('', this.props.number);
  }
  render() {
    return (
      <div>
        <input
          onKeyDown={this.handleInput}
          value={this.state.answer || ''}
        />
        {this.state.answer && <span>{this.state.answer === this.props.trueValue ? 'true' : 'false'}</span>}
        <button onClick={e => this.handleClickRemove(e)}>X</button>
      </div>
    );
  }
}
