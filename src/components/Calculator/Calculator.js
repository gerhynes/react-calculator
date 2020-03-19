import React, { Component } from "react";
import "./Calculator.css";

class Calculator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentVal: "0",
      prevVal: "0",
      formula: "0",
      lastClicked: ""
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
    const { formula, lastClicked } = this.state;
    const { operators, numbers, digitLimit } = this.props;
    const { innerText } = e.target;

    // TODO - Fix issue if first button clicked is =
    if (lastClicked === "=") {
      this.setState({
        lastClicked: undefined,
        formula: "0",
        operation: undefined
      });
      this.calculate(e);
    } else {
      this.calculate(e);
    }
  };

  handleClear = () => {
    this.setState({
      currentVal: "0",
      prevVal: "0",
      formula: "0",
      lastClicked: ""
    });
  };

  handleNumber = e => {};
  handleDecimal = () => {};
  handleOperator = () => {};

  handleCalculate = e => {
    const { formula, lastClicked } = this.state;
    const { operators, numbers, digitLimit } = this.props;
    const { innerText } = e.target;

    switch (innerText) {
      case "AC": {
        this.setState({
          formula: "0"
        });
        break;
      }

      case "=": {
        const evaluated = eval(formula);
        this.setState({
          formula: evaluated
        });
        break;
      }

      case ".": {
        const splitCalc = formula.split(/[+\-*/]/);
        const last = splitCalc.slice(-1)[0];

        if (!last.includes(".")) {
          this.setState({
            formula: formula + "."
          });
        }
        break;
      }

      default: {
        let e = undefined;

        if (operators.includes(innerText)) {
          if (operators.includes(lastClicked) && innerText !== "-") {
            const lastNumberIndex = formula
              .split("")
              .reverse()
              .findIndex(
                character => character !== " " && numbers.includes(+character)
              );
            e =
              formula.slice(0, formula.length - lastNumberIndex) +
              ` ${innerText} `;
          } else {
            e = `${formula}${innerText}`;
          }
        } else {
          e = formula === "0" ? innerText : formula + innerText;
        }

        this.setState({
          formula: e
        });
      }
    }
    this.setState({
      lastClicked: innerText
    });
  };

  checkDigitLimit = (formula, digitLimit) => {
    let previousVal = this.state.formula;
    if (formula.length >= digitLimit) {
      this.setState({
        formula: "Digit Limit Reached"
      });
      setTimeout(
        () =>
          this.setState({
            formula: previousVal
          }),
        1000
      );
    }
  };

  render() {
    const { formula } = this.state;
    const { numbers, operators, ids } = this.props;
    return (
      <div className="Calculator-wrapper">
        <div className="Calculator">
          <div className="display" id="display">
            {formula}
          </div>
          <hr></hr>
          <div className="buttons">
            <div className="controls">
              <button className="button" onClick={this.handleClear} id="clear">
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
