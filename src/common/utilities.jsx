export function validateSimpleInput(input) {
    for (let i = 0; i < input.length; i++) {
        let currentChar = input.charAt(i);
        if (currentChar === ',' || currentChar === ' ') {
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