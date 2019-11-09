import React, { Component } from "react";
import Button from "../Button/Button";
import "./Calculator.css";

class Calculator extends Component {
  static defaultProps = {
    buttons: [
      { id: "clear", value: "A/C" },
      { id: "sign", value: "±" },
      { id: "percentage", value: "%" },
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
  render() {
    return (
      <div className="Calculator">
        <div className="display">
          <span className="previous">2 x 50 x 30</span>
          <h1 className="total">300</h1>
        </div>
        <hr></hr>
        <div className="buttons">
          {this.props.buttons.map(button => (
            // <button className="btn">{button}</button>
            <Button
              key={button.id}
              id={button.id}
              value={button.value}
            ></Button>
          ))}
        </div>
      </div>
    );
  }
}

export default Calculator;
