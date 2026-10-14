// global variables
// 5+3
// 5 => first operand
// + => operator
// 3 => second operand
const debug = true;
let state;
let display;

let first;
let second;
let operator;

const init = () => {
  state = "first";
  display = "0";
  first = 0;
  second = 0;
  operator = "?";
};

const render = () => {
  const insertSeparator = (str, separator = " ", groupSize = 3) => {
    let resultString = " ";
    let counter = 0;
    for (let i = str.length - 1; i >= 0; i--) {
      resultString = str[i] + resultString;
      if (i !== 0 && counter % groupSize === groupSize - 1)
        resultString = separator + resultString;
      counter++;
    }
    return resultString;
  };

  const outString = insertSeparator(display);
  document.getElementById("screen").innerText = outString;
  debug &&
    console.log(
      `state: ${state}, display: ${display}, first: ${first}, second: ${second}, operator: ${operator}`,
    );
};

const numberClick = (num) => {
  console.log(num); //แสดงตัวเลขที่กด
  switch (state) {
    case "first":
      if (display.length < 9) {
        if (display === "0") {
          display = String(num);
        } else {
          display += String(num);
        }
      }
      break;

    case "operator":
      display = String(num);
      state = "second";
      break;
    case "second":
      if (display.length < 9) {
        if (display === "0") {
          display = String(num);
        } else {
          display += String(num);
        }
      }
      break;
  }

  render();
};

const operatorClick = (op) => {
  console.log(op); //แสดงoperatorที่กด
  switch (state) {
    case "first":
      first = Number(display);
      operator = String(op);
      state = "operator";
      break;
    case "operator":
      break;
    case "second":
      break;
  }
  render();
};

const equalClick = () => {
  switch (state) {
    case "first":
      if (operator === "+") first = first + second;
      else if (operator === "-") first = first - second;
      display = String(first);
      break;
    case "operator":
      second = first;
      if (operator === "+") first = first + second;
      else if (operator === "-") first = first - second;
      display = String(first);
      state = "first";
      break;
    case "second":
      second = Number(display);
      if (operator === "+") first = first + second;
      else if (operator === "-") first = first - second;
      display = String(first);
      state = "first";
      break;
  }
  render();
};
const ceClick = () => {
  init();
  render();
};

document.addEventListener("keydown", (e) => {
  // console.log(e.key)
  if (e.key >= "0" && e.key <= "9") numberClick(Number(e.key));
  else if (e.key === "+") operatorClick("+");
  else if (e.key === "-") operatorClick("-");
  else if (e.key === "c" || e.key === "c") ceClick();
  else if (e.key === "=" || e.key === "Enter") equalClick();
});

document.addEventListener("DOMContentLoaded", () => {
  // initial sytem
  init();
  //first render
  render();
});
