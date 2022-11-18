export function validateInput(input, acceptedCharacters) {
    for (let i = 0; i < input.length; i++) {
        let currentChar = input.charAt(i);
        if (acceptedCharacters === currentChar || acceptedCharacters.includes(currentChar)) {
            continue;
        } else if (isNaN(Number.parseInt(currentChar))) {
            return false;
        }
    }
    return true;
}

export function validateNumberInput(input) {
    return input > 0;
}

export function visualizeInput(input, currentStep) {
    let elements = [];
    if (input.length > 0) {
        for (let i = 0; i < input.length; i++) {
            if (i < currentStep) {
                continue;
            } else if (i === currentStep) {
                elements.push(<div className='highlighted m-2' key={i}>{input[i]}</div>);
            } else {
                elements.push(<div className='m-2' key={i}>{input[i]}</div>);
            }
        }
    }
    return elements;
}