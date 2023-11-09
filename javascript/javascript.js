/////////////////////////////////////////////////////////////////////////////////////////
// Program: javascript.js
// Description: Dynamic scripting for the odin-calculator. This is simply
// just the practice version of the actual Project on the The Odin
// Project.
// Notes:
//////////////////////////////////////////////////////////////////////////////////////////

console.log("Just a test"); // Testing 

// Empty object
let objectContainer = {};

// number-button - nodes from the DOM for the 'number-button' element.
let numberButton = document.querySelectorAll('.number-button');

// operator-button - nodes from the DOM for the 'operator-button' element.
let operatorButton = document.querySelectorAll('.operator-button');

// calculator-screen - node for the calculator screen.
const calculatorScreen = document.querySelector('.calculator-screen');
// default number on the calculator screen is zero.
calculatorScreen.textContent = 0;

// Will add an addEventListener function to each button for the number pad.
// This avoids doing an addEvenetListener for each button on the number pad. 
for (let i = 0; i < numberButton.length; i++)
{
    numberButton.item(i).addEventListener('click', (e) => {
        console.log(e);
        numberPad(e.target.textContent);
    });
}

// Will add an addEventListener function to each button for the operator pad.
for (let i = 0; i < operatorButton.length; i++)
{
    operatorButton.item(i).addEventListener('click', (e) => {
        operatorPad(e.target.textContent);
    });
}

// Function numberPad() - Will add numbers to the object from the number pad that the user clicked on.
function numberPad(e)
{
    // Using the value from the calculation between numOne and numTwo to produce another value. 
    if(('value' in objectContainer) && !('numOne' in objectContainer) && ('operator' in objectContainer))
    {
        objectContainer['numOne'] = [e];
        calculatorScreen.textContent = objectContainer.numOne;
    }
    else if (('value' in objectContainer) && ('numOne' in objectContainer) && (objectContainer.numOne.length < 10))
    {
        objectContainer['numOne'] += [e];
        calculatorScreen.textContent = objectContainer.numOne;
    }

    // First entry for numOne.
    if (!('numOne' in objectContainer) && !('operator' in objectContainer))
    {
        objectContainer['numOne'] = [e];
        calculatorScreen.textContent = objectContainer.numOne;
    }
    else if (('numOne' in objectContainer) && !('operator' in objectContainer) && (objectContainer.numOne.length < 10))
    {
        // Stop user from entering a bunch of zeros for the first number entry.
        if (objectContainer.numOne[0] == 0)
        {
            objectContainer['numOne'] = [e]; 
            calculatorScreen.textContent = objectContainer.numOne;
        }
        else
        {
            console.log("activated"); // testing before operator clicked.
            objectContainer['numOne'] += [e];
            calculatorScreen.textContent = objectContainer.numOne;
        }
    }
    console.log(`Before operator - numOne: ${objectContainer.numOne}`) // testing before the operator is clicked.
    console.log("\n");

    // First entry for numTwo.
    if (!('numTwo' in objectContainer) && ('operator' in objectContainer) && !('value' in objectContainer))
    {
        objectContainer['numTwo'] = [e];
        calculatorScreen.textContent = objectContainer.numTwo;
    }
    else if (('numTwo' in objectContainer) && (objectContainer.numTwo.length < 10) && !('value' in objectContainer))
    {
        // Stop zero from being the first number in the second entry. 
        if (objectContainer.numTwo[0] == 0) 
        {
            objectContainer['numTwo'] = [e];
            calculatorScreen.textContent = objectContainer.numTwo;
        }
        else
        {
            objectContainer['numTwo'] += [e];
            calculatorScreen.textContent = objectContainer.numTwo;
        }
    }
    console.log(`After operator - numOne: ${objectContainer.numOne}`); // testing after the operator is clicked.
    console.log(`After operator - numTwo: ${objectContainer.numTwo}`); // testing after the operator is clicked.
    console.log("\n");
}

// Function operatorPad() - Will add an operator(+, -, *, /) to the object from the operator pad that the user clicked on. 
function operatorPad(e)
{
    // If any of the 'operator-buttons' were used to calculate results.
    if (('numOne' in objectContainer) && !('operator' in objectContainer))
    {
        calculatorScreen.textContent = objectContainer.numOne + e
        objectContainer['operator'] = e;
    }
    else if (('numOne' in objectContainer) && ('numTwo' in objectContainer) && ('operator' in objectContainer))
    {
        operate(objectContainer.numOne, objectContainer.operator, objectContainer.numTwo);
        calculatorScreen.textContent = objectContainer.value + e;
        objectContainer['operator'] = e;
    }
    else if (('value' in objectContainer) && ('numOne' in objectContainer) && ('operator' in objectContainer))
    {
        operate(objectContainer.value, objectContainer.operator, objectContainer.numOne);
        calculatorScreen.textContent = objectContainer.value + e;
        objectContainer['operator'] = e;
    }

    // If the 'equal-button' was used to calculate results prior.
    if (('value' in objectContainer) && !('operator' in objectContainer))
    {
        objectContainer['operator'] = e;
        calculatorScreen.textContent = objectContainer.value + e;
    }
}

// equal-button - node for the equal button on the operator pad.
const equalButton = document.querySelector('.equal-button');
// Perform calculation with addEventListener if the user clicks the equal button on the
// operator pad. The event will call the operate function to perform the calculation.
equalButton.addEventListener('click', (e)=>{
    if (('numOne' in objectContainer) && ('numTwo' in objectContainer) && ('operator' in objectContainer))
    {
        operate(objectContainer.numOne, objectContainer.operator, objectContainer.numTwo);
    }
    else if (('value' in objectContainer) && ('numOne' in objectContainer) && ('operator' in objectContainer))
    {
        operate(objectContainer.value, objectContainer.operator, objectContainer.numOne);
    }
})

// clear-button - node for the clear button on the operator pad.
const clearButton = document.querySelector('.clear-button');
// Will clear the entire calculator-screen if the user clicks the clear button on the
// operator pad. This is done by deleting all properties in objectContainer.
clearButton.addEventListener('click', () => {
    delete objectContainer.numOne;
    delete objectContainer.numTwo;
    delete objectContainer.value;
    delete objectContainer.operator;
    calculatorScreen.textContent = 0;
});

// Function operate() - Will perform mathematical calculations between the 'numOne' and 'numTwo'.
// nOne = numOne; sign = operator; nTwo = numTwo
function operate(nOne, sign, nTwo)
{
    console.log(`nOne: ${nOne}`); // testing 
    console.log(`nTwo: ${nTwo}`); // testing
    if (sign == '+')
    {
        addition(nOne, nTwo);
    }
    else if (sign == '-')
    {
        subtraction(nOne, nTwo);
    }
    else if (sign == '/' && nTwo == 0)
    {
        calculatorScreen.textContent = 'Well look at you...';
    }
    else if (sign == '/')
    {
        division(nOne, nTwo);
    }
    else if (sign == '*')
    {
        multiplication(nOne, nTwo);
    }
}

// addition - Addition calculation
function addition(nOne, nTwo)
{
    let result = Number(nOne) + Number(nTwo);
    calculatorScreen.textContent = result.toFixed(3).replace(/\.?0+$/, "");
    objectContainer['value'] = result.toFixed(3).replace(/\.?0+$/, "");
    delete objectContainer.numOne;
    delete objectContainer.numTwo;
    delete objectContainer.operator;
} 

// subtraction() - Subtraction calculation
function subtraction(nOne, nTwo)
{
    let result = Number(nOne) - Number(nTwo);
    calculatorScreen.textContent = result.toFixed(3).replace(/\.?0+$/, "");
    objectContainer['value'] = result.toFixed(3).replace(/\.?0+$/, "");
    delete objectContainer.numOne;
    delete objectContainer.numTwo;
    delete objectContainer.operator;
}

// division() - Division calculation
function division(nOne, nTwo)
{
    let result = Number(nOne) / Number(nTwo);
    calculatorScreen.textContent = result.toFixed(3).replace(/\.?0+$/, "");
    objectContainer['value'] = result.toFixed(3).replace(/\.?0+$/, "");
    delete objectContainer.numOne;
    delete objectContainer.numTwo;
    delete objectContainer.operator;
}

// multiplication() - Multiplication calculation
function multiplication(nOne, nTwo)
{
    let result = Number(nOne) * Number(nTwo);
    calculatorScreen.textContent = result.toFixed(3).replace(/\.?0+$/, "");
    objectContainer['value'] = result.toFixed(3).replace(/\.?0+$/, "");
    delete objectContainer.numOne;
    delete objectContainer.numTwo;
    delete objectContainer.operator;
}