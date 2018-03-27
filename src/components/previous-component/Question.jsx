import React from 'react';
import PropTypes from 'prop-types';

class Question extends React.Component {
  handleClear = (e) => {
    e.preventDefault();
    this.props.handleClear(e);
  }

  render() {
    return (
      <div>
        <input
          type="text"
          maxLength="1"
          onKeyDown={this.props.handleKeyDown}
        />
        <button onClick={this.handleClear}>X</button><br />
      </div>
    );
  }
}

Question.propTypes = {
  handleKeyDown: PropTypes.func.isRequired,
  handleClear: PropTypes.func.isRequired,
};

export default Question;
