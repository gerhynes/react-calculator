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
    this.handleClear = this.handleClear.bind(this);
    this.handleNumber = this.handleNumber.bind(this);
    this.handleOperator = this.handleOperator.bind(this);
    this.handleEvaluate = this.handleEvaluate.bind(this);
  }

  static defaultProps = {
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
    // Evaluate total of formula
    let expression = this.state.formula;
    expression = expression.replace(/x/g, "*").replace(/‑/g, "-");
    let result = Math.round(1000000 * eval(expression)) / 1000000;
    this.setState({
      currentVal: result.toString(),
      formula: expression.replace(/\*/g, "x").replace(/-/g, "‑") + "=" + result,
      prevVal: result
    });
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
              handleClear={this.handleClear}
              handleNumber={this.handleNumber}
              handleOperator={this.handleOperator}
              handleEvaluate={this.handleEvaluate}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default Calculator;
