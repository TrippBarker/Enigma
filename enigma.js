// HTML elements live here
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
const positionOne = document.querySelector('#rotorOnePosition');
const selectorTwo = document.querySelector('#rotorTwoSelect');
const positionTwo = document.querySelector('#rotorTwoPosition');
const selectorThree = document.querySelector('#rotorThreeSelect');
const positionThree = document.querySelector('#rotorThreePosition');
const reflectorSelctor = document.querySelector('#reflectorSelect');
const copySettings = document.querySelector('#copySettings');

// Variables used to store rotors/reflectors used to scramble messages
const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const rotorI =   "JEKMFLGDQVZNTOWYHXUSPAIBRC";
const rotorII =  "EAJDKSIRUXBLHWTMCQGZNPYFVO";
const rotorIII = "OBDFHJLCPRTXVZNYEIWGAKMUSQ";
const rotorIV = "BESOVPZJAYQUIRHXLNFTGKDCMW";
const rotorV = "KVZBRGITYUPSDNHLXAWMJQOFEC";

const UKWA = "EJMZALYXVBWFCRQUONTSPIKHGD";
const UKWB = "YRUHQSLDPXNGOKMIEBFZCWVJAT";
const UKWC = "FVPJIAOYEDRZXWGCTKUQSBNMHL";

// Function called to make the information box visible
function displayInfo(e){
    infoBox.classList.toggle("visible");
    app.classList.toggle("dimmed");
}

// Function encrypts message using algorithm that mimics the Enigma Machine
function enigmaCipher(){
    var message = "";
    // Check settings and assign appropriate rotors in correct positions
    var firstRotor = getRotor(selectorOne.value, parseInt(positionOne.value));
    var secRotor = getRotor(selectorTwo.value, parseInt(positionTwo.value));
    var thirdRotor = getRotor(selectorThree.value, parseInt(positionThree.value));
    var reflector = getRotor(reflectorSelctor.value, 0);
    var letter = "";
    // For each letter in the original message, run through the encryption algorithm.
    for (var i = 0; i < orgMssg.value.length; i++){
        // If letter is in the alphabet, encrypt it, otherwise pass it along unchanged(spaces, numbers and punctuation are left unchanged)
        if (alphabet.includes(orgMssg.value.charAt(i).toUpperCase())){
            // Ensure letter is in uppercase
            letter = orgMssg.value.charAt(i).toUpperCase();
            // For each subsiquent rotor, replace the current letter with the letter of the next rotor at the same index.
            letter = firstRotor.charAt(alphabet.indexOf(letter));
            letter = secRotor.charAt(alphabet.indexOf(letter));
            letter = thirdRotor.charAt(alphabet.indexOf(letter));
            // Once through the rotors, pass through the reflector
            letter = reflector.charAt(alphabet.indexOf(letter));
            // Once through reflector, pass letter back through the rotors in reverse order
            letter = alphabet.charAt(thirdRotor.indexOf(letter));
            letter = alphabet.charAt(secRotor.indexOf(letter));
            letter = alphabet.charAt(firstRotor.indexOf(letter));
            // Append the encrypted letter to the end of the new message
            message += letter;
            // Conditional statements that 'rotate' the next rotor if a rotor has reached its 'rotate letter'
            if (firstRotor.charAt(0) === "X"){
                if (secRotor.charAt(0) === "U"){
                    thirdRotor += thirdRotor.charAt(0);
                    thirdRotor = thirdRotor.substring(1);
                }
                secRotor += secRotor.charAt(0);
                secRotor = secRotor.substring(1);
            }
            // First rotor is rotated after each key strike
            firstRotor += firstRotor.charAt(0);
            firstRotor = firstRotor.substring(1);
        } else {
            message += orgMssg.value.charAt(i);
        }
    }
    // Pass encrypted message into the encrypted message text field
    cryptMssg.textContent = message;
    // "light up" the letter on the light board that corrosponds with the last encrypted letter
    toggleLight(message.charAt(message.length - 1));
}

// Function is called whenever a message is being ecrypted the retreives the correct rotor for each position
function getRotor(selectorValue, rotorPosition){
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
        case "UKW-A":
            returnVal = UKWA;
            break;
        case "UKW-B":
            returnVal = UKWB;
            break;
        case "UKW-C":
            returnVal = UKWC;
            break;
        default:
            returnVal = alphabet;
            break;
    }
    returnVal += returnVal.substring(0, rotorPosition);
    returnVal = returnVal.substring(rotorPosition);
    return returnVal;
}

/* Caesar Cipher used for bug testing, not currently in use.
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
*/

// Function called when copy button is pressed
function copyMessage(e){
    navigator.clipboard.writeText(cryptMssg.value);
}

// Clear function called when clear button is pressed
function clearMessage(e){
    cryptMssg.textContent = "";
    orgMssg.value = "";
    toggleLight("");
}

// Function called by enigmaCipher to apply a lighting effect when a key is pressed
function toggleLight(letterVal){
    keys.forEach(key => {
        key.classList.remove("glow");
        if (key.textContent === letterVal.toUpperCase()){
            key.classList.toggle("glow");
        }
    })
}

// Function called to copy current settings into the user's clipboard
function copyCurrentSettings(e){
    let currentSettings =`Rotor One: ${selectorOne.value}\nRotor One Position: ${positionOne.value}\nRotor Two: ${selectorTwo.value}\nRotor Two Position: ${positionTwo.value}\nRotor Three: ${selectorThree.value}\nRotor Three Position: ${positionThree.value}\nReflector: ${reflectorSelctor.value}`;
    navigator.clipboard.writeText(currentSettings);
}

// Event listeners live here
infoBtn.addEventListener('click', displayInfo);
infoBox.addEventListener('click', displayInfo);
copyKey.addEventListener('click', copyMessage);
clrKey.addEventListener('click', clearMessage);
copySettings.addEventListener('click', copyCurrentSettings);
window.addEventListener('keyup', enigmaCipher);
selectors.forEach(selector => selector.addEventListener('input', enigmaCipher));