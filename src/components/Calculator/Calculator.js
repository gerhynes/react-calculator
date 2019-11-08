import React, { Component } from "react";
import "./Calculator.css";

class Calculator extends Component {
  static defaultProps = {
    buttons: [
      "A/C",
      "*",
      "%",
      "/",
      "7",
      "8",
      "9",
      "X",
      "4",
      "5",
      "6",
      "-",
      "1",
      "2",
      "3",
      "+",
      "00",
      "0",
      ".",
      "="
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
            <button className="btn">{button}</button>
          ))}
        </div>
      </div>
    );
  }
}

export default Calculator;
