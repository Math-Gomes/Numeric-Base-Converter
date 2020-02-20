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

        // while (nibble.length < nibbleLen) {
        //     nibble = "0" + nibble;
        // }

        result = nibble + " " + result;
    }

    return result;
}

function clearOutput() {
    document.getElementById("decResult").value = "";
    document.getElementById("binResult").value = "";
    document.getElementById("octResult").value = "";
    document.getElementById("hexResult").value = "";
}

function showResults() {
    var number = document.getElementById("number").value.toUpperCase();
    var base = document.getElementById("base").value;

    switch (base) {

        case "dec":
            var re = new RegExp("^[0-9]+$");
            if (re.test(number)) {
                document.getElementById("decResult").value = number;
                document.getElementById("binResult").value = formatOutput(decToBin(number, 4));
                document.getElementById("octResult").value = formatOutput(decToOct(number, 3));
                document.getElementById("hexResult").value = formatOutput(decToHex(number, 4));
            } else {
                clearOutput();
            }
            break;

        case "bin":
            var re = new RegExp("^[0-1]+$");
            if (re.test(number)) {
                document.getElementById("decResult").value = binToDec(number);
                document.getElementById("binResult").value = formatOutput(number, 4);
                document.getElementById("octResult").value = formatOutput(binToOct(number, 3));
                document.getElementById("hexResult").value = formatOutput(binToHex(number, 4));
            } else {
                clearOutput();
            }
            break;

        case "oct":
            var re = new RegExp("^[0-8]+$");
            if (re.test(number)) {
                document.getElementById("decResult").value = octToDec(number);
                document.getElementById("binResult").value = formatOutput(octToBin(number), 4);
                document.getElementById("octResult").value = formatOutput(number, 3);
                document.getElementById("hexResult").value = formatOutput(octToHex(number), 4);
            } else {
                clearOutput();
            }
            break;

        case "hex":
            var re = new RegExp("^[0-9a-fA-F]+$");
            if (re.test(number)) {
                document.getElementById("decResult").value = hexToDec(number);
                document.getElementById("binResult").value = formatOutput(hexToBin(number), 4);
                document.getElementById("octResult").value = formatOutput(hexToOct(number), 3);
                document.getElementById("hexResult").value = formatOutput(number, 4);
            } else {
                clearOutput();
            }
            break;

        default:
            clearOutput();
    }

}