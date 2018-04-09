import React from 'react';
import { connect } from 'react-redux';
import { startSetTrue, startSetFalse } from '../actions/trueFalseValues';

class TrueFalseSelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      trueValue: props.trueValue,
      falseValue: props.falseValue,
      emptyValue: '',
      trueValueOnMount: null,
      falseValueOnMount: null,
      formCancelled: props.formCancelled,
    };
  }
  componentDidMount() {
    this.onMount();
  }
  componentWillReceiveProps(nextProps) {
    this.setState(() => ({ formCancelled: nextProps.formCancelled }), () => {
      if (this.state.formCancelled) {
        this.onCancel();
      }
    });
  }
  onMount = () => {
    this.setState(prevState => ({
      trueValueOnMount: prevState.trueValue,
      falseValueOnMount: prevState.falseValue,
    }));
  }
  onCancel = () => {
    this.props.dispatch(startSetTrue(this.state.trueValueOnMount));
    this.props.dispatch(startSetFalse(this.state.falseValueOnMount));
    this.props.history.push('/dashboard');
  }
  handleChangeTrueValue = (e) => {
    e.preventDefault();
    if (e.target.value.length === 1 && e.target.value !== this.state.falseValue) {
      const trueValue = e.target.value;
      this.props.onChangeTrue(trueValue);
      this.setState(() => ({ trueValue }));
      this.props.dispatch(startSetTrue(trueValue));
    }
  }
  handleChangeFalseValue = (e) => {
    e.preventDefault();
    if (e.target.value.length === 1 && e.target.value !== this.state.trueValue) {
      const falseValue = e.target.value;
      this.props.onChangeFalse(falseValue);
      this.setState(() => ({ falseValue }));
      this.props.dispatch(startSetFalse(falseValue));
    }
  }
  render() {
    return (
      <div>
        <input
          placeholder={this.state.trueValue}
          onChange={e => this.handleChangeTrueValue(e)}
          value={this.state.emptyValue}
        />
        <input
          placeholder={this.state.falseValue}
          onChange={this.handleChangeFalseValue}
          value={this.state.emptyValue}
        />
      </div>
    );
  }
}
export default connect()(TrueFalseSelector);
