import React, { Component } from "react";
import Button from "../Button/Button";
import "./Calculator.css";

class Calculator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lastClicked: undefined,
      calculation: "0",
      operation: undefined
    };
  }

  static defaultProps = {
    digitLimit: 10,
    numbers: [7, 8, 9, 4, 5, 6, 1, 2, 3, 0],
    operators: ["/", "*", "-", "+"],
    ids: {
      7: "seven",
      8: "eight",
      9: "nine",
      4: "four",
      5: "five",
      6: "six",
      1: "one",
      2: "two",
      3: "three",
      0: "zero",
      "/": "divide",
      "*": "multiply",
      "-": "subtract",
      "+": "add"
    }
  };

  handleClick = e => {
    const { calculation, lastClicked } = this.state;

    switch (e.target.innerText) {
      case "AC": {
        this.setState({
          calculation: "0"
        });
        break;
      }

      case "=": {
        this.setState({
          calculation: evaluated
        });
        break;
      }

      case ".": {
        const splitCalc = calculation.split(/[\+\-\*\/]/);
        const last = splitCalc.slice(-1)[0];

        if (!last.includes(".")) {
          this.setState({
            calculation: calculation + "."
          });
        }
        break;
      }

      default: {
        let e = undefined;

        if (operators.includes(e.target.innerText)) {
          if (operators.includes(lastClicked) && innerText !== "-") {
          }
        }
      }
    }
  };

  digitLimitAlert() {
    let previousVal = this.state.calculation;
    this.setState({
      calculation: "Digit Limit Reached"
    });
    setTimeout(
      () =>
        this.setState({
          calculation: previousVal
        }),
      1000
    );
  }

  render() {
    const { calculation, lastClicked } = this.state;
    const { numbers, operators, ids } = this.props;
    return (
      <div className="Calculator-wrapper">
        <div className="Calculator">
          <div className="display" id="display">
            {calculation}
          </div>
          <hr></hr>
          <div className="buttons">
            <div className="controls">
              <button className="button">AC</button>
              <button className="button">CE</button>
            </div>
            <div className="numbers">
              {numbers.map(num => (
                <button className="button" key={num} id={ids[num]}>
                  {num}
                </button>
              ))}
              <button className="button" id="decimal">
                .
              </button>
            </div>
            <div className="operators">
              {operators.map(operator => (
                <button
                  className="button operator"
                  key={operator}
                  id={ids[operator]}
                >
                  {operator}
                </button>
              ))}
              <button className="button equals" id="equals">
                =
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Calculator;
