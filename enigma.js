const app = document.querySelector('#application');
const infoBtn = document.querySelector('#info');
const infoBox = document.querySelector('#infoBox');
const keys = document.querySelectorAll('.key');
const copyKey = document.querySelector('#copykey');
const clrKey = document.querySelector('#clrkey');
const orgMssg = document.querySelector('#OriginalMessage');
const cryptMssg = document.querySelector('#CryptedMessage');
const selectors = document.querySelectorAll('.selector');
const selectorOne = document.querySelector('#rotorOneSelect');
const selectorTwo = document.querySelector('#rotorTwoSelect');
const selectorThree = document.querySelector('#rotorThreeSelect');
const reflectorSelctor = document.querySelector('#reflectorSelect');

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const rotorI =   "EKMFLGDQVZNTOWYHXUSPAIBRCJ";
const rotorII =  "AJDKSIRUXBLHWTMCQGZNPYFVOE";
const rotorIII = "BDFHJLCPRTXVZNYEIWGAKMUSQO";
const rotorIV = "ESOVPZJAYQUIRHXLNFTGKDCMWB";
const rotorV = "VZBRGITYUPSDNHLXAWMJQOFECK";

const UKWA = "EJMZALYXVBWFCRQUONTSPIKHGD";
const UKWB = "YRUHQSLDPXNGOKMIEBFZCWVJAT";
const UKWC = "FVPJIAOYEDRZXWGCTKUQSBNMHL";

function displayInfo(e){
    infoBox.classList.toggle("visible");
    app.classList.toggle("dimmed");
}

function cryptMessage(e){
    cryptMssg.textContent = orgMssg.value.toUpperCase();
    orgMssg.textContent = "";
}

function getRotor(selectorValue){
    var returnVal = "";
    switch (selectorValue){
        case "I":
            returnVal = rotorI;
            break;
        case "II":
            returnVal = rotorII;
            break;
        case "III":
            returnVal = rotorIII;
            break;
        case "IV":
            returnVal = rotorIV;
            break;
        case "V":
            returnVal = rotorV;
            break;
        case "A":
            returnVal = UKWA;
            break;
        case "B":
            returnVal = UKWB;
            break;
        case "C":
            returnVal = UKWC;
            break;
        default:
            returnVal = alphabet;
            break;
    }
    return returnVal;
}

function testEnigmaCipher(){
    var message = "";
    var firstRotor = getRotor(selectorOne.value);
    var secRotor = getRotor(selectorTwo.value);
    var thirdRotor = getRotor(selectorThree.value);
    var reflector = getRotor(reflectorSelctor.value);
    var letter = "";
    for (var i = 0; i < orgMssg.value.length; i++){
        if (alphabet.includes(orgMssg.value.charAt(i).toUpperCase())){
            letter = orgMssg.value.charAt(i).toUpperCase();
            letter = firstRotor.charAt(alphabet.indexOf(letter));
            letter = secRotor.charAt(alphabet.indexOf(letter));
            letter = thirdRotor.charAt(alphabet.indexOf(letter));
            letter = reflector.charAt(alphabet.indexOf(letter));
            letter = alphabet.charAt(thirdRotor.indexOf(letter));
            letter = alphabet.charAt(secRotor.indexOf(letter));
            letter = alphabet.charAt(firstRotor.indexOf(letter));
            message += letter;
            if (firstRotor.charAt(0) === "X"){
                if (secRotor.charAt(0) === "U"){
                    thirdRotor += thirdRotor.charAt(0);
                    thirdRotor = thirdRotor.substring(1);
                }
                secRotor += secRotor.charAt(0);
                secRotor = secRotor.substring(1);
            }
            firstRotor += firstRotor.charAt(0);
            firstRotor = firstRotor.substring(1);
        } else {
            message += orgMssg.value.charAt(i);
        }
    }
    cryptMssg.textContent = message;
}

function simpleCaesarCipher(e){
    var message = "";
    for (var i = 0; i < orgMssg.value.length; i++){
        switch (orgMssg.value.charAt(i).toUpperCase()){
            case "A":
                message += "Z";
                break;
            case "B":
                message += "Y";
                break;
            case "C":
                message += "X";
                break;
            case "D":
                message += "W";
                break;
            case "E":
                message += "V";
                break;
            case "F":
                message += "U";
                break;
            case "G":
                message += "T";
                break;
            case "H":
                message += "S";
                break;
            case "I":
                message += "R";
                break;
            case "J":
                message += "Q";
                break;
            case "K":
                message += "P";
                break;
            case "L":
                message += "O";
                break;
            case "M":
                message += "N";
                break;
            case "N":
                message += "M";
                break;
            case "O":
                message += "L";
                break;
            case "P":
                message += "K";
                break;
            case "Q":
                message += "J";
                break;
            case "R":
                message += "I";
                break;
            case "S":
                message += "H";
                break;
            case "T":
                message += "G";
                break;
            case "U":
                message += "F";
                break;
            case "V":
                message += "E";
                break;
            case "W":
                message += "D";
                break;
            case "X":
                message += "C";
                break;
            case "Y":
                message += "B";
                break;
            case "Z":
                message += "A";
                break;
            default:
                continue;
        }
    }
    cryptMssg.textContent = message;
    orgMssg.textContent = "";
}

function copyMessage(e){
    navigator.clipboard.writeText(cryptMssg.value);
}

function clearMessage(e){
    cryptMssg.textContent = "";
    orgMssg.textContent = "";
}

function typeLetter(e){
    orgMssg.textContent = (orgMssg.value + this.textContent);
    testEnigmaCipher();
}

function typedLetter(e){
    if (e.which >= 65 && e.which <= 90 || e.which === 32){
        orgMssg.textContent = (orgMssg.value + e.key);
    } else if (e.which === 8){
        orgMssg.textContent = (orgMssg.value.slice(0, -1));
    }
    testEnigmaCipher();
}

infoBtn.addEventListener('click', displayInfo);
infoBox.addEventListener('click', displayInfo);
copyKey.addEventListener('click', copyMessage);
clrKey.addEventListener('click', clearMessage);
keys.forEach(button => button.addEventListener('click', typeLetter));
window.addEventListener('keyup', typedLetter);
selectors.forEach(selector => selector.addEventListener('input', testEnigmaCipher));