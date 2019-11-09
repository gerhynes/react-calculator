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
      currentSign: "pos"
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

  handleClear() {
    this.setState({
      prevVal: "0",
      currentVal: "0",
      formula: "",
      mathOperator: "",
      currentSign: "pos"
    });
  }

  handleNumber(e) {
    // Pass number to formula
    this.setState({
      formula: this.state.formula + e.target.value,
      currentVal: e.target.value
    });
  }

  handleOperator(e) {
    // Set operator and pass to formula
    this.setState({
      mathOperator: e.target.value,
      formula: this.state.formula + ` ${e.target.value} `
    });
  }

  handleEvaluate() {
    // Evaluate total of formula
    this.setState({
      currentVal: eval(this.state.formula)
    });
  }

  render() {
    const { formula, currentVal } = this.state;
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
          {this.props.allBtns.map(button => (
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
