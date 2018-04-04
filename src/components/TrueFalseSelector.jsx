import React from 'react';
import { connect } from 'react-redux';
import { setTrue, setFalse } from '../actions/trueFalseValues';

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
    console.log(this.state);
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
    console.log('true false state triggered this');
    this.props.dispatch(setTrue(this.state.trueValueOnMount));
    this.props.dispatch(setFalse(this.state.falseValueOnMount));
    this.props.history.push('/');
  }
  handleChangeTrueValue = (e) => {
    e.preventDefault();
    if (e.target.value.length === 1 && e.target.value !== this.state.falseValue) {
      const trueValue = e.target.value;
      this.props.onChangeTrue(trueValue);
      this.setState(() => ({ trueValue }));
      this.props.dispatch(setTrue(trueValue));
    }
  }
  handleChangeFalseValue = (e) => {
    e.preventDefault();
    if (e.target.value.length === 1 && e.target.value !== this.state.trueValue) {
      const falseValue = e.target.value;
      this.props.onChangeFalse(falseValue);
      this.setState(() => ({ falseValue }));
      this.props.dispatch(setFalse(falseValue));
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
