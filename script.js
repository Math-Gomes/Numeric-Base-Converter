function decToBin(n) {
    if (n == 0) return "0";

    var result = "";

    while (n > 0) {
        result = (n % 2) + result;
        n = n >> 1;
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

function clearOutput() {
    document.getElementById("decResult").value = "";
    document.getElementById("binResult").value = "";
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
                document.getElementById("binResult").value = decToBin(number);
                document.getElementById("hexResult").value = decToHex(number);
            } else {
                clearOutput();
            }
            break;

        case "bin":
            var re = new RegExp("^[0-1]+$");
            if (re.test(number)) {
                document.getElementById("decResult").value = binToDec(number);
                document.getElementById("binResult").value = number;
                document.getElementById("hexResult").value = binToHex(number);
            } else {
                clearOutput();
            }
            break;

        case "hex":
            var re = new RegExp("^[0-9a-fA-F]+$");
            if (re.test(number)) {
                document.getElementById("decResult").value = hexToDec(number);
                document.getElementById("binResult").value = hexToBin(number);
                document.getElementById("hexResult").value = number;
            } else {
                clearOutput();
            }
            break;

        default:
            clearOutput();
    }

}