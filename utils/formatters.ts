// utils/formatters.ts
export const formatLargeNumbers = (value: string, includeSymbol: boolean = true): string => {
    const lastChar = value[value.length - 1];
    let numberValue: number;
    let symbol = '';
    let unit = '';

    if (isNaN(parseInt(lastChar))) {
        numberValue = parseFloat(value.slice(1, value.length - 2).replace(/,/g, '.'));
        symbol = value[0];
        unit = lastChar === 'B' ? ' billion' : lastChar === 'M' ? ' million' : lastChar === 'T' ? ' trillion' : '';
    } else {
        numberValue = parseFloat(value.slice(1).replace(/,/g, ''));
        symbol = value[0];

        if (numberValue >= 1_000_000_000) {
            numberValue /= 1_000_000_000;
            unit = ' billion';
        } else if (numberValue >= 1_000_000) {
            numberValue /= 1_000_000;
            unit = ' million';
        } else if (numberValue >= 1_000) {
            numberValue /= 1_000;
            unit = ' thousand';
        }
    }

    let formattedNumber = numberValue.toFixed(2);

    if (includeSymbol) {
        return symbol + ' ' + formattedNumber + unit;
    } else {
        return formattedNumber + unit;
    }
};

const examples = [
    "$ 1,320.84 B",
    "$ 11,344.74 B",
    "Ƀ 190,728,921.0",
    "Ƀ 122.190,728,921.0 T"
];

examples.forEach(example => {
    console.log(formatLargeNumbers(example));
});
