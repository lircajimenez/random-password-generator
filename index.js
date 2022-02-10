// DOM elements
const resultEl = document.getElementById("option1");
const result2El = document.getElementById("option2");
const clipboardEl = document.getElementById("clipboard");
const clipboard2El = document.getElementById("clipboard2");
const lengthEL = document.getElementById("length");
const lowerEL = document.getElementById("lowercase");
const upperEL = document.getElementById("uppercase");
const numbersEL = document.getElementById("numbers");
const symbolsEL = document.getElementById("symbols");
const generateEL = document.getElementById("generate");

const randomFunc = {
  lower: getRandomLower,
  upper: getRandomUpper,
  number: getRandomNumber,
  symbol: getRandomSymbol,
};

generateEL.addEventListener("click", () => {
  //get the values of inputs into variables
  //by adding + it will turn it to number
  const length = +lengthEL.value;
  const hasLower = lowerEL.checked;
  const hasUpper = upperEL.checked;
  const hasNumbers = numbersEL.checked;
  const hasSymbols = symbolsEL.checked;

  resultEl.innerText = generatePassword(
    hasLower,
    hasUpper,
    hasNumbers,
    hasSymbols,
    length
  );

  result2El.innerText = generatePassword(
    hasLower,
    hasUpper,
    hasNumbers,
    hasSymbols,
    length
  );
});

// Copy password to clipboard
clipboardEl.addEventListener("click", () => {
  const textarea = document.createElement("textarea");
  const password = resultEl.innerText;

  if (!password) {
    return;
  }

  textarea.value = password;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  textarea.remove();
  alert("Copied to clipboard!");
});

clipboard2El.addEventListener("click", () => {
  const textarea = document.createElement("textarea");
  const password = result2El.innerText;

  if (!password) {
    return;
  }

  textarea.value = password;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  textarea.remove();
  alert("Copied to clipboard!");
});

function generatePassword(lower, upper, number, symbol, length) {
  // 1. Init pw variable
  let generatedPassword = "";

  const typesCount = lower + upper + number + symbol;
  //console.log("typesCount", typesCount);

  // 2. filter out the unchecked
  const typesArr = [{ lower }, { upper }, { number }, { symbol }].filter(
    (item) => Object.values(item)[0]
  );
  //console.log("typesArr", typesArr);

  if (typesCount === 0) {
    return "";
  }

  // 3. loop over length call generator func for each type
  for (let i = 0; i < length; i += typesCount) {
    typesArr.forEach((type) => {
      const funcName = Object.keys(type)[0];
      //console.log("funcName", funcName);

      generatedPassword += randomFunc[funcName]();
    });
  }
  //4. add final password to pw var and return
  const finalPassword = generatedPassword.slice(0, length);
  return finalPassword;
}

// Generator Functions - https://net-comber.com/charset.html

function getRandomLower() {
  //97 is the character code of a; +26 for range a-z
  return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

function getRandomUpper() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

function getRandomNumber() {
  return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

function getRandomSymbol() {
  const symbols = "!@#$%^&*(){}[]=<>/,.";
  return symbols[Math.floor(Math.random() * symbols.length)];
}
