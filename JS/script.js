// Corpo

let typing = document.querySelector("#typing");
let memory = document.querySelector("#memory");

// Números

let nums = document.querySelectorAll(".nums");

// Operações

let opeDivide = document.querySelector("#opeDivide");
let opeTimes = document.querySelector("#opeTimes");
let opeMinus = document.querySelector("#opeMinus");
let opePlus = document.querySelector("#opePlus");
let opeDot = document.querySelector("#opeDot");
let opeReverse = document.querySelector("#opeReverse");
let opeEqual = document.querySelector("#opeEqual");
let opeCE = document.querySelector("#opeCE");
let opeC = document.querySelector("#opeC");

// Funções

function dotify(txt) {
    txt = String(txt).split(".").join("").replace(",", ".")
    txt = Number(txt).toLocaleString("pt-BR");

    return txt;
}

function sizeCheck(txt) {
    txt = String(txt).split(".").join("");
    txt = parseFloat(txt);
    txt = String(txt).split("-").join("");

    return txt.length;
}

function numFix(number) {
    number = String(number).split(".").join("");
    number = number.replace(",", ".");

    return Number(parseFloat(number).toFixed(3));
}

function equalsTo(n1, n2, operation) {
    switch (operation) {
        case "÷":
            if (numFix(n1) == 0 && numFix(n2) == 0) {
                flagLimit = 1;
                return "INDEFINIDO!";
            }

            if (sizeCheck(numFix(numFix(n1) / numFix(n2))) > 10) {
                flagLimit = 1;
                return "LIMITE EXCEDIDO!";
            }

            if (numFix(n2) == 0) {
                flagLimit = 1;
                return "INFINITO!";
            }
            return dotify(String(numFix(numFix(n1) / numFix(n2))).replace(".", ","));
        case "x":
            if (sizeCheck(numFix(n1) * numFix(n2)) > 10) {
                flagLimit = 1;
                return "LIMITE EXCEDIDO!";
            }
            return dotify(String(numFix(n1) * numFix(n2)).replace(".", ","));
        case "-":
            if (sizeCheck(numFix(n1) - numFix(n2)) > 10) {
                flagLimit = 1;
                return "LIMITE EXCEDIDO!";
            }
            return dotify(String(numFix(n1) - numFix(n2)).replace(".", ","));
        case "+":
            if (sizeCheck(numFix(n1) + numFix(n2)) > 10) {
                flagLimit = 1;
                return "LIMITE EXCEDIDO!";
            }
            return dotify(String(numFix(n1) + numFix(n2)).replace(".", ","));
    }
}

function doOperation(n1, n2, operation) {
    if (flagLimit) {
        memory.innerHTML = "0";
        typing.innerHTML = "";
        flagLimit = 0;
        flagReset = 1;
    }

    if (String(typing.innerHTML).length === 0) {
        typing.innerHTML = memory.innerHTML;
        memory.innerHTML += operation;
    } else {
        if (memory.innerHTML == "0") {
            memory.innerHTML = typing.innerHTML + operation;
        } else {
            if (!(opeChoice == null)) {
                typing.innerHTML = equalsTo(n1, n2, opeChoice);
                memory.innerHTML = typing.innerHTML + operation;
            } else {
                memory.innerHTML = typing.innerHTML + operation;
            }
        }

        flagReset = 1;
    }

    opeChoice = operation;
}

// Ler números

let flagLimit = 0;
let flagReset = 1;

nums.forEach((num) => {
    num.addEventListener("click", () => {
        if (flagReset) {
            typing.innerHTML = "";
            flagReset = 0;
        }

        if (flagLimit) {
            memory.innerHTML = "0";
        }

        let postDotSize;

        try {
            postDotSize = Number(String(typing.innerHTML).split(",")[1].length);
        } catch (error) {
            postDotSize = 0;
        }

        if (sizeCheck(typing.innerHTML) < 10 && postDotSize < 3) {
            console.log(num.innerText)
            typing.innerHTML = dotify(
                String(typing.innerHTML + num.innerText)
                    .split(".")
                    .join("")
            );
        }
    });
});

// Ler operações

let opeChoice = null;

opeDivide.addEventListener("click", () => {
    doOperation(memory.innerHTML, typing.innerHTML, "÷");
});

opeTimes.addEventListener("click", () => {
    doOperation(memory.innerHTML, typing.innerHTML, "x");
});

opeMinus.addEventListener("click", () => {
    doOperation(memory.innerHTML, typing.innerHTML, "-");
});

opePlus.addEventListener("click", () => {
    doOperation(memory.innerHTML, typing.innerHTML, "+");
});

opeReverse.addEventListener("click", () => {
    if (flagLimit == 1) {
        memory.innerHTML = "0";
        typing.innerHTML = "";
        flagLimit = 0;
    }

    if (String(typing.innerHTML).length != 0) {
        typing.innerHTML = equalsTo(typing.innerHTML, -1, "x");
    }
});

opeDot.addEventListener("click", () => {
    if (flagLimit) {
        memory.innerHTML = "0";
        typing.innerHTML = "";
        flagLimit = 0;
    }

    if (!typing.innerHTML.includes(",")) {
        if (typing.innerHTML == "") {
            typing.innerHTML = "0";
        }
        typing.innerHTML += ",";
    }
});

opeCE.addEventListener("click", () => {
    typing.innerHTML = "";
    flagReset = 1;
});

opeC.addEventListener("click", () => {
    opeChoice = null;
    memory.innerHTML = "0";
    typing.innerHTML = "";
    flagReset = 1;
});

opeEqual.addEventListener("click", () => {
    if (flagLimit) {
        memory.innerHTML = "0";
        typing.innerHTML = "";
        flagLimit = 0;
    }

    if (String(typing.innerHTML).length !== 0) {
        if (opeChoice == null) {
            memory.innerHTML = typing.innerHTML;
            typing.innerHTML = "";
        } else {
            memory.innerHTML = equalsTo(memory.innerHTML, typing.innerHTML, opeChoice);
            typing.innerHTML = "";
        }

        flagReset = 1;
        opeChoice = null;
    }
});
