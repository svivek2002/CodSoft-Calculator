// script.js
document.addEventListener("DOMContentLoaded", function () {
  const display = document.getElementById("display");
  const buttons = document.querySelectorAll(".btn");
  let currentInput = "";
  let fullExpression = "";

  buttons.forEach((button) => {
    button.addEventListener("click", function () {
      const value = this.getAttribute("data-value");
      handleInput(value);
    });
  });
  document.addEventListener("keydown", function (event) {
    const key = event.key;
    if (key >= "0" && key <= "9") {
      handleInput(key);
    } else if (key === ".") {
      handleInput(".");
    } else if (key === "+") {
      handleInput("+");
    } else if (key === "-") {
      handleInput("-");
    } else if (key === "*") {
      handleInput("*");
    } else if (key === "/") {
      handleInput("/");
    } else if (key === "Enter" || key === "=") {
      handleInput("=");
    } else if (key === "Backspace") {
      handleInput("X");
    } else if (key === "Escape" || key === "C" || key === "c" || key === "Delete") {
      handleInput("C");
    }
  });
  function handleInput(value) {
    if (value === "C") {
      currentInput = "";
      fullExpression = "";
      updateDisplay();
    } else if (value === "=") {
      if (fullExpression !== "") {
        fullExpression += currentInput;
        let result;
        try {
          result = eval(fullExpression).toString();
        } catch {
          result = "Error";
        }
        display.querySelector(".input").innerText = fullExpression;
        display.querySelector(".output").innerText = result;
        fullExpression = "";
        currentInput = result;
      }
    } else if (value === "X") {
      if (currentInput.length > 0) {
        currentInput = currentInput.slice(0, -1);
      } else if (fullExpression.length > 0) {
        fullExpression = fullExpression.slice(0, -1);
      }
      updateDisplay();
    } else if (["+", "-", "*", "/"].includes(value)) {
      if (currentInput !== "") {
        fullExpression += currentInput + value;
        currentInput = "";
      } else if (fullExpression !== "") {
        fullExpression = fullExpression.slice(0, -1) + value;
      }
      updateDisplay();
    } else {
      currentInput += value;
      updateDisplay();
    }
  }

  function updateDisplay() {
    display.querySelector(".input").innerText = fullExpression + currentInput;
    display.querySelector(".output").innerText = "";
  }
});
