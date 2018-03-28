import React from 'react';

export default class Question extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      answer: props.answer,
    };
  }
  handleInput = (e) => {
    if (e.keyCode === 8) {
      this.props.onHandleQuestionInput('', this.props.number);
      return this.setState(() => ({ answer: '' }));
    }

    let answer = e.target.value;
    if (e.keyCode === 84 || e.keyCode === 70) {
      if (e.keyCode === 84) {
        answer = 't';
      } else {
        answer = 'f';
      }
    }
    if (answer === this.props.trueValue || answer === this.props.falseValue) {
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
        <button onClick={e => this.handleClickRemove(e)}>X</button>
      </div>
    );
  }
}
