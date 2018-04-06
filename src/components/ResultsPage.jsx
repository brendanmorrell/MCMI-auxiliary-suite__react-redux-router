import React from 'react';
import { connect } from 'react-redux';
// import ShowcaseButton from '../showcase-components/showcase-button';

import {
  XYPlot,
  XAxis,
  YAxis,
  VerticalGridLines,
  HorizontalGridLines,
  VerticalBarSeries,
} from 'react-vis';

class ResultsPage extends React.Component {
  state = {
    oneTwoThree: this.props.test.questions.reduce((acc, x) => {
      let newAcc = acc;
      if (x) {
        newAcc += 1;
      }
      return newAcc;
    }, 0),
    oneTwo: this.props.test.questions.reduce((acc, x, idx) => {
      let newAcc = acc;
      if (x && (idx === 0 || idx === 1)) {
        newAcc += 1;
      }
      return newAcc;
    }, 0),
    oneThree: this.props.test.questions.reduce((acc, x, idx) => {
      let newAcc = acc;
      if (x && (idx === 0 || idx === 2)) {
        newAcc += 1;
      }
      return newAcc;
    }, 0),
  }

  render() {
    const series1 = [
      { x: '123', y: this.state.oneTwoThree },
      { x: '12', y: this.state.oneTwo },
      { x: '13', y: this.state.oneThree },
    ];
    return (
      <div>
        <XYPlot
          xType="ordinal"
          width={300}
          height={300}
          xDistance={100}
          // onMouseEnter={(datapoint, event) => console.log(datapoint)}
        >
          <VerticalGridLines
            // style={{
            //   stroke: 'violet',
            //   strokeWidth: 3,
            // }}
          />
          <HorizontalGridLines
            // style={{
            //   stroke: 'violet',
            //   strokeWidth: 3,
            // }}
          />
          <XAxis
            // style={{
            //   stroke: 'blue',
            //   strokeWidth: 1,
            // }}
          />
          <YAxis
            // style={{
            //   stroke: 'red',
            //   strokeWidth: 1,
            // }}
          />
          <VerticalBarSeries
            className="vertical-bar-series-example"
            data={series1}
          />
        </XYPlot>
        {this.props.test.questions.map((q, idx) => <p>Question {idx}: {q.toString()}</p>)}
      </div>
    );
  }
}


const mapStateToProps = (state, props) => ({
  test: state.tests.filter(test => test.id === props.match.params.id)[0],
});

export default connect(mapStateToProps)(ResultsPage);
