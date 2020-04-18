function decToBin(n) {
    if (n == 0) return "0";

    var result = "";

    while (n > 0) {
        result = (n % 2) + result;
        n = n >> 1;
    }

    return result;
}

function decToOct(n) {
    if (n == 0) return "0";

    var result = "";

    while (n > 0) {
        result = (n % 8) + result;
        n = n >> 3;
    }

    return result;
}

function decToHex(n) {
    if (n == 0) return "0";

    var result = "";
    var values = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F'];

    while (n > 0) {
        result = values[n % 16] + result;
        n = n >> 4;
    }

    return result;
}

function binToDec(n) {
    var result = 0;
    var expoent = n.length - 1;
    
    for (var i = 0; i < n.length; i++) {
        result += n[i] * (2 ** expoent);
        expoent--;
    }

    return result;
}

function binToOct(n) {
    return decToOct(binToDec(n));
}

function binToHex(n) {
    return decToHex(binToDec(n));
}

function hexToDec(n) {
    return binToDec(hexToBin(n));
}

function hexToBin(n) {
    var result = "";

    const hex = {
        '0': '0000',
        '1': '0001',
        '2': '0010',
        '3': '0011',
        '4': '0100',
        '5': '0101',
        '6': '0110',
        '7': '0111',
        '8': '1000',
        '9': '1001',
        'A': '1010',
        'B': '1011',
        'C': '1100',
        'D': '1101',
        'E': '1110',
        'F': '1111'
    };

    for (var i = 0; i < n.length; i++) {
        result += hex[n[i]];
    }

    return result;
}

function hexToOct(n) {
    return decToOct(hexToDec(n));
}

function octToDec(n) {
    var result = 0;
    var expoent = n.length - 1;
    
    for (var i = 0; i < n.length; i++) {
        result += n[i] * (8 ** expoent);
        expoent--;
    }

    return result;
}

function octToBin(n) {
    return decToBin(octToDec(n));
}

function octToHex(n) {
    return decToHex(octToDec(n));
}

/**
 * Example:
 *     in : "00001111"
 *     out: "0000 1111"
 * 
 *     in : "FFFFAAAA"
 *     out: "FFFF AAAA"
 */
function formatOutput(s, nibbleLen) {
    if (s == 0) return "0";

    var result = "";

    for (var i = s.length; i > 0; i -= nibbleLen) {

        var nibble = s.substring(i - nibbleLen, i);

        // Complete the nibble with zeros
        // while (nibble.length < nibbleLen) {
        //     nibble = "0" + nibble;
        // }

        result = nibble + " " + result;
    }

    return result;
}

function clear() {
    decResult.innerText = "";
    binResult.innerText = "";
    octResult.innerText = "";
    hexResult.innerText = "";
}

window.onload = () => {
    const number = document.getElementById("number");
    const base = document.getElementById("base");
    
    decResult = document.getElementById("decResult");
    binResult = document.getElementById("binResult");
    octResult = document.getElementById("octResult");
    hexResult = document.getElementById("hexResult");

    number.oninput = base.onchange = () => {
        n = number.value.toUpperCase();

        Calculator = {
            dec() {
                var re = new RegExp("^[0-9]+$");
                if (re.test(n)) {
                    decResult.innerText = n;
                    binResult.innerText = formatOutput(decToBin(n), 4);
                    octResult.innerText = formatOutput(decToOct(n), 3);
                    hexResult.innerText = formatOutput(decToHex(n), 4);
                } else {
                    clear();
                }
            },

            bin() {
                var re = new RegExp("^[0-1]+$");
                if (re.test(n)) {
                    decResult.innerText = binToDec(n);
                    binResult.innerText = formatOutput(n, 4);
                    octResult.innerText = formatOutput(binToOct(n), 3);
                    hexResult.innerText = formatOutput(binToHex(n), 4);
                } else {
                    clear();
                }
            },

            oct() {
                var re = new RegExp("^[0-8]+$");
                if (re.test(n)) {
                    decResult.innerText = octToDec(n);
                    binResult.innerText = formatOutput(octToBin(n), 4);
                    octResult.innerText = formatOutput(n, 3);
                    hexResult.innerText = formatOutput(octToHex(n), 4);
                } else {
                    clear();
                }
            },

            hex() {
                var re = new RegExp("^[0-9a-fA-F]+$");
                if (re.test(n)) {
                    decResult.innerText = hexToDec(n);
                    binResult.innerText = formatOutput(hexToBin(n), 4);
                    octResult.innerText = formatOutput(hexToOct(n), 3);
                    hexResult.innerText = formatOutput(n, 4);
                } else {
                    clear();
                }
            }
        }

        if (Object.keys(Calculator).includes(base.value)) {
            Calculator[base.value]();
        } else {
            clear();
        }
    }
}
