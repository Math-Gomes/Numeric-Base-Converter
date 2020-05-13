function decToBin(n) {
    return n.toString(2);
}

function decToOct(n) {
    return n.toString(8);
}

function decToHex(n) {
    return n.toString(16);
}

function binToDec(n) {
    return parseInt(n, 2);
}

function binToOct(n) {
    return decToOct(binToDec(n));
}

function binToHex(n) {
    return decToHex(binToDec(n));
}

function hexToDec(n) {
    return parseInt(n, 16);
}

function hexToBin(n) {
    return decToBin(hexToDec(n));
}

function hexToOct(n) {
    return decToOct(hexToDec(n));
}

function octToDec(n) {
    return parseInt(n, 8);
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

    s = s.toString();

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
                    n = parseInt(n);
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

        Object.keys(Calculator).includes(base.value) ? Calculator[base.value]() : clear();
    }
}
