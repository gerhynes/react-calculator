import React from "react";
import "./Button.css";

export default function Button(props) {
  const operators = /^[x/+-]/;
  const numbers = /\d/;

  // ============
  // Apply styles
  // ============
  let btnClass = "";

  // Check button type
  if (operators.test(props.value)) {
    btnClass = "btn operator";
  } else if (props.value === "=") {
    btnClass = "btn equals";
  } else {
    btnClass = "btn";
  }

  // ===================
  // Add methods
  // ===================
  let btnFunc;
  // Check if clear was pressed
  if (props.value === "A/C") {
    btnFunc = props.handleClear;
  }
  // Check if a number was entered
  if (numbers.test(props.value)) {
    btnFunc = props.handleNumber;
  }
  // Check of operator was pressed
  if (operators.test(props.value)) {
    btnFunc = props.handleOperator;
  }
  // Check if decimal was pressed
  if (props.value === ".") {
    btnFunc = props.handleDecimal;
  }
  // Check if toggleSign was pressed
  if (props.value === "±") {
    btnFunc = props.handleToggleSign;
  }
  if (props.value === "CE") {
    btnFunc = props.handleCE;
  }
  // Check if eval pressed
  if (props.value === "=") {
    btnFunc = props.handleEvaluate;
  }

  return (
    <button
      className={btnClass}
      onClick={btnFunc}
      value={props.value}
      id={props.id}
    >
      {props.value}
    </button>
  );
}
