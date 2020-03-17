import React, { Component } from "react";
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
    const { operators, numbers, digitLimit } = this.props;
    const { innerText } = e.target;

    // TODO - Fix issue if first button clicked is =
    if (lastClicked === "=" && calculation === "0") {
    }

    switch (innerText) {
      case "AC": {
        this.setState({
          calculation: "0"
        });
        break;
      }

      case "=": {
        const evaluated = eval(calculation);
        this.setState({
          calculation: evaluated
        });
        break;
      }

      case ".": {
        const splitCalc = calculation.split(/[+\-*/]/);
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

        if (operators.includes(innerText)) {
          if (operators.includes(lastClicked) && innerText !== "-") {
            const lastNumberIndex = calculation
              .split("")
              .reverse()
              .findIndex(
                character => character !== " " && numbers.includes(+character)
              );
            e =
              calculation.slice(0, calculation.length - lastNumberIndex) +
              ` ${innerText} `;
          } else {
            e = `${calculation} ${innerText}`;
          }
        } else {
          e = calculation === "0" ? innerText : calculation + innerText;
        }

        this.setState({
          calculation: e
        });
      }
    }
    this.setState({
      lastClicked: innerText
    });
  };

  checkDigitLimit = (calculation, digitLimit) => {
    let previousVal = this.state.calculation;
    if (calculation.length >= digitLimit) {
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
  };

  render() {
    const { calculation } = this.state;
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
              <button className="button" onClick={this.handleClick} id="clear">
                AC
              </button>
            </div>
            <div className="numbers">
              {numbers.map(num => (
                <button
                  className="button"
                  key={num}
                  id={ids[num]}
                  onClick={this.handleClick}
                >
                  {num}
                </button>
              ))}
              <button
                className="button"
                id="decimal"
                onClick={this.handleClick}
              >
                .
              </button>
            </div>
            <div className="operators">
              {operators.map(operator => (
                <button
                  className="button operator"
                  key={operator}
                  id={ids[operator]}
                  onClick={this.handleClick}
                >
                  {operator}
                </button>
              ))}
              <button
                className="button equals"
                id="equals"
                onClick={this.handleClick}
              >
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
