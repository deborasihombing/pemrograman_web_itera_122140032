function appendValue(value) {
    document.getElementById("display").value += value;
    calculateResult();
}

function appendOperator(operator) {
    let display = document.getElementById("display");
    if (display.value !== "" && !isNaN(display.value.slice(-1))) {
        display.value += operator;
    }
}

function clearDisplay() {
    document.getElementById("display").value = "";
    document.getElementById("result").textContent = "";
}

function calculateResult() {
    try {
        let expression = document.getElementById("display").value;
        expression = expression.replace(/Math.sqrt\((.*?)\)/g, 'Math.sqrt($1)');
        let result = eval(expression);
        document.getElementById("result").textContent = "Hasil: " + result;
    } catch (e) {
        document.getElementById("result").textContent = "";
    }
}
