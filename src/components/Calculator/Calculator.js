import React, { Component } from "react";
import Button from "../Button/Button";
import "./Calculator.css";

class Calculator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      prevVal: "2 x 50 x 3",
      currentVal: "300",
      formula: "",
      currentSign: "pos"
    };
    this.handleClear = this.handleClear.bind(this);
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
      currentSign: "pos"
    });
  }
  render() {
    const { prevVal, currentVal } = this.state;
    return (
      <div className="Calculator">
        <div className="display">
          <span className="previous">{prevVal}</span>
          <h1 className="total">{currentVal}</h1>
        </div>
        <hr></hr>
        <div className="buttons">
          {this.props.allBtns.map(button => (
            <Button
              key={button.id}
              id={button.id}
              value={button.value}
              handleClear={this.handleClear}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default Calculator;
