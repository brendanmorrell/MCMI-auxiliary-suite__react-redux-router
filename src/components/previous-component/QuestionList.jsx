import React from 'react';
import Question from './Question';

export default class extends React.Component {
  state = { total: 0 };

  handleKeyDown = (e) => {
    if (e.target.value === 't' || e.target.value === 'f') {
      const { form } = e.target;
      const index = Array.prototype.indexOf.call(form, e.target);
      if (form.elements[index + 2]) {
        form.elements[index + 2].focus();
      }
      if (e.target.value === 't') {
        this.setState(prevState => ({ total: prevState.total + 1 }));
      } else {
        this.setState(prevState => ({ total: prevState.total - 1 }));
      }
    }
  }

  handleClear = (e) => {
    const { form } = e.target;
    const index = Array.prototype.indexOf.call(form, e.target);
    form.elements[index - 1].value = '';
  }

  render() {
    return (
      <div>
        <p>Total: {this.state.total}</p>
        <form>
          <Question
            handleKeyDown={e => this.handleKeyDown(e)}
            handleClear={e => this.handleClear(e)}
          />
          <Question
            handleKeyDown={e => this.handleKeyDown(e)}
            handleClear={e => this.handleClear(e)}
          />
          <Question
            handleKeyDown={e => this.handleKeyDown(e)}
            handleClear={e => this.handleClear(e)}
          />
          <Question
            handleKeyDown={e => this.handleKeyDown(e)}
            handleClear={e => this.handleClear(e)}
          />
          <Question
            handleKeyDown={e => this.handleKeyDown(e)}
            handleClear={e => this.handleClear(e)}
          />
        </form>
      </div>
    );
  }
}
