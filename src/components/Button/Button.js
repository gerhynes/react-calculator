import React from "react";
import "./Button.css";

export default function Button(props) {
  // Check button type
  const operators = /[x/+-]/;
  let btnClass = "";
  if (operators.test(props.value)) {
    btnClass = "btn operator";
  } else if (props.value === "=") {
    btnClass = "btn equals";
  } else {
    btnClass = "btn";
  }

  // check button function
  let btnFunc;
  if (props.value === "A/C") {
    btnFunc = props.handleClear;
  }

  return (
    <button className={btnClass} onClick={btnFunc}>
      {props.value}
    </button>
  );
}
