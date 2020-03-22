import React, { Component } from "react";
import "./Calculator.css";

class Calculator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentVal: "0",
      prevVal: "0",
      formula: "",
      lastClicked: "",
      evaluated: false
    };
  }

  static defaultProps = {
    isOperator: /[x/+‑]/,
    endsWithOperator: /[x+‑/]$/,
    endsWithMinus: /[x/+]‑$/,
    digitLimit: 10,
    numbers: [7, 8, 9, 4, 5, 6, 1, 2, 3, 0],
    operators: ["/", "×", "-", "+"],
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

  handleClear = () => {
    this.setState({
      currentVal: "0",
      prevVal: "0",
      formula: "0",
      lastClicked: "",
      evaluated: false
    });
  };

  handleDecimal = () => {
    const { currentVal, evaluated, formula } = this.state;
    const { digitLimit, endsWithOperator } = this.props;
    if (evaluated === true) {
      this.setState({
        currentVal: "0.",
        formula: "0.",
        evaluated: false
      });
    } else if (!currentVal.includes(".") && !currentVal.includes("Limit")) {
      this.setState({
        evaluated: false
      });
      if (currentVal.length > digitLimit) {
        this.maxDigitAlert();
      } else if (
        endsWithOperator.test(formula) ||
        (currentVal === "0" && formula === "")
      ) {
        this.setState({
          currentVal: "0.",
          formula: formula + "0."
        });
      } else {
        this.setState({
          currentVal: formula.match(/(-?\d+\.?\d*)$/)[0] + ".",
          formula: formula + "."
        });
      }
    }
  };

  handleNumber = e => {
    console.log(e.target.value);
    if (!this.state.currentVal.includes("Limit")) {
      const { currentVal, formula, evaluated } = this.state;
      const { digitLimit, isOperator } = this.props;
      const value = e.target.value;
      this.setState({ evaluated: false });
      if (currentVal.length > digitLimit) {
        this.maxDigitAlert();
      } else if (evaluated) {
        this.setState({
          currentVal: value,
          formula: value !== "0" ? value : ""
        });
      } else {
        this.setState({
          currentVal:
            currentVal === "0" || isOperator.test(currentVal)
              ? value
              : currentVal + value,
          formula:
            currentVal === "0" && value === "0"
              ? formula === ""
                ? value
                : formula
              : /([^.0-9]0|^0)$/.test(formula)
              ? formula.slice(0, -1) + value
              : formula + value
        });
      }
    }
  };

  handleOperator = e => {
    if (!this.state.currentVal.includes("Limit")) {
      const value = e.targetvalue;
      const { formula, prevVal, evaluated } = this.state;
      const { endsWithOperator, endsWithMinus } = this.props;
      this.setState({
        currentVal: value,
        evaluated: false
      });
      if (evaluated) {
        this.setState({
          formula: prevVal + value
        });
      } else if (!endsWithOperator.test(formula)) {
        this.setState({
          prevVal: formula,
          formula: formula + value
        });
      } else if (!endsWithMinus.test(formula)) {
        this.setState({
          formula:
            (endsWithMinus.test(formula + value) ? formula : prevVal) + value
        });
      } else if (value !== "-") {
        this.setState({
          formula: prevVal + value
        });
      }
    }
  };

  handleCalculate = () => {
    if (!this.state.currentVal.includes("Limit")) {
      let expression = this.state.formula;
      while (this.props.endsWithOperator.test(expression)) {
        expression = expression.slice(0, -1);
      }
      expression = expression.replace(/x/g, "*");
      let result = Math.round(10000000 * eval(expression)) / 10000000;
      this.setState({
        currentVal: result.toString(),
        formula: expression + "=" + result,
        prevVal: result,
        evaluated: true
      });
    }
  };

  maxDigitAlert = () => {
    this.setState({
      currentVal: "Digit Limit Met",
      prevVal: this.state.currentVal
    });
    setTimeout(
      () =>
        this.setState({
          currentVal: this.state.prevVal
        }),
      1000
    );
  };

  render() {
    const { formula, currentVal } = this.state;
    const { numbers, operators, ids } = this.props;
    return (
      <div className="Calculator-wrapper">
        <div className="Calculator">
          <div className="display" id="display">
            <div className="formula">{formula}</div>
            <div className="currentVal">{currentVal}</div>
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
                  onClick={this.handleNumber}
                  value={num}
                >
                  {num}
                </button>
              ))}
              <button
                className="button"
                id="decimal"
                onClick={this.handleDecimal}
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
                  onClick={this.handleOperator}
                >
                  {operator}
                </button>
              ))}
              <button
                className="button equals"
                id="equals"
                onClick={this.handleCalculate}
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
