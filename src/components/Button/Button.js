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

  return <button className={btnClass}>{props.value}</button>;
}
