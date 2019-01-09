import React from 'react';
import { connect } from 'react-redux';
// import ShowcaseButton from '../showcase-components/showcase-button';

// import {
//   XYPlot,
//   XAxis,
//   YAxis,
//   VerticalGridLines,
//   HorizontalGridLines,
//   VerticalBarSeries,
// } from 'react-vis';

import scoreTest from '../utils/scoreTest';

class ResultsPage extends React.Component {
  state = {
    // oneTwoThree: this.props.test.questions.reduce((acc, x) => {
    //   let newAcc = acc;
    //   if (x) {
    //     newAcc += 1;
    //   }
    //   return newAcc;
    // }, 0),
    // oneTwo: this.props.test.questions.reduce((acc, x, idx) => {
    //   let newAcc = acc;
    //   if (x && (idx === 0 || idx === 1)) {
    //     newAcc += 1;
    //   }
    //   return newAcc;
    // }, 0),
    // oneThree: this.props.test.questions.reduce((acc, x, idx) => {
    //   let newAcc = acc;
    //   if (x && (idx === 0 || idx === 2)) {
    //     newAcc += 1;
    //   }
    //   return newAcc;
    // }, 0),
  };

  render() {
    // const series1 = [
    //   { x: '123', y: this.state.oneTwoThree },
    //   { x: '12', y: this.state.oneTwo },
    //   { x: '13', y: this.state.oneThree },
    // ];
    const fullResults = scoreTest(this.props.test.questions);
    console.log('​ResultsPage -> render -> fullResults', fullResults);
    const limitedResults = Object.keys(fullResults).map(scale =>
      (fullResults[scale].score ? (
        <div>{`${scale} : ${fullResults[scale].score.final}`} </div>
      ) : (
        <div>
          <h1>INVALID TEST INDICATORS</h1>
          <ul>{Object.keys(fullResults[scale]).map(x => <div>{`* ${x}`}</div>)}</ul>
        </div>
      )));
    console.log('​ResultsPage -> render -> limitedResults', limitedResults);
    return (
      <div className="site-background">
        <div className="page-header">
          <div className="content-container">
            <h1 className="page-header__title">
              Results for <strong>{this.props.test.name}</strong>
            </h1>
          </div>
        </div>
        {/*         <XYPlot
          xType="ordinal"
          width={300}
          height={300}
          xDistance={100}
          // onMouseEnter={(datapoint, event) => console.log(datapoint)}
        >
          <VerticalGridLines />
          <HorizontalGridLines />
          <XAxis />
          <YAxis />
          <VerticalBarSeries className="vertical-bar-series-example" data={series1} />
        </XYPlot> */}
        <h1>RESULTS</h1>
        {limitedResults}
        {/*         {this.props.test.questions.map((q, idx) => (
          <p>
            Question {idx}: {q.toString()}
          </p>
        ))}
        {this.props.test.note && (
          <div>
            <h3>Notes</h3>
            <p>{this.props.test.note}</p>
          </div>
        )} */}
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  test: state.tests.filter(test => test.id === props.match.params.id)[0],
});

export default connect(mapStateToProps)(ResultsPage);
