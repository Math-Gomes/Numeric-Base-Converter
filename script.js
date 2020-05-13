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

    return result.toUpperCase();
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
    
    decResult = document.getElementById("dec-result");
    binResult = document.getElementById("bin-result");
    octResult = document.getElementById("oct-result");
    hexResult = document.getElementById("hex-result");

    const setOutput = (re, d, b, o, h) => {
        if ((new RegExp(re)).test(n)) {
            decResult.innerText = d;
            binResult.innerText = formatOutput(b, 4);
            octResult.innerText = formatOutput(o, 3);
            hexResult.innerText = formatOutput(h, 4);
        } else {
            clear();
        }
    }

    number.oninput = base.onchange = () => {
        n = number.value.toUpperCase();

        Calculator = {
            dec() {
                n = parseInt(n);
                setOutput("^[0-9]+$", n, decToBin(n), decToOct(n), decToHex(n));
            },

            bin() {
                setOutput("^[0-1]+$", binToDec(n), n, binToOct(n), binToHex(n));
            },

            oct() {
                setOutput("^[0-8]+$", octToDec(n), octToBin(n), n, octToHex(n));
            },

            hex() {
                setOutput("^[0-9a-fA-F]+$", hexToDec(n), hexToBin(n), hexToOct(n), n);
            }
        }

        Object.keys(Calculator).includes(base.value) ? Calculator[base.value]() : clear();
    }
}
