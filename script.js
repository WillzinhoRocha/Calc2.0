// Selectors of the DOM elements:

const display1Element = document.querySelector(".display-1");
const display2Element = document.querySelector(".display-2");
const tempResultElement = document.querySelector(".temp-result");
const numbersElement = document.querySelectorAll(".number");
const operationElement = document.querySelectorAll(".operation");
const equalElement = document.querySelector(".equal");
const clearAllElement = document.querySelector(".all-clear");
const clearEntryElement = document.querySelector(".clear-entry");

// Variables:

let display1Number = "";
let display2Number = "";
let result = null;
let lastOperation = "";
let haveDot = false;

//***** FUNCTIONS *****//

// Events listeners if the User clicks on a number or dot.
numbersElement.forEach((number) => {
  number.addEventListener("click", (e) => {
    // If the number doesn't have a dot, the function will add a "." on the number. If the number already has a dot, the function can't add another  "."

    if (e.target.innerText === "." && !haveDot) {
      haveDot = true;
    } else if (e.target.innerText === "." && haveDot) {
      return;
    }

    //This part of the function adds the number on the display.

    display2Number += e.target.innerText;
    display2Element.innerText = display2Number;
  });
});

//Clear display 2 and put the operation on display one and show the temporary result.

function clearVar(name = "") {
  display1Number += display2Number + " " + name + " ";
  display1Element.innerText = display1Number;
  display2Element.innerText = "0";
  display2Number = "";
  tempResultElement.innerText = result;
}

// Math function.

function mathOperation() {
  if (lastOperation === "*") {
    result = parseFloat(result) * parseFloat(display2Number);
  } else if (lastOperation === "/") {
    result = parseFloat(result) / parseFloat(display2Number);
  } else if (lastOperation === "+") {
    result = parseFloat(result) + parseFloat(display2Number);
  } else if (lastOperation === "-") {
    result = parseFloat(result) - parseFloat(display2Number);
  } else if (lastOperation === "%") {
    result = parseFloat(result) % parseFloat(display2Number);
  }
}

// The logical of the calculator.

operationElement.forEach((operation) => {
  operation.addEventListener("click", (e) => {
    if (!display2Number) return;
    haveDot = false;
    const operationName = e.target.innerText;
    if (display1Number && display2Number && lastOperation) {
      mathOperation();
    } else {
      result = parseFloat(display2Number);
    }
    clearVar(operationName);
    lastOperation = operationName;
  });
});

// The equal button function

equalElement.addEventListener("click", (e) => {
  if (!display1Number || !display2Number) return;
  haveDot = false;
  mathOperation();
  clearVar();
  display2Element.innerText = result;
  tempResultElement.innerText = "";
  display2Number = result;
  display1Number = "";
});

//The "Clear All" function

clearAllElement.addEventListener("click", (e) => {
  display1Element.innerText = "0";
  display2Element.innerText = "0";
  display1Number = "";
  display2Number = "";
  result = "";
  tempResultElement.innerText = "0";
});

//The "Clear Entry" function

clearEntryElement.addEventListener("click", (e) => {
  display2Element.innerText = "0";
  display2Number = "";
});

//****** OPERATING THE CALCULATOR WITH THE KEYBOARD ******//

function clickButtonElement(key) {
  numbersElement.forEach((button) => {
    if (button.innerText === key) {
      button.click();
    }
  });
}

function clickOperation(key) {
  operationElement.forEach((button) => {
    if (button.innerText === key) {
      button.click();
    }
  });
}

function clickEqual() {
  equalElement.click();
}

window.addEventListener("keydown", (e) => {
  if (
    e.key === "0" ||
    e.key === "1" ||
    e.key === "2" ||
    e.key === "3" ||
    e.key === "4" ||
    e.key === "5" ||
    e.key === "6" ||
    e.key === "7" ||
    e.key === "8" ||
    e.key === "9" ||
    e.key === "."
  ) {
    clickButtonElement(e.key);
  } else if (
    e.key === "*" ||
    e.key === "/" ||
    e.key === "+" ||
    e.key === "-" ||
    e.key === "%"
  ) {
    clickOperation(e.key);
  } else if (e.key == "Enter" || e.key === "=") {
    clickEqual();
  }
});
