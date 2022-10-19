export function validateInput(input, acceptedCharacters) {
    for (let i = 0; i < input.length; i++) {
        let currentChar = input.charAt(i);
        if (acceptedCharacters === currentChar || acceptedCharacters.includes(currentChar)) {
            continue;
        } else if (isNaN(Number.parseInt(currentChar))) {
            console.log("input is invalid!!")
            return false;
        }
    }
    return true;
}

export function validateNumberInput(input) {
    return input > 0;
}