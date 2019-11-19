import React, { Component } from "react";
import Button from "../Button/Button";
import "./Calculator.css";

class Calculator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      prevVal: "",
      currentVal: "0",
      formula: "",
      currentSign: "pos",
      lastClicked: ""
    };
    this.handleNumber = this.handleNumber.bind(this);
    this.handleDecimal = this.handleDecimal.bind(this);
    this.handleOperator = this.handleOperator.bind(this);
    this.handleClear = this.handleClear.bind(this);
    this.handleEvaluate = this.handleEvaluate.bind(this);
    this.digitLimitAlert = this.digitLimitAlert.bind(this);
  }

  static defaultProps = {
    digitLimit: 10,
    allBtns: [
      { id: "clear", value: "A/C" },
      { id: "cancel", value: "CE" },
      { id: "sign", value: "±" },
      { id: "divide", value: "/" },
      { id: "seven", value: "7" },
      { id: "eight", value: "8" },
      { id: "nine", value: "9" },
      { id: "multiply", value: "x" },
      { id: "four", value: "4" },
      { id: "five", value: "5" },
      { id: "six", value: "6" },
      { id: "subtract", value: "-" },
      { id: "one", value: "1" },
      { id: "two", value: "2" },
      { id: "three", value: "3" },
      { id: "add", value: "+" },
      { id: "double-zero", value: "00" },
      { id: "zero", value: "0" },
      { id: "decimal", value: "." },
      { id: "equals", value: "=" }
    ]
  };

  isOperator = /[x/+‑]/;
  endsWithOperator = /[x/+‑]$/;

  handleClear() {
    this.setState({
      currentVal: "0",
      prevVal: "0",
      formula: "",
      currentSign: "pos",
      lastClicked: ""
    });
  }

  handleNumber(e) {
    if (this.state.currentVal.indexOf("Limit") === -1) {
      this.setState({
        lastClicked: "num"
      });
      if (this.state.currentVal.length > this.props.digitLimit) {
        this.digitLimitAlert();
      } else {
        this.setState({
          // If currentVal is 0 or an operator, replace with input
          // Otherwise concat on input
          currentVal:
            this.state.currentVal === "0" ||
            this.isOperator.test(this.state.currentVal)
              ? e.target.value
              : this.state.currentVal + e.target.value,
          // If currentVal is 0 and input is 0, keep formula the same
          // Otherwise:
          // if formula ends in an operator followed by 0, remove the final character
          // otherwise, concat on the input
          formula:
            this.state.currentVal === "0" && e.target.value === "0"
              ? this.state.formula
              : /([^.0-9]0)$/.test(this.state.formula)
              ? this.state.formula.slice(0, -1) + e.target.value
              : this.state.formula + e.target.value
        });
      }
    }
  }

  handleDecimal(e) {
    this.setState({
      currentVal: this.state.formula + ".",
      formula: this.state.formula + "."
    });
  }

  handleOperator(e) {
    // Save formula to prevVal to let you change operator after clicking an operator
    this.setState({
      prevVal: !this.isOperator.test(this.state.currentVal)
        ? this.state.formula
        : this.state.prevVal,
      formula: !this.isOperator.test(this.state.currentVal)
        ? (this.state.formula += e.target.value)
        : (this.state.prevVal += e.target.value)
    });
    this.setState({
      currentVal: e.target.value,
      lastClicked: "operator"
    });
  }

  handleEvaluate() {
    if (!this.lockOperators(this.state.formula, this.state.currentVal)) {
      let expression = this.state.formula;
      if (this.endsWithOperator.test(expression))
        expression = expression.slice(0, -1);
      expression = expression.replace(/x/g, "*").replace(/‑/g, "-");
      let result = Math.round(1000000 * eval(expression)) / 1000000;
      this.setState({
        currentVal: result.toString(),
        formula:
          expression.replace(/\*/g, "x").replace(/-/g, "‑") + "=" + result,
        prevVal: result,
        lastClicked: "evaluate"
      });
    }
  }

  lockOperators(formula, currentVal) {
    // Lock operators if formula ends in * or - or if digitLimitAlert is showing
    return (
      formula.lastIndexOf("*") === formula.length - 1 ||
      formula.lastIndexOf("-") === formula.length - 1 ||
      currentVal.indexOf("Met") !== -1
    );
  }

  digitLimitAlert() {
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
  }

  render() {
    const { formula, currentVal } = this.state;
    const { allBtns } = this.props;
    return (
      <div className="Calculator">
        <div className="display">
          <div className="formula">{formula}</div>
          <h1 className="total" id="display">
            {currentVal}
          </h1>
        </div>
        <hr></hr>
        <div className="buttons">
          {allBtns.map(button => (
            <Button
              key={button.id}
              id={button.id}
              value={button.value}
              handleNumber={this.handleNumber}
              handleDecimal={this.handleDecimal}
              handleOperator={this.handleOperator}
              handleClear={this.handleClear}
              handleEvaluate={this.handleEvaluate}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default Calculator;
