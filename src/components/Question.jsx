import React from 'react';

export default class Question extends React.Component {
  constructor() {
    super();
    this.trueValue = 't';
    this.falseValue = 'f';
  }
  onHandleChange = ({ target: { value } }) => {
    if (value === this.trueValue) {
      return console.log(value);
    }
    if (value === this.falseValue) {
      return console.log(this.falseValue);
    }
  };
  render() {
    return (
      <div>
        <input onChange={e => this.onHandleChange(e)} />
      </div>
    );
  }
}
